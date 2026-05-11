import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";

import { TransitionLink as Link } from "@/components/page-transition";
import { AudienceAccordion } from "@/components/audience-accordion";
import { FumiList } from "@/components/fumi-list";
import { HomeSplit } from "@/components/home-split";
import { Marquee } from "@/components/marquee";
import { ParallaxHero } from "@/components/parallax-hero";
import { ProductCarousel } from "@/components/product-carousel";
import { allProducts } from "@/lib/products";

export default async function HomePage({ params }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("home");
  return (
    <>
      {/* ── HERO ── */}
      <section className="relative flex min-h-screen flex-col overflow-hidden bg-black">
        <ParallaxHero
          src="/images/hero-fashion.jpg"
          alt="CST — pièce en situation"
          imageClassName="opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/30" />

        <div className="relative flex flex-1 flex-col justify-end px-6 pb-20 pt-24 text-white md:px-10 md:pb-28 md:pt-28">
          <p data-hero-badge className="mb-6 text-[11px] font-bold uppercase tracking-[0.28em] text-white/50">
            {t("heroBadge")}
          </p>
          <h1 data-hero-title className="page-title max-w-5xl text-white">
            {t("heroTitle").split("\n").map((line, i) => (
              <span key={i}>{i > 0 && <br />}{line}</span>
            ))}
          </h1>
          <div data-hero-cta className="mt-10 flex flex-wrap items-center gap-4">
            <Link
              className="border border-white px-7 py-4 text-[11px] font-bold uppercase tracking-[0.2em] text-white transition hover:bg-white hover:text-black"
              href="/particulier"
            >
              {t("preorderCta")}
            </Link>
            <Link
              className="text-[11px] font-bold uppercase tracking-[0.2em] text-white/60 transition hover:text-white"
              href="/particulier"
            >
              {t("collectionEyebrow")} →
            </Link>
          </div>
          <div className="mt-8 inline-flex items-center gap-2 text-xs text-white/40">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-white/40" />
            {t("preorderLive")}
          </div>
        </div>
      </section>

      {/* ── MARQUEE ── */}
      <Marquee text="DROP 01 DISPONIBLE · FABRIQUÉ AU PORTUGAL · ÉDITION LIMITÉE · COTON 320 G/M² · LIVRAISON OFFERTE ·" />

      {/* ── DEUX PANNEAUX ── */}
      <HomeSplit />

      {/* ── COLLECTION ── */}
      <section className="py-20 md:py-32">
        <div className="page-shell mb-10 flex items-end justify-between gap-6">
          <div>
            <p className="eyebrow mb-3">{t("collectionEyebrow")}</p>
            <h2 className="section-title">{t("collectionTitle")}</h2>
          </div>
          <p className="hidden max-w-xs text-right text-sm font-light leading-7 text-on-surface-muted md:block">
            {t("collectionDesc")}
          </p>
        </div>
        <div className="pl-6 md:pl-10">
          <ProductCarousel products={allProducts} />
        </div>
      </section>

      {/* ── POURQUOI NUKÖ ── */}
      <section className="border-y border-outline bg-surface-muted">
        <div className="page-shell page-section grid gap-20 lg:grid-cols-2 lg:items-start">
          <div className="space-y-8">
            <p className="eyebrow">{t("valuesEyebrow")}</p>
            <h2 className="section-title">
              {t("valuesTitle").split("\n").map((line, i) => (
                <span key={i}>{i > 0 && <br />}{line}</span>
              ))}
            </h2>
            <p className="section-copy">{t("valuesDesc")}</p>
            <blockquote className="border-l-2 border-primary pl-6 text-xl font-light italic leading-8 text-on-surface-muted">
              {t("valuesQuote")}
            </blockquote>
          </div>
          <AudienceAccordion locale={locale} />
        </div>
      </section>

      {/* ── FUMISTERIE ── */}
      <section className="page-shell page-section">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="space-y-3">
            <p className="eyebrow">{t("fumiEyebrow")}</p>
            <h2 className="section-title">
              {t("fumiTitle").split("\n").map((line, i) => (
                <span key={i}>{i > 0 && <br />}{line}</span>
              ))}
            </h2>
            <p className="section-copy max-w-lg">{t("fumiDesc")}</p>
          </div>
          <Link className="button-secondary shrink-0" href="/fumisterie">{t("fumiCta")}</Link>
        </div>
        <FumiList items={[
          { num: "01", label: t("fumiPipes"), desc: t("fumiPipesDesc") },
          { num: "02", label: t("fumiPassages"), desc: t("fumiPassagesDesc") },
          { num: "03", label: t("fumiProtections"), desc: t("fumiProtectionsDesc") },
          { num: "04", label: t("fumiCharcoal"), desc: t("fumiCharcoalDesc") },
        ]} />
      </section>

      {/* ── POURQUOI PRÉCOMMANDER ── */}
      <section className="bg-black text-white">
        <div className="page-shell page-section grid gap-12 lg:grid-cols-2 lg:items-center">
          <div className="space-y-6">
            <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-white/40">{t("preorderWhyEyebrow")}</p>
            <h2 className="section-title text-white">
              {t("preorderWhyTitle").split("\n").map((line, i) => (
                <span key={i}>{i > 0 && <br />}{line}</span>
              ))}
            </h2>
            <p className="max-w-lg text-base leading-8 text-white/60">{t("preorderWhyDesc1")}</p>
            <p className="text-base leading-8 text-white/60">{t("preorderWhyDesc2")}</p>
          </div>
          <div className="space-y-3">
            {[
              { num: "01", title: t("step1Title"), desc: t("step1Desc") },
              { num: "02", title: t("step2Title"), desc: t("step2Desc") },
              { num: "03", title: t("step3Title"), desc: t("step3Desc") },
            ].map((step) => (
              <div key={step.num} className="flex gap-6 border border-white/10 p-6">
                <span className="font-headline text-3xl font-black text-white/20">{step.num}</span>
                <div>
                  <h3 className="font-headline text-xl font-black uppercase tracking-[-0.02em] text-white">{step.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-white/50">{step.desc}</p>
                </div>
              </div>
            ))}
            <Link
              className="mt-4 inline-flex border border-white px-7 py-4 text-[11px] font-bold uppercase tracking-[0.2em] text-white transition hover:bg-white hover:text-black"
              href="/particulier"
            >
              {t("preorderCta")}
            </Link>
          </div>
        </div>
      </section>


      {/* ── CTA FINAL ── */}
      <section className="page-shell page-section text-center">
        <p className="eyebrow mb-4">{t("ctaEyebrow")}</p>
        <h2 className="section-title mx-auto max-w-2xl">
          {t("ctaTitle").split("\n").map((line, i) => (
            <span key={i}>{i > 0 && <br />}{line}</span>
          ))}
        </h2>
        <p className="section-copy mx-auto mt-6 text-center">{t("ctaDesc")}</p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Link className="button-primary" href="/contact">{t("ctaContactBtn")}</Link>
        </div>
      </section>
    </>
  );
}
