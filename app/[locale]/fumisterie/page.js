import { setRequestLocale, getTranslations } from "next-intl/server";

import { CatalogueGrid } from "@/components/catalogue-grid";
import { TransitionLink as Link } from "@/components/page-transition";
import { allProducts } from "@/lib/products";

export async function generateMetadata({ params }) {
  const { locale } = await params;
  return {
    title: locale === "en" ? "Catalogue | CST" : "Catalogue | CST"
  };
}

export default async function CataloguePage({ params }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("fumisterie");

  const eyebrow = locale === "en" ? "Drop 01 — All pieces" : "Drop 01 — Toutes les pièces";
  const title = locale === "en" ? "Catalogue" : "Catalogue";
  const desc = locale === "en"
    ? "Four pieces. Two tees, two trousers. Each produced in limited quantity, made in Portugal."
    : "Quatre pièces. Deux tees, deux pantalons. Chaque référence produite en quantité limitée, fabriquée au Portugal.";

  const adviceTitle = locale === "en" ? "Not sure of your size?" : "Pas sûr de votre taille ?";
  const adviceDesc = locale === "en"
    ? "Send us your measurements and we'll tell you exactly what to order."
    : "Envoyez-nous vos mensurations, on vous dit exactement quelle taille commander.";
  const adviceCta = locale === "en" ? "Ask for advice" : "Demander un conseil";

  return (
    <>
      {/* ── HERO ── */}
      <section className="border-b border-outline bg-surface-muted">
        <div className="page-shell pb-16 pt-36 md:pb-24 md:pt-44">
          <p className="eyebrow mb-4">{eyebrow}</p>
          <h1 className="page-title">{title}</h1>
          <p className="section-copy mt-6">{desc}</p>
        </div>
      </section>

      {/* ── GRILLE PRODUITS ── */}
      <section className="page-shell page-section">
        <CatalogueGrid products={allProducts} locale={locale} />
      </section>

      {/* ── CONSEIL TAILLE ── */}
      <section className="border-t border-outline bg-black py-20 text-white">
        <div className="page-shell flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.28em] text-[#006400]">
              {t("adviceEyebrow")}
            </p>
            <h2 className="font-headline text-4xl font-black uppercase tracking-[-0.03em] text-white md:text-5xl">
              {adviceTitle}
            </h2>
            <p className="mt-4 max-w-md text-sm leading-7 text-white/60">{adviceDesc}</p>
          </div>
          <Link
            className="shrink-0 border border-white px-7 py-4 text-[11px] font-bold uppercase tracking-[0.2em] text-white transition hover:bg-white hover:text-black"
            href="/contact"
          >
            {adviceCta}
          </Link>
        </div>
      </section>
    </>
  );
}
