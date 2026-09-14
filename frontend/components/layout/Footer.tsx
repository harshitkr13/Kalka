import React from 'react';
import Link from 'next/link';

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
            <p className="text-xs uppercase tracking-widest text-gold font-semibold">
              Media Consultancy & Strategic PR
            </p>
            <p className="text-sm text-slate-400 max-w-sm leading-relaxed">
              Advising market leaders, corporate boards, and transformative organizations on high-stakes narrative positioning, reputation resilience, and media impact.
            </p>
          </div>

          {/* Practices */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-widest text-white">
              Practices
            </h4>
            <ul className="space-y-2 text-xs">
              <li><Link href="/services/media-relations" className="hover:text-gold transition-colors">Media Relations</Link></li>
              <li><Link href="/services/corporate-communications" className="hover:text-gold transition-colors">Corporate Communications</Link></li>
              <li><Link href="/services/crisis-communications" className="hover:text-gold transition-colors">Crisis Advisory</Link></li>
              <li><Link href="/services/thought-leadership" className="hover:text-gold transition-colors">Thought Leadership</Link></li>
              <li><Link href="/services/reputation-management" className="hover:text-gold transition-colors">Reputation Management</Link></li>
            </ul>
          </div>

          {/* Firm */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-widest text-white">
              Firm
            </h4>
            <ul className="space-y-2 text-xs">
              <li><Link href="/about" className="hover:text-gold transition-colors">About Kalka Co.</Link></li>
              <li><Link href="/industries" className="hover:text-gold transition-colors">Industries Served</Link></li>
              <li><Link href="/case-studies" className="hover:text-gold transition-colors">Case Studies</Link></li>
              <li><Link href="/insights" className="hover:text-gold transition-colors">Media Insights</Link></li>
              <li><Link href="/careers" className="hover:text-gold transition-colors">Careers</Link></li>
            </ul>
          </div>

          {/* Offices / Contact Placeholder */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-widest text-white">
              Consultancy Hubs
            </h4>
            <div className="text-xs space-y-2 text-slate-400">
              <div>
                <p className="text-slate-200 font-medium">Headquarters</p>
                <p>[Approved office address placeholder]</p>
              </div>
              <div className="pt-2">
                <p className="text-slate-200 font-medium">Direct Inquiries</p>
                <p className="text-gold">contact@kalka.co</p>
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
            <Link href="/design-system" className="text-gold/80 hover:text-gold transition-colors">Design System (Dev)</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
