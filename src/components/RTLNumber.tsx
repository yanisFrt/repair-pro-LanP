"use client";

import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

interface RTLNumberProps {
  value: number | string;
  className?: string;
  /** Type of numeric content for specific styling */
  type?: 'price' | 'percentage' | 'stat' | 'phone' | 'date' | 'general';
  /** Currency symbol to display with price type */
  currency?: string;
  /** Whether to format the number */
  format?: boolean;
  /** Number of decimal places for formatting */
  decimals?: number;
}

/**
 * Component to properly display numbers in RTL (Arabic) contexts
 * Ensures numbers always display left-to-right even in RTL layouts
 */
export const RTLNumber: React.FC<RTLNumberProps> = ({
  value,
  className = '',
  type = 'general',
  currency,
  format = false,
  decimals = 2
}) => {
  const { language } = useLanguage();
  const isArabic = language === 'ar';

  // Format the value if needed
  let displayValue: string | number = value;

  if (format && typeof value === 'number') {
    if (type === 'price') {
      displayValue = value.toFixed(decimals);
    } else if (type === 'percentage') {
      displayValue = `${value}%`;
    } else {
      displayValue = value.toLocaleString('en-US');
    }
  }

  // Build the CSS classes
  const typeClasses = {
    price: 'price-value',
    percentage: 'percentage',
    stat: 'stats',
    phone: 'tel',
    date: 'date',
    general: ''
  };

  const combinedClassName = `numeric ${typeClasses[type]} ${className}`.trim();

  // For price type with currency
  if (type === 'price' && currency) {
    return (
      <span
        className={combinedClassName}
        dir={isArabic ? 'ltr' : undefined}
        style={isArabic ? { unicodeBidi: 'isolate' } : undefined}
      >
        {displayValue} {currency}
      </span>
    );
  }

  // For all other types
  return (
    <span
      className={combinedClassName}
      dir={isArabic ? 'ltr' : undefined}
      style={isArabic ? { unicodeBidi: 'isolate' } : undefined}
    >
      {displayValue}
    </span>
  );
};

/**
 * Hook to wrap numeric content with proper RTL handling
 */
export const useRTLNumber = () => {
  const { language } = useLanguage();
  const isArabic = language === 'ar';

  const formatNumber = (
    value: number | string,
    options?: {
      type?: 'price' | 'percentage' | 'stat' | 'phone' | 'date' | 'general';
      currency?: string;
      decimals?: number;
    }
  ) => {
    if (!isArabic) {
      if (options?.type === 'price' && options?.currency) {
        return `${value} ${options.currency}`;
      }
      if (options?.type === 'percentage') {
        return `${value}%`;
      }
      return value.toString();
    }

    // For Arabic, ensure proper formatting
    let displayValue = value;
    if (typeof value === 'number' && options?.type === 'price') {
      displayValue = value.toFixed(options?.decimals || 2);
    }

    // Wrap in RTL-safe container
    return `\u202D${displayValue}\u202C`; // LTR embedding
  };

  return { formatNumber, isArabic };
};