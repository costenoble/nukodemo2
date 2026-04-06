import { formatDate, formatPrice } from "@/lib/format";

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function renderEmailLayout({ title, intro, content, footer }) {
  return `
    <div style="background:#f6f3ee;padding:32px 16px;font-family:Arial,sans-serif;color:#282821;">
      <div style="max-width:640px;margin:0 auto;background:#ffffff;border:1px solid #ded9cf;">
        <div style="padding:28px 32px;border-bottom:1px solid #e7e1d8;">
          <div style="font-size:12px;letter-spacing:0.24em;text-transform:uppercase;color:#7b705f;margin-bottom:12px;">NUKÖ</div>
          <h1 style="font-size:28px;line-height:1.1;margin:0 0 12px;">${escapeHtml(title)}</h1>
          <p style="font-size:16px;line-height:1.6;margin:0;color:#575243;">${escapeHtml(intro)}</p>
        </div>
        <div style="padding:32px;">${content}</div>
        <div style="padding:20px 32px;background:#f6f3ee;color:#6d675a;font-size:12px;line-height:1.6;">
          ${footer}
        </div>
      </div>
    </div>
  `;
}

function renderItems(items) {
  return items
    .map((item) => {
      const total = item.totalAmount ?? item.unitAmount * item.quantity;

      return `
        <tr>
          <td style="padding:12px 0;border-bottom:1px solid #ece7df;">
            <div style="font-weight:700;">${escapeHtml(item.name)}</div>
            <div style="font-size:13px;color:#6d675a;">Quantite: ${escapeHtml(item.quantity)}</div>
          </td>
          <td style="padding:12px 0;border-bottom:1px solid #ece7df;text-align:right;font-weight:700;">
            ${escapeHtml(formatPrice(total))}
          </td>
        </tr>
      `;
    })
    .join("");
}

export function formatAddressLines(address) {
  if (!address) {
    return [];
  }

  return [
    address.name,
    [address.line1, address.line2].filter(Boolean).join(" "),
    [address.postal_code, address.city].filter(Boolean).join(" "),
    address.state,
    address.country
  ].filter(Boolean);
}

export function buildCustomerOrderEmail({
  customerName,
  items,
  orderNumber,
  totalAmount,
  shopUrl
}) {
  return renderEmailLayout({
    title: "Merci pour votre commande",
    intro:
      "Votre paiement a bien ete confirme. Nous preparons maintenant votre commande et vous tiendrons informe de la suite.",
    content: `
      <p style="margin:0 0 24px;font-size:15px;line-height:1.7;">Bonjour ${escapeHtml(
        customerName || "et merci"
      )},</p>
      <p style="margin:0 0 24px;font-size:15px;line-height:1.7;">Numero de commande: <strong>${escapeHtml(
        orderNumber
      )}</strong></p>
      <table style="width:100%;border-collapse:collapse;margin-bottom:24px;">
        <tbody>${renderItems(items)}</tbody>
      </table>
      <p style="margin:0 0 8px;font-size:15px;line-height:1.7;"><strong>Total paye:</strong> ${escapeHtml(
        formatPrice(totalAmount)
      )}</p>
      <p style="margin:0 0 24px;font-size:15px;line-height:1.7;">Un e-mail de suivi vous sera envoye des que votre commande sera prete a partir.</p>
      <p style="margin:0;font-size:15px;line-height:1.7;">Boutique: <a href="${escapeHtml(
        shopUrl
      )}" style="color:#725b3f;">${escapeHtml(shopUrl)}</a></p>
    `,
    footer:
      "Si vous avez une question sur l'installation ou la livraison, repondez simplement a cet e-mail."
  });
}

export function buildSellerOrderEmail({
  customerEmail,
  customerName,
  items,
  orderNumber,
  orderPaidAt,
  phone,
  shippingAddress,
  totalAmount
}) {
  const addressLines = formatAddressLines(shippingAddress);

  return renderEmailLayout({
    title: "Une nouvelle commande a ete passee",
    intro: "Une commande a ete confirmee sur votre boutique. Les informations utiles sont ci-dessous.",
    content: `
      <p style="margin:0 0 16px;font-size:15px;line-height:1.7;"><strong>Commande:</strong> ${escapeHtml(
        orderNumber
      )}</p>
      <p style="margin:0 0 8px;font-size:15px;line-height:1.7;"><strong>Client:</strong> ${escapeHtml(
        customerName || "Non renseigne"
      )}</p>
      <p style="margin:0 0 8px;font-size:15px;line-height:1.7;"><strong>E-mail:</strong> ${escapeHtml(
        customerEmail || "Non renseigne"
      )}</p>
      <p style="margin:0 0 8px;font-size:15px;line-height:1.7;"><strong>Telephone:</strong> ${escapeHtml(
        phone || "Non renseigne"
      )}</p>
      <p style="margin:0 0 24px;font-size:15px;line-height:1.7;"><strong>Paiement confirme le:</strong> ${escapeHtml(
        formatDate(orderPaidAt)
      )}</p>
      <table style="width:100%;border-collapse:collapse;margin-bottom:24px;">
        <tbody>${renderItems(items)}</tbody>
      </table>
      <p style="margin:0 0 8px;font-size:15px;line-height:1.7;"><strong>Total:</strong> ${escapeHtml(
        formatPrice(totalAmount)
      )}</p>
      <div style="margin-top:24px;padding:16px;background:#f6f3ee;border:1px solid #ece7df;">
        <div style="font-size:12px;letter-spacing:0.12em;text-transform:uppercase;color:#6d675a;margin-bottom:8px;">Adresse de livraison</div>
        <div style="font-size:15px;line-height:1.7;">${addressLines
          .map((line) => escapeHtml(line))
          .join("<br />")}</div>
      </div>
    `,
    footer: "Cette notification a ete envoyee automatiquement depuis le webhook Stripe."
  });
}

export function buildCustomerContactAck({ name }) {
  return renderEmailLayout({
    title: "Message recu",
    intro: "Votre demande a bien ete recue. Nous revenons vers vous rapidement.",
    content: `
      <p style="margin:0;font-size:15px;line-height:1.7;">Bonjour ${escapeHtml(
        name || ""
      )}, votre message est en cours de traitement par l'atelier NUKÖ.</p>
    `,
    footer: "Merci pour votre interet."
  });
}

export function buildSellerContactEmail({ email, message, name, projectType }) {
  return renderEmailLayout({
    title: "Nouveau message de contact",
    intro: "Une nouvelle demande est arrivee via le formulaire du site.",
    content: `
      <p style="margin:0 0 8px;font-size:15px;line-height:1.7;"><strong>Nom:</strong> ${escapeHtml(
        name
      )}</p>
      <p style="margin:0 0 8px;font-size:15px;line-height:1.7;"><strong>E-mail:</strong> ${escapeHtml(
        email
      )}</p>
      <p style="margin:0 0 16px;font-size:15px;line-height:1.7;"><strong>Projet:</strong> ${escapeHtml(
        projectType
      )}</p>
      <div style="padding:16px;background:#f6f3ee;border:1px solid #ece7df;font-size:15px;line-height:1.7;">
        ${escapeHtml(message).replaceAll("\n", "<br />")}
      </div>
    `,
    footer: "Repondez directement a cet e-mail pour contacter le prospect."
  });
}
