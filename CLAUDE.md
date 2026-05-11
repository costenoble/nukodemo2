# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev          # Start dev server (localhost:3000)
npm run dev:reset    # Clear .next cache and start dev server
npm run build        # Production build
npm run start        # Start production server
npm run clean        # Remove .next build artifacts
```

No test runner or linter is configured.

## Architecture Overview

**NUKÖ** is a Next.js 14 App Router e-commerce storefront for premium wood stoves. It uses JavaScript (not TypeScript), Tailwind CSS, and next-intl for FR/EN internationalization.

### Routing

All pages live under `app/[locale]/` — the locale segment wraps the entire site. French (`fr`) is the default locale and is omitted from URLs by default (configured in `middleware.js` and `i18n/routing.js`). Pages call `setRequestLocale(locale)` at the top before any async work.

### Data & Content

There is **no database or CMS**. All content is hard-coded in `/lib/`:

- `lib/products.js` — product definitions, pricing, configuration options
- `lib/fumisterie.js` — chimney accessories catalog
- `lib/content.js` — navigation, homepage copy, history/journal articles
- `lib/pro-pricing.js` — professional pricing tiers

To add or edit products/content, edit these files directly.

### Cart & State

Cart state lives in `localStorage` (`"hearth-cart"` key) and is managed via React Context. The `CartProvider` component (`components/cart-provider.js`) exposes a `useCart()` hook. Pages wait for `hasHydrated` before rendering cart-dependent UI to avoid SSR mismatches.

### E-Commerce Flow

```
Product page → Add to cart (localStorage) →
Cart page → POST /api/checkout (creates Stripe session) →
Stripe hosted checkout → /commande/succes or /commande/annulee →
Stripe webhook (POST /api/stripe/webhook) → email notifications
```

Stripe is the single source of truth for orders — no order data is stored locally.

### Email

Nodemailer sends SMTP email. Templates are HTML strings built in `lib/email-templates.js`. The webhook handler at `app/api/stripe/webhook/` triggers emails on successful payment. Contact/pre-order forms have their own API routes that also send emails.

### Professional Portal

Password-gated area at `/pro`. Authentication uses a single shared `PRO_ACCESS_CODE` env variable, with a cookie-based session managed in `lib/pro-session.js`.

### Styling

Tailwind with a custom design system defined in `tailwind.config.js` and CSS variables in `app/globals.css`. Key colors: `--primary` (black `#0a0a0a`), `--secondary` (dark green `#006400`), `--surface` (off-white `#f5f5f3`). Fonts: **Barlow/Barlow Condensed** for headlines, **Manrope** for body text.

Shared layout utility classes: `.page-shell` (max-width container), `.page-section` (vertical padding), `.section-title`, `.eyebrow`, `.button-primary`, `.button-secondary`.

Animations use GSAP (complex sequences) and Locomotive Scroll (scroll effects), both initialized in `components/motion-provider.js`.

## Environment Variables

```
NEXT_PUBLIC_SITE_URL=
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
SHOP_NOTIFICATION_EMAIL=
SMTP_HOST=
SMTP_PORT=
SMTP_USER=
SMTP_PASSWORD=
SMTP_FROM=
SMTP_SECURE=           # "true" for port 465, else omit
CONTACT_RECEIVER_EMAIL= # defaults to SHOP_NOTIFICATION_EMAIL
PRO_ACCESS_CODE=
BANK_BENEFICIARY=
BANK_IBAN=
BANK_BIC=
```

See `.env.example` for the full list.
