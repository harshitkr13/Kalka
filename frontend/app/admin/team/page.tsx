'use client';

import React, { useEffect, useState, useCallback } from 'react';
import Link from 'next/link';
import { Edit3, Trash2, Plus, AlertCircle, UserCheck } from 'lucide-react';
import { CMSPageHeader } from '@/components/admin/cms/CMSPageHeader';
import { ContentFilters } from '@/components/admin/cms/ContentFilters';
import { ContentTable, Column } from '@/components/admin/cms/ContentTable';
import { ContentStatusBadge } from '@/components/admin/cms/ContentStatusBadge';
import { DeleteConfirmationModal } from '@/components/admin/cms/DeleteConfirmationModal';
import { fetchAdminList, deleteAdminItem } from '@/lib/api/adminCms';
import { useAdminAuth } from '@/contexts/AdminAuthContext';

interface TeamMemberItem {
  _id: string;
  name: string;
  slug: string;
  designation: string;
  bio?: string;
  photo?: string;
  expertise?: string[];
  linkedinUrl?: string;
  email?: string;
  displayOrder: number;
  featured: boolean;
  status: 'published' | 'draft' | 'archived';
  updatedAt: string;
}

export default function AdminTeamPage() {
  const { hasPermission } = useAdminAuth();
  const canPublish = hasPermission('content:publish');

  const [teamMembers, setTeamMembers] = useState<TeamMemberItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('all');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);

  const [deletingItem, setDeletingItem] = useState<TeamMemberItem | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const loadTeam = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetchAdminList<TeamMemberItem>('team', {
        page,
        limit: 15,
        search: search.trim() || undefined,
        status: status !== 'all' ? status : undefined,
      });

      if (res.success && res.data) {
        setTeamMembers(res.data);
        const meta = (res as unknown as { meta?: { total: number; totalPages: number } }).meta;
        if (meta) {
          setTotal(meta.total);
          setTotalPages(meta.totalPages);
        } else {
          setTotal(res.data.length);
          setTotalPages(1);
        }
      } else {
        setError(res.error || 'Failed to load team members');
      }
    } catch {
      setError('A network error occurred while retrieving team profiles');
    } finally {
      setLoading(false);
    }
  }, [page, search, status]);

  useEffect(() => {
    loadTeam();
  }, [loadTeam]);

  const handleDelete = async () => {
    if (!deletingItem) return;
    setIsDeleting(true);
    try {
      const res = await deleteAdminItem('team', deletingItem._id);
      if (res.success) {
        setDeletingItem(null);
        await loadTeam();
      } else {
        alert(res.error || 'Failed to delete team member');
      }
    } catch {
      alert('Network error occurred while deleting team profile');
    } finally {
      setIsDeleting(false);
    }
  };

  const columns: Column<TeamMemberItem>[] = [
    {
      key: 'name',
      header: 'Leadership Profile',
      render: (item) => (
        <div className="flex items-center gap-3">
          {item.photo ? (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img
              src={item.photo}
              alt={item.name}
              className="w-9 h-9 rounded-full object-cover border border-slate-700 bg-slate-800"
              onError={(e) => {
                (e.target as HTMLElement).style.display = 'none';
              }}
            />
          ) : (
            <div className="w-9 h-9 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-400">
              <UserCheck className="w-4 h-4" />
            </div>
          )}
          <div>
            <div className="font-medium text-slate-100">{item.name}</div>
            <div className="text-xs text-slate-400">{item.designation}</div>
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
      key: 'displayOrder',
      header: 'Priority',
      render: (item) => <span className="font-mono text-xs text-slate-400">{item.displayOrder}</span>,
    },
    {
      key: 'actions',
      header: 'Actions',
      className: 'text-right',
      render: (item) => (
        <div className="flex items-center justify-end gap-2">
          <Link
            href={`/admin/team/${item._id}/edit`}
            className="p-1.5 rounded-lg text-slate-400 hover:text-amber-400 hover:bg-slate-800/80 transition-colors"
            title="Edit Profile"
          >
            <Edit3 className="w-4 h-4" />
          </Link>
          {canPublish && (
            <button
              onClick={() => setDeletingItem(item)}
              className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-rose-950/40 transition-colors"
              title="Delete Profile"
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
        title="Team & Leadership Directory"
        description="Govern institutional executive and practice leadership profiles displayed across public team rosters."
        actionHref="/admin/team/new"
        actionLabel="Add Profile"
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
        data={teamMembers}
        loading={loading}
        emptyTitle="No leadership profiles recorded"
        emptyDescription="Profiles created here appear on the public /team institutional page."
        page={page}
        totalPages={totalPages}
        total={total}
        onPageChange={(p) => setPage(p)}
      />

      {deletingItem && (
        <DeleteConfirmationModal
          isOpen={Boolean(deletingItem)}
          itemName={deletingItem.name}
          itemType="team member profile"
          isDeleting={isDeleting}
          onConfirm={handleDelete}
          onClose={() => setDeletingItem(null)}
        />
      )}
    </div>
  );
}
