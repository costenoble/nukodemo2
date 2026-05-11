import { setRequestLocale, getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";

import { AddToCartForm } from "@/components/add-to-cart-form";
import { ProductGallery } from "@/components/product-gallery";
import { SectionHeading } from "@/components/section-heading";
import { StickyProductCTA } from "@/components/sticky-product-cta";
import { TransitionLink as Link } from "@/components/page-transition";
import { formatPrice } from "@/lib/format";
import { allProducts, getProductBySlug } from "@/lib/products";

export async function generateStaticParams() {
  return allProducts.flatMap((p) =>
    ["fr", "en"].map((locale) => ({ locale, slug: p.slug }))
  );
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return {};
  return {
    title: `${product.name} — ${product.subtitle} | CST`,
    description: product.description,
    openGraph: {
      title: `${product.name} | CST`,
      description: product.description,
      images: [{ url: product.heroImage, width: 1200, height: 630, alt: product.name }],
      type: "website"
    }
  };
}

export default async function ProduitPage({ params }) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const product = getProductBySlug(slug);
  if (!product) notFound();

  const t = await getTranslations("product");
  const tc = await getTranslations("common");

  return (
    <>
      <section className="border-b border-outline bg-surface-muted">
        <div className="page-shell grid gap-10 py-12 lg:grid-cols-[1.1fr_0.9fr] lg:py-20">
          <ProductGallery images={product.gallery} productName={product.name} />

          <div className="flex flex-col justify-between gap-8">
            <div className="space-y-5">
              <span className="inline-block border border-outline px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-on-surface-muted">
                {product.category}
              </span>
              <h1 className="font-headline text-6xl font-bold uppercase tracking-[-0.07em] lg:text-7xl">
                {product.name}
              </h1>
              <p className="text-base leading-8 text-on-surface-muted">{product.longDescription}</p>
            </div>

            <div className="grid grid-cols-2 gap-px overflow-hidden border border-outline bg-outline">
              {product.stats.map((stat) => (
                <div key={stat.label} className="bg-background p-6">
                  <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-on-surface-muted">{stat.label}</p>
                  <p className="mt-1.5 font-headline text-3xl font-bold tracking-[-0.05em]">{stat.value}</p>
                </div>
              ))}
            </div>

            <AddToCartForm product={product} />
          </div>
        </div>
      </section>

      <section className="page-shell page-section">
        <SectionHeading
          eyebrow={t("specsEyebrow")}
          title={t("specsTitle")}
          description={t("specsDesc")}
        />
        <div className="mt-12 overflow-hidden border border-outline">
          {product.specs.map((spec, i) => (
            <div
              key={spec.label}
              className={`flex items-center justify-between gap-6 px-6 py-4 ${i % 2 === 0 ? "bg-surface-muted" : "bg-background"}`}
            >
              <span className="text-sm font-medium text-on-surface-muted">{spec.label}</span>
              <span className="font-headline text-lg font-bold tracking-[-0.03em]">{spec.value}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="border-y border-outline bg-surface-muted">
        <div className="page-shell grid gap-10 py-20 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div className="overflow-hidden border border-outline">
            <img
              alt={`${product.name} detail`}
              className="h-[500px] w-full object-cover"
              src={product.gallery[1] ?? product.gallery[0]}
            />
          </div>
          <div className="space-y-8">
            <SectionHeading eyebrow={t("materialsEyebrow")} title={t("materialsTitle")} />
            <div className="space-y-6">
              {product.features.map((feat, i) => (
                <div
                  key={feat.title}
                  className={`flex gap-5 pb-6 ${i < product.features.length - 1 ? "border-b border-outline" : ""}`}
                >
                  <span className="mt-1 flex h-7 w-7 shrink-0 items-center justify-center border border-secondary text-[10px] font-bold text-secondary">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="font-headline text-2xl font-bold tracking-[-0.04em]">{feat.title}</h3>
                    <p className="mt-2 text-sm leading-7 text-on-surface-muted">{feat.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-outline bg-surface-muted">
        <div className="page-shell grid gap-10 py-20 lg:grid-cols-2 lg:items-center">
          <div className="space-y-4">
            <p className="eyebrow">{t("deliveryEyebrow")}</p>
            <h2 className="font-headline text-4xl font-bold tracking-[-0.05em]">{t("deliveryTitle")}</h2>
            <ul className="space-y-3">
              {product.included.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm leading-7">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-secondary" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="space-y-4">
            <p className="eyebrow">{t("audienceEyebrow")}</p>
            <h2 className="font-headline text-4xl font-bold tracking-[-0.05em]">{t("audienceTitle")}</h2>
            <ul className="space-y-3">
              {product.audience.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm leading-7">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-secondary" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* CTA bas de page */}
      <section className="border-t border-outline bg-black py-16 text-white">
        <div className="page-shell flex flex-col items-center gap-6 text-center md:flex-row md:justify-between md:text-left">
          <div className="space-y-3">
            <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-white/40">CST — {product.category}</p>
            <h2 className="font-headline text-4xl font-bold uppercase tracking-[-0.06em] md:text-5xl">
              {product.name}
            </h2>
            <p className="text-sm text-white/50">{product.shippingLabel}</p>
          </div>
          <div className="flex items-center gap-6">
            <p className="font-headline text-4xl font-bold tracking-[-0.06em]">{formatPrice(product.price)}</p>
            <Link
              className="border border-white px-8 py-4 text-[11px] font-bold uppercase tracking-[0.2em] text-white transition hover:bg-white hover:text-black"
              href="/panier"
            >
              Voir le panier
            </Link>
          </div>
        </div>
      </section>

      <StickyProductCTA product={product} />
    </>
  );
}
