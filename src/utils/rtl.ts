/**
 * Utility functions for handling RTL (Right-to-Left) text direction
 * Specifically for Arabic language support
 */
import React from 'react';

/**
 * Wraps numbers in a span with proper RTL handling
 * This prevents numbers from being reversed in Arabic text
 */
export function wrapNumbers(text: string): string {
  // Regular expression to match numbers, including decimals and currency
  const numberPattern = /(\d+(?:[.,]\d+)?)/g;

  return text.replace(numberPattern, '<span class="numeric">$1</span>');
}

/**
 * Formats a number for display in RTL context
 * Ensures numbers stay in LTR direction even in RTL layouts
 */
export function formatRTLNumber(value: number | string): React.ReactElement {
  return React.createElement('span', { className: 'numeric', dir: 'ltr' }, value);
}

/**
 * Formats price with currency for RTL display
 * @param price - The price value
 * @param currency - The currency code (EUR, USD, etc.)
 * @param locale - The locale for formatting
 */
export function formatRTLPrice(
  price: number | string,
  currency: string = 'EUR',
  locale: string = 'fr-FR'
): string {
  // For Arabic locale, use Arabic numerals but keep LTR direction
  if (locale === 'ar' || locale === 'ar-SA') {
    // Keep Western numerals for prices to avoid confusion
    const formattedPrice = typeof price === 'number'
      ? price.toFixed(2)
      : price;

    return `${formattedPrice} ${currency}`;
  }

  // For other locales, use standard formatting
  if (typeof price === 'number') {
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: currency,
    }).format(price);
  }

  return `${price} ${currency}`;
}

/**
 * Utility class names for RTL numeric content
 */
export const rtlNumericClasses = {
  price: 'numeric price-value',
  stat: 'numeric stat-value',
  percentage: 'numeric percentage-value',
  phone: 'numeric tel',
  date: 'numeric date',
  code: 'numeric code-value'
};

/**
 * Check if current language is RTL
 */
export function isRTLLanguage(language: string): boolean {
  const rtlLanguages = ['ar', 'he', 'fa', 'ur'];
  return rtlLanguages.includes(language);
}

/**
 * Get text direction based on language
 */
export function getTextDirection(language: string): 'rtl' | 'ltr' {
  return isRTLLanguage(language) ? 'rtl' : 'ltr';
}