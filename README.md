# CNOVA Monorepo

Monorepo Yarn v4 + Turbo pour les applications CNOVA.

## Structure du Projet

```
.
├── apps/
│   ├── repair-pro/              # Application Repair Pro (déploiement: repair-pro.tech)
│   └── codesnova-landing-page/  # Landing page CodesNova
├── package.json                 # Configuration racine du monorepo
├── turbo.json                   # Configuration Turbo
└── .yarnrc.yml                  # Configuration Yarn v4
```

## Applications

### 🔧 Repair Pro

- **Description**: Plateforme de gestion de réparations professionnelle
- **Port**: 3001
- **Déploiement**: repair-pro.tech (via Ansible)
- **Dossier**: `apps/repair-pro/`

### 🚀 CodesNova Landing Page

- **Description**: Page d'accueil de CodesNova
- **Port**: 3000
- **Dossier**: `apps/codesnova-landing-page/`

## Installation

```bash
# Installer toutes les dépendances
yarn install

# Installer les dépendances pour une app spécifique
yarn workspace repair-pro install
yarn workspace codesnova-landing-page install
```

## Commandes de Développement

### Commandes Globales

```bash
# Lancer toutes les applications en mode dev
yarn dev

# Build toutes les applications
yarn build

# Lancer toutes les applications en production
yarn start

# Linter toutes les applications
yarn lint

# Formatter tout le code
yarn format

# Nettoyer tous les node_modules et builds
yarn clean
```

### Commandes par Application

#### Repair Pro

```bash
# Mode développement
yarn repair-pro:dev

# Build
yarn repair-pro:build

# Mode production
yarn repair-pro:start
```

#### CodesNova Landing Page

```bash
# Mode développement
yarn codesnova:dev

# Build
yarn codesnova:build

# Mode production
yarn codesnova:start
```

## Architecture du Monorepo

### Principe: Isolation Complète

Ce monorepo utilise une approche d'**isolation complète** entre les applications:

- ✅ **Pas de code partagé** entre les applications
- ✅ **Dépendances isolées** pour chaque application
- ✅ **Déploiements indépendants** sur des plateformes différentes
- ✅ **Pas de packages communs** (pas de `packages/shared`)

### Pourquoi cette approche?

1. **Déploiement simplifié**: Chaque application peut être déployée indépendamment sans risque de casser l'autre
2. **Pas de couplage**: Modifications dans une app n'affectent pas l'autre
3. **Flexibilité**: Facilité de migration ou extraction d'une application si nécessaire
4. **Sécurité**: Évite les problèmes de copiage et de dépendances circulaires

## Technologies Utilisées

- **Yarn v4**: Gestionnaire de packages moderne avec workspaces
- **Turbo**: Build system optimisé pour les monorepos
- **Next.js 14**: Framework React pour les deux applications
- **TypeScript**: Typage statique
- **Tailwind CSS**: Framework CSS utility-first

## Déploiement

### Repair Pro (repair-pro.tech)

1. L'application est déployée via **Ansible**
2. Déploiement sur le domaine: **repair-pro.tech**
3. Build de production: `yarn repair-pro:build`
4. Voir `apps/repair-pro/README.md` pour plus de détails

### CodesNova Landing Page

1. Build de production: `yarn codesnova:build`
2. Déploiement selon votre plateforme (Vercel, Netlify, etc.)
3. Voir `apps/codesnova-landing-page/README.md` pour plus de détails

## Configuration

### Variables d'Environnement

Chaque application a son propre fichier `.env`:

```
apps/repair-pro/.env              # Variables pour Repair Pro
apps/codesnova-landing-page/.env  # Variables pour CodesNova
```

Voir les fichiers `.env.example` dans chaque application pour les variables requises.

## Dépannage

### Problèmes d'installation

```bash
# Nettoyer et réinstaller
rm -rf node_modules apps/*/node_modules
yarn install
```

### Problèmes de cache Turbo

```bash
# Nettoyer le cache Turbo
rm -rf .turbo
yarn build
```

### Problèmes de ports

Si les ports sont déjà utilisés, modifiez-les dans les fichiers `package.json` des applications:

- Repair Pro: Port 3001
- CodesNova: Port 3000

## License

Propriétaire - CODES-NOVA © 2025
