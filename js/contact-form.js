/* Formulaires de contact (Web3Forms + hCaptcha)
   Empêche l'envoi tant que la case hCaptcha n'est pas cochée,
   avec un message dans la langue de la page. */

(function () {
  "use strict";

  var lang = (document.documentElement.lang || "fr").slice(0, 2);

  var MESSAGES = {
    fr: "Merci de cocher la case « Je ne suis pas un robot » avant d'envoyer votre message.",
    es: "Por favor, marcá la casilla «No soy un robot» antes de enviar tu mensaje.",
    en: "Please check the “I’m not a robot” box before sending your message."
  };

  var message = MESSAGES[lang] || MESSAGES.fr;

  var forms = document.querySelectorAll('form[action*="api.web3forms.com"]');

  Array.prototype.forEach.call(forms, function (form) {
    form.addEventListener("submit", function (event) {
      var token = form.querySelector('[name="h-captcha-response"]');
      if (token && token.value) return;

      event.preventDefault();

      var box = form.querySelector(".captcha-error");
      if (!box) {
        box = document.createElement("p");
        box.className = "captcha-error";
        box.setAttribute("role", "alert");
        box.style.cssText = "margin:0;color:#B91C1C;font-size:14px;";
        var widget = form.querySelector(".h-captcha");
        if (widget && widget.parentNode) {
          widget.parentNode.insertBefore(box, widget.nextSibling);
        } else {
          form.appendChild(box);
        }
      }
      box.textContent = message;
    });
  });
})();
