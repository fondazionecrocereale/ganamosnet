/**
 * Utility helper to safely track events with Facebook Pixel (fbq).
 */

// Local fallback code from Meta Events Manager "Probar eventos" tab.
export const DEFAULT_TEST_CODE = "TEST28969";

export const getActiveTestCode = (): string | null => {
  if (typeof window === "undefined") return null;

  // 1. Try to read directly from URL query parameters (e.g. ?test_event_code=TESTxxxxx)
  const urlParams = new URLSearchParams(window.location.search);
  const codeFromUrl = urlParams.get("test_event_code");
  if (codeFromUrl) return codeFromUrl;

  // 2. Automatically apply default test code ONLY when in local development or preview sandbox
  const hostname = window.location.hostname;
  const isTestingEnv =
    hostname.includes("localhost") ||
    hostname.includes("127.0.0.1") ||
    hostname.includes("ais-dev") ||
    hostname.includes("ais-pre");

  if (isTestingEnv) {
    return DEFAULT_TEST_CODE;
  }

  // 3. Otherwise, return null (for real production release page visitors)
  return null;
};

export const trackPixelEvent = (eventName: string, properties?: Record<string, any>) => {
  if (typeof window !== "undefined") {
    const fbq = (window as any).fbq;
    if (typeof fbq === "function") {
      const activeTestCode = getActiveTestCode();
      const options: Record<string, any> = {};
      if (activeTestCode) {
        options.test_event_code = activeTestCode;
      }

      // Automatically enrich the "Contact" event if it lacks standard currency/value metadata
      // This solves the Meta Events Manager warning & allows ROAS calculation.
      const enrichedProperties = { ...properties };
      if (eventName === "Contact") {
        if (enrichedProperties.value === undefined) {
          enrichedProperties.value = 1000.00; // Default value based on the $1.000 minimum deposit
        }
        if (enrichedProperties.currency === undefined) {
          enrichedProperties.currency = "ARS"; // Default currency
        }
      }

      const payload = {
        ...enrichedProperties,
        ...(activeTestCode ? { test_event_code: activeTestCode } : {})
      };

      if (activeTestCode) {
        fbq("track", eventName, payload, options);
      } else {
        fbq("track", eventName, enrichedProperties);
      }
      console.log(`[FB Pixel] Event tracked: ${eventName} (Test Code: ${activeTestCode || 'None'})`, payload, options);
    } else {
      console.log(`[FB Pixel Mock] Event failed to send (fbq not found): ${eventName}`, properties);
    }
  }
};

