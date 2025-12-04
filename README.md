# Repair Pro Landing Page

Landing page pour Repair Pro - Plateforme de gestion de réparations professionnelle.

## Structure du Projet

```
.
├── src/                 # Code source de l'application
├── public/              # Fichiers statiques
├── package.json         # Configuration npm
├── netlify.toml         # Configuration Netlify
├── next.config.mjs      # Configuration Next.js
├── tailwind.config.ts   # Configuration Tailwind CSS
└── tsconfig.json        # Configuration TypeScript
```

## Technologies Utilisées

- **Next.js 14**: Framework React pour le rendu côté serveur
- **TypeScript**: Typage statique
- **Tailwind CSS**: Framework CSS utility-first
- **Framer Motion**: Animations
- **React Icons & Lucide React**: Bibliothèques d'icônes

## Installation

```bash
# Installer les dépendances
npm install
```

## Commandes de Développement

```bash
# Mode développement (port 3001)
npm run dev

# Build de production
npm run build

# Lancer en mode production
npm start

# Linter le code
npm run lint

# Formatter le code
npm run format

# Nettoyer node_modules et builds
npm run clean
```

## Déploiement sur Netlify

### Configuration Automatique

Le fichier `netlify.toml` est configuré pour déployer automatiquement l'application.

### Étapes de Déploiement

1. **Connecter le repository à Netlify**
   - Se connecter sur [Netlify](https://netlify.com)
   - Importer le repository Git

2. **Configuration automatique**
   - Netlify détectera automatiquement la configuration dans `netlify.toml`
   - Build command: `npm run build`
   - Publish directory: `.next`
   - Node version: 20

3. **Variables d'environnement**
   - Configurer les variables dans le dashboard Netlify
   - Voir `.env.example` pour la liste des variables

### Build Manuel

```bash
# Build local
npm run build

# Tester le build
npm start
```

## Configuration

### Variables d'Environnement

L'application utilise son propre fichier `.env`:

```
.env              # Variables d'environnement
```

Voir le fichier `.env.example` pour les variables requises.

## Dépannage

### Problèmes d'installation

```bash
# Nettoyer et réinstaller
rm -rf node_modules package-lock.json
npm install
```

### Problèmes de cache Next.js

```bash
# Nettoyer le cache
rm -rf .next
npm run build
```

### Problèmes de ports

Si le port 3001 est déjà utilisé, modifiez-le dans `package.json`:

```json
"dev": "next dev -p 3001"  // Changer le port ici
"start": "next start -p 3001"  // Changer le port ici aussi
```

## License

Propriétaire - Repair Pro © 2025
