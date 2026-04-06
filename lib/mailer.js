import nodemailer from "nodemailer";

function getMailerConfig() {
  return {
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT || 587),
    secure: process.env.SMTP_SECURE === "true" || process.env.SMTP_PORT === "465",
    user: process.env.SMTP_USER,
    password: process.env.SMTP_PASSWORD,
    from: process.env.SMTP_FROM
  };
}

export function isMailerConfigured() {
  const config = getMailerConfig();

  return Boolean(config.host && config.port && config.from);
}

function createTransport() {
  const config = getMailerConfig();

  if (!isMailerConfigured()) {
    throw new Error("SMTP settings are incomplete.");
  }

  return nodemailer.createTransport({
    host: config.host,
    port: config.port,
    secure: config.secure,
    auth:
      config.user && config.password
        ? {
            user: config.user,
            pass: config.password
          }
        : undefined
  });
}

export async function sendEmail({ to, subject, html, text, replyTo }) {
  const transport = createTransport();
  const { from } = getMailerConfig();

  return transport.sendMail({
    from,
    to,
    subject,
    html,
    text,
    replyTo
  });
}
