# Repair Pro

Plateforme de gestion de réparations professionnelle.

## Description

Repair Pro est une application complète de gestion pour les ateliers de réparation, incluant:

- 🔧 Gestion des réparations
- 📦 Gestion des stocks
- 👥 Gestion des clients
- 🧾 Facturation simplifiée
- 🎫 Système de tickets
- ☁️ Sauvegardes cloud automatiques

## Déploiement

### Domaine de Production

**repair-pro.tech**

### Méthode de Déploiement

L'application est déployée via **Ansible** sur un serveur dédié.

### Prérequis

- Node.js >= 20.0.0
- Yarn 4.x

### Build de Production

```bash
# Depuis la racine du monorepo
yarn repair-pro:build

# Depuis le dossier de l'app
cd apps/repair-pro
yarn build
```

### Lancement en Production

```bash
# Depuis la racine du monorepo
yarn repair-pro:start

# Depuis le dossier de l'app
cd apps/repair-pro
yarn start
```

## Configuration Ansible

### Structure des Playbooks

```yaml
# playbook exemple pour repair-pro
- hosts: repair_pro_servers
  vars:
    app_path: /var/www/repair-pro
    domain: repair-pro.tech
    node_version: "20"
  tasks:
    - name: Clone repository
      git:
        repo: https://github.com/your-org/cnova-monorepo.git
        dest: "{{ app_path }}"
        version: main

    - name: Install dependencies
      command: yarn install
      args:
        chdir: "{{ app_path }}"

    - name: Build Repair Pro
      command: yarn repair-pro:build
      args:
        chdir: "{{ app_path }}"

    - name: Setup environment
      copy:
        src: .env.production
        dest: "{{ app_path }}/apps/repair-pro/.env"

    - name: Start application with PM2
      command: pm2 start yarn --name "repair-pro" -- repair-pro:start
      args:
        chdir: "{{ app_path }}"

    - name: Setup Nginx
      template:
        src: nginx.conf.j2
        dest: /etc/nginx/sites-available/repair-pro

    - name: Reload Nginx
      service:
        name: nginx
        state: reloaded
```

### Configuration Nginx

```nginx
# /etc/nginx/sites-available/repair-pro
server {
    listen 80;
    server_name repair-pro.tech www.repair-pro.tech;

    location / {
        proxy_pass http://localhost:3001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

## Variables d'Environnement

Créez un fichier `.env` à partir de `.env.example`:

```bash
# Repair Pro Environment Variables
# NEXT_PUBLIC_PAYMENT_API_EP="https://api.repair-pro.cloud-db.pro"
```

## Développement

```bash
# Mode développement (port 3001)
yarn dev

# Linter
yarn lint

# Formatter
yarn format
```

## Technologies

- **Next.js 14**: Framework React
- **TypeScript**: Typage statique
- **Tailwind CSS**: Styling
- **Lucide React**: Icônes
- **React Hot Toast**: Notifications
- **jsPDF**: Génération de PDF

## Structure du Projet

```
apps/repair-pro/
├── src/
│   ├── app/              # Pages Next.js App Router
│   │   ├── page.tsx      # Page d'accueil
│   │   ├── layout.tsx    # Layout racine
│   │   ├── globals.css   # Styles globaux
│   │   └── fonts/        # Polices personnalisées
│   ├── components/       # Composants React
│   │   ├── Navbar.tsx
│   │   ├── TranslucentButton.tsx
│   │   ├── Card.tsx
│   │   ├── PaymentModal.tsx
│   │   └── modals/
│   └── utils/            # Utilitaires
├── public/               # Assets statiques
├── package.json          # Dépendances
├── tsconfig.json         # Config TypeScript
└── tailwind.config.ts    # Config Tailwind
```

## Support

Pour toute question ou problème:
- Email: support@codes-nova.com
- WhatsApp: Support prioritaire pour abonnés

## License

Propriétaire - CNOVA © 2024
