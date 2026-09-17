import React from 'react';

/**
 * Verified Organization and ProfessionalService Structured Data
 */
export function OrganizationJsonLd() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    '@id': 'https://kalka.co/#organization',
    name: 'Kalka Co. Media Consultancy',
    legalName: 'Kalka Co. Media Consultancy',
    url: 'https://kalka.co',
    logo: 'https://kalka.co/assets/brand/kalka-co-logo.svg',
    image: 'https://kalka.co/assets/social/og-default.jpg',
    description:
      'Strategic communications and public relations consultancy helping businesses, brands, organizations, and industry leaders build visibility, strengthen reputation, and create lasting impact.',
    email: 'kalkacomediaconsultancy@gmail.com',
    telephone: ['+91-87450-01570', '+91-76830-15257'],
    address: {
      '@type': 'PostalAddress',
      streetAddress: '147, Ground Floor, Greenfield Colony, Sector 43',
      addressLocality: 'Faridabad',
      addressRegion: 'Haryana',
      postalCode: '121003',
      addressCountry: 'IN',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 28.4359,
      longitude: 77.3093,
    },
    areaServed: [
      {
        '@type': 'Country',
        name: 'India',
      },
      {
        '@type': 'AdministrativeArea',
        name: 'Delhi NCR',
      },
    ],
    priceRange: '$$$$',
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: [
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday',
        ],
        opens: '09:00',
        closes: '18:00',
      },
    ],
  };

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': 'https://kalka.co/#website',
    url: 'https://kalka.co',
    name: 'Kalka Co. Media Consultancy',
    description: 'Strategic Communication. Lasting Impact.',
    publisher: {
      '@id': 'https://kalka.co/#organization',
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
    </>
  );
}

/**
 * Article / BlogPosting Structured Data
 */
export function ArticleJsonLd({
  title,
  description,
  datePublished,
  url,
  authorName = 'Editorial Advisory Desk',
  imageUrl,
}: {
  title: string;
  description: string;
  datePublished?: string;
  url: string;
  authorName?: string;
  imageUrl?: string;
}) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url,
    },
    datePublished: datePublished || new Date().toISOString(),
    author: {
      '@type': 'Person',
      name: authorName,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Kalka Co. Media Consultancy',
      logo: {
        '@type': 'ImageObject',
        url: 'https://kalka.co/assets/brand/kalka-co-logo.svg',
      },
    },
    image: imageUrl || 'https://kalka.co/assets/social/og-default.jpg',
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

/**
 * JobPosting Structured Data for real published roles
 */
export function JobPostingJsonLd({
  title,
  description,
  datePosted,
  employmentType = 'FULL_TIME',
  location = 'Faridabad / Delhi NCR, India',
}: {
  title: string;
  description: string;
  datePosted?: string;
  employmentType?: string;
  location?: string;
}) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'JobPosting',
    title,
    description,
    datePosted: datePosted || new Date().toISOString(),
    employmentType,
    hiringOrganization: {
      '@type': 'Organization',
      name: 'Kalka Co. Media Consultancy',
      sameAs: 'https://kalka.co',
      logo: 'https://kalka.co/assets/brand/kalka-co-logo.svg',
    },
    jobLocation: {
      '@type': 'Place',
      address: {
        '@type': 'PostalAddress',
        addressLocality: location,
        addressCountry: 'IN',
      },
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

/**
 * BreadcrumbList Structured Data
 */
export function BreadcrumbJsonLd({
  items,
}: {
  items: { name: string; url: string }[];
}) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
