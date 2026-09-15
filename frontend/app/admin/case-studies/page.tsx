'use client';

import React, { useEffect, useState, useCallback } from 'react';
import Link from 'next/link';
import { Edit3, ExternalLink, Trash2, Plus, AlertCircle } from 'lucide-react';
import { CMSPageHeader } from '@/components/admin/cms/CMSPageHeader';
import { ContentFilters } from '@/components/admin/cms/ContentFilters';
import { ContentTable, Column } from '@/components/admin/cms/ContentTable';
import { ContentStatusBadge } from '@/components/admin/cms/ContentStatusBadge';
import { DeleteConfirmationModal } from '@/components/admin/cms/DeleteConfirmationModal';
import { fetchAdminList, deleteAdminItem } from '@/lib/api/adminCms';
import { useAdminAuth } from '@/contexts/AdminAuthContext';

interface CaseStudyItem {
  _id: string;
  title: string;
  slug: string;
  clientName: string;
  industry: string;
  status: 'published' | 'draft' | 'archived';
  featured: boolean;
  updatedAt: string;
}

export default function AdminCaseStudiesPage() {
  const { hasPermission } = useAdminAuth();
  const canPublish = hasPermission('content:publish');

  const [caseStudies, setCaseStudies] = useState<CaseStudyItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Filters & Pagination
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('all');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);

  // Delete modal state
  const [deletingItem, setDeletingItem] = useState<CaseStudyItem | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const loadCaseStudies = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetchAdminList<CaseStudyItem>('case-studies', {
        page,
        limit: 15,
        search: search.trim() || undefined,
        status: status !== 'all' ? status : undefined,
      });

      if (res.success && res.data) {
        setCaseStudies(res.data);
        const meta = (res as unknown as { meta?: { total: number; totalPages: number } }).meta;
        if (meta) {
          setTotal(meta.total);
          setTotalPages(meta.totalPages);
        } else {
          setTotal(res.data.length);
          setTotalPages(1);
        }
      } else {
        setError(res.error || 'Failed to load case studies');
      }
    } catch {
      setError('A network error occurred while retrieving case studies');
    } finally {
      setLoading(false);
    }
  }, [page, search, status]);

  useEffect(() => {
    loadCaseStudies();
  }, [loadCaseStudies]);

  const handleDelete = async () => {
    if (!deletingItem) return;
    setIsDeleting(true);
    try {
      const res = await deleteAdminItem('case-studies', deletingItem._id);
      if (res.success) {
        setDeletingItem(null);
        await loadCaseStudies();
      } else {
        alert(res.error || 'Failed to delete case study');
      }
    } catch {
      alert('Network error occurred while deleting case study');
    } finally {
      setIsDeleting(false);
    }
  };

  const columns: Column<CaseStudyItem>[] = [
    {
      key: 'title',
      header: 'Case Study Title & Client',
      render: (item) => (
        <div className="space-y-0.5 max-w-sm">
          <Link
            href={`/admin/case-studies/${item._id}/edit`}
            className="font-serif font-semibold text-slate-100 hover:text-amber-400 transition-colors"
          >
            {item.title}
          </Link>
          <div className="flex items-center gap-2 text-[11px] text-slate-400">
            <span>Client: {item.clientName}</span>
            <span>•</span>
            <span className="text-slate-500">{item.industry}</span>
          </div>
        </div>
      ),
    },
    {
      key: 'slug',
      header: 'URL Slug',
      render: (item) => (
        <span className="font-mono text-xs text-amber-400/90">
          /{item.slug}
        </span>
      ),
    },
    {
      key: 'status',
      header: 'Status',
      render: (item) => <ContentStatusBadge status={item.status} size="sm" />,
    },
    {
      key: 'updatedAt',
      header: 'Last Modified',
      render: (item) => (
        <span className="font-mono text-[11px] text-slate-400">
          {new Date(item.updatedAt).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
          })}
        </span>
      ),
    },
    {
      key: 'actions',
      header: 'Actions',
      className: 'text-right',
      render: (item) => (
        <div className="flex items-center justify-end gap-2">
          {item.status === 'published' && (
            <Link
              href={`/case-studies/${item.slug}`}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              title="View on Public Website"
            >
              <ExternalLink className="w-4 h-4" />
            </Link>
          )}

          <Link
            href={`/admin/case-studies/${item._id}/edit`}
            className="p-1.5 rounded-lg text-slate-400 hover:text-amber-400 hover:bg-slate-800 transition-colors"
            title="Edit Case Study"
          >
            <Edit3 className="w-4 h-4" />
          </Link>

          {canPublish && (
            <button
              onClick={() => setDeletingItem(item)}
              className="p-1.5 rounded-lg text-slate-500 hover:text-rose-400 hover:bg-rose-950/20 transition-colors"
              title="Delete Case Study"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          )}
        </div>
      ),
    },
  ];

  return (
    <div>
      <CMSPageHeader
        title="Case Studies & Engagements"
        description="Document strategic client engagements, challenge framing, execution methodologies, and verified outcomes."
        actionHref="/admin/case-studies/new"
        actionLabel="New Case Study"
        actionIcon={Plus}
      />

      {error && (
        <div className="mb-6 p-4 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs flex items-center justify-between">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-rose-400 flex-shrink-0" />
            <span>{error}</span>
          </div>
          <button
            onClick={() => loadCaseStudies()}
            className="px-3 py-1 bg-rose-500/20 hover:bg-rose-500/30 rounded text-rose-200 font-medium transition-colors"
          >
            Retry
          </button>
        </div>
      )}

      <ContentFilters
        search={search}
        onSearchChange={(val) => {
          setSearch(val);
          setPage(1);
        }}
        status={status}
        onStatusChange={(val) => {
          setStatus(val);
          setPage(1);
        }}
        onReset={() => {
          setSearch('');
          setStatus('all');
          setPage(1);
        }}
      />

      <ContentTable
        columns={columns}
        data={caseStudies}
        loading={loading}
        emptyTitle="No case studies found"
        emptyDescription="Create your first client engagement case study or refine your search."
        emptyAction={
          <Link
            href="/admin/case-studies/new"
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-amber-500 text-slate-950 rounded-lg text-xs font-semibold hover:bg-amber-400 transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Create First Case Study</span>
          </Link>
        }
        page={page}
        totalPages={totalPages}
        total={total}
        onPageChange={(p) => setPage(p)}
      />

      {deletingItem && (
        <DeleteConfirmationModal
          isOpen={Boolean(deletingItem)}
          itemName={deletingItem.title}
          itemType="Case Study"
          isDeleting={isDeleting}
          onConfirm={handleDelete}
          onClose={() => setDeletingItem(null)}
        />
      )}
    </div>
  );
}
