/* ======================================================
   INDICE STRANEXO — CONTENU (piliers, questions, restitutions)
   ======================================================
   Contenu validé par Axel : 5 piliers, 6 questions chacun,
   restitutions (ce qui est mesuré / texte score élevé / texte
   score faible). La conclusion commune est définie une seule
   fois plus bas (STRANEXO_CONCLUSION_COMMUNE).
====================================================== */

const STRANEXO_ANSWER_SCALE = [
  { value: 3, label: "Oui" },
  { value: 2, label: "En grande partie" },
  { value: 1, label: "Partiellement" },
  { value: 0, label: "Non" },
  { value: -1, label: "Je ne sais pas" }
];

const STRANEXO_CONCLUSION_COMMUNE =
  "Seul un diagnostic approfondi avec STRANEXO permet d'expliquer précisément ces résultats et d'identifier les leviers d'action prioritaires pour votre organisation.";

const STRANEXO_PILLARS = [
  {
    id: "transport",
    name: "Transport international",
    measures: "Le niveau de maîtrise global des opérations de transport international et leur impact sur la performance de l’entreprise.",
    questions: [
      "Votre organisation maîtrise-t-elle le déroulement de ses opérations de transport international ?",
      "Les imprévus liés à vos transports internationaux restent-ils exceptionnels ?",
      "Le déroulement de vos opérations de transport international correspond-il généralement à ce qui était attendu ?",
      "Vos coûts de transport international sont-ils globalement maîtrisés ?",
      "Les retards ou incidents de transport ont-ils un impact limité sur votre activité ?",
      "Les prestations de vos partenaires transport répondent-elles pleinement à vos attentes ?"
    ],
    textHigh: "Vos réponses traduisent une bonne maîtrise globale de vos opérations de transport international. Cette maturité constitue un atout pour la fiabilité de vos échanges internationaux.",
    textLow: "Vos réponses mettent en évidence que le transport international constitue un point de vigilance pour votre entreprise. Certaines situations semblent avoir un impact plus important qu’attendu sur vos opérations. Ce pré-diagnostic ne permet pas d’en identifier les causes, mais il révèle un niveau de maturité qui mérite d’être approfondi."
  },
  {
    id: "douane",
    name: "Douane",
    measures: "Le niveau de maîtrise des enjeux douaniers par l’entreprise et leur impact sur la sécurité et la fluidité de ses opérations internationales.",
    questions: [
      "Les formalités douanières liées à vos opérations internationales se déroulent-elles sans difficulté majeure ?",
      "Votre entreprise maîtrise-t-elle les obligations douanières applicables à ses échanges internationaux ?",
      "Les contrôles ou demandes des autorités douanières restent-ils exceptionnels ?",
      "Considérez-vous que vos opérations douanières sont globalement maîtrisées ?",
      "Les opérations douanières ont-elles un impact limité sur vos délais et votre activité ?",
      "Les prestations de vos partenaires en douane répondent-elles pleinement à vos attentes ?"
    ],
    textHigh: "Vos réponses traduisent une bonne maîtrise des enjeux douaniers liés à vos activités internationales. Cette situation contribue à sécuriser vos échanges et à limiter les perturbations susceptibles d’affecter vos opérations.",
    textLow: "Vos réponses mettent en évidence que les enjeux douaniers constituent un point de vigilance pour votre entreprise. Certains éléments peuvent affecter la fluidité ou la sécurité de vos opérations internationales. Ce pré-diagnostic ne permet pas d’en identifier les causes, mais il révèle un niveau de maturité qui mérite d’être approfondi."
  },
  {
    id: "incoterms",
    name: "Incoterms",
    measures: "Le niveau de maîtrise de la répartition des responsabilités, des coûts et des risques dans les échanges internationaux.",
    questions: [
      "Les responsabilités entre votre entreprise et vos partenaires (fournisseurs, clients, transporteurs) sont-elles clairement établies pour chaque opération internationale ?",
      "Votre entreprise maîtrise-t-elle pleinement les implications des Incoterms utilisés dans ses échanges internationaux ?",
      "Les Incoterms utilisés dans vos échanges internationaux soutiennent-ils efficacement vos opérations ?",
      "Vos opérations internationales se déroulent-elles sans litiges ou ambiguïtés liés aux responsabilités de chacun ?",
      "Les Incoterms sont-ils appliqués de manière cohérente dans l’ensemble de vos échanges internationaux ?",
      "Les Incoterms utilisés ont-ils un impact limité sur vos coûts, vos délais et vos risques ?"
    ],
    textHigh: "Vos réponses traduisent une bonne maîtrise de la répartition des responsabilités dans vos échanges internationaux. Cette situation contribue à sécuriser vos opérations et à limiter les zones d’incertitude entre les différentes parties.",
    textLow: "Vos réponses mettent en évidence que la gestion des responsabilités dans vos échanges internationaux constitue un point de vigilance. Certaines situations peuvent générer davantage d’incertitudes ou d’impact sur vos opérations. Ce pré-diagnostic ne permet pas d’en identifier les causes, mais il révèle un niveau de maturité qui mérite d’être approfondi."
  },
  {
    id: "fournisseurs",
    name: "Fournisseurs",
    measures: "Le niveau de fiabilité des fournisseurs internationaux et leur impact sur la performance des flux de l’entreprise.",
    questions: [
      "Les performances de vos fournisseurs internationaux sont-elles globalement fiables et régulières ?",
      "Vos fournisseurs respectent-ils de manière constante les délais annoncés ?",
      "Les informations fournies par vos fournisseurs (dates, quantités, documents…) sont-elles fiables et disponibles en temps voulu ?",
      "Les performances de vos fournisseurs internationaux restent-elles stables, y compris en cas d’imprévus ?",
      "Votre entreprise maîtrise-t-elle les enjeux liés à ses fournisseurs internationaux ?",
      "Les performances de vos fournisseurs ont-elles un impact limité sur vos coûts, vos délais ou vos risques ?"
    ],
    textHigh: "Vos réponses traduisent une bonne fiabilité de vos fournisseurs internationaux. Cette situation contribue à la stabilité de vos flux et limite les perturbations susceptibles d’affecter votre activité.",
    textLow: "Vos réponses mettent en évidence que vos fournisseurs internationaux constituent un point de vigilance pour votre entreprise. Certaines situations semblent générer davantage d’incertitudes qu’au sein des organisations les plus matures. Ce pré-diagnostic ne permet pas d’en identifier les causes, mais il révèle un niveau de maturité qui mérite d’être approfondi."
  },
  {
    id: "organisation",
    name: "Organisation",
    measures: "Le niveau d’organisation des activités internationales et son impact sur la fluidité des opérations de l’entreprise.",
    questions: [
      "Considérez-vous que votre organisation est adaptée aux exigences de vos activités internationales ?",
      "Vos activités internationales se déroulent-elles de manière fluide au quotidien ?",
      "Les imprévus liés à l’organisation de vos activités internationales restent-ils exceptionnels ?",
      "Votre organisation vous permet-elle de piloter efficacement vos activités internationales ?",
      "L’organisation de vos activités internationales a-t-elle un impact limité sur vos coûts, vos délais ou vos risques ?",
      "Votre organisation permet-elle de maintenir la continuité de vos activités internationales ?"
    ],
    textHigh: "Vos réponses traduisent un bon niveau d’organisation de vos activités internationales. Cette situation contribue à la fluidité de vos opérations et limite les perturbations susceptibles d’affecter votre activité.",
    textLow: "Vos réponses mettent en évidence que l’organisation de vos activités internationales constitue un point de vigilance pour votre entreprise. Certaines situations semblent générer davantage d’incertitudes qu’au sein des organisations les plus matures. Ce pré-diagnostic ne permet pas d’en identifier les causes, mais il révèle un niveau de maturité qui mérite d’être approfondi."
  }
];

const STRANEXO_LEVELS = [
  { max: 39, label: "Fragile" },
  { max: 64, label: "En développement" },
  { max: 84, label: "Maîtrisée" },
  { max: 100, label: "Performante" }
];
