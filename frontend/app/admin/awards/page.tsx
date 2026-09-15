'use client';

import React, { useEffect, useState, useCallback } from 'react';
import Link from 'next/link';
import { Edit3, Trash2, Plus, AlertCircle, Award } from 'lucide-react';
import { CMSPageHeader } from '@/components/admin/cms/CMSPageHeader';
import { ContentFilters } from '@/components/admin/cms/ContentFilters';
import { ContentTable, Column } from '@/components/admin/cms/ContentTable';
import { ContentStatusBadge } from '@/components/admin/cms/ContentStatusBadge';
import { DeleteConfirmationModal } from '@/components/admin/cms/DeleteConfirmationModal';
import { fetchAdminList, deleteAdminItem } from '@/lib/api/adminCms';
import { useAdminAuth } from '@/contexts/AdminAuthContext';

interface AwardItem {
  _id: string;
  title: string;
  slug: string;
  organization: string;
  year: number;
  category: string;
  description?: string;
  badgeImage?: string;
  featured: boolean;
  displayOrder: number;
  status: 'published' | 'draft' | 'archived';
  updatedAt: string;
}

export default function AdminAwardsPage() {
  const { hasPermission } = useAdminAuth();
  const canPublish = hasPermission('content:publish');

  const [awards, setAwards] = useState<AwardItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('all');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);

  const [deletingItem, setDeletingItem] = useState<AwardItem | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const loadAwards = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetchAdminList<AwardItem>('awards', {
        page,
        limit: 15,
        search: search.trim() || undefined,
        status: status !== 'all' ? status : undefined,
      });

      if (res.success && res.data) {
        setAwards(res.data);
        const meta = (res as unknown as { meta?: { total: number; totalPages: number } }).meta;
        if (meta) {
          setTotal(meta.total);
          setTotalPages(meta.totalPages);
        } else {
          setTotal(res.data.length);
          setTotalPages(1);
        }
      } else {
        setError(res.error || 'Failed to load awards directory');
      }
    } catch {
      setError('A network error occurred while retrieving awards');
    } finally {
      setLoading(false);
    }
  }, [page, search, status]);

  useEffect(() => {
    loadAwards();
  }, [loadAwards]);

  const handleDelete = async () => {
    if (!deletingItem) return;
    setIsDeleting(true);
    try {
      const res = await deleteAdminItem('awards', deletingItem._id);
      if (res.success) {
        setDeletingItem(null);
        await loadAwards();
      } else {
        alert(res.error || 'Failed to delete award');
      }
    } catch {
      alert('Network error occurred while deleting award');
    } finally {
      setIsDeleting(false);
    }
  };

  const columns: Column<AwardItem>[] = [
    {
      key: 'title',
      header: 'Honor & Presenting Body',
      render: (item) => (
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
            <Award className="w-4 h-4" />
          </div>
          <div>
            <div className="font-medium text-slate-100">{item.title}</div>
            <div className="text-xs text-slate-400">
              <span className="text-slate-300 font-medium">{item.organization}</span> • {item.year} ({item.category})
            </div>
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
      key: 'actions',
      header: 'Actions',
      className: 'text-right',
      render: (item) => (
        <div className="flex items-center justify-end gap-2">
          <Link
            href={`/admin/awards/${item._id}/edit`}
            className="p-1.5 rounded-lg text-slate-400 hover:text-amber-400 hover:bg-slate-800/80 transition-colors"
            title="Edit Award"
          >
            <Edit3 className="w-4 h-4" />
          </Link>
          {canPublish && (
            <button
              onClick={() => setDeletingItem(item)}
              className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-rose-950/40 transition-colors"
              title="Delete Award"
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
        title="Awards & Industry Recognition"
        description="Govern institutional accolades, citations, and industry campaign honors."
        actionHref="/admin/awards/new"
        actionLabel="Add Award"
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
        data={awards}
        loading={loading}
        emptyTitle="No awards recorded"
        emptyDescription="Honors registered here populate the public /awards section."
        page={page}
        totalPages={totalPages}
        total={total}
        onPageChange={(p) => setPage(p)}
      />

      {deletingItem && (
        <DeleteConfirmationModal
          isOpen={Boolean(deletingItem)}
          itemName={deletingItem.title}
          itemType="award citation"
          isDeleting={isDeleting}
          onConfirm={handleDelete}
          onClose={() => setDeletingItem(null)}
        />
      )}
    </div>
  );
}
