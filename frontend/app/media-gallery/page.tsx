import type { Metadata } from 'next';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { SectionHeader } from '@/components/editorial/SectionHeader';
import { Gallery, GalleryItemData } from '@/components/editorial/Gallery';
import { FinalCta } from '@/sections/home/FinalCta';
import { getPublicGalleryItems } from '@/lib/api/publicContent';
import { Images } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Media Gallery & Visual Records | Kalka Co. Media Consultancy',
  description: 'Documentary records of high-impact press conferences, executive briefings, and major strategic milestone announcements.',
  alternates: {
    canonical: '/media-gallery',
  },
  openGraph: {
    title: 'Media Gallery & Visual Records | Kalka Co. Media Consultancy',
    description: 'Documentary records of high-impact press conferences, executive briefings, and major strategic milestone announcements.',
    url: 'https://kalka.co/media-gallery',
    siteName: 'Kalka Co. Media Consultancy',
    type: 'website',
    images: ['/assets/social/og-default.jpg'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Media Gallery & Visual Records | Kalka Co. Media Consultancy',
    description: 'Documentary records of high-impact press conferences, executive briefings, and major strategic milestone announcements.',
    images: ['/assets/social/og-default.jpg'],
  },
};

export default async function MediaGalleryPage() {
  const galleryItemsRaw = await getPublicGalleryItems();

  const galleryItems: GalleryItemData[] = galleryItemsRaw.map((item) => ({
    id: item.id,
    title: item.title,
    category: item.category || 'Media Coverage',
    description: item.caption || '',
    caption: item.caption,
    imageUrl: item.imageUrl,
  }));

  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col justify-between">
      <Navbar />

      <main id="main-content" className="flex-1">
        <section className="bg-navy-deep text-white py-20 lg:py-28 border-b border-navy-border text-left">
          <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
            <span className="text-xs font-semibold tracking-widest uppercase text-gold py-1 px-3 rounded-full bg-gold/10 border border-gold/20 inline-block">
              Media Moments
            </span>
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white max-w-3xl leading-tight">
              Media Gallery & Event Documentaries
            </h1>
            <p className="text-lg sm:text-xl text-slate-300 max-w-2xl leading-relaxed font-light">
              Visual records of high-impact press conferences, private executive briefings, and major strategic milestone announcements.
            </p>
          </div>
        </section>

        <section className="py-20 lg:py-28 bg-white border-b border-slate-200">
          <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
            <SectionHeader
              overline="Visual Archive"
              title="Keynotes, Press Briefings & Executive Salons"
              description="Click on any media entry to launch the high-resolution lightbox viewer."
            />

            {galleryItems.length > 0 ? (
              <Gallery items={galleryItems} />
            ) : (
              <div className="p-12 sm:p-16 rounded-xl bg-slate-50 border border-slate-200 text-center max-w-2xl mx-auto space-y-4 shadow-sm">
                <div className="w-14 h-14 rounded-full bg-navy/5 border border-navy/10 flex items-center justify-center text-navy mx-auto">
                  <Images className="w-7 h-7 text-gold-dark" />
                </div>
                <h3 className="font-serif text-2xl font-bold text-navy">
                  Visual Media Archives
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Visual media archives are currently being curated. Photographic records of public briefings, press conferences, and executive proceedings will appear here upon publication.
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
