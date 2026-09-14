'use client';

import React from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { SectionHeader } from '@/components/editorial/SectionHeader';
import { Gallery, GalleryItemData } from '@/components/editorial/Gallery';
import { FinalCta } from '@/sections/home/FinalCta';

const galleryItems: GalleryItemData[] = [
  {
    id: 'mg1',
    title: 'National Infrastructure & Urban Built Environment Summit',
    category: 'Keynote & Media',
    datePlaceholder: 'October 2026',
    description: 'Coordinated international media bureau briefings and keynote narrative framing for commercial infrastructure consortium.',
  },
  {
    id: 'mg2',
    title: 'Executive Financial Roundtable with Tier-1 Editors',
    category: 'Corporate Affairs',
    datePlaceholder: 'September 2026',
    description: 'Private closed-door background salon with senior financial correspondents and enterprise managing directors.',
  },
  {
    id: 'mg3',
    title: 'Synchronized Multi-Market Capital Listing Announcement',
    category: 'Capital Markets',
    datePlaceholder: 'August 2026',
    description: 'Live broadcast feed management and press room synchronization for cross-border enterprise funding milestone.',
  },
  {
    id: 'mg4',
    title: 'Healthcare Innovation Symposium Press Briefing',
    category: 'Life Sciences',
    datePlaceholder: 'July 2026',
    description: 'Guiding scientific directors and clinical specialists through national health media interviews.',
  },
  {
    id: 'mg5',
    title: 'Crisis Simulation & Spokesperson Preparedness Workshop',
    category: 'Crisis Advisory',
    datePlaceholder: 'June 2026',
    description: 'Intensive on-camera broadcast drill and scenario defense training for corporate executive committee.',
  },
  {
    id: 'mg6',
    title: 'Marquee Hospitality Architectural Unveiling',
    category: 'Luxury & Design',
    datePlaceholder: 'May 2026',
    description: 'Private media preview salon attended by leading architectural broadsheets and luxury travel critics.',
  },
];

export default function MediaGalleryPage() {
  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col justify-between">
      <Navbar />

      <main className="flex-1">
        <section className="bg-navy-deep text-white py-20 lg:py-28 border-b border-navy-border text-left">
          <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
            <span className="text-xs font-semibold tracking-widest uppercase text-gold py-1 px-3 rounded-full bg-gold/10 border border-gold/20 inline-block">
              Media Moments [SAMPLE ARCHIVE]
            </span>
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white max-w-3xl leading-tight">
              Media Gallery & Event Documentaries
            </h1>
            <p className="text-lg sm:text-xl text-slate-300 max-w-2xl leading-relaxed font-light">
              Illustrative visual records of high-impact press conferences, private executive briefings, and major strategic milestone announcements [SAMPLE ASSETS].
            </p>
          </div>
        </section>

        <section className="py-20 lg:py-28 bg-white border-b border-slate-200">
          <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
            <SectionHeader
              overline="Visual Archive [SAMPLE ASSETS]"
              title="Sample Keynotes, Press Briefings & Executive Salons"
              description="Click on any media entry to launch the high-resolution lightbox viewer."
            />

            <Gallery items={galleryItems} />

            <div className="p-6 bg-slate-50 border border-slate-200 rounded text-center text-xs text-slate-500">
              * Note: Sample documentary assets demonstrated in accordance with 05_DATA_SOURCES. Live photographic assets are served via Cloudinary in production.
            </div>
          </div>
        </section>

        <FinalCta />
      </main>

      <Footer />
    </div>
  );
}
