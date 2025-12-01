export {};

declare global {
  interface Window {
    dataLayer?: any[];
    gtag?: (command: "config" | "event" | "js", ...args: any[]) => void;
  }
}
