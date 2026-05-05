import { setRequestLocale, getTranslations } from "next-intl/server";

import { FumiAddToCart } from "@/components/fumi-add-to-cart";
import { Link } from "@/i18n/navigation";
import { formatPrice } from "@/lib/format";
import { fumiCategories, getFumiProductsByCategory } from "@/lib/fumisterie";

export async function generateMetadata({ params }) {
  const { locale } = await params;
  return {
    title: locale === "en" ? "Flue & Fuel | NUKÖ" : "Fumisterie & Combustibles | NUKÖ"
  };
}

export default async function FumisteriePage({ params }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("fumisterie");

  return (
    <>
      <section className="border-b border-outline bg-surface-muted">
        <div className="page-shell pt-36 pb-20 md:pt-44 md:pb-28">
          <p className="eyebrow mb-4">{t("eyebrow")}</p>
          <h1 className="page-title max-w-3xl">{t("title")}</h1>
          <p className="section-copy mt-6 max-w-2xl">{t("desc")}</p>
        </div>
      </section>

      <section className="border-b border-outline bg-[#1d1c18] py-4 text-white">
        <div className="page-shell flex flex-wrap items-center gap-6 text-sm text-white/70">
          <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#dcbf96]">{t("compatLabel")}</span>
          <span>{t("compatNomad")}</span>
          <span>{t("compatCabin")}</span>
          <span>{t("compatNote")}</span>
        </div>
      </section>

      {fumiCategories.map((cat) => {
        const products = getFumiProductsByCategory(cat.id);
        return (
          <section key={cat.id} className="border-b border-outline last:border-b-0">
            <div className="page-shell py-16">
              <div className="mb-10 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
                <div>
                  <p className="eyebrow mb-2">{cat.label}</p>
                  <p className="max-w-xl text-sm leading-7 text-on-surface-muted">{cat.description}</p>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {products.map((product) => (
                  <div
                    key={product.id}
                    className="flex flex-col justify-between border border-outline bg-surface p-6"
                  >
                    <div className="space-y-3">
                      <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-on-surface-muted">{product.ref}</p>
                      <h3 className="font-headline text-xl font-bold tracking-[-0.04em] leading-tight">{product.name}</h3>
                      <p className="text-sm leading-6 text-on-surface-muted">{product.description}</p>
                    </div>
                    <div className="mt-6 flex items-center justify-between gap-4 border-t border-outline pt-5">
                      <span className="font-headline text-2xl font-bold tracking-[-0.04em]">
                        {formatPrice(product.price)}
                      </span>
                      <FumiAddToCart product={product} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        );
      })}

      <section className="border-t border-outline bg-surface-muted">
        <div className="page-shell page-section grid gap-10 lg:grid-cols-2 lg:items-center">
          <div className="space-y-4">
            <p className="eyebrow">{t("adviceEyebrow")}</p>
            <h2 className="font-headline text-4xl font-bold tracking-[-0.05em]">{t("adviceTitle")}</h2>
            <p className="max-w-lg text-sm leading-7 text-on-surface-muted">{t("adviceDesc")}</p>
          </div>
          <div className="flex flex-wrap gap-4">
            <Link className="button-primary" href="/contact">{t("adviceCta")}</Link>
            <Link className="button-secondary" href="/devis">{t("quoteCta")}</Link>
          </div>
        </div>
      </section>
    </>
  );
}
