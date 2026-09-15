'use client';

import React, { useEffect, useState, use } from 'react';
import { useRouter } from 'next/navigation';
import { CMSPageHeader } from '@/components/admin/cms/CMSPageHeader';
import { fetchAdminItem, updateAdminItem } from '@/lib/api/adminCms';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function AdminEditCareerPage({ params }: PageProps) {
  const { id } = use(params);
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [department, setDepartment] = useState('');
  const [location, setLocation] = useState('');
  const [employmentType, setEmploymentType] = useState('');
  const [experienceLevel, setExperienceLevel] = useState('');
  const [shortDescription, setShortDescription] = useState('');
  const [overview, setOverview] = useState('');
  const [responsibilities, setResponsibilities] = useState('');
  const [qualifications, setQualifications] = useState('');
  const [applicationEmail, setApplicationEmail] = useState('');
  const [applicationUrl, setApplicationUrl] = useState('');
  const [deadline, setDeadline] = useState('');
  const [featured, setFeatured] = useState(false);
  const [displayOrder, setDisplayOrder] = useState(0);
  const [status, setStatus] = useState<'draft' | 'published' | 'archived'>('published');

  useEffect(() => {
    async function loadItem() {
      try {
        const res = await fetchAdminItem<{
          title: string;
          slug: string;
          department: string;
          location: string;
          employmentType: string;
          experienceLevel: string;
          shortDescription: string;
          overview?: string;
          responsibilities?: string[];
          qualifications?: string[];
          applicationEmail?: string;
          applicationUrl?: string;
          deadline?: string;
          featured?: boolean;
          displayOrder?: number;
          status: 'draft' | 'published' | 'archived';
        }>('careers', id);

        if (res.success && res.data) {
          setTitle(res.data.title || '');
          setSlug(res.data.slug || '');
          setDepartment(res.data.department || '');
          setLocation(res.data.location || '');
          setEmploymentType(res.data.employmentType || '');
          setExperienceLevel(res.data.experienceLevel || '');
          setShortDescription(res.data.shortDescription || '');
          setOverview(res.data.overview || '');
          setResponsibilities(res.data.responsibilities ? res.data.responsibilities.join('\n') : '');
          setQualifications(res.data.qualifications ? res.data.qualifications.join('\n') : '');
          setApplicationEmail(res.data.applicationEmail || 'djdurgesh8@gmail.com');
          setApplicationUrl(res.data.applicationUrl || '');
          setDeadline(res.data.deadline || '');
          setFeatured(!!res.data.featured);
          setDisplayOrder(res.data.displayOrder || 0);
          setStatus(res.data.status || 'published');
        } else {
          setError(res.error || 'Failed to load position');
        }
      } catch {
        setError('Network error occurred while fetching position');
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

    const respList = responsibilities
      .split('\n')
      .map((s) => s.trim())
      .filter(Boolean);

    const qualList = qualifications
      .split('\n')
      .map((s) => s.trim())
      .filter(Boolean);

    try {
      const res = await updateAdminItem('careers', id, {
        title,
        slug,
        department,
        location,
        employmentType,
        experienceLevel,
        shortDescription,
        overview: overview || shortDescription,
        responsibilities: respList.length > 0 ? respList : undefined,
        qualifications: qualList.length > 0 ? qualList : undefined,
        applicationEmail: applicationEmail || 'djdurgesh8@gmail.com',
        applicationUrl: applicationUrl || undefined,
        deadline: deadline || undefined,
        featured,
        displayOrder: Number(displayOrder),
        status,
      });

      if (res.success) {
        router.push('/admin/careers');
      } else {
        setError(res.error || 'Failed to update career posting');
      }
    } catch {
      setError('A network error occurred while updating role');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <div className="p-8 text-center text-slate-400 font-mono text-sm">Loading career posting...</div>;
  }

  return (
    <div className="space-y-6 max-w-4xl">
      <CMSPageHeader
        title={`Edit Opening: ${title}`}
        description="Update role requirements, specifications, and recruitment status."
        backHref="/admin/careers"
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
              Job Title *
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-xs font-semibold uppercase font-mono text-slate-300 mb-1">
              Practice / Department *
            </label>
            <input
              type="text"
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              required
              className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-slate-100 text-sm focus:border-amber-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase font-mono text-slate-300 mb-1">
              Location *
            </label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              required
              className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-slate-100 text-sm focus:border-amber-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase font-mono text-slate-300 mb-1">
              Employment Type *
            </label>
            <select
              value={employmentType}
              onChange={(e) => setEmploymentType(e.target.value)}
              className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-slate-100 text-sm focus:border-amber-500 focus:outline-none"
            >
              <option value="Full-time">Full-time</option>
              <option value="Part-time">Part-time</option>
              <option value="Contract">Contract / Retainer</option>
              <option value="Fellowship">Fellowship / Residency</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-xs font-semibold uppercase font-mono text-slate-300 mb-1">
              Experience Level *
            </label>
            <input
              type="text"
              value={experienceLevel}
              onChange={(e) => setExperienceLevel(e.target.value)}
              required
              className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-slate-100 text-sm focus:border-amber-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase font-mono text-slate-300 mb-1">
              Application Email
            </label>
            <input
              type="email"
              value={applicationEmail}
              onChange={(e) => setApplicationEmail(e.target.value)}
              className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-slate-100 text-sm focus:border-amber-500 focus:outline-none"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase font-mono text-slate-300 mb-1">
            Short Description *
          </label>
          <textarea
            value={shortDescription}
            onChange={(e) => setShortDescription(e.target.value)}
            required
            rows={2}
            className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-slate-100 text-sm focus:border-amber-500 focus:outline-none resize-y"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase font-mono text-slate-300 mb-1">
            Comprehensive Role Overview
          </label>
          <textarea
            value={overview}
            onChange={(e) => setOverview(e.target.value)}
            rows={4}
            className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-slate-100 text-sm focus:border-amber-500 focus:outline-none resize-y"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-xs font-semibold uppercase font-mono text-slate-300 mb-1">
              Responsibilities (one per line)
            </label>
            <textarea
              value={responsibilities}
              onChange={(e) => setResponsibilities(e.target.value)}
              rows={5}
              className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-slate-100 text-sm font-mono focus:border-amber-500 focus:outline-none resize-y"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase font-mono text-slate-300 mb-1">
              Qualifications & Credentials (one per line)
            </label>
            <textarea
              value={qualifications}
              onChange={(e) => setQualifications(e.target.value)}
              rows={5}
              className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-slate-100 text-sm font-mono focus:border-amber-500 focus:outline-none resize-y"
            />
          </div>
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
              <option value="published">Published (Open)</option>
              <option value="draft">Draft</option>
              <option value="archived">Archived (Closed)</option>
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
              <span className="text-sm text-slate-300 font-medium">Feature prominently</span>
            </label>
          </div>
        </div>

        <div className="flex items-center justify-end gap-4 pt-6 border-t border-slate-800">
          <button
            type="button"
            onClick={() => router.push('/admin/careers')}
            className="px-4 py-2 text-sm text-slate-400 hover:text-slate-200 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={submitting}
            className="px-6 py-2 bg-amber-500 hover:bg-amber-400 disabled:opacity-50 text-slate-950 text-sm font-semibold rounded-lg transition-colors shadow-sm"
          >
            {submitting ? 'Updating...' : 'Update Position'}
          </button>
        </div>
      </form>
    </div>
  );
}
