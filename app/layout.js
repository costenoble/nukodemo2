import "@/app/globals.css";
import { AppShell } from "@/components/app-shell";
import { SiteFooter } from "@/components/site-footer";

export const metadata = {
  title: "NUKÖ | Poeles a bois compacts",
  description: "Poeles a bois compacts pour vans, tiny houses et petits refuges."
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body>
        <AppShell>
          {children}
          <SiteFooter />
        </AppShell>
      </body>
    </html>
  );
}
