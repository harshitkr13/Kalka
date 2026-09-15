'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { CMSPageHeader } from '@/components/admin/cms/CMSPageHeader';
import { CaseStudyForm, CaseStudyFormData } from '@/components/admin/cms/CaseStudyForm';
import { createAdminItem } from '@/lib/api/adminCms';

export default function AdminNewCaseStudyPage() {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleCreate = async (data: CaseStudyFormData) => {
    setSubmitting(true);
    setError(null);
    try {
      const res = await createAdminItem('case-studies', data);
      if (res.success) {
        router.push('/admin/case-studies');
      } else {
        setError(res.error || 'Failed to create case study');
      }
    } catch {
      setError('A network error occurred while creating case study');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <CMSPageHeader
        title="Document Case Study"
        description="Detail strategic client engagements, challenge framing, execution methodologies, and verified outcomes."
        backHref="/admin/case-studies"
      />

      <CaseStudyForm
        onSubmit={handleCreate}
        isSubmitting={submitting}
        error={error}
      />
    </div>
  );
}
