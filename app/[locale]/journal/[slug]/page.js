import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";

import { TransitionLink as Link } from "@/components/page-transition";
import { getJournalArticleBySlug, journalArticles } from "@/lib/content";

export async function generateStaticParams() {
  return journalArticles.flatMap((article) =>
    ["fr", "en"].map((locale) => ({ locale, slug: article.slug }))
  );
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const article = getJournalArticleBySlug(slug);
  if (!article) return {};
  return { title: `${article.title} | NUKÖ`, description: article.excerpt };
}

export default async function JournalArticlePage({ params }) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const article = getJournalArticleBySlug(slug);
  if (!article) notFound();

  const relatedArticles = journalArticles.filter((e) => e.slug !== article.slug).slice(0, 2);
  const contactLabel = locale === "en" ? "Contact the workshop" : "Contacter l'atelier";
  const keyPointsLabel = locale === "en" ? "Key points" : "Points clés";
  const goFurtherLabel = locale === "en" ? "Go further" : "Aller plus loin";
  const readNextLabel = locale === "en" ? "Read next" : "À lire ensuite";
  const twoMoreLabel = locale === "en" ? "Two more articles" : "Deux autres articles du journal";
  const backLabel = locale === "en" ? "Back to journal" : "Retour au journal";
  const readLabel = locale === "en" ? "Read article" : "Lire l'article";

  return (
    <>
      <section className="border-b border-outline bg-surface-muted">
        <div className="page-shell grid gap-10 py-12 lg:grid-cols-[1.15fr_0.85fr] lg:py-16">
          <div className="overflow-hidden border border-outline bg-surface">
            <img alt={article.title} className="h-full w-full object-cover" src={article.image} />
          </div>
          <div className="flex flex-col justify-center gap-8">
            <div className="space-y-5">
              <p className="eyebrow">
                <Link className="hover:text-on-surface" href="/journal">Journal</Link> · {article.category}
              </p>
              <h1 className="page-title max-w-xl">{article.title}</h1>
              <p className="max-w-xl text-lg leading-8 text-on-surface-muted">{article.lede}</p>
            </div>
            <div className="grid gap-4 border border-outline bg-background p-6 sm:grid-cols-2">
              <div>
                <p className="eyebrow mb-2">{locale === "en" ? "Reading" : "Lecture"}</p>
                <p className="text-sm leading-7 text-on-surface-muted">{article.readingTime}</p>
              </div>
              <div>
                <p className="eyebrow mb-2">{locale === "en" ? "Published" : "Publication"}</p>
                <p className="text-sm leading-7 text-on-surface-muted">{article.publishedAt}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="page-shell page-section">
        <div className="grid gap-12 lg:grid-cols-[0.95fr_0.95fr]">
          <article className="space-y-12">
            <blockquote className="border-l-2 border-secondary pl-5 font-headline text-2xl font-bold tracking-[-0.04em] text-on-surface">
              {article.quote}
            </blockquote>
            <div className="space-y-10">
              {article.sections.map((section) => (
                <section key={section.heading} className="space-y-4">
                  <h2 className="font-headline text-4xl font-bold tracking-[-0.05em]">{section.heading}</h2>
                  {section.paragraphs.map((paragraph) => (
                    <p key={paragraph} className="text-base leading-8 text-on-surface-muted">{paragraph}</p>
                  ))}
                  {section.bullets?.length ? (
                    <ul className="space-y-3 pt-2 text-sm leading-7 text-on-surface-muted">
                      {section.bullets.map((bullet) => (<li key={bullet}>• {bullet}</li>))}
                    </ul>
                  ) : null}
                </section>
              ))}
            </div>
          </article>

          <aside className="space-y-8">
            <div className="surface-panel p-8">
              <p className="eyebrow mb-4">{keyPointsLabel}</p>
              <ul className="space-y-3 text-sm leading-7 text-on-surface-muted">
                {article.takeaways.map((item) => (<li key={item}>• {item}</li>))}
              </ul>
            </div>
            <div className="surface-panel p-8">
              <p className="eyebrow mb-4">{goFurtherLabel}</p>
              <p className="text-sm leading-7 text-on-surface-muted">
                {locale === "en"
                  ? "Got an installation project or a question about model choice? Our workshop can help verify your space compatibility."
                  : "Vous avez un projet d'installation ou une question sur le choix du modèle ? Notre atelier peut vous aider à vérifier la compatibilité de votre espace."}
              </p>
              <div className="mt-6 flex flex-wrap gap-4">
                <Link className="button-primary" href="/contact">{contactLabel}</Link>
                <Link className="button-secondary" href="/produit/nomad-01">Nomad 01</Link>
              </div>
            </div>
          </aside>
        </div>
      </section>

      <section className="border-t border-outline bg-surface-muted">
        <div className="page-shell page-section">
          <div className="mb-10 flex items-end justify-between gap-4">
            <div>
              <p className="eyebrow mb-4">{readNextLabel}</p>
              <h2 className="font-headline text-4xl font-bold tracking-[-0.05em]">{twoMoreLabel}</h2>
            </div>
            <Link className="button-link" href="/journal">{backLabel}</Link>
          </div>
          <div className="grid gap-8 md:grid-cols-2">
            {relatedArticles.map((entry) => (
              <Link
                key={entry.slug}
                className="block overflow-hidden border border-outline bg-background transition-transform duration-300 hover:-translate-y-1"
                href={`/journal/${entry.slug}`}
              >
                <img alt={entry.title} className="h-72 w-full object-cover" src={entry.image} />
                <div className="space-y-4 p-6">
                  <p className="eyebrow">{entry.category} · {entry.readingTime}</p>
                  <h3 className="font-headline text-3xl font-bold tracking-[-0.05em]">{entry.title}</h3>
                  <p className="text-sm leading-7 text-on-surface-muted">{entry.excerpt}</p>
                  <span className="button-link">{readLabel}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
