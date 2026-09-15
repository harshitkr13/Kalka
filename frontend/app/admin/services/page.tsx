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

interface ServiceItem {
  _id: string;
  name: string;
  slug: string;
  shortDescription: string;
  status: 'published' | 'draft' | 'archived';
  featured: boolean;
  displayOrder: number;
  updatedAt: string;
}

export default function AdminServicesPage() {
  const { hasPermission } = useAdminAuth();
  const canPublish = hasPermission('content:publish');

  const [services, setServices] = useState<ServiceItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Filters & Pagination state
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('all');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);

  // Delete modal state
  const [deletingItem, setDeletingItem] = useState<ServiceItem | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const loadServices = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetchAdminList<ServiceItem>('services', {
        page,
        limit: 15,
        search: search.trim() || undefined,
        status: status !== 'all' ? status : undefined,
      });

      if (res.success && res.data) {
        setServices(res.data);
        // If meta pagination exists
        const meta = (res as unknown as { meta?: { total: number; totalPages: number } }).meta;
        if (meta) {
          setTotal(meta.total);
          setTotalPages(meta.totalPages);
        } else {
          setTotal(res.data.length);
          setTotalPages(1);
        }
      } else {
        setError(res.error || 'Failed to load services catalog');
      }
    } catch {
      setError('A network error occurred while retrieving services');
    } finally {
      setLoading(false);
    }
  }, [page, search, status]);

  useEffect(() => {
    loadServices();
  }, [loadServices]);

  const handleDelete = async () => {
    if (!deletingItem) return;
    setIsDeleting(true);
    try {
      const res = await deleteAdminItem('services', deletingItem._id);
      if (res.success) {
        setDeletingItem(null);
        await loadServices();
      } else {
        alert(res.error || 'Failed to delete service');
      }
    } catch {
      alert('Network error occurred while deleting service');
    } finally {
      setIsDeleting(false);
    }
  };

  const columns: Column<ServiceItem>[] = [
    {
      key: 'name',
      header: 'Practice Area / Service',
      render: (item) => (
        <div className="space-y-0.5 max-w-sm">
          <Link
            href={`/admin/services/${item._id}/edit`}
            className="font-serif font-semibold text-slate-100 hover:text-amber-400 transition-colors"
          >
            {item.name}
          </Link>
          <p className="text-[11px] text-slate-400 line-clamp-1">
            {item.shortDescription}
          </p>
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
              href={`/services/${item.slug}`}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              title="View on Public Website"
            >
              <ExternalLink className="w-4 h-4" />
            </Link>
          )}

          <Link
            href={`/admin/services/${item._id}/edit`}
            className="p-1.5 rounded-lg text-slate-400 hover:text-amber-400 hover:bg-slate-800 transition-colors"
            title="Edit Service"
          >
            <Edit3 className="w-4 h-4" />
          </Link>

          {canPublish && (
            <button
              onClick={() => setDeletingItem(item)}
              className="p-1.5 rounded-lg text-slate-500 hover:text-rose-400 hover:bg-rose-950/20 transition-colors"
              title="Delete Service"
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
        title="Services & Practice Areas"
        description="Author, review, and manage strategic communications services, capabilities, and delivery methodology."
        actionHref="/admin/services/new"
        actionLabel="Create Service"
        actionIcon={Plus}
      />

      {error && (
        <div className="mb-6 p-4 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs flex items-center justify-between">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-rose-400 flex-shrink-0" />
            <span>{error}</span>
          </div>
          <button
            onClick={() => loadServices()}
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
        data={services}
        loading={loading}
        emptyTitle="No service practices found"
        emptyDescription="Create your first strategic communications practice or adjust your search filters."
        emptyAction={
          <Link
            href="/admin/services/new"
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-amber-500 text-slate-950 rounded-lg text-xs font-semibold hover:bg-amber-400 transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Create New Service</span>
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
          itemName={deletingItem.name}
          itemType="Service"
          isDeleting={isDeleting}
          onConfirm={handleDelete}
          onClose={() => setDeletingItem(null)}
        />
      )}
    </div>
  );
}
