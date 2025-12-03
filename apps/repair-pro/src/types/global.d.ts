export {};

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (command: "config" | "event" | "js", ...args: unknown[]) => void;
  }
}
