# CodeLearn
I present to you my E-Learning mobile application based on React Native for the generation of logical and technical tests.
it also has a forum to discuss all user issues in all programming matters.
and a challenge space between users to make learning more easy and learn in a funny way.
this application is an expo react native project based on a firebase realtime databse and nodeJs back end .

## Revue de code IA sécurisée

Le client Expo ne contient aucune clé Gemini. La revue passe par un Cloudflare Worker dans `workers/ai-review`.

1. Créez une clé Gemini gratuite dans Google AI Studio.
2. Dans GitHub, ouvrez **Settings → Secrets and variables → Actions → Secrets** et ajoutez :
   - `GEMINI_API_KEY`
   - `CLOUDFLARE_API_TOKEN`
   - `CLOUDFLARE_ACCOUNT_ID`
3. Lancez le workflow **Deploy AI review worker** dans l’onglet Actions.
4. Copiez l’URL fournie par Cloudflare, puis ajoutez-la dans **Settings → Secrets and variables → Actions → Variables** sous `EXPO_PUBLIC_AI_REVIEW_URL`.
5. Relancez le workflow de build Expo. Cette URL est publique ; la clé Gemini reste dans Cloudflare.

## Rooms Firebase en temps réel

Renseignez les variables `EXPO_PUBLIC_FIREBASE_*` de `.env`, créez une base **Realtime Database**, puis activez **Authentication → Anonymous** dans Firebase. Les rooms synchronisent alors le chat, les participants et les scores. Sans cette configuration, l’application garde son mode local.

## Déploiement Vercel avec GitHub Actions

1. Sur [Vercel](https://vercel.com/new), importez `nassimbendaou/CodeLearn` une seule fois et créez le projet.
2. Dans Vercel, ouvrez **Settings → General** et copiez l’Organisation et le Project ID.
3. Dans Vercel, créez un token sous **Account Settings → Tokens**.
4. Dans GitHub **Settings → Secrets and variables → Actions → Secrets**, ajoutez `VERCEL_TOKEN`, `VERCEL_ORG_ID` et `VERCEL_PROJECT_ID`.
5. Lancez **Deploy web app to Vercel** dans l’onglet Actions. Chaque push sur `master` redéploiera ensuite le site.
