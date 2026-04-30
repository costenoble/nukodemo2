import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";

import { AppShell } from "@/components/app-shell";
import { SiteFooter } from "@/components/site-footer";
import { routing } from "@/i18n/routing";

export const metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
  title: "NUKÖ | Poêles à bois compacts",
  description: "Poêles à bois compacts pour vans, tiny houses et refuges. Première série limitée — précommande ouverte, livraison juillet 2026.",
  openGraph: {
    title: "NUKÖ — Poêles à bois compacts",
    description: "Première série limitée de 100 appareils. Conçus pour les vans, tiny houses et refuges. Précommande ouverte.",
    url: "https://nuko.fr",
    siteName: "NUKÖ",
    images: [{ url: "/images/hearth-home.jpg", width: 1200, height: 630, alt: "NUKÖ — Poêle à bois compact" }],
    locale: "fr_FR",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "NUKÖ — Poêles à bois compacts",
    description: "Première série limitée. Vans, tiny houses, refuges.",
    images: ["/images/hearth-home.jpg"]
  }
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({ children, params }) {
  const { locale } = await params;
  if (!routing.locales.includes(locale)) notFound();

  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider messages={messages}>
          <AppShell>
            {children}
            <SiteFooter />
          </AppShell>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
