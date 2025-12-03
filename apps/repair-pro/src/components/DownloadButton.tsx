"use client";

import { useGtagEvent } from "@/hooks/useGTagEvent";
import { CLICK_LOCATIONS } from "@/utils/analytics";

export const DownloadButton = ({ name, link }: { name: string; link: string }) => {
  const trackEvent = useGtagEvent();

  return (
    <a
      href={link}
      onClick={() => {
        trackEvent(CLICK_LOCATIONS.download, {
          [`download_${name.toLowerCase()}`]: `Download Software ${name}`,
        });
      }}
      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-custom-teal/70 hover:bg-custom-teal/60 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-custom-teal transition-colors"
    >
      Télécharger
    </a>
  );
};
