'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { CMSPageHeader } from '@/components/admin/cms/CMSPageHeader';
import { ServiceForm, ServiceFormData } from '@/components/admin/cms/ServiceForm';
import { createAdminItem } from '@/lib/api/adminCms';

export default function AdminNewServicePage() {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleCreate = async (data: ServiceFormData) => {
    setSubmitting(true);
    setError(null);
    try {
      const res = await createAdminItem('services', data);
      if (res.success) {
        router.push('/admin/services');
      } else {
        setError(res.error || 'Failed to create service practice');
      }
    } catch {
      setError('A network error occurred while creating service practice');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <CMSPageHeader
        title="Create Service Practice"
        description="Establish a new strategic communications capability, defining methodologies, capabilities, and delivery phases."
        backHref="/admin/services"
      />

      <ServiceForm
        onSubmit={handleCreate}
        isSubmitting={submitting}
        error={error}
      />
    </div>
  );
}
