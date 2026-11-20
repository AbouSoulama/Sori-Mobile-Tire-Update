# SORI Mobile Tire — site Next.js

Nouveau site de [sori-mobile-tire.com](https://sori-mobile-tire.com) (remplace l'ancien WordPress).
Next.js 15 (App Router) + React 19 + Tailwind CSS v4, base de données MySQL, e-mails via SMTP.

## Démarrage local

```bash
npm install
cp .env.example .env.local   # puis remplir les valeurs
npm run db:setup             # crée les tables + importe les marques/modèles de véhicules
npm run dev                  # http://localhost:3000
```

Le site fonctionne aussi sans base de données : les formulaires envoient alors seulement l'e-mail,
et la liste des véhicules utilise la liste intégrée (`src/lib/vehicles.ts`).

## Scripts

| Commande | Rôle |
| --- | --- |
| `npm run dev` | Serveur de développement |
| `npm run build` / `npm start` | Build et serveur de production |
| `npm run lint` | ESLint |
| `npm run db:setup` | Crée les tables (`db/schema.sql`) et insère les véhicules (connexion MySQL directe) |
| `npm run db:seed-sql` | Régénère `db/seed.sql` (véhicules) pour un import via phpMyAdmin |
| `npm run images` | Régénère les images WebP de `public/images` (nécessite les dossiers sources locaux) |

## Où modifier le contenu

- Coordonnées, liens sociaux, menus : `src/lib/site.ts`
- Contenu éditable (FAQ, zone, tarifs, avis, galerie, horaires) : dossier `content/*.json`
- Services : `src/lib/services.ts`
- Options des formulaires : `src/lib/form-options.ts`
- Marques/modèles de véhicules : `src/lib/vehicles.ts` (puis `npm run db:setup` ou `npm run db:seed-sql`)
- Pages : `src/app/*/page.tsx` — admin : `/admin`
- Couleurs et styles : `src/app/globals.css` (bloc `@theme`)

## Formulaires

`/api/quote`, `/api/appointment`, `/api/contact`, `/api/newsletter` :
validation (zod), anti-spam (champ piège + limite de fréquence par IP), enregistrement MySQL,
notification brandée (logo inclus) à `NOTIFY_EMAIL` **et** confirmation au client
(désactivable avec `SEND_CUSTOMER_CONFIRMATION=false`).
Les demandes sont consultables dans phpMyAdmin (tables `quote_requests`, `appointments`,
`contact_messages`, `newsletter_subscribers`).

## Déploiement

Voir [DEPLOY.md](./DEPLOY.md) (Hostinger : MySQL, variables d'environnement, staging, bascule du domaine).
