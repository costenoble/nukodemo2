import Link from "next/link";

import { atelierDetails, navigation } from "@/lib/content";

export function SiteFooter() {
  return (
    <footer className="border-t border-outline bg-surface-muted">
      <div className="page-shell grid gap-12 py-16 md:grid-cols-[1.3fr_1fr_1fr]">
        <div className="space-y-5">
          <div className="font-headline text-3xl font-bold tracking-[-0.08em]">NUKÖ</div>
          <p className="max-w-md text-sm leading-7 text-on-surface-muted">
            Poeles a bois compacts pour les habitats mobiles, tiny houses et refuges de petite
            surface. Concu pour durer, pense pour habiter le froid.
          </p>
        </div>

        <div>
          <p className="eyebrow mb-4">Navigation</p>
          <div className="space-y-3">
            {navigation.map((item) => (
              <Link key={item.href} className="block text-sm text-on-surface-muted hover:text-on-surface" href={item.href}>
                {item.label}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <p className="eyebrow mb-4">Atelier</p>
          <div className="space-y-2 text-sm leading-7 text-on-surface-muted">
            <p>{atelierDetails.address[0]}</p>
            <p>{atelierDetails.address[1]}</p>
            <p>{atelierDetails.address[2]}</p>
            <p>
              <a className="hover:text-on-surface" href={`mailto:${atelierDetails.email}`}>
                {atelierDetails.email}
              </a>
            </p>
            <p>{atelierDetails.phone}</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
