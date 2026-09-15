import type { Metadata } from 'next';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { SectionHeader } from '@/components/editorial/SectionHeader';
import { associatedClients } from '@/lib/content/clients';
import { FinalCta } from '@/sections/home/FinalCta';

export const metadata: Metadata = {
  title: 'Clients & Associated Organizations | Kalka Co. Media Consultancy',
  description: 'Associated brands, organizations, and clients advised by Kalka Co. Media Consultancy.',
};

export default function ClientsPage() {
  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col justify-between">
      <Navbar />

      <main className="flex-1">
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

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {associatedClients.map((client, idx) => (
                <div
                  key={idx}
                  className="p-6 border border-slate-200 rounded-lg bg-slate-50/40 space-y-3 hover:border-gold transition-colors flex flex-col justify-between"
                >
                  <div>
                    <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-amber-500/10 text-amber-800 border border-amber-500/20 font-semibold uppercase tracking-wider inline-block mb-3">
                      PENDING APPROVAL
                    </span>
                    <h3 className="font-serif text-xl font-bold text-navy">
                      {client.name}
                    </h3>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-6 bg-slate-50 border border-slate-200 rounded text-center text-xs text-slate-500">
              * Note: Public display marked as Pending Approval in accordance with firm advisory governance.
            </div>
          </div>
        </section>

        <FinalCta />
      </main>

      <Footer />
    </div>
  );
}
