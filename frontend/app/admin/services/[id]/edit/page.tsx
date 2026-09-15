'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { Loader2, AlertCircle, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { CMSPageHeader } from '@/components/admin/cms/CMSPageHeader';
import { ServiceForm, ServiceFormData } from '@/components/admin/cms/ServiceForm';
import { fetchAdminItem, updateAdminItem } from '@/lib/api/adminCms';

export default function AdminEditServicePage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [service, setService] = useState<Partial<ServiceFormData> | null>(null);

  useEffect(() => {
    async function loadService() {
      if (!id) return;
      setLoading(true);
      setError(null);
      try {
        const res = await fetchAdminItem<ServiceFormData>('services', id);
        if (res.success && res.data) {
          setService(res.data);
        } else {
          setError(res.error || 'Failed to retrieve service practice');
        }
      } catch {
        setError('Network error occurred while retrieving service details');
      } finally {
        setLoading(false);
      }
    }
    loadService();
  }, [id]);

  const handleUpdate = async (data: ServiceFormData) => {
    setSubmitting(true);
    setError(null);
    try {
      const res = await updateAdminItem('services', id, data);
      if (res.success) {
        router.push('/admin/services');
      } else {
        setError(res.error || 'Failed to update service practice');
      }
    } catch {
      setError('A network error occurred while updating service practice');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] gap-3">
        <Loader2 className="w-8 h-8 animate-spin text-amber-400" />
        <p className="text-xs font-mono text-slate-400">Loading service details...</p>
      </div>
    );
  }

  if (error && !service) {
    return (
      <div className="max-w-lg mx-auto mt-16 p-6 rounded-2xl bg-slate-900 border border-slate-800 text-center space-y-4">
        <AlertCircle className="w-10 h-10 text-rose-400 mx-auto" />
        <h2 className="text-base font-semibold text-slate-100">Service Not Found</h2>
        <p className="text-xs text-slate-400">{error}</p>
        <Link
          href="/admin/services"
          className="inline-flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium rounded-lg transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to Services Catalog</span>
        </Link>
      </div>
    );
  }

  return (
    <div>
      <CMSPageHeader
        title={`Edit: ${service?.name || 'Service Practice'}`}
        description="Update practice narrative, operational deliverables, capabilities, and SEO positioning."
        backHref="/admin/services"
      />

      {service && (
        <ServiceForm
          initialData={service}
          isEditing
          onSubmit={handleUpdate}
          isSubmitting={submitting}
          error={error}
        />
      )}
    </div>
  );
}
