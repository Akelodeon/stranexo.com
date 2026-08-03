/* ======================================================
   INDICE STRANEXO — Moteur + Parcours + Email
   Dépend de js/indice-data.js (chargé avant ce fichier)
====================================================== */

(function () {
  "use strict";

  /* ---------- MOTEUR DE CALCUL ---------- */

  function computePillarScore(answers) {
    // answers: tableau de 6 valeurs (0 à 3), -1 pour "Je ne sais pas", null si pas répondu
    // "Je ne sais pas" compte comme 0 point, au même titre que "Non" : ne pas savoir
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
      if (score <= STRANEXO_LEVELS[i].max) return STRANEXO_LEVELS[i].label;
    }
    return STRANEXO_LEVELS[STRANEXO_LEVELS.length - 1].label;
  }

  function answerLabel(value) {
    var found = STRANEXO_ANSWER_SCALE.find(function (a) { return a.value === value; });
    return found ? found.label : "-";
  }

  /* ---------- ÉTAT ---------- */

  var STORAGE_KEY = "stranexo_indice_state_v1";

  function freshState() {
    var s = {
      screen: "accueil",
      pillarIndex: 0,
      company: { entreprise: "", secteur: "", contact: "", email: "", telephone: "" },
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
    progressLabel.textContent = "Étape " + step + " / " + TOTAL_STEPS;
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
        '<span class="section-tag">INDICE STRANEXO</span>' +
        '<h1>Quel est le niveau de maturité de vos flux internationaux ?</h1>' +
        '<p class="indice-lead">En 5 minutes, obtenez un premier indice de maturité de vos flux internationaux, sur 5 dimensions clés : gouvernance, achats, logistique, douane et pilotage par la donnée.</p>' +
        '<div class="indice-meta-row">' +
          '<div class="indice-meta"><strong>5 min</strong><span>chrono</span></div>' +
          '<div class="indice-meta"><strong>30</strong><span>questions</span></div>' +
          '<div class="indice-meta"><strong>/100</strong><span>indice chiffré</span></div>' +
        '</div>' +
        '<button type="button" class="btn-primary" id="btn-start">Démarrer mon diagnostic</button>' +
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
        '<span class="section-tag">COMMENT ÇA MARCHE</span>' +
        '<h2>Un diagnostic express en 5 piliers</h2>' +
        '<p>Pour chaque pilier, 6 questions fermées. Répondez avec la réponse la plus proche de votre réalité actuelle : Oui, En grande partie, Partiellement, ou Non.</p>' +
        '<ul class="feature-list indice-pillars-list">' + pillarsList + '</ul>' +
        '<p class="indice-note">À l\'issue du diagnostic, vous obtenez un Indice STRANEXO sur 100 ainsi qu\'un niveau de maturité, et vous recevez vos résultats par email.</p>' +
        '<div class="indice-nav-buttons">' +
          '<button type="button" class="btn-secondary" id="btn-back-accueil">Retour</button>' +
          '<button type="button" class="btn-primary" id="btn-start-entreprise">Commencer</button>' +
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
        '<span class="section-tag">VOS COORDONNÉES</span>' +
        '<h2>Quelques informations avant de commencer</h2>' +
        '<p class="indice-note">Ces informations nous permettent de vous adresser vos résultats par email et, si vous le souhaitez, d\'échanger avec vous ensuite.</p>' +
        '<form id="form-entreprise" class="indice-form" novalidate>' +
          '<div class="indice-field">' +
            '<label for="f-entreprise">Nom de l\'entreprise *</label>' +
            '<input type="text" id="f-entreprise" name="entreprise" required value="' + c.entreprise + '">' +
          '</div>' +
          '<div class="indice-field">' +
            '<label for="f-secteur">Secteur d\'activité</label>' +
            '<input type="text" id="f-secteur" name="secteur" value="' + c.secteur + '">' +
          '</div>' +
          '<div class="indice-field">' +
            '<label for="f-contact">Nom et prénom *</label>' +
            '<input type="text" id="f-contact" name="contact" required value="' + c.contact + '">' +
          '</div>' +
          '<div class="indice-field">' +
            '<label for="f-email">Email professionnel *</label>' +
            '<input type="email" id="f-email" name="email" required value="' + c.email + '">' +
          '</div>' +
          '<div class="indice-field">' +
            '<label for="f-telephone">Téléphone</label>' +
            '<input type="tel" id="f-telephone" name="telephone" value="' + c.telephone + '">' +
          '</div>' +
          '<label class="indice-consent">' +
            '<input type="checkbox" id="f-consent" required>' +
            '<span>J\'accepte que mes données et mes réponses soient utilisées par STRANEXO pour m\'adresser mes résultats et me recontacter à ce sujet.</span>' +
          '</label>' +
          '<div class="indice-nav-buttons">' +
            '<button type="button" class="btn-secondary" id="btn-back-presentation">Retour</button>' +
            '<button type="submit" class="btn-primary">Commencer le diagnostic</button>' +
          '</div>' +
        '</form>' +
        '<p class="indice-restart-link"><a href="#" id="btn-restart">Recommencer le diagnostic à zéro</a></p>' +
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

      if (!state.company.entreprise || !state.company.contact || !state.company.email) return;

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
        '<span class="section-tag">PILIER ' + (i + 1) + ' / ' + STRANEXO_PILLARS.length + '</span>' +
        '<h2>' + pillar.name + '</h2>' +
        '<div class="indice-questions">' + questionsHtml + '</div>' +
        '<div class="indice-nav-buttons">' +
          '<button type="button" class="btn-secondary" id="btn-pillar-back">Précédent</button>' +
          '<button type="button" class="btn-primary" id="btn-pillar-next" disabled>Continuer</button>' +
        '</div>' +
        '<p class="indice-restart-link"><a href="#" id="btn-restart">Recommencer le diagnostic à zéro</a></p>' +
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
        '<h2>Calcul de votre Indice STRANEXO...</h2>' +
        '<p class="indice-note">Analyse de vos réponses sur les 5 piliers.</p>' +
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
    var level = getMaturityLevel(globalIndex);
    var levelSlug = level.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/\s+/g, "-");

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
        '<span class="section-tag">VOS RÉSULTATS</span>' +
        '<h2>Votre Indice STRANEXO</h2>' +

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
          '<span class="section-tag">ET MAINTENANT ?</span>' +
          '<h2>Passez du constat à la cartographie de vos flux</h2>' +
          '<p>L\'Indice STRANEXO donne une première mesure. Un diagnostic approfondi permet d\'identifier précisément vos fragilités et vos leviers de performance.</p>' +
          '<a href="index.html#contact" class="btn-primary">Planifier un échange avec STRANEXO</a>' +
        '</div>' +
      '</div>';

    animateScore(globalIndex);
    renderRadar(pillarScores);

    var statusEl = document.getElementById("indice-email-status");
    if (state.emailSent) {
      if (statusEl) {
        statusEl.textContent = "Vos résultats vous ont été envoyés par email à " + state.company.email + ".";
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
          label: "Indice par pilier",
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
     - Confirmation visuelle brandée STRANEXO -> l'entreprise via EmailJS
  ====================================================== */

  var EMAILJS_SERVICE_ID = "service_rsogpte";
  var EMAILJS_TEMPLATE_ID = "template_0e27s8c";

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

  function sendCompanyConfirmation(globalIndex, level) {
    if (typeof emailjs === "undefined") {
      return Promise.reject(new Error("EmailJS non chargé"));
    }
    return emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
      to_email: state.company.email,
      to_name: state.company.contact,
      entreprise: state.company.entreprise,
      score: globalIndex,
      level: level
    });
  }

  function sendResultsByEmail(pillarScores, globalIndex, level) {
    var statusEl = document.getElementById("indice-email-status");

    Promise.allSettled([
      sendInternalNotification(pillarScores, globalIndex, level),
      sendCompanyConfirmation(globalIndex, level)
    ]).then(function (results) {
      var internalOk = results[0].status === "fulfilled";
      var companyOk = results[1].status === "fulfilled";

      state.emailSent = true;
      saveState();

      if (!internalOk) console.error("Notification interne (formsubmit) échouée:", results[0].reason);
      if (!companyOk) console.error("Confirmation entreprise (EmailJS) échouée:", results[1].reason);

      if (!statusEl) return;

      if (companyOk) {
        statusEl.textContent = "Vos résultats ont été envoyés par email à " + state.company.email + ".";
        statusEl.classList.add("is-success");
      } else {
        statusEl.textContent = "L'envoi automatique par email a rencontré un problème. Vous pouvez nous contacter directement à axel@stranexo.com pour recevoir vos résultats.";
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

  document.addEventListener("DOMContentLoaded", function () {
    if (!root) return;

    var saved = loadState();
    if (saved && saved.screen && saved.screen !== "accueil") {
      state = saved;
      if (state.screen === "calcul") state.screen = "resultats";
      var renderFn = SCREEN_RENDERERS[state.screen] || renderAccueil;
      renderFn();
    } else {
      renderAccueil();
    }
  });
})();
