import {
  buildCustomerOrderEmail,
  buildSellerOrderEmail
} from "@/lib/email-templates";
import { isMailerConfigured, sendEmail } from "@/lib/mailer";
import { getStripe } from "@/lib/stripe";

export const dynamic = "force-dynamic";

export async function POST(request) {
  const signature = request.headers.get("stripe-signature");
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!signature || !webhookSecret) {
    return Response.json({ error: "Webhook Stripe non configure." }, { status: 400 });
  }

  const stripe = getStripe();
  const body = await request.text();

  let event;

  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (error) {
    return Response.json({ error: `Signature invalide: ${error.message}` }, { status: 400 });
  }

  if (event.type !== "checkout.session.completed") {
    return Response.json({ received: true });
  }

  const session = event.data.object;

  if (session.payment_status !== "paid") {
    return Response.json({ received: true, ignored: true });
  }

  if (!isMailerConfigured()) {
    return Response.json({
      received: true,
      warning: "Paiement confirme, mais SMTP non configure. Aucun e-mail envoye."
    });
  }

  const lineItems = await stripe.checkout.sessions.listLineItems(session.id, { limit: 20 });

  const items = lineItems.data.map((item) => ({
    name: item.description || "Produit",
    quantity: item.quantity || 1,
    unitAmount:
      item.quantity && item.amount_total ? Math.round(item.amount_total / item.quantity) : item.amount_total || 0,
    totalAmount: item.amount_total || 0
  }));

  const customerName = session.customer_details?.name || session.shipping_details?.name || "Client";
  const customerEmail = session.customer_details?.email;
  const phone = session.customer_details?.phone || "";
  const sellerEmail = process.env.SHOP_NOTIFICATION_EMAIL;
  const shopUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const totalAmount = session.amount_total || 0;
  const orderNumber = session.metadata?.orderNumber || session.id;
  const orderPaidAt = session.created ? session.created * 1000 : Date.now();
  const shippingAddress =
    session.shipping_details?.address || session.customer_details?.address || null;

  const tasks = [];

  if (customerEmail) {
    tasks.push(
      sendEmail({
        to: customerEmail,
        subject: `Merci pour votre commande ${orderNumber}`,
        html: buildCustomerOrderEmail({
          customerName,
          items,
          orderNumber,
          totalAmount,
          shopUrl
        }),
        text: `Merci pour votre commande ${orderNumber}. Total: ${totalAmount / 100} EUR.`
      })
    );
  }

  if (sellerEmail) {
    tasks.push(
      sendEmail({
        to: sellerEmail,
        subject: `Nouvelle commande ${orderNumber}`,
        html: buildSellerOrderEmail({
          customerEmail,
          customerName,
          items,
          orderNumber,
          orderPaidAt,
          phone,
          shippingAddress,
          totalAmount
        }),
        text: `Commande ${orderNumber} confirmee pour ${customerName}.`,
        replyTo: customerEmail || undefined
      })
    );
  }

  await Promise.all(tasks);

  return Response.json({ received: true });
}
