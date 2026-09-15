'use client';

import React, { useEffect, useState, useCallback } from 'react';
import Link from 'next/link';
import { Edit3, ExternalLink, Trash2, Plus, AlertCircle, Tag } from 'lucide-react';
import { CMSPageHeader } from '@/components/admin/cms/CMSPageHeader';
import { ContentFilters } from '@/components/admin/cms/ContentFilters';
import { ContentTable, Column } from '@/components/admin/cms/ContentTable';
import { ContentStatusBadge } from '@/components/admin/cms/ContentStatusBadge';
import { DeleteConfirmationModal } from '@/components/admin/cms/DeleteConfirmationModal';
import { fetchAdminList, deleteAdminItem } from '@/lib/api/adminCms';
import { useAdminAuth } from '@/contexts/AdminAuthContext';

interface BlogItem {
  _id: string;
  title: string;
  slug: string;
  category: string;
  status: 'published' | 'draft' | 'archived';
  featured: boolean;
  publishedAt?: string;
  updatedAt: string;
  author: {
    name: string;
    role: string;
  };
}

export default function AdminInsightsPage() {
  const { hasPermission } = useAdminAuth();
  const canPublish = hasPermission('content:publish');

  const [articles, setArticles] = useState<BlogItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Filters & Pagination
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('all');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);

  // Delete modal state
  const [deletingItem, setDeletingItem] = useState<BlogItem | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const loadArticles = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetchAdminList<BlogItem>('blogs', {
        page,
        limit: 15,
        search: search.trim() || undefined,
        status: status !== 'all' ? status : undefined,
      });

      if (res.success && res.data) {
        setArticles(res.data);
        const meta = (res as unknown as { meta?: { total: number; totalPages: number } }).meta;
        if (meta) {
          setTotal(meta.total);
          setTotalPages(meta.totalPages);
        } else {
          setTotal(res.data.length);
          setTotalPages(1);
        }
      } else {
        setError(res.error || 'Failed to load insights catalog');
      }
    } catch {
      setError('A network error occurred while retrieving insights');
    } finally {
      setLoading(false);
    }
  }, [page, search, status]);

  useEffect(() => {
    loadArticles();
  }, [loadArticles]);

  const handleDelete = async () => {
    if (!deletingItem) return;
    setIsDeleting(true);
    try {
      const res = await deleteAdminItem('blogs', deletingItem._id);
      if (res.success) {
        setDeletingItem(null);
        await loadArticles();
      } else {
        alert(res.error || 'Failed to delete article');
      }
    } catch {
      alert('Network error occurred while deleting article');
    } finally {
      setIsDeleting(false);
    }
  };

  const columns: Column<BlogItem>[] = [
    {
      key: 'title',
      header: 'Perspective / Article Title',
      render: (item) => (
        <div className="space-y-0.5 max-w-sm">
          <Link
            href={`/admin/insights/${item._id}/edit`}
            className="font-serif font-semibold text-slate-100 hover:text-amber-400 transition-colors"
          >
            {item.title}
          </Link>
          <div className="flex items-center gap-2 text-[11px] text-slate-400">
            <span className="text-amber-400/80">{item.category}</span>
            <span>•</span>
            <span>By {item.author?.name || 'Editorial Team'}</span>
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
      key: 'publishedAt',
      header: 'Date',
      render: (item) => (
        <span className="font-mono text-[11px] text-slate-400">
          {item.publishedAt
            ? new Date(item.publishedAt).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
              })
            : new Date(item.updatedAt).toLocaleDateString('en-US', {
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
              href={`/insights/${item.slug}`}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              title="View on Public Website"
            >
              <ExternalLink className="w-4 h-4" />
            </Link>
          )}

          <Link
            href={`/admin/insights/${item._id}/edit`}
            className="p-1.5 rounded-lg text-slate-400 hover:text-amber-400 hover:bg-slate-800 transition-colors"
            title="Edit Article"
          >
            <Edit3 className="w-4 h-4" />
          </Link>

          {canPublish && (
            <button
              onClick={() => setDeletingItem(item)}
              className="p-1.5 rounded-lg text-slate-500 hover:text-rose-400 hover:bg-rose-950/20 transition-colors"
              title="Delete Article"
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
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-serif font-bold text-slate-100">
            Insights & Perspectives
          </h1>
          <p className="text-xs text-slate-400 mt-1 max-w-2xl">
            Author and publish strategic commentary, executive essays, media playbooks, and research briefings.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/admin/insights/categories"
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 text-xs font-medium transition-colors"
          >
            <Tag className="w-3.5 h-3.5 text-amber-400" />
            <span>Categories</span>
          </Link>

          <Link
            href="/admin/insights/new"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-semibold shadow-md transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Write Perspective</span>
          </Link>
        </div>
      </div>

      {error && (
        <div className="mb-6 p-4 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs flex items-center justify-between">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-rose-400 flex-shrink-0" />
            <span>{error}</span>
          </div>
          <button
            onClick={() => loadArticles()}
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
        data={articles}
        loading={loading}
        emptyTitle="No articles found"
        emptyDescription="Begin publishing strategic editorial perspectives or adjust current search filters."
        emptyAction={
          <Link
            href="/admin/insights/new"
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-amber-500 text-slate-950 rounded-lg text-xs font-semibold hover:bg-amber-400 transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Write First Article</span>
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
          itemType="Article"
          isDeleting={isDeleting}
          onConfirm={handleDelete}
          onClose={() => setDeletingItem(null)}
        />
      )}
    </div>
  );
}
