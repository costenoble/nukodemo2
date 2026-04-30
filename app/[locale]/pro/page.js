import { setRequestLocale } from "next-intl/server";
import { redirect } from "next/navigation";

import { ProLoginForm } from "@/components/pro-login-form";
import { SectionHeading } from "@/components/section-heading";
import { getProSession } from "@/lib/pro-session";

export async function generateMetadata({ params }) {
  const { locale } = await params;
  return { title: locale === "en" ? "Reseller Space | NUKÖ" : "Espace Revendeurs | NUKÖ" };
}

export default async function ProPage({ params }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const session = await getProSession();
  if (session) redirect("/pro/dashboard");

  const isEn = locale === "en";

  return (
    <div className="page-shell page-section space-y-16">
      <div className="grid gap-10 lg:grid-cols-[1fr_1fr] lg:items-start">
        <SectionHeading
          eyebrow={isEn ? "Reseller portal" : "Portail revendeurs"}
          title={isEn ? "Pro space" : "Espace pro NUKÖ"}
          description={isEn
            ? "Ex-VAT prices, discount grids, resources and sales tools reserved for reseller partners."
            : "Tarifs HT, grilles de remises, ressources et outils de vente réservés aux partenaires revendeurs."}
        />
        <div className="surface-panel p-8 md:p-10">
          <p className="eyebrow mb-6">{isEn ? "Login" : "Connexion"}</p>
          <ProLoginForm />
        </div>
      </div>

      <section className="grid gap-8 md:grid-cols-3">
        {[
          {
            title: isEn ? "Tiered ex-VAT pricing" : "Tarifs HT dégressifs",
            description: isEn
              ? "Price grids with volume discounts according to your partnership level."
              : "Grilles de prix avec remises volume selon votre niveau de partenariat."
          },
          {
            title: isEn ? "Exclusive resources" : "Ressources exclusives",
            description: isEn
              ? "Technical datasheets, HD visuals, installation guides and logo kit."
              : "Fiches techniques, visuels HD, guides d'installation et kit logo."
          },
          {
            title: isEn ? "Dedicated support" : "Support dédié",
            description: isEn
              ? "Direct contact for your technical and logistics questions."
              : "Interlocuteur direct pour vos questions techniques et logistiques."
          }
        ].map((item) => (
          <div key={item.title} className="surface-panel p-8">
            <h3 className="font-headline text-2xl font-bold tracking-[-0.04em]">{item.title}</h3>
            <p className="mt-3 text-sm leading-7 text-on-surface-muted">{item.description}</p>
          </div>
        ))}
      </section>
    </div>
  );
}
