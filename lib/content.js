import { featuredProduct, upcomingProducts } from "@/lib/products";

export const navigation = [
  { href: "/particulier", label: "Poêles" },
  { href: "/fumisterie", label: "Fumisterie" },
  { href: "/histoire", label: "Notre histoire" },
  { href: "/journal", label: "Journal" },
  { href: "/contact", label: "Contact" }
];

export const homeUseCases = [
  {
    title: "Vans & Bus",
    description: "Pour les amenagements mobiles qui demandent une chaleur fiable sans sacrifier le volume utile.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAhudwv308au8zwZje1P6pnODfM4o_d1zyffGZw_h6blXtLGIdPTUBFq4nfc7lNnqpeFd5XnUGRgjb3cHmhbds8sqHXH29U8ZLoEuLqnZm9QJa5-9y4DfIRUJPCprc_NS7nOXAliCBfRv4lFgOeZjDshPqSfJEOP-qA34E0VAvK8R8OYVtmjmxwup4MLNzOWQB6cz0Fnj8_DArH_Lon-F8Dn2hLOI_VXAuh1oQeUIw7gAqgXD6LDewEyqek0_MsAgmAFXvZo0EWLhM"
  },
  {
    title: "Tiny Houses",
    description: "Une combustion propre et une inertie durable pour les habitats fixes ou semi-mobiles a faible volume.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDS-VgV20rhJlzXl4veX7V_Kr2k1HPJuHMvfhE5H8kY6VPLV68EaQyxRaZOhMGXkuKHWarkBiWaAF9VLgT1x-38m_GHsMwrbPkoqI6urMudE3rGcvSAaeF4L0uPkC2Y9n7cTibDVCtIjhfN_bOkgxf9lR6bSWpJKBWQm7JaF4jsZL6xrQqKYdhH4OaaQ0-yxHYlJdP9rItwX4NqCpboMPvi1KmLybdSysWKP8hi7UOSt7r7SYOVBhfCDF71je3tIN0ynU_Ui1ZgDN8"
  },
  {
    title: "Chalets compacts",
    description: "Une source de chaleur expressive, adaptee aux petits espaces de montagne et aux refuges quatre saisons.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAQX_LaG6by-7w4v6VnxWUhBeFQCoxUn7-uL595zFRqdHXnBiUtiG0r06AE8N0dq6a80nDKdHXCy38bq-9gjkb_fOGA_0j5PbvQv8nhMLe3oK2A6pssc2_ghChlOpPCvPrEmOAz41RKuttu-Bq9T6SthQhABYiTSenqD81D9FEgLhxCJmu3QxottectnvwYq4ORTEawgPfnoq6pSUgrko6F60ghs3rZy90kmys4SdOycfravb8ajJpMYO1J4PSEiGXI0rNuorVw04E"
  }
];

export const historyPillars = [
  {
    title: "Durabilite",
    description: "Acier epais, fonte a haute inertie et assemblage controle un par un a l'atelier."
  },
  {
    title: "Securite",
    description: "Double combustion, guide d'installation et distances de securite pensees pour les petits volumes."
  },
  {
    title: "Compacite",
    description: "Chaque millimetre sert la performance thermique pour conserver le plus d'espace possible."
  }
];

export const journalArticles = [
  {
    slug: "installer-poele-bois-mercedes-sprinter",
    title: "Installer un poele a bois dans un Mercedes Sprinter",
    category: "Installation",
    readingTime: "8 min",
    publishedAt: "6 avril 2026",
    excerpt:
      "Les points de vigilance, les distances de securite et la logique de sortie de conduit pour un amenagement mobile.",
    lede:
      "Installer un poele dans un fourgon n'a rien d'un geste decoratif. C'est un ensemble de choix techniques qui doivent proteger l'habitacle, assurer le tirage et conserver une circulation fluide a bord.",
    quote:
      "Dans un van, une bonne installation est d'abord une installation que l'on oublie une fois en route.",
    takeaways: [
      "Toujours penser l'implantation avant le mobilier fixe.",
      "Le tirage depend autant du conduit que des entrees d'air.",
      "Une premiere mise a feu progressive reste indispensable."
    ],
    sections: [
      {
        heading: "Choisir l'emplacement avant tout",
        paragraphs: [
          "Dans un Mercedes Sprinter, l'enjeu principal est de trouver une zone stable, facile a proteger et compatible avec la circulation quotidienne. L'emplacement ideal ne coupe ni le passage, ni l'acces aux rangements, ni l'ouverture des portes.",
          "Il faut egalement penser la lecture du feu depuis la zone de vie. Un poele bien implante chauffe mieux parce qu'il travaille dans un volume coherent et laisse le rayonnement se diffuser sans obstacle inutile."
        ]
      },
      {
        heading: "Respecter les distances de securite",
        paragraphs: [
          "Les parois proches doivent etre protegees par des materiaux adaptes et un ecran thermique correctement ventile. Le but n'est pas seulement de respecter une distance minimale, mais d'eviter les points chauds repetes dans le temps.",
          "Dans un amenagement mobile, les vibrations et les variations de temperature imposent une execution particulierement soignee. Une fixation juste et un appui stable valent mieux qu'une solution improvisee."
        ],
        bullets: [
          "Verifier la distance entre poele, cloison et mobilier.",
          "Prevoir une protection de sol continue sous et autour de l'appareil.",
          "Controler tous les assemblages apres les premiers trajets."
        ]
      },
      {
        heading: "Soigner la sortie de conduit",
        paragraphs: [
          "Le conduit doit offrir un parcours lisible, limite en coudes et bien maintenu jusque dans la traversee de toit. Plus la ligne est propre, plus le tirage sera regulier.",
          "Une traversee correctement etanchee protege l'enveloppe du vehicule et limite les risques de condensation ou d'usure prematuree. C'est une zone qui merite du temps, des controles et une execution sans approximation."
        ]
      },
      {
        heading: "Reussir la premiere mise a feu",
        paragraphs: [
          "La premiere chauffe doit rester progressive. Elle permet aux materiaux de monter en temperature sans choc brutal et donne l'occasion de verifier le comportement du tirage, les odeurs de rodage et les flux d'air dans l'habitacle.",
          "C'est aussi le bon moment pour definir votre routine: taille de buches, cadence d'alimentation, aeration et surveillance des surfaces proches."
        ]
      }
    ],
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCc0K0DT314BhjF3sA37Iqzeh7EcZyxxZDzmnggrHt2wSezQxFamBTYuOW4NRjRNBuR-18OA6Y90lGy90JhwiH5NPAN2DkorZ8f_4tGTCT8Vo6BvSbVoAODMow-E2mlPbMlUSsy2A4NsYlRZ1a7tPXEuIZmg9fIhWkcB8eftfKcARQTe_3LEgc5vb1Z5CN9vHfReetIzqkLX6WSStQ5Pf63Wva3jN71kkcLqYPBNFNJAlw84Yq5Q7mO3r5xzFA-xxNpEZDvA164Gfw"
  },
  {
    slug: "meilleurs-bois-pour-petits-poeles",
    title: "Les meilleurs bois pour les petits poeles",
    category: "Technique",
    readingTime: "5 min",
    publishedAt: "2 avril 2026",
    excerpt:
      "Choisir une essence seche et stable change directement le rendement, l'encrassement et le confort d'usage.",
    lede:
      "Dans un poele compact, la qualite du combustible se ressent tout de suite. Un bois mal seche encrasse, fume et fatigue l'appareil. Un bois bien choisi apporte, au contraire, une combustion nette et une chaleur plus stable.",
    quote:
      "Le meilleur bois n'est pas le plus dense sur le papier, c'est celui qui brule proprement dans votre rythme de vie.",
    takeaways: [
      "L'humidite du bois compte plus que l'essence affichee.",
      "Les petites sections bien fendues sont plus faciles a gerer au quotidien.",
      "Une combustion propre commence au stockage."
    ],
    sections: [
      {
        heading: "Sec avant tout",
        paragraphs: [
          "Un petit poele demande un bois sec, legerement fendu et pret a reagir rapidement. Si l'humidite est trop elevee, l'energie sert d'abord a evaporer l'eau au lieu de chauffer l'espace.",
          "Cela se traduit par une flamme paresseuse, une vitre qui s'encrasse plus vite et un conduit qui accumule davantage de depots. Pour un usage quotidien, un stockage aere et patient reste la meilleure assurance."
        ]
      },
      {
        heading: "Les essences les plus faciles a vivre",
        paragraphs: [
          "Le charme, le hetre et le frene restent des valeurs sures pour qui cherche une flamme reguliere et une braise exploitable. Ils offrent un bon compromis entre demarrage, tenue et confort d'usage.",
          "Le bouleau peut etre interessant pour lancer un feu plus vif, a condition de rester sur des sections adaptees. Les bois trop resineux ou trop humides demandent davantage de vigilance dans un volume restreint."
        ],
        bullets: [
          "Charme pour la constance.",
          "Hetre pour l'equilibre.",
          "Frene pour la souplesse d'usage."
        ]
      },
      {
        heading: "Adapter le format au volume du poele",
        paragraphs: [
          "Dans un appareil compact, des buches trop grosses saturent vite la chambre de combustion et rendent le controle plus grossier. Des morceaux plus courts et plus reguliers offrent un feu plus precis.",
          "Ce format facilite aussi les recharges en cours de soiree et limite les manipulations inutiles dans un habitacle etroit."
        ]
      },
      {
        heading: "Stocker intelligemment",
        paragraphs: [
          "Le bois doit respirer, rester decouple du sol et etre protege sans etre enferme. Un abri ouvert, une rotation simple et un lot interieur de service suffisent souvent a garder de bonnes habitudes.",
          "Un bois bien stocke est un bois qui allume vite, chauffe juste et laisse moins de traces sur l'installation."
        ]
      }
    ],
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDnx_3NCaU_-YvagGzxEtfQvBAn4WBtvO86406PI-ZGRII1V-zEKZdzG3JyLaU_1xU3zGeIeIswcp1hqIMois6i2qAi_M0FRdBjdzX5l0GSf4ztol63eX6qdmtq3FaZ0QzNLigtJRy-UcqHVVmnTAU82t8Ma52MFhvC0iGC-sVyawXobc7XRP1FESiFxdXCBRHAJG4j-Mg-oVi9w0kuT9YzS_BEYA6AosziD9Bf-l2YGQOsqzVFrsKTvAuzIyphKbD9HlOD_qHFmNo"
  },
  {
    slug: "art-du-feu-mobile",
    title: "L'art du feu mobile",
    category: "Lifestyle",
    readingTime: "4 min",
    publishedAt: "28 mars 2026",
    excerpt:
      "Comment un vrai foyer transforme le confort percu dans un van, une tiny house ou un studio refuge.",
    lede:
      "Un poele compact ne change pas seulement la temperature d'un lieu. Il change le rythme des soirees, la qualite du silence et la maniere d'habiter un espace restreint lorsque le froid s'installe.",
    quote:
      "Le feu apporte plus qu'une temperature: il donne un centre au lieu.",
    takeaways: [
      "Le rayonnement transforme la perception du confort.",
      "Un foyer visible structure naturellement l'espace.",
      "Le feu compact invite a un usage plus lent et plus attentif."
    ],
    sections: [
      {
        heading: "Retrouver un centre dans les petits espaces",
        paragraphs: [
          "Dans un van ou une tiny house, tout est proche: la cuisine, la banquette, les rangements, le couchage. L'apparition d'un feu visible cree instantanement un point d'ancrage autour duquel l'espace s'organise.",
          "On n'est plus simplement dans un volume chauffe, mais dans un lieu habite. Le foyer attire le regard, ordonne les gestes et donne a la piece une gravite particuliere."
        ]
      },
      {
        heading: "Une chaleur qui se ressent autrement",
        paragraphs: [
          "Le rayonnement d'un poele ne se compare pas tout a fait a une simple diffusion d'air chaud. Il enveloppe, il se percoit a distance, il accompagne les materiaux et il rend l'espace plus dense.",
          "Dans les environnements compacts, cette sensation compte beaucoup. Elle donne une impression de refuge que les solutions de chauffage purement techniques peinent souvent a reproduire."
        ]
      },
      {
        heading: "Le feu comme rythme de vie",
        paragraphs: [
          "Allumer, alimenter, observer, laisser retomber. Le feu impose un tempo simple qui tranche avec la vitesse ordinaire. Dans une vie mobile, ce rituel devient souvent une maniere de ralentir.",
          "Il invite a mieux gerer le combustible, a ouvrir une fenetre au bon moment, a lire la piece et a prendre soin de l'installation. Ce sont de petits gestes, mais ils changent durablement l'experience."
        ]
      },
      {
        heading: "Un objet de presence",
        paragraphs: [
          "Un poele compact bien dessine n'est pas un simple equipement cache dans un angle. Il participe au paysage interieur, a la lumiere du soir et a la personnalite du lieu.",
          "Lorsqu'il trouve sa juste place, il apporte une forme de calme que l'on associe d'habitude aux refuges fixes. C'est sans doute pour cela que le feu garde une telle force symbolique, meme dans les habitats les plus mobiles."
        ]
      }
    ],
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCKyC6Wtm42Cn5dkxiIO-eGJXp9Xo8ZengUGeMAaBMCfcM1xVxy9KZohNlomf3EQRz9hLt4gDO9GCH7xPMTe-fU716R8U7stJRQ7TXUrjVzXjWDeKxTJ4myj8aJn5B2py2XTmKUCNsRdybIxIYPIl931ky-jbjLPwcBPoqzuXDjgIpFZoHokeny7JdfDpyZBkmvpQaJtl_QLXN71AlMjU9yoFCzbONc3uMwOTdJzhYch6kTjbHxh7GH83laRqyzFEafW7p_YLShgBM"
  }
];

export const faqs = [
  {
    question: "Livrez-vous en Europe ?",
    answer:
      "Oui. La livraison standard est prevue pour l'Union europeenne et la Suisse, avec suivi et assurance."
  },
  {
    question: "Le paiement est-il securise ?",
    answer: "Oui. Le paiement s'effectue sur une page securisee et chaque commande est confirmee par e-mail."
  },
  {
    question: "Quand sont envoyes les e-mails de confirmation ?",
    answer:
      "Un e-mail de confirmation est envoye des validation de la commande, avec le recapitulatif et les prochaines etapes."
  }
];

export const contactFaqs = [
  {
    question: "Comment choisir ma taille ?",
    answer:
      "Nos pièces sont coupées oversize ou regular selon le modèle — consultez le guide des tailles sur chaque fiche produit. En cas de doute, nous conseillons de prendre sa taille habituelle."
  },
  {
    question: "Puis-je modifier ou annuler ma commande ?",
    answer:
      "Oui, tant que la commande n'a pas été expédiée. Écrivez-nous avec votre référence de commande, nous traitons votre demande sous 24 h."
  }
];

export const atelierDetails = {
  city: "Paris",
  address: ["14 rue du Faubourg Saint-Antoine", "75011 Paris", "France"],
  email: "bonjour@cst-studio.com",
  phone: "+33 1 80 00 00 00"
};

export const boutiqueHighlights = [
  "Formats adaptes aux vans, tiny houses et petits chalets",
  "Materiaux durables et chaleur a forte inertie",
  "Ligne sobre, presence du feu et encombrement maitrise"
];

export const homeStats = [
  { label: "Poids du Nomad 01", value: "28 kg" },
  { label: "Degagement minimum", value: "10 cm" },
  { label: "Rendement thermique", value: "82%" }
];

export const customerGallery = [
  {
    title: "Sprinter 4 saisons",
    location: "Bretagne",
    caption:
      "Un amenagement mobile pense pour les longues haltes d'hiver, avec un foyer visible depuis la banquette et la cuisine.",
    image: "/images/nomad-lifestyle.jpg"
  },
  {
    title: "Tiny house au bord des pins",
    location: "Morbihan",
    caption:
      "Une implantation compacte qui laisse la circulation libre et apporte une chaleur stable dans un volume minimal.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDS-VgV20rhJlzXl4veX7V_Kr2k1HPJuHMvfhE5H8kY6VPLV68EaQyxRaZOhMGXkuKHWarkBiWaAF9VLgT1x-38m_GHsMwrbPkoqI6urMudE3rGcvSAaeF4L0uPkC2Y9n7cTibDVCtIjhfN_bOkgxf9lR6bSWpJKBWQm7JaF4jsZL6xrQqKYdhH4OaaQ0-yxHYlJdP9rItwX4NqCpboMPvi1KmLybdSysWKP8hi7UOSt7r7SYOVBhfCDF71je3tIN0ynU_Ui1ZgDN8"
  },
  {
    title: "Refuge de montagne",
    location: "Alpes",
    caption:
      "Un petit chalet quatre saisons ou le poele devient le centre du lieu, entre inertie, lumiere du feu et faible encombrement.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAQX_LaG6by-7w4v6VnxWUhBeFQCoxUn7-uL595zFRqdHXnBiUtiG0r06AE8N0dq6a80nDKdHXCy38bq-9gjkb_fOGA_0j5PbvQv8nhMLe3oK2A6pssc2_ghChlOpPCvPrEmOAz41RKuttu-Bq9T6SthQhABYiTSenqD81D9FEgLhxCJmu3QxottectnvwYq4ORTEawgPfnoq6pSUgrko6F60ghs3rZy90kmys4SdOycfravb8ajJpMYO1J4PSEiGXI0rNuorVw04E"
  }
];

export const installationGuide = [
  {
    label: "Degagement minimum",
    value: "10 cm",
    description: "Autour des parois protegees et du bouclier thermique."
  },
  {
    label: "Sortie de conduit",
    value: "Verticale",
    description: "Parcours lisible, peu de coudes et traversee soigneusement etanchee."
  },
  {
    label: "Protection de sol",
    value: "Continue",
    description: "Sous l'appareil et sur la zone de chargement pour les braises eventuelles."
  }
];

export const installationSteps = [
  {
    title: "Implantation",
    description:
      "Definir un emplacement stable, protege et compatible avec la circulation quotidienne dans l'habitacle."
  },
  {
    title: "Conduit",
    description:
      "Tracer une sortie claire, avec maintien mecanique, traversee de toit et tirage regulier."
  },
  {
    title: "Mise a feu",
    description:
      "Proceder a une premiere chauffe progressive afin de verifier les flux d'air, les degagements et le comportement du feu."
  }
];

export const safetyHighlights = [
  {
    title: "Bouclier thermique triple paroi",
    description: "Une protection pensee pour limiter les points chauds et favoriser une implantation compacte."
  },
  {
    title: "Verre ceramique haute temperature",
    description: "Une vision nette du feu et une tenue adaptee aux usages quotidiens soutenus."
  },
  {
    title: "Guide d'installation detaille",
    description: "Un support clair pour valider les distances, la sortie de conduit et la premiere mise en service."
  }
];

export const modelUsageGuide = [
  {
    name: featuredProduct.name,
    status: "Disponible",
    useCase: "Vans, tiny houses et refuges compacts",
    description:
      "Le modele signature de la collection pour celles et ceux qui cherchent un vrai feu dans un volume contraint."
  },
  ...(upcomingProducts[0]
    ? [
        {
          name: upcomingProducts[0].name,
          status: upcomingProducts[0].status,
          useCase: "Interieurs premium et projets sur mesure",
          description: upcomingProducts[0].description
        }
      ]
    : [])
];

export const extendedFaqs = [
  {
    question: "Comment se passe la livraison ?",
    answer:
      "Chaque commande est préparée et expédiée sous 3 à 5 jours ouvrés. Livraison offerte en France métropolitaine et dans l'Union européenne, avec numéro de suivi."
  },
  {
    question: "Comment entretenir mes pièces CST ?",
    answer:
      "Lavage à 30 °C, séchage à plat recommandé. Évitez le sèche-linge pour conserver le grammage et les finitions. Nos matières sont conçues pour tenir au fil des lavages."
  },
  {
    question: "Y a-t-il une garantie ?",
    answer:
      "Oui. Toutes nos pièces sont couvertes contre les défauts de fabrication. Si vous constatez un problème, contactez-nous avec une photo et votre référence de commande."
  },
  {
    question: "Faites-vous des retours ou échanges ?",
    answer:
      "Oui, sous 14 jours après réception, pour tout article non porté et dans son emballage d'origine. Frais de retour à la charge du client sauf défaut constaté."
  }
];

export const featuredQuote =
  "Nous construisons des poeles pour les gens qui manquent de place, pas d'exigence.";

export const heroProduct = featuredProduct;

export function getJournalArticleBySlug(slug) {
  return journalArticles.find((article) => article.slug === slug) ?? null;
}
