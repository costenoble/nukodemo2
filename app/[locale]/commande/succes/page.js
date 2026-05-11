import { setRequestLocale } from "next-intl/server";

import { ClearCartOnSuccess } from "@/components/clear-cart-on-success";
import { TransitionLink as Link } from "@/components/page-transition";
import { formatPrice } from "@/lib/format";
import { retrieveCheckoutSession } from "@/lib/stripe";

export async function generateMetadata({ params }) {
  const { locale } = await params;
  return { title: locale === "en" ? "Order confirmed | NUKÖ" : "Commande confirmée | NUKÖ" };
}

export default async function SuccessPage({ params, searchParams }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const isEn = locale === "en";

  const sessionId = searchParams?.session_id;
  const session = sessionId ? await retrieveCheckoutSession(sessionId) : null;
  const customerName = session?.customer_details?.name;
  const totalAmount = session?.amount_total ?? 0;

  return (
    <div className="page-shell page-section">
      <ClearCartOnSuccess />
      <div className="surface-panel max-w-3xl p-10">
        <p className="eyebrow mb-4">{isEn ? "Order confirmed" : "Commande confirmée"}</p>
        <h1 className="page-title max-w-2xl">{isEn ? "Thank you for your order" : "Merci pour votre commande"}</h1>
        <p className="mt-6 max-w-2xl text-lg leading-8 text-on-surface-muted">
          {customerName
            ? (isEn ? `${customerName}, your payment has been confirmed.` : `${customerName}, votre paiement a été validé avec succès.`)
            : (isEn ? "Your payment has been confirmed." : "Votre paiement a été validé avec succès.")}
          {" "}
          {isEn
            ? "Your order is registered and a confirmation email will be sent to you."
            : "Votre commande est bien prise en compte et un e-mail de confirmation vous sera adressé."}
        </p>
        {totalAmount > 0 && (
          <div className="mt-10 border border-outline bg-surface-muted p-6">
            <p className="eyebrow mb-2">{isEn ? "Total" : "Total"}</p>
            <p className="font-headline text-3xl font-bold tracking-[-0.05em]">{formatPrice(totalAmount)}</p>
          </div>
        )}
        <div className="mt-8 flex flex-wrap gap-4">
          <Link className="button-primary" href="/particulier">
            {isEn ? "Back to shop" : "Retour à la boutique"}
          </Link>
          <Link className="button-secondary" href="/contact">
            {isEn ? "Contact the workshop" : "Contacter l'atelier"}
          </Link>
        </div>
      </div>
    </div>
  );
}
