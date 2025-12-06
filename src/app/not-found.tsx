"use client"

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Home, ArrowLeft, Search, FileQuestion } from 'lucide-react'
import { useTranslation } from '@/hooks/useTranslation'
import { useEffect, useState } from 'react'

export default function NotFound() {
  const router = useRouter()
  const { t } = useTranslation()
  const [suggestions, setSuggestions] = useState<Array<{ title: string; href: string }>>([])

  useEffect(() => {
    // Suggestions de pages basées sur la langue
    setSuggestions([
      { title: t('nav.home'), href: '/' },
      { title: t('common.download'), href: '/download' },
      { title: t('nav.pricing'), href: '/#pricing' },
      { title: t('nav.features'), href: '/#features' },
      { title: t('nav.blog'), href: '/blog' },
      { title: t('faq.title'), href: '/#faq' },
    ])
  }, [t])

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 flex items-center justify-center px-4">
      <div className="max-w-2xl w-full text-center">
        {/* Animation 404 */}
        <div className="relative mb-8">
          <h1 className="text-9xl font-bold text-gray-700 opacity-20">404</h1>
          <div className="absolute inset-0 flex items-center justify-center">
            <FileQuestion className="w-24 h-24 text-teal-500 animate-bounce" />
          </div>
        </div>

        {/* Message d'erreur */}
        <h2 className="text-3xl font-bold text-white mb-4">
          Page introuvable
        </h2>
        <p className="text-gray-300 mb-8 text-lg">
          Désolé, la page que vous recherchez n&apos;existe pas ou a été déplacée.
        </p>

        {/* Boutons d'action */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <button
            onClick={() => router.back()}
            className="flex items-center justify-center gap-2 px-6 py-3 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Retour
          </button>
          <Link
            href="/"
            className="flex items-center justify-center gap-2 px-6 py-3 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition-colors"
          >
            <Home className="w-5 h-5" />
            Retour à l&apos;accueil
          </Link>
        </div>

        {/* Suggestions de pages */}
        <div className="bg-gray-800/50 rounded-xl p-6 backdrop-blur-sm">
          <h3 className="text-xl font-semibold text-white mb-4 flex items-center justify-center gap-2">
            <Search className="w-5 h-5 text-teal-500" />
            Pages suggérées
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {suggestions.map((suggestion) => (
              <Link
                key={suggestion.href}
                href={suggestion.href}
                className="px-4 py-2 bg-gray-700/50 text-gray-300 rounded-lg hover:bg-teal-500/20 hover:text-teal-400 transition-all duration-200"
              >
                {suggestion.title}
              </Link>
            ))}
          </div>
        </div>

        {/* Informations de contact */}
        <div className="mt-12 text-gray-400">
          <p className="text-sm">
            Besoin d&apos;aide ?{' '}
            <Link
              href="/#contact"
              className="text-teal-500 hover:text-teal-400 underline"
            >
              Contactez-nous
            </Link>
          </p>
        </div>
      </div>

      {/* Effet de fond animé */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-teal-500 opacity-10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500 opacity-10 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>
    </div>
  )
}