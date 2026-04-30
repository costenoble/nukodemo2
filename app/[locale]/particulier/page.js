import { setRequestLocale, getTranslations } from "next-intl/server";

import { Link } from "@/i18n/navigation";
import { PreorderGauge, PreorderGaugeLight } from "@/components/preorder-gauge";
import { formatPrice } from "@/lib/format";
import { allProducts } from "@/lib/products";
import { getPreorderCount, PREORDER_TOTAL } from "@/lib/preorder-count";

export async function generateMetadata({ params }) {
  const { locale } = await params;
  return {
    title: locale === "en" ? "Compact wood-burning stoves | NUKÖ" : "Poêles à bois compacts | NUKÖ"
  };
}

export default async function ParticulierPage({ params }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("particulier");
  const tc = await getTranslations("common");
  const reserved = getPreorderCount();

  return (
    <>
      <section className="border-b border-outline bg-surface-muted">
        <div className="page-shell py-20 md:py-28">
          <p className="eyebrow mb-4">{t("eyebrow")}</p>
          <h1 className="page-title max-w-3xl">{t("heroTitle")}</h1>
          <p className="section-copy mt-6 max-w-xl">{t("heroDesc")}</p>
        </div>
      </section>

      <section className="border-b border-outline bg-background py-10">
        <div className="page-shell grid gap-8 md:grid-cols-[1fr_auto] md:items-center">
          <div className="space-y-4">
            <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-secondary">
              {t("preorderBadge")}
            </p>
            <div className="max-w-md">
              <PreorderGaugeLight reserved={reserved} total={PREORDER_TOTAL} />
            </div>
            <div className="flex flex-wrap gap-x-6 gap-y-1 text-xs text-on-surface-muted">
              <span>✓ {tc("shippingLabel")}</span>
              <span>✓ {tc("deliveryLabel")}</span>
            </div>
          </div>
          <Link
            className="button-primary shrink-0 self-center px-7 py-4"
            href="/precommande"
          >
            {tc("preorder")}
          </Link>
        </div>
        <div className="page-shell mt-8 grid border-t border-outline pt-8 md:grid-cols-3">
          <div className="pr-8">
            <p className="eyebrow">{t("paymentEyebrow")}</p>
            <h3 className="mt-2 font-headline text-lg font-bold tracking-[-0.03em]">{t("paymentTitle")}</h3>
            <p className="mt-2 text-sm leading-6 text-on-surface-muted">{t("paymentDesc")}</p>
          </div>
          <div className="border-t border-outline pt-8 pr-8 md:border-l md:border-t-0 md:pl-8 md:pt-0">
            <p className="eyebrow">{t("shippingEyebrow")}</p>
            <h3 className="mt-2 font-headline text-lg font-bold tracking-[-0.03em]">{t("shippingTitle")}</h3>
            <p className="mt-2 text-sm leading-6 text-on-surface-muted">{t("shippingDesc")}</p>
          </div>
          <div className="border-t border-outline pt-8 md:border-l md:border-t-0 md:pl-8 md:pt-0">
            <p className="eyebrow">{t("ecoEyebrow")}</p>
            <h3 className="mt-2 font-headline text-lg font-bold tracking-[-0.03em]">{t("zeroStock")}</h3>
            <p className="mt-2 text-sm leading-6 text-on-surface-muted">{t("ecoDesc")}</p>
          </div>
        </div>
      </section>

      <section className="page-shell page-section space-y-16">
        {allProducts.map((product, i) => (
          <article
            key={product.id}
            className={`grid gap-10 lg:grid-cols-2 lg:items-center ${i % 2 === 1 ? "lg:[direction:rtl]" : ""}`}
          >
            <Link
              className="group overflow-hidden border border-outline [direction:ltr]"
              href={`/produit/${product.slug}`}
            >
              <img
                alt={product.name}
                className="h-[480px] w-full object-cover transition-transform duration-700 group-hover:scale-105"
                src={product.heroImage}
              />
            </Link>

            <div className="space-y-7 [direction:ltr]">
              <div>
                <p className="eyebrow mb-3">{tc("preorderBadge")}</p>
                <h2 className="font-headline text-5xl font-bold uppercase tracking-[-0.06em] md:text-6xl">
                  {product.name}
                </h2>
                <p className="mt-4 text-base leading-8 text-on-surface-muted">{product.longDescription}</p>
              </div>

              <div className="grid grid-cols-2 gap-px overflow-hidden border border-outline bg-outline">
                {product.stats.map((stat) => (
                  <div key={stat.label} className="bg-background p-5">
                    <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-on-surface-muted">{stat.label}</p>
                    <p className="mt-1 font-headline text-2xl font-bold tracking-[-0.04em]">{stat.value}</p>
                  </div>
                ))}
              </div>

              <div className="flex items-end gap-4">
                <div>
                  <p className="eyebrow mb-1">{t("preorderPrice")}</p>
                  <p className="font-headline text-5xl font-bold tracking-[-0.06em]">{formatPrice(product.preorderPrice)}</p>
                </div>
                <div className="pb-1">
                  <p className="text-sm text-on-surface-muted line-through">{formatPrice(product.price)}</p>
                </div>
              </div>

              <p className="text-sm leading-6 text-on-surface-muted">
                {tc("deliveryLabel")} — {tc("shippingLabel")}
              </p>

              <div className="flex flex-wrap gap-4">
                <Link className="button-primary" href={`/precommande?model=${product.id}`}>{t("preorderBtn")}</Link>
                <Link className="button-secondary" href={`/produit/${product.slug}`}>{t("consultBtn")}</Link>
              </div>
            </div>
          </article>
        ))}
      </section>

    </>
  );
}
