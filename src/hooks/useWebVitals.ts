/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useEffect } from 'react'
import { onCLS, onINP, onFCP, onLCP, onTTFB } from 'web-vitals'

type MetricType = 'CLS' | 'INP' | 'FCP' | 'LCP' | 'TTFB'

interface WebVitalsMetric {
  name: MetricType
  value: number
  rating: 'good' | 'needs-improvement' | 'poor'
  delta: number
  id: string
  navigationType: string
}

// Seuils de performance selon Google
const thresholds = {
  CLS: { good: 0.1, needsImprovement: 0.25 },
  INP: { good: 200, needsImprovement: 500 }, // INP remplace FID
  FCP: { good: 1800, needsImprovement: 3000 },
  LCP: { good: 2500, needsImprovement: 4000 },
  TTFB: { good: 800, needsImprovement: 1800 }
}

// Fonction pour déterminer le rating
const getRating = (name: MetricType, value: number): 'good' | 'needs-improvement' | 'poor' => {
  const threshold = thresholds[name]
  if (value <= threshold.good) return 'good'
  if (value <= threshold.needsImprovement) return 'needs-improvement'
  return 'poor'
}

// Fonction pour envoyer les métriques à Google Analytics
const sendToGoogleAnalytics = (metric: WebVitalsMetric) => {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', metric.name, {
      value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
      event_category: 'Web Vitals',
      event_label: metric.id,
      non_interaction: true,
      metric_rating: metric.rating,
      metric_delta: Math.round(metric.delta),
      navigation_type: metric.navigationType
    })
  }
}

// Fonction pour logger les métriques en développement
const logMetric = (metric: WebVitalsMetric) => {
  if (process.env.NODE_ENV === 'development') {
    const color = metric.rating === 'good' ? '✅' : metric.rating === 'needs-improvement' ? '⚠️' : '❌'
    console.log(
      `${color} ${metric.name}:`,
      `${metric.value.toFixed(2)}`,
      `(${metric.rating})`,
      `Delta: ${metric.delta.toFixed(2)}`
    )
  }
}

// Hook principal pour les Web Vitals
export const useWebVitals = () => {
  useEffect(() => {
    const handleMetric = (metric: any) => {
      const webVitalsMetric: WebVitalsMetric = {
        name: metric.name as MetricType,
        value: metric.value,
        rating: getRating(metric.name as MetricType, metric.value),
        delta: metric.delta,
        id: metric.id,
        navigationType: metric.navigationType || 'navigate'
      }

      // Logger en développement
      logMetric(webVitalsMetric)

      // Envoyer à Google Analytics
      sendToGoogleAnalytics(webVitalsMetric)

      // Envoyer à un endpoint personnalisé si nécessaire
      if (process.env.NEXT_PUBLIC_VITALS_ENDPOINT) {
        fetch(process.env.NEXT_PUBLIC_VITALS_ENDPOINT, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            ...webVitalsMetric,
            url: window.location.href,
            userAgent: navigator.userAgent,
            timestamp: new Date().toISOString()
          })
        }).catch(() => {
          // Ignorer les erreurs d'envoi
        })
      }
    }

    // Mesurer les différentes métriques
    onCLS(handleMetric)
    onINP(handleMetric) // INP remplace FID depuis web-vitals v3
    onFCP(handleMetric)
    onLCP(handleMetric)
    onTTFB(handleMetric)

    // Observer les changements de performance
    if ('PerformanceObserver' in window) {
      try {
        // Observer pour Largest Contentful Paint
        const lcpObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries()
          const lastEntry = entries[entries.length - 1] as any
          if (lastEntry && lastEntry.element) {
            // Ajouter un attribut data pour identifier l'élément LCP
            lastEntry.element.setAttribute('data-lcp-element', 'true')
          }
        })
        lcpObserver.observe({ type: 'largest-contentful-paint', buffered: true })

        // Observer pour les longs tasks
        const longTaskObserver = new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            if (entry.duration > 50) {
              console.warn(`⚠️ Long Task detected: ${entry.duration.toFixed(2)}ms`)
            }
          }
        })

        if ('PerformanceLongTaskTiming' in window) {
          longTaskObserver.observe({ type: 'longtask', buffered: true })
        }

        // Nettoyer les observers au unmount
        return () => {
          lcpObserver.disconnect()
          longTaskObserver.disconnect()
        }
      } catch (e) {
        // Ignorer les erreurs de PerformanceObserver
      }
    }
  }, [])
}

// Hook pour l'optimisation de l'Interaction to Next Paint (INP)
export const useOptimizeINP = () => {
  useEffect(() => {
    // Précharger les interactions critiques
    if ('requestIdleCallback' in window) {
      requestIdleCallback(() => {
        // Précharger les bundles JavaScript critiques
        const links = document.querySelectorAll('link[rel="modulepreload"]')
        links.forEach(link => {
          const href = link.getAttribute('href')
          if (href) {
            fetch(href, { priority: 'low' } as RequestInit).catch(() => {})
          }
        })
      })
    }

    // Optimiser les event listeners
    const optimizeEventListeners = () => {
      // Utiliser la délégation d'événements pour réduire le nombre de listeners
      document.addEventListener('click', (e) => {
        const target = e.target as HTMLElement
        if (target.matches('button, a, [role="button"]')) {
          // Traiter les clics de manière optimisée
        }
      }, { passive: true })
    }

    optimizeEventListeners()
  }, [])
}

// Hook pour l'optimisation du Cumulative Layout Shift
export const useOptimizeCLS = () => {
  useEffect(() => {
    // Réserver l'espace pour les images
    const images = document.querySelectorAll('img:not([width]):not([height])')
    images.forEach((img) => {
      const imgElement = img as HTMLImageElement
      if (imgElement.naturalWidth && imgElement.naturalHeight) {
        imgElement.width = imgElement.naturalWidth
        imgElement.height = imgElement.naturalHeight
      }
    })

    // Réserver l'espace pour les fonts
    if ('fonts' in document) {
      (document as any).fonts.ready.then(() => {
        document.body.classList.add('fonts-loaded')
      })
    }

    // Observer les changements de layout
    if ('LayoutShift' in window && 'PerformanceObserver' in window) {
      let clsScore = 0
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (!(entry as any).hadRecentInput) {
            clsScore += (entry as any).value
            if (process.env.NODE_ENV === 'development' && clsScore > 0.1) {
              console.warn(`⚠️ High CLS detected: ${clsScore.toFixed(3)}`)
            }
          }
        }
      })

      try {
        observer.observe({ type: 'layout-shift', buffered: true })
        return () => observer.disconnect()
      } catch (e) {
        // Ignorer les erreurs
      }
    }
  }, [])
}

// Hook combiné pour toutes les optimisations
export const usePerformanceOptimizations = () => {
  useWebVitals()
  useOptimizeINP()
  useOptimizeCLS()
}

export default useWebVitals