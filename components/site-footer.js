import { useTranslations } from "next-intl";

import { Link } from "@/i18n/navigation";
import { atelierDetails } from "@/lib/content";

const navItems = [
  { href: "/particulier", key: "stoves" },
  { href: "/fumisterie", key: "fumisterie" },
  { href: "/histoire", key: "story" },
  { href: "/journal", key: "journal" },
  { href: "/contact", key: "contact" }
];

export function SiteFooter() {
  const tn = useTranslations("nav");
  const tf = useTranslations("footer");

  return (
    <footer className="border-t border-outline bg-surface-muted">
      <div className="page-shell grid gap-12 py-16 md:grid-cols-[1.3fr_1fr_1fr]">
        <div className="space-y-5">
          <div className="font-headline text-3xl font-bold tracking-[-0.08em]">NUKÖ</div>
          <p className="max-w-md text-sm leading-7 text-on-surface-muted">{tf("tagline")}</p>
        </div>

        <div>
          <p className="eyebrow mb-4">{tf("navigation")}</p>
          <div className="space-y-3">
            {navItems.map((item) => (
              <Link key={item.href} className="block text-sm text-on-surface-muted hover:text-on-surface" href={item.href}>
                {tn(item.key)}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <p className="eyebrow mb-4">{tf("workshop")}</p>
          <div className="space-y-2 text-sm leading-7 text-on-surface-muted">
            {atelierDetails.address.map((line) => (<p key={line}>{line}</p>))}
            <p><a className="hover:text-on-surface" href={`mailto:${atelierDetails.email}`}>{atelierDetails.email}</a></p>
            <p>{atelierDetails.phone}</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
