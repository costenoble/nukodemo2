import { ContactForm } from "@/components/contact-form";
import { SectionHeading } from "@/components/section-heading";
import { atelierDetails, contactFaqs, extendedFaqs } from "@/lib/content";

export const metadata = {
  title: "Contact | NUKÖ"
};

export default function ContactPage() {
  return (
    <div className="page-shell page-section space-y-16">
      <SectionHeading
        eyebrow="Contact"
        title="Parler d'un projet, d'une commande ou d'une installation"
        description="Nous repondons aux questions de commande, d'installation et de compatibilite projet."
      />

      <div className="grid gap-10 lg:grid-cols-[1fr_0.9fr]">
        <section className="surface-panel p-8 md:p-10" data-reveal="" data-section-transition="curtain">
          <ContactForm />
        </section>

        <aside className="space-y-8" data-reveal-stagger="" data-section-transition="drift-left">
          <div className="surface-panel p-8" data-float-panel="" data-reveal-item="">
            <p className="eyebrow mb-4">Atelier</p>
            <h2 className="font-headline text-4xl font-bold tracking-[-0.05em]">{atelierDetails.city}</h2>
            <div className="mt-6 space-y-2 text-sm leading-7 text-on-surface-muted">
              {atelierDetails.address.map((line) => (
                <p key={line}>{line}</p>
              ))}
              <p>
                <a className="hover:text-on-surface" href={`mailto:${atelierDetails.email}`}>
                  {atelierDetails.email}
                </a>
              </p>
              <p>{atelierDetails.phone}</p>
            </div>
          </div>

          <div className="surface-panel p-8" data-float-panel="" data-reveal-item="">
            <p className="eyebrow mb-4">Questions frequentes</p>
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

      <section data-section-transition="press-in">
        <SectionHeading
          eyebrow="Questions pratiques"
          title="Livraison, entretien et garantie"
          description="Les reponses les plus utiles avant une commande, une installation ou une premiere saison de chauffe."
        />

        <div className="mt-12 grid gap-6 md:grid-cols-2" data-reveal-stagger="">
          {extendedFaqs.map((item) => (
            <div key={item.question} className="surface-panel p-8" data-float-panel="" data-reveal-item="">
              <h3 className="font-headline text-3xl font-bold tracking-[-0.05em]">{item.question}</h3>
              <p className="mt-4 text-sm leading-7 text-on-surface-muted">{item.answer}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
