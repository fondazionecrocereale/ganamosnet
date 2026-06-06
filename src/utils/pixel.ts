/**
 * Utility helper to safely track events with Facebook Pixel (fbq).
 */

// Configurable Test Event Code from Meta Events Manager "Probar eventos" tab.
// Keep it updated with your active test code to see events in real-time.
export const TEST_EVENT_CODE = "TEST28969";

export const trackPixelEvent = (eventName: string, properties?: Record<string, any>) => {
  if (typeof window !== "undefined") {
    const fbq = (window as any).fbq;
    if (typeof fbq === "function") {
      const options: Record<string, any> = {};
      if (TEST_EVENT_CODE) {
        options.test_event_code = TEST_EVENT_CODE;
      }

      const payload = {
        ...properties,
        ...(TEST_EVENT_CODE ? { test_event_code: TEST_EVENT_CODE } : {})
      };

      // Pass test_event_code in both payload and options arguments to ensure Event Manager logs it instantly
      fbq("track", eventName, payload, options);
      console.log(`[FB Pixel] Event tracked: ${eventName}`, payload, options);
    } else {
      console.log(`[FB Pixel Mock] Event failed to send (fbq not found): ${eventName}`, properties);
    }
  }
};
