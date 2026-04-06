import Link from "next/link";
import { notFound } from "next/navigation";

import { getJournalArticleBySlug, journalArticles } from "@/lib/content";

export function generateStaticParams() {
  return journalArticles.map((article) => ({ slug: article.slug }));
}

export function generateMetadata({ params }) {
  const article = getJournalArticleBySlug(params.slug);

  if (!article) {
    return {};
  }

  return {
    title: `${article.title} | NUKÖ`,
    description: article.excerpt
  };
}

export default function JournalArticlePage({ params }) {
  const article = getJournalArticleBySlug(params.slug);

  if (!article) {
    notFound();
  }

  const relatedArticles = journalArticles.filter((entry) => entry.slug !== article.slug).slice(0, 2);

  return (
    <>
      <section className="border-b border-outline bg-surface-muted" data-section-transition="curtain">
        <div className="page-shell grid gap-10 py-12 lg:grid-cols-[1.15fr_0.85fr] lg:py-16">
          <div className="overflow-hidden border border-outline bg-surface">
            <img
              alt={article.title}
              className="h-full w-full object-cover"
              data-media-reveal=""
              data-scrub-scale="1.14,1"
              data-scrub-y="-8,12"
              src={article.image}
            />
          </div>

          <div className="flex flex-col justify-center gap-8" data-hero-copy="">
            <div className="space-y-5">
              <p className="eyebrow" data-reveal-item="">
                <Link className="hover:text-on-surface" href="/journal">
                  Journal
                </Link>{" "}
                · {article.category}
              </p>
              <h1 className="page-title max-w-xl" data-reveal-item="">
                {article.title}
              </h1>
              <p className="max-w-xl text-lg leading-8 text-on-surface-muted" data-reveal-item="">
                {article.lede}
              </p>
            </div>

            <div className="grid gap-4 border border-outline bg-background p-6 sm:grid-cols-2" data-reveal-item="">
              <div>
                <p className="eyebrow mb-2">Lecture</p>
                <p className="text-sm leading-7 text-on-surface-muted">{article.readingTime}</p>
              </div>
              <div>
                <p className="eyebrow mb-2">Publication</p>
                <p className="text-sm leading-7 text-on-surface-muted">{article.publishedAt}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="page-shell page-section" data-section-transition="press-in">
        <div className="grid gap-12 lg:grid-cols-[0.95fr_0.95fr]">
          <article className="space-y-12">
            <blockquote
              className="border-l-2 border-secondary pl-5 font-headline text-2xl font-bold tracking-[-0.04em] text-on-surface"
              data-reveal=""
            >
              {article.quote}
            </blockquote>

            <div className="space-y-10" data-reveal-stagger="">
              {article.sections.map((section) => (
                <section key={section.heading} className="space-y-4" data-reveal-item="">
                  <h2 className="font-headline text-4xl font-bold tracking-[-0.05em]">
                    {section.heading}
                  </h2>
                  {section.paragraphs.map((paragraph) => (
                    <p key={paragraph} className="text-base leading-8 text-on-surface-muted">
                      {paragraph}
                    </p>
                  ))}
                  {section.bullets?.length ? (
                    <ul className="space-y-3 pt-2 text-sm leading-7 text-on-surface-muted">
                      {section.bullets.map((bullet) => (
                        <li key={bullet}>• {bullet}</li>
                      ))}
                    </ul>
                  ) : null}
                </section>
              ))}
            </div>
          </article>

          <aside className="space-y-8">
            <div className="surface-panel p-8" data-reveal="">
              <p className="eyebrow mb-4">Points cles</p>
              <ul className="space-y-3 text-sm leading-7 text-on-surface-muted">
                {article.takeaways.map((item) => (
                  <li key={item}>• {item}</li>
                ))}
              </ul>
            </div>

            <div className="surface-panel p-8" data-reveal="">
              <p className="eyebrow mb-4">Aller plus loin</p>
              <p className="text-sm leading-7 text-on-surface-muted">
                Vous avez un projet d'installation ou une question sur le choix du modele ? Notre
                atelier peut vous aider a verifier la compatibilite de votre espace.
              </p>
              <div className="mt-6 flex flex-wrap gap-4">
                <Link className="button-primary" href="/contact">
                  Contacter l'atelier
                </Link>
                <Link className="button-secondary" href="/boutique/nomad-01">
                  Voir le Nomad 01
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </section>

      <section className="border-t border-outline bg-surface-muted" data-section-transition="drift-left">
        <div className="page-shell page-section">
          <div className="mb-10 flex items-end justify-between gap-4">
            <div>
              <p className="eyebrow mb-4">A lire ensuite</p>
              <h2 className="font-headline text-4xl font-bold tracking-[-0.05em]">
                Deux autres articles du journal
              </h2>
            </div>
            <Link className="button-link" href="/journal">
              Retour au journal
            </Link>
          </div>

          <div className="grid gap-8 md:grid-cols-2" data-reveal-stagger="">
            {relatedArticles.map((entry) => (
              <Link
                key={entry.slug}
                className="block overflow-hidden border border-outline bg-background transition-transform duration-300 hover:-translate-y-1"
                data-reveal-item=""
                href={`/journal/${entry.slug}`}
              >
                <img
                  alt={entry.title}
                  className="h-72 w-full object-cover"
                  data-media-reveal=""
                  data-scrub-scale="1.12,1"
                  data-scrub-y="-6,10"
                  src={entry.image}
                />
                <div className="space-y-4 p-6">
                  <p className="eyebrow">
                    {entry.category} · {entry.readingTime}
                  </p>
                  <h3 className="font-headline text-3xl font-bold tracking-[-0.05em]">
                    {entry.title}
                  </h3>
                  <p className="text-sm leading-7 text-on-surface-muted">{entry.excerpt}</p>
                  <span className="button-link">Lire l'article</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
