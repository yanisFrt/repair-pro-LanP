/* eslint-disable @typescript-eslint/no-explicit-any */
import Script from 'next/script'

interface StructuredDataProps {
  data: any
}

export default function StructuredData({ data }: StructuredDataProps) {
  return (
    <Script
      id="structured-data"
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data),
      }}
    />
  )
}

// Schema pour l'organisation
export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": "https://repair-pro.tech/#organization",
  name: "Repair Pro",
  url: "https://repair-pro.tech",
  logo: {
    "@type": "ImageObject",
    url: "https://repair-pro.tech/LOGO-V2-nobg.png",
    width: 512,
    height: 512
  },
  sameAs: [
    "https://www.facebook.com/repairpro",
    "https://twitter.com/repairpro",
    "https://www.linkedin.com/company/repair-pro",
    "https://www.instagram.com/repairpro"
  ],
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+33-1-XX-XX-XX-XX",
    contactType: "customer service",
    areaServed: ["FR", "BE", "CH", "LU", "MA", "TN", "DZ"],
    availableLanguage: ["French", "English", "Spanish", "Arabic"]
  },
  address: {
    "@type": "PostalAddress",
    addressCountry: "FR",
    addressLocality: "Paris",
    postalCode: "75000"
  }
}

// Schema pour l'application logicielle
export const softwareApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "@id": "https://repair-pro.tech/#software",
  name: "Repair Pro",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web, Windows, macOS, Linux",
  offers: [
    {
      "@type": "Offer",
      name: "Version Gratuite",
      price: "0",
      priceCurrency: "EUR",
      description: "Version gratuite avec fonctionnalités de base"
    },
    {
      "@type": "Offer",
      name: "Version Premium",
      price: "29.99",
      priceCurrency: "EUR",
      priceValidUntil: "2025-12-31",
      description: "Version premium avec toutes les fonctionnalités avancées"
    },
    {
      "@type": "Offer",
      name: "Version Entreprise",
      price: "99.99",
      priceCurrency: "EUR",
      priceValidUntil: "2025-12-31",
      description: "Solution entreprise avec support prioritaire"
    }
  ],
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.8",
    ratingCount: "1250",
    bestRating: "5",
    worstRating: "1"
  },
  screenshot: "https://repair-pro.tech/screenshot.jpg",
  softwareVersion: "2.0",
  datePublished: "2023-01-01",
  dateModified: "2024-12-01",
  publisher: {
    "@type": "Organization",
    "@id": "https://repair-pro.tech/#organization"
  },
  potentialAction: {
    "@type": "ViewAction",
    target: "https://repair-pro.tech/download",
    name: "Télécharger Repair Pro"
  }
}

// Schema pour la page web
export const webPageSchema = (title: string, description: string, url: string) => ({
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": url,
  url: url,
  name: title,
  description: description,
  isPartOf: {
    "@type": "WebSite",
    "@id": "https://repair-pro.tech/#website",
    url: "https://repair-pro.tech",
    name: "Repair Pro",
    description: "Plateforme de gestion d'atelier de réparation",
    publisher: {
      "@type": "Organization",
      "@id": "https://repair-pro.tech/#organization"
    },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: "https://repair-pro.tech/search?q={search_term_string}"
      },
      "query-input": "required name=search_term_string"
    },
    inLanguage: [
      {
        "@type": "Language",
        name: "French",
        alternateName: "fr"
      },
      {
        "@type": "Language",
        name: "English",
        alternateName: "en"
      },
      {
        "@type": "Language",
        name: "Spanish",
        alternateName: "es"
      },
      {
        "@type": "Language",
        name: "Arabic",
        alternateName: "ar"
      }
    ]
  },
  breadcrumb: {
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Accueil",
        item: "https://repair-pro.tech"
      }
    ]
  },
  mainEntity: {
    "@type": "SoftwareApplication",
    "@id": "https://repair-pro.tech/#software"
  }
})

// Schema pour FAQ
export const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Qu'est-ce que Repair Pro ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Repair Pro est une solution complète de gestion d'atelier de réparation qui permet de gérer les clients, les réparations, le stock et la facturation depuis une interface unique et intuitive."
      }
    },
    {
      "@type": "Question",
      name: "Combien coûte Repair Pro ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Repair Pro propose trois plans : une version gratuite avec les fonctionnalités de base, une version Premium à 29,99€/mois, et une version Entreprise à 99,99€/mois avec support prioritaire."
      }
    },
    {
      "@type": "Question",
      name: "Repair Pro est-il compatible avec mon système ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Repair Pro est une application web qui fonctionne sur tous les systèmes d'exploitation modernes (Windows, macOS, Linux) via un navigateur web. Une application desktop est également disponible."
      }
    },
    {
      "@type": "Question",
      name: "Puis-je essayer Repair Pro gratuitement ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Oui, nous proposons un essai gratuit de 30 jours avec accès à toutes les fonctionnalités premium. Aucune carte bancaire n'est requise pour commencer l'essai."
      }
    },
    {
      "@type": "Question",
      name: "Comment importer mes données existantes ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Repair Pro permet d'importer facilement vos données depuis Excel, CSV ou d'autres logiciels de gestion. Notre équipe support peut vous accompagner dans la migration de vos données."
      }
    }
  ]
}

// Schema pour les avis
export const reviewSchema = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: "Repair Pro",
  review: [
    {
      "@type": "Review",
      reviewRating: {
        "@type": "Rating",
        ratingValue: "5",
        bestRating: "5"
      },
      author: {
        "@type": "Person",
        name: "Jean Dupont"
      },
      datePublished: "2024-11-15",
      reviewBody: "Excellent logiciel qui a révolutionné la gestion de mon atelier. Interface intuitive et support réactif."
    },
    {
      "@type": "Review",
      reviewRating: {
        "@type": "Rating",
        ratingValue: "5",
        bestRating: "5"
      },
      author: {
        "@type": "Person",
        name: "Marie Martin"
      },
      datePublished: "2024-11-20",
      reviewBody: "Repair Pro nous fait gagner un temps précieux. La gestion des stocks est particulièrement bien pensée."
    }
  ],
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.8",
    reviewCount: "1250"
  }
}

// Schema pour les services
export const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  serviceType: "Software as a Service",
  provider: {
    "@type": "Organization",
    "@id": "https://repair-pro.tech/#organization"
  },
  name: "Repair Pro - Logiciel de Gestion d'Atelier",
  description: "Solution SaaS complète pour la gestion d'atelier de réparation",
  areaServed: {
    "@type": "Place",
    name: "France, Belgique, Suisse, Luxembourg, Maroc, Tunisie, Algérie"
  },
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Plans Repair Pro",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Plan Gratuit"
        }
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Plan Premium"
        }
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Plan Entreprise"
        }
      }
    ]
  }
}