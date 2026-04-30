import { setRequestLocale } from "next-intl/server";

import { Link } from "@/i18n/navigation";

export async function generateMetadata({ params }) {
  const { locale } = await params;
  return { title: locale === "en" ? "Payment cancelled | NUKÖ" : "Paiement annulé | NUKÖ" };
}

export default async function CancelPage({ params }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const isEn = locale === "en";

  return (
    <div className="page-shell page-section">
      <div className="surface-panel max-w-3xl p-10">
        <p className="eyebrow mb-4">{isEn ? "Payment cancelled" : "Paiement annulé"}</p>
        <h1 className="page-title max-w-2xl">
          {isEn ? "Your order was not completed" : "Votre commande n'a pas été finalisée"}
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-8 text-on-surface-muted">
          {isEn
            ? "No payment has been taken. You can return to your cart or browse the product again."
            : "Aucun débit n'a été effectué. Vous pouvez revenir au panier ou reprendre à partir de la fiche produit."}
        </p>
        <div className="mt-8 flex flex-wrap gap-4">
          <Link className="button-primary" href="/panier">
            {isEn ? "Back to cart" : "Revenir au panier"}
          </Link>
          <Link className="button-secondary" href="/produit/nomad-01">
            {isEn ? "View product" : "Revoir le produit"}
          </Link>
        </div>
      </div>
    </div>
  );
}
