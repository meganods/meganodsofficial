/**
 * Google Ads & Analytics tracking utilities
 */

declare global {
  interface Window {
    dataLayer?: any[];
    gtag?: (...args: any[]) => void;
    gtag_report_conversion?: (url?: string) => boolean;
  }
}

export const GOOGLE_ADS_ID = 'AW-18420745292';
export const CONVERSION_ID = 'AW-18420745292/LhooCOmQtIEdEMyI2c9E';

/**
 * Report Google Ads Conversion (Purchase / Lead Action)
 * @param url Optional target URL to navigate to after reporting
 */
export function gtag_report_conversion(url?: string): boolean {
  if (typeof window === 'undefined') return false;

  const callback = () => {
    if (typeof url !== 'undefined' && url) {
      window.location.href = url;
    }
  };

  try {
    if (typeof window.gtag === 'function') {
      window.gtag('event', 'conversion', {
        send_to: CONVERSION_ID,
        transaction_id: '',
        event_callback: callback,
      });
    } else {
      callback();
    }
  } catch (error) {
    console.warn('Google Ads conversion tracking error:', error);
    callback();
  }

  return false;
}
