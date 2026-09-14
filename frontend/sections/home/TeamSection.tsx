import React from 'react';
import Link from 'next/link';
import { ArrowRight, Users } from 'lucide-react';
import { SectionHeader } from '@/components/editorial/SectionHeader';
import { teamData } from '@/lib/content/team';
import { Button } from '@/components/ui/Button';

export const TeamSection: React.FC = () => {
  const leadership = teamData.slice(0, 3);

  return (
    <section className="py-20 lg:py-28 bg-white border-b border-slate-200 text-left">
      <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          overline="Advisory Leadership"
          title="Seasoned Counselors Guiding High-Stakes Mandates"
          description="Our partners bring decades of battlefield experience from premier newsrooms, corporate boardrooms, and crisis command centers."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {leadership.map((member) => (
            <div
              key={member.id}
              className="p-7 border border-slate-200 rounded bg-slate-50/40 space-y-4 hover:border-gold transition-colors"
            >
              <div className="w-16 h-16 rounded bg-navy text-gold font-serif font-bold text-xl flex items-center justify-center">
                <Users className="w-7 h-7" />
              </div>

              <div>
                <h3 className="font-serif text-xl font-semibold text-navy">
                  {member.name}
                </h3>
                <span className="text-xs uppercase tracking-wider text-gold-dark font-semibold block mt-0.5">
                  {member.designation} • {member.practiceArea}
                </span>
              </div>

              <p className="text-sm text-slate-600 leading-relaxed pt-2 border-t border-slate-200">
                {member.bio}
              </p>

              <div className="flex flex-wrap gap-1.5 pt-2">
                {member.expertise.map((exp) => (
                  <span key={exp} className="text-[10px] px-2 py-0.5 rounded bg-white border border-slate-200 text-slate-600">
                    {exp}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-14 text-center">
          <Link href="/team">
            <Button variant="outline" size="lg" rightIcon={<ArrowRight className="w-4 h-4" />}>
              Meet the Full Advisory Leadership Team
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};
