/**
 * Privacy-Friendly Analytics Utility
 * 
 * Safe abstraction for Google Analytics 4.
 * - Active only when process.env.NEXT_PUBLIC_GA_ID is set.
 * - Never collects or transmits PII (no names, emails, phone numbers, form texts, or tokens).
 * - Tracks only high-level aggregate conversion and navigation events.
 */

declare global {
  interface Window {
    gtag?: (
      command: 'config' | 'event' | 'js' | 'set',
      targetIdOrAction: string | Date,
      params?: Record<string, unknown>
    ) => void;
    dataLayer?: unknown[];
  }
}

export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID;

/**
 * Record pageview in GA4
 */
export function trackPageView(url: string): void {
  if (typeof window === 'undefined' || !window.gtag || !GA_TRACKING_ID) return;
  window.gtag('config', GA_TRACKING_ID, {
    page_path: url,
    anonymize_ip: true,
  });
}

/**
 * Record a privacy-compliant aggregate custom event
 */
export function trackEvent(
  action: string,
  params: Record<string, string | number | boolean> = {}
): void {
  if (typeof window === 'undefined' || !window.gtag || !GA_TRACKING_ID) return;
  window.gtag('event', action, params);
}

// Dedicated aggregate event helpers

export function trackContactCta(placement: string): void {
  trackEvent('contact_cta_click', { placement });
}

export function trackWhatsAppClick(location: string): void {
  trackEvent('whatsapp_click', { location });
}

export function trackEmailClick(location: string): void {
  trackEvent('email_click', { location });
}

export function trackContactFormStart(): void {
  trackEvent('contact_form_start', { timestamp: Date.now() });
}

export function trackContactFormSubmit(success: boolean): void {
  trackEvent('contact_form_submit', { success });
}

export function trackServiceView(serviceSlug: string): void {
  trackEvent('service_view', { service_slug: serviceSlug });
}

export function trackCaseStudyView(caseStudySlug: string): void {
  trackEvent('case_study_view', { case_study_slug: caseStudySlug });
}

export function trackCareerView(careerSlug: string): void {
  trackEvent('career_view', { career_slug: careerSlug });
}
