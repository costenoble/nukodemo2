# HEARTH Storefront

Migration des vues HTML statiques vers une application `Next.js` avec:

- pages marketing et produit
- panier persistant en `localStorage`
- redirection vers Stripe Checkout
- webhook Stripe pour les e-mails de confirmation
- formulaire de contact branche a une route backend Next.js

## Installation

```bash
npm install
cp .env.example .env.local
npm run dev
```

## Variables d'environnement

Renseigner au minimum:

- `NEXT_PUBLIC_SITE_URL`
- `STRIPE_SECRET_KEY`
- `STRIPE_WEBHOOK_SECRET`
- `SHOP_NOTIFICATION_EMAIL`
- `SMTP_HOST`
- `SMTP_PORT`
- `SMTP_USER`
- `SMTP_PASSWORD`
- `SMTP_FROM`

`CONTACT_RECEIVER_EMAIL` est optionnelle. Si elle est vide, le formulaire de contact enverra les messages a `SHOP_NOTIFICATION_EMAIL`.

## Stripe

Le bouton de paiement du panier appelle `POST /api/checkout`, puis redirige vers `session.url`.

Pour tester le webhook en local:

```bash
stripe listen --forward-to localhost:3000/api/stripe/webhook
```

Puis copier le secret retourne par Stripe CLI dans `STRIPE_WEBHOOK_SECRET`.

## E-mails

Les e-mails sont envoyes via SMTP:

- client: "Merci pour votre commande"
- vendeur: "Une nouvelle commande a ete passee"
- contact: accuse de reception + notification interne

Le traitement se fait dans:

- `app/api/stripe/webhook/route.js`
- `app/api/contact/route.js`

## Deploiement

Le projet est adapte a un deploiement simple sur Vercel ou toute autre plateforme compatible Node.js:

1. pousser le projet
2. configurer les variables d'environnement
3. configurer l'endpoint webhook Stripe:
   `https://votre-domaine/api/stripe/webhook`

## Notes

- Les fichiers HTML d'origine ont ete conserves a la racine comme reference visuelle.
- Le catalogue contient un seul produit reel pour l'instant: `Nomad 01`.
- Aucun stockage de commande en base n'a ete ajoute dans cette iteration. Stripe sert de source de verite pour le paiement, et l'e-mail est declenche via le webhook.
