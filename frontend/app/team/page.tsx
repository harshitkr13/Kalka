import type { Metadata } from 'next';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { SectionHeader } from '@/components/editorial/SectionHeader';
import { Users } from 'lucide-react';
import { FinalCta } from '@/sections/home/FinalCta';
import { getPublicTeamMembers } from '@/lib/api/publicContent';

export const metadata: Metadata = {
  title: 'Advisory Leadership | Kalka Co. Media Consultancy',
  description: 'Advisory leadership at Kalka Co. Media Consultancy.',
};

export default async function TeamPage() {
  const team = await getPublicTeamMembers();

  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col justify-between">
      <Navbar />

      <main id="main-content" className="flex-1">
        <section className="bg-navy-deep text-white pt-10 pb-12 sm:pt-12 sm:pb-14 lg:pt-14 lg:pb-16 border-b border-navy-border text-left relative overflow-hidden">
          <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
            <span className="text-xs font-semibold tracking-wider uppercase text-gold py-1 px-3 rounded-full bg-gold/10 border border-gold/25 inline-block font-mono">
              Advisory Leadership
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white max-w-4xl leading-[1.15]">
              Advisory Leadership & Practice Counsel
            </h1>
            <p className="text-base sm:text-lg lg:text-xl text-slate-300 max-w-3xl leading-relaxed font-light">
              Seasoned communications strategists guiding corporate narratives, media relations, and reputation governance.
            </p>
          </div>
        </section>

        <section className="py-12 sm:py-16 lg:py-20 bg-white border-b border-slate-200 text-left">
          <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
            <SectionHeader
              overline="Leadership"
              title="Practice Directors & Counselors"
              description="Guiding corporate and media relations mandates."
            />

            {team.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {team.map((member, idx) => (
                  <div
                    key={idx}
                    className="p-6 bg-slate-50 border border-slate-200 rounded-lg flex flex-col justify-between"
                  >
                    <div>
                      <h3 className="font-serif text-xl font-bold text-navy mb-1">{member.name}</h3>
                      <p className="text-xs font-semibold text-gold tracking-wide uppercase font-mono mb-3">
                        {member.designation}
                      </p>
                      <p className="text-sm text-slate-600 leading-relaxed mb-4">{member.bio}</p>
                    </div>
                    {member.expertise && member.expertise.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-auto pt-2">
                        {member.expertise.map((exp, eIdx) => (
                          <span
                            key={eIdx}
                            className="text-[10px] bg-slate-200/70 text-slate-700 px-2 py-0.5 rounded font-mono"
                          >
                            {exp}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-12 sm:p-16 rounded-xl bg-slate-50 border border-slate-200 text-center max-w-2xl mx-auto space-y-4 shadow-sm">
                <div className="w-14 h-14 rounded-full bg-navy/5 border border-navy/10 flex items-center justify-center text-navy mx-auto">
                  <Users className="w-7 h-7 text-gold-dark" />
                </div>
                <h3 className="font-serif text-2xl font-bold text-navy">
                  Leadership Information Coming Soon
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Advisory leadership and practice counselor profiles are currently being updated. For practice leads and consultations, please initiate an inquiry through our contact desk.
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
