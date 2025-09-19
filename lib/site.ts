// lib/site.ts
export const SITE_ORIGIN =
  process.env.NEXT_PUBLIC_SITE_ORIGIN || 'https://zokratiq.com';

export const canonicalUrl = (path = '/') =>
  new URL(path, SITE_ORIGIN).toString();

// Helper functions for common URL patterns
export const contactUrl = () => canonicalUrl('/#contact');
export const scanUrl = () => canonicalUrl('/scan/');
export const beliefDiagnosticUrl = () => canonicalUrl('/belief-capital-diagnostic/');

// For social sharing
export const shareUrls = {
  linkedin: (url: string, title: string, text: string) => 
    `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}&summary=${encodeURIComponent(text)}`,
  twitter: (text: string) => 
    `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`,
  email: (subject: string, body: string) => 
    `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
};