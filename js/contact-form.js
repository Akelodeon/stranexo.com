/* Formulaires de contact (Web3Forms + hCaptcha)
   - bloque l'envoi tant que la case hCaptcha n'est pas cochée
   - envoie le formulaire depuis la page, puis redirige vers la page de
     remerciement de la langue courante (champ caché "redirect")
   Sans JavaScript, le formulaire reste un POST HTML classique. */

(function () {
  "use strict";

  var lang = (document.documentElement.lang || "fr").slice(0, 2);

  var TEXTS = {
    fr: {
      captcha: "Merci de cocher la case « Je ne suis pas un robot » avant d'envoyer votre message.",
      sending: "Envoi en cours…",
      error: "Votre message n'a pas pu être envoyé. Merci de réessayer, ou d'écrire directement à axel@stranexo.com."
    },
    es: {
      captcha: "Por favor, marcá la casilla «No soy un robot» antes de enviar tu mensaje.",
      sending: "Enviando…",
      error: "No se pudo enviar tu mensaje. Probá de nuevo o escribí directamente a axel@stranexo.com."
    },
    en: {
      captcha: "Please check the “I’m not a robot” box before sending your message.",
      sending: "Sending…",
      error: "Your message could not be sent. Please try again, or email axel@stranexo.com directly."
    }
  };

  var t = TEXTS[lang] || TEXTS.fr;

  function showMessage(form, text) {
    var box = form.querySelector(".form-message");
    if (!box) {
      box = document.createElement("p");
      box.className = "form-message";
      box.setAttribute("role", "alert");
      box.style.cssText = "margin:0;color:#B91C1C;font-size:14px;";
      var widget = form.querySelector(".h-captcha");
      if (widget && widget.parentNode) {
        widget.parentNode.insertBefore(box, widget.nextSibling);
      } else {
        form.appendChild(box);
      }
    }
    box.textContent = text;
  }

  function resetCaptcha() {
    try {
      if (window.hcaptcha && typeof window.hcaptcha.reset === "function") window.hcaptcha.reset();
    } catch (e) { /* ignore */ }
  }

  var forms = document.querySelectorAll('form[action*="api.web3forms.com"]');

  Array.prototype.forEach.call(forms, function (form) {
    form.addEventListener("submit", function (event) {
      var token = form.querySelector('[name="h-captcha-response"]');
      event.preventDefault();

      if (!token || !token.value) {
        showMessage(form, t.captcha);
        return;
      }

      showMessage(form, "");

      var button = form.querySelector('button[type="submit"]');
      var label = button ? button.textContent : "";
      if (button) {
        button.disabled = true;
        button.textContent = t.sending;
      }

      fetch(form.action, { method: "POST", body: new FormData(form) })
        .then(function (response) { return response.json(); })
        .then(function (data) {
          if (!data || !data.success) throw new Error((data && data.message) || "submit failed");
          var target = form.querySelector('[name="redirect"]');
          window.location.href = target && target.value ? target.value : "/";
        })
        .catch(function () {
          showMessage(form, t.error);
          if (button) {
            button.disabled = false;
            button.textContent = label;
          }
          resetCaptcha();
        });
    });
  });
})();
