import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";

import { Link } from "@/i18n/navigation";
import { AudienceAccordion } from "@/components/audience-accordion";
import { FumiList } from "@/components/fumi-list";
import { HomeSplit } from "@/components/home-split";
import { PreorderGauge } from "@/components/preorder-gauge";
import { ProductCarousel } from "@/components/product-carousel";
import { formatPrice } from "@/lib/format";
import { allProducts } from "@/lib/products";
import { getPreorderCount } from "@/lib/preorder-count";

export default async function HomePage({ params }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("home");
  const tc = await getTranslations("common");
  const reserved = getPreorderCount();

  const [nomad, cabin] = allProducts;

  return (
    <>
      {/* ── HERO ── */}
      <section className="relative flex min-h-screen flex-col overflow-hidden bg-[#141410]">
        <img
          alt="Poele NUKO en situation"
          className="absolute inset-0 h-full w-full object-cover opacity-50"
          src="/images/hearth-home.jpg"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#141410]/60 via-transparent to-[#141410]/80" />

        <div className="relative flex flex-1 flex-col items-center justify-center px-6 py-32 text-center text-white">
          <p className="mb-6 text-[13px] font-bold uppercase tracking-[0.28em] text-[#dcbf96]">
            {t("heroBadge")}
          </p>
          <h1 className="font-headline text-6xl font-bold uppercase leading-[0.88] tracking-[-0.07em] md:text-8xl lg:text-[9rem]">
            {t("heroTitle").split("\n").map((line, i) => (
              <span key={i}>{i > 0 && <br />}{line}</span>
            ))}
          </h1>
          <p className="mx-auto mt-8 max-w-xl text-xl font-medium leading-8 text-white/85">
            {t("heroSubtitle")}
          </p>
          <div className="mt-6 inline-flex items-center gap-2 rounded-none border border-[#dcbf96]/40 bg-[#dcbf96]/10 px-5 py-3 text-sm text-[#dcbf96]">
            <span className="h-2 w-2 animate-pulse rounded-full bg-[#dcbf96]" />
            {t("preorderLive")}
          </div>
        </div>

      </section>

      <HomeSplit />

      {/* ── PRODUITS ── */}
      <section className="page-section overflow-hidden">
        <div className="page-shell mb-12 flex items-end justify-between gap-6">
          <div className="space-y-4">
            <p className="eyebrow">{t("collectionEyebrow")}</p>
            <h2 className="section-title max-w-xl">{t("collectionTitle")}</h2>
          </div>
          <p className="hidden max-w-xs text-right text-sm font-light leading-7 text-on-surface-muted md:block">
            {t("collectionDesc")}
          </p>
        </div>
        <div className="pl-6 md:pl-10">
          <ProductCarousel products={allProducts} />
        </div>
      </section>

      {/* ── VALEURS ── */}
      <section className="border-y border-outline bg-surface-muted">
        <div className="page-shell page-section grid gap-20 lg:grid-cols-2 lg:items-start">
          <div className="space-y-8">
            <p className="eyebrow">{t("valuesEyebrow")}</p>
            <h2 className="section-title">{t("valuesTitle").split("\n").map((line, i) => (<span key={i}>{i > 0 && <br />}{line}</span>))}</h2>
            <p className="section-copy">{t("valuesDesc")}</p>
            <blockquote className="border-l-2 border-secondary pl-6 font-headline text-2xl font-light italic tracking-[-0.02em] text-on-surface-muted">
              {t("valuesQuote")}
            </blockquote>
          </div>
          <AudienceAccordion locale={locale} />
        </div>
      </section>

      {/* ── FUMISTERIE TEASER ── */}
      <section className="page-shell page-section">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="space-y-3">
            <p className="eyebrow">{t("fumiEyebrow")}</p>
            <h2 className="section-title">{t("fumiTitle").split("\n").map((line, i) => (<span key={i}>{i > 0 && <br />}{line}</span>))}</h2>
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

      {/* ── LOGIQUE PRECOMMANDE ── */}
      <section className="border-y border-outline bg-[#1d1c18] text-white">
        <div className="page-shell page-section grid gap-12 lg:grid-cols-2 lg:items-center">
          <div className="space-y-6">
            <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-[#dcbf96]">{t("preorderWhyEyebrow")}</p>
            <h2 className="font-headline text-4xl font-bold uppercase tracking-[-0.06em] md:text-6xl">
              {t("preorderWhyTitle").split("\n").map((line, i) => (<span key={i}>{i > 0 && <br />}{line}</span>))}
            </h2>
            <p className="max-w-lg text-base leading-8 text-white/70">{t("preorderWhyDesc1")}</p>
            <p className="text-base leading-8 text-white/70">{t("preorderWhyDesc2")}</p>
          </div>
          <div className="space-y-4">
            {[
              { num: "01", title: t("step1Title"), desc: t("step1Desc") },
              { num: "02", title: t("step2Title"), desc: t("step2Desc") },
              { num: "03", title: t("step3Title"), desc: t("step3Desc") }
            ].map((step) => (
              <div key={step.num} className="flex gap-5 border border-white/15 bg-white/5 p-6">
                <span className="font-headline text-3xl font-bold tracking-[-0.05em] text-[#dcbf96] opacity-60">{step.num}</span>
                <div>
                  <h3 className="font-headline text-xl font-bold tracking-[-0.04em]">{step.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-white/60">{step.desc}</p>
                </div>
              </div>
            ))}
            <Link
              className="mt-4 inline-flex items-center gap-3 bg-white px-6 py-4 text-[11px] font-bold uppercase tracking-[0.2em] text-[#141410] transition hover:bg-[#dcbf96]"
              href="/precommande"
            >
              {t("preorderCta")}
            </Link>
          </div>
        </div>
      </section>

      {/* ── PREORDER STRIP ── */}
      <section className="border-b border-outline bg-[#1d1c18] py-10 text-white">
        <div className="page-shell">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div className="flex-1">
              <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-[#dcbf96]">
                {t("stripEyebrow")}
              </p>
              <p className="mt-1 text-sm leading-6 text-white/70">{t("stripText")}</p>
            </div>
            <Link
              className="shrink-0 border border-[#dcbf96] px-6 py-4 text-[11px] font-bold uppercase tracking-[0.2em] text-[#dcbf96] transition hover:bg-[#dcbf96] hover:text-[#141410]"
              href="/precommande"
            >
              {t("stripCta")}
            </Link>
          </div>
          <div className="mt-8 max-w-lg">
            <PreorderGauge compact reserved={reserved} total={100} />
          </div>
        </div>
      </section>

      {/* ── CTA FINAL ── */}
      <section className="page-shell page-section text-center">
        <p className="eyebrow mb-4">{t("ctaEyebrow")}</p>
        <h2 className="section-title mx-auto max-w-2xl">
          {t("ctaTitle").split("\n").map((line, i) => (<span key={i}>{i > 0 && <br />}{line}</span>))}
        </h2>
        <p className="section-copy mx-auto mt-4 max-w-lg text-center">{t("ctaDesc")}</p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Link className="button-primary" href="/contact">{t("ctaContactBtn") ?? tc("contactWorkshop")}</Link>
          <Link className="button-secondary" href="/professionnel">{t("ctaProBtn") ?? tc("proSpace")}</Link>
        </div>
      </section>
    </>
  );
}
