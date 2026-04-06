import Link from "next/link";

export default function NotFound() {
  return (
    <div className="page-shell page-section">
      <div className="surface-panel max-w-3xl p-10">
        <p className="eyebrow mb-4">Introuvable</p>
        <h1 className="page-title max-w-2xl">Cette page n'existe pas</h1>
        <p className="mt-6 max-w-2xl text-lg leading-8 text-on-surface-muted">
          Revenez a la boutique ou ouvrez directement la fiche du Nomad 01.
        </p>
        <div className="mt-8 flex flex-wrap gap-4">
          <Link className="button-primary" href="/boutique">
            Aller a la boutique
          </Link>
          <Link className="button-secondary" href="/boutique/nomad-01">
            Voir le produit
          </Link>
        </div>
      </div>
    </div>
  );
}
