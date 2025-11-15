// app/blog/page.tsx
import { Metadata } from "next";

import Link from "next/link";
import { Calendar, Clock, User, ArrowRight } from "lucide-react";
import { articles } from "./[slug]/articles";

// SEO Metadata
export const metadata: Metadata = {
  title: "Blog Repair Pro - Conseils et Actualités sur la Réparation de Téléphones",
  description:
    "Découvrez nos articles sur la réparation de téléphones, les avantages de Repair Pro et comment optimiser la gestion de votre atelier de réparation.",
  keywords:
    "réparation téléphone, gestion atelier réparation, Repair Pro, maintenance smartphone, économie circulaire",
  openGraph: {
    title: "Blog Repair Pro - Conseils et Actualités",
    description:
      "Découvrez nos articles sur la réparation de téléphones et les avantages de Repair Pro",
    type: "website",
    locale: "fr_FR",
  },
  alternates: {
    canonical: "https://repair-pro.tech/blog",
    languages: {
      "fr-FR": "https://repair-pro.tech/fr/blog",
    },
  },
};

export default function BlogPage() {
  return (
    <div>
      <main className="min-h-screen  bg-slate-50">
        {/* Hero Section */}
        <section className="bg-gradient-to-br  from-slate-900 via-slate-800 to-slate-900 text-white pt-28 pb-10 md:py-40 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-2xl md:text-6xl font-bold mb-6">Blog Repair PRO</h1>
            <p className="md:text-xl text-slate-300 max-w-2xl mx-auto">
              Conseils d&apos;experts, actualités du secteur et guides pratiques pour optimiser
              votre atelier de réparation
            </p>
          </div>
        </section>

        {/* Articles Section */}
        <div className="bg-gray-900">
          <section className=" max-w-6xl mx-auto px-6 py-16">
            <div className="space-y-12">
              {articles.map((article) => (
                <article
                  key={article.id}
                  className="bg-slate-800 rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
                  itemScope
                  itemType="https://schema.org/BlogPosting"
                >
                  <div className="md:flex">
                    {/* Image */}
                    <div className="md:w-2/5 bg-slate-500 flex items-center justify-center p-12">
                      <div className="text-white text-center">
                        <div className="text-6xl mb-4">📱</div>
                        <p className="text-sm font-semibold uppercase tracking-wider">
                          {article.category}
                        </p>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="md:w-3/5 p-8 md:p-10">
                      {/* Meta */}
                      <div className="flex flex-wrap items-center gap-4 text-sm text-white/60 mb-4">
                        <span className="flex items-center gap-1">
                          <User className="w-4 h-4" />
                          <span itemProp="author">{article.author}</span>
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          <time itemProp="datePublished" dateTime={article.date}>
                            {new Date(article.date).toLocaleDateString("fr-FR", {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            })}
                          </time>
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {article.readTime}
                        </span>
                      </div>

                      {/* Title */}
                      <h2
                        className="text-3xl font-bold text-white/80 mb-4 hover:text-custom-teal/80 transition-colors"
                        itemProp="headline"
                      >
                        <Link href={`/blog/${article.slug}`}>{article.title}</Link>
                      </h2>

                      {/* Excerpt */}
                      <p className="text-white/60 leading-relaxed mb-6" itemProp="description">
                        {article.excerpt}
                      </p>

                      {/* Content Preview */}
                      <div className="prose prose-slate max-w-none mb-6" itemProp="articleBody">
                        <p className="text-white/60 line-clamp-4">
                          {article.content.substring(0, 300)}...
                        </p>
                      </div>

                      {/* CTA */}
                      <Link
                        href={`/blog/${article.slug}`}
                        className="inline-flex items-center gap-2 text-custom-teal font-semibold hover:custom-teal/40 transition-colors group"
                      >
                        Lire l&apos;article complet
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>
        </div>
        {/* CTA Section */}
        <section className="bg-slate-800/90 text-white py-16 px-6 ">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-4">Prêt à transformer votre atelier ?</h2>
            <p className="text-xl text-blue-100 mb-8">
              Rejoignez des centaines d&apos;ateliers qui utilisent déjà Repair PRO
            </p>
            <Link
              href="/#pricing"
              className="inline-block bg-white text-black px-8 py-4 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
            >
              Démarrer l&apos;essai gratuit
            </Link>
          </div>
        </section>

        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Blog",
              name: "Blog Repair PRO",
              description:
                "Conseils et actualités sur la réparation de téléphones et la gestion d&apos;ateliers",
              url: "https://repair-pro.tech/blog",
              inLanguage: "fr-FR",
              blogPost: articles.map((article) => ({
                "@type": "BlogPosting",
                headline: article.title,
                description: article.excerpt,
                author: {
                  "@type": "Person",
                  name: article.author,
                },
                datePublished: article.date,
                image: `https://repair-pro.tech${article.image}`,
                url: `https://repair-pro.tech/blog/${article.slug}`,
              })),
            }),
          }}
        />
      </main>
    </div>
  );
}
