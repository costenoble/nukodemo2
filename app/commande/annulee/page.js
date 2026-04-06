import Link from "next/link";

export const metadata = {
  title: "Paiement annule | NUKÖ"
};

export default function CancelPage() {
  return (
    <div className="page-shell page-section">
      <div className="surface-panel max-w-3xl p-10">
        <p className="eyebrow mb-4">Paiement annule</p>
        <h1 className="page-title max-w-2xl">Votre commande n'a pas ete finalisee</h1>
        <p className="mt-6 max-w-2xl text-lg leading-8 text-on-surface-muted">
          Aucun debit n'a ete effectue. Vous pouvez revenir au panier ou reprendre a partir de la
          fiche produit.
        </p>

        <div className="mt-8 flex flex-wrap gap-4">
          <Link className="button-primary" href="/panier">
            Revenir au panier
          </Link>
          <Link className="button-secondary" href="/boutique/nomad-01">
            Revoir le produit
          </Link>
        </div>
      </div>
    </div>
  );
}
