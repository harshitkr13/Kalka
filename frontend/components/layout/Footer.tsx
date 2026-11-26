import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { MapPin, ExternalLink } from 'lucide-react';
import { companyConfig, getVerifiedSocialLinks } from '@/lib/config/company';

export const Footer: React.FC = () => {
  const verifiedSocialLinks = getVerifiedSocialLinks();

  return (
    <footer className="bg-navy-deep text-slate-300 border-t border-navy-border text-left">
      <h2 className="sr-only">Footer Navigation & Information</h2>
      <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1.7fr_1.25fr_1fr_1.85fr] gap-10 lg:gap-8 xl:gap-10">
          {/* Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="relative w-8 h-8 shrink-0 flex items-center justify-center">
                <Image
                  src="/assets/brand/kalka-co-logo-white.svg"
                  alt={companyConfig.name}
                  width={32}
                  height={32}
                  className="object-contain"
                />
              </div>
              <span className="font-serif text-xl font-bold tracking-tight text-white">
                {companyConfig.shortName}
              </span>
            </div>
            <p className="text-xs uppercase tracking-widest text-gold font-semibold font-mono">
              Media Consultancy • Strategic PR
            </p>
            <p className="text-xs sm:text-sm text-slate-300 max-w-sm leading-relaxed">
              {companyConfig.name} is a strategic communications and public relations consultancy focused on helping businesses, brands, organizations and industry leaders build visibility, strengthen reputation and create meaningful engagement through strategic communication, media relations and reputation management.
            </p>
            <p className="text-xs text-gold font-serif italic">
              {companyConfig.tagline}
            </p>

            {/* Verified Social Media Channels (rendered only when verified URLs are configured) */}
            {verifiedSocialLinks.length > 0 && (
              <div className="pt-2">
                <p className="text-slate-400 text-[11px] uppercase font-mono mb-2">
                  Official Channels
                </p>
                <div className="flex flex-wrap items-center gap-2.5">
                  {verifiedSocialLinks.map((social) => (
                    <a
                      key={social.platform}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${companyConfig.name} on ${social.label} (opens in a new tab)`}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded border border-navy-border bg-navy-surface/60 text-xs font-medium text-slate-200 hover:text-gold hover:border-gold/50 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
                    >
                      <span>{social.label}</span>
                      <ExternalLink className="w-3 h-3" aria-hidden="true" />
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Practices */}
          <div className="space-y-3">
            <h3 className="text-xs font-semibold uppercase tracking-widest text-white font-mono">
              Practices
            </h3>
            <ul className="space-y-2 text-xs">
              <li><Link href="/services/public-relations" className="hover:text-gold transition-colors rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold">Public Relations</Link></li>
              <li><Link href="/services/media-relations" className="hover:text-gold transition-colors rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold">Media Relations</Link></li>
              <li><Link href="/services/corporate-communications" className="hover:text-gold transition-colors rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold">Corporate Communications</Link></li>
              <li><Link href="/services/reputation-management" className="hover:text-gold transition-colors rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold">Reputation Management</Link></li>
              <li><Link href="/services/thought-leadership" className="hover:text-gold transition-colors rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold">Thought Leadership</Link></li>
              <li><Link href="/services/content-development" className="hover:text-gold transition-colors rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold">Content Development</Link></li>
              <li><Link href="/services/crisis-communications" className="hover:text-gold transition-colors rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold">Crisis Communications</Link></li>
              <li><Link href="/services/brand-positioning" className="hover:text-gold transition-colors rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold">Brand Positioning</Link></li>
              <li><Link href="/services/digital-communications" className="hover:text-gold transition-colors rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold">Digital Communications</Link></li>
            </ul>
          </div>

          {/* Firm */}
          <div className="space-y-3">
            <h3 className="text-xs font-semibold uppercase tracking-widest text-white font-mono">
              Firm
            </h3>
            <ul className="space-y-2 text-xs">
              <li><Link href="/about" className="hover:text-gold transition-colors rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold">About Kalka Co.</Link></li>
              <li><Link href="/industries" className="hover:text-gold transition-colors rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold">Industries Served</Link></li>
              <li><Link href="/clients" className="hover:text-gold transition-colors rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold">Clients</Link></li>
              <li><Link href="/case-studies" className="hover:text-gold transition-colors rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold">Case Studies</Link></li>
              <li><Link href="/media-mentions" className="hover:text-gold transition-colors rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold">Media &amp; Press</Link></li>
              <li><Link href="/insights" className="hover:text-gold transition-colors rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold">Media Insights</Link></li>
              <li><Link href="/careers" className="hover:text-gold transition-colors rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold">Careers</Link></li>
              <li><Link href="/contact" className="hover:text-gold transition-colors rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold">Contact</Link></li>
            </ul>
          </div>

          {/* Contact Information */}
          <div className="space-y-3">
            <h3 className="text-xs font-semibold tracking-wider text-white font-mono uppercase">
              Contact &amp; Location
            </h3>
            <div className="text-xs space-y-5 text-slate-300">
              {/* Location */}
              <div className="space-y-1">
                <p className="text-slate-400 text-xs uppercase font-mono">Location</p>
                <p className="text-white font-medium">{companyConfig.location.display}</p>
                <a
                  href={companyConfig.location.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-gold hover:underline text-xs mt-0.5 rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
                >
                  <MapPin className="w-3 h-3" aria-hidden="true" />
                  <span>View on Google Maps</span>
                  <ExternalLink className="w-2.5 h-2.5" aria-hidden="true" />
                </a>
              </div>

              {/* Business Enquiries */}
              <div className="space-y-1">
                <p className="text-slate-400 text-xs uppercase font-mono">Business Enquiries</p>
                <a
                  href={companyConfig.emailHref}
                  className="text-gold hover:underline font-mono text-xs block lg:whitespace-nowrap break-words rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
                >
                  {companyConfig.email}
                </a>
              </div>

              {/* Direct Telephones */}
              <div className="space-y-1.5">
                <p className="text-slate-400 text-xs uppercase font-mono">Direct Telephones</p>
                <div className="space-y-1 font-mono">
                  {companyConfig.phones.map((phone) => (
                    <a
                      key={phone.raw}
                      href={phone.href}
                      className="flex items-center gap-2 hover:text-gold transition-colors text-xs rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
                    >
                      <Image
                        src="/icons/phone.svg"
                        alt=""
                        width={16}
                        height={16}
                        aria-hidden="true"
                        className="w-4 h-4 shrink-0 object-contain"
                      />
                      <span>{phone.display}</span>
                    </a>
                  ))}
                </div>
              </div>

              {/* WhatsApp Desk */}
              <div className="space-y-1.5">
                <p className="text-slate-400 text-xs uppercase font-mono">WhatsApp Desk</p>
                <a
                  href={companyConfig.whatsapp.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-gold hover:underline font-mono text-xs rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
                >
                  <Image
                    src="/icons/whatsapp.svg"
                    alt=""
                    width={16}
                    height={16}
                    aria-hidden="true"
                    className="w-4 h-4 shrink-0 object-contain"
                  />
                  <span>{companyConfig.whatsapp.display}</span>
                </a>
              </div>

              {/* Business Hours */}
              <div className="space-y-1">
                <p className="text-slate-400 text-xs uppercase font-mono">Business Hours</p>
                <p className="text-slate-300 font-mono">{companyConfig.businessHours}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Legal & Copyright */}
        <div className="mt-12 pt-8 border-t border-navy-border/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>© {new Date().getFullYear()} {companyConfig.name}. All rights reserved.</p>
          <div className="flex flex-wrap items-center justify-center gap-6">
            <Link href="/privacy-policy" className="hover:text-white transition-colors rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-white transition-colors rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold">Terms of Service</Link>
            <Link href="/cookie-policy" className="hover:text-white transition-colors rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold">Cookie Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
