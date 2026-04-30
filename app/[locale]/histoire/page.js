import { setRequestLocale, getTranslations } from "next-intl/server";

import { SectionHeading } from "@/components/section-heading";
import { Link } from "@/i18n/navigation";
import { historyPillars } from "@/lib/content";

export async function generateMetadata({ params }) {
  const { locale } = await params;
  return {
    title: locale === "en" ? "Our story | NUKÖ" : "Notre histoire | NUKÖ",
    description: locale === "en"
      ? "The NUKÖ workshop, its philosophy and the genesis of a compact stove born from a real need."
      : "L'atelier NUKÖ, sa philosophie et la genèse d'un poêle compact né d'un besoin réel."
  };
}

export default async function HistoirePage({ params }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("histoire");
  const tc = await getTranslations("common");

  return (
    <>
      <section className="relative overflow-hidden border-b border-outline bg-[#1d1c18] text-white">
        <img alt="Atelier NUKÖ" className="absolute inset-0 h-full w-full object-cover opacity-30" src="/images/hearth-home.jpg" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#1d1c18]/90 to-transparent" />
        <div className="page-shell relative py-24 md:py-36">
          <p className="eyebrow mb-5 text-[#dcbf96]">{t("eyebrow")}</p>
          <h1 className="page-title max-w-3xl text-white">
            {t("heroTitle").split("\n").map((line, i) => (<span key={i}>{i > 0 && <br />}{line}</span>))}
          </h1>
          <p className="mt-8 max-w-xl text-lg leading-8 text-white/70">{t("heroDesc")}</p>
        </div>
      </section>

      <section className="page-shell page-section grid gap-14 lg:grid-cols-2 lg:items-center">
        <div className="space-y-6">
          <p className="eyebrow">{t("originEyebrow")}</p>
          <h2 className="section-title">{t("originTitle")}</h2>
          <div className="space-y-5 text-base leading-8 text-on-surface-muted">
            <p>
              {locale === "en"
                ? "It starts with a Sprinter van, a Breton winter, and a problem with no good solution on the market. Existing stoves for mobile homes were either too heavy, too poorly documented, or impossible to integrate neatly in a constrained volume."
                : "Au départ, il y a un van Sprinter aménagé, un hiver breton, et un problème qui n'avait pas de bonne solution sur le marché. Les poêles existants pour les habitats mobiles étaient soit trop lourds, soit trop peu documentés, soit impossibles à intégrer proprement dans un volume contraint."}
            </p>
            <p>
              {locale === "en"
                ? "Rather than making do, we started designing differently. The brief was brutally simple: compact, inert, safe, and installable without a professional. Two years of prototypes, real-world testing and iterations later, the Nomad 01 was ready."
                : "Plutôt que de faire avec, on a commencé à dessiner autrement. Le cahier des charges était brutal de simplicité : compact, inerte, sûr, et installable sans faire appel à un professionnel. Deux ans de prototypes, de tests en conditions réelles et d'itérations plus tard, le Nomad 01 était prêt."}
            </p>
            <p>
              {locale === "en"
                ? "The name NUKÖ comes from the Norwegian nukke — a form of soft, enveloping warmth, the kind associated with a wood fire in a space you've chosen to make livable."
                : "Le nom NUKÖ vient du norvégien nukke — une forme de chaleur douce et enveloppante, celle qu'on associe à un feu de bois dans un espace qu'on a choisi de rendre habitable."}
            </p>
          </div>
        </div>
        <div className="overflow-hidden border border-outline bg-surface">
          <img alt="Premier prototype NUKÖ en atelier" className="h-[520px] w-full object-cover" src="/images/nomad-hero.jpg" />
        </div>
      </section>

      <section className="border-y border-outline bg-surface-muted">
        <div className="page-shell page-section">
          <SectionHeading eyebrow={t("philosophyEyebrow")} title={t("philosophyTitle")} description={t("philosophyDesc")} />
          <div className="mt-12 grid gap-px overflow-hidden border border-outline bg-outline md:grid-cols-3">
            {historyPillars.map((pillar) => (
              <div key={pillar.title} className="bg-background p-8">
                <h3 className="font-headline text-3xl font-bold tracking-[-0.05em]">{pillar.title}</h3>
                <p className="mt-4 text-sm leading-7 text-on-surface-muted">{pillar.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="page-shell page-section grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <div className="overflow-hidden border border-outline bg-surface">
          <img alt="Assemblage à l'atelier NUKÖ, Lorient" className="h-[500px] w-full object-cover" src="/images/nomad-detail.jpg" />
        </div>
        <div className="space-y-6">
          <p className="eyebrow">{t("workshopEyebrow")}</p>
          <h2 className="section-title">{t("workshopTitle")}</h2>
          <div className="space-y-5 text-base leading-8 text-on-surface-muted">
            <p>{t("workshopDesc1")}</p>
            <p>{t("workshopDesc2")}</p>
          </div>
          <div className="grid grid-cols-2 gap-px overflow-hidden border border-outline bg-outline">
            {[
              { value: "Lorient", key: "statWorkshop" },
              { value: "100 %", key: "statManual" },
              { value: locale === "en" ? "Batch" : "Série", key: "statProduction" },
              { value: "0", key: "statStock" }
            ].map((s) => (
              <div key={s.key} className="bg-surface-muted p-5">
                <p className="font-headline text-2xl font-bold tracking-[-0.04em]">{s.value}</p>
                <p className="mt-1 text-xs text-on-surface-muted">{t(s.key)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-outline bg-[#1d1c18] text-white">
        <div className="page-shell page-section">
          <SectionHeading eyebrow={t("testimonialsEyebrow")} title={t("testimonialsTitle")} description={t("testimonialsDesc")} />
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {[
              {
                quote: locale === "en"
                  ? "The Nomad 01 has been running in my Sprinter for two winters. Not a single bad surprise. Installation takes an afternoon if you've read the manual."
                  : "Ça fait deux hivers que le Nomad 01 tourne dans mon Sprinter. Je n'ai pas eu une seule mauvaise surprise. L'installation prend une après-midi si on a lu la notice.",
                author: "Thomas R.",
                role: locale === "en" ? "Van builder, Lyon" : "Aménageur van, Lyon"
              },
              {
                quote: locale === "en"
                  ? "I compared four other models. None had this level of documentation rigour. The installation guide convinced me before I even lit the stove."
                  : "J'ai comparé avec quatre autres modèles du marché. Aucun n'avait cette rigueur de documentation. Le guide d'installation m'a convaincu avant même d'allumer le poêle.",
                author: "Marine L.",
                role: locale === "en" ? "Tiny house, Finistère" : "Tiny house, Finistère"
              },
              {
                quote: locale === "en"
                  ? "For clients who want a real fire — not a radiator — it's the only option I recommend. The size / power / safety ratio is unbeatable in this segment."
                  : "Pour mes clients qui veulent un vrai feu — pas un radiateur — c'est la seule option que je propose. Le rapport taille / puissance / sécurité est imbattable sur ce segment.",
                author: "Alexandre D.",
                role: locale === "en" ? "Professional van builder, Paris" : "Aménageur professionnel, Paris"
              }
            ].map(({ quote, author, role }) => (
              <figure key={author} className="flex flex-col justify-between border border-white/15 bg-white/5 p-8">
                <blockquote className="text-sm leading-7 text-white/80">"{quote}"</blockquote>
                <figcaption className="mt-6 border-t border-white/15 pt-5">
                  <p className="font-headline text-lg font-bold tracking-[-0.03em]">{author}</p>
                  <p className="mt-1 text-xs text-white/50">{role}</p>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section className="page-shell page-section text-center">
        <p className="eyebrow mb-4">{t("ctaEyebrow")}</p>
        <h2 className="section-title mx-auto max-w-2xl">{t("ctaTitle")}</h2>
        <p className="section-copy mx-auto mt-4 max-w-lg text-center">{t("ctaDesc")}</p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Link className="button-primary" href="/precommande">{tc("preorder")}</Link>
          <Link className="button-secondary" href="/particulier">{t("ctaCollection")}</Link>
        </div>
      </section>
    </>
  );
}
