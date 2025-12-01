"use client";

import { useEffect } from "react";

declare global {
  interface Window {
    gtag?: (command: string, eventName: string, eventParams?: Record<string, any>) => void;
  }
}

export const useGtagEvent = () => {
  useEffect(() => {
    if (typeof window !== "undefined" && !window.gtag) {
      window.gtag = function () {
        window.dataLayer = window?.dataLayer || [];

        window.dataLayer.push(arguments);
      };
    }
  }, []);

  const trackEvent = (eventName: string, eventParams?: Record<string, any>) => {
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
