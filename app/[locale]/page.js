import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";

import { Link } from "@/i18n/navigation";
import { PreorderGauge } from "@/components/preorder-gauge";
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

        {/* ── SPLIT ENTRY ── */}
        <div className="relative grid md:grid-cols-2">
          <Link
            className="group flex flex-col justify-between border-t border-white/20 bg-white/5 p-10 backdrop-blur-sm transition-all duration-500 hover:bg-white/12 md:border-r"
            href="/particulier"
          >
            <div>
              <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.28em] text-[#dcbf96]">
                {t("splitParticularEyebrow")}
              </p>
              <h2 className="font-headline text-3xl font-bold uppercase tracking-[-0.05em] text-white md:text-4xl">
                {t("splitParticularTitle").split("\n").map((line, i) => (
                  <span key={i}>{i > 0 && <br />}{line}</span>
                ))}
              </h2>
              <p className="mt-4 max-w-sm text-sm leading-7 text-white/60">
                {t("splitParticularDesc")}
              </p>
            </div>
            <div className="mt-8 flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.2em] text-white/80 transition-colors duration-300 group-hover:text-[#dcbf96]">
              {t("splitParticularCta")}
              <svg className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} />
              </svg>
            </div>
          </Link>

          <Link
            className="group flex flex-col justify-between border-t border-white/20 bg-[#141410]/60 p-10 backdrop-blur-sm transition-all duration-500 hover:bg-[#141410]/80"
            href="/professionnel"
          >
            <div>
              <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.28em] text-[#dcbf96]">
                {t("splitProEyebrow")}
              </p>
              <h2 className="font-headline text-3xl font-bold uppercase tracking-[-0.05em] text-white md:text-4xl">
                {t("splitProTitle").split("\n").map((line, i) => (
                  <span key={i}>{i > 0 && <br />}{line}</span>
                ))}
              </h2>
              <p className="mt-4 max-w-sm text-sm leading-7 text-white/60">
                {t("splitProDesc")}
              </p>
            </div>
            <div className="mt-8 flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.2em] text-white/80 transition-colors duration-300 group-hover:text-[#dcbf96]">
              {t("splitProCta")}
              <svg className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} />
              </svg>
            </div>
          </Link>
        </div>
      </section>

      {/* ── PREORDER STRIP ── */}
      <section className="border-b border-outline bg-[#1d1c18] py-8 text-white">
        <div className="page-shell">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div className="flex-1">
              <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-[#dcbf96]">
                {t("stripEyebrow")}
              </p>
              <p className="mt-1 text-sm leading-6 text-white/70">{t("stripText")}</p>
            </div>
            <Link
              className="shrink-0 inline-flex items-center gap-3 border border-[#dcbf96] bg-transparent px-6 py-4 text-[11px] font-bold uppercase tracking-[0.2em] text-[#dcbf96] transition hover:bg-[#dcbf96] hover:text-[#141410]"
              href="/precommande"
            >
              {t("stripCta")}
            </Link>
          </div>
          <div className="mt-6 max-w-lg">
            <PreorderGauge compact reserved={reserved} total={100} />
          </div>
        </div>
      </section>

      {/* ── PRODUITS ── */}
      <section className="page-shell page-section">
        <div className="mb-14 flex flex-col gap-3">
          <p className="eyebrow">{t("collectionEyebrow")}</p>
          <h2 className="section-title max-w-2xl">{t("collectionTitle")}</h2>
          <p className="section-copy">{t("collectionDesc")}</p>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          {allProducts.map((product) => (
            <Link
              key={product.id}
              className="group relative overflow-hidden border border-outline bg-surface"
              href={`/produit/${product.slug}`}
            >
              <div className="overflow-hidden">
                <img
                  alt={product.name}
                  className="h-80 w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  src={product.cardImage}
                />
              </div>
              <div className="p-8">
                <p className="eyebrow mb-3">{product.category}</p>
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="font-headline text-4xl font-bold tracking-[-0.05em]">{product.name}</h3>
                    <p className="mt-3 max-w-sm text-sm leading-7 text-on-surface-muted">{product.subtitle}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-headline text-3xl font-bold tracking-[-0.05em]">{formatPrice(product.preorderPrice)}</p>
                    <p className="mt-1 text-xs text-on-surface-muted">{tc("launchPrice")}</p>
                    <p className="text-xs text-on-surface-muted line-through">{formatPrice(product.price)}</p>
                  </div>
                </div>
                <div className="mt-6 grid grid-cols-4 gap-px overflow-hidden border border-outline bg-outline">
                  {product.stats.map((stat) => (
                    <div key={stat.label} className="bg-surface-muted p-4">
                      <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-on-surface-muted">{stat.label}</p>
                      <p className="mt-1 font-headline text-xl font-bold tracking-[-0.04em]">{stat.value}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-6 flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] text-secondary transition-colors duration-300 group-hover:text-primary">
                  {tc("seeProduct")}
                  <svg className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} />
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ── VALEURS ── */}
      <section className="border-y border-outline bg-surface-muted">
        <div className="page-shell page-section grid gap-14 lg:grid-cols-2 lg:items-center">
          <div className="space-y-6">
            <p className="eyebrow">{t("valuesEyebrow")}</p>
            <h2 className="section-title">{t("valuesTitle").split("\n").map((line, i) => (<span key={i}>{i > 0 && <br />}{line}</span>))}</h2>
            <p className="section-copy">{t("valuesDesc")}</p>
            <blockquote className="border-l-2 border-secondary pl-5 font-headline text-2xl font-bold tracking-[-0.04em]">
              {t("valuesQuote")}
            </blockquote>
          </div>
          <div className="grid grid-cols-2 gap-px overflow-hidden border border-outline bg-outline">
            {[
              { value: "100 %", key: "statManual" },
              { value: "82–84 %", key: "statEfficiency" },
              { value: "Ø 150", key: "statFlue" },
              { value: "EN 13240", key: "statNorm" }
            ].map((stat) => (
              <div key={stat.key} className="bg-background p-8">
                <p className="font-headline text-3xl font-bold tracking-[-0.05em]">{stat.value}</p>
                <p className="mt-2 text-sm text-on-surface-muted">{t(stat.key)}</p>
              </div>
            ))}
          </div>
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
        <div className="mt-12 grid gap-6 md:grid-cols-4">
          {[
            { labelKey: "fumiPipes", descKey: "fumiPipesDesc" },
            { labelKey: "fumiPassages", descKey: "fumiPassagesDesc" },
            { labelKey: "fumiProtections", descKey: "fumiProtectionsDesc" },
            { labelKey: "fumiCharcoal", descKey: "fumiCharcoalDesc" }
          ].map((item) => (
            <div key={item.labelKey} className="border border-outline bg-surface-muted p-6">
              <h3 className="font-headline text-2xl font-bold tracking-[-0.04em]">{t(item.labelKey)}</h3>
              <p className="mt-2 text-sm leading-6 text-on-surface-muted">{t(item.descKey)}</p>
            </div>
          ))}
        </div>
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
