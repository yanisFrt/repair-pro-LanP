/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import Head from 'next/head'
import { usePathname } from 'next/navigation'
import { useLanguage } from '@/contexts/LanguageContext'

interface SEOProps {
  title?: string
  description?: string
  keywords?: string[]
  image?: string
  article?: boolean
  author?: string
  publishedTime?: string
  modifiedTime?: string
  canonicalUrl?: string
  noindex?: boolean
  nofollow?: boolean
  schema?: any
}

const SEO = ({
  title = "Repair Pro - Logiciel de Gestion d'Atelier de Réparation",
  description = "Solution complète pour gérer votre atelier de réparation",
  keywords = [],
  image = "/og-image.jpg",
  article = false,
  author,
  publishedTime,
  modifiedTime,
  canonicalUrl,
  noindex = false,
  nofollow = false,
  schema
}: SEOProps) => {
  const pathname = usePathname()
  const { language } = useLanguage()

  const siteUrl = "https://repair-pro.tech"
  const fullUrl = `${siteUrl}${pathname}`
  const imageUrl = image.startsWith('http') ? image : `${siteUrl}${image}`

  // Traductions des métadonnées selon la langue
  const getLocalizedMeta = () => {
    switch(language) {
      case 'en':
        return {
          title: title.includes('Repair Pro') ? title.replace(/Réparation/g, 'Repair').replace(/Atelier/g, 'Workshop') : title,
          description: description.includes('réparation') ? description.replace(/réparation/g, 'repair').replace(/atelier/g, 'workshop') : description,
          locale: 'en_US'
        }
      case 'es':
        return {
          title: title.includes('Repair Pro') ? title.replace(/Réparation/g, 'Reparación').replace(/Atelier/g, 'Taller') : title,
          description: description.includes('réparation') ? description.replace(/réparation/g, 'reparación').replace(/atelier/g, 'taller') : description,
          locale: 'es_ES'
        }
      case 'ar':
        return {
          title: title.includes('Repair Pro') ? 'Repair Pro - برنامج إدارة ورشة الإصلاح' : title,
          description: 'حل شامل لإدارة ورشة الإصلاح الخاصة بك',
          locale: 'ar_SA'
        }
      default:
        return {
          title,
          description,
          locale: 'fr_FR'
        }
    }
  }

  const localizedMeta = getLocalizedMeta()

  // Génération des balises hreflang
  const hreflangTags = [
    { hreflang: 'fr', href: `${siteUrl}${pathname}` },
    { hreflang: 'en', href: `${siteUrl}/en${pathname}` },
    { hreflang: 'es', href: `${siteUrl}/es${pathname}` },
    { hreflang: 'ar', href: `${siteUrl}/ar${pathname}` },
    { hreflang: 'x-default', href: `${siteUrl}${pathname}` }
  ]

  // Génération du schema JSON-LD personnalisé
  const jsonLdSchema = schema || {
    '@context': 'https://schema.org',
    '@type': article ? 'Article' : 'WebPage',
    headline: localizedMeta.title,
    description: localizedMeta.description,
    image: imageUrl,
    url: fullUrl,
    ...(author && { author: { '@type': 'Person', name: author } }),
    ...(publishedTime && { datePublished: publishedTime }),
    ...(modifiedTime && { dateModified: modifiedTime }),
    publisher: {
      '@type': 'Organization',
      name: 'Repair Pro',
      logo: {
        '@type': 'ImageObject',
        url: `${siteUrl}/LOGO-V2-nobg.png`
      }
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': fullUrl
    }
  }

  return (
    <Head>
      {/* Balises Meta de base */}
      <title>{localizedMeta.title}</title>
      <meta name="description" content={localizedMeta.description} />
      {keywords.length > 0 && (
        <meta name="keywords" content={keywords.join(', ')} />
      )}
      <meta name="author" content={author || 'Repair Pro Team'} />

      {/* Balises robots */}
      <meta
        name="robots"
        content={`${noindex ? 'noindex' : 'index'}, ${nofollow ? 'nofollow' : 'follow'}, max-snippet:-1, max-image-preview:large, max-video-preview:-1`}
      />

      {/* Canonical URL */}
      <link rel="canonical" href={canonicalUrl || fullUrl} />

      {/* Balises hreflang */}
      {hreflangTags.map(tag => (
        <link
          key={tag.hreflang}
          rel="alternate"
          hrefLang={tag.hreflang}
          href={tag.href}
        />
      ))}

      {/* Open Graph */}
      <meta property="og:type" content={article ? 'article' : 'website'} />
      <meta property="og:title" content={localizedMeta.title} />
      <meta property="og:description" content={localizedMeta.description} />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:site_name" content="Repair Pro" />
      <meta property="og:locale" content={localizedMeta.locale} />

      {article && (
        <>
          {author && <meta property="article:author" content={author} />}
          {publishedTime && <meta property="article:published_time" content={publishedTime} />}
          {modifiedTime && <meta property="article:modified_time" content={modifiedTime} />}
        </>
      )}

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={localizedMeta.title} />
      <meta name="twitter:description" content={localizedMeta.description} />
      <meta name="twitter:image" content={imageUrl} />
      <meta name="twitter:site" content="@repairpro" />
      <meta name="twitter:creator" content="@repairpro" />

      {/* Schema JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLdSchema)
        }}
      />

      {/* Préconnexion aux domaines tiers */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />

      {/* Balises supplémentaires pour l'optimisation mobile */}
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      <meta name="apple-mobile-web-app-title" content="Repair Pro" />

      {/* Thème de couleur */}
      <meta name="theme-color" content="#14b8a6" />
      <meta name="msapplication-TileColor" content="#14b8a6" />
    </Head>
  )
}

export default SEO