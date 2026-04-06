import Link from "next/link";

import { SectionHeading } from "@/components/section-heading";
import { journalArticles } from "@/lib/content";

export const metadata = {
  title: "Journal | NUKÖ"
};

export default function JournalPage() {
  const [featuredArticle, ...otherArticles] = journalArticles;

  return (
    <div className="page-shell page-section space-y-16">
      <SectionHeading
        eyebrow="Journal"
        title="Chroniques de chaleur compacte"
        description="Conseils d'installation, usages, matieres et inspirations autour du feu compact."
      />

      <Link
        className="block overflow-hidden border border-outline bg-surface-muted transition-transform duration-300 hover:-translate-y-1"
        href={`/journal/${featuredArticle.slug}`}
      >
        <section>
          <div className="grid gap-0 lg:grid-cols-[1.2fr_0.8fr]">
            <img
              alt={featuredArticle.title}
              className="h-full min-h-[420px] w-full object-cover"
              data-media-reveal=""
              data-scrub-scale="1.14,1"
              data-scrub-y="-8,12"
              src={featuredArticle.image}
            />
            <div className="flex flex-col justify-center space-y-6 p-8 md:p-10" data-reveal-stagger="">
              <p className="eyebrow" data-reveal-item="">
                {featuredArticle.category} · {featuredArticle.readingTime}
              </p>
              <h2 className="font-headline text-5xl font-bold tracking-[-0.06em]" data-reveal-item="">
                {featuredArticle.title}
              </h2>
              <p className="text-sm leading-8 text-on-surface-muted" data-reveal-item="">
                {featuredArticle.excerpt}
              </p>
              <span className="button-link" data-reveal-item="">
                Lire l'article
              </span>
            </div>
          </div>
        </section>
      </Link>

      <section className="grid gap-8 md:grid-cols-2 lg:grid-cols-3" data-reveal-stagger="">
        {otherArticles.map((article) => (
          <Link
            key={article.slug}
            className="block overflow-hidden border border-outline bg-surface transition-transform duration-300 hover:-translate-y-1"
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
      </section>
    </div>
  );
}
