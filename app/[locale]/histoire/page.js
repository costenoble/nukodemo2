import { setRequestLocale, getTranslations } from "next-intl/server";

import { SectionHeading } from "@/components/section-heading";
import { Link } from "@/i18n/navigation";
import { ProductImage } from "@/components/product-image";
import { historyPillars } from "@/lib/content";

export async function generateMetadata({ params }) {
  const { locale } = await params;
  return {
    title: locale === "en" ? "Our story | NUKÖ" : "Notre histoire | NUKÖ",
    description: locale === "en"
      ? "The NUKÖ workshop, its philosophy and the genesis of a compact stove born from a real need."
      : "L'atelier NUKÖ, sa philosophie et la genèse d'un poêle compact né d'un besoin réel."
  };
}

export default async function HistoirePage({ params }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("histoire");
  const tc = await getTranslations("common");

  return (
    <>
      <section className="relative overflow-hidden border-b border-outline bg-black text-white">
        <div className="page-shell relative pt-36 pb-20 md:pt-44 md:pb-28">
          <p className="eyebrow mb-5">{t("eyebrow")}</p>
          <h1 className="page-title max-w-3xl text-white">
            {t("heroTitle").split("\n").map((line, i) => (<span key={i}>{i > 0 && <br />}{line}</span>))}
          </h1>
          <p className="mt-8 max-w-xl text-lg leading-8 text-white/70">{t("heroDesc")}</p>
        </div>
      </section>

      <section className="page-shell page-section grid gap-14 lg:grid-cols-2 lg:items-center">
        <div className="space-y-6">
          <p className="eyebrow">{t("originEyebrow")}</p>
          <h2 className="section-title">{t("originTitle")}</h2>
          <div className="space-y-5 text-base leading-8 text-on-surface-muted">
            <p>
              {locale === "en"
                ? "CST started with a simple observation: quality clothing that's seriously made, without the inflated logo price, didn't exist at an accessible price point. Everything was either fast fashion or luxury — nothing in between that was genuinely built to last."
                : "CST est parti d'un constat simple : des vêtements de qualité, fabriqués sérieusement, sans le prix gonflé du logo, ça n'existait pas à un tarif accessible. Tout était soit fast fashion, soit luxe — rien entre les deux qui soit vraiment construit pour durer."}
            </p>
            <p>
              {locale === "en"
                ? "We spent a year selecting workshops in Portugal, testing fabrics, adjusting cuts. The brief was brutal in its simplicity: heavyweight materials, reinforced finishes, cuts that hold their shape after thirty washes."
                : "On a passé un an à sélectionner des ateliers au Portugal, tester des matières, ajuster les coupes. Le cahier des charges était brutal de simplicité : grammages élevés, finitions renforcées, coupes qui tiennent après trente lavages."}
            </p>
            <p>
              {locale === "en"
                ? "CST — Define Your Standard. The name says it all: we're not here to set a trend, but to set a standard."
                : "CST — Define Your Standard. Le nom dit tout : on n'est pas là pour dicter une tendance, mais pour poser un standard."}
            </p>
          </div>
        </div>
        <div className="overflow-hidden border border-outline bg-surface">
          <ProductImage alt="CST studio" category="T-shirt" className="h-[520px] w-full object-cover" src="" />
        </div>
      </section>

      <section className="border-y border-outline bg-surface-muted">
        <div className="page-shell page-section">
          <SectionHeading eyebrow={t("philosophyEyebrow")} title={t("philosophyTitle")} description={t("philosophyDesc")} />
          <div className="mt-12 grid gap-px overflow-hidden border border-outline bg-outline md:grid-cols-3">
            {historyPillars.map((pillar) => (
              <div key={pillar.title} className="bg-background p-8">
                <h3 className="font-headline text-3xl font-bold tracking-[-0.05em]">{pillar.title}</h3>
                <p className="mt-4 text-sm leading-7 text-on-surface-muted">{pillar.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="page-shell page-section grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <div className="overflow-hidden border border-outline bg-surface">
          <img alt="Studio CST Paris" className="h-[500px] w-full object-cover" src="/images/studio-paris.jpg" />
        </div>
        <div className="space-y-6">
          <p className="eyebrow">{t("workshopEyebrow")}</p>
          <h2 className="section-title">{t("workshopTitle")}</h2>
          <div className="space-y-5 text-base leading-8 text-on-surface-muted">
            <p>{t("workshopDesc1")}</p>
            <p>{t("workshopDesc2")}</p>
          </div>
          <div className="grid grid-cols-2 gap-px overflow-hidden border border-outline bg-outline">
            {[
              { value: "Lorient", key: "statWorkshop" },
              { value: "100 %", key: "statManual" },
              { value: locale === "en" ? "Batch" : "Série", key: "statProduction" },
              { value: "0", key: "statStock" }
            ].map((s) => (
              <div key={s.key} className="bg-surface-muted p-5">
                <p className="font-headline text-2xl font-bold tracking-[-0.04em]">{s.value}</p>
                <p className="mt-1 text-xs text-on-surface-muted">{t(s.key)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-outline bg-[#1d1c18] text-white">
        <div className="page-shell page-section">
          <SectionHeading eyebrow={t("testimonialsEyebrow")} title={t("testimonialsTitle")} description={t("testimonialsDesc")} />
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {[
              {
                quote: locale === "en"
                  ? "I've washed the Tee 001 at least thirty times. It hasn't shrunk, hasn't faded, hasn't lost its shape. That's all I ask of a basic tee."
                  : "J'ai lavé le Tee 001 au moins trente fois. Il n'a pas rétréci, pas déteint, pas perdu sa forme. C'est tout ce que je demande à un tee de base.",
                author: "Lucas M.",
                role: locale === "en" ? "Paris" : "Paris"
              },
              {
                quote: locale === "en"
                  ? "The Cargo 001 is the only pair of trousers I wear every day. The weight of the fabric makes the difference — you feel the quality immediately."
                  : "Le Cargo 001 c'est le seul pantalon que je porte tous les jours. Le grammage du tissu fait la différence — on sent la qualité immédiatement.",
                author: "Sarah K.",
                role: locale === "en" ? "Bordeaux" : "Bordeaux"
              },
              {
                quote: locale === "en"
                  ? "Finally a brand that doesn't need a huge logo to justify the price. The pieces speak for themselves."
                  : "Enfin une marque qui n'a pas besoin d'un gros logo pour justifier le prix. Les pièces parlent d'elles-mêmes.",
                author: "Antoine D.",
                role: locale === "en" ? "Lyon" : "Lyon"
              }
            ].map(({ quote, author, role }) => (
              <figure key={author} className="flex flex-col justify-between border border-white/15 bg-white/5 p-8">
                <blockquote className="text-sm leading-7 text-white/80">"{quote}"</blockquote>
                <figcaption className="mt-6 border-t border-white/15 pt-5">
                  <p className="font-headline text-lg font-bold tracking-[-0.03em]">{author}</p>
                  <p className="mt-1 text-xs text-white/50">{role}</p>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section className="page-shell page-section text-center">
        <p className="eyebrow mb-4">{t("ctaEyebrow")}</p>
        <h2 className="section-title mx-auto max-w-2xl">{t("ctaTitle")}</h2>
        <p className="section-copy mx-auto mt-4 max-w-lg text-center">{t("ctaDesc")}</p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Link className="button-primary" href="/precommande">{tc("preorder")}</Link>
          <Link className="button-secondary" href="/particulier">{t("ctaCollection")}</Link>
        </div>
      </section>
    </>
  );
}
