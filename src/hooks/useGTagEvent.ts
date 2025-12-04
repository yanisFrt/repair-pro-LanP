"use client";

import { useEffect } from "react";

declare global {
  interface Window {
    gtag?: (
      command: "config" | "event" | "js",
      ...args: unknown[]
    ) => void;
    dataLayer?: unknown[];
  }
}

export const useGtagEvent = () => {
  useEffect(() => {
    if (typeof window !== "undefined" && !window.gtag) {
      window.gtag = function (...args) {
        window.dataLayer = window?.dataLayer || [];

        window.dataLayer.push(args);
      };
    }
  }, []);

  const trackEvent = (
    eventName: string,
    eventParams?: Record<string, string | number | object>
  ) => {
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("event", eventName, eventParams);
    }
  };

  return trackEvent;
};

// Usage

/*

trackEvent('click_cta', {
      button_location: 'hero_section',
      page_title: 'Landing Page',
    });

*/
