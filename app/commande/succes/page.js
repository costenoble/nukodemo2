import Link from "next/link";

import { ClearCartOnSuccess } from "@/components/clear-cart-on-success";
import { formatPrice } from "@/lib/format";
import { retrieveCheckoutSession } from "@/lib/stripe";

export const metadata = {
  title: "Commande confirmee | NUKÖ"
};

export default async function SuccessPage({ searchParams }) {
  const sessionId = searchParams?.session_id;
  const session = sessionId ? await retrieveCheckoutSession(sessionId) : null;
  const customerName = session?.customer_details?.name;
  const customerEmail = session?.customer_details?.email;
  const orderNumber = session?.metadata?.orderNumber;
  const totalAmount = session?.amount_total ?? 0;

  return (
    <div className="page-shell page-section">
      <ClearCartOnSuccess />

      <div className="surface-panel max-w-3xl p-10">
        <p className="eyebrow mb-4">Commande confirmee</p>
        <h1 className="page-title max-w-2xl">Merci pour votre commande</h1>
        <p className="mt-6 max-w-2xl text-lg leading-8 text-on-surface-muted">
          {customerName
            ? `${customerName}, votre paiement a ete valide avec succes.`
            : "Votre paiement a ete valide avec succes."}{" "}
          Votre commande est bien prise en compte et un e-mail de confirmation vous sera adresse
          avec le recapitulatif.
        </p>

        <div className="mt-10 grid gap-6 border border-outline bg-surface-muted p-6 md:grid-cols-2">
          <div>
            <p className="eyebrow mb-2">Numero</p>
            <p className="text-sm leading-7 text-on-surface-muted">{orderNumber || "En cours"}</p>
          </div>
          <div>
            <p className="eyebrow mb-2">Total</p>
            <p className="text-sm leading-7 text-on-surface-muted">{formatPrice(totalAmount)}</p>
          </div>
          <div className="md:col-span-2">
            <p className="eyebrow mb-2">E-mail client</p>
            <p className="text-sm leading-7 text-on-surface-muted">
              {customerEmail || "Adresse en cours de confirmation."}
            </p>
          </div>
        </div>

        <div className="mt-8 flex flex-wrap gap-4">
          <Link className="button-primary" href="/boutique">
            Retour a la boutique
          </Link>
          <Link className="button-secondary" href="/contact">
            Contacter l'atelier
          </Link>
        </div>
      </div>
    </div>
  );
}
