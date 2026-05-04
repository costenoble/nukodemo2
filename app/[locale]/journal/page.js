import { setRequestLocale } from "next-intl/server";

import { SectionHeading } from "@/components/section-heading";
import { Link } from "@/i18n/navigation";
import { journalArticles } from "@/lib/content";

export async function generateMetadata({ params }) {
  const { locale } = await params;
  return { title: locale === "en" ? "Journal | NUKÖ" : "Journal | NUKÖ" };
}

export default async function JournalPage({ params }) {
  const { locale } = await params;
  setRequestLocale(locale);

  const [featuredArticle, ...otherArticles] = journalArticles;
  const readLabel = locale === "en" ? "Read article" : "Lire l'article";

  return (
    <>
      <section className="border-b border-outline bg-surface-muted">
        <div className="page-shell py-20 md:py-28">
          <p className="eyebrow mb-4">Journal</p>
          <h1 className="page-title max-w-4xl">
            {locale === "en" ? "Chronicles of compact warmth" : "Chroniques de chaleur compacte"}
          </h1>
          <p className="section-copy mt-6">
            {locale === "en"
              ? "Installation advice, uses, materials and inspiration around the compact fire."
              : "Conseils d'installation, usages, matières et inspirations autour du feu compact."}
          </p>
        </div>
      </section>

    <div className="page-shell page-section space-y-16">

      <Link
        className="block overflow-hidden border border-outline bg-surface-muted transition-transform duration-300 hover:-translate-y-1"
        href={`/journal/${featuredArticle.slug}`}
      >
        <section>
          <div className="grid gap-0 lg:grid-cols-[1.2fr_0.8fr]">
            <img alt={featuredArticle.title} className="h-full min-h-[420px] w-full object-cover" src={featuredArticle.image} />
            <div className="flex flex-col justify-center space-y-6 p-8 md:p-10">
              <p className="eyebrow">{featuredArticle.category} · {featuredArticle.readingTime}</p>
              <h2 className="font-headline text-5xl font-bold tracking-[-0.06em]">{featuredArticle.title}</h2>
              <p className="text-sm leading-8 text-on-surface-muted">{featuredArticle.excerpt}</p>
              <span className="button-link">{readLabel}</span>
            </div>
          </div>
        </section>
      </Link>

      <section className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {otherArticles.map((article) => (
          <Link
            key={article.slug}
            className="block overflow-hidden border border-outline bg-surface transition-transform duration-300 hover:-translate-y-1"
            href={`/journal/${article.slug}`}
          >
            <img alt={article.title} className="h-72 w-full object-cover" src={article.image} />
            <div className="space-y-4 p-6">
              <p className="eyebrow">{article.category} · {article.readingTime}</p>
              <h3 className="font-headline text-3xl font-bold tracking-[-0.05em]">{article.title}</h3>
              <p className="text-sm leading-7 text-on-surface-muted">{article.excerpt}</p>
              <span className="button-link">{readLabel}</span>
            </div>
          </Link>
        ))}
      </section>
    </div>
    </>
  );
}
