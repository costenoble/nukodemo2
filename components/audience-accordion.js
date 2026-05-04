"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";

const DATA = {
  fr: [
    {
      id: "particulier",
      label: "Particulier",
      headline: "Pour votre van, tiny house ou refuge",
      items: [
        { stat: "100 %", label: "Assemblage manuel", desc: "Chaque appareil est assemblé à la main dans notre atelier de Lorient. Aucune sous-traitance, aucun stock dormant." },
        { stat: "82–84 %", label: "Rendement thermique", desc: "Très au-dessus de la moyenne des poêles de cette taille. Moins de bois, plus de chaleur, moins d'émissions." },
        { stat: "Ø 150", label: "Conduit universel", desc: "Compatible avec tous les kits de traversée standard. Installation simplifiée dans un van ou une tiny house." },
        { stat: "EN 13240", label: "Norme européenne", desc: "Certifié conforme à la norme européenne de sécurité pour les poêles à bois. Assurance et installation facilitées." }
      ]
    },
    {
      id: "revendeur",
      label: "Revendeur",
      headline: "Une gamme courte, une forte identité",
      items: [
        { stat: "2", label: "Modèles seulement", desc: "Nomad 01 et Cabin 03. Une gamme claire et assumée, facile à présenter et à vendre." },
        { stat: "–15 à –30 %", label: "Tarifs dégressifs", desc: "Grille Silver / Gold / Platinum selon les volumes. Marges confortables dès 5 unités." },
        { stat: "100 %", label: "Made in Lorient", desc: "Un argument vendeur fort : fabrication française, artisanale, documentée. Rare sur ce segment." },
        { stat: "Série", label: "Production limitée", desc: "Le modèle série limitée crée de la rareté et de l'urgence. Plus facile à vendre qu'un produit disponible en permanence." }
      ]
    },
    {
      id: "pro",
      label: "Professionnel / Distributeur",
      headline: "Distribution structurée, exclusivités possibles",
      items: [
        { stat: "–30 %", label: "Tarif Platinum", desc: "Réservé aux engagements de 15 unités et plus. Négociation possible pour des volumes très importants." },
        { stat: "Zone", label: "Exclusivité géographique", desc: "Possibilité d'exclusivité sur un pays ou une région hors France pour les distributeurs engagés sur volume." },
        { stat: "STEP", label: "Supports techniques", desc: "Fichiers 3D, fiches techniques, documentation installation disponibles pour vos équipes et vos clients." },
        { stat: "OEM", label: "Co-branding possible", desc: "Discussions ouvertes pour des partenariats structurels à fort volume. Contactez l'atelier directement." }
      ]
    }
  ],
  en: [
    {
      id: "particulier",
      label: "Individual",
      headline: "For your van, tiny house or refuge",
      items: [
        { stat: "100 %", label: "Hand assembled", desc: "Every unit is assembled by hand in our Lorient workshop. No subcontracting, no dormant stock." },
        { stat: "82–84 %", label: "Thermal efficiency", desc: "Well above average for stoves of this size. Less wood, more heat, fewer emissions." },
        { stat: "Ø 150", label: "Universal flue", desc: "Compatible with all standard roof penetration kits. Simplified installation in a van or tiny house." },
        { stat: "EN 13240", label: "European standard", desc: "Certified compliant with the European safety standard for wood-burning stoves." }
      ]
    },
    {
      id: "revendeur",
      label: "Reseller",
      headline: "A short range, a strong identity",
      items: [
        { stat: "2", label: "Models only", desc: "Nomad 01 and Cabin 03. A clear, confident range — easy to present and sell." },
        { stat: "–15 to –30 %", label: "Tiered pricing", desc: "Silver / Gold / Platinum grid by volume. Comfortable margins from 5 units." },
        { stat: "100 %", label: "Made in Lorient", desc: "A strong selling point: French, handcrafted, documented manufacturing. Rare in this segment." },
        { stat: "Limited", label: "Series production", desc: "The limited series model creates scarcity and urgency — easier to sell than a permanently available product." }
      ]
    },
    {
      id: "pro",
      label: "Professional / Distributor",
      headline: "Structured distribution, exclusivities possible",
      items: [
        { stat: "–30 %", label: "Platinum rate", desc: "Reserved for commitments of 15 units and above. Negotiation possible for very large volumes." },
        { stat: "Zone", label: "Geographic exclusivity", desc: "Exclusivity possible on a country or region outside France for distributors committed to volume." },
        { stat: "STEP", label: "Technical resources", desc: "3D files, technical sheets, installation documentation available for your teams and clients." },
        { stat: "OEM", label: "Co-branding possible", desc: "Open discussions for structural high-volume partnerships. Contact the workshop directly." }
      ]
    }
  ]
};

export function AudienceAccordion({ locale = "fr" }) {
  const [activeTab, setActiveTab] = useState("particulier");
  const [openItem, setOpenItem] = useState(null);

  const tabs = DATA[locale] ?? DATA.fr;
  const active = tabs.find((t) => t.id === activeTab) ?? tabs[0];

  return (
    <div className="mt-12">
      {/* Tabs */}
      <div className="flex border-b border-outline">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`px-6 py-4 text-[11px] font-bold uppercase tracking-[0.2em] transition-colors ${
              activeTab === tab.id
                ? "border-b-2 border-primary text-on-surface"
                : "text-on-surface-muted hover:text-on-surface"
            }`}
            onClick={() => { setActiveTab(tab.id); setOpenItem(null); }}
            type="button"
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Headline */}
      <p className="mt-6 font-headline text-2xl font-bold tracking-[-0.04em]">{active.headline}</p>

      {/* Accordion items */}
      <div className="mt-6 divide-y divide-outline border-t border-outline">
        {active.items.map((item) => {
          const isOpen = openItem === item.label;
          return (
            <div
              key={item.label}
              onMouseEnter={() => setOpenItem(item.label)}
              onMouseLeave={() => setOpenItem(null)}
            >
              <div className="flex w-full items-center gap-6 py-5 cursor-default">
                <span className="w-32 shrink-0 font-headline text-2xl font-bold tracking-[-0.05em] text-secondary whitespace-nowrap">
                  {item.stat}
                </span>
                <span className="flex-1 font-medium uppercase tracking-[0.08em] text-sm">{item.label}</span>
                <span className={`text-on-surface-muted transition-transform duration-300 ${isOpen ? "rotate-45" : ""}`}>
                  +
                </span>
              </div>
              <div style={{ maxHeight: isOpen ? "120px" : "0px", opacity: isOpen ? 1 : 0, overflow: "hidden", transition: "max-height 0.35s ease, opacity 0.25s ease" }}>
                <p className="pb-5 text-sm font-light leading-7 text-on-surface-muted" style={{ paddingLeft: "9.5rem" }}>
                  {item.desc}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
