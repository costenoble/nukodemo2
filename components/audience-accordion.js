"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";

const DATA = {
  fr: [
    {
      id: "particulier",
      label: "Particulier",
      headline: "Construits pour durer, pensés pour vous",
      items: [
        { stat: "320 g/m²", label: "Coton heavyweight", desc: "Un grammage supérieur à la moyenne du marché. Plus dense, plus opaque, plus durable — on le sent au premier toucher." },
        { stat: "Portugal", label: "Fabrication certifiée", desc: "Tous nos ateliers sont au Portugal. Traçabilité totale, conditions de travail vérifiées, zéro sous-traitance opaque." },
        { stat: "OEKO-TEX", label: "Standard 100", desc: "Chaque matière utilisée est certifiée OEKO-TEX Standard 100. Aucun produit chimique nocif, testé et approuvé." },
        { stat: "30+", label: "Lavages sans déformation", desc: "Les coutures double aiguille et les matières sélectionnées garantissent une tenue parfaite après des dizaines de lavages." }
      ]
    },
    {
      id: "revendeur",
      label: "Revendeur",
      headline: "Une gamme courte, une forte identité",
      items: [
        { stat: "4", label: "Pièces fondamentales", desc: "Tee 001, Tee 002, Cargo 001, Track 001. Une gamme assumée, facile à présenter — chaque pièce justifie son prix." },
        { stat: "–20 %", label: "Tarif revendeur", desc: "Marges confortables dès 10 unités. Grille progressive selon les volumes, sans engagement de durée." },
        { stat: "100 %", label: "Made in Portugal", desc: "Un argument vendeur fort : fabrication européenne, certifiée, documentée. Rare à ce niveau de prix." },
        { stat: "Série", label: "Production limitée", desc: "Le modèle drops crée de la rareté et de l'urgence. Plus facile à vendre qu'un produit disponible en permanence." }
      ]
    },
    {
      id: "pro",
      label: "Professionnel",
      headline: "Distribution structurée, exclusivités possibles",
      items: [
        { stat: "–30 %", label: "Tarif Platinum", desc: "Réservé aux engagements de 30 pièces et plus. Négociation possible pour des volumes très importants." },
        { stat: "Zone", label: "Exclusivité géographique", desc: "Exclusivité possible sur une région ou un pays pour les distributeurs engagés sur volume." },
        { stat: "Visuels", label: "Supports fournis", desc: "Photos produits HD, fiches techniques, look book disponibles pour vos équipes et votre site." },
        { stat: "CST+", label: "Co-branding possible", desc: "Discussions ouvertes pour des partenariats à fort volume ou des éditions exclusives. Contactez le studio." }
      ]
    }
  ],
  en: [
    {
      id: "particulier",
      label: "Individual",
      headline: "Built to last, designed for you",
      items: [
        { stat: "320 g/m²", label: "Heavyweight cotton", desc: "Above-average fabric weight. Denser, more opaque, more durable — you feel it on first touch." },
        { stat: "Portugal", label: "Certified manufacturing", desc: "All our workshops are in Portugal. Full traceability, verified working conditions, zero opaque subcontracting." },
        { stat: "OEKO-TEX", label: "Standard 100", desc: "Every fabric used is OEKO-TEX Standard 100 certified. No harmful chemicals, tested and approved." },
        { stat: "30+", label: "Washes without distortion", desc: "Double-needle seams and selected materials guarantee a perfect hold after dozens of washes." }
      ]
    },
    {
      id: "revendeur",
      label: "Reseller",
      headline: "A short range, a strong identity",
      items: [
        { stat: "4", label: "Core pieces", desc: "Tee 001, Tee 002, Cargo 001, Track 001. A confident range, easy to present — each piece justifies its price." },
        { stat: "–20 %", label: "Reseller rate", desc: "Comfortable margins from 10 units. Progressive grid by volume, no time commitment." },
        { stat: "100 %", label: "Made in Portugal", desc: "A strong selling point: European, certified, documented manufacturing. Rare at this price level." },
        { stat: "Drop", label: "Limited production", desc: "The drops model creates scarcity and urgency — easier to sell than a permanently available product." }
      ]
    },
    {
      id: "pro",
      label: "Professional",
      headline: "Structured distribution, exclusivities possible",
      items: [
        { stat: "–30 %", label: "Platinum rate", desc: "Reserved for commitments of 30 pieces and above. Negotiation possible for very large volumes." },
        { stat: "Zone", label: "Geographic exclusivity", desc: "Exclusivity possible on a region or country for distributors committed to volume." },
        { stat: "Visuals", label: "Resources provided", desc: "HD product photos, technical sheets, look book available for your teams and site." },
        { stat: "CST+", label: "Co-branding possible", desc: "Open discussions for high-volume partnerships or exclusive editions. Contact the studio." }
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
