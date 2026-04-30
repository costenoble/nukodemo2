import { setRequestLocale } from "next-intl/server";
import { redirect } from "next/navigation";

import { ProLogoutButton } from "@/components/pro-logout-button";
import { ProOrderSimulator } from "@/components/pro-order-simulator";
import { SectionHeading } from "@/components/section-heading";
import { formatPrice } from "@/lib/format";
import { applyProDiscount, proResources, proTiers } from "@/lib/pro-pricing";
import { getProSession } from "@/lib/pro-session";

const BASE_PRICE_HT = 104167;

export async function generateMetadata({ params }) {
  const { locale } = await params;
  return { title: locale === "en" ? "Reseller Dashboard | NUKÖ" : "Tableau de bord Revendeur | NUKÖ" };
}

export default async function ProDashboardPage({ params }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const session = await getProSession();
  if (!session) redirect("/pro");

  const isEn = locale === "en";

  return (
    <div className="page-shell page-section space-y-20">
      <div className="flex flex-wrap items-start justify-between gap-6">
        <div>
          <p className="eyebrow mb-2">{isEn ? "Reseller portal" : "Portail revendeur"}</p>
          <h1 className="font-headline text-5xl font-bold uppercase tracking-[-0.06em] md:text-7xl">
            {isEn ? "Hello," : "Bonjour,"}<br />{session.company}
          </h1>
          <p className="mt-3 text-sm text-on-surface-muted">{session.email}</p>
        </div>
        <ProLogoutButton />
      </div>

      <section className="space-y-10">
        <SectionHeading
          eyebrow={isEn ? "B2B pricing" : "Tarification B2B"}
          title={isEn ? "Ex-VAT price grid — Nomad 01" : "Grilles de prix HT Nomad 01"}
          description={isEn
            ? "Public retail price inc. VAT: €1,250. Reseller prices in euros ex-VAT (20% VAT not included)."
            : "Prix de base public TTC : 1 250 €. Tarifs revendeurs en euros HT, TVA 20% non incluse."}
        />
        <div className="overflow-x-auto">
          <table className="w-full border border-outline text-sm">
            <thead>
              <tr className="border-b border-outline bg-surface-muted">
                <th className="p-4 text-left"><span className="eyebrow">{isEn ? "Level" : "Niveau"}</span></th>
                <th className="p-4 text-left"><span className="eyebrow">{isEn ? "Volume" : "Volume"}</span></th>
                <th className="p-4 text-left"><span className="eyebrow">{isEn ? "Discount" : "Remise"}</span></th>
                <th className="p-4 text-left"><span className="eyebrow">{isEn ? "Unit price ex-VAT" : "Prix unitaire HT"}</span></th>
                <th className="p-4 text-left"><span className="eyebrow">{isEn ? "Indicative margin" : "Marge indicative"}</span></th>
              </tr>
            </thead>
            <tbody>
              {proTiers.map((tier) => {
                const unitHT = applyProDiscount(BASE_PRICE_HT, tier.discountPercent);
                const retailHT = Math.round(125000 / 1.2);
                const marginPercent = Math.round(((retailHT - unitHT) / retailHT) * 100);
                return (
                  <tr key={tier.id} className="border-b border-outline last:border-b-0 hover:bg-surface-soft">
                    <td className="p-4 font-headline text-xl font-bold tracking-[-0.04em]">{tier.label}</td>
                    <td className="p-4 text-on-surface-muted">
                      {tier.maxUnits ? `${tier.minUnits} – ${tier.maxUnits} u.` : `${tier.minUnits}+ u.`}
                    </td>
                    <td className="p-4 font-bold text-secondary">-{tier.discountPercent}%</td>
                    <td className="p-4 font-headline text-2xl font-bold tracking-[-0.04em]">{formatPrice(unitHT)}</td>
                    <td className="p-4 text-on-surface-muted">~{marginPercent}%</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>

      <section className="surface-panel p-8 md:p-10">
        <ProOrderSimulator />
      </section>

      <section className="space-y-8">
        <SectionHeading
          eyebrow={isEn ? "Resources" : "Ressources"}
          title={isEn ? "Documentation & reseller tools" : "Documentation & outils revendeur"}
          description={isEn
            ? "Download partner-exclusive files: technical datasheets, visuals and communication kit."
            : "Téléchargez les fichiers réservés aux partenaires : fiches techniques, visuels et kit de communication."}
        />
        <div className="grid gap-6 md:grid-cols-2">
          {proResources.map((resource) => (
            <div key={resource.id} className="flex items-start gap-5 border border-outline bg-background p-6">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center border border-outline bg-surface-muted text-xs font-bold uppercase tracking-[0.1em] text-secondary">
                {resource.type}
              </div>
              <div className="flex-1 space-y-1">
                <h3 className="font-headline text-xl font-bold tracking-[-0.04em]">{resource.label}</h3>
                <p className="text-sm leading-6 text-on-surface-muted">{resource.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
