# CodesNova Landing Page

Landing page officielle de CodesNova - Solutions de développement web et logiciels.

## Description

La landing page de CodesNova présente:

- 🚀 Services de développement web
- 💼 Portfolio de projets
- 👥 À propos de l'équipe
- 📧 Formulaire de contact
- 📱 Design responsive et moderne

## Développement

```bash
# Mode développement (port 3000)
yarn dev

# Build de production
yarn build

# Lancement en production
yarn start

# Linter
yarn lint

# Formatter
yarn format
```

## Configuration

### Variables d'Environnement

Créez un fichier `.env` à partir de `.env.example`:

```bash
# Email Configuration for Contact Form
EMAIL_USER="your-email@gmail.com"
EMAIL_PASS="your-app-password"
```

### Configuration Email (Gmail)

Pour utiliser le formulaire de contact avec Gmail:

1. Activer la validation en 2 étapes sur votre compte Gmail
2. Générer un "Mot de passe d'application":
   - Aller dans Paramètres Google > Sécurité
   - Validation en 2 étapes > Mots de passe d'application
   - Sélectionner "Autre" et nommer "CodesNova Contact"
   - Copier le mot de passe généré
3. Ajouter les identifiants dans `.env`:
   ```
   EMAIL_USER="votre-email@gmail.com"
   EMAIL_PASS="mot-de-passe-application-généré"
   ```

## Déploiement

### Options de Déploiement

#### Vercel (Recommandé)

```bash
# Installer Vercel CLI
npm i -g vercel

# Depuis le dossier de l'app
cd apps/codesnova-landing-page
vercel
```

#### Netlify

```bash
# Build
yarn build

# Le dossier .next peut être déployé sur Netlify
```

#### Serveur VPS

```bash
# Build
yarn build

# Utiliser PM2 pour le process management
pm2 start yarn --name "codesnova" -- start

# Configuration Nginx
server {
    listen 80;
    server_name votredomaine.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

## Technologies

- **Next.js 14**: Framework React avec App Router
- **TypeScript**: Typage statique
- **Tailwind CSS**: Framework CSS utility-first
- **Framer Motion**: Animations
- **Lucide React**: Icônes
- **React Hot Toast**: Notifications
- **Nodemailer**: Envoi d'emails pour le formulaire de contact

## Structure du Projet

```
apps/codesnova-landing-page/
├── src/
│   ├── app/              # Pages Next.js App Router
│   │   ├── page.tsx      # Page d'accueil
│   │   ├── layout.tsx    # Layout racine
│   │   ├── globals.css   # Styles globaux
│   │   ├── about.tsx     # Section À propos
│   │   ├── contact.tsx   # Section Contact
│   │   ├── hero.tsx      # Section Hero
│   │   ├── footer.tsx    # Footer
│   │   └── fonts/        # Polices personnalisées
│   ├── components/       # Composants React
│   │   ├── Navbar.tsx
│   │   ├── TranslucentButton.tsx
│   │   ├── cards/        # Composants de cartes
│   │   ├── modals/       # Modales
│   │   └── sections/     # Sections de la page
│   ├── hooks/            # Custom React hooks
│   └── utils/            # Fonctions utilitaires
├── pages/
│   └── api/              # API Routes Next.js
│       └── contact.ts    # Endpoint pour formulaire de contact
├── public/               # Assets statiques
│   └── images/           # Images
├── package.json          # Dépendances
├── tsconfig.json         # Config TypeScript
└── tailwind.config.ts    # Config Tailwind
```

## Fonctionnalités

### Formulaire de Contact

Le formulaire de contact envoie les messages via l'API route `/api/contact` qui utilise Nodemailer.

**Test du formulaire:**

```bash
curl -X POST http://localhost:3000/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test",
    "email": "test@example.com",
    "message": "Message de test"
  }'
```

### Navigation Smooth Scroll

La navigation utilise le smooth scroll pour naviguer entre les sections de la page.

### Animations

Les animations sont gérées par Framer Motion pour une expérience utilisateur fluide.

## Personnalisation

### Images

Remplacez les images dans `public/images/`:
- `bg.jpg`: Image de fond du hero
- `peakpx.jpg`: Image de fond de la section supernova

### Couleurs

Les couleurs personnalisées sont définies dans `tailwind.config.ts`:

```typescript
colors: {
  "custom-teal": "#6ABBB2",
}
```

### Contenu

Modifiez le contenu dans:
- `src/app/hero.tsx`: Section hero
- `src/app/about.tsx`: Section à propos
- `src/app/contact.tsx`: Section contact

## Support

Pour toute question:
- Email: contact@codes-nova.com
- GitHub Issues: [Créer un issue](https://github.com/your-org/cnova-monorepo/issues)

## License

Propriétaire - CNOVA © 2024
