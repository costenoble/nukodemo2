import { Suspense } from "react";
import { setRequestLocale, getTranslations } from "next-intl/server";

import { PrecommandeForm } from "@/components/precommande-form";
import { PreorderGauge } from "@/components/preorder-gauge";
import { SectionHeading } from "@/components/section-heading";
import { Link } from "@/i18n/navigation";
import { getPreorderCount, PREORDER_TOTAL } from "@/lib/preorder-count";

export async function generateMetadata({ params }) {
  const { locale } = await params;
  return { title: locale === "en" ? "Pre-order | NUKÖ" : "Précommande | NUKÖ" };
}

export default async function PrecommandePage({ params }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("precommande");
  const reserved = getPreorderCount();

  const faqs = locale === "en"
    ? [
        { q: "What happens if the target is not reached?", a: "If the minimum volume is not reached, your pre-order is cancelled and you are fully refunded. No payment will be taken without a confirmed launch." },
        { q: "How long do I have to make the transfer?", a: "You have 7 days after receiving the confirmation email. After this, the reservation is released. Contact us if you need more time." },
        { q: "Is the launch price guaranteed?", a: "Yes. The price at the time of your pre-order is guaranteed until delivery, regardless of any future price changes." },
        { q: "Can I modify or cancel a pre-order?", a: "Yes, before the official launch of production. Write to us with your order reference and we'll process your request within 48 hours." },
        { q: "Is shipping really free?", a: "Yes, for all pre-orders in mainland France and the European Union. Delivery with full tracking from the workshop." },
        { q: "Can I pre-order multiple different models?", a: "Yes. Fill in one form per product line, or contact us to group your order under a single reference." }
      ]
    : [
        { q: "Que se passe-t-il si l'objectif n'est pas atteint ?", a: "Si le volume minimum n'est pas atteint, votre précommande est annulée et vous êtes intégralement remboursé. Aucun prélèvement ne sera effectué sans confirmation de lancement." },
        { q: "Dans quel délai dois-je effectuer le virement ?", a: "Vous disposez de 7 jours après réception de l'email de confirmation. Passé ce délai, la réservation est libérée. Écrivez-nous si vous avez besoin d'un délai supplémentaire." },
        { q: "Le prix de lancement est-il définitif ?", a: "Oui. Le prix au moment de votre précommande est garanti jusqu'à la livraison, quelle que soit l'évolution du tarif public après clôture de la série." },
        { q: "Peut-on modifier ou annuler une précommande ?", a: "Oui, avant le lancement officiel de la production. Écrivez-nous avec votre référence de commande, nous traitons votre demande sous 48 h." },
        { q: "La livraison est-elle vraiment offerte ?", a: "Oui, pour toute précommande en France métropolitaine et dans l'Union européenne. Livraison assurée avec suivi complet depuis l'atelier." },
        { q: "Peut-on précommander plusieurs modèles différents ?", a: "Oui. Remplissez un formulaire par ligne de produit, ou contactez-nous pour grouper votre commande sous une seule référence." }
      ];

  return (
    <>
      <section className="border-b border-outline bg-[#1d1c18] text-white">
        <div className="page-shell pt-32 pb-16 md:pt-40 md:pb-24">
          <p className="mb-4 text-[11px] font-bold uppercase tracking-[0.28em] text-[#dcbf96]">
            {t("eyebrow")}
          </p>
          <h1 className="font-headline text-5xl font-bold uppercase leading-[0.9] tracking-[-0.07em] md:text-7xl">
            {t("heroTitle").split("\n").map((line, i) => (<span key={i}>{i > 0 && <br />}{line}</span>))}
          </h1>
          <p className="mt-6 max-w-xl text-base leading-8 text-white/70">{t("heroDesc")}</p>
          <div className="mt-6 grid gap-4 text-sm text-white/60 md:flex md:gap-8">
            <span>✓ {t("trustVirement")}</span>
            <span>✓ {t("trustIban")}</span>
            <span>✓ {t("trustShipping")}</span>
            <span>✓ {t("trustDelay")}</span>
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            <div className="flex items-center gap-2 border border-white/20 px-4 py-2 text-xs text-white/70">
              <span className="font-bold text-[#dcbf96]">Qonto</span>
              <span>{locale === "en" ? "Online payment" : "Paiement en ligne"}</span>
            </div>
            <div className="flex items-center gap-2 border border-white/20 px-4 py-2 text-xs text-white/70">
              <span className="font-bold text-white">IBAN</span>
              <span>{locale === "en" ? "Bank transfer" : "Virement bancaire"}</span>
            </div>
          </div>
        </div>
      </section>

      <section className="page-shell page-section">
        <div className="grid gap-14 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
          <div>
            <SectionHeading eyebrow={t("formEyebrow")} title={t("formTitle")} />
            <div className="mt-10">
              <Suspense fallback={<div className="h-64 animate-pulse bg-surface-muted" />}>
                <PrecommandeForm />
              </Suspense>
            </div>
          </div>

          <aside className="space-y-6 lg:sticky lg:top-28">
            <div className="surface-panel p-8">
              <p className="eyebrow mb-4">{t("howItWorksEyebrow")}</p>
              <div className="space-y-5">
                {[
                  { step: "01", title: t("step1Title"), desc: t("step1Desc") },
                  { step: "02", title: t("step2Title"), desc: t("step2Desc") },
                  { step: "03", title: t("step3Title"), desc: t("step3Desc") },
                  { step: "04", title: t("step4Title"), desc: t("step4Desc") }
                ].map((item) => (
                  <div key={item.step} className="flex gap-4">
                    <span className="font-headline text-2xl font-bold tracking-[-0.04em] text-secondary opacity-60">{item.step}</span>
                    <div>
                      <p className="font-medium">{item.title}</p>
                      <p className="mt-1 text-sm leading-6 text-on-surface-muted">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <PreorderGauge reserved={reserved} total={PREORDER_TOTAL} />

            <div className="border border-outline bg-surface-muted p-6">
              <p className="eyebrow mb-3">{t("securityEyebrow")}</p>
              <p className="text-sm leading-7 text-on-surface-muted">{t("securityText")}</p>
            </div>

            <div className="border border-outline bg-surface-muted p-6">
              <p className="eyebrow mb-3">{t("questionEyebrow")}</p>
              <p className="text-sm leading-7 text-on-surface-muted">
                {t("questionText", { email: "" })}
                <a className="text-secondary underline" href="mailto:bonjour@nuko.example">
                  bonjour@nuko.example
                </a>
              </p>
              <Link className="button-secondary mt-4 inline-flex" href="/contact">{t("questionCta")}</Link>
            </div>
          </aside>
        </div>
      </section>

      <section className="border-t border-outline bg-surface-muted">
        <div className="page-shell page-section">
          <SectionHeading eyebrow={t("faqEyebrow")} title={t("faqTitle")} />
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {faqs.map(({ q, a }) => (
              <div key={q} className="border border-outline bg-background p-7">
                <h3 className="font-headline text-xl font-bold tracking-[-0.04em]">{q}</h3>
                <p className="mt-3 text-sm leading-7 text-on-surface-muted">{a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
