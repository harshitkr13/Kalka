import Link from 'next/link';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/Button';
import { ArrowRight, Layers, ShieldCheck, Sparkles } from 'lucide-react';

export default function Home() {
  return (
    <div className="flex-1 flex flex-col justify-between">
      <Navbar />

      <main className="flex-1 max-w-container mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32 text-center">
        <div className="max-w-3xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold/10 border border-gold/30 text-gold-dark text-xs font-semibold uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5 text-gold" />
            <span>Phase 1 Verified Foundation</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-navy leading-tight">
            Kalka Co. Media Consultancy
          </h1>

          <p className="text-lg sm:text-xl text-slate-600 leading-relaxed font-light">
            Strategic Communication. Lasting Impact.
          </p>

          <p className="text-sm text-slate-500 max-w-xl mx-auto">
            The Phase 1 Design System & Interactive UI Foundation is active. Public marketing routes will be developed in Phase 2. Explore the complete component catalog and live interactive playground below.
          </p>

          <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
            <Link href="/design-system">
              <Button variant="gold" size="lg" rightIcon={<ArrowRight className="w-4 h-4" />}>
                Launch Design System Showcase
              </Button>
            </Link>
          </div>

          <div className="pt-12 grid grid-cols-1 sm:grid-cols-3 gap-6 text-left border-t border-slate-200 mt-12">
            <div className="p-5 border border-slate-200 rounded bg-slate-50/50">
              <div className="w-8 h-8 rounded bg-navy text-gold flex items-center justify-center font-bold text-sm mb-3">
                01
              </div>
              <h3 className="font-serif text-base font-semibold text-navy">Design Tokens</h3>
              <p className="text-xs text-slate-500 mt-1">
                Navy, Obsidian, Gold, and Editorial Cream palette with accessible typographic scales.
              </p>
            </div>

            <div className="p-5 border border-slate-200 rounded bg-slate-50/50">
              <div className="w-8 h-8 rounded bg-navy text-gold flex items-center justify-center font-bold text-sm mb-3">
                02
              </div>
              <h3 className="font-serif text-base font-semibold text-navy">UI Primitives</h3>
              <p className="text-xs text-slate-500 mt-1">
                Accessible Buttons, Dialogs, Drawers, Accordions, Tabs, Forms, and Toasts.
              </p>
            </div>

            <div className="p-5 border border-slate-200 rounded bg-slate-50/50">
              <div className="w-8 h-8 rounded bg-navy text-gold flex items-center justify-center font-bold text-sm mb-3">
                03
              </div>
              <h3 className="font-serif text-base font-semibold text-navy">Composite Cards</h3>
              <p className="text-xs text-slate-500 mt-1">
                Domain cards for Services, Industries, Insights, and Case Studies with placeholder controls.
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
