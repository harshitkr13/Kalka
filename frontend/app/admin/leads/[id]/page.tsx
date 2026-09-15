'use client';

import React, { useEffect, useState, useCallback } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  ArrowLeft,
  Building2,
  Mail,
  Phone,
  MessageSquare,
  Clock,
  ShieldAlert,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Calendar,
  Send,
  User,
  Trash2,
  ExternalLink,
  HelpCircle,
  FileText
} from 'lucide-react';
import { CMSPageHeader } from '@/components/admin/cms/CMSPageHeader';
import { DeleteConfirmationModal } from '@/components/admin/cms/DeleteConfirmationModal';
import {
  fetchAdminLeadById,
  updateAdminLeadStatus,
  updateAdminLeadPriority,
  addAdminLeadNote,
  deleteAdminLead,
  LeadItem
} from '@/lib/api/leads';
import { useAdminAuth } from '@/contexts/AdminAuthContext';

export default function AdminLeadDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  const { user, hasPermission } = useAdminAuth();
  const canManage = hasPermission('leads:manage') || user?.role === 'SUPER_ADMIN' || user?.role === 'LEAD_MANAGER';

  const [lead, setLead] = useState<LeadItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Status & Priority updating state
  const [updatingStatus, setUpdatingStatus] = useState(false);
  const [updatingPriority, setUpdatingPriority] = useState(false);

  // New note state
  const [noteContent, setNoteContent] = useState('');
  const [submittingNote, setSubmittingNote] = useState(false);
  const [noteError, setNoteError] = useState<string | null>(null);

  // Delete modal
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const loadLead = useCallback(async () => {
    if (!id) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetchAdminLeadById(id);
      if (res.success && res.data) {
        setLead(res.data);
      } else {
        setError(res.error || res.message || 'Failed to retrieve lead dossier');
      }
    } catch {
      setError('Network error occurred while fetching lead dossier');
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    loadLead();
  }, [loadLead]);

  const handleStatusChange = async (newStatus: string) => {
    if (!lead) return;
    setUpdatingStatus(true);
    try {
      const res = await updateAdminLeadStatus(lead._id, newStatus);
      if (res.success && res.data) {
        setLead(res.data);
      } else {
        alert(res.error || 'Failed to update docket status');
      }
    } catch {
      alert('Network error while updating status');
    } finally {
      setUpdatingStatus(false);
    }
  };

  const handlePriorityChange = async (newPriority: string) => {
    if (!lead) return;
    setUpdatingPriority(true);
    try {
      const res = await updateAdminLeadPriority(lead._id, newPriority);
      if (res.success && res.data) {
        setLead(res.data);
      } else {
        alert(res.error || 'Failed to update priority level');
      }
    } catch {
      alert('Network error while updating priority');
    } finally {
      setUpdatingPriority(false);
    }
  };

  const handleAddNote = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!lead || !noteContent.trim()) return;
    setSubmittingNote(true);
    setNoteError(null);
    try {
      const res = await addAdminLeadNote(lead._id, noteContent.trim());
      if (res.success && res.data) {
        setLead(res.data);
        setNoteContent('');
      } else {
        setNoteError(res.error || 'Failed to record note');
      }
    } catch {
      setNoteError('Network error while submitting note');
    } finally {
      setSubmittingNote(false);
    }
  };

  const handleDelete = async () => {
    if (!lead) return;
    setIsDeleting(true);
    try {
      const res = await deleteAdminLead(lead._id);
      if (res.success) {
        router.push('/admin/leads');
      } else {
        alert(res.error || 'Failed to purge record');
      }
    } catch {
      alert('Network error occurred while purging record');
    } finally {
      setIsDeleting(false);
    }
  };

  if (loading) {
    return (
      <div className="p-12 text-center text-slate-400 space-y-3">
        <div className="w-8 h-8 border-2 border-amber-400 border-t-transparent rounded-full animate-spin mx-auto" />
        <p className="text-xs font-mono">Loading lead dossier...</p>
      </div>
    );
  }

  if (error || !lead) {
    return (
      <div className="space-y-6">
        <Link
          href="/admin/leads"
          className="inline-flex items-center gap-1.5 text-xs font-mono text-slate-400 hover:text-white"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Inquiries Docket</span>
        </Link>
        <div className="p-8 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-300 text-sm flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
          <div>
            <h4 className="font-semibold">Unable to access inquiry dossier</h4>
            <p className="text-xs mt-1 text-rose-300/80">{error || 'Lead not found or invalid reference'}</p>
          </div>
        </div>
      </div>
    );
  }

  const createdDate = new Date(lead.createdAt);

  return (
    <div className="space-y-8">
      {/* Header */}
      <CMSPageHeader
        title={`Mandate Dossier: ${lead.fullName}`}
        description={`Institutional brief from ${lead.company} received ${createdDate.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })} at ${createdDate.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })} IST`}
        backHref="/admin/leads"
        backLabel="Back to Inquiries Docket"
        secondaryAction={
          canManage ? (
            <button
              onClick={() => setShowDeleteModal(true)}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border border-rose-800 bg-rose-950/40 text-rose-300 hover:bg-rose-900/50 text-xs font-mono transition-colors"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Purge Dossier</span>
            </button>
          ) : undefined
        }
      />

      {/* Main Grid: Left Dossier / Right Controls */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Brief Context & Notes Timeline (8 cols) */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Urgency Alert Callout if Crisis or High Priority */}
          {(lead.urgency === 'crisis' || lead.priority === 'URGENT') && (
            <div className="p-5 rounded-xl bg-red-950/80 border border-red-800 text-white flex items-start gap-4 shadow-lg">
              <ShieldAlert className="w-6 h-6 text-amber-400 shrink-0 mt-0.5" />
              <div className="space-y-1">
                <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-amber-400">
                  Priority Escalation
                </span>
                <h4 className="font-serif font-bold text-white text-base">
                  Acute Crisis or Urgent Executive SLA Triggered
                </h4>
                <p className="text-xs text-red-200 leading-relaxed">
                  Inquiry submitted under acute response protocol. Immediate direct engagement recommended via WhatsApp hotline or partner direct call.
                </p>
              </div>
            </div>
          )}

          {/* Executive Brief Card */}
          <div className="p-6 sm:p-8 rounded-xl bg-slate-900/70 border border-slate-800 shadow-xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-amber-400" />
                <h3 className="font-serif font-bold text-lg text-white">
                  Executive Brief & Strategic Scope
                </h3>
              </div>
              <span className="text-[10px] font-mono text-slate-500 uppercase">
                Submitted Content
              </span>
            </div>

            <div className="p-4 rounded-lg bg-slate-950/80 border border-slate-800/80 text-slate-200 text-sm leading-relaxed whitespace-pre-wrap font-sans">
              {lead.message}
            </div>

            {/* Scope Details Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 text-xs">
              <div className="p-3 rounded bg-slate-950/40 border border-slate-800">
                <span className="block text-[10px] font-mono text-slate-500 uppercase">Requested Practice Area</span>
                <span className="font-medium text-slate-200">
                  {lead.service || lead.serviceSlug || 'General Practice'}
                </span>
              </div>
              <div className="p-3 rounded bg-slate-950/40 border border-slate-800">
                <span className="block text-[10px] font-mono text-slate-500 uppercase">Enquiry Classification</span>
                <span className="font-medium text-amber-300 font-mono">
                  {lead.enquiryType}
                </span>
              </div>
              <div className="p-3 rounded bg-slate-950/40 border border-slate-800">
                <span className="block text-[10px] font-mono text-slate-500 uppercase">Source Acquisition Channel</span>
                <span className="font-medium text-slate-300">
                  {lead.source} {lead.sourcePage ? `(${lead.sourcePage})` : ''}
                </span>
              </div>
              <div className="p-3 rounded bg-slate-950/40 border border-slate-800">
                <span className="block text-[10px] font-mono text-slate-500 uppercase">Confidentiality Consent</span>
                <span className="font-medium text-emerald-400 flex items-center gap-1 mt-0.5">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  NDA / Privacy Terms Acknowledged
                </span>
              </div>
            </div>
          </div>

          {/* Internal Notes & Audit Trail Card */}
          <div className="p-6 sm:p-8 rounded-xl bg-slate-900/70 border border-slate-800 shadow-xl space-y-6">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div className="flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-amber-400" />
                <h3 className="font-serif font-bold text-lg text-white">
                  Internal Advisory Notes & Audit Trail
                </h3>
              </div>
              <span className="text-[10px] font-mono text-slate-500">
                {lead.notes?.length || 0} Entries
              </span>
            </div>

            {/* Note Timeline */}
            <div className="space-y-4">
              {lead.notes && lead.notes.length > 0 ? (
                lead.notes.map((note, idx) => {
                  const noteDate = new Date(note.createdAt);
                  return (
                    <div
                      key={note._id || idx}
                      className="p-4 rounded-lg bg-slate-950/60 border border-slate-800 space-y-2"
                    >
                      <div className="flex items-center justify-between text-xs text-slate-400">
                        <span className="font-mono font-semibold text-amber-300 flex items-center gap-1.5">
                          <User className="w-3 h-3 text-slate-500" />
                          {note.author}
                        </span>
                        <span className="font-mono text-[10px] text-slate-500">
                          {noteDate.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })},{' '}
                          {noteDate.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>
                      <p className="text-xs text-slate-200 leading-relaxed whitespace-pre-wrap">
                        {note.content}
                      </p>
                    </div>
                  );
                })
              ) : (
                <div className="p-6 rounded-lg bg-slate-950/30 border border-slate-800 text-center text-xs text-slate-500">
                  No internal notes recorded yet. Add operational observations or outreach logs below.
                </div>
              )}
            </div>

            {/* Add Note Form */}
            <form onSubmit={handleAddNote} className="space-y-3 pt-2">
              {noteError && (
                <div className="p-3 rounded bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs">
                  {noteError}
                </div>
              )}
              <textarea
                required
                rows={3}
                value={noteContent}
                onChange={(e) => setNoteContent(e.target.value)}
                placeholder="Log internal triage notes, call summaries, partner assignments, or next steps..."
                className="w-full p-3 bg-slate-950/80 border border-slate-800 rounded-lg text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/30"
              />
              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={submittingNote || !noteContent.trim()}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-semibold text-xs transition-all disabled:opacity-50"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{submittingNote ? 'Saving...' : 'Add Internal Note'}</span>
                </button>
              </div>
            </form>
          </div>

        </div>

        {/* Right Column: Contact Details & Status Controls (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Prospective Client Contact Card */}
          <div className="p-6 rounded-xl bg-slate-900/70 border border-slate-800 shadow-xl space-y-5">
            <h4 className="font-serif font-bold text-white text-base border-b border-slate-800 pb-3">
              Principal Contact Information
            </h4>

            <div className="space-y-3 text-xs">
              <div>
                <span className="text-[10px] font-mono text-slate-500 uppercase block">Full Name</span>
                <span className="font-serif font-bold text-slate-100 text-sm">{lead.fullName}</span>
              </div>

              <div>
                <span className="text-[10px] font-mono text-slate-500 uppercase block">Institution / Enterprise</span>
                <span className="font-semibold text-slate-200">{lead.company}</span>
                {lead.designation && <span className="text-slate-400 block text-[11px]">{lead.designation}</span>}
              </div>

              <div className="pt-2 border-t border-slate-800 space-y-2.5">
                <div>
                  <span className="text-[10px] font-mono text-slate-500 uppercase block mb-1">Corporate Email</span>
                  <a
                    href={`mailto:${lead.email}?subject=Kalka%20Co.%20Advisory%20Consultation%20Brief`}
                    className="inline-flex items-center gap-1.5 text-amber-300 hover:underline font-mono text-xs break-all"
                  >
                    <Mail className="w-3.5 h-3.5 flex-shrink-0" />
                    <span>{lead.email}</span>
                  </a>
                </div>

                <div>
                  <span className="text-[10px] font-mono text-slate-500 uppercase block mb-1">Direct Telephone</span>
                  <a
                    href={`tel:${lead.phone}`}
                    className="inline-flex items-center gap-1.5 text-slate-300 hover:text-white font-mono text-xs"
                  >
                    <Phone className="w-3.5 h-3.5 text-amber-400" />
                    <span>{lead.phone}</span>
                  </a>
                </div>

                {lead.whatsapp && (
                  <div>
                    <span className="text-[10px] font-mono text-slate-500 uppercase block mb-1">WhatsApp Mobile</span>
                    <span className="text-slate-300 font-mono text-xs">{lead.whatsapp}</span>
                  </div>
                )}
              </div>

              {/* Direct Outreach CTAs */}
              <div className="pt-3 border-t border-slate-800 space-y-2">
                <a
                  href={`https://wa.me/${(lead.whatsapp || lead.phone).replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                    `Hello ${lead.fullName}, regarding your consultation inquiry with Kalka Co. Media Consultancy...`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-emerald-600/90 hover:bg-emerald-500 text-white text-xs font-semibold uppercase tracking-wider transition-colors shadow-sm"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>Direct WhatsApp Chat</span>
                </a>

                <a
                  href={`mailto:${lead.email}?subject=${encodeURIComponent(`Kalka Co. Consultation Follow-up — ${lead.company}`)}`}
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold uppercase tracking-wider transition-colors border border-slate-700"
                >
                  <Mail className="w-3.5 h-3.5 text-amber-400" />
                  <span>Dispatch Direct Email</span>
                </a>
              </div>
            </div>
          </div>

          {/* Workflow & Status Management Card */}
          <div className="p-6 rounded-xl bg-slate-900/70 border border-slate-800 shadow-xl space-y-5">
            <h4 className="font-serif font-bold text-white text-base border-b border-slate-800 pb-3">
              Mandate Governance
            </h4>

            {/* Lifecycle Status Selector */}
            <div className="space-y-2">
              <label className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-semibold block">
                Docket Lifecycle Status
              </label>
              <select
                value={lead.status}
                disabled={!canManage || updatingStatus}
                onChange={(e) => handleStatusChange(e.target.value)}
                className="w-full px-3 py-2 bg-slate-950/90 border border-slate-800 rounded-lg text-xs text-white font-mono focus:outline-none focus:border-amber-500/50 disabled:opacity-50"
              >
                <option value="NEW">NEW (Awaiting First Contact)</option>
                <option value="CONTACTED">CONTACTED (Initial Call/Email Sent)</option>
                <option value="QUALIFIED">QUALIFIED (Mandate Scoped)</option>
                <option value="PROPOSAL">PROPOSAL (Advisory Retainer Drafted)</option>
                <option value="WON">WON (Retainer Executed)</option>
                <option value="LOST">LOST (Declined / Terminated)</option>
                <option value="CLOSED">CLOSED (Completed / Archived)</option>
              </select>
              {updatingStatus && <span className="text-[10px] font-mono text-amber-400">Updating status...</span>}
            </div>

            {/* Priority Selector */}
            <div className="space-y-2">
              <label className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-semibold block">
                Priority Assignment
              </label>
              <select
                value={lead.priority}
                disabled={!canManage || updatingPriority}
                onChange={(e) => handlePriorityChange(e.target.value)}
                className="w-full px-3 py-2 bg-slate-950/90 border border-slate-800 rounded-lg text-xs text-white font-mono focus:outline-none focus:border-amber-500/50 disabled:opacity-50"
              >
                <option value="URGENT">URGENT (Crisis / Immediate Partner Action)</option>
                <option value="HIGH">HIGH (Executive 4-Hour Response)</option>
                <option value="MEDIUM">MEDIUM (Standard Advisory Protocol)</option>
                <option value="LOW">LOW (Informational / Background)</option>
              </select>
              {updatingPriority && <span className="text-[10px] font-mono text-amber-400">Updating priority...</span>}
            </div>

            {/* Assigned Partner / Desk */}
            <div className="pt-2 border-t border-slate-800 text-xs space-y-1">
              <span className="text-[10px] font-mono text-slate-500 uppercase block">Assigned Desk</span>
              <span className="text-slate-300 font-medium">
                {lead.assignedTo?.name ? `${lead.assignedTo.name} (${lead.assignedTo.role})` : 'Unassigned Desk'}
              </span>
            </div>

            {/* Timestamps */}
            <div className="pt-2 border-t border-slate-800 text-[11px] font-mono text-slate-400 space-y-1">
              <div>Received: {createdDate.toLocaleString('en-GB')}</div>
              {lead.lastContactedAt && (
                <div>Last Contacted: {new Date(lead.lastContactedAt).toLocaleString('en-GB')}</div>
              )}
              {lead.closedAt && (
                <div>Closed Horizon: {new Date(lead.closedAt).toLocaleString('en-GB')}</div>
              )}
            </div>
          </div>

        </div>

      </div>

      {/* Purge Modal */}
      <DeleteConfirmationModal
        isOpen={showDeleteModal}
        itemName={`${lead.fullName} (${lead.company})`}
        itemType="Inquiry Dossier"
        isDeleting={isDeleting}
        onConfirm={handleDelete}
        onClose={() => setShowDeleteModal(false)}
      />
    </div>
  );
}
