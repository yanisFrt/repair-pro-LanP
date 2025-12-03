"use client";

import { useGtagEvent } from "@/hooks/useGTagEvent";
import { useEffect } from "react";

export const MonitorThisPage = ({ name }: { name: string }) => {
  const trackEvent = useGtagEvent();

  useEffect(() => {
    trackEvent("page_view", {
      [name]: "visit",
    });
  }, []);

  return null;
};
