'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { Loader2, AlertCircle, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { CMSPageHeader } from '@/components/admin/cms/CMSPageHeader';
import { CaseStudyForm, CaseStudyFormData } from '@/components/admin/cms/CaseStudyForm';
import { fetchAdminItem, updateAdminItem } from '@/lib/api/adminCms';

export default function AdminEditCaseStudyPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [caseStudy, setCaseStudy] = useState<Partial<CaseStudyFormData> | null>(null);

  useEffect(() => {
    async function loadCaseStudy() {
      if (!id) return;
      setLoading(true);
      setError(null);
      try {
        const res = await fetchAdminItem<CaseStudyFormData>('case-studies', id);
        if (res.success && res.data) {
          setCaseStudy(res.data);
        } else {
          setError(res.error || 'Failed to retrieve case study');
        }
      } catch {
        setError('Network error occurred while retrieving case study details');
      } finally {
        setLoading(false);
      }
    }
    loadCaseStudy();
  }, [id]);

  const handleUpdate = async (data: CaseStudyFormData) => {
    setSubmitting(true);
    setError(null);
    try {
      const res = await updateAdminItem('case-studies', id, data);
      if (res.success) {
        router.push('/admin/case-studies');
      } else {
        setError(res.error || 'Failed to update case study');
      }
    } catch {
      setError('A network error occurred while updating case study');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] gap-3">
        <Loader2 className="w-8 h-8 animate-spin text-amber-400" />
        <p className="text-xs font-mono text-slate-400">Loading case study...</p>
      </div>
    );
  }

  if (error && !caseStudy) {
    return (
      <div className="max-w-lg mx-auto mt-16 p-6 rounded-2xl bg-slate-900 border border-slate-800 text-center space-y-4">
        <AlertCircle className="w-10 h-10 text-rose-400 mx-auto" />
        <h2 className="text-base font-semibold text-slate-100">Case Study Not Found</h2>
        <p className="text-xs text-slate-400">{error}</p>
        <Link
          href="/admin/case-studies"
          className="inline-flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium rounded-lg transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to Case Studies</span>
        </Link>
      </div>
    );
  }

  return (
    <div>
      <CMSPageHeader
        title={`Edit: ${caseStudy?.title || 'Case Study'}`}
        description="Update narrative framing, execution methodology, metrics, and search positioning."
        backHref="/admin/case-studies"
      />

      {caseStudy && (
        <CaseStudyForm
          initialData={caseStudy}
          isEditing
          onSubmit={handleUpdate}
          isSubmitting={submitting}
          error={error}
        />
      )}
    </div>
  );
}
