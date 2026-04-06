import Link from "next/link";
import { notFound } from "next/navigation";

import { AddToCartButton } from "@/components/add-to-cart-button";
import { CheckoutButton } from "@/components/checkout-button";
import { SectionHeading } from "@/components/section-heading";
import {
  installationGuide,
  installationSteps,
  safetyHighlights
} from "@/lib/content";
import { formatPrice } from "@/lib/format";
import { getProductBySlug } from "@/lib/products";

export async function generateMetadata({ params }) {
  const product = getProductBySlug(params.slug);

  if (!product) {
    return {};
  }

  return {
    title: `${product.name} | NUKÖ`,
    description: product.description
  };
}

export default function ProductPage({ params }) {
  const product = getProductBySlug(params.slug);

  if (!product) {
    notFound();
  }

  return (
    <>
      <section className="border-b border-outline bg-surface-muted">
        <div
          className="page-shell grid gap-10 py-10 lg:grid-cols-[1.15fr_0.85fr] lg:py-16"
          data-section-transition="curtain"
        >
          <div className="overflow-hidden border border-outline bg-surface">
            <img
              alt={product.name}
              className="h-full w-full object-cover"
              data-media-reveal=""
              data-scrub-scale="1.14,1"
              data-scrub-y="-8,12"
              src={product.heroImage}
            />
          </div>

          <div className="flex flex-col justify-center space-y-8" data-hero-copy="">
            <div className="space-y-5">
              <p className="eyebrow" data-reveal-item="">
                {product.stockLabel}
              </p>
              <h1 className="page-title max-w-xl" data-reveal-item="">
                {product.name}
              </h1>
              <p className="max-w-xl text-lg leading-8 text-on-surface-muted" data-reveal-item="">
                {product.longDescription}
              </p>
            </div>

            <div className="flex flex-wrap items-end gap-4" data-reveal-item="">
              <div className="font-headline text-5xl font-bold tracking-[-0.06em]">
                {formatPrice(product.price)}
              </div>
              <div className="pb-1 text-sm uppercase tracking-[0.16em] text-on-surface-muted line-through">
                {formatPrice(product.compareAtPrice)}
              </div>
            </div>

            <div className="grid gap-4 border border-outline bg-background p-6 sm:grid-cols-2" data-reveal-item="">
              <div>
                <p className="eyebrow mb-2">Expedition</p>
                <p className="text-sm leading-7 text-on-surface-muted">{product.leadTime}</p>
              </div>
              <div>
                <p className="eyebrow mb-2">Livraison</p>
                <p className="text-sm leading-7 text-on-surface-muted">{product.shippingLabel}</p>
              </div>
            </div>

            <div className="flex flex-col gap-4 sm:flex-row" data-reveal-item="">
              <AddToCartButton className="w-full sm:w-auto" productId={product.id} />
              <CheckoutButton
                className="w-full sm:w-auto"
                items={[{ productId: product.id, quantity: 1 }]}
                label="Payer maintenant"
              />
            </div>

            <Link className="button-link" data-reveal-item="" href="/panier">
              Voir le panier
            </Link>
          </div>
        </div>
      </section>

      <section className="page-shell page-section" data-section-transition="press-in">
        <SectionHeading
          eyebrow="Specifications"
          title="Precision thermique"
          description="Les dimensions, la puissance et le rendement du Nomad 01 en un coup d'oeil."
        />

        <div className="mt-12 grid gap-px overflow-hidden border border-outline bg-outline md:grid-cols-4" data-reveal-stagger="">
          {product.stats.map((stat) => (
            <div key={stat.label} className="bg-background p-8" data-float-panel="" data-reveal-item="">
              <p className="eyebrow mb-4">{stat.label}</p>
              <p className="font-headline text-4xl font-bold tracking-[-0.05em]">{stat.value}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-y border-outline bg-surface-muted">
        <div
          className="page-shell grid gap-10 py-20 lg:grid-cols-[0.95fr_1.05fr]"
          data-section-transition="drift-left"
        >
          <div className="overflow-hidden border border-outline bg-surface">
            <img
              alt={`${product.name} detail matiere`}
              className="h-full w-full object-cover"
              data-media-reveal=""
              data-scrub-scale="1.12,1"
              data-scrub-y="-6,10"
              src={product.gallery[1]}
            />
          </div>

          <div className="space-y-8">
            <SectionHeading
              eyebrow="Materiaux"
              title="Materiaux & securite"
              description="Des materiaux choisis pour durer, proteger et conserver une chaleur stable dans le temps."
            />

            <div className="space-y-6" data-reveal-stagger="">
              {product.features.map((feature) => (
                <div
                  key={feature.title}
                  className="border-b border-outline pb-6 last:border-b-0"
                  data-reveal-item=""
                >
                  <h3 className="font-headline text-2xl font-bold tracking-[-0.04em]">
                    {feature.title}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-on-surface-muted">{feature.description}</p>
                </div>
              ))}
            </div>

            <div className="grid gap-4 md:grid-cols-3" data-reveal-stagger="">
              {safetyHighlights.map((item) => (
                <div
                  key={item.title}
                  className="border border-outline bg-background p-5"
                  data-reveal-item=""
                >
                  <h3 className="font-headline text-2xl font-bold tracking-[-0.04em]">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-on-surface-muted">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="page-shell page-section" data-section-transition="press-in">
        <SectionHeading
          eyebrow="Installation"
          title="Distances, conduit et premiere mise a feu"
          description="Les points de repere essentiels pour penser l'implantation, la sortie de conduit et la mise en service."
        />

        <div className="mt-12 grid gap-px overflow-hidden border border-outline bg-outline md:grid-cols-3" data-reveal-stagger="">
          {installationGuide.map((item) => (
            <div key={item.label} className="bg-background p-8" data-float-panel="" data-reveal-item="">
              <p className="eyebrow mb-4">{item.label}</p>
              <p className="font-headline text-4xl font-bold tracking-[-0.05em]">{item.value}</p>
              <p className="mt-4 text-sm leading-7 text-on-surface-muted">{item.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-3" data-reveal-stagger="">
          {installationSteps.map((item) => (
            <article
              key={item.title}
              className="border border-outline bg-surface-muted p-8"
              data-float-panel=""
              data-reveal-item=""
            >
              <p className="eyebrow mb-4">{item.title}</p>
              <p className="text-sm leading-7 text-on-surface-muted">{item.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="page-shell page-section" data-section-transition="drift-right">
        <SectionHeading
          eyebrow="Galerie"
          title="Un seul produit, mais un rendu deja premium"
          description="Le Nomad 01 en situation, au plus pres des matieres, des volumes et de la presence du feu."
        />

        <div className="mt-12 grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="overflow-hidden border border-outline">
            <img
              alt={`${product.name} ambiance`}
              className="h-full w-full object-cover"
              data-media-reveal=""
              data-scrub-scale="1.14,1"
              data-scrub-y="-8,12"
              src={product.gallery[0]}
            />
          </div>
          <div className="grid gap-8">
            <div className="overflow-hidden border border-outline">
              <img
                alt={`${product.name} detail`}
                className="h-72 w-full object-cover"
                data-media-reveal=""
                data-scrub-scale="1.1,1"
                data-scrub-y="-5,8"
                src={product.gallery[2]}
              />
            </div>
            <div className="border border-outline bg-surface-muted p-8" data-float-panel="" data-reveal="">
              <p className="eyebrow mb-4">Inclus dans la commande</p>
              <ul className="space-y-3 text-sm leading-7 text-on-surface-muted">
                {product.included.map((item) => (
                  <li key={item}>• {item}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
