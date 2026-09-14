import React from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/Button';
import { ArrowLeft, Home, Compass } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col justify-between">
      <Navbar />

      <main className="flex-1 max-w-container mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32 flex items-center justify-center text-center">
        <div className="max-w-xl mx-auto space-y-6">
          <span className="text-xs font-semibold tracking-widest uppercase text-gold-dark block">
            404 • Page Not Found
          </span>

          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-navy leading-tight">
            The Requested Intelligence Briefing Does Not Exist
          </h1>

          <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-light">
            The link you followed may have been updated, relocated, or is restricted to confidential advisory conduits.
          </p>

          <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
            <Link href="/">
              <Button variant="primary" size="md" leftIcon={<Home className="w-4 h-4" />}>
                Return to Homepage
              </Button>
            </Link>
            <Link href="/services">
              <Button variant="outline" size="md" leftIcon={<Compass className="w-4 h-4" />}>
                Explore Advisory Practices
              </Button>
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
