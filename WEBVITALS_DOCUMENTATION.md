# Documentation Technique - useWebVitals.ts

## Table des matières
1. [Introduction](#introduction)
2. [Intérêt technique](#intérêt-technique)
3. [Architecture du fichier](#architecture-du-fichier)
4. [Métriques Web Vitals mesurées](#métriques-web-vitals-mesurées)
5. [API et Hooks disponibles](#api-et-hooks-disponibles)
6. [Guide d'utilisation](#guide-dutilisation)
7. [Configuration et personnalisation](#configuration-et-personnalisation)
8. [Bonnes pratiques](#bonnes-pratiques)

---

## Introduction

Le fichier `useWebVitals.ts` est un module React qui implémente un système complet de monitoring des **Core Web Vitals** de Google. Il s'agit d'un ensemble de hooks personnalisés qui permettent de mesurer, analyser et optimiser les performances perçues par l'utilisateur sur votre application web.

**Localisation** : `src/hooks/useWebVitals.ts`

---

## Intérêt technique

### 1. **Mesure des performances réelles (RUM - Real User Monitoring)**

Au lieu de se fier uniquement aux tests synthétiques (Lighthouse), ce hook mesure les performances **réelles** que vos utilisateurs expérimentent :

- **Données objectives** : Capture les métriques exactes de chaque session utilisateur
- **Conditions réelles** : Prend en compte la variabilité des appareils, connexions réseau, et comportements utilisateurs
- **Analyse continue** : Monitoring en temps réel sur l'application en production

### 2. **Impact SEO et classement Google**

Les Core Web Vitals sont des **facteurs de classement officiels** dans l'algorithme de Google depuis 2021 :

```
Bon score Web Vitals = Meilleur ranking SEO = Plus de trafic organique
```

### 3. **Optimisation de l'expérience utilisateur (UX)**

Chaque métrique correspond à un aspect critique de l'UX :

| Métrique | Impact UX | Conséquence si mauvais |
|----------|-----------|------------------------|
| **LCP** | Temps de chargement perçu | Utilisateurs quittent la page |
| **INP** | Réactivité aux interactions | Sensation de lenteur/freeze |
| **CLS** | Stabilité visuelle | Clics accidentels, frustration |
| **FCP** | Feedback visuel initial | Impression de page cassée |
| **TTFB** | Vitesse serveur | Temps d'attente global |

### 4. **Debugging et analyse des problèmes de performance**

Le système intégré permet de :
- **Identifier l'élément LCP** exact grâce à l'attribut `data-lcp-element`
- **Détecter les Long Tasks** (tâches > 50ms bloquant le thread principal)
- **Tracer les Layout Shifts** pour comprendre les CLS
- **Analyser les patterns** de navigation et leurs impacts

### 5. **Intégration multi-plateforme**

Le hook supporte plusieurs destinations pour les données :

```typescript
┌──────────────┐
│ useWebVitals │
└──────┬───────┘
       │
       ├─► Console (développement)
       ├─► Google Analytics (production)
       └─► Endpoint personnalisé (analytics custom)
```

---

## Architecture du fichier

### Structure des composants

```
useWebVitals.ts
├── Types & Interfaces
│   ├── MetricType
│   └── WebVitalsMetric
│
├── Configuration
│   └── thresholds (seuils Google)
│
├── Fonctions utilitaires
│   ├── getRating()
│   ├── sendToGoogleAnalytics()
│   └── logMetric()
│
└── Hooks React
    ├── useWebVitals()          → Hook principal de mesure
    ├── useOptimizeINP()        → Optimisation interactions
    ├── useOptimizeCLS()        → Optimisation layout shifts
    └── usePerformanceOptimizations() → Combinaison complète
```

---

## Métriques Web Vitals mesurées

### 1. **LCP - Largest Contentful Paint**

**Définition** : Temps nécessaire pour afficher le plus grand élément visible dans le viewport.

**Seuils** :
- ✅ Bon : ≤ 2500ms
- ⚠️ À améliorer : 2500-4000ms
- ❌ Mauvais : > 4000ms

**Détecté dans le code** : Ligne 103
```typescript
onLCP(handleMetric)
```

**Bonus** : Le hook identifie automatiquement l'élément LCP (lignes 110-118) :
```typescript
lastEntry.element.setAttribute('data-lcp-element', 'true')
```

**Comment l'utiliser pour debugger** :
```javascript
// Dans les DevTools, après chargement :
document.querySelector('[data-lcp-element]')
```

---

### 2. **INP - Interaction to Next Paint**

**Définition** : Temps de réponse aux interactions utilisateur (clics, taps, frappes clavier). Remplace FID depuis web-vitals v3.

**Seuils** :
- ✅ Bon : ≤ 200ms
- ⚠️ À améliorer : 200-500ms
- ❌ Mauvais : > 500ms

**Détecté dans le code** : Ligne 101
```typescript
onINP(handleMetric)
```

**Cas d'usage critiques** :
- Clics sur boutons (CTA, navigation)
- Soumission de formulaires
- Interactions avec menus déroulants

---

### 3. **CLS - Cumulative Layout Shift**

**Définition** : Somme de tous les déplacements inattendus d'éléments visuels pendant le chargement.

**Seuils** :
- ✅ Bon : ≤ 0.1
- ⚠️ À améliorer : 0.1-0.25
- ❌ Mauvais : > 0.25

**Détecté dans le code** : Ligne 100
```typescript
onCLS(handleMetric)
```

**Monitoring actif** : Le hook surveille en continu les layout shifts (lignes 198-217) :
```typescript
if ('LayoutShift' in window) {
  const observer = new PerformanceObserver((list) => {
    for (const entry of list.getEntries()) {
      if (!entry.hadRecentInput) {
        clsScore += entry.value
      }
    }
  })
}
```

---

### 4. **FCP - First Contentful Paint**

**Définition** : Temps jusqu'au premier rendu de contenu DOM (texte, image, SVG).

**Seuils** :
- ✅ Bon : ≤ 1800ms
- ⚠️ À améliorer : 1800-3000ms
- ❌ Mauvais : > 3000ms

**Détecté dans le code** : Ligne 102
```typescript
onFCP(handleMetric)
```

---

### 5. **TTFB - Time to First Byte**

**Définition** : Temps de réponse initial du serveur.

**Seuils** :
- ✅ Bon : ≤ 800ms
- ⚠️ À améliorer : 800-1800ms
- ❌ Mauvais : > 1800ms

**Détecté dans le code** : Ligne 104
```typescript
onTTFB(handleMetric)
```

**Impact** : Un TTFB élevé indique :
- Problèmes de serveur/hébergement
- Latence réseau
- Problèmes de base de données
- SSR lent

---

## API et Hooks disponibles

### 1. `useWebVitals()` - Hook principal

**Usage** : Mesure toutes les métriques Core Web Vitals et les envoie aux plateformes configurées.

**Fonctionnalités** :
- ✅ Mesure des 5 métriques Core Web Vitals
- ✅ Logging coloré en développement
- ✅ Envoi automatique à Google Analytics
- ✅ Support endpoint personnalisé
- ✅ Détection de l'élément LCP
- ✅ Monitoring des Long Tasks

**Exemple d'utilisation** :
```typescript
// Dans votre layout.tsx ou page racine
import { useWebVitals } from '@/hooks/useWebVitals'

export default function RootLayout({ children }) {
  useWebVitals() // Active le monitoring

  return (
    <html>
      <body>{children}</body>
    </html>
  )
}
```

**Sortie console en développement** :
```
✅ LCP: 1842.50 (good) Delta: 1842.50
✅ FCP: 1234.20 (good) Delta: 1234.20
⚠️ INP: 325.00 (needs-improvement) Delta: 325.00
❌ CLS: 0.42 (poor) Delta: 0.42
```

---

### 2. `useOptimizeINP()` - Optimisation des interactions

**Usage** : Améliore la réactivité perçue en préchargeant les ressources critiques.

**Fonctionnalités** :
- Préchargement des bundles JS critiques via `requestIdleCallback`
- Optimisation des event listeners avec délégation
- Mode passif pour réduire le blocking

**Quand l'utiliser** :
- Pages avec beaucoup d'interactions (dashboards, applications)
- Boutons critiques (checkout, CTA)
- Formulaires complexes

**Exemple** :
```typescript
import { useOptimizeINP } from '@/hooks/useWebVitals'

export default function InteractivePage() {
  useOptimizeINP()

  return <ComplexDashboard />
}
```

**Technique implémentée** :
```typescript
// Délégation d'événements (ligne 165-170)
document.addEventListener('click', (e) => {
  const target = e.target as HTMLElement
  if (target.matches('button, a, [role="button"]')) {
    // Traitement optimisé
  }
}, { passive: true })
```

---

### 3. `useOptimizeCLS()` - Optimisation de la stabilité visuelle

**Usage** : Prévient les Layout Shifts en réservant l'espace pour les images et fonts.

**Fonctionnalités** :
- Attribution automatique de `width` et `height` aux images sans dimensions
- Détection du chargement des fonts
- Monitoring continu du score CLS
- Alertes en développement si CLS > 0.1

**Quand l'utiliser** :
- Pages riches en images
- Pages utilisant des web fonts personnalisées
- Contenu dynamique (ads, iframes, embeds)

**Exemple** :
```typescript
import { useOptimizeCLS } from '@/hooks/useWebVitals'

export default function BlogPost() {
  useOptimizeCLS()

  return (
    <article>
      <img src="/hero.jpg" alt="Hero" /> {/* Dimensions auto-ajoutées */}
      <p style={{ fontFamily: 'CustomFont' }}>Contenu</p>
    </article>
  )
}
```

**Technique pour les fonts** (lignes 191-195) :
```typescript
document.fonts.ready.then(() => {
  document.body.classList.add('fonts-loaded')
})
```

**CSS associé recommandé** :
```css
body {
  font-family: system-ui, sans-serif; /* Font système par défaut */
}

body.fonts-loaded {
  font-family: 'CustomFont', sans-serif; /* Font custom après chargement */
}
```

---

### 4. `usePerformanceOptimizations()` - Hook tout-en-un

**Usage** : Combine les 3 hooks précédents pour une optimisation complète.

**Fonctionnalités** :
- ✅ Mesure de toutes les métriques
- ✅ Optimisation INP
- ✅ Optimisation CLS
- ✅ Monitoring en temps réel

**Quand l'utiliser** :
- Layout racine de l'application
- Pages critiques (homepage, landing pages)
- Applications web complètes

**Exemple** :
```typescript
// src/app/layout.tsx
import { usePerformanceOptimizations } from '@/hooks/useWebVitals'

export default function RootLayout({ children }) {
  usePerformanceOptimizations() // Active TOUT

  return (
    <html>
      <body>{children}</body>
    </html>
  )
}
```

---

## Guide d'utilisation

### Scénario 1 : Intégration basique (Google Analytics)

**Objectif** : Mesurer les Core Web Vitals et les envoyer à Google Analytics.

**Étapes** :

1. **Installer la dépendance** (si pas déjà fait) :
```bash
npm install web-vitals
```

2. **Intégrer dans le layout racine** :
```typescript
// src/app/layout.tsx
'use client'

import { useWebVitals } from '@/hooks/useWebVitals'

export default function RootLayout({ children }) {
  useWebVitals()

  return (
    <html lang="fr">
      <head>
        {/* Google Analytics */}
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'GA_MEASUREMENT_ID');
            `,
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  )
}
```

3. **Vérifier dans Google Analytics** :
   - Allez dans **Événements** > Recherchez "CLS", "LCP", "INP", etc.
   - Les métriques apparaissent avec :
     - `event_category`: "Web Vitals"
     - `metric_rating`: "good" | "needs-improvement" | "poor"

---

### Scénario 2 : Monitoring avec endpoint personnalisé

**Objectif** : Envoyer les métriques vers votre propre API analytics.

**Étapes** :

1. **Configurer la variable d'environnement** :
```env
# .env.local
NEXT_PUBLIC_VITALS_ENDPOINT=https://api.yourapp.com/analytics/vitals
```

2. **Créer l'endpoint backend** :
```typescript
// pages/api/analytics/vitals.ts (exemple Next.js)
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const metric = req.body

  // Stocker dans votre DB
  await db.metrics.create({
    data: {
      name: metric.name,
      value: metric.value,
      rating: metric.rating,
      url: metric.url,
      userAgent: metric.userAgent,
      timestamp: metric.timestamp,
    }
  })

  res.status(200).json({ success: true })
}
```

3. **Le hook envoie automatiquement** (lignes 83-96) :
```typescript
fetch(process.env.NEXT_PUBLIC_VITALS_ENDPOINT, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    ...webVitalsMetric,
    url: window.location.href,
    userAgent: navigator.userAgent,
    timestamp: new Date().toISOString()
  })
})
```

**Données envoyées** :
```json
{
  "name": "LCP",
  "value": 2341.5,
  "rating": "good",
  "delta": 2341.5,
  "id": "v3-1234567890-5678",
  "navigationType": "navigate",
  "url": "https://yoursite.com/pricing",
  "userAgent": "Mozilla/5.0...",
  "timestamp": "2025-01-15T10:30:45.123Z"
}
```

---

### Scénario 3 : Debugging en développement

**Objectif** : Identifier et corriger les problèmes de performance.

**Workflow** :

1. **Activer le hook** :
```typescript
import { usePerformanceOptimizations } from '@/hooks/useWebVitals'

usePerformanceOptimizations()
```

2. **Observer la console** :
```
✅ FCP: 892.30 (good) Delta: 892.30
⚠️ LCP: 3245.80 (needs-improvement) Delta: 3245.80
⚠️ Long Task detected: 127.50ms
⚠️ High CLS detected: 0.145
```

3. **Identifier l'élément LCP problématique** :
```javascript
// Dans DevTools Console
const lcpElement = document.querySelector('[data-lcp-element]')
console.log(lcpElement)
// Exemple de sortie : <img src="/hero-large.jpg">
```

4. **Corriger le problème** :
```typescript
// Avant (LCP ~3200ms)
<img src="/hero-large.jpg" alt="Hero" />

// Après (LCP ~1800ms)
<Image
  src="/hero-large.jpg"
  alt="Hero"
  width={1200}
  height={600}
  priority // Précharge l'image LCP
  placeholder="blur"
/>
```

5. **Analyser les Long Tasks** :
   - Cherchez les warnings `⚠️ Long Task detected: XXXms`
   - Ces tâches bloquent le thread principal et dégradent INP
   - Solutions :
     - Code splitting
     - Lazy loading des composants lourds
     - Web Workers pour calculs intensifs

---

### Scénario 4 : Optimisation CLS pour images

**Problème** : Votre page a un mauvais score CLS (> 0.1).

**Solution avec le hook** :

```typescript
import { useOptimizeCLS } from '@/hooks/useWebVitals'

export default function ImageGallery() {
  useOptimizeCLS() // Active l'optimisation

  return (
    <div className="gallery">
      {/* Le hook ajoutera automatiquement width/height */}
      <img src="/photo1.jpg" alt="Photo 1" />
      <img src="/photo2.jpg" alt="Photo 2" />
    </div>
  )
}
```

**Technique automatique** (lignes 181-188) :
```typescript
const images = document.querySelectorAll('img:not([width]):not([height])')
images.forEach((img) => {
  const imgElement = img as HTMLImageElement
  if (imgElement.naturalWidth && imgElement.naturalHeight) {
    imgElement.width = imgElement.naturalWidth
    imgElement.height = imgElement.naturalHeight
  }
})
```

**Meilleure pratique (recommandé)** :
```typescript
// Utiliser next/image qui gère automatiquement les dimensions
import Image from 'next/image'

<Image
  src="/photo1.jpg"
  alt="Photo 1"
  width={800}
  height={600}
/>
```

---

## Configuration et personnalisation

### 1. Ajuster les seuils de performance

Par défaut, le hook utilise les seuils officiels de Google (lignes 19-25). Vous pouvez les personnaliser :

```typescript
// Créer un fichier customThresholds.ts
export const customThresholds = {
  CLS: { good: 0.05, needsImprovement: 0.15 }, // Plus strict
  INP: { good: 150, needsImprovement: 300 },   // Plus strict
  FCP: { good: 1500, needsImprovement: 2500 },
  LCP: { good: 2000, needsImprovement: 3500 },
  TTFB: { good: 600, needsImprovement: 1200 }
}
```

Puis modifier dans `useWebVitals.ts` :
```typescript
import { customThresholds } from './customThresholds'

const getRating = (name: MetricType, value: number) => {
  const threshold = customThresholds[name]
  // ...
}
```

---

### 2. Ajouter des événements personnalisés

Vous pouvez enrichir les données envoyées :

```typescript
// Modifier sendToGoogleAnalytics (ligne 36)
const sendToGoogleAnalytics = (metric: WebVitalsMetric) => {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', metric.name, {
      value: Math.round(metric.value),
      event_category: 'Web Vitals',
      event_label: metric.id,
      metric_rating: metric.rating,

      // Ajouts personnalisés
      page_path: window.location.pathname,
      device_type: /mobile/i.test(navigator.userAgent) ? 'mobile' : 'desktop',
      connection_type: (navigator as any).connection?.effectiveType || 'unknown',
      user_id: getUserId(), // Votre fonction d'identification
    })
  }
}
```

---

### 3. Filtrer les métriques envoyées

Pour économiser les quotas d'analytics, envoyez seulement les mauvaises métriques :

```typescript
const sendToGoogleAnalytics = (metric: WebVitalsMetric) => {
  // Envoyer seulement si "needs-improvement" ou "poor"
  if (metric.rating === 'good') return

  // Reste du code...
}
```

---

### 4. Intégration avec d'autres outils

**Avec Sentry** :
```typescript
import * as Sentry from '@sentry/nextjs'

const handleMetric = (metric: any) => {
  const webVitalsMetric: WebVitalsMetric = { ... }

  // Envoyer à Sentry comme mesure personnalisée
  Sentry.setMeasurement(metric.name, metric.value, 'millisecond')

  if (webVitalsMetric.rating === 'poor') {
    Sentry.captureMessage(`Poor ${metric.name}: ${metric.value}`, 'warning')
  }
}
```

**Avec Vercel Analytics** :
```typescript
import { sendWebVitalsToVercel } from '@vercel/analytics'

const handleMetric = (metric: any) => {
  sendWebVitalsToVercel(metric)
  // ... reste du code
}
```

---

## Bonnes pratiques

### 1. Placement du hook

**✅ BON** :
```typescript
// Dans le layout racine (exécuté une seule fois)
// src/app/layout.tsx
export default function RootLayout({ children }) {
  useWebVitals()
  return <html><body>{children}</body></html>
}
```

**❌ MAUVAIS** :
```typescript
// Dans chaque page (exécuté plusieurs fois = données dupliquées)
export default function Page() {
  useWebVitals() // ❌ Éviter
  return <div>Content</div>
}
```

---

### 2. Combinaison avec React.StrictMode

En développement, `StrictMode` monte les composants deux fois. Assurez-vous que vos métriques ne sont pas dupliquées :

```typescript
// Le hook gère déjà ça via useEffect avec [] comme dépendances
useEffect(() => {
  // Code exécuté une seule fois par montage
  onCLS(handleMetric)
}, [])
```

---

### 3. Monitoring des composants critiques

Pour des insights plus granulaires, créez un hook spécialisé :

```typescript
// useComponentVitals.ts
export const useComponentVitals = (componentName: string) => {
  useEffect(() => {
    const startTime = performance.now()

    return () => {
      const renderTime = performance.now() - startTime

      if (renderTime > 50) {
        console.warn(`Slow component: ${componentName} (${renderTime}ms)`)
      }
    }
  }, [componentName])
}

// Usage
function HeavyComponent() {
  useComponentVitals('HeavyComponent')
  return <ExpensiveRender />
}
```

---

### 4. Alertes automatiques pour mauvaises métriques

Configurez un système d'alerte :

```typescript
const handleMetric = (metric: any) => {
  const webVitalsMetric: WebVitalsMetric = { ... }

  // Alerte Slack/Discord si métrique critique
  if (webVitalsMetric.rating === 'poor' &&
      (metric.name === 'LCP' || metric.name === 'CLS')) {
    sendSlackAlert({
      message: `🚨 CRITICAL: ${metric.name} is POOR (${metric.value})`,
      url: window.location.href,
      userAgent: navigator.userAgent
    })
  }
}
```

---

### 5. Désactiver en développement (optionnel)

Si les logs deviennent trop verbeux :

```typescript
export const useWebVitals = () => {
  useEffect(() => {
    // Désactiver complètement en dev
    if (process.env.NODE_ENV === 'development') return

    // Reste du code...
  }, [])
}
```

Ou garder seulement les logs sans envoi :

```typescript
const sendToGoogleAnalytics = (metric: WebVitalsMetric) => {
  if (process.env.NODE_ENV === 'development') return // Pas d'envoi en dev

  // Reste du code...
}
```

---

## Checklist de mise en production

Avant de déployer avec ce hook :

- [ ] ✅ Hook activé dans le layout racine
- [ ] ✅ Google Analytics configuré (ou endpoint custom)
- [ ] ✅ Variable `NEXT_PUBLIC_VITALS_ENDPOINT` définie (si analytics custom)
- [ ] ✅ Tests en local : vérifier les logs console
- [ ] ✅ Tests en staging : vérifier réception dans GA/analytics
- [ ] ✅ Images optimisées avec `width` et `height`
- [ ] ✅ Fonts préchargées avec `<link rel="preload">`
- [ ] ✅ Élément LCP identifié et optimisé
- [ ] ✅ Long Tasks détectés et corrigés (< 50ms)
- [ ] ✅ CLS score < 0.1 sur toutes les pages critiques
- [ ] ✅ Dashboard analytics configuré pour visualiser les métriques

---

## Ressources complémentaires

- [Documentation officielle Web Vitals](https://web.dev/vitals/)
- [Bibliothèque web-vitals (Google)](https://github.com/GoogleChrome/web-vitals)
- [Core Web Vitals et SEO (Google Search Central)](https://developers.google.com/search/docs/appearance/core-web-vitals)
- [PageSpeed Insights](https://pagespeed.web.dev/)
- [Chrome User Experience Report](https://developers.google.com/web/tools/chrome-user-experience-report)

---

## Support et contribution

Pour toute question ou amélioration sur ce système de monitoring, consultez :
- Le code source : `src/hooks/useWebVitals.ts`
- Les autres hooks de performance : `src/hooks/`
- Documentation du projet : `TRANSLATION_GUIDE.md`, `SEO_OPTIMIZATIONS.md`

---

**Dernière mise à jour** : Janvier 2025
**Version web-vitals** : v3.x (avec INP remplaçant FID)
