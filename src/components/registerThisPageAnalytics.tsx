"use client";

import { useGtagEvent } from "@/hooks/useGTagEvent";
import { useEffect } from "react";

export const MonitorThisPage = ({ name }: { name: string }) => {
  const trackEvent = useGtagEvent();

  useEffect(() => {
    trackEvent("page_view", {
      [name]: "visit",
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
};
