import { SectionHeading } from "@/components/section-heading";
import { historyPillars } from "@/lib/content";

export const metadata = {
  title: "Notre histoire | NUKÖ"
};

export default function HistoirePage() {
  return (
    <>
      <section
        className="relative overflow-hidden border-b border-outline bg-surface-muted"
        data-section-transition="curtain"
      >
        <img
          alt="Origines NUKÖ"
          className="absolute inset-0 h-full w-full object-cover opacity-30"
          data-media-reveal=""
          data-scrub-scale="1.16,1"
          data-scrub-y="-10,12"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuB6R4pDVxiY3gQN5ECxQGn03xw7Q-WAwy2_KhUcAGvYVFipuwh13f8OwJ3QQ6At4cJHOW4gWSpTUhudkEWlv9HrwJqaz7oMr8eoqT8UiGSd3pbrQLA4cldH8IZ733kiJkmGZZvGoFTN6AKp8J4BN159A9TsE5ORSIjSw4kezQYGtv9P6iw46nvBC-g8XvWXOJD8s5vcA36daIW-y-RmmK-3oO3EdtgK2g0AwApspRI2XN3yDkiuxCO0tKxuwEHe5iRU3zrkcCvmtj8"
        />
        <div className="page-shell relative py-20 md:py-28" data-hero-copy="">
          <p className="eyebrow mb-5" data-reveal-item="">
            Notre histoire
          </p>
          <h1 className="page-title max-w-4xl" data-reveal-item="">
            Forge par l'aventure
          </h1>
          <p className="mt-8 max-w-2xl text-lg leading-8 text-on-surface-muted" data-reveal-item="">
            A l'origine, le besoin etait simple: obtenir une vraie chaleur dans un van sans perdre
            la moitie du volume habitable. Le projet de marque nait de cette contrainte reelle.
          </p>
        </div>
      </section>

      <section
        className="page-shell page-section grid gap-10 lg:grid-cols-[0.95fr_1.05fr]"
        data-section-transition="drift-right"
      >
        <div className="space-y-6">
          <SectionHeading
            eyebrow="Origine"
            title="Deux ingenieurs, quatre roues et un hiver trop long"
            description="Une aventure nee sur la route, entre froid sec, usage reel et recherche d'une chaleur juste."
          />
          <div className="space-y-5 text-sm leading-8 text-on-surface-muted" data-reveal-stagger="">
            <p data-reveal-item="">
              En 2018, le constat est brutal: les poeles existants pour les petits espaces sont soit
              trop lourds, soit peu rassurants, soit impossibles a integrer proprement dans un
              amenagement mobile.
            </p>
            <p data-reveal-item="">
              Plutot que de contourner le probleme, NUKÖ s'est construit autour d'un cahier des
              charges tres concret: compacite, inertie, securite et installation documentee.
            </p>
          </div>
        </div>

        <div className="overflow-hidden border border-outline bg-surface">
          <img
            alt="Atelier NUKÖ"
            className="h-full w-full object-cover"
            data-media-reveal=""
            data-scrub-scale="1.12,1"
            data-scrub-y="-6,10"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAFH1MuHFAtGyL5SiFkVxCH_xrEbeJH7N-XbeXnk4iX4DHTZdIiqame8n-V9ijF2yBxEqi9b6Xt51QUia4j6ZS7-Fk1c3ozNfrkEMya06LjXkRp_eH_Orgz2qxRa2WeSe7qZcj6to9kVJmToaJiLrh-hiTBf96vTaJALVVCLQI6fjpgHJ8K2eNlfLOsYT4Za1ZaML5iHgxMkjSmF3ZoVp0-ROs8TOUGa50QYQ8Y4tyifzhsMtuwmtWWW98U4ZIDQL0HVicS-fgqVms"
          />
        </div>
      </section>

      <section className="border-y border-outline bg-surface-muted">
        <div className="page-shell page-section" data-section-transition="press-in">
          <SectionHeading
            eyebrow="Piliers"
            title="Les fondamentaux de la marque"
            description="Les titres secondaires sont standardises pour mieux respirer d'une page a l'autre."
          />

          <div className="mt-12 grid gap-px overflow-hidden border border-outline bg-outline md:grid-cols-3" data-reveal-stagger="">
            {historyPillars.map((pillar) => (
              <div key={pillar.title} className="bg-background p-8" data-float-panel="" data-reveal-item="">
                <h3 className="font-headline text-3xl font-bold tracking-[-0.05em]">{pillar.title}</h3>
                <p className="mt-4 text-sm leading-7 text-on-surface-muted">{pillar.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="page-shell page-section" data-section-transition="drift-left">
        <div className="grid gap-8 lg:grid-cols-2">
          <div className="overflow-hidden border border-outline">
            <img
              alt="Tests en conditions reelles"
              className="h-[420px] w-full object-cover"
              data-media-reveal=""
              data-scrub-scale="1.14,1"
              data-scrub-y="-8,12"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBEZnEqBsWG9UOMy6bkAEmIcGc9JwgdviIJ3c07EgTZwLzxjzXZ7tBqTznuHzgRkiN3lHXlz6QW9cIBKkq7BE7wh686mkkh5ebeg781_oS5KRbBSp5_cb_STqPb9qSSl8XWPCqQiOdpEoAnwciYh65fNB535Bi4p202rj1RRAu0nQP_wbk7v3vXAVPetm3VvijHesTcFdhZmeaIG7YW9t84m7tx2iC8Wxu-MaQ80wL5HrHyX2hYfP1X2sZyLLj8WvFYh5jDGDHg3Og"
            />
          </div>
          <div className="border border-outline bg-surface-muted p-8" data-float-panel="" data-reveal="">
            <p className="eyebrow mb-4">Methode</p>
            <h2 className="font-headline text-4xl font-bold tracking-[-0.05em]">
              Designer pour l'usage reel, pas pour la photo
            </h2>
            <p className="mt-6 text-sm leading-8 text-on-surface-muted">
              Chaque modele est dessine, assemble et eprouve avec une seule idee: offrir une
              chaleur fiable dans les lieux ou chaque centimetre compte.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
