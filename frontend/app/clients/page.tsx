import type { Metadata } from 'next';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { SectionHeader } from '@/components/editorial/SectionHeader';
import { ShieldCheck } from 'lucide-react';
import { getPublicClients } from '@/lib/api/publicContent';
import { FinalCta } from '@/sections/home/FinalCta';

export const metadata: Metadata = {
  title: 'Clients & Associated Organizations | Kalka Co. Media Consultancy',
  description: 'Associated brands, organizations, and clients advised by Kalka Co. Media Consultancy.',
  alternates: {
    canonical: '/clients',
  },
  openGraph: {
    title: 'Clients & Associated Organizations | Kalka Co. Media Consultancy',
    description: 'Associated brands, organizations, and clients advised by Kalka Co. Media Consultancy.',
    url: 'https://kalka.co/clients',
    siteName: 'Kalka Co. Media Consultancy',
    type: 'website',
    images: ['/assets/social/og-default.jpg'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Clients & Associated Organizations | Kalka Co. Media Consultancy',
    description: 'Associated brands, organizations, and clients advised by Kalka Co. Media Consultancy.',
    images: ['/assets/social/og-default.jpg'],
  },
};

export default async function ClientsPage() {
  const clients = await getPublicClients();

  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col justify-between">
      <Navbar />

      <main id="main-content" className="flex-1">
        <section className="bg-navy-deep text-white py-20 lg:py-28 border-b border-navy-border text-left">
          <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
            <span className="text-xs font-semibold tracking-widest uppercase text-gold py-1 px-3 rounded-full bg-gold/10 border border-gold/20 inline-block font-mono">
              Client Portfolio
            </span>
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white max-w-3xl leading-tight">
              Associated Brands & Organizations
            </h1>
            <p className="text-lg sm:text-xl text-slate-300 max-w-2xl leading-relaxed font-light">
              We operate under mutual non-disclosure and strict executive confidentiality, supporting brands, organizations, and industry leaders.
            </p>
          </div>
        </section>

        <section className="py-20 lg:py-28 bg-white border-b border-slate-200 text-left">
          <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
            <SectionHeader
              overline="Roster"
              title="Publicly Associated Brands"
              description="Associated organizations and clients where public representation is maintained."
            />

            {clients.length > 0 ? (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {clients.map((client, idx) => (
                    <div
                      key={idx}
                      className="p-6 border border-slate-200 rounded-lg bg-slate-50/40 space-y-3 hover:border-gold transition-colors flex flex-col justify-between"
                    >
                      <div>
                        {client.logo ? (
                          <div className="mb-3">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src={client.logo} alt={client.name} className="h-10 object-contain" />
                          </div>
                        ) : null}
                        <h3 className="font-serif text-xl font-bold text-navy">
                          {client.name}
                        </h3>
                        {client.industry && (
                          <p className="text-xs text-slate-500 mt-1 font-mono">{client.industry}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <div className="p-12 sm:p-16 rounded-xl bg-slate-50 border border-slate-200 text-center max-w-2xl mx-auto space-y-4 shadow-sm">
                <div className="w-14 h-14 rounded-full bg-navy/5 border border-navy/10 flex items-center justify-center text-navy mx-auto">
                  <ShieldCheck className="w-7 h-7 text-gold-dark" />
                </div>
                <h3 className="font-serif text-2xl font-bold text-navy">
                  Client Representation Archives
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Client representations and institutional advisory engagements are governed by strict mutual non-disclosure agreements. Public representation archives are published following formal advisory clearance.
                </p>
              </div>
            )}
          </div>
        </section>


        <FinalCta />
      </main>

      <Footer />
    </div>
  );
}
