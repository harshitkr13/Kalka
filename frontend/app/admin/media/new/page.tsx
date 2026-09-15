'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { CMSPageHeader } from '@/components/admin/cms/CMSPageHeader';
import { createAdminItem } from '@/lib/api/adminCms';

export default function AdminNewMediaPage() {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [publication, setPublication] = useState('');
  const [publishedAt, setPublishedAt] = useState('');
  const [url, setUrl] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [coverageType, setCoverageType] = useState('interview');
  const [featured, setFeatured] = useState(false);
  const [displayOrder, setDisplayOrder] = useState(0);
  const [status, setStatus] = useState<'draft' | 'published' | 'archived'>('published');

  const handleTitleChange = (val: string) => {
    setTitle(val);
    if (!slug) {
      setSlug(val.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, ''));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      const res = await createAdminItem('media', {
        title,
        slug,
        publication,
        publishedAt: publishedAt || undefined,
        url,
        excerpt: excerpt || undefined,
        coverageType: coverageType || undefined,
        featured,
        displayOrder: Number(displayOrder),
        status,
      });

      if (res.success) {
        router.push('/admin/media');
      } else {
        setError(res.error || 'Failed to create media record');
      }
    } catch {
      setError('A network error occurred while saving press mention');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <CMSPageHeader
        title="Add Press Coverage"
        description="Catalog an external publication feature or media mention."
        backHref="/admin/media"
      />

      {error && (
        <div className="p-4 rounded-lg bg-rose-950/40 border border-rose-800/80 text-rose-300 text-sm">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="p-6 bg-slate-900/60 border border-slate-800 rounded-xl space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-xs font-semibold uppercase font-mono text-slate-300 mb-1">
              Article Headline *
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => handleTitleChange(e.target.value)}
              required
              className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-slate-100 text-sm focus:border-amber-500 focus:outline-none"
              placeholder="e.g. How Strategic PR Reshapes Luxury Real Estate"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase font-mono text-slate-300 mb-1">
              URL Slug *
            </label>
            <input
              type="text"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              required
              className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-slate-100 text-sm font-mono focus:border-amber-500 focus:outline-none"
              placeholder="how-strategic-pr-reshapes-luxury-real-estate"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-xs font-semibold uppercase font-mono text-slate-300 mb-1">
              Publication Name *
            </label>
            <input
              type="text"
              value={publication}
              onChange={(e) => setPublication(e.target.value)}
              required
              className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-slate-100 text-sm focus:border-amber-500 focus:outline-none"
              placeholder="e.g. Economic Times"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase font-mono text-slate-300 mb-1">
              Coverage Type
            </label>
            <select
              value={coverageType}
              onChange={(e) => setCoverageType(e.target.value)}
              className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-slate-100 text-sm focus:border-amber-500 focus:outline-none"
            >
              <option value="interview">Interview</option>
              <option value="feature">Feature Article</option>
              <option value="op-ed">Op-Ed</option>
              <option value="press-release">Press Release</option>
              <option value="mention">Industry Mention</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase font-mono text-slate-300 mb-1">
              Date Published
            </label>
            <input
              type="date"
              value={publishedAt}
              onChange={(e) => setPublishedAt(e.target.value)}
              className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-slate-100 text-sm focus:border-amber-500 focus:outline-none"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase font-mono text-slate-300 mb-1">
            External Article URL *
          </label>
          <input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            required
            className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-slate-100 text-sm focus:border-amber-500 focus:outline-none"
            placeholder="https://economictimes.indiatimes.com/..."
          />
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase font-mono text-slate-300 mb-1">
            Article Excerpt / Quote
          </label>
          <textarea
            value={excerpt}
            onChange={(e) => setExcerpt(e.target.value)}
            rows={3}
            className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-slate-100 text-sm focus:border-amber-500 focus:outline-none resize-y"
            placeholder="Highlight quote or summary of coverage..."
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 border-t border-slate-800">
          <div>
            <label className="block text-xs font-semibold uppercase font-mono text-slate-300 mb-1">
              Display Order
            </label>
            <input
              type="number"
              value={displayOrder}
              onChange={(e) => setDisplayOrder(parseInt(e.target.value) || 0)}
              className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-slate-100 text-sm font-mono focus:border-amber-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase font-mono text-slate-300 mb-1">
              Publication Status
            </label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value as 'draft' | 'published' | 'archived')}
              className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-slate-100 text-sm focus:border-amber-500 focus:outline-none"
            >
              <option value="published">Published</option>
              <option value="draft">Draft</option>
              <option value="archived">Archived</option>
            </select>
          </div>

          <div className="flex items-center pt-6">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={featured}
                onChange={(e) => setFeatured(e.target.checked)}
                className="rounded border-slate-700 bg-slate-950 text-amber-500 focus:ring-amber-500/20"
              />
              <span className="text-sm text-slate-300 font-medium">Feature on Media Highlights</span>
            </label>
          </div>
        </div>

        <div className="flex items-center justify-end gap-4 pt-6 border-t border-slate-800">
          <button
            type="button"
            onClick={() => router.push('/admin/media')}
            className="px-4 py-2 text-sm text-slate-400 hover:text-slate-200 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={submitting}
            className="px-6 py-2 bg-amber-500 hover:bg-amber-400 disabled:opacity-50 text-slate-950 text-sm font-semibold rounded-lg transition-colors shadow-sm"
          >
            {submitting ? 'Saving...' : 'Save Press Mention'}
          </button>
        </div>
      </form>
    </div>
  );
}
