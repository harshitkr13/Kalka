'use client';

import React, { useEffect, useState, useCallback } from 'react';
import Link from 'next/link';
import { Edit3, Trash2, Plus, AlertCircle, Briefcase } from 'lucide-react';
import { CMSPageHeader } from '@/components/admin/cms/CMSPageHeader';
import { ContentFilters } from '@/components/admin/cms/ContentFilters';
import { ContentTable, Column } from '@/components/admin/cms/ContentTable';
import { ContentStatusBadge } from '@/components/admin/cms/ContentStatusBadge';
import { DeleteConfirmationModal } from '@/components/admin/cms/DeleteConfirmationModal';
import { fetchAdminList, deleteAdminItem } from '@/lib/api/adminCms';
import { useAdminAuth } from '@/contexts/AdminAuthContext';

interface CareerItem {
  _id: string;
  title: string;
  slug: string;
  department: string;
  location: string;
  employmentType: string;
  experienceLevel: string;
  status: 'published' | 'draft' | 'archived';
  featured: boolean;
  applicationEmail?: string;
  updatedAt: string;
}

export default function AdminCareersPage() {
  const { hasPermission } = useAdminAuth();
  const canManage = hasPermission('careers:manage');

  const [careers, setCareers] = useState<CareerItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('all');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);

  const [deletingItem, setDeletingItem] = useState<CareerItem | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const loadCareers = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetchAdminList<CareerItem>('careers', {
        page,
        limit: 15,
        search: search.trim() || undefined,
        status: status !== 'all' ? status : undefined,
      });

      if (res.success && res.data) {
        setCareers(res.data);
        const meta = (res as unknown as { meta?: { total: number; totalPages: number } }).meta;
        if (meta) {
          setTotal(meta.total);
          setTotalPages(meta.totalPages);
        } else {
          setTotal(res.data.length);
          setTotalPages(1);
        }
      } else {
        setError(res.error || 'Failed to load career listings');
      }
    } catch {
      setError('A network error occurred while retrieving job postings');
    } finally {
      setLoading(false);
    }
  }, [page, search, status]);

  useEffect(() => {
    loadCareers();
  }, [loadCareers]);

  const handleDelete = async () => {
    if (!deletingItem) return;
    setIsDeleting(true);
    try {
      const res = await deleteAdminItem('careers', deletingItem._id);
      if (res.success) {
        setDeletingItem(null);
        await loadCareers();
      } else {
        alert(res.error || 'Failed to delete position');
      }
    } catch {
      alert('Network error occurred while deleting career listing');
    } finally {
      setIsDeleting(false);
    }
  };

  const columns: Column<CareerItem>[] = [
    {
      key: 'title',
      header: 'Role & Department',
      render: (item) => (
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-400">
            <Briefcase className="w-4 h-4" />
          </div>
          <div>
            <div className="font-medium text-slate-100">{item.title}</div>
            <div className="text-xs text-slate-400">
              <span className="text-amber-400">{item.department}</span> • {item.location} ({item.employmentType})
            </div>
          </div>
        </div>
      ),
    },
    {
      key: 'experienceLevel',
      header: 'Level',
      render: (item) => <span className="text-xs text-slate-300 font-mono">{item.experienceLevel}</span>,
    },
    {
      key: 'status',
      header: 'Status',
      render: (item) => <ContentStatusBadge status={item.status} />,
    },
    {
      key: 'featured',
      header: 'Priority',
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
          {canManage && (
            <>
              <Link
                href={`/admin/careers/${item._id}/edit`}
                className="p-1.5 rounded-lg text-slate-400 hover:text-amber-400 hover:bg-slate-800/80 transition-colors"
                title="Edit Position"
              >
                <Edit3 className="w-4 h-4" />
              </Link>
              <button
                onClick={() => setDeletingItem(item)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-rose-950/40 transition-colors"
                title="Delete Position"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </>
          )}
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <CMSPageHeader
        title="Careers & Practice Opportunities"
        description="Manage institutional job openings, fellowship roles, and recruitment communications."
        actionHref={canManage ? '/admin/careers/new' : undefined}
        actionLabel={canManage ? 'Post Opening' : undefined}
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
        data={careers}
        loading={loading}
        emptyTitle="No open roles currently posted"
        emptyDescription="When no published openings exist, the public /careers page seamlessly displays the direct institutional contact directive (djdurgesh8@gmail.com)."
        page={page}
        totalPages={totalPages}
        total={total}
        onPageChange={(p) => setPage(p)}
      />

      {deletingItem && (
        <DeleteConfirmationModal
          isOpen={Boolean(deletingItem)}
          itemName={deletingItem.title}
          itemType="career opportunity"
          isDeleting={isDeleting}
          onConfirm={handleDelete}
          onClose={() => setDeletingItem(null)}
        />
      )}
    </div>
  );
}
