import { setRequestLocale } from "next-intl/server";

import { DevisForm } from "@/components/devis-form";
import { SectionHeading } from "@/components/section-heading";

export async function generateMetadata({ params }) {
  const { locale } = await params;
  return { title: locale === "en" ? "Quote request | NUKÖ" : "Demande de devis | NUKÖ" };
}

export default async function DevisPage({ params }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <div className="page-shell page-section space-y-16">
      <SectionHeading
        eyebrow={locale === "en" ? "Free quote" : "Devis gratuit"}
        title={locale === "en" ? "Configure your project" : "Configurez votre projet"}
        description={locale === "en"
          ? "A few questions to clarify your needs. We'll get back to you within 48 hours with a proposal tailored to your space and use case."
          : "Quelques questions pour affiner votre besoin. Nous revenons vers vous sous 48 h avec une proposition adaptée à votre espace et votre usage."}
      />
      <DevisForm />
    </div>
  );
}
