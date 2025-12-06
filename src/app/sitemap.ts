/* eslint-disable @typescript-eslint/no-explicit-any */
import { MetadataRoute } from 'next'

// Types pour les priorités des pages
type PagePriority = 0.0 | 0.1 | 0.2 | 0.3 | 0.4 | 0.5 | 0.6 | 0.7 | 0.8 | 0.9 | 1.0

// Fonction pour obtenir les articles de blog dynamiquement
async function getBlogPosts() {
  // À implémenter quand vous aurez une source de données pour les articles
  // Pour l'instant, retourne un tableau vide
  return []
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://repair-pro.tech'
  const currentDate = new Date().toISOString()

  // Pages statiques avec leurs métadonnées
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 1.0 as PagePriority,
    },
    {
      url: `${baseUrl}/download`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.9 as PagePriority,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.8 as PagePriority,
    },
    {
      url: `${baseUrl}/#pricing`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.8 as PagePriority,
    },
    {
      url: `${baseUrl}/#features`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.7 as PagePriority,
    },
    {
      url: `${baseUrl}/#about`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.6 as PagePriority,
    },
    {
      url: `${baseUrl}/#faq`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.6 as PagePriority,
    },
    {
      url: `${baseUrl}/#contact`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.5 as PagePriority,
    },
  ]

  // Récupération des articles de blog
  const blogPosts = await getBlogPosts()

  // Génération des URLs pour les articles de blog
  const blogPages: MetadataRoute.Sitemap = blogPosts.map((post: any) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: post.updatedAt || post.createdAt || currentDate,
    changeFrequency: 'monthly',
    priority: 0.7 as PagePriority,
  }))

  // Ajout des variantes de langue pour chaque page
  const languages = ['fr', 'en', 'es', 'ar']
  const allPagesWithLanguages: MetadataRoute.Sitemap = []

  // Pour chaque page statique, créer les variantes de langue
  staticPages.forEach(page => {
    // Page par défaut (français)
    allPagesWithLanguages.push(page)

    // Variantes de langue
    languages.slice(1).forEach(lang => {
      allPagesWithLanguages.push({
        ...page,
        url: page.url.replace(baseUrl, `${baseUrl}/${lang}`),
        priority: ((page.priority || 0.5) * 0.9) as PagePriority,
      })
    })
  })

  // Ajouter les articles de blog avec leurs variantes de langue
  blogPages.forEach(page => {
    allPagesWithLanguages.push(page)

    languages.slice(1).forEach(lang => {
      allPagesWithLanguages.push({
        ...page,
        url: page.url.replace(baseUrl, `${baseUrl}/${lang}`),
        priority: ((page.priority || 0.5) * 0.9) as PagePriority,
      })
    })
  })

  return allPagesWithLanguages
}