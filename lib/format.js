export function formatPrice(amount, currency = "EUR") {
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency
  }).format((amount ?? 0) / 100);
}

export function formatDate(value) {
  if (!value) {
    return "";
  }

  return new Intl.DateTimeFormat("fr-FR", {
    dateStyle: "long",
    timeStyle: "short"
  }).format(new Date(value));
}
