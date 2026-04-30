export const proTiers = [
  {
    id: "silver",
    label: "Silver",
    minUnits: 1,
    maxUnits: 4,
    discountPercent: 15,
    description: "Acces revendeur standard, tarif HT degressif."
  },
  {
    id: "gold",
    label: "Gold",
    minUnits: 5,
    maxUnits: 14,
    discountPercent: 22,
    description: "Revendeur confirme avec priorite de livraison et support dedie."
  },
  {
    id: "platinum",
    label: "Platinum",
    minUnits: 15,
    maxUnits: null,
    discountPercent: 30,
    description: "Partenaire strategique. Tarification sur mesure et ressources exclusives."
  }
];

export const proResources = [
  {
    id: "fiche-technique",
    label: "Fiche technique Nomad 01 (PDF)",
    description: "Specifications completes, cotes d'encombrement et donnees de rendement.",
    type: "PDF",
    filename: "nomad-01-fiche-technique.pdf"
  },
  {
    id: "guide-installation",
    label: "Guide d'installation certifie (PDF)",
    description: "Protocole de pose, distances de securite et premiere mise a feu.",
    type: "PDF",
    filename: "nomad-01-guide-installation.pdf"
  },
  {
    id: "visuels-hd",
    label: "Pack visuels HD",
    description: "Photos produit haute resolution pour communication revendeur.",
    type: "ZIP",
    filename: "nomad-01-visuels-hd.zip"
  },
  {
    id: "logo-nuko",
    label: "Kit logo NUKO",
    description: "Logos vectoriels et charte graphique pour communication partenaire.",
    type: "ZIP",
    filename: "nuko-logo-kit.zip"
  }
];

export function getTierByQuantity(quantity) {
  return (
    proTiers.find(
      (t) => quantity >= t.minUnits && (t.maxUnits === null || quantity <= t.maxUnits)
    ) ?? proTiers[0]
  );
}

export function applyProDiscount(priceHT, discountPercent) {
  return Math.round(priceHT * (1 - discountPercent / 100));
}

export const PRO_ACCESS_CODE = process.env.PRO_ACCESS_CODE ?? "NUKO-PRO-2026";
