'use client';

import React, { useEffect, useState, useCallback } from 'react';
import Link from 'next/link';
import { 
  Inbox, 
  Search, 
  Filter, 
  ExternalLink, 
  Trash2, 
  AlertCircle, 
  Phone, 
  Mail, 
  Clock, 
  ShieldAlert, 
  CheckCircle2, 
  MessageSquare,
  Building2,
  Calendar,
  Eye,
  RefreshCw
} from 'lucide-react';
import { CMSPageHeader } from '@/components/admin/cms/CMSPageHeader';
import { ContentTable, Column } from '@/components/admin/cms/ContentTable';
import { DeleteConfirmationModal } from '@/components/admin/cms/DeleteConfirmationModal';
import { fetchAdminLeads, deleteAdminLead, LeadItem } from '@/lib/api/leads';
import { useAdminAuth } from '@/contexts/AdminAuthContext';

export default function AdminLeadsPage() {
  const { user, hasPermission } = useAdminAuth();
  const canManage = hasPermission('leads:manage') || user?.role === 'SUPER_ADMIN' || user?.role === 'LEAD_MANAGER';

  const [leads, setLeads] = useState<LeadItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Filter and pagination state
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('all');
  const [enquiryType, setEnquiryType] = useState('all');
  const [priority, setPriority] = useState('all');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);

  // Delete modal state
  const [deletingItem, setDeletingItem] = useState<LeadItem | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const loadLeads = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetchAdminLeads({
        page,
        limit: 15,
        search: search.trim() || undefined,
        status: status !== 'all' ? status : undefined,
        enquiryType: enquiryType !== 'all' ? enquiryType : undefined,
        priority: priority !== 'all' ? priority : undefined,
      });

      if (res.success && res.data) {
        setLeads(res.data);
        if (res.meta) {
          setTotal(res.meta.total);
          setTotalPages(res.meta.totalPages);
        } else {
          setTotal(res.data.length);
          setTotalPages(1);
        }
      } else {
        setError(res.error || res.message || 'Failed to load inquiry dossiers');
      }
    } catch {
      setError('Network error occurred while fetching inquiry records');
    } finally {
      setLoading(false);
    }
  }, [page, search, status, enquiryType, priority]);

  useEffect(() => {
    loadLeads();
  }, [loadLeads]);

  const handleDelete = async () => {
    if (!deletingItem) return;
    setIsDeleting(true);
    try {
      const res = await deleteAdminLead(deletingItem._id);
      if (res.success) {
        setDeletingItem(null);
        await loadLeads();
      } else {
        alert(res.error || 'Failed to purge lead record');
      }
    } catch {
      alert('Network error occurred while deleting lead');
    } finally {
      setIsDeleting(false);
    }
  };

  const getStatusBadge = (s: string) => {
    switch (s) {
      case 'NEW':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-medium tracking-wider uppercase bg-blue-500/10 text-blue-400 border border-blue-500/20">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
            NEW
          </span>
        );
      case 'CONTACTED':
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-mono font-medium uppercase bg-amber-500/10 text-amber-300 border border-amber-500/20">
            CONTACTED
          </span>
        );
      case 'QUALIFIED':
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-mono font-medium uppercase bg-purple-500/10 text-purple-300 border border-purple-500/20">
            QUALIFIED
          </span>
        );
      case 'PROPOSAL':
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-mono font-medium uppercase bg-cyan-500/10 text-cyan-300 border border-cyan-500/20">
            PROPOSAL
          </span>
        );
      case 'WON':
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-mono font-medium uppercase bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
            WON
          </span>
        );
      case 'LOST':
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-mono font-medium uppercase bg-rose-500/10 text-rose-400 border border-rose-500/20">
            LOST
          </span>
        );
      case 'CLOSED':
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-mono font-medium uppercase bg-slate-800 text-slate-400 border border-slate-700">
            CLOSED
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-mono uppercase bg-slate-800 text-slate-400">
            {s}
          </span>
        );
    }
  };

  const getPriorityBadge = (p: string, urgency: string) => {
    if (urgency === 'crisis' || p === 'URGENT') {
      return (
        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase bg-red-500/20 text-red-300 border border-red-500/30">
          <ShieldAlert className="w-3 h-3 text-red-400" />
          CRISIS / URGENT
        </span>
      );
    }
    if (p === 'HIGH' || urgency === 'priority') {
      return (
        <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-mono font-semibold uppercase bg-amber-500/15 text-amber-300 border border-amber-500/30">
          HIGH PRIORITY
        </span>
      );
    }
    if (p === 'MEDIUM') {
      return (
        <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-mono uppercase bg-blue-500/10 text-blue-300 border border-blue-500/20">
          MEDIUM
        </span>
      );
    }
    return (
      <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-mono uppercase bg-slate-800 text-slate-400 border border-slate-700">
        STANDARD
      </span>
    );
  };

  const columns: Column<LeadItem>[] = [
    {
      key: 'client',
      header: 'Prospective Client / Enterprise',
      render: (item) => (
        <div className="space-y-1 max-w-xs">
          <Link
            href={`/admin/leads/${item._id}`}
            className="font-serif font-bold text-white hover:text-amber-300 transition-colors flex items-center gap-1.5"
          >
            <span>{item.fullName}</span>
            <ExternalLink className="w-3 h-3 text-slate-500" />
          </Link>
          <div className="flex items-center gap-1.5 text-[11px] text-slate-400">
            <Building2 className="w-3 h-3 text-slate-500 flex-shrink-0" />
            <span className="truncate">{item.company}</span>
            {item.designation && <span className="text-slate-600 font-mono">• {item.designation}</span>}
          </div>
          <div className="flex items-center gap-3 text-[11px] text-slate-500 font-mono">
            <a
              href={`mailto:${item.email}`}
              className="hover:text-amber-400 flex items-center gap-1 transition-colors"
              title={item.email}
            >
              <Mail className="w-2.5 h-2.5" />
              <span className="truncate max-w-[130px]">{item.email}</span>
            </a>
            <a
              href={`tel:${item.phone}`}
              className="hover:text-amber-400 flex items-center gap-1 transition-colors"
            >
              <Phone className="w-2.5 h-2.5" />
              <span>{item.phone}</span>
            </a>
          </div>
        </div>
      ),
    },
    {
      key: 'classification',
      header: 'Scope / Classification',
      render: (item) => (
        <div className="space-y-1">
          <div className="font-mono text-[11px] uppercase tracking-wider text-amber-300 font-semibold">
            {item.enquiryType}
          </div>
          {item.service ? (
            <div className="text-xs text-slate-300 line-clamp-1 max-w-[200px]" title={item.service}>
              {item.service}
            </div>
          ) : (
            <div className="text-xs text-slate-500 italic">General Consultation</div>
          )}
          <div className="text-[10px] text-slate-500 font-mono">
            Source: {item.source.replace('_', ' ')}
          </div>
        </div>
      ),
    },
    {
      key: 'urgencyPriority',
      header: 'Urgency & Priority',
      render: (item) => (
        <div className="space-y-1.5">
          <div>{getPriorityBadge(item.priority, item.urgency)}</div>
          <div className="text-[10px] text-slate-400 font-mono">
            Tier: {item.urgency.toUpperCase()}
          </div>
        </div>
      ),
    },
    {
      key: 'status',
      header: 'Docket Status',
      render: (item) => (
        <div className="space-y-1">
          {getStatusBadge(item.status)}
          {item.notes && item.notes.length > 0 && (
            <div className="text-[10px] text-slate-400 font-mono flex items-center gap-1">
              <MessageSquare className="w-2.5 h-2.5 text-slate-500" />
              <span>{item.notes.length} internal note{item.notes.length > 1 ? 's' : ''}</span>
            </div>
          )}
        </div>
      ),
    },
    {
      key: 'receivedAt',
      header: 'Received Horizon',
      render: (item) => {
        const date = new Date(item.createdAt);
        return (
          <div className="space-y-0.5 font-mono text-[11px] text-slate-400">
            <div className="flex items-center gap-1 text-slate-300">
              <Calendar className="w-3 h-3 text-slate-500" />
              <span>
                {date.toLocaleDateString('en-GB', {
                  day: 'numeric',
                  month: 'short',
                  year: 'numeric',
                })}
              </span>
            </div>
            <div className="text-[10px] text-slate-500">
              {date.toLocaleTimeString('en-GB', {
                hour: '2-digit',
                minute: '2-digit',
              })}{' '}
              IST
            </div>
          </div>
        );
      },
    },
    {
      key: 'actions',
      header: 'Actions',
      className: 'text-right',
      render: (item) => (
        <div className="flex items-center justify-end gap-2">
          <Link
            href={`/admin/leads/${item._id}`}
            className="p-1.5 rounded-lg border border-slate-700 bg-slate-800/80 hover:bg-slate-700 text-slate-200 hover:text-white transition-colors"
            title="Open Lead Dossier"
          >
            <Eye className="w-3.5 h-3.5 text-amber-400" />
          </Link>
          {canManage && (
            <button
              onClick={() => setDeletingItem(item)}
              className="p-1.5 rounded-lg border border-slate-700 bg-slate-800/80 hover:bg-rose-950/60 hover:border-rose-700 text-slate-400 hover:text-rose-400 transition-colors"
              title="Purge Record"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <CMSPageHeader
        title="Inquiries & Prospective Mandates"
        description="Central triage desk for institutional media inquiries, crisis alerts, and corporate advisory briefs submitted across public channels."
        secondaryAction={
          <button
            onClick={() => loadLeads()}
            disabled={loading}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-700 bg-slate-800 text-xs font-mono text-slate-300 hover:text-white transition-colors disabled:opacity-50"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
            <span>Refresh Docket</span>
          </button>
        }
      />

      {/* Error alert */}
      {error && (
        <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs flex items-center gap-3">
          <AlertCircle className="w-4 h-4 text-rose-400 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Filters Bar */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 p-4 rounded-xl bg-slate-900/60 border border-slate-800">
        {/* Search */}
        <div className="relative flex-1 min-w-[240px]">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            placeholder="Search by client name, email, organization, or practice..."
            className="w-full pl-10 pr-4 py-2 bg-slate-950/80 border border-slate-800 rounded-lg text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/30 transition-all"
          />
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Status Select */}
          <div className="flex items-center gap-1.5 text-xs text-slate-400 font-mono">
            <Filter className="w-3.5 h-3.5" />
            <select
              value={status}
              onChange={(e) => {
                setStatus(e.target.value);
                setPage(1);
              }}
              className="px-3 py-1.5 bg-slate-950/80 border border-slate-800 rounded-lg text-xs text-slate-200 focus:outline-none focus:border-amber-500/50"
            >
              <option value="all">All Statuses</option>
              <option value="NEW">NEW</option>
              <option value="CONTACTED">CONTACTED</option>
              <option value="QUALIFIED">QUALIFIED</option>
              <option value="PROPOSAL">PROPOSAL</option>
              <option value="WON">WON</option>
              <option value="LOST">LOST</option>
              <option value="CLOSED">CLOSED</option>
            </select>
          </div>

          {/* Enquiry Type Select */}
          <div className="flex items-center gap-1.5 text-xs text-slate-400 font-mono">
            <select
              value={enquiryType}
              onChange={(e) => {
                setEnquiryType(e.target.value);
                setPage(1);
              }}
              className="px-3 py-1.5 bg-slate-950/80 border border-slate-800 rounded-lg text-xs text-slate-200 focus:outline-none focus:border-amber-500/50"
            >
              <option value="all">All Scopes</option>
              <option value="GENERAL">General</option>
              <option value="SERVICE">Service</option>
              <option value="MEDIA">Media</option>
              <option value="PARTNERSHIP">Partnership</option>
              <option value="CAREERS">Careers</option>
              <option value="OTHER">Other</option>
            </select>
          </div>

          {/* Priority Select */}
          <div className="flex items-center gap-1.5 text-xs text-slate-400 font-mono">
            <select
              value={priority}
              onChange={(e) => {
                setPriority(e.target.value);
                setPage(1);
              }}
              className="px-3 py-1.5 bg-slate-950/80 border border-slate-800 rounded-lg text-xs text-slate-200 focus:outline-none focus:border-amber-500/50"
            >
              <option value="all">All Priorities</option>
              <option value="URGENT">Urgent</option>
              <option value="HIGH">High</option>
              <option value="MEDIUM">Medium</option>
              <option value="LOW">Low</option>
            </select>
          </div>

          {/* Reset Filters */}
          {(search || status !== 'all' || enquiryType !== 'all' || priority !== 'all') && (
            <button
              onClick={() => {
                setSearch('');
                setStatus('all');
                setEnquiryType('all');
                setPriority('all');
                setPage(1);
              }}
              className="text-xs text-amber-400 hover:underline font-mono px-2 py-1"
            >
              Reset
            </button>
          )}
        </div>
      </div>

      {/* Leads Table */}
      <ContentTable<LeadItem>
        columns={columns}
        data={leads}
        loading={loading}
        emptyTitle="No Inquiries in Docket"
        emptyDescription="No consultation briefs match the selected filters or query."
        page={page}
        totalPages={totalPages}
        total={total}
        onPageChange={(p) => setPage(p)}
      />

      {/* Delete Confirmation Modal */}
      <DeleteConfirmationModal
        isOpen={Boolean(deletingItem)}
        itemName={deletingItem ? `${deletingItem.fullName} (${deletingItem.company})` : ''}
        itemType="Inquiry Dossier"
        isDeleting={isDeleting}
        onConfirm={handleDelete}
        onClose={() => setDeletingItem(null)}
      />
    </div>
  );
}
