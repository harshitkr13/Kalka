import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { Badge } from '@/components/ui/Badge';
import { FinalCta } from '@/sections/home/FinalCta';
import { insightsData } from '@/lib/content/insights';
import { Calendar, Clock, User, Quote, ArrowLeft } from 'lucide-react';
import { ArticleJsonLd } from '@/components/seo/JsonLd';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return insightsData.map((i) => ({ slug: i.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const insight = insightsData.find((i) => i.slug === slug);
  if (!insight) return { title: 'Article Not Found | Kalka Co.' };

  const canonicalUrl = `/insights/${slug}`;

  return {
    title: `${insight.title} | Kalka Co. Insights`,
    description: insight.summary,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: `${insight.title} | Kalka Co. Insights`,
      description: insight.summary,
      url: `https://kalka.co${canonicalUrl}`,
      images: ['/assets/social/og-default.jpg'],
      type: 'article',
      publishedTime: insight.publishedDate,
      authors: [insight.author],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${insight.title} | Kalka Co. Insights`,
      description: insight.summary,
      images: ['/assets/social/og-default.jpg'],
    },
  };
}

export default async function InsightDetailPage({ params }: Props) {
  const { slug } = await params;
  const insight = insightsData.find((i) => i.slug === slug);

  if (!insight) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col justify-between">
      <Navbar />
      <ArticleJsonLd
        title={insight.title}
        description={insight.summary}
        url={`https://kalka.co/insights/${slug}`}
        authorName={insight.author}
      />

      <main id="main-content" className="flex-1">
        {/* Article Header */}
        <section className="bg-navy-deep text-white py-20 lg:py-28 border-b border-navy-border text-left">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
            <Breadcrumbs
              items={[
                { label: 'Insights', href: '/insights' },
                { label: insight.category },
              ]}
              className="[&_a]:text-slate-400 [&_span]:text-gold"
            />

            <Badge variant="gold">{insight.category}</Badge>

            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight">
              {insight.title}
            </h1>

            <p className="text-lg sm:text-xl text-slate-300 leading-relaxed font-light">
              {insight.subtitle}
            </p>

            {/* Metadata Bar */}
            <div className="flex flex-wrap items-center gap-6 pt-4 border-t border-navy-border/60 text-xs text-slate-400">
              <span className="flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-gold" />
                {insight.author} ({insight.authorRole})
              </span>
              <span className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-gold" />
                {insight.publishedDate}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-gold" />
                {insight.readTime}
              </span>
            </div>
          </div>
        </section>

        {/* Article Body */}
        <article className="py-20 bg-white border-b border-slate-200 text-left">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
            {/* Pull Quote */}
            {insight.pullQuote && (
              <div className="p-8 border-l-4 border-gold bg-slate-50 rounded-r space-y-3">
                <Quote className="w-6 h-6 text-gold-dark" />
                <p className="font-serif text-xl sm:text-2xl text-navy italic leading-snug">
                  &ldquo;{insight.pullQuote}&rdquo;
                </p>
              </div>
            )}

            {/* Body Sections */}
            <div className="space-y-10">
              {insight.content.map((sec, idx) => (
                <div key={idx} className="space-y-4">
                  <h2 className="font-serif text-2xl font-semibold text-navy">
                    {sec.heading}
                  </h2>
                  {sec.paragraphs.map((p, pIdx) => (
                    <p key={pIdx} className="text-base sm:text-lg text-slate-700 leading-relaxed font-light">
                      {p}
                    </p>
                  ))}
                </div>
              ))}
            </div>

            {/* Tags & Return */}
            <div className="pt-8 border-t border-slate-200 flex flex-wrap items-center justify-between gap-4">
              <div className="flex flex-wrap gap-2">
                {insight.tags.map((tag) => (
                  <span key={tag} className="text-xs px-2.5 py-1 rounded bg-slate-100 text-slate-600 font-medium">
                    #{tag}
                  </span>
                ))}
              </div>

              <Link
                href="/insights"
                className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-navy hover:text-gold-dark transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Return to All Insights</span>
              </Link>
            </div>
          </div>
        </article>

        <FinalCta />
      </main>

      <Footer />
    </div>
  );
}
