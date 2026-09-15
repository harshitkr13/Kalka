'use client';

import React, { useEffect, useState, useCallback } from 'react';
import Link from 'next/link';
import { Edit3, Trash2, Plus, AlertCircle, CheckCircle, Clock } from 'lucide-react';
import { CMSPageHeader } from '@/components/admin/cms/CMSPageHeader';
import { ContentFilters } from '@/components/admin/cms/ContentFilters';
import { ContentTable, Column } from '@/components/admin/cms/ContentTable';
import { ContentStatusBadge } from '@/components/admin/cms/ContentStatusBadge';
import { DeleteConfirmationModal } from '@/components/admin/cms/DeleteConfirmationModal';
import { fetchAdminList, deleteAdminItem, updateAdminItem } from '@/lib/api/adminCms';
import { useAdminAuth } from '@/contexts/AdminAuthContext';
import { cn } from '@/lib/utils';

interface ClientItem {
  _id: string;
  name: string;
  slug: string;
  industry: string;
  shortDescription?: string;
  status: 'published' | 'draft' | 'archived';
  approvalStatus: 'PENDING_APPROVAL' | 'APPROVED' | 'RESTRICTED';
  logo?: string;
  featured: boolean;
  displayOrder: number;
  updatedAt: string;
}

export default function AdminClientsPage() {
  const { hasPermission } = useAdminAuth();
  const canPublish = hasPermission('content:publish');

  const [clients, setClients] = useState<ClientItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('all');
  const [approvalFilter, setApprovalFilter] = useState('all');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);

  const [deletingItem, setDeletingItem] = useState<ClientItem | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const loadClients = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetchAdminList<ClientItem>('clients', {
        page,
        limit: 15,
        search: search.trim() || undefined,
        status: status !== 'all' ? status : undefined,
        approvalStatus: approvalFilter !== 'all' ? approvalFilter : undefined,
      });

      if (res.success && res.data) {
        setClients(res.data);
        const meta = (res as unknown as { meta?: { total: number; totalPages: number } }).meta;
        if (meta) {
          setTotal(meta.total);
          setTotalPages(meta.totalPages);
        } else {
          setTotal(res.data.length);
          setTotalPages(1);
        }
      } else {
        setError(res.error || 'Failed to load client roster');
      }
    } catch {
      setError('A network error occurred while retrieving clients');
    } finally {
      setLoading(false);
    }
  }, [page, search, status, approvalFilter]);

  useEffect(() => {
    loadClients();
  }, [loadClients]);

  const handleDelete = async () => {
    if (!deletingItem) return;
    setIsDeleting(true);
    try {
      const res = await deleteAdminItem('clients', deletingItem._id);
      if (res.success) {
        setDeletingItem(null);
        await loadClients();
      } else {
        alert(res.error || 'Failed to delete client');
      }
    } catch {
      alert('Network error occurred while deleting client');
    } finally {
      setIsDeleting(false);
    }
  };

  const handleApprovalChange = async (client: ClientItem, newStatus: 'PENDING_APPROVAL' | 'APPROVED' | 'RESTRICTED') => {
    try {
      const res = await updateAdminItem<{ client: ClientItem }>('clients', `${client._id}/approval`, {
        approvalStatus: newStatus,
        notes: `Updated to ${newStatus} via administrative quick-action`,
      });
      if (res.success) {
        await loadClients();
      } else {
        alert(res.error || 'Failed to update approval status');
      }
    } catch {
      alert('Network error updating approval status');
    }
  };

  const columns: Column<ClientItem>[] = [
    {
      key: 'name',
      header: 'Client & Industry',
      render: (item) => (
        <div>
          <div className="font-medium text-slate-100">{item.name}</div>
          <div className="text-xs text-slate-400">
            {item.industry} {item.slug && <span className="text-slate-500 font-mono">({item.slug})</span>}
          </div>
        </div>
      ),
    },
    {
      key: 'approvalStatus',
      header: 'Governance & Approval',
      render: (item) => (
        <div className="flex items-center gap-2">
          <span
            className={cn(
              'inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold font-mono',
              item.approvalStatus === 'APPROVED' && 'bg-emerald-950/80 text-emerald-300 border border-emerald-800/80',
              item.approvalStatus === 'PENDING_APPROVAL' && 'bg-amber-950/80 text-amber-300 border border-amber-800/80',
              item.approvalStatus === 'RESTRICTED' && 'bg-rose-950/80 text-rose-300 border border-rose-800/80'
            )}
          >
            {item.approvalStatus === 'APPROVED' && <CheckCircle className="w-3.5 h-3.5" />}
            {item.approvalStatus === 'PENDING_APPROVAL' && <Clock className="w-3.5 h-3.5" />}
            {item.approvalStatus.replace('_', ' ')}
          </span>

          {canPublish && (
            <select
              value={item.approvalStatus}
              onChange={(e) => handleApprovalChange(item, e.target.value as 'PENDING_APPROVAL' | 'APPROVED' | 'RESTRICTED')}
              className="bg-slate-900 border border-slate-700 text-slate-300 text-xs rounded px-2 py-1 focus:outline-none focus:border-amber-500"
            >
              <option value="PENDING_APPROVAL">Pending Approval</option>
              <option value="APPROVED">Approve (Enable Logo)</option>
              <option value="RESTRICTED">Restricted (NDAs)</option>
            </select>
          )}
        </div>
      ),
    },
    {
      key: 'status',
      header: 'Publish Status',
      render: (item) => <ContentStatusBadge status={item.status} />,
    },
    {
      key: 'displayOrder',
      header: 'Order',
      render: (item) => <span className="font-mono text-xs text-slate-400">{item.displayOrder}</span>,
    },
    {
      key: 'actions',
      header: 'Actions',
      className: 'text-right',
      render: (item) => (
        <div className="flex items-center justify-end gap-2">
          <Link
            href={`/admin/clients/${item._id}/edit`}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            title="Edit Client"
          >
            <Edit3 className="w-4 h-4" />
          </Link>
          {canPublish && (
            <button
              onClick={() => setDeletingItem(item)}
              className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-rose-950/30 transition-colors"
              title="Delete Client"
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
        title="Clients Roster CMS"
        description="Institutional management of corporate clients, brand associations, and approval governance."
        actionHref="/admin/clients/new"
        actionLabel="Add Client"
        actionIcon={Plus}
      />

      {error && (
        <div className="p-4 rounded-lg bg-rose-950/40 border border-rose-800/80 text-rose-300 text-sm flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      <ContentFilters
        search={search}
        onSearchChange={(val) => { setSearch(val); setPage(1); }}
        status={status}
        onStatusChange={(val) => { setStatus(val); setPage(1); }}
        extraFilterLabel="Approval Status"
        extraFilterValue={approvalFilter}
        extraFilterOptions={[
          { label: 'All Approvals', value: 'all' },
          { label: 'Pending Approval', value: 'PENDING_APPROVAL' },
          { label: 'Approved', value: 'APPROVED' },
          { label: 'Restricted', value: 'RESTRICTED' },
        ]}
        onExtraFilterChange={(val) => { setApprovalFilter(val); setPage(1); }}
        onReset={() => { setSearch(''); setStatus('all'); setApprovalFilter('all'); setPage(1); }}
      />

      <ContentTable
        columns={columns}
        data={clients}
        loading={loading}
        emptyTitle="No clients found"
        emptyDescription="Register your first corporate client entity or adjust your search filters."
        page={page}
        totalPages={totalPages}
        total={total}
        onPageChange={(p) => setPage(p)}
      />

      {deletingItem && (
        <DeleteConfirmationModal
          isOpen={Boolean(deletingItem)}
          itemName={deletingItem.name}
          itemType="client"
          isDeleting={isDeleting}
          onConfirm={handleDelete}
          onClose={() => setDeletingItem(null)}
        />
      )}
    </div>
  );
}
