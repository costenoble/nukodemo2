import { setRequestLocale, getTranslations } from "next-intl/server";

import { ContactForm } from "@/components/contact-form";
import { SectionHeading } from "@/components/section-heading";
import { atelierDetails, contactFaqs, extendedFaqs } from "@/lib/content";

export async function generateMetadata({ params }) {
  const { locale } = await params;
  return { title: locale === "en" ? "Contact | NUKÖ" : "Contact | NUKÖ" };
}

export default async function ContactPage({ params }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("contact");

  return (
    <div className="page-shell page-section space-y-16">
      <SectionHeading eyebrow={t("eyebrow")} title={t("title")} description={t("desc")} />

      <div className="grid gap-10 lg:grid-cols-[1fr_0.9fr]">
        <section className="surface-panel p-8 md:p-10">
          <ContactForm />
        </section>

        <aside className="space-y-8">
          <div className="surface-panel p-8">
            <p className="eyebrow mb-4">{t("workshopEyebrow")}</p>
            <h2 className="font-headline text-4xl font-bold tracking-[-0.05em]">{atelierDetails.city}</h2>
            <div className="mt-6 space-y-2 text-sm leading-7 text-on-surface-muted">
              {atelierDetails.address.map((line) => (<p key={line}>{line}</p>))}
              <p><a className="hover:text-on-surface" href={`mailto:${atelierDetails.email}`}>{atelierDetails.email}</a></p>
              <p>{atelierDetails.phone}</p>
            </div>
          </div>

          <div className="surface-panel p-8">
            <p className="eyebrow mb-4">{t("faqEyebrow")}</p>
            <div className="space-y-6">
              {contactFaqs.map((item) => (
                <div key={item.question}>
                  <h3 className="font-headline text-2xl font-bold tracking-[-0.04em]">{item.question}</h3>
                  <p className="mt-3 text-sm leading-7 text-on-surface-muted">{item.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </aside>
      </div>

      <section>
        <SectionHeading eyebrow={t("extendedEyebrow")} title={t("extendedTitle")} description={t("extendedDesc")} />
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {extendedFaqs.map((item) => (
            <div key={item.question} className="surface-panel p-8">
              <h3 className="font-headline text-3xl font-bold tracking-[-0.05em]">{item.question}</h3>
              <p className="mt-4 text-sm leading-7 text-on-surface-muted">{item.answer}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
