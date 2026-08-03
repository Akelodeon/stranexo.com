/* ======================================================
   INDICE STRANEXO — Moteur + Parcours + Email
   Dépend de js/indice-data.js (chargé avant ce fichier)
   Bilingue FR/ES : la langue est détectée via <html lang="...">
====================================================== */

(function () {
  "use strict";

  /* ---------- LANGUE ---------- */

  var LANG = (document.documentElement.lang || "fr").slice(0, 2) === "es" ? "es" : "fr";
  var CONTENT = STRANEXO_CONTENT[LANG];

  var STRANEXO_PILLARS = CONTENT.pillars;
  var STRANEXO_ANSWER_SCALE = CONTENT.answerScale;
  var STRANEXO_CONCLUSION_COMMUNE = CONTENT.conclusion;
  var STRANEXO_LEVELS = CONTENT.levels;

  var UI_STRINGS = {
    fr: {
      accueilTag: "INDICE STRANEXO",
      accueilTitle: "Quel est le niveau de maturité de vos flux internationaux ?",
      accueilLead: "En 5 minutes, obtenez un premier indice de maturité de vos flux internationaux, sur 5 dimensions clés : transport, douane, incoterms, fournisseurs et organisation.",
      metaDuration: "chrono",
      metaQuestions: "questions",
      metaIndex: "indice chiffré",
      btnStart: "Démarrer mon diagnostic",

      presentationTag: "COMMENT ÇA MARCHE",
      presentationTitle: "Un diagnostic express en 5 piliers",
      presentationText: "Pour chaque pilier, 6 questions fermées. Répondez avec la réponse la plus proche de votre réalité actuelle : Oui, En grande partie, Partiellement, ou Non.",
      presentationNote: "À l'issue du diagnostic, vous obtenez un Indice STRANEXO sur 100 ainsi qu'un niveau de maturité, et vous recevez vos résultats par email.",
      btnBack: "Retour",
      btnBegin: "Commencer",

      entrepriseTag: "VOS COORDONNÉES",
      entrepriseTitle: "Quelques informations avant de commencer",
      entrepriseNote: "Ces informations nous permettent de vous adresser vos résultats par email et, si vous le souhaitez, d'échanger avec vous ensuite.",
      labelEntreprise: "Nom de l'entreprise *",
      labelSecteur: "Secteur d'activité",
      labelContact: "Nom et prénom *",
      labelEmail: "Email professionnel *",
      labelTelephone: "Téléphone",
      consentText: "J'accepte que mes données et mes réponses soient utilisées par STRANEXO pour m'adresser mes résultats et me recontacter à ce sujet.",
      formErrorEmail: "Merci de renseigner une adresse email valide.",
      formErrorConsent: "Merci d'accepter les conditions pour continuer.",
      formErrorRequired: "Merci de compléter les champs obligatoires (*).",
      btnStartDiag: "Commencer le diagnostic",
      restartLink: "Recommencer le diagnostic à zéro",

      pillarTagPrefix: "PILIER",
      btnPrevious: "Précédent",
      btnContinue: "Continuer",

      calculTitle: "Calcul de votre Indice STRANEXO...",
      calculNote: "Analyse de vos réponses sur les 5 piliers.",

      resultsTag: "VOS RÉSULTATS",
      resultsTitle: "Votre Indice STRANEXO",
      ctaTag: "ET MAINTENANT ?",
      ctaTitle: "Passez du constat à la cartographie de vos flux",
      ctaText: "L'Indice STRANEXO donne une première mesure. Un diagnostic approfondi permet d'identifier précisément vos fragilités et vos leviers de performance.",
      ctaButton: "Planifier un échange avec STRANEXO",
      ctaLink: "index.html#contact",
      restartDiagLink: "Refaire le diagnostic",
      emailSentPrefix: "Vos résultats ont été envoyés par email à ",
      emailErrorText: "L'envoi automatique par email a rencontré un problème. Vous pouvez nous contacter directement à axel@stranexo.com pour recevoir vos résultats.",
      radarLabel: "Indice par pilier",
      stepLabel: "Étape",
      scoreUnit: "/100"
    },
    es: {
      accueilTag: "ÍNDICE STRANEXO",
      accueilTitle: "¿Cuál es el nivel de madurez de tus flujos internacionales?",
      accueilLead: "En 5 minutos, obtené un primer índice de madurez de tus flujos internacionales, sobre 5 dimensiones clave: transporte, aduana, incoterms, proveedores y organización.",
      metaDuration: "cronómetro",
      metaQuestions: "preguntas",
      metaIndex: "índice numérico",
      btnStart: "Iniciar mi diagnóstico",

      presentationTag: "CÓMO FUNCIONA",
      presentationTitle: "Un diagnóstico express en 5 pilares",
      presentationText: "Para cada pilar, 6 preguntas cerradas. Respondé con la opción más cercana a tu realidad actual: Sí, En gran parte, Parcialmente, o No.",
      presentationNote: "Al finalizar el diagnóstico, obtenés un Índice STRANEXO sobre 100 junto con un nivel de madurez, y recibís tus resultados por email.",
      btnBack: "Volver",
      btnBegin: "Comenzar",

      entrepriseTag: "TUS DATOS",
      entrepriseTitle: "Algunos datos antes de empezar",
      entrepriseNote: "Esta información nos permite enviarte tus resultados por email y, si lo deseás, contactarte más adelante.",
      labelEntreprise: "Nombre de la empresa *",
      labelSecteur: "Sector de actividad",
      labelContact: "Nombre y apellido *",
      labelEmail: "Email profesional *",
      labelTelephone: "Teléfono",
      consentText: "Acepto que mis datos y respuestas sean utilizados por STRANEXO para enviarme mis resultados y contactarme al respecto.",
      formErrorEmail: "Por favor ingresá una dirección de email válida.",
      formErrorConsent: "Por favor aceptá las condiciones para continuar.",
      formErrorRequired: "Por favor completá los campos obligatorios (*).",
      btnStartDiag: "Comenzar el diagnóstico",
      restartLink: "Reiniciar el diagnóstico desde cero",

      pillarTagPrefix: "PILAR",
      btnPrevious: "Anterior",
      btnContinue: "Continuar",

      calculTitle: "Calculando tu Índice STRANEXO...",
      calculNote: "Análisis de tus respuestas sobre los 5 pilares.",

      resultsTag: "TUS RESULTADOS",
      resultsTitle: "Tu Índice STRANEXO",
      ctaTag: "¿Y AHORA?",
      ctaTitle: "Pasá del diagnóstico al mapeo de tus flujos",
      ctaText: "El Índice STRANEXO ofrece una primera medición. Un diagnóstico en profundidad permite identificar con precisión tus puntos débiles y tus palancas de rendimiento.",
      ctaButton: "Coordinar una charla con STRANEXO",
      ctaLink: "index.html#contact",
      restartDiagLink: "Rehacer el diagnóstico",
      emailSentPrefix: "Tus resultados fueron enviados por email a ",
      emailErrorText: "El envío automático por email tuvo un problema. Podés contactarnos directamente a axel@stranexo.com para recibir tus resultados.",
      radarLabel: "Índice por pilar",
      stepLabel: "Paso",
      scoreUnit: "/100"
    }
  };

  var T = UI_STRINGS[LANG];

  /* ---------- MOTEUR DE CALCUL ---------- */

  function computePillarScore(answers) {
    // answers: tableau de 6 valeurs (0 à 3), -1 pour "Je ne sais pas"/"No lo sé", null si pas répondu
    // Une réponse "Je ne sais pas" compte comme 0 point, au même titre qu'un "Non" : ne pas savoir
    // révèle, comme un "Non", un manque de visibilité sur ce sujet.
    var sum = answers.reduce(function (a, b) {
      var contribution = (b === null || b < 0) ? 0 : b;
      return a + contribution;
    }, 0);
    return Math.round((sum / 18) * 100);
  }

  function computeGlobalIndex(pillarScores) {
    var sum = pillarScores.reduce(function (a, b) { return a + b; }, 0);
    return Math.round(sum / pillarScores.length);
  }

  function getMaturityLevel(score) {
    for (var i = 0; i < STRANEXO_LEVELS.length; i++) {
      if (score <= STRANEXO_LEVELS[i].max) return STRANEXO_LEVELS[i];
    }
    return STRANEXO_LEVELS[STRANEXO_LEVELS.length - 1];
  }

  function answerLabel(value) {
    var found = STRANEXO_ANSWER_SCALE.find(function (a) { return a.value === value; });
    return found ? found.label : "-";
  }

  /* ---------- ÉTAT ---------- */

  var STORAGE_KEY = "stranexo_indice_state_v1_" + LANG;

  function freshState() {
    var s = {
      screen: "accueil",
      pillarIndex: 0,
      company: { entreprise: "", secteur: "", contact: "", email: "", telephone: "", consent: false },
      answers: {},
      emailSent: false
    };
    STRANEXO_PILLARS.forEach(function (p) {
      s.answers[p.id] = [null, null, null, null, null, null];
    });
    return s;
  }

  function saveState() {
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (e) {
      // stockage indisponible (navigation privée, etc.) : on continue sans persistance
    }
  }

  function loadState() {
    try {
      var raw = sessionStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch (e) {
      return null;
    }
  }

  function clearState() {
    try {
      sessionStorage.removeItem(STORAGE_KEY);
    } catch (e) {}
  }

  var state = freshState();

  var root = document.getElementById("indice-screen");
  var progressWrap = document.getElementById("indice-progress");
  var progressFill = document.getElementById("indice-progress-fill");
  var progressLabel = document.getElementById("indice-progress-label");
  var radarChartInstance = null;

  var TOTAL_STEPS = 1 + STRANEXO_PILLARS.length; // infos entreprise + 5 piliers

  function setProgress(step) {
    if (!step) {
      progressWrap.hidden = true;
      return;
    }
    progressWrap.hidden = false;
    var pct = Math.round((step / TOTAL_STEPS) * 100);
    progressFill.style.width = pct + "%";
    progressLabel.textContent = T.stepLabel + " " + step + " / " + TOTAL_STEPS;
  }

  function scrollToTop() {
    var el = document.getElementById("indice-app");
    if (el && typeof el.scrollIntoView === "function") {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }

  /* ---------- ÉCRAN : ACCUEIL ---------- */

  function renderAccueil() {
    setProgress(0);
    root.innerHTML =
      '<div class="indice-screen indice-intro">' +
        '<span class="section-tag">' + T.accueilTag + '</span>' +
        '<h1>' + T.accueilTitle + '</h1>' +
        '<p class="indice-lead">' + T.accueilLead + '</p>' +
        '<div class="indice-meta-row">' +
          '<div class="indice-meta"><strong>5 min</strong><span>' + T.metaDuration + '</span></div>' +
          '<div class="indice-meta"><strong>30</strong><span>' + T.metaQuestions + '</span></div>' +
          '<div class="indice-meta"><strong>/100</strong><span>' + T.metaIndex + '</span></div>' +
        '</div>' +
        '<button type="button" class="btn-primary" id="btn-start">' + T.btnStart + '</button>' +
      '</div>';
    document.getElementById("btn-start").addEventListener("click", function () {
      state.screen = "presentation";
      saveState();
      renderPresentation();
      scrollToTop();
    });
  }

  /* ---------- ÉCRAN : PRÉSENTATION ---------- */

  function renderPresentation() {
    setProgress(0);
    var pillarsList = STRANEXO_PILLARS.map(function (p) {
      return '<li>' + p.name + '</li>';
    }).join("");

    root.innerHTML =
      '<div class="indice-screen indice-presentation">' +
        '<span class="section-tag">' + T.presentationTag + '</span>' +
        '<h2>' + T.presentationTitle + '</h2>' +
        '<p>' + T.presentationText + '</p>' +
        '<ul class="feature-list indice-pillars-list">' + pillarsList + '</ul>' +
        '<p class="indice-note">' + T.presentationNote + '</p>' +
        '<div class="indice-nav-buttons">' +
          '<button type="button" class="btn-secondary" id="btn-back-accueil">' + T.btnBack + '</button>' +
          '<button type="button" class="btn-primary" id="btn-start-entreprise">' + T.btnBegin + '</button>' +
        '</div>' +
      '</div>';

    document.getElementById("btn-back-accueil").addEventListener("click", function () {
      state.screen = "accueil";
      saveState();
      renderAccueil();
      scrollToTop();
    });
    document.getElementById("btn-start-entreprise").addEventListener("click", function () {
      state.screen = "entreprise";
      saveState();
      renderEntreprise();
      scrollToTop();
    });
  }

  /* ---------- ÉCRAN : INFOS ENTREPRISE ---------- */

  function renderEntreprise() {
    setProgress(1);
    var c = state.company;
    root.innerHTML =
      '<div class="indice-screen indice-entreprise">' +
        '<span class="section-tag">' + T.entrepriseTag + '</span>' +
        '<h2>' + T.entrepriseTitle + '</h2>' +
        '<p class="indice-note">' + T.entrepriseNote + '</p>' +
        '<form id="form-entreprise" class="indice-form" novalidate>' +
          '<div class="indice-field">' +
            '<label for="f-entreprise">' + T.labelEntreprise + '</label>' +
            '<input type="text" id="f-entreprise" name="entreprise" required value="' + c.entreprise + '">' +
          '</div>' +
          '<div class="indice-field">' +
            '<label for="f-secteur">' + T.labelSecteur + '</label>' +
            '<input type="text" id="f-secteur" name="secteur" value="' + c.secteur + '">' +
          '</div>' +
          '<div class="indice-field">' +
            '<label for="f-contact">' + T.labelContact + '</label>' +
            '<input type="text" id="f-contact" name="contact" required value="' + c.contact + '">' +
          '</div>' +
          '<div class="indice-field">' +
            '<label for="f-email">' + T.labelEmail + '</label>' +
            '<input type="email" id="f-email" name="email" required value="' + c.email + '">' +
          '</div>' +
          '<div class="indice-field">' +
            '<label for="f-telephone">' + T.labelTelephone + '</label>' +
            '<input type="tel" id="f-telephone" name="telephone" value="' + c.telephone + '">' +
          '</div>' +
          '<label class="indice-consent">' +
            '<input type="checkbox" id="f-consent" required' + (c.consent ? " checked" : "") + '>' +
            '<span>' + T.consentText + '</span>' +
          '</label>' +
          '<p class="indice-form-error" id="indice-form-error" hidden></p>' +
          '<div class="indice-nav-buttons">' +
            '<button type="button" class="btn-secondary" id="btn-back-presentation">' + T.btnBack + '</button>' +
            '<button type="submit" class="btn-primary">' + T.btnStartDiag + '</button>' +
          '</div>' +
        '</form>' +
        '<p class="indice-restart-link"><a href="#" id="btn-restart">' + T.restartLink + '</a></p>' +
      '</div>';

    document.getElementById("btn-back-presentation").addEventListener("click", function () {
      state.screen = "presentation";
      saveState();
      renderPresentation();
      scrollToTop();
    });

    document.getElementById("btn-restart").addEventListener("click", function (e) {
      e.preventDefault();
      restartDiagnostic();
    });

    document.getElementById("form-entreprise").addEventListener("submit", function (e) {
      e.preventDefault();
      state.company.entreprise = document.getElementById("f-entreprise").value.trim();
      state.company.secteur = document.getElementById("f-secteur").value.trim();
      state.company.contact = document.getElementById("f-contact").value.trim();
      state.company.email = document.getElementById("f-email").value.trim();
      state.company.telephone = document.getElementById("f-telephone").value.trim();
      state.company.consent = document.getElementById("f-consent").checked;

      var errorEl = document.getElementById("indice-form-error");
      var EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      var errorMsg = "";
      if (!state.company.entreprise || !state.company.contact || !state.company.email) {
        errorMsg = T.formErrorRequired;
      } else if (!EMAIL_RE.test(state.company.email)) {
        errorMsg = T.formErrorEmail;
      } else if (!state.company.consent) {
        errorMsg = T.formErrorConsent;
      }

      if (errorMsg) {
        if (errorEl) {
          errorEl.textContent = errorMsg;
          errorEl.hidden = false;
        }
        return;
      }

      if (errorEl) errorEl.hidden = true;

      state.pillarIndex = 0;
      state.screen = "pillar";
      saveState();
      renderPillar();
      scrollToTop();
    });
  }

  function restartDiagnostic() {
    clearState();
    state = freshState();
    renderAccueil();
    scrollToTop();
  }

  /* ---------- ÉCRAN : PILIER (6 questions) ---------- */

  function renderPillar() {
    var i = state.pillarIndex;
    var pillar = STRANEXO_PILLARS[i];
    setProgress(2 + i);

    var questionsHtml = pillar.questions.map(function (q, qi) {
      var current = state.answers[pillar.id][qi];
      var optionsHtml = STRANEXO_ANSWER_SCALE.map(function (opt) {
        var active = current === opt.value ? " is-active" : "";
        return '<button type="button" class="indice-answer-btn' + active + '" data-qi="' + qi + '" data-value="' + opt.value + '">' + opt.label + '</button>';
      }).join("");

      return (
        '<div class="indice-question">' +
          '<p class="indice-question-text">' + (qi + 1) + ". " + q + '</p>' +
          '<div class="indice-answer-options">' + optionsHtml + '</div>' +
        '</div>'
      );
    }).join("");

    root.innerHTML =
      '<div class="indice-screen indice-pillar">' +
        '<span class="section-tag">' + T.pillarTagPrefix + ' ' + (i + 1) + ' / ' + STRANEXO_PILLARS.length + '</span>' +
        '<h2>' + pillar.name + '</h2>' +
        '<div class="indice-questions">' + questionsHtml + '</div>' +
        '<div class="indice-nav-buttons">' +
          '<button type="button" class="btn-secondary" id="btn-pillar-back">' + T.btnPrevious + '</button>' +
          '<button type="button" class="btn-primary" id="btn-pillar-next" disabled>' + T.btnContinue + '</button>' +
        '</div>' +
        '<p class="indice-restart-link"><a href="#" id="btn-restart">' + T.restartLink + '</a></p>' +
      '</div>';

    var nextBtn = document.getElementById("btn-pillar-next");

    function checkComplete() {
      var complete = state.answers[pillar.id].every(function (v) { return v !== null; });
      nextBtn.disabled = !complete;
    }
    checkComplete();

    root.querySelectorAll(".indice-answer-btn").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var qi = parseInt(btn.getAttribute("data-qi"), 10);
        var value = parseInt(btn.getAttribute("data-value"), 10);
        state.answers[pillar.id][qi] = value;

        var group = btn.parentElement.querySelectorAll(".indice-answer-btn");
        group.forEach(function (b) { b.classList.remove("is-active"); });
        btn.classList.add("is-active");

        checkComplete();
        saveState();
      });
    });

    document.getElementById("btn-restart").addEventListener("click", function (e) {
      e.preventDefault();
      restartDiagnostic();
    });

    document.getElementById("btn-pillar-back").addEventListener("click", function () {
      if (i === 0) {
        state.screen = "entreprise";
      } else {
        state.pillarIndex = i - 1;
      }
      saveState();
      if (i === 0) {
        renderEntreprise();
      } else {
        renderPillar();
      }
      scrollToTop();
    });

    nextBtn.addEventListener("click", function () {
      if (nextBtn.disabled) return;
      if (i < STRANEXO_PILLARS.length - 1) {
        state.pillarIndex = i + 1;
        saveState();
        renderPillar();
      } else {
        state.screen = "calcul";
        saveState();
        renderCalcul();
      }
      scrollToTop();
    });
  }

  /* ---------- ÉCRAN : CALCUL (transition) ---------- */

  function renderCalcul() {
    setProgress(0);
    root.innerHTML =
      '<div class="indice-screen indice-calcul">' +
        '<div class="indice-spinner"></div>' +
        '<h2>' + T.calculTitle + '</h2>' +
        '<p class="indice-note">' + T.calculNote + '</p>' +
      '</div>';

    setTimeout(function () {
      state.screen = "resultats";
      saveState();
      renderResultats();
      scrollToTop();
    }, 1400);
  }

  /* ---------- ÉCRAN : RÉSULTATS ---------- */

  function renderResultats() {
    setProgress(0);

    var pillarScores = STRANEXO_PILLARS.map(function (p) {
      return computePillarScore(state.answers[p.id]);
    });
    var globalIndex = computeGlobalIndex(pillarScores);
    var levelInfo = getMaturityLevel(globalIndex);
    var level = levelInfo.label;
    var levelSlug = levelInfo.key;

    var pillarsHtml = STRANEXO_PILLARS.map(function (p, i) {
      var score = pillarScores[i];
      var text = score >= 65 ? p.textHigh : p.textLow;
      return (
        '<div class="indice-pillar-result">' +
          '<div class="indice-pillar-result-head">' +
            '<h3>' + p.name + '</h3>' +
            '<span class="indice-pillar-score">' + score + '<span>/100</span></span>' +
          '</div>' +
          '<p class="indice-pillar-measures">' + p.measures + '</p>' +
          '<p class="indice-pillar-text">' + text + '</p>' +
        '</div>'
      );
    }).join("");

    root.innerHTML =
      '<div class="indice-screen indice-resultats">' +
        '<span class="section-tag">' + T.resultsTag + '</span>' +
        '<h2>' + T.resultsTitle + '</h2>' +

        '<div class="indice-score-block" data-level="' + levelSlug + '">' +
          '<div class="indice-score-number" id="indice-score-number">0</div>' +
          '<div class="indice-score-suffix">/ 100</div>' +
          '<div class="indice-score-level">' + level + '</div>' +
        '</div>' +

        '<div class="indice-radar-wrap">' +
          '<canvas id="indice-radar" width="400" height="400"></canvas>' +
        '</div>' +

        '<div class="indice-pillars-results">' + pillarsHtml + '</div>' +

        '<div class="indice-conclusion">' +
          '<p>' + STRANEXO_CONCLUSION_COMMUNE + '</p>' +
        '</div>' +

        '<div class="indice-email-status" id="indice-email-status"></div>' +

        '<div class="cta-box indice-final-cta">' +
          '<span class="section-tag">' + T.ctaTag + '</span>' +
          '<h2>' + T.ctaTitle + '</h2>' +
          '<p>' + T.ctaText + '</p>' +
          '<a href="' + T.ctaLink + '" class="btn-primary">' + T.ctaButton + '</a>' +
        '</div>' +

        '<p class="indice-restart-link"><a href="#" id="btn-restart">' + T.restartDiagLink + '</a></p>' +
      '</div>';

    var restartLink = document.getElementById("btn-restart");
    if (restartLink) {
      restartLink.addEventListener("click", function (e) {
        e.preventDefault();
        restartDiagnostic();
      });
    }

    animateScore(globalIndex);
    renderRadar(pillarScores);

    var statusEl = document.getElementById("indice-email-status");
    if (state.emailSent) {
      if (statusEl) {
        statusEl.textContent = T.emailSentPrefix + state.company.email + ".";
        statusEl.classList.add("is-success");
      }
    } else {
      sendResultsByEmail(pillarScores, globalIndex, level);
    }
  }

  function animateScore(target) {
    var el = document.getElementById("indice-score-number");
    if (!el) return;
    var current = 0;
    var duration = 900;
    var start = null;

    function step(ts) {
      if (!start) start = ts;
      var progress = Math.min((ts - start) / duration, 1);
      current = Math.round(progress * target);
      el.textContent = current;
      if (progress < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  function renderRadar(pillarScores) {
    var canvas = document.getElementById("indice-radar");
    if (!canvas || typeof Chart === "undefined") return;

    if (radarChartInstance) {
      radarChartInstance.destroy();
    }

    radarChartInstance = new Chart(canvas.getContext("2d"), {
      type: "radar",
      data: {
        labels: STRANEXO_PILLARS.map(function (p) { return p.name; }),
        datasets: [{
          label: T.radarLabel,
          data: pillarScores,
          backgroundColor: "rgba(201,162,39,0.20)",
          borderColor: "#C9A227",
          borderWidth: 2,
          pointBackgroundColor: "#0F172A",
          pointRadius: 4
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        scales: {
          r: {
            min: 0,
            max: 100,
            ticks: { stepSize: 25, backdropColor: "transparent", color: "#94A3B8" },
            grid: { color: "#E5E7EB" },
            angleLines: { color: "#E5E7EB" },
            pointLabels: { color: "#0F172A", font: { size: 12, weight: "600" } }
          }
        },
        plugins: {
          legend: { display: false }
        }
      }
    });
  }

  /* ---------- ENVOI EMAIL ----------
     - Notification interne complète (toutes les réponses) -> axel@stranexo.com via formsubmit.co
       Toujours en français, quelle que soit la langue du visiteur : c'est Axel qui la lit,
       ça garde tous ses leads lisibles de la même façon dans sa boîte.
     - Confirmation visuelle brandée STRANEXO -> l'entreprise via EmailJS, dans sa langue.
  ====================================================== */

  var EMAILJS_SERVICE_ID = "service_rsogpte";
  var EMAILJS_TEMPLATE_ID_FR = "template_0e27s8c";
  var EMAILJS_TEMPLATE_ID_ES = "template_d8500xl";

  var EMAILJS_TEMPLATE_ID = LANG === "es" ? EMAILJS_TEMPLATE_ID_ES : EMAILJS_TEMPLATE_ID_FR;

  function sendInternalNotification(pillarScores, globalIndex, level) {
    var detail = STRANEXO_PILLARS.map(function (p, i) {
      var qa = p.questions.map(function (q, qi) {
        return "   - " + q + " -> " + answerLabel(state.answers[p.id][qi]);
      }).join("\n");
      return p.name + " : " + pillarScores[i] + "/100\n" + qa;
    }).join("\n\n");

    var payload = {
      _subject: "Indice STRANEXO - " + state.company.entreprise + " - " + globalIndex + "/100 (" + level + ")",
      _template: "box",
      _captcha: "false",
      email: state.company.email,
      "Langue": LANG === "es" ? "Espagnol (Argentine)" : "Français",
      "Entreprise": state.company.entreprise,
      "Secteur": state.company.secteur || "-",
      "Contact": state.company.contact,
      "Email": state.company.email,
      "Telephone": state.company.telephone || "-",
      "Indice STRANEXO": globalIndex + "/100",
      "Niveau de maturite": level,
      "Detail des reponses": detail
    };

    return fetch("https://formsubmit.co/ajax/axel@stranexo.com", {
      method: "POST",
      headers: { "Content-Type": "application/json", "Accept": "application/json" },
      body: JSON.stringify(payload)
    }).then(function (res) {
      if (!res.ok) throw new Error("formsubmit send failed");
    });
  }

  function buildPillarsEmailHtml(pillarScores) {
    return STRANEXO_PILLARS.map(function (p, i) {
      var score = pillarScores[i];
      var text = score >= 65 ? p.textHigh : p.textLow;
      return (
        '<tr><td style="padding:0 36px 16px;">' +
          '<table role="presentation" width="100%" style="background:#F8FAFC;border:1px solid #E5E7EB;border-radius:12px;">' +
            '<tr><td style="padding:18px 22px;">' +
              '<table role="presentation" width="100%"><tr>' +
                '<td style="font-size:15px;font-weight:700;color:#0F172A;">' + p.name + '</td>' +
                '<td style="text-align:right;font-size:17px;font-weight:800;color:#C9A227;white-space:nowrap;">' + score + '<span style="font-size:12px;color:#94A3B8;font-weight:600;"> /100</span></td>' +
              '</tr></table>' +
              '<p style="margin:10px 0 0;font-size:14px;color:#334155;line-height:1.6;">' + text + '</p>' +
            '</td></tr>' +
          '</table>' +
        '</td></tr>'
      );
    }).join("");
  }

  function sendCompanyConfirmation(pillarScores, globalIndex, level) {
    if (typeof emailjs === "undefined") {
      return Promise.reject(new Error("EmailJS non chargé"));
    }
    if (!EMAILJS_TEMPLATE_ID || EMAILJS_TEMPLATE_ID.indexOf("A_COMPLETER") !== -1) {
      return Promise.reject(new Error("Template EmailJS manquant pour la langue: " + LANG));
    }
    return emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
      to_email: state.company.email,
      to_name: state.company.contact,
      entreprise: state.company.entreprise,
      score: globalIndex,
      level: level,
      pillars_html: buildPillarsEmailHtml(pillarScores)
    });
  }

  function sendResultsByEmail(pillarScores, globalIndex, level) {
    var statusEl = document.getElementById("indice-email-status");

    Promise.allSettled([
      sendInternalNotification(pillarScores, globalIndex, level),
      sendCompanyConfirmation(pillarScores, globalIndex, level)
    ]).then(function (results) {
      var internalOk = results[0].status === "fulfilled";
      var companyOk = results[1].status === "fulfilled";

      state.emailSent = true;
      saveState();

      if (!internalOk) console.error("Notification interne (formsubmit) échouée:", results[0].reason);
      if (!companyOk) console.error("Confirmation entreprise (EmailJS) échouée:", results[1].reason);

      if (!statusEl) return;

      if (companyOk) {
        statusEl.textContent = T.emailSentPrefix + state.company.email + ".";
        statusEl.classList.add("is-success");
      } else {
        statusEl.textContent = T.emailErrorText;
        statusEl.classList.add("is-error");
      }
    });
  }

  /* ---------- INIT ---------- */

  var SCREEN_RENDERERS = {
    accueil: renderAccueil,
    presentation: renderPresentation,
    entreprise: renderEntreprise,
    pillar: renderPillar,
    calcul: renderResultats, // un rechargement pendant le calcul affiche directement les résultats
    resultats: renderResultats
  };

  // On ne reprend automatiquement que sur un diagnostic EN COURS (infos entreprise ou pilier).
  // Un diagnostic déjà terminé (résultats) ne doit pas rester affiché indéfiniment : une nouvelle
  // visite sur la page doit repartir sur un écran vierge, pas réafficher un ancien score.
  var RESUMABLE_SCREENS = ["entreprise", "pillar"];

  document.addEventListener("DOMContentLoaded", function () {
    if (!root) return;

    var saved = loadState();
    if (saved && RESUMABLE_SCREENS.indexOf(saved.screen) !== -1) {
      state = saved;
      var renderFn = SCREEN_RENDERERS[state.screen] || renderAccueil;
      renderFn();
    } else {
      if (saved) clearState();
      state = freshState();
      renderAccueil();
    }
  });
})();
