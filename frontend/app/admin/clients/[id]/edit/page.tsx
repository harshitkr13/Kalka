'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import { CMSPageHeader } from '@/components/admin/cms/CMSPageHeader';
import { fetchAdminItem, updateAdminItem } from '@/lib/api/adminCms';

export default function AdminEditClientPage() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id as string;

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');
  const [industry, setIndustry] = useState('');
  const [shortDescription, setShortDescription] = useState('');
  const [description, setDescription] = useState('');
  const [website, setWebsite] = useState('');
  const [logo, setLogo] = useState('');
  const [logoAsset, setLogoAsset] = useState('');
  const [displayOrder, setDisplayOrder] = useState(0);
  const [approvalStatus, setApprovalStatus] = useState<'PENDING_APPROVAL' | 'APPROVED' | 'RESTRICTED'>('PENDING_APPROVAL');
  const [status, setStatus] = useState<'draft' | 'published' | 'archived'>('draft');

  useEffect(() => {
    async function load() {
      try {
        const res = await fetchAdminItem<any>('clients', id);
        if (res.success && res.data) {
          const d = res.data;
          setName(d.name || '');
          setSlug(d.slug || '');
          setIndustry(d.industry || '');
          setShortDescription(d.shortDescription || '');
          setDescription(d.description || '');
          setWebsite(d.website || '');
          setLogo(d.logo || '');
          setLogoAsset(d.logoAsset || '');
          setDisplayOrder(d.displayOrder || 0);
          setApprovalStatus(d.approvalStatus || 'PENDING_APPROVAL');
          setStatus(d.status || 'draft');
        } else {
          setError(res.error || 'Failed to load client');
        }
      } catch {
        setError('Network error loading client data');
      } finally {
        setLoading(false);
      }
    }
    if (id) load();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      const res = await updateAdminItem('clients', id, {
        name,
        slug,
        industry,
        shortDescription: shortDescription || undefined,
        description: description || undefined,
        website: website || undefined,
        logo: logo || undefined,
        logoAsset: logoAsset || undefined,
        displayOrder: Number(displayOrder),
        approvalStatus,
        status,
      });

      if (res.success) {
        router.push('/admin/clients');
      } else {
        setError(res.error || 'Failed to update client');
      }
    } catch {
      setError('A network error occurred');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <div className="p-8 text-slate-400">Loading client record...</div>;
  }

  return (
    <div className="space-y-6 max-w-4xl">
      <CMSPageHeader
        title={`Edit Client: ${name}`}
        description="Update client entity, approval status, or public visibility."
        backHref="/admin/clients"
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
              Client Name *
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-slate-100 text-sm focus:border-amber-500 focus:outline-none"
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
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase font-mono text-slate-300 mb-1">
              Industry Sector *
            </label>
            <input
              type="text"
              value={industry}
              onChange={(e) => setIndustry(e.target.value)}
              required
              className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-slate-100 text-sm focus:border-amber-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase font-mono text-slate-300 mb-1">
              Website URL
            </label>
            <input
              type="text"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
              className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-slate-100 text-sm focus:border-amber-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase font-mono text-slate-300 mb-1">
              Approval Status
            </label>
            <select
              value={approvalStatus}
              onChange={(e) => setApprovalStatus(e.target.value as any)}
              className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-slate-100 text-sm focus:border-amber-500 focus:outline-none"
            >
              <option value="PENDING_APPROVAL">PENDING_APPROVAL (Text only, badge)</option>
              <option value="APPROVED">APPROVED (Verified for public logo display)</option>
              <option value="RESTRICTED">RESTRICTED (Confidential, hidden)</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase font-mono text-slate-300 mb-1">
              Publishing State
            </label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value as any)}
              className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-slate-100 text-sm focus:border-amber-500 focus:outline-none"
            >
              <option value="draft">Draft (CMS only)</option>
              <option value="published">Published</option>
              <option value="archived">Archived</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase font-mono text-slate-300 mb-1">
              Logo Asset URL / Path
            </label>
            <input
              type="text"
              value={logo}
              onChange={(e) => setLogo(e.target.value)}
              className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-slate-100 text-sm focus:border-amber-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase font-mono text-slate-300 mb-1">
              Display Order
            </label>
            <input
              type="number"
              value={displayOrder}
              onChange={(e) => setDisplayOrder(parseInt(e.target.value, 10) || 0)}
              className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-slate-100 text-sm focus:border-amber-500 focus:outline-none"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase font-mono text-slate-300 mb-1">
            Short Description / Representation Note
          </label>
          <textarea
            value={shortDescription}
            onChange={(e) => setShortDescription(e.target.value)}
            rows={3}
            className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-slate-100 text-sm focus:border-amber-500 focus:outline-none"
          />
        </div>

        <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
          <Link
            href="/admin/clients"
            className="px-4 py-2 rounded-lg border border-slate-700 text-slate-300 hover:bg-slate-800 text-sm font-semibold"
          >
            Cancel
          </Link>
          <button
            type="submit"
            disabled={submitting}
            className="px-5 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 text-sm font-semibold rounded-lg shadow disabled:opacity-50"
          >
            {submitting ? 'Saving...' : 'Update Client'}
          </button>
        </div>
      </form>
    </div>
  );
}
