import type { Metadata } from 'next';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { SectionHeader } from '@/components/editorial/SectionHeader';
import { teamData } from '@/lib/content/team';
import { FinalCta } from '@/sections/home/FinalCta';
import { Users, Mail } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Advisory Leadership & Senior Counselors | Kalka Co.',
  description: 'Meet the senior leadership, practice directors, and media strategists guiding Kalka Co. engagements.',
};

export default function TeamPage() {
  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col justify-between">
      <Navbar />

      <main className="flex-1">
        <section className="bg-navy-deep text-white py-20 lg:py-28 border-b border-navy-border text-left">
          <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
            <span className="text-xs font-semibold tracking-widest uppercase text-gold py-1 px-3 rounded-full bg-gold/10 border border-gold/20 inline-block">
              Leadership Council
            </span>
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white max-w-3xl leading-tight">
              Advisory Leadership & Senior Practice Counsel
            </h1>
            <p className="text-lg sm:text-xl text-slate-300 max-w-2xl leading-relaxed font-light">
              Our partners combine senior newsroom pedigree, corporate board experience, and crisis management precision.
            </p>
          </div>
        </section>

        <section className="py-20 lg:py-28 bg-white border-b border-slate-200 text-left">
          <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeader
              overline="Practice Directors"
              title="Senior Counselors Leading Marquee Engagements"
              description="Each client mandate is directed by dedicated partners who bring deep sector alliances and unvarnished strategic perspective."
            />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {teamData.map((member) => (
                <div
                  key={member.id}
                  className="p-8 border border-slate-200 rounded bg-white hover:border-gold/80 hover:shadow-elevated transition-all duration-200 flex flex-col justify-between space-y-6"
                >
                  <div className="space-y-4">
                    <div className="w-16 h-16 rounded bg-navy text-gold flex items-center justify-center font-serif font-bold text-xl">
                      <Users className="w-7 h-7" />
                    </div>
                    <div>
                      <h3 className="font-serif text-2xl font-semibold text-navy">
                        {member.name}
                      </h3>
                      <span className="text-xs uppercase tracking-wider text-gold-dark font-semibold block mt-1">
                        {member.designation} • {member.practiceArea}
                      </span>
                    </div>
                    <p className="text-sm text-slate-600 leading-relaxed pt-2 border-t border-slate-100">
                      {member.bio}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-slate-100 space-y-3">
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 block">
                      Core Specializations
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {member.expertise.map((exp) => (
                        <span key={exp} className="text-xs px-2.5 py-1 rounded bg-slate-100 text-slate-700 font-medium">
                          {exp}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-12 p-6 bg-slate-50 border border-slate-200 rounded text-center text-xs text-slate-500">
              * Note: In compliance with project data governance (05_DATA_SOURCES), executive profiles are presented with verified practice scope placeholders during active development.
            </div>
          </div>
        </section>

        <FinalCta />
      </main>

      <Footer />
    </div>
  );
}
