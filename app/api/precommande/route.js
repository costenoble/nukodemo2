import { isMailerConfigured, sendEmail } from "@/lib/mailer";
import { formatPrice } from "@/lib/format";
import { getProductById } from "@/lib/products";
import { getClientIp, rateLimit } from "@/lib/rate-limit";

function generateOrderRef() {
  const ts = Date.now().toString(36).toUpperCase();
  const rand = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `NUKO-${ts}-${rand}`;
}

function getBankDetails() {
  return {
    beneficiary: process.env.BANK_BENEFICIARY || "NUKÖ SAS",
    iban: process.env.BANK_IBAN || "FR76 XXXX XXXX XXXX XXXX XXXX XXX",
    bic: process.env.BANK_BIC || "XXXXXXXXX"
  };
}

function buildCustomerPreorderEmail({ firstName, lastName, product, quantity, totalPrice, orderRef, bank }) {
  const name = `${firstName} ${lastName}`;
  return `
    <div style="background:#f6f3ee;padding:32px 16px;font-family:Arial,sans-serif;color:#282821;">
      <div style="max-width:640px;margin:0 auto;background:#ffffff;border:1px solid #ded9cf;">
        <div style="padding:28px 32px;border-bottom:1px solid #e7e1d8;">
          <div style="font-size:12px;letter-spacing:0.24em;text-transform:uppercase;color:#7b705f;margin-bottom:12px;">NUKÖ</div>
          <h1 style="font-size:28px;line-height:1.1;margin:0 0 12px;">Votre réservation est confirmée</h1>
          <p style="font-size:16px;line-height:1.6;margin:0;color:#575243;">
            Bonjour ${name}, votre place dans la première série NUKÖ est bien réservée.
          </p>
        </div>
        <div style="padding:32px;">
          <p style="margin:0 0 20px;font-size:15px;line-height:1.7;">
            <strong>Référence de commande :</strong> ${orderRef}
          </p>

          <table style="width:100%;border-collapse:collapse;margin-bottom:24px;">
            <tr>
              <td style="padding:12px 0;border-bottom:1px solid #ece7df;">
                <strong>${product.name}</strong><br/>
                <span style="font-size:13px;color:#6d675a;">Quantité : ${quantity} — Prix de lancement</span>
              </td>
              <td style="padding:12px 0;border-bottom:1px solid #ece7df;text-align:right;font-weight:700;">
                ${formatPrice(totalPrice)}
              </td>
            </tr>
            <tr>
              <td style="padding:12px 0;font-size:13px;color:#6d675a;">Livraison</td>
              <td style="padding:12px 0;text-align:right;font-size:13px;color:#6d675a;">Offerte en France & UE</td>
            </tr>
          </table>

          <p style="margin:0 0 8px;font-size:15px;line-height:1.7;color:#6b6060;">
            ${product.shippingLabel ?? "Livraison offerte en France & UE"}
          </p>

          <div style="margin:28px 0;padding:20px;background:#1d1c18;color:#ffffff;">
            <div style="font-size:11px;letter-spacing:0.2em;text-transform:uppercase;color:#dcbf96;margin-bottom:14px;">
              Instructions de paiement — Virement bancaire
            </div>
            <table style="font-size:14px;line-height:1.8;width:100%;">
              <tr>
                <td style="color:rgba(255,255,255,0.6);padding-right:16px;">Bénéficiaire</td>
                <td style="font-weight:700;">${bank.beneficiary}</td>
              </tr>
              <tr>
                <td style="color:rgba(255,255,255,0.6);padding-right:16px;">IBAN</td>
                <td style="font-weight:700;letter-spacing:0.05em;">${bank.iban}</td>
              </tr>
              <tr>
                <td style="color:rgba(255,255,255,0.6);padding-right:16px;">BIC</td>
                <td style="font-weight:700;">${bank.bic}</td>
              </tr>
              <tr>
                <td style="color:rgba(255,255,255,0.6);padding-right:16px;">Référence</td>
                <td style="font-weight:700;color:#dcbf96;">${orderRef}</td>
              </tr>
              <tr>
                <td style="color:rgba(255,255,255,0.6);padding-right:16px;">Montant</td>
                <td style="font-weight:700;">${formatPrice(totalPrice)}</td>
              </tr>
            </table>
            <p style="margin:14px 0 0;font-size:12px;color:rgba(255,255,255,0.5);">
              Merci d'indiquer la référence <strong style="color:#dcbf96;">${orderRef}</strong> dans le libellé de votre virement.
              Votre réservation est maintenue 7 jours à compter de cet email.
            </p>
          </div>

          <p style="margin:0;font-size:14px;line-height:1.7;color:#6d675a;">
            Des questions ? Répondez directement à cet email ou écrivez-nous à
            <a href="mailto:${process.env.CONTACT_RECEIVER_EMAIL || process.env.SHOP_NOTIFICATION_EMAIL || ''}" style="color:#7b5d3f;">${process.env.CONTACT_RECEIVER_EMAIL || process.env.SHOP_NOTIFICATION_EMAIL || 'notre équipe'}</a>.
          </p>
        </div>
        <div style="padding:20px 32px;background:#f6f3ee;color:#6d675a;font-size:12px;line-height:1.6;">
          NUKÖ — Poêles à bois compacts. Cet email contient des informations confidentielles.
          Ne partagez pas vos coordonnées de paiement.
        </div>
      </div>
    </div>
  `;
}

function buildSellerPreorderEmail({ firstName, lastName, email, phone, product, quantity, totalPrice, orderRef, address, city, postalCode, country, message }) {
  return `
    <div style="background:#f6f3ee;padding:32px 16px;font-family:Arial,sans-serif;color:#282821;">
      <div style="max-width:640px;margin:0 auto;background:#ffffff;border:1px solid #ded9cf;">
        <div style="padding:28px 32px;border-bottom:1px solid #e7e1d8;">
          <div style="font-size:12px;letter-spacing:0.24em;text-transform:uppercase;color:#7b705f;margin-bottom:12px;">NUKÖ — Nouvelle précommande</div>
          <h1 style="font-size:24px;margin:0;">${orderRef}</h1>
        </div>
        <div style="padding:32px;font-size:15px;line-height:1.8;">
          <p><strong>Produit :</strong> ${product.name} × ${quantity}</p>
          <p><strong>Total :</strong> ${formatPrice(totalPrice)}</p>
          <p><strong>Client :</strong> ${firstName} ${lastName}</p>
          <p><strong>Email :</strong> <a href="mailto:${email}">${email}</a></p>
          ${phone ? `<p><strong>Téléphone :</strong> ${phone}</p>` : ""}
          <p><strong>Livraison :</strong> ${address}, ${postalCode} ${city}, ${country}</p>
          ${message ? `<p><strong>Message :</strong> ${message}</p>` : ""}
        </div>
      </div>
    </div>
  `;
}

export async function POST(request) {
  const { success } = rateLimit(getClientIp(request), { limit: 3, windowMs: 60_000 });
  if (!success) {
    return Response.json({ error: "Trop de requêtes. Veuillez patienter." }, { status: 429 });
  }

  try {
    const body = await request.json();
    const { productId, quantity, firstName, lastName, email, phone, address, city, postalCode, country, message } = body;

    if (!productId || !firstName || !lastName || !email || !address || !city || !postalCode || !country) {
      return Response.json({ error: "Tous les champs obligatoires doivent être remplis." }, { status: 400 });
    }

    const product = getProductById(productId);
    if (!product) {
      return Response.json({ error: "Produit introuvable." }, { status: 400 });
    }

    const qty = Math.max(1, Math.floor(Number(quantity) || 1));
    const totalPrice = product.price * qty;
    const orderRef = generateOrderRef();
    const bank = getBankDetails();

    if (isMailerConfigured()) {
      await Promise.all([
        sendEmail({
          to: email,
          subject: `Précommande NUKÖ confirmée — ${orderRef}`,
          html: buildCustomerPreorderEmail({ firstName, lastName, product, quantity: qty, totalPrice, orderRef, bank }),
          replyTo: process.env.CONTACT_RECEIVER_EMAIL
        }),
        sendEmail({
          to: process.env.CONTACT_RECEIVER_EMAIL || process.env.SMTP_FROM,
          subject: `[NUKÖ] Nouvelle précommande — ${orderRef}`,
          html: buildSellerPreorderEmail({ firstName, lastName, email, phone, product, quantity: qty, totalPrice, orderRef, address, city, postalCode, country, message })
        })
      ]);
    }

    return Response.json({
      ok: true,
      orderRef,
      message: `Votre réservation ${orderRef} est enregistrée. Vérifiez votre boîte email pour les instructions de paiement.`
    });
  } catch (error) {
    console.error("[precommande]", error);
    return Response.json({ error: "Erreur serveur. Veuillez réessayer." }, { status: 500 });
  }
}
