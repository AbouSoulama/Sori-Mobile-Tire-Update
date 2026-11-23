# Déploiement sur Hostinger

Principe : on met d'abord le nouveau site en ligne sur un **sous-domaine de test** (staging),
on vérifie tout, puis **seulement après validation** on bascule le domaine principal
`sori-mobile-tire.com` de WordPress vers le nouveau site.

> Ne jamais écrire de mot de passe (MySQL, SMTP) dans le code ni dans un fichier `.env` commité.
> Ils se configurent uniquement dans hPanel (variables d'environnement de l'application Node.js).

---

## 1. Base de données MySQL

1. hPanel → **Bases de données → Gestion** → créer une base, par ex. `u123456789_smt`,
   avec un utilisateur et un mot de passe fort. Noter les 3 valeurs.
2. Ouvrir **phpMyAdmin** sur cette base, onglet **Importer** :
   1. importer `db/schema.sql` (crée les tables) ;
   2. importer `db/seed.sql` (marques et modèles de véhicules).

   Les deux fichiers peuvent être réimportés sans risque (pas de doublons).

Alternative : activer « MySQL distant » pour votre IP, puis depuis votre PC
`DB_HOST=srvXXXX.hstgr.io npm run db:setup` (l'hôte `srvXXXX.hstgr.io` ne sert **que** depuis
l'extérieur ; l'application, elle, utilise toujours `127.0.0.1`).

## 2. Adresse e-mail du site (SMTP)

hPanel → **E-mails** → créer / utiliser la boîte **`contact@sori-mobile-tire.com`**.

Les alertes formulaires partent vers `NOTIFY_EMAIL` (par défaut cette même boîte).
Si l’admin lit surtout Gmail sur téléphone (USA), soit :
- configurer un **transfert** Hostinger `contact@` → Gmail, soit
- mettre `NOTIFY_EMAIL=contact@sori-mobile-tire.com,son-gmail@gmail.com`.

En cas de doute : hPanel → **Email Logs** (Delivery) après un envoi test.

Elle sert à la fois :
- d'adresse publique affichée sur le site ;
- d'expéditeur SMTP des formulaires ;
- de destinataire admin (chaque devis / RDV / contact / newsletter).

Le client reçoit aussi un e-mail de confirmation (template brandé avec le logo).

> Tant que le domaine est encore sur WordPress, vous pouvez déjà créer cette boîte : les e-mails
> dépendent des enregistrements MX du domaine, pas du site.

## 3. Créer l'application Node.js de staging

1. hPanel → **Sites web → Ajouter un site → Application Node.js**.
2. Domaine : un sous-domaine de test, par ex. `new.sori-mobile-tire.com`.
3. Source : dépôt GitHub (recommandé : chaque `git push` redéploie) ou import d'un fichier .zip
   du projet (sans `node_modules`, `.next`, `.env*`).
4. Paramètres de build :
   - Framework : **Next.js**
   - Version Node : **20** ou **22**
   - Commande d'installation : `npm install`
   - Commande de build : `npm run build`
   - Commande de démarrage : `npm start`
5. Variables d'environnement (voir `.env.example`) :

| Variable | Valeur staging |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | `https://new.sori-mobile-tire.com` |
| `NEXT_PUBLIC_NOINDEX` | `true` (Google n'indexe pas le staging) |
| `DB_HOST` | `127.0.0.1` |
| `DB_PORT` | `3306` |
| `DB_NAME` / `DB_USER` / `DB_PASSWORD` | valeurs de l'étape 1 |
| `SMTP_HOST` / `SMTP_PORT` | `smtp.hostinger.com` / `465` |
| `SMTP_USER` / `SMTP_PASSWORD` | `contact@sori-mobile-tire.com` + mot de passe |
| `MAIL_FROM` | `SORI Mobile Tire <contact@sori-mobile-tire.com>` |
| `NOTIFY_EMAIL` | `contact@sori-mobile-tire.com` (réception des demandes) |
| `ADMIN_EMAIL` | `contact@sori-mobile-tire.com` (connexion /admin) |
| `SEND_CUSTOMER_CONFIRMATION` | `true` (confirmation client ; mettre `false` pour désactiver) |
| `NEXT_PUBLIC_FACEBOOK_URL` etc. | liens de vos profils (laisser vide pour masquer l'icône) |

Les variables `NEXT_PUBLIC_*` sont intégrées **au moment du build** : après les avoir modifiées,
relancer un build/redéploiement.

## 4. Vérifications sur le staging

- [ ] Toutes les pages s'affichent (accueil, services, about, contact, devis, rendez-vous, mentions).
- [ ] Envoyer un devis, un rendez-vous, un message de contact et une inscription newsletter :
      e-mail reçu sur `contact@sori-mobile-tire.com` **et** e-mail de confirmation reçu par le client
      + ligne visible dans phpMyAdmin.
- [ ] La liste Année / Marque / Modèle se remplit sur le formulaire de devis.
- [ ] Sur mobile : barre « Call Now / Book Service » et bouton WhatsApp.
- [ ] `https://new.sori-mobile-tire.com/robots.txt` affiche `Disallow: /` (staging non indexé).

## 5. Bascule du domaine principal (uniquement après votre accord)

1. **Sauvegarder WordPress** : hPanel → Sauvegardes (fichiers + base), à garder quelques semaines.
2. Désactiver/supprimer le site WordPress attaché à `sori-mobile-tire.com`
   (il est infecté par du spam : ne pas le réutiliser).
3. Attacher `sori-mobile-tire.com` (et `www`) à l'application Node.js : soit en changeant le
   domaine de l'application de staging, soit en créant une nouvelle application Node.js sur le
   domaine principal avec le même dépôt.
4. Modifier les variables :
   - `NEXT_PUBLIC_SITE_URL=https://sori-mobile-tire.com`
   - `NEXT_PUBLIC_NOINDEX=false`

   puis **redéployer** (build obligatoire).
5. Vérifier le certificat SSL (hPanel → Sécurité → SSL) et la redirection `www` → domaine.
6. Si le domaine est géré chez Hostinger, aucun changement DNS n'est nécessaire. S'il pointe
   ailleurs, faire pointer l'enregistrement `A` vers l'IP indiquée par hPanel.

Les anciennes adresses importantes continuent de fonctionner :
`/assistance-with-online-tire-purchases` → `/tire-purchase-assistance`, `/formulaire` → `/get-a-quote`,
les autres pages (`/about`, `/services`, `/contact`, `/get-a-quote`, `/schedule-appointment`,
`/wheel-repair`, `/puncture-repair`, `/other`) gardent la même URL.

## 6. Contenu éditable (CMS léger)

Sans Sanity : modifiez les fichiers JSON dans `content/` puis rebuild/redémarrez :

| Fichier | Contenu |
| --- | --- |
| `content/service-area.json` | Rayon + villes desservies |
| `content/faq.json` | FAQ |
| `content/pricing.json` | Tarifs indicatifs |
| `content/reviews.json` | Avis + URL Google Business |
| `content/hours.json` | Horaires |
| `content/gallery.json` | Galerie photos |

Photos van/équipe : déposer dans `public/images/team/` puis référencer dans `gallery.json`.

Avis Google : collez l'URL Google Business dans `reviews.googleBusinessUrl` et mettez à jour `rating` / `reviewCount` / la liste `reviews`.

## 7. Mini-admin `/admin`

Variables : `ADMIN_PASSWORD` + `ADMIN_SESSION_SECRET` (chaîne longue aléatoire).
Permet de lire devis / RDV / messages / newsletter, marquer traité, exporter CSV.

## 8. SMS Twilio (optionnel)

Si `TWILIO_ACCOUNT_SID`, `TWILIO_AUTH_TOKEN`, `TWILIO_FROM` sont définis, le client reçoit aussi un SMS après devis / RDV / contact. WhatsApp est toujours proposé (e-mail + écran de succès).

## 9. Sentry (optionnel)

Définir `SENTRY_DSN` pour remonter les erreurs serveur (formulaires / DB / e-mail).

## 10. Sauvegardes, uptime, Cloudflare

1. **Hostinger** → Sauvegardes : activer les backups auto (fichiers + MySQL). Tester une restauration une fois.
2. **Uptime** : créer un check gratuit sur [UptimeRobot](https://uptimerobot.com) (ou équivalent) vers `https://sori-mobile-tire.com` toutes les 5 min, alerte e-mail/SMS.
3. **Cloudflare** (recommandé avant/après bascule DNS) :
   - Ajouter le domaine, proxy orange (CDN + WAF).
   - SSL/TLS : Full (strict) une fois le certificat Hostinger OK.
   - WAF managed rules + Bot Fight Mode.
   - Ne jamais exposer `wp-admin` (il n'existe plus sur ce site).

## 11. Sécurité (déjà intégrée dans le code)

Le site Next.js n'a **pas** de WordPress, donc plus de `wp-admin` / `xmlrpc` à pirater.
Mesures déjà en place :
- honeypot + rate-limit sur les formulaires ;
- vérification Origin/Referer (anti-CSRF) et taille max du corps ;
- en-têtes HTTP : CSP, HSTS, X-Frame-Options, nosniff, CORP/COOP ;
- anciennes URLs WordPress / probes → réponse **410 Gone** ;
- pas de CORS ouvert, pas de mot de passe dans le code.

À faire côté Hostinger : SSL actif, boîte mail avec mot de passe fort, accès hPanel
en 2FA si disponible, ne jamais réutiliser l'ancien WordPress infecté.

## 12. Nettoyage Google (pages spam de l'ancien WordPress)

Le nouveau site répond **410 Gone** aux adresses typiques du WordPress piraté
(`/wp-*`, `/category/…`, `/tag/…`, `/feed`, `/AAAA/MM/…`, `*.php`, `*.html`, `?p=…`)
et **404** aux autres adresses inconnues : Google les retire de son index.

1. [Google Search Console](https://search.google.com/search-console) → propriété `sori-mobile-tire.com`.
2. **Sitemaps** : supprimer les anciens (`sitemap_index.xml`, `page-sitemap.xml`, `post-sitemap.xml`)
   et soumettre `https://sori-mobile-tire.com/sitemap.xml`.
3. **Suppressions** : demander la suppression temporaire des URL spam les plus visibles
   (filtre par préfixe possible).
4. **Sécurité et actions manuelles** : vérifier qu'il n'y a pas d'alerte ; s'il y en a, demander
   un réexamen une fois le nouveau site en ligne.
5. Surveiller **Pages → Non indexées** pendant 2 à 6 semaines : les URL spam doivent passer en
   « Introuvable (404) » / « Supprimée (410) ».
