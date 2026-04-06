import { ProductCard } from "@/components/product-card";
import { SectionHeading } from "@/components/section-heading";
import { boutiqueHighlights, modelUsageGuide } from "@/lib/content";
import { featuredProduct, upcomingProducts } from "@/lib/products";

export const metadata = {
  title: "Boutique | NUKÖ"
};

export default function BoutiquePage() {
  return (
    <div className="page-shell page-section space-y-16">
      <SectionHeading
        eyebrow="Boutique"
        title="La collection"
        description="Des poeles compacts concus pour durer, habiter le froid et trouver leur place dans les espaces restreints."
      />

      <div
        className="grid gap-6 border border-outline bg-surface-muted p-8 lg:grid-cols-[1.2fr_1fr]"
        data-reveal=""
        data-section-transition="curtain"
      >
        <div className="space-y-4" data-reveal-stagger="">
          <p className="eyebrow" data-reveal-item="">
            L'essentiel
          </p>
          <h2 className="font-headline text-4xl font-bold tracking-[-0.05em]" data-reveal-item="">
            Des poeles compacts, sans compromis
          </h2>
        </div>
        <ul className="space-y-3 text-sm leading-7 text-on-surface-muted" data-reveal-stagger="">
          {boutiqueHighlights.map((item) => (
            <li key={item} data-reveal-item="">
              • {item}
            </li>
          ))}
        </ul>
      </div>

      <ProductCard ctaLabel="Decouvrir le modele" product={featuredProduct} />

      <section className="space-y-8" data-section-transition="press-in">
        <SectionHeading
          eyebrow="Guide"
          title="Quel modele pour quel usage ?"
          description="Une lecture simple des formats de la collection selon les volumes, les usages et l'ambiance recherchee."
        />

        <div className="grid gap-8 md:grid-cols-3" data-reveal-stagger="">
          {modelUsageGuide.map((item) => (
            <article
              key={item.name}
              className="border border-outline bg-background p-8"
              data-float-panel=""
              data-reveal-item=""
            >
              <p className="eyebrow mb-4">{item.status}</p>
              <h3 className="font-headline text-4xl font-bold tracking-[-0.05em]">{item.name}</h3>
              <p className="mt-4 text-sm uppercase tracking-[0.14em] text-on-surface-muted">
                {item.useCase}
              </p>
              <p className="mt-4 text-sm leading-7 text-on-surface-muted">{item.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="space-y-8" data-section-transition="drift-right">
        <p className="eyebrow">A venir</p>
        <div className="grid gap-8 md:grid-cols-2" data-reveal-stagger="">
          {upcomingProducts.map((product) => (
            <article
              key={product.id}
              className="border border-dashed border-outline bg-background p-8"
              data-float-panel=""
              data-reveal-item=""
            >
              <p className="eyebrow mb-4">{product.status}</p>
              <h3 className="font-headline text-4xl font-bold tracking-[-0.05em]">{product.name}</h3>
              <p className="mt-4 max-w-lg text-sm leading-7 text-on-surface-muted">
                {product.description}
              </p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
