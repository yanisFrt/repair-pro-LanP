/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useEffect } from 'react'
import { usePerformanceOptimizations } from '@/hooks/useWebVitals'

const PerformanceMonitor = () => {
  // Utiliser les optimisations de performance
  usePerformanceOptimizations()

  useEffect(() => {
    // Monitoring des erreurs JavaScript
    const handleError = (event: ErrorEvent) => {
      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', 'exception', {
          description: `${event.message} at ${event.filename}:${event.lineno}:${event.colno}`,
          fatal: false,
        })
      }
    }

    // Monitoring des rejets de promesses
    const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', 'exception', {
          description: `Unhandled Promise Rejection: ${event.reason}`,
          fatal: false,
        })
      }
    }

    // Monitoring de la performance de navigation
    const monitorNavigationTiming = () => {
      if ('performance' in window && 'getEntriesByType' in performance) {
        const navigationEntries = performance.getEntriesByType('navigation') as PerformanceNavigationTiming[]
        if (navigationEntries.length > 0) {
          const navigation = navigationEntries[0]

          // Calculer les métriques importantes
          const metrics = {
            dns: navigation.domainLookupEnd - navigation.domainLookupStart,
            tcp: navigation.connectEnd - navigation.connectStart,
            request: navigation.responseStart - navigation.requestStart,
            response: navigation.responseEnd - navigation.responseStart,
            dom: navigation.domComplete - navigation.domInteractive,
            load: navigation.loadEventEnd - navigation.loadEventStart,
            total: navigation.loadEventEnd - navigation.fetchStart,
          }

          // Envoyer à Google Analytics
          if (typeof window !== 'undefined' && (window as any).gtag) {
            Object.entries(metrics).forEach(([key, value]) => {
              (window as any).gtag('event', 'timing_complete', {
                name: key,
                value: Math.round(value),
                event_category: 'Navigation Timing',
              })
            })
          }
        }
      }
    }

    // Monitoring de la mémoire (si disponible)
    const monitorMemory = () => {
      if ('memory' in performance) {
        const memory = (performance as any).memory
        if (memory.usedJSHeapSize > memory.jsHeapSizeLimit * 0.9) {
          console.warn('⚠️ High memory usage detected')
          if (typeof window !== 'undefined' && (window as any).gtag) {
            (window as any).gtag('event', 'high_memory_usage', {
              used: memory.usedJSHeapSize,
              limit: memory.jsHeapSizeLimit,
              event_category: 'Performance',
            })
          }
        }
      }
    }

    // Monitoring de la connexion réseau
    const monitorConnection = () => {
      if ('connection' in navigator) {
        const connection = (navigator as any).connection

        // Logger les informations de connexion
        const connectionInfo = {
          effectiveType: connection.effectiveType,
          downlink: connection.downlink,
          rtt: connection.rtt,
          saveData: connection.saveData,
        }

        if (typeof window !== 'undefined' && (window as any).gtag) {
          (window as any).gtag('event', 'connection_info', {
            ...connectionInfo,
            event_category: 'Network',
          })
        }

        // Adapter le contenu selon la connexion
        if (connection.effectiveType === '2g' || connection.saveData) {
          document.body.classList.add('low-bandwidth')
        }
      }
    }

    // Monitoring de la visibilité de la page
    const handleVisibilityChange = () => {
      const state = document.visibilityState

      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', 'visibility_change', {
          state: state,
          event_category: 'Engagement',
        })
      }

      // Pause des animations si la page est cachée
      if (state === 'hidden') {
        document.body.classList.add('page-hidden')
      } else {
        document.body.classList.remove('page-hidden')
      }
    }

    // Attacher les event listeners
    window.addEventListener('error', handleError)
    window.addEventListener('unhandledrejection', handleUnhandledRejection)
    document.addEventListener('visibilitychange', handleVisibilityChange)

    // Exécuter les monitors après le chargement
    if (document.readyState === 'complete') {
      monitorNavigationTiming()
      monitorMemory()
      monitorConnection()
    } else {
      window.addEventListener('load', () => {
        monitorNavigationTiming()
        monitorMemory()
        monitorConnection()
      })
    }

    // Monitoring périodique de la mémoire
    const memoryInterval = setInterval(monitorMemory, 30000) // Toutes les 30 secondes

    // Cleanup
    return () => {
      window.removeEventListener('error', handleError)
      window.removeEventListener('unhandledrejection', handleUnhandledRejection)
      document.removeEventListener('visibilitychange', handleVisibilityChange)
      clearInterval(memoryInterval)
    }
  }, [])

  // Ce composant ne rend rien visuellement
  return null
}

export default PerformanceMonitor