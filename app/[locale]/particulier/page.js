import { setRequestLocale, getTranslations } from "next-intl/server";

import { Link } from "@/i18n/navigation";
import { ProductImage } from "@/components/product-image";
import { formatPrice } from "@/lib/format";
import { allProducts } from "@/lib/products";

export async function generateMetadata({ params }) {
  const { locale } = await params;
  return {
    title: locale === "en" ? "Collection | CST" : "Collection | CST"
  };
}

export default async function ParticulierPage({ params }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("particulier");
  const tc = await getTranslations("common");

  return (
    <>
      <section className="border-b border-outline bg-surface-muted">
        <div className="page-shell pb-16 pt-36 md:pb-24 md:pt-44">
          <p className="eyebrow mb-4">{t("eyebrow")}</p>
          <h1 className="page-title max-w-3xl">{t("heroTitle")}</h1>
          <p className="section-copy mt-6 max-w-xl">{t("heroDesc")}</p>
        </div>
      </section>

      {/* Infos livraison / production */}
      <section className="border-b border-outline py-8">
        <div className="page-shell grid gap-6 md:grid-cols-3 md:divide-x md:divide-outline">
          <div className="md:pr-8">
            <p className="eyebrow mb-2">{t("shippingEyebrow")}</p>
            <h3 className="font-headline text-lg font-black uppercase tracking-[-0.02em]">{t("shippingTitle")}</h3>
            <p className="mt-2 text-sm leading-6 text-on-surface-muted">{t("shippingDesc")}</p>
          </div>
          <div className="md:px-8">
            <p className="eyebrow mb-2">{t("paymentEyebrow")}</p>
            <h3 className="font-headline text-lg font-black uppercase tracking-[-0.02em]">{t("paymentTitle")}</h3>
            <p className="mt-2 text-sm leading-6 text-on-surface-muted">{t("paymentDesc")}</p>
          </div>
          <div className="md:pl-8">
            <p className="eyebrow mb-2">{t("ecoEyebrow")}</p>
            <h3 className="font-headline text-lg font-black uppercase tracking-[-0.02em]">{t("zeroStock")}</h3>
            <p className="mt-2 text-sm leading-6 text-on-surface-muted">{t("ecoDesc")}</p>
          </div>
        </div>
      </section>

      {/* Liste produits */}
      <section className="page-shell page-section space-y-20">
        {allProducts.map((product, i) => (
          <article
            key={product.id}
            className={`grid gap-10 lg:grid-cols-2 lg:items-center ${i % 2 === 1 ? "lg:[direction:rtl]" : ""}`}
          >
            <Link
              className="group overflow-hidden border border-outline [direction:ltr]"
              href={`/produit/${product.slug}`}
            >
              <ProductImage
                alt={product.name}
                category={product.category}
                className="h-[480px] w-full object-cover transition-transform duration-700 group-hover:scale-105"
                src={product.heroImage}
              />
            </Link>

            <div className="space-y-7 [direction:ltr]">
              <div>
                <p className="eyebrow mb-3">{product.category}</p>
                <h2 className="font-headline text-5xl font-black uppercase tracking-[-0.04em] md:text-6xl">
                  {product.name}
                </h2>
                <p className="mt-4 text-base leading-8 text-on-surface-muted">{product.longDescription}</p>
              </div>

              {/* Stats matière */}
              <div className="grid grid-cols-2 gap-px overflow-hidden border border-outline bg-outline">
                {product.stats.map((stat) => (
                  <div key={stat.label} className="bg-background p-5">
                    <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-on-surface-muted">{stat.label}</p>
                    <p className="mt-1 font-headline text-2xl font-black tracking-[-0.04em]">{stat.value}</p>
                  </div>
                ))}
              </div>

              {/* Prix */}
              <div>
                <p className="eyebrow mb-1">Prix</p>
                <p className="font-headline text-5xl font-black tracking-[-0.06em]">{formatPrice(product.price)}</p>
              </div>

              <p className="text-sm leading-6 text-on-surface-muted">
                ✓ {tc("shippingLabel")} &nbsp;·&nbsp; ✓ {tc("deliveryLabel")}
              </p>

              {/* Tailles dispo */}
              {product.sizes && (
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((size) => (
                    <span key={size} className="border border-outline px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.14em] text-on-surface-muted">
                      {size}
                    </span>
                  ))}
                </div>
              )}

              <div className="flex flex-wrap gap-4">
                <Link className="button-primary" href={`/produit/${product.slug}`}>{t("preorderBtn")}</Link>
                <Link className="button-secondary" href={`/produit/${product.slug}`}>{t("consultBtn")}</Link>
              </div>
            </div>
          </article>
        ))}
      </section>
    </>
  );
}
