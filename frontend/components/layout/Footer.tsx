import React from 'react';
import Link from 'next/link';
import { Mail, Phone, MessageSquare, MapPin, ExternalLink } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-navy-deep text-slate-400 border-t border-navy-border text-left">
      <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-7 h-7 rounded bg-gold flex items-center justify-center font-serif text-navy-deep font-bold text-sm">
                K
              </div>
              <span className="font-serif text-xl font-bold tracking-tight text-white">
                KALKA CO.
              </span>
            </div>
            <p className="text-xs uppercase tracking-widest text-gold font-semibold font-mono">
              Media Consultancy • Strategic PR
            </p>
            <p className="text-xs sm:text-sm text-slate-300 max-w-sm leading-relaxed">
              Kalka Co. Media Consultancy is a strategic communications and public relations consultancy focused on helping businesses, brands, organizations and industry leaders build visibility, strengthen reputation and create meaningful engagement through strategic communication, media relations and reputation management.
            </p>
            <p className="text-xs text-gold font-serif italic">
              Strategic Communication. Lasting Impact.
            </p>
          </div>

          {/* Practices */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-widest text-white font-mono">
              Practices
            </h4>
            <ul className="space-y-2 text-xs">
              <li><Link href="/services/public-relations" className="hover:text-gold transition-colors">Public Relations</Link></li>
              <li><Link href="/services/media-relations" className="hover:text-gold transition-colors">Media Relations</Link></li>
              <li><Link href="/services/corporate-communications" className="hover:text-gold transition-colors">Corporate Communications</Link></li>
              <li><Link href="/services/reputation-management" className="hover:text-gold transition-colors">Reputation Management</Link></li>
              <li><Link href="/services/thought-leadership" className="hover:text-gold transition-colors">Thought Leadership</Link></li>
              <li><Link href="/services/content-development" className="hover:text-gold transition-colors">Content Development</Link></li>
              <li><Link href="/services/crisis-communications" className="hover:text-gold transition-colors">Crisis Communications</Link></li>
              <li><Link href="/services/brand-positioning" className="hover:text-gold transition-colors">Brand Positioning</Link></li>
              <li><Link href="/services/digital-communications" className="hover:text-gold transition-colors">Digital Communications</Link></li>
            </ul>
          </div>

          {/* Firm */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-widest text-white font-mono">
              Firm
            </h4>
            <ul className="space-y-2 text-xs">
              <li><Link href="/about" className="hover:text-gold transition-colors">About Kalka Co.</Link></li>
              <li><Link href="/industries" className="hover:text-gold transition-colors">Industries Served</Link></li>
              <li><Link href="/clients" className="hover:text-gold transition-colors">Clients</Link></li>
              <li><Link href="/case-studies" className="hover:text-gold transition-colors">Case Studies</Link></li>
              <li><Link href="/insights" className="hover:text-gold transition-colors">Media Insights</Link></li>
              <li><Link href="/careers" className="hover:text-gold transition-colors">Careers</Link></li>
              <li><Link href="/contact" className="hover:text-gold transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Contact Information */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-widest text-white font-mono">
              Contact & Location
            </h4>
            <div className="text-xs space-y-3 text-slate-300">
              <div>
                <p className="text-slate-400 text-[11px] uppercase font-mono">Location</p>
                <p className="text-white font-medium">Faridabad, Haryana 121003</p>
                <a
                  href="https://maps.app.goo.gl/fo8sk45WeLVydMjv5?g_st=ic"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-gold hover:underline text-[11px] mt-0.5"
                >
                  <MapPin className="w-3 h-3" />
                  <span>View on Google Maps</span>
                  <ExternalLink className="w-2.5 h-2.5" />
                </a>
              </div>

              <div>
                <p className="text-slate-400 text-[11px] uppercase font-mono">Business Enquiries</p>
                <a href="mailto:djdurgesh8@gmail.com" className="text-gold hover:underline font-mono">
                  djdurgesh8@gmail.com
                </a>
              </div>

              <div>
                <p className="text-slate-400 text-[11px] uppercase font-mono">Direct Telephones</p>
                <div className="space-y-0.5 font-mono">
                  <a href="tel:+918745001570" className="block hover:text-gold transition-colors">
                    +91 87450 01570
                  </a>
                  <a href="tel:+917683015257" className="block hover:text-gold transition-colors">
                    +91 76830 15257
                  </a>
                </div>
              </div>

              <div>
                <p className="text-slate-400 text-[11px] uppercase font-mono">WhatsApp Desk</p>
                <a
                  href="https://wa.me/918745001570?text=Hello%20Kalka%20Co.%20Media%20Consultancy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-emerald-400 hover:underline font-mono"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>8745001570</span>
                </a>
              </div>

              <div>
                <p className="text-slate-400 text-[11px] uppercase font-mono">Business Hours</p>
                <p className="text-slate-300 font-mono">09:30 - 18:30 IST</p>
              </div>
            </div>
          </div>
        </div>

        {/* Legal & Copyright */}
        <div className="mt-12 pt-8 border-t border-navy-border/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} Kalka Co. Media Consultancy. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="/privacy-policy" className="hover:text-slate-300 transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-slate-300 transition-colors">Terms of Service</Link>
            <Link href="/cookie-policy" className="hover:text-slate-300 transition-colors">Cookie Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
