// app/blog/[slug]/page.tsx
import { Metadata } from "next";
import Link from "next/link";
import {
  Calendar,
  Clock,
  User,
  ArrowLeft,
  Share2,
  Facebook,
  Twitter,
  Linkedin,
} from "lucide-react";
import { notFound } from "next/navigation";
import { Article, articles } from "./articles";
import { MonitorThisPage } from "@/components/registerThisPageAnalytics";

// Get article by slug
function getArticleBySlug(slug: string): Article | undefined {
  return articles.find((article) => article.slug === slug);
}

// Get related articles
function getRelatedArticles(currentSlug: string): Article[] {
  return articles.filter((article) => article.slug !== currentSlug).slice(0, 2);
}

// Generate static params for all articles
export async function generateStaticParams() {
  return articles.map((article) => ({
    slug: article.slug,
  }));
}

// Generate metadata for SEO
export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const article = getArticleBySlug(params.slug);

  if (!article) {
    return {
      title: "Article non trouvé",
    };
  }

  return {
    title: `${article.title} | Blog Repair Pro`,
    description: article.excerpt,
    keywords: article.tags.join(", "),
    authors: [{ name: article.author }],
    openGraph: {
      title: article.title,
      description: article.excerpt,
      type: "article",
      publishedTime: article.date,
      authors: [article.author],
      locale: "fr_FR",
      tags: article.tags,
    },
    alternates: {
      canonical: `https://repair-pro.tech/blog/${article.slug}`,
    },
  };
}

export default function ArticlePage({ params }: { params: { slug: string } }) {
  const article = getArticleBySlug(params.slug);

  if (!article) {
    notFound();
  }

  const relatedArticles = getRelatedArticles(params.slug);

  return (
    <main className="min-h-screen bg-slate-800">
      <MonitorThisPage name={`blog_${params.slug.toLowerCase()}`} />
      {/* Back Button */}
      <div className="bg-slate-900 border-b border-slate-600">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-white/80 hover:text-white/60 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Retour au blog
          </Link>
        </div>
      </div>

      {/* Article Header */}
      <article
        className="max-w-4xl mx-auto px-6 py-12"
        itemScope
        itemType="https://schema.org/BlogPosting"
      >
        {/* Category Badge */}
        <div className="mb-6">
          <span className="inline-block bg-custom-teal/40 text-white px-4 py-1 rounded-full text-sm font-semibold">
            {article.category}
          </span>
        </div>

        {/* Title */}
        <h1
          className="text-4xl md:text-5xl font-bold text-white/80 mb-6 leading-tight"
          itemProp="headline"
        >
          {article.title}
        </h1>

        {/* Meta Information */}
        <div className="flex flex-wrap items-center gap-6 text-slate-600 mb-8 pb-8 border-b border-slate-600">
          <div className="flex items-center gap-2">
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-black font-bold">
              {article.author.charAt(0)}
            </div>
            <div>
              <p className="font-semibold text-white/60" itemProp="author">
                {article.author}
              </p>
              <p className="text-sm text-white/40">{article.authorBio}</p>
            </div>
          </div>
          <div className="flex items-center gap-4 text-sm text-white/60">
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
        </div>

        {/* Featured Image */}
        <div className="bg-slate-900 rounded-2xl p-16 mb-12 flex items-center justify-center">
          <div className="text-white text-center">
            <div className="text-8xl mb-4">📱</div>
            <p className="text-xl font-semibold">{article.category}</p>
          </div>
        </div>

        {/* Article Content */}
        <div
          className="prose prose-lg prose-slate max-w-none mb-12"
          itemProp="articleBody"
          dangerouslySetInnerHTML={{
            __html: article.content
              .split("\n\n")
              .map((paragraph) => {
                if (paragraph.startsWith("## ")) {
                  return `<h2 class="text-3xl font-bold text-white/80 mt-12 mb-6">${paragraph.replace("## ", "")}</h2>`;
                } else if (paragraph.startsWith("### ")) {
                  return `<h3 class="text-2xl font-bold text-white/80 mt-8 mb-4">${paragraph.replace("### ", "")}</h3>`;
                } else if (paragraph.startsWith("- ")) {
                  const items = paragraph
                    .split("\n")
                    .map((item) => `<li class="ml-6 text-white/60">${item.replace("- ", "")}</li>`)
                    .join("");
                  return `<ul class="list-disc ml-6 space-y-2 mb-6">${items}</ul>`;
                } else {
                  return `<p class="text-white/60 leading-relaxed mb-6">${paragraph}</p>`;
                }
              })
              .join(""),
          }}
        />

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-8">
          {article.tags.map((tag, index) => (
            <span
              key={index}
              className="bg-slate-100 text-slate-700 px-3 py-1 rounded-full text-sm"
            >
              #{tag}
            </span>
          ))}
        </div>

        {/* Share Buttons */}
        <div className="border-t border-b border-slate-200 py-6 mb-12">
          <div className="flex items-center justify-between">
            <p className="text-white/60 font-semibold flex items-center gap-2">
              <Share2 className="w-5 h-5" />
              Partager cet article
            </p>
            <div className="flex gap-3">
              <button className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-lg transition-colors">
                <Facebook className="w-5 h-5" />
              </button>
              <button className="bg-sky-500 hover:bg-sky-600 text-white p-2 rounded-lg transition-colors">
                <Twitter className="w-5 h-5" />
              </button>
              <button className="bg-blue-700 hover:bg-blue-800 text-white p-2 rounded-lg transition-colors">
                <Linkedin className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Author Bio */}
        <div className="bg-slate-600 rounded-2xl p-8 mb-12">
          <div className="flex items-start gap-4">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center text-white font-bold text-2xl flex-shrink-0">
              <User />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white/80 mb-2">À propos de {article.author}</h3>
              <p className="text-white/60">{article.authorBio}</p>
            </div>
          </div>
        </div>
      </article>

      {/* Related Articles */}
      {relatedArticles.length > 0 && (
        <section className="bg-slate-900 py-16 px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-white/80 mb-8">Articles similaires</h2>
            <div className="grid md:grid-cols-2 gap-8">
              {relatedArticles.map((related) => (
                <Link
                  key={related.id}
                  href={`/blog/${related.slug}`}
                  className="bg-slate-800 rounded-2xl p-6 hover:shadow-lg transition-shadow"
                >
                  <span className="inline-block bg-custom-teal/40 text-white px-3 py-1 rounded-full text-sm font-semibold mb-4">
                    {related.category}
                  </span>
                  <h3 className="text-xl font-bold text-white/80 mb-3 hover:text-custom-teal transition-colors">
                    {related.title}
                  </h3>
                  <p className="text-white/60 mb-4 line-clamp-2">{related.excerpt}</p>
                  <div className="flex items-center gap-4 text-sm text-white/40">
                    <span className="flex items-center gap-1">
                      <User className="w-4 h-4" />
                      {related.author}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {related.readTime}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="bg-slate-800/90 text-white py-16 px-6 ">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-4">Prêt à transformer votre atelier ?</h2>
          <p className="text-xl text-blue-100 mb-8">
            Rejoignez des centaines d&apos;ateliers qui utilisent déjà Repair PRO
          </p>
          <Link
            href="/repair-pro#pricing"
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
            "@type": "BlogPosting",
            headline: article.title,
            description: article.excerpt,
            image: `https://repairpro.com${article.image}`,
            datePublished: article.date,
            dateModified: article.date,
            author: {
              "@type": "Person",
              name: article.author,
              description: article.authorBio,
            },
            publisher: {
              "@type": "Organization",
              name: "RepairPRO",
              logo: {
                "@type": "ImageObject",
                url: "https://repairpro.com/logo.png",
              },
            },
            mainEntityOfPage: {
              "@type": "WebPage",
              "@id": `https://repairpro.com/blog/${article.slug}`,
            },
            keywords: article.tags.join(", "),
            articleSection: article.category,
            wordCount: article.content.split(" ").length,
          }),
        }}
      />
    </main>
  );
}
