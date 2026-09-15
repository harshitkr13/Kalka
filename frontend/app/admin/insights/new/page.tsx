'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { CMSPageHeader } from '@/components/admin/cms/CMSPageHeader';
import { BlogForm, BlogFormData } from '@/components/admin/cms/BlogForm';
import { createAdminItem } from '@/lib/api/adminCms';

export default function AdminNewInsightPage() {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleCreate = async (data: BlogFormData) => {
    setSubmitting(true);
    setError(null);
    try {
      const res = await createAdminItem('blogs', data);
      if (res.success) {
        router.push('/admin/insights');
      } else {
        setError(res.error || 'Failed to create article');
      }
    } catch {
      setError('A network error occurred while creating article');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <CMSPageHeader
        title="Author Strategic Perspective"
        description="Write and configure editorial essays, media analyses, leadership insights, and practice commentary."
        backHref="/admin/insights"
      />

      <BlogForm
        onSubmit={handleCreate}
        isSubmitting={submitting}
        error={error}
      />
    </div>
  );
}
