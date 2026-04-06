import Stripe from "stripe";

let stripeClient;

export function getStripe() {
  const secretKey = process.env.STRIPE_SECRET_KEY;

  if (!secretKey) {
    throw new Error("STRIPE_SECRET_KEY is not configured.");
  }

  if (!stripeClient) {
    stripeClient = new Stripe(secretKey, {
      appInfo: {
        name: "NUKÖ Storefront",
        version: "1.0.0"
      }
    });
  }

  return stripeClient;
}

export function getBaseUrl(request) {
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    return process.env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, "");
  }

  const origin = request?.headers.get("origin");

  if (origin) {
    return origin;
  }

  const host = request?.headers.get("host");

  if (!host) {
    return "http://localhost:3000";
  }

  const protocol =
    request?.headers.get("x-forwarded-proto") ?? (host.includes("localhost") ? "http" : "https");

  return `${protocol}://${host}`;
}

export async function retrieveCheckoutSession(sessionId) {
  if (!sessionId || !process.env.STRIPE_SECRET_KEY) {
    return null;
  }

  try {
    return await getStripe().checkout.sessions.retrieve(sessionId);
  } catch {
    return null;
  }
}
