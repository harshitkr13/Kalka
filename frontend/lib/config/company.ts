export type SocialPlatform = 'linkedin' | 'instagram' | 'facebook' | 'x' | 'youtube';

export interface SocialLinkItem {
  platform: SocialPlatform;
  label: string;
  url: string | null;
  verified: boolean;
}

/**
 * Verified company details for Kalka Co. Media Consultancy.
 * Centralizes public-facing contact information to ensure consistency
 * across navigation, footer, contact desk, legal pages, and structured data.
 */
export const companyConfig = {
  name: 'Kalka Co. Media Consultancy',
  shortName: 'KALKA CO.',
  tagline: 'Strategic Communication. Lasting Impact.',
  email: 'kalkacomediaconsultancy@gmail.com',
  emailHref: 'mailto:kalkacomediaconsultancy@gmail.com',
  phones: [
    {
      display: '+91 87450 01570',
      raw: '8745001570',
      href: 'tel:+918745001570',
    },
    {
      display: '+91 76830 15257',
      raw: '7683015257',
      href: 'tel:+917683015257',
    },
  ],
  whatsapp: {
    display: '+91 87450 01570',
    number: '918745001570',
    url: 'https://wa.me/918745001570?text=Hello%20Kalka%20Co.%20Media%20Consultancy',
    urgentUrl:
      'https://wa.me/918745001570?text=Urgent%20Consultation%20Inquiry%20-%20Kalka%20Co',
  },
  businessHours: '09:30 AM – 06:30 PM IST',
  schemaHours: {
    opens: '09:30',
    closes: '18:30',
  },
  location: {
    display: 'Faridabad, Haryana 121003',
    city: 'Faridabad',
    region: 'Haryana',
    postalCode: '121003',
    country: 'IN',
    mapsUrl: 'https://maps.app.goo.gl/fo8sk45WeLVydMjv5?g_st=ic',
  },
  /**
   * Client Input Pending: Populate only with formally approved Mission and Vision
   * statements. The About page keeps Mission & Vision hidden while these are null.
   */
  mission: null as string | null,
  vision: null as string | null,
} as const;

/**
 * Official social media profile configuration.
 * Only platforms with client-verified URLs (`verified: true` and non-empty `url`)
 * are rendered on the public website.
 *
 * Client Input Pending: Provide verified official company profile URLs
 * before setting `verified: true`.
 */
export const socialLinksConfig: SocialLinkItem[] = [
  {
    platform: 'linkedin',
    label: 'LinkedIn',
    url: null,
    verified: false,
  },
  {
    platform: 'instagram',
    label: 'Instagram',
    url: null,
    verified: false,
  },
  {
    platform: 'x',
    label: 'X (Twitter)',
    url: null,
    verified: false,
  },
  {
    platform: 'facebook',
    label: 'Facebook',
    url: null,
    verified: false,
  },
  {
    platform: 'youtube',
    label: 'YouTube',
    url: null,
    verified: false,
  },
];

/**
 * Validates that a social profile URL uses a permitted HTTP(S) protocol.
 */
export function isPermittedSocialUrl(rawUrl: string): boolean {
  try {
    const parsed = new URL(rawUrl.trim());
    return parsed.protocol === 'https:' || parsed.protocol === 'http:';
  } catch {
    return false;
  }
}

/**
 * Returns only verified social media links with permitted HTTP(S) URLs
 * ready for public display.
 */
export function getVerifiedSocialLinks(): Array<SocialLinkItem & { url: string }> {
  return socialLinksConfig.filter(
    (item): item is SocialLinkItem & { url: string } =>
      item.verified &&
      typeof item.url === 'string' &&
      item.url.trim().length > 0 &&
      isPermittedSocialUrl(item.url)
  );
}
