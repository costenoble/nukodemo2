const product = {
  id: "nomad-01",
  slug: "nomad-01",
  name: "Nomad 01",
  category: "Poele a bois compact",
  subtitle: "Poele a bois haute efficacite pour vans, tiny houses et chalets compacts.",
  tagline: "Ingenierie compacte pour espaces libres.",
  description:
    "Le Nomad 01 apporte la chaleur d'un foyer traditionnel dans un format radicalement optimise pour les habitats de 15 a 30 m2.",
  longDescription:
    "Concu pour les environnements contraints, le Nomad 01 combine une fonte haute inertie, une combustion propre et une implantation facilitee grace a un bouclier thermique a triple paroi.",
  price: 125000,
  compareAtPrice: 140000,
  currency: "EUR",
  stockLabel: "En stock",
  leadTime: "Expedition sous 5 a 7 jours",
  shippingLabel: "Livraison standard offerte en Europe",
  cardImage: "/images/nomad-lifestyle.jpg",
  heroImage: "/images/nomad-hero.jpg",
  gallery: [
    "/images/nomad-hero.jpg",
    "/images/nomad-detail.jpg",
    "/images/hearth-home.jpg"
  ],
  stats: [
    { label: "Puissance", value: "4.2 kW" },
    { label: "Poids", value: "28 kg" },
    { label: "Dimensions", value: "42 x 38 x 35 cm" },
    { label: "Rendement", value: "82%" }
  ],
  features: [
    {
      title: "Fonte de grade marine",
      description:
        "Une structure monolithique concue pour resister aux cycles thermiques extremes et conserver l'inertie apres extinction du feu."
    },
    {
      title: "Verre ceramique hautes temperatures",
      description:
        "Une vision panoramique sur les flammes avec une tenue jusqu'a 800 C pour les usages intensifs."
    },
    {
      title: "Bouclier thermique triple paroi",
      description:
        "Permet une implantation optimisee dans les petits volumes avec un degagement minimum de 10 cm."
    }
  ],
  included: [
    "Poele Nomad 01",
    "Notice d'installation certifiee",
    "Jeu de visserie et collier de depart",
    "Guide d'entretien et de premiere mise a feu"
  ],
  audience: [
    "Vans et fourgons amenages",
    "Tiny houses",
    "Studios et chalets compacts"
  ]
};

export const allProducts = [product];

export const upcomingProducts = [
  {
    id: "cabin-02",
    name: "Cabin 02",
    status: "En developpement",
    description: "Modele plus vertical, pense pour les tiny houses avec grande hauteur sous plafond."
  },
  {
    id: "ember-04",
    name: "Ember 04",
    status: "Bientot",
    description: "Version premium avec habillage mineral et post-combustion renforcee."
  }
];

export function getProductById(productId) {
  return allProducts.find((entry) => entry.id === productId) ?? null;
}

export function getProductBySlug(slug) {
  return allProducts.find((entry) => entry.slug === slug) ?? null;
}

export const featuredProduct = product;
