/**
 * Utility helper to safely track events with Facebook Pixel (fbq).
 */

export const trackPixelEvent = (eventName: string, properties?: Record<string, any>) => {
  if (typeof window !== "undefined") {
    const fbq = (window as any).fbq;
    if (typeof fbq === "function") {
      fbq("track", eventName, properties);
      console.log(`[FB Pixel] Event tracked: ${eventName}`, properties);
    } else {
      console.log(`[FB Pixel Mock] Event failed to send (fbq not found): ${eventName}`, properties);
    }
  }
};
