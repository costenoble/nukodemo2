import { setRequestLocale, getTranslations } from "next-intl/server";

import { ProfessionnelForm } from "@/components/professionnel-form";
import { SectionHeading } from "@/components/section-heading";

export async function generateMetadata({ params }) {
  const { locale } = await params;
  return { title: locale === "en" ? "Professional | NUKÖ" : "Professionnel | NUKÖ" };
}

export default async function ProfessionnelPage({ params }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("professionnel");

  return (
    <>
      <section className="border-b border-outline bg-[#1d1c18] text-white">
        <div className="page-shell py-20 md:py-28">
          <p className="eyebrow mb-4 text-[#dcbf96]">{t("eyebrow")}</p>
          <h1 className="page-title max-w-3xl text-white">{t("heroTitle")}</h1>
          <p className="section-copy mt-6 max-w-xl text-white/70">{t("heroDesc")}</p>
        </div>
      </section>

      <section className="page-shell page-section">
        <div className="grid gap-14 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
          <div>
            <SectionHeading eyebrow={t("eyebrow")} title={t("heroTitle")} />
            <div className="mt-10">
              <ProfessionnelForm />
            </div>
          </div>

          <aside className="space-y-6 lg:sticky lg:top-28">
            <div className="surface-panel p-8">
              <p className="eyebrow mb-4">{locale === "en" ? "Tiered pricing" : "Tarifs dégressifs"}</p>
              <div className="space-y-4">
                {[
                  { tier: "Silver", discount: "-15%", range: locale === "en" ? "1–4 units" : "1–4 unités" },
                  { tier: "Gold", discount: "-22%", range: locale === "en" ? "5–14 units" : "5–14 unités" },
                  { tier: "Platinum", discount: "-30%", range: locale === "en" ? "15+ units" : "15+ unités" }
                ].map((row) => (
                  <div key={row.tier} className="flex items-center justify-between border-b border-outline pb-4 last:border-0 last:pb-0">
                    <div>
                      <p className="font-medium">{row.tier}</p>
                      <p className="text-xs text-on-surface-muted">{row.range}</p>
                    </div>
                    <span className="font-headline text-2xl font-bold tracking-[-0.04em] text-secondary">{row.discount}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="border border-outline bg-surface-muted p-6">
              <p className="eyebrow mb-3">{locale === "en" ? "Direct contact" : "Contact direct"}</p>
              <p className="text-sm leading-7 text-on-surface-muted">
                {locale === "en"
                  ? "For larger volumes or partnership discussions, write to us directly."
                  : "Pour des volumes importants ou des discussions de partenariat, écrivez-nous directement."}
              </p>
              <a
                className="button-primary mt-4 inline-flex"
                href="mailto:pro@nuko.example"
              >
                pro@nuko.example
              </a>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
