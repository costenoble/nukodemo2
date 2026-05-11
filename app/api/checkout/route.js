import { getProductById } from "@/lib/products";
import { getFumiProductById } from "@/lib/fumisterie";
import { getClientIp, rateLimit } from "@/lib/rate-limit";
import { getBaseUrl, getStripe } from "@/lib/stripe";

const allowedCountries = ["FR", "BE", "CH", "DE", "ES", "IT", "LU", "NL", "PT"];

function generateOrderNumber() {
  return `HRTH-${crypto.randomUUID().slice(0, 8).toUpperCase()}`;
}

export async function POST(request) {
  const { success } = rateLimit(getClientIp(request), { limit: 5, windowMs: 60_000 });
  if (!success) {
    return Response.json({ error: "Trop de requêtes. Veuillez patienter." }, { status: 429 });
  }

  try {
    const payload = await request.json();
    const items = Array.isArray(payload?.items) ? payload.items : [];

    const validatedItems = items
      .map((item) => {
        const product = getProductById(item?.productId) ?? getFumiProductById(item?.productId);
        const parsedQuantity = Number(item?.quantity);
        const quantity =
          Number.isFinite(parsedQuantity) && parsedQuantity > 0
            ? Math.floor(parsedQuantity)
            : 1;

        if (!product) {
          return null;
        }

        return {
          product,
          quantity,
          unitPrice: product.price,
          configLabel: typeof item?.configLabel === "string" ? item.configLabel : null
        };
      })
      .filter(Boolean);

    if (!validatedItems.length) {
      return Response.json({ error: "Votre panier est vide." }, { status: 400 });
    }

    const stripe = getStripe();
    const baseUrl = getBaseUrl(request);
    const orderNumber = generateOrderNumber();

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      locale: "fr",
      submit_type: "pay",
      customer_creation: "always",
      billing_address_collection: "required",
      shipping_address_collection: {
        allowed_countries: allowedCountries
      },
      shipping_options: [
        {
          shipping_rate_data: {
            type: "fixed_amount",
            fixed_amount: {
              amount: 0,
              currency: "eur"
            },
            display_name: "Livraison standard offerte",
            delivery_estimate: {
              minimum: {
                unit: "business_day",
                value: 5
              },
              maximum: {
                unit: "business_day",
                value: 7
              }
            }
          }
        }
      ],
      phone_number_collection: {
        enabled: true
      },
      invoice_creation: {
        enabled: true
      },
      success_url: `${baseUrl}/commande/succes?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/commande/annulee`,
      metadata: {
        orderNumber,
        cartSummary: validatedItems
          .map((item) => {
            const label = item.configLabel ? ` (${item.configLabel})` : "";
            return `${item.product.name}${label} x${item.quantity}`;
          })
          .join(" | ")
      },
      line_items: validatedItems.map(({ product, quantity, unitPrice, configLabel }) => {
        const rawImage = product.heroImage ?? product.image ?? "";
        const productImage = rawImage.startsWith("http") ? rawImage : `${baseUrl}${rawImage}`;

        return {
          quantity,
          price_data: {
            currency: "eur",
            unit_amount: unitPrice,
            product_data: {
              name: configLabel ? `${product.name} — ${configLabel}` : product.name,
              description: product.subtitle ?? product.description,
              ...(productImage && { images: [productImage] }),
              metadata: {
                productId: product.id
              }
            }
          }
        };
      })
    });

    return Response.json({ url: session.url });
  } catch (error) {
    return Response.json(
      { error: error.message || "Impossible de creer la session de paiement." },
      { status: 500 }
    );
  }
}
