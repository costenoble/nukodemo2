import { buildCustomerContactAck, buildSellerContactEmail } from "@/lib/email-templates";
import { isMailerConfigured, sendEmail } from "@/lib/mailer";
import { getClientIp, rateLimit } from "@/lib/rate-limit";

export async function POST(request) {
  const { success } = rateLimit(getClientIp(request), { limit: 3, windowMs: 60_000 });
  if (!success) {
    return Response.json({ error: "Trop de requêtes. Veuillez patienter." }, { status: 429 });
  }

  try {
    const payload = await request.json();
    const name = String(payload?.name || "").trim();
    const email = String(payload?.email || "").trim();
    const projectType = String(payload?.projectType || payload?.subject || "").trim();
    const message = String(payload?.message || "").trim();

    if (!name || !email || !message) {
      return Response.json({ error: "Tous les champs obligatoires doivent etre renseignes." }, { status: 400 });
    }

    if (!isMailerConfigured()) {
      return Response.json(
        { error: "SMTP non configure. Le formulaire ne peut pas envoyer d'e-mail." },
        { status: 500 }
      );
    }

    const receiver = process.env.CONTACT_RECEIVER_EMAIL || process.env.SHOP_NOTIFICATION_EMAIL;

    if (!receiver) {
      return Response.json(
        { error: "Aucune adresse de reception n'est configuree pour le formulaire." },
        { status: 500 }
      );
    }

    await Promise.all([
      sendEmail({
        to: receiver,
        subject: `Nouveau contact site - ${name}`,
        html: buildSellerContactEmail({ email, message, name, projectType }),
        text: `${name} (${email}) - ${projectType}\n\n${message}`,
        replyTo: email
      }),
      sendEmail({
        to: email,
        subject: "Votre message a bien ete recu",
        html: buildCustomerContactAck({ name }),
        text: "Votre message a bien ete recu par l'atelier NUKÖ."
      })
    ]);

    return Response.json({
      message: "Votre message a bien ete envoye. Un accuse de reception vient d'etre envoye."
    });
  } catch (error) {
    return Response.json(
      { error: error.message || "Impossible d'envoyer votre message." },
      { status: 500 }
    );
  }
}
