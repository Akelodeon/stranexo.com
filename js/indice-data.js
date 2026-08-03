/* ======================================================
   INDICE STRANEXO — CONTENU (piliers, questions, restitutions)
   ======================================================
   Contenu validé par Axel, disponible en français et en espagnol
   (Argentine, voseo). Le moteur (js/indice.js) choisit la bonne
   langue automatiquement via l'attribut <html lang="..."> de la page.

   Chaque niveau de maturité a une "key" (stable, ne change jamais
   selon la langue, utilisée pour le code couleur CSS) et un "label"
   (le texte affiché, traduit).
====================================================== */

const STRANEXO_CONTENT = {

  fr: {

    answerScale: [
      { value: 3, label: "Oui" },
      { value: 2, label: "En grande partie" },
      { value: 1, label: "Partiellement" },
      { value: 0, label: "Non" },
      { value: -1, label: "Je ne sais pas" }
    ],

    conclusion: "Seul un diagnostic approfondi avec STRANEXO permet d'expliquer précisément ces résultats et d'identifier les leviers d'action prioritaires pour votre organisation.",

    levels: [
      { max: 39, key: "fragile", label: "Fragile" },
      { max: 64, key: "en-developpement", label: "En développement" },
      { max: 84, key: "maitrisee", label: "Maîtrisée" },
      { max: 100, key: "performante", label: "Performante" }
    ],

    pillars: [
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
    ]
  },

  es: {

    answerScale: [
      { value: 3, label: "Sí" },
      { value: 2, label: "En gran parte" },
      { value: 1, label: "Parcialmente" },
      { value: 0, label: "No" },
      { value: -1, label: "No lo sé" }
    ],

    conclusion: "Solo un diagnóstico en profundidad con STRANEXO permite explicar con precisión estos resultados e identificar las palancas de acción prioritarias para tu organización.",

    levels: [
      { max: 39, key: "fragile", label: "Frágil" },
      { max: 64, key: "en-developpement", label: "En desarrollo" },
      { max: 84, key: "maitrisee", label: "Consolidada" },
      { max: 100, key: "performante", label: "De alto rendimiento" }
    ],

    pillars: [
      {
        id: "transport",
        name: "Transporte internacional",
        measures: "El nivel de control global de las operaciones de transporte internacional y su impacto en el rendimiento de la empresa.",
        questions: [
          "¿Tu organización tiene bajo control el desarrollo de sus operaciones de transporte internacional?",
          "¿Los imprevistos relacionados con tus transportes internacionales siguen siendo excepcionales?",
          "¿El desarrollo de tus operaciones de transporte internacional suele corresponder con lo esperado?",
          "¿Tus costos de transporte internacional están globalmente bajo control?",
          "¿Los retrasos o incidentes de transporte tienen un impacto limitado en tu actividad?",
          "¿Los servicios de tus socios de transporte cumplen plenamente con tus expectativas?"
        ],
        textHigh: "Tus respuestas reflejan un buen control global de tus operaciones de transporte internacional. Esta madurez constituye una ventaja para la confiabilidad de tus intercambios internacionales.",
        textLow: "Tus respuestas ponen en evidencia que el transporte internacional constituye un punto de atención para tu empresa. Algunas situaciones parecen tener un impacto mayor al esperado en tus operaciones. Este prediagnóstico no permite identificar las causas, pero revela un nivel de madurez que merece ser profundizado."
      },
      {
        id: "douane",
        name: "Aduana",
        measures: "El nivel de control de los desafíos aduaneros por parte de la empresa y su impacto en la seguridad y fluidez de sus operaciones internacionales.",
        questions: [
          "¿Los trámites aduaneros relacionados con tus operaciones internacionales se desarrollan sin dificultades importantes?",
          "¿Tu empresa tiene bajo control las obligaciones aduaneras aplicables a sus intercambios internacionales?",
          "¿Los controles o requerimientos de las autoridades aduaneras siguen siendo excepcionales?",
          "¿Considerás que tus operaciones aduaneras están globalmente bajo control?",
          "¿Las operaciones aduaneras tienen un impacto limitado en tus plazos y en tu actividad?",
          "¿Los servicios de tus socios aduaneros cumplen plenamente con tus expectativas?"
        ],
        textHigh: "Tus respuestas reflejan un buen control de los desafíos aduaneros vinculados a tus actividades internacionales. Esta situación contribuye a asegurar tus intercambios y a limitar las perturbaciones que podrían afectar tus operaciones.",
        textLow: "Tus respuestas ponen en evidencia que los desafíos aduaneros constituyen un punto de atención para tu empresa. Algunos elementos pueden afectar la fluidez o la seguridad de tus operaciones internacionales. Este prediagnóstico no permite identificar las causas, pero revela un nivel de madurez que merece ser profundizado."
      },
      {
        id: "incoterms",
        name: "Incoterms",
        measures: "El nivel de control sobre la distribución de responsabilidades, costos y riesgos en los intercambios internacionales.",
        questions: [
          "¿Las responsabilidades entre tu empresa y tus socios (proveedores, clientes, transportistas) están claramente establecidas para cada operación internacional?",
          "¿Tu empresa domina plenamente las implicancias de los Incoterms utilizados en sus intercambios internacionales?",
          "¿Los Incoterms utilizados en tus intercambios internacionales respaldan eficazmente tus operaciones?",
          "¿Tus operaciones internacionales se desarrollan sin conflictos ni ambigüedades respecto de las responsabilidades de cada parte?",
          "¿Los Incoterms se aplican de manera coherente en el conjunto de tus intercambios internacionales?",
          "¿Los Incoterms utilizados tienen un impacto limitado en tus costos, plazos y riesgos?"
        ],
        textHigh: "Tus respuestas reflejan un buen control de la distribución de responsabilidades en tus intercambios internacionales. Esta situación contribuye a asegurar tus operaciones y a limitar las zonas de incertidumbre entre las distintas partes.",
        textLow: "Tus respuestas ponen en evidencia que la gestión de responsabilidades en tus intercambios internacionales constituye un punto de atención. Algunas situaciones pueden generar mayor incertidumbre o impacto en tus operaciones. Este prediagnóstico no permite identificar las causas, pero revela un nivel de madurez que merece ser profundizado."
      },
      {
        id: "fournisseurs",
        name: "Proveedores",
        measures: "El nivel de confiabilidad de los proveedores internacionales y su impacto en el rendimiento de los flujos de la empresa.",
        questions: [
          "¿El desempeño de tus proveedores internacionales es globalmente confiable y regular?",
          "¿Tus proveedores cumplen de manera constante con los plazos anunciados?",
          "¿La información que brindan tus proveedores (fechas, cantidades, documentos…) es confiable y está disponible a tiempo?",
          "¿El desempeño de tus proveedores internacionales se mantiene estable, incluso ante imprevistos?",
          "¿Tu empresa tiene bajo control los desafíos vinculados a sus proveedores internacionales?",
          "¿El desempeño de tus proveedores tiene un impacto limitado en tus costos, plazos o riesgos?"
        ],
        textHigh: "Tus respuestas reflejan una buena confiabilidad de tus proveedores internacionales. Esta situación contribuye a la estabilidad de tus flujos y limita las perturbaciones que podrían afectar tu actividad.",
        textLow: "Tus respuestas ponen en evidencia que tus proveedores internacionales constituyen un punto de atención para tu empresa. Algunas situaciones parecen generar más incertidumbre que en las organizaciones más maduras. Este prediagnóstico no permite identificar las causas, pero revela un nivel de madurez que merece ser profundizado."
      },
      {
        id: "organisation",
        name: "Organización",
        measures: "El nivel de organización de las actividades internacionales y su impacto en la fluidez de las operaciones de la empresa.",
        questions: [
          "¿Considerás que tu organización está adaptada a las exigencias de tus actividades internacionales?",
          "¿Tus actividades internacionales se desarrollan de manera fluida en el día a día?",
          "¿Los imprevistos relacionados con la organización de tus actividades internacionales siguen siendo excepcionales?",
          "¿Tu organización te permite gestionar eficazmente tus actividades internacionales?",
          "¿La organización de tus actividades internacionales tiene un impacto limitado en tus costos, plazos o riesgos?",
          "¿Tu organización permite mantener la continuidad de tus actividades internacionales?"
        ],
        textHigh: "Tus respuestas reflejan un buen nivel de organización de tus actividades internacionales. Esta situación contribuye a la fluidez de tus operaciones y limita las perturbaciones que podrían afectar tu actividad.",
        textLow: "Tus respuestas ponen en evidencia que la organización de tus actividades internacionales constituye un punto de atención para tu empresa. Algunas situaciones parecen generar más incertidumbre que en las organizaciones más maduras. Este prediagnóstico no permite identificar las causas, pero revela un nivel de madurez que merece ser profundizado."
      }
    ]
  }

};
