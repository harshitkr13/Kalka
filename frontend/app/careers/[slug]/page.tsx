import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { Badge } from '@/components/ui/Badge';
import { careersData } from '@/lib/content/careers';
import { 
  MapPin, 
  Clock, 
  Briefcase, 
  CheckCircle2, 
  ChevronRight, 
  ShieldCheck, 
  ArrowLeft 
} from 'lucide-react';
import { ApplicationForm } from './ApplicationForm';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return careersData.map((role) => ({
    slug: role.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const role = careersData.find((r) => r.slug === slug);
  if (!role) {
    return { title: 'Role Not Found | Kalka Co.' };
  }
  return {
    title: `${role.title} | Careers | Kalka Co. Media Consultancy`,
    description: role.description,
  };
}

export default async function CareerDetailPage({ params }: Props) {
  const { slug } = await params;
  const role = careersData.find((r) => r.slug === slug);

  if (!role) {
    notFound();
  }

  return (
    <div className="bg-slate-50 min-h-screen text-navy-deep">
      {/* Header */}
      <section className="bg-navy py-16 text-white border-b border-navy-border">
        <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumbs
            items={[
              { label: 'Home', href: '/' },
              { label: 'Careers', href: '/careers' },
              { label: role.title },
            ]}
            className="mb-8 text-slate-400"
          />

          <div className="max-w-4xl space-y-6">
            <div className="flex flex-wrap items-center gap-3">
              <Badge variant="gold">{role.department}</Badge>
              <Badge variant="neutral" className="border-slate-500 text-slate-200">
                {role.experience}
              </Badge>
              <span className="text-xs text-slate-300 flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-gold" />
                {role.location}
              </span>
              <span className="text-xs text-slate-300 flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-gold" />
                {role.employmentType}
              </span>
            </div>

            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white">
              {role.title}
            </h1>

            <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
              {role.description}
            </p>
          </div>
        </div>
      </section>

      {/* Content + Application Form */}
      <section className="py-16">
        <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Left: Job Spec */}
            <div className="lg:col-span-7 space-y-12">
              {/* Responsibilities */}
              <div className="bg-white p-8 rounded border border-slate-200 shadow-sm space-y-6">
                <h2 className="font-serif text-2xl font-bold text-navy border-b border-slate-100 pb-4">
                  Key Strategic Responsibilities
                </h2>
                <ul className="space-y-4">
                  {role.responsibilities.map((resp, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-sm text-slate-700">
                      <CheckCircle2 className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
                      <span className="leading-relaxed">{resp}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Requirements */}
              <div className="bg-white p-8 rounded border border-slate-200 shadow-sm space-y-6">
                <h2 className="font-serif text-2xl font-bold text-navy border-b border-slate-100 pb-4">
                  Required Qualifications & Mindset
                </h2>
                <ul className="space-y-4">
                  {role.requirements.map((req, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-sm text-slate-700">
                      <ChevronRight className="w-5 h-5 text-navy flex-shrink-0 mt-0.5" />
                      <span className="leading-relaxed">{req}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Nice to Have */}
              {role.niceToHave.length > 0 && (
                <div className="bg-white p-8 rounded border border-slate-200 shadow-sm space-y-6">
                  <h2 className="font-serif text-2xl font-bold text-navy border-b border-slate-100 pb-4">
                    Preferred Background & Distinctions
                  </h2>
                  <ul className="space-y-4">
                    {role.niceToHave.map((nth, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-sm text-slate-700">
                        <ChevronRight className="w-5 h-5 text-slate-400 flex-shrink-0 mt-0.5" />
                        <span className="leading-relaxed">{nth}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <Link
                href="/careers"
                className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-500 hover:text-navy transition-colors pt-4"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to all career opportunities
              </Link>
            </div>

            {/* Right: Application Form */}
            <div className="lg:col-span-5">
              <div className="sticky top-28">
                <ApplicationForm roleTitle={role.title} />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
