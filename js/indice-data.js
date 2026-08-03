/* ======================================================
   INDICE STRANEXO — CONTENU (piliers, questions, restitutions)
   ======================================================
   ⚠️ CONTENU PROVISOIRE — À REMPLACER PAR AXEL

   Ce fichier contient uniquement du CONTENU (aucune logique).
   Il suffit de remplacer les textes ci-dessous par les 5 piliers,
   30 questions et textes de restitution définitifs validés.
   La structure (id, name, measures, questions[6], textHigh, textLow)
   doit rester identique pour que le reste de l'outil continue de
   fonctionner sans modification.
====================================================== */

const STRANEXO_ANSWER_SCALE = [
  { value: 3, label: "Oui" },
  { value: 2, label: "En grande partie" },
  { value: 1, label: "Partiellement" },
  { value: 0, label: "Non" }
];

const STRANEXO_CONCLUSION_COMMUNE =
  "Seul un diagnostic approfondi avec STRANEXO permet d'expliquer précisément ces résultats et d'identifier les leviers d'action prioritaires pour votre organisation.";

const STRANEXO_PILLARS = [
  {
    id: "gouvernance",
    name: "Pilotage & Gouvernance des flux",
    measures: "Ce pilier mesure la capacité de votre organisation à piloter ses flux internationaux de façon structurée, avec des rôles clairs et une visibilité sur la performance globale.",
    questions: [
      "Votre organisation dispose-t-elle d'une vision consolidée de l'ensemble de ses flux internationaux (import/export) ?",
      "Les rôles et responsabilités liés aux flux internationaux sont-ils clairement définis au sein de votre organisation ?",
      "Disposez-vous d'indicateurs de performance (KPI) suivis régulièrement sur vos flux internationaux ?",
      "Les décisions concernant vos flux internationaux sont-elles anticipées plutôt que subies dans l'urgence ?",
      "Votre direction a-t-elle une visibilité claire sur les coûts logistiques et douaniers globaux ?",
      "Existe-t-il une coordination formalisée entre les services impliqués (achats, logistique, douane, commercial) ?"
    ],
    textHigh: "Votre organisation démontre un pilotage structuré de ses flux internationaux, avec des repères clairs et un suivi régulier de la performance.",
    textLow: "Le pilotage de vos flux internationaux repose aujourd'hui davantage sur une gestion au cas par cas que sur une vision consolidée et anticipée."
  },
  {
    id: "achats",
    name: "Fournisseurs & Achats Internationaux",
    measures: "Ce pilier mesure la maîtrise de votre organisation sur la sélection, l'évaluation et le suivi de vos fournisseurs et partenaires à l'international.",
    questions: [
      "Disposez-vous d'une méthode formalisée de sélection et d'évaluation de vos fournisseurs internationaux ?",
      "Votre organisation diversifie-t-elle ses sources d'approvisionnement pour limiter sa dépendance à un seul pays ou fournisseur ?",
      "Les conditions contractuelles (incoterms, délais, pénalités) sont-elles systématiquement négociées et formalisées ?",
      "Suivez-vous la performance de vos fournisseurs internationaux dans la durée (qualité, délais, fiabilité) ?",
      "Votre organisation anticipe-t-elle les risques de rupture d'approvisionnement à l'international ?",
      "Les achats internationaux sont-ils coordonnés avec les équipes logistique et douane en amont des commandes ?"
    ],
    textHigh: "Votre organisation maîtrise bien la relation avec ses fournisseurs internationaux, avec des pratiques d'achat structurées et suivies.",
    textLow: "La relation avec vos fournisseurs internationaux semble aujourd'hui gérée de façon plus réactive que structurée."
  },
  {
    id: "logistique",
    name: "Transport & Logistique Internationale",
    measures: "Ce pilier mesure la robustesse de votre organisation logistique : choix des modes de transport, gestion des flux physiques et anticipation des aléas.",
    questions: [
      "Votre organisation compare-t-elle régulièrement les modes et prestataires de transport pour optimiser coûts et délais ?",
      "Disposez-vous d'une visibilité en temps réel (ou quasi réel) sur l'avancement de vos flux de transport internationaux ?",
      "Les délais de livraison internationaux sont-ils globalement fiables et respectés ?",
      "Votre organisation dispose-t-elle d'un plan de secours en cas d'incident logistique majeur (grève, congestion, rupture) ?",
      "Les flux internationaux sont-ils optimisés pour limiter les ruptures de charge et les coûts inutiles ?",
      "Votre organisation mesure-t-elle le coût logistique complet de ses flux internationaux (bout en bout) ?"
    ],
    textHigh: "Votre organisation dispose d'une logistique internationale robuste, avec une bonne visibilité et une capacité d'anticipation des aléas.",
    textLow: "Votre logistique internationale semble aujourd'hui exposée à des aléas mal anticipés, avec une visibilité perfectible sur les flux physiques."
  },
  {
    id: "douane",
    name: "Douane & Conformité Réglementaire",
    measures: "Ce pilier mesure le niveau de maîtrise et de sécurisation de votre organisation face aux obligations douanières et réglementaires du commerce international.",
    questions: [
      "Votre organisation maîtrise-t-elle la classification tarifaire et l'origine douanière de l'ensemble de ses produits ?",
      "Les procédures douanières (import/export) sont-elles documentées et connues des équipes concernées ?",
      "Votre organisation a-t-elle déjà fait l'objet d'un contrôle douanier sans difficulté majeure identifiée ?",
      "Disposez-vous d'une veille active sur les évolutions réglementaires impactant vos flux internationaux ?",
      "Les statuts et autorisations douanières dont vous pourriez bénéficier (OEA, régimes particuliers...) sont-ils identifiés et évalués ?",
      "La conformité réglementaire de vos flux internationaux est-elle vérifiée avant la mise en place de nouveaux courants d'affaires ?"
    ],
    textHigh: "Votre organisation présente un bon niveau de maîtrise de ses obligations douanières et réglementaires à l'international.",
    textLow: "La conformité douanière et réglementaire de vos flux internationaux comporte aujourd'hui probablement des zones d'incertitude."
  },
  {
    id: "data",
    name: "Données, Outils & Performance",
    measures: "Ce pilier mesure la capacité de votre organisation à s'appuyer sur des données fiables et des outils adaptés pour piloter la performance de ses flux internationaux.",
    questions: [
      "Les données relatives à vos flux internationaux (coûts, délais, volumes) sont-elles centralisées et fiables ?",
      "Votre organisation utilise-t-elle des outils digitaux dédiés au pilotage de ses flux internationaux (TMS, ERP, etc.) ?",
      "Les données douanières et logistiques sont-elles exploitées pour identifier des axes d'amélioration ?",
      "Votre organisation est-elle en mesure de simuler l'impact d'une décision (nouveau fournisseur, nouvelle route) avant de la prendre ?",
      "Le partage d'information entre les équipes internes et vos prestataires externes est-il fluide et structuré ?",
      "Votre organisation revoit-elle régulièrement la performance globale de ses flux internationaux sur la base de données chiffrées ?"
    ],
    textHigh: "Votre organisation s'appuie sur des données et des outils structurés pour piloter la performance de ses flux internationaux.",
    textLow: "Le pilotage de vos flux internationaux par la donnée semble aujourd'hui limité, avec des informations dispersées ou peu exploitées."
  }
];

const STRANEXO_LEVELS = [
  { max: 39, label: "Fragile" },
  { max: 64, label: "En développement" },
  { max: 84, label: "Maîtrisée" },
  { max: 100, label: "Performante" }
];
