'use client';

import React, { useEffect, useState, use } from 'react';
import { useRouter } from 'next/navigation';
import { CMSPageHeader } from '@/components/admin/cms/CMSPageHeader';
import { fetchAdminItem, updateAdminItem } from '@/lib/api/adminCms';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function AdminEditTeamMemberPage({ params }: PageProps) {
  const { id } = use(params);
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');
  const [designation, setDesignation] = useState('');
  const [bio, setBio] = useState('');
  const [photo, setPhoto] = useState('');
  const [expertise, setExpertise] = useState('');
  const [linkedinUrl, setLinkedinUrl] = useState('');
  const [email, setEmail] = useState('');
  const [displayOrder, setDisplayOrder] = useState(0);
  const [featured, setFeatured] = useState(false);
  const [status, setStatus] = useState<'draft' | 'published' | 'archived'>('published');

  useEffect(() => {
    async function loadItem() {
      try {
        const res = await fetchAdminItem<{
          name: string;
          slug: string;
          designation: string;
          bio?: string;
          photo?: string;
          expertise?: string[];
          linkedinUrl?: string;
          email?: string;
          displayOrder?: number;
          featured?: boolean;
          status: 'draft' | 'published' | 'archived';
        }>('team', id);

        if (res.success && res.data) {
          setName(res.data.name || '');
          setSlug(res.data.slug || '');
          setDesignation(res.data.designation || '');
          setBio(res.data.bio || '');
          setPhoto(res.data.photo || '');
          setExpertise(res.data.expertise ? res.data.expertise.join(', ') : '');
          setLinkedinUrl(res.data.linkedinUrl || '');
          setEmail(res.data.email || '');
          setDisplayOrder(res.data.displayOrder || 0);
          setFeatured(!!res.data.featured);
          setStatus(res.data.status || 'published');
        } else {
          setError(res.error || 'Failed to load profile');
        }
      } catch {
        setError('Network error occurred while fetching profile');
      } finally {
        setLoading(false);
      }
    }
    loadItem();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    const expertiseList = expertise
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);

    try {
      const res = await updateAdminItem('team', id, {
        name,
        slug,
        designation,
        bio: bio || undefined,
        photo: photo || undefined,
        expertise: expertiseList.length > 0 ? expertiseList : undefined,
        linkedinUrl: linkedinUrl || undefined,
        email: email || undefined,
        displayOrder: Number(displayOrder),
        featured,
        status,
      });

      if (res.success) {
        router.push('/admin/team');
      } else {
        setError(res.error || 'Failed to update profile');
      }
    } catch {
      setError('A network error occurred while updating profile');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <div className="p-8 text-center text-slate-400 font-mono text-sm">Loading profile data...</div>;
  }

  return (
    <div className="space-y-6 max-w-4xl">
      <CMSPageHeader
        title={`Edit Profile: ${name}`}
        description="Update executive profile, credentials, and publication status."
        backHref="/admin/team"
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
              Full Name *
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
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-xs font-semibold uppercase font-mono text-slate-300 mb-1">
              Designation / Title *
            </label>
            <input
              type="text"
              value={designation}
              onChange={(e) => setDesignation(e.target.value)}
              required
              className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-slate-100 text-sm focus:border-amber-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase font-mono text-slate-300 mb-1">
              Official Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-slate-100 text-sm focus:border-amber-500 focus:outline-none"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase font-mono text-slate-300 mb-1">
            Executive Biography
          </label>
          <textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            rows={4}
            className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-slate-100 text-sm focus:border-amber-500 focus:outline-none resize-y"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-xs font-semibold uppercase font-mono text-slate-300 mb-1">
              Portrait Photo Asset URL
            </label>
            <input
              type="text"
              value={photo}
              onChange={(e) => setPhoto(e.target.value)}
              className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-slate-100 text-sm focus:border-amber-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase font-mono text-slate-300 mb-1">
              LinkedIn Profile URL
            </label>
            <input
              type="url"
              value={linkedinUrl}
              onChange={(e) => setLinkedinUrl(e.target.value)}
              className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-slate-100 text-sm focus:border-amber-500 focus:outline-none"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase font-mono text-slate-300 mb-1">
            Core Expertise Areas (comma-separated)
          </label>
          <input
            type="text"
            value={expertise}
            onChange={(e) => setExpertise(e.target.value)}
            className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-slate-100 text-sm focus:border-amber-500 focus:outline-none"
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
              Status
            </label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value as 'draft' | 'published' | 'archived')}
              className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-slate-100 text-sm focus:border-amber-500 focus:outline-none"
            >
              <option value="published">Published (Visible)</option>
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
              <span className="text-sm text-slate-300 font-medium">Feature on Homepage / Highlights</span>
            </label>
          </div>
        </div>

        <div className="flex items-center justify-end gap-4 pt-6 border-t border-slate-800">
          <button
            type="button"
            onClick={() => router.push('/admin/team')}
            className="px-4 py-2 text-sm text-slate-400 hover:text-slate-200 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={submitting}
            className="px-6 py-2 bg-amber-500 hover:bg-amber-400 disabled:opacity-50 text-slate-950 text-sm font-semibold rounded-lg transition-colors shadow-sm"
          >
            {submitting ? 'Updating...' : 'Update Profile'}
          </button>
        </div>
      </form>
    </div>
  );
}
