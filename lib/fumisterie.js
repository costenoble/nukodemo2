export const fumiCategories = [
  {
    id: "conduits",
    label: "Conduits de fumée",
    description: "Conduits simple et double paroi Ø 150 mm, compatibles Nomad 01 et Cabin 03."
  },
  {
    id: "raccords",
    label: "Raccords & traversées",
    description: "Coudes, manchons et kits de traversée de toit pour toutes les configurations."
  },
  {
    id: "protection",
    label: "Protection & sécurité",
    description: "Plaques murales, protections de sol et boucliers thermiques."
  },
  {
    id: "combustible",
    label: "Combustible",
    description: "Charbons de noix de coco haute densité, production longue durée et faibles cendres."
  }
];

export const fumiProducts = [
  {
    id: "fumi-conduit-simple-1m",
    categoryId: "conduits",
    name: "Conduit simple paroi Ø 150 mm — 1 m",
    description:
      "Conduit acier émaillé noir mat pour installation en zone protégée. Épaisseur 0.6 mm.",
    price: 8900,
    ref: "CSP-150-1000"
  },
  {
    id: "fumi-conduit-double-1m",
    categoryId: "conduits",
    name: "Conduit double paroi Ø 150 mm — 1 m",
    description:
      "Conduit isolé double paroi, intérieur inox 316L. Idéal pour les traversées exposées et les installations mobiles.",
    price: 14900,
    ref: "CDP-150-1000"
  },
  {
    id: "fumi-conduit-double-500",
    categoryId: "conduits",
    name: "Conduit double paroi Ø 150 mm — 0.5 m",
    description: "Demi-élément double paroi pour ajuster la hauteur de conduit.",
    price: 8900,
    ref: "CDP-150-500"
  },
  {
    id: "fumi-coude-45",
    categoryId: "raccords",
    name: "Coude 45° Ø 150 mm",
    description: "Coude orientable pour adapter la trajectoire du conduit sans perte de tirage excessive.",
    price: 5900,
    ref: "COD-150-45"
  },
  {
    id: "fumi-coude-90",
    categoryId: "raccords",
    name: "Coude 90° Ø 150 mm",
    description: "Coude fixe pour les sorties murales ou les raccordements à angle droit.",
    price: 6900,
    ref: "COD-150-90"
  },
  {
    id: "fumi-kit-traversee",
    categoryId: "raccords",
    name: "Kit traversée de toit inclinée",
    description:
      "Kit complet pour traversée de toit de van ou tiny house : solin réglable 0–45°, plaque d'étanchéité et chapeau pare-pluie.",
    price: 24500,
    ref: "KIT-TT-150"
  },
  {
    id: "fumi-manchon",
    categoryId: "raccords",
    name: "Manchon de raccordement Ø 150 mm",
    description: "Manchon de jonction simple paroi pour assembler deux éléments de conduit.",
    price: 4500,
    ref: "MAN-150"
  },
  {
    id: "fumi-chapeau",
    categoryId: "raccords",
    name: "Chapeau de cheminée Ø 150 mm",
    description: "Chapeau anti-pluie en acier inox, protection contre les intempéries et les oiseaux.",
    price: 6900,
    ref: "CHP-150"
  },
  {
    id: "fumi-plaque-murale",
    categoryId: "protection",
    name: "Plaque de protection murale 500 × 500 mm",
    description:
      "Plaque acier laqué noir mat, montage sur entretoises ventilées. Réduit le dégagement nécessaire entre le poële et la paroi.",
    price: 12900,
    ref: "PPM-500"
  },
  {
    id: "fumi-plaque-sol",
    categoryId: "protection",
    name: "Plaque de protection de sol 80 × 60 cm",
    description:
      "Plaque acier striée noire, protection continue sous l'appareil et sur la zone de rechargement.",
    price: 8900,
    ref: "PPS-80"
  },
  {
    id: "fumi-charbon-10kg",
    categoryId: "combustible",
    name: "Charbons noix de coco — sac 10 kg",
    description:
      "Briquettes haute densité issues de coques de noix de coco. Combustion longue durée (4–6 h), très faible taux de cendres, sans agents chimiques.",
    price: 3900,
    ref: "CHB-CNC-10"
  },
  {
    id: "fumi-charbon-25kg",
    categoryId: "combustible",
    name: "Charbons noix de coco — sac 25 kg",
    description:
      "Format avantage pour les usages réguliers. Même qualité que le sac 10 kg, tarif dégressif.",
    price: 8500,
    ref: "CHB-CNC-25"
  }
];

export function getFumiProductsByCategory(categoryId) {
  return fumiProducts.filter((p) => p.categoryId === categoryId);
}

export function getFumiProductById(id) {
  return fumiProducts.find((p) => p.id === id) ?? null;
}
