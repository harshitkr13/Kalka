'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { CMSPageHeader } from '@/components/admin/cms/CMSPageHeader';
import { IndustryForm, IndustryFormData } from '@/components/admin/cms/IndustryForm';
import { createAdminItem } from '@/lib/api/adminCms';

export default function AdminNewIndustryPage() {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleCreate = async (data: IndustryFormData) => {
    setSubmitting(true);
    setError(null);
    try {
      const res = await createAdminItem('industries', data);
      if (res.success) {
        router.push('/admin/industries');
      } else {
        setError(res.error || 'Failed to create industry sector');
      }
    } catch {
      setError('A network error occurred while creating industry sector');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <CMSPageHeader
        title="Create Industry Sector"
        description="Configure industry expertise sectors, tailored service offerings, and institutional market context."
        backHref="/admin/industries"
      />

      <IndustryForm
        onSubmit={handleCreate}
        isSubmitting={submitting}
        error={error}
      />
    </div>
  );
}
