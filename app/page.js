import Link from "next/link";

import { ProductCard } from "@/components/product-card";
import { SectionHeading } from "@/components/section-heading";
import {
  customerGallery,
  faqs,
  featuredQuote,
  heroProduct,
  homeStats,
  homeUseCases,
  journalArticles
} from "@/lib/content";

export default function HomePage() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-outline bg-[#1d1c18] text-white">
        <img
          alt="Interieur chaleureux avec poele NUKÖ"
          className="absolute inset-0 h-full w-full object-cover opacity-45"
          data-media-reveal=""
          data-scrub-scale="1.16,1"
          data-scrub-y="-8,12"
          src="/images/hearth-home.jpg"
        />
        <div className="gradient-mask absolute inset-0" />

        <div className="page-shell relative grid min-h-[78vh] items-end py-16 md:py-24">
          <div className="max-w-4xl space-y-8 pb-12" data-hero-copy="">
            <p className="eyebrow text-[#dcbf96]" data-reveal-item="">
              Poeles a bois compacts pour petits espaces
            </p>
            <h1
              className="font-headline text-6xl font-bold uppercase leading-[0.9] tracking-[-0.08em] md:text-8xl lg:text-[7rem]"
              data-reveal-item=""
            >
              La chaleur pour les habitats compacts
            </h1>
            <p className="max-w-xl text-lg leading-8 text-white/78" data-reveal-item="">
              Des poeles compacts, robustes et expressifs, concus pour apporter une vraie presence
              du feu dans les vans, tiny houses et refuges.
            </p>
            <div className="flex flex-wrap gap-4" data-reveal-item="">
              <Link className="button-primary" href={`/boutique/${heroProduct.slug}`}>
                Decouvrir {heroProduct.name}
              </Link>
              <Link className="button-secondary border-white/30 text-white hover:border-[#dcbf96] hover:text-[#f4e7d4]" href="/boutique">
                Voir la boutique
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="page-section page-shell" data-section-start="top 74%" data-section-transition="press-in">
        <SectionHeading
          eyebrow="Usages"
          title="Pense pour les volumes restreints"
          description="Trois environnements, une meme exigence: chauffer juste, durer longtemps et occuper le moins d'espace possible."
        />

        <div className="mt-14 grid gap-8 md:grid-cols-3" data-reveal-stagger="">
          {homeUseCases.map((useCase) => (
            <article
              key={useCase.title}
              className="overflow-hidden border border-outline bg-surface"
              data-float-panel=""
              data-reveal-item=""
            >
              <img
                alt={useCase.title}
                className="h-72 w-full object-cover"
                data-media-reveal=""
                data-scrub-scale="1.12,1"
                data-scrub-y="-6,10"
                src={useCase.image}
              />
              <div className="space-y-4 p-6">
                <h3 className="font-headline text-3xl font-bold tracking-[-0.05em]">{useCase.title}</h3>
                <p className="text-sm leading-7 text-on-surface-muted">{useCase.description}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="border-y border-outline bg-surface-muted">
        <div
          className="page-shell grid gap-10 py-16 lg:grid-cols-[1.2fr_1fr] lg:items-center"
          data-section-transition="curtain"
        >
          <div className="space-y-6" data-reveal-stagger="">
            <p className="eyebrow" data-reveal-item="">
              Savoir-faire
            </p>
            <h2 className="section-title" data-reveal-item="">
              Une chaleur pensee pour durer
            </h2>
            <p className="section-copy" data-reveal-item="">
              Chaque modele combine compacite, inertie et sobriete visuelle pour trouver sa place
              dans les lieux de vie les plus contraints, sans renoncer au confort d'un vrai feu.
            </p>
            <blockquote
              className="border-l-2 border-secondary pl-5 font-headline text-2xl font-bold tracking-[-0.04em] text-on-surface"
              data-reveal-item=""
              data-scrub-x="-4,6"
            >
              {featuredQuote}
            </blockquote>
          </div>

          <div className="grid gap-px overflow-hidden border border-outline bg-outline sm:grid-cols-3" data-reveal-stagger="">
            {homeStats.map((stat) => (
              <div key={stat.label} className="bg-background p-6" data-float-panel="" data-reveal-item="">
                <div className="font-headline text-3xl font-bold tracking-[-0.05em]">{stat.value}</div>
                <div className="mt-2 text-sm leading-6 text-on-surface-muted">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="page-section page-shell">
        <div className="mb-12 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            eyebrow="Modele signature"
            title="Le Nomad 01"
            description="Le premier modele de la collection, pense pour les habitats compacts et les vies en mouvement."
          />
          <Link className="button-link" data-reveal="" href="/panier">
            Voir le panier
          </Link>
        </div>
        <ProductCard product={heroProduct} />
      </section>

      <section className="border-y border-outline bg-surface-muted">
        <div className="page-shell page-section" data-section-transition="drift-right">
          <SectionHeading
            eyebrow="Galerie clients"
            title="Des lieux reels, des usages differents"
            description="Vans, tiny houses et refuges compacts: trois facons d'habiter le froid avec la meme exigence de chaleur et de sobriete."
          />

          <div className="mt-14 grid gap-8 lg:grid-cols-3" data-reveal-stagger="">
            {customerGallery.map((item) => (
              <article
                key={`${item.title}-${item.location}`}
                className="overflow-hidden border border-outline bg-background"
                data-float-panel=""
                data-reveal-item=""
              >
                <img
                  alt={item.title}
                  className="h-80 w-full object-cover"
                  data-media-reveal=""
                  data-scrub-scale="1.12,1"
                  data-scrub-y="-6,10"
                  src={item.image}
                />
                <div className="space-y-4 p-6">
                  <p className="eyebrow">{item.location}</p>
                  <h3 className="font-headline text-3xl font-bold tracking-[-0.05em]">{item.title}</h3>
                  <p className="text-sm leading-7 text-on-surface-muted">{item.caption}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-outline bg-surface-muted">
        <div className="page-shell page-section" data-section-transition="drift-left">
          <SectionHeading
            eyebrow="Journal"
            title="Carnets, usages et art du feu"
            description="Conseils d'installation, gestes d'entretien et inspirations autour du chauffage compact."
          />

          <div className="mt-14 grid gap-8 lg:grid-cols-3" data-reveal-stagger="">
            {journalArticles.map((article) => (
              <Link
                key={article.slug}
                className="block overflow-hidden border border-outline bg-background transition-transform duration-300 hover:-translate-y-1"
                data-float-panel=""
                data-reveal-item=""
                href={`/journal/${article.slug}`}
              >
                <img
                  alt={article.title}
                  className="h-72 w-full object-cover"
                  data-media-reveal=""
                  data-scrub-scale="1.12,1"
                  data-scrub-y="-6,10"
                  src={article.image}
                />
                <div className="space-y-4 p-6">
                  <p className="eyebrow">
                    {article.category} · {article.readingTime}
                  </p>
                  <h3 className="font-headline text-3xl font-bold tracking-[-0.05em]">{article.title}</h3>
                  <p className="text-sm leading-7 text-on-surface-muted">{article.excerpt}</p>
                  <span className="button-link">Lire l'article</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="page-shell page-section" data-section-transition="drift-right">
        <SectionHeading
          eyebrow="Questions frequentes"
          title="Tout ce qu'il faut savoir avant de commander"
          description="Livraison, paiement, installation et accompagnement: les points essentiels en un coup d'oeil."
        />

        <div className="mt-14 grid gap-6 lg:grid-cols-3" data-reveal-stagger="">
          {faqs.map((item) => (
            <div key={item.question} className="surface-panel p-6" data-float-panel="" data-reveal-item="">
              <h3 className="font-headline text-2xl font-bold tracking-[-0.04em]">{item.question}</h3>
              <p className="mt-4 text-sm leading-7 text-on-surface-muted">{item.answer}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
