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

interface MediaItem {
  _id: string;
  title: string;
  slug: string;
  publication: string;
  publishedAt: string;
  url: string;
  coverageType?: string;
  featured: boolean;
  status: 'published' | 'draft' | 'archived';
  updatedAt: string;
}

export default function AdminMediaPage() {
  const { hasPermission } = useAdminAuth();
  const canPublish = hasPermission('content:publish');

  const [mediaItems, setMediaItems] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('all');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);

  const [deletingItem, setDeletingItem] = useState<MediaItem | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const loadMedia = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetchAdminList<MediaItem>('media', {
        page,
        limit: 15,
        search: search.trim() || undefined,
        status: status !== 'all' ? status : undefined,
      });

      if (res.success && res.data) {
        setMediaItems(res.data);
        const meta = (res as unknown as { meta?: { total: number; totalPages: number } }).meta;
        if (meta) {
          setTotal(meta.total);
          setTotalPages(meta.totalPages);
        } else {
          setTotal(res.data.length);
          setTotalPages(1);
        }
      } else {
        setError(res.error || 'Failed to load media coverage');
      }
    } catch {
      setError('A network error occurred while retrieving media mentions');
    } finally {
      setLoading(false);
    }
  }, [page, search, status]);

  useEffect(() => {
    loadMedia();
  }, [loadMedia]);

  const handleDelete = async () => {
    if (!deletingItem) return;
    setIsDeleting(true);
    try {
      const res = await deleteAdminItem('media', deletingItem._id);
      if (res.success) {
        setDeletingItem(null);
        await loadMedia();
      } else {
        alert(res.error || 'Failed to delete press mention');
      }
    } catch {
      alert('Network error occurred while deleting media mention');
    } finally {
      setIsDeleting(false);
    }
  };

  const columns: Column<MediaItem>[] = [
    {
      key: 'title',
      header: 'Headline & Source',
      render: (item) => (
        <div>
          <div className="font-medium text-slate-100">{item.title}</div>
          <div className="flex items-center gap-2 text-xs text-slate-400 mt-0.5">
            <span className="text-amber-400 font-medium">{item.publication}</span>
            <span>•</span>
            <span>{item.publishedAt ? new Date(item.publishedAt).toLocaleDateString() : 'Undated'}</span>
            {item.coverageType && (
              <>
                <span>•</span>
                <span className="capitalize">{item.coverageType}</span>
              </>
            )}
          </div>
        </div>
      ),
    },
    {
      key: 'status',
      header: 'Publication Status',
      render: (item) => <ContentStatusBadge status={item.status} />,
    },
    {
      key: 'featured',
      header: 'Featured',
      render: (item) => (
        <span
          className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-mono font-medium ${
            item.featured
              ? 'bg-amber-950/60 text-amber-300 border border-amber-800/60'
              : 'bg-slate-800 text-slate-400'
          }`}
        >
          {item.featured ? 'Featured' : 'Standard'}
        </span>
      ),
    },
    {
      key: 'url',
      header: 'Press Link',
      render: (item) => (
        <a
          href={item.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-xs text-amber-400 hover:text-amber-300 transition-colors"
        >
          <span>View Source</span>
          <ExternalLink className="w-3 h-3" />
        </a>
      ),
    },
    {
      key: 'actions',
      header: 'Actions',
      className: 'text-right',
      render: (item) => (
        <div className="flex items-center justify-end gap-2">
          <Link
            href={`/admin/media/${item._id}/edit`}
            className="p-1.5 rounded-lg text-slate-400 hover:text-amber-400 hover:bg-slate-800/80 transition-colors"
            title="Edit Mention"
          >
            <Edit3 className="w-4 h-4" />
          </Link>
          {canPublish && (
            <button
              onClick={() => setDeletingItem(item)}
              className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-rose-950/40 transition-colors"
              title="Delete Mention"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          )}
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <CMSPageHeader
        title="Media Mentions & Press Coverage"
        description="Govern external news features, interviews, op-eds, and media mentions for the institutional press center."
        actionHref="/admin/media/new"
        actionLabel="Add Press Mention"
        actionIcon={Plus}
      />

      {error && (
        <div className="p-4 rounded-lg bg-rose-950/40 border border-rose-800/80 text-rose-300 text-sm flex items-center gap-3">
          <AlertCircle className="w-5 h-5 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}

      <ContentFilters
        search={search}
        onSearchChange={(val) => { setSearch(val); setPage(1); }}
        status={status}
        onStatusChange={(val) => { setStatus(val); setPage(1); }}
        onReset={() => { setSearch(''); setStatus('all'); setPage(1); }}
      />

      <ContentTable
        columns={columns}
        data={mediaItems}
        loading={loading}
        emptyTitle="No media mentions cataloged"
        emptyDescription="Items registered here populate the public /media-mentions and /news sections."
        page={page}
        totalPages={totalPages}
        total={total}
        onPageChange={(p) => setPage(p)}
      />

      {deletingItem && (
        <DeleteConfirmationModal
          isOpen={Boolean(deletingItem)}
          itemName={deletingItem.title}
          itemType="media coverage record"
          isDeleting={isDeleting}
          onConfirm={handleDelete}
          onClose={() => setDeletingItem(null)}
        />
      )}
    </div>
  );
}
