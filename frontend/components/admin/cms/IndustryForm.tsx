'use client';

import React, { useState, useEffect } from 'react';
import { Layers, Globe, AlertCircle } from 'lucide-react';
import { FormField } from './FormField';
import { SlugField } from './SlugField';
import { PublishControls } from './PublishControls';

export interface IndustryFormData {
  name: string;
  slug: string;
  description: string;
  heroImage: string;
  relatedServices: string[];
  caseStudies: string[];
  featured: boolean;
  displayOrder: number;
  seoTitle: string;
  seoDescription: string;
  status: 'published' | 'draft' | 'archived';
}

export interface IndustryFormProps {
  initialData?: Partial<IndustryFormData>;
  isEditing?: boolean;
  onSubmit: (data: IndustryFormData, action: 'draft' | 'publish') => Promise<void>;
  isSubmitting: boolean;
  error?: string | null;
}

export const IndustryForm: React.FC<IndustryFormProps> = ({
  initialData,
  isEditing = false,
  onSubmit,
  isSubmitting,
  error,
}) => {
  const [formData, setFormData] = useState<IndustryFormData>({
    name: initialData?.name || '',
    slug: initialData?.slug || '',
    description: initialData?.description || '',
    heroImage: initialData?.heroImage || '',
    relatedServices: initialData?.relatedServices || [],
    caseStudies: initialData?.caseStudies || [],
    featured: initialData?.featured || false,
    displayOrder: initialData?.displayOrder || 0,
    seoTitle: initialData?.seoTitle || '',
    seoDescription: initialData?.seoDescription || '',
    status: initialData?.status || 'draft',
  });

  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [serviceInput, setServiceInput] = useState('');

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name || '',
        slug: initialData.slug || '',
        description: initialData.description || '',
        heroImage: initialData.heroImage || '',
        relatedServices: initialData.relatedServices || [],
        caseStudies: initialData.caseStudies || [],
        featured: initialData.featured ?? false,
        displayOrder: initialData.displayOrder ?? 0,
        seoTitle: initialData.seoTitle || '',
        seoDescription: initialData.seoDescription || '',
        status: initialData.status || 'draft',
      });
    }
  }, [initialData]);

  const updateField = <K extends keyof IndustryFormData>(field: K, value: IndustryFormData[K]) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setHasUnsavedChanges(true);
    if (formErrors[field]) {
      setFormErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  const handleAddService = (e: React.KeyboardEvent | React.MouseEvent) => {
    if ('key' in e && e.key !== 'Enter') return;
    e.preventDefault();
    const val = serviceInput.trim();
    if (val && !formData.relatedServices.includes(val)) {
      setFormData((prev) => ({
        ...prev,
        relatedServices: [...prev.relatedServices, val],
      }));
      setServiceInput('');
      setHasUnsavedChanges(true);
    }
  };

  const handleRemoveService = (srv: string) => {
    setFormData((prev) => ({
      ...prev,
      relatedServices: prev.relatedServices.filter((s) => s !== srv),
    }));
    setHasUnsavedChanges(true);
  };

  const validate = (): boolean => {
    const errors: Record<string, string> = {};
    if (!formData.name.trim() || formData.name.trim().length < 2) {
      errors.name = 'Industry name must be at least 2 characters.';
    }
    if (!formData.slug.trim() || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(formData.slug)) {
      errors.slug = 'Valid URL slug is required (lowercase letters, numbers, hyphens).';
    }
    if (!formData.description.trim() || formData.description.trim().length < 10) {
      errors.description = 'Industry description must be at least 10 characters.';
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (action: 'draft' | 'publish') => {
    if (!validate()) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    const payload: IndustryFormData = {
      ...formData,
      status: action === 'publish' ? 'published' : 'draft',
    };

    await onSubmit(payload, action);
    setHasUnsavedChanges(false);
  };

  return (
    <div className="space-y-8 max-w-5xl">
      {error && (
        <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs flex items-center gap-3">
          <AlertCircle className="w-5 h-5 flex-shrink-0 text-rose-400" />
          <span>{error}</span>
        </div>
      )}

      {/* Core Sector Info */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-6 space-y-6">
        <div className="flex items-center gap-2 pb-4 border-b border-slate-800">
          <Layers className="w-4 h-4 text-amber-400" />
          <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-200">
            Industry Sector Details
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField label="Industry Sector Name" required error={formErrors.name}>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => updateField('name', e.target.value)}
              placeholder="e.g. Technology & Digital Infrastructure"
              className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-lg text-xs text-slate-100 placeholder-slate-600 focus:outline-none focus:border-amber-500/50"
            />
          </FormField>

          <SlugField
            slug={formData.slug}
            onChange={(val) => updateField('slug', val)}
            sourceValue={formData.name}
            error={formErrors.slug}
            isExistingItem={isEditing}
          />
        </div>

        <FormField
          label="Sector Strategic Overview"
          required
          error={formErrors.description}
          description="Context regarding sector-specific regulatory environments, media landscapes, and institutional stakes."
        >
          <textarea
            rows={5}
            value={formData.description}
            onChange={(e) => updateField('description', e.target.value)}
            placeholder="High-growth enterprise technology demands acute precision in articulating market disruption..."
            className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-lg text-xs text-slate-100 placeholder-slate-600 focus:outline-none focus:border-amber-500/50"
          />
        </FormField>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
          <FormField
            label="Hero Image Reference"
            description="Asset path or hosted image URL."
          >
            <input
              type="text"
              value={formData.heroImage}
              onChange={(e) => updateField('heroImage', e.target.value)}
              placeholder="/assets/industries/real-estate.webp"
              className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-lg text-xs text-slate-100 placeholder-slate-600 focus:outline-none focus:border-amber-500/50"
            />
          </FormField>

          <FormField
            label="Display Priority"
            description="Numeric order on industries catalog."
          >
            <input
              type="number"
              value={formData.displayOrder}
              onChange={(e) => updateField('displayOrder', parseInt(e.target.value, 10) || 0)}
              className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-lg text-xs text-slate-100 focus:outline-none focus:border-amber-500/50"
            />
          </FormField>

          <div className="flex flex-col justify-center pt-5">
            <label className="flex items-center gap-3 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={formData.featured}
                onChange={(e) => updateField('featured', e.target.checked)}
                className="w-4 h-4 rounded border-slate-800 text-amber-500 focus:ring-amber-500/30 bg-slate-950"
              />
              <span className="text-xs text-slate-300 font-medium">
                Featured Industry
              </span>
            </label>
            <p className="text-[11px] text-slate-500 mt-1 pl-7">
              Highlight in primary navigation and industry showcases.
            </p>
          </div>
        </div>
      </div>

      {/* Relevant Services */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-6 space-y-4">
        <div className="flex items-center gap-2 pb-4 border-b border-slate-800">
          <Layers className="w-4 h-4 text-amber-400" />
          <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-200">
            Applicable Services
          </h2>
        </div>

        <div className="space-y-3">
          <div className="flex gap-2">
            <input
              type="text"
              value={serviceInput}
              onChange={(e) => setServiceInput(e.target.value)}
              onKeyDown={handleAddService}
              placeholder="e.g. Crisis Communications, Strategic Advisory (Press Enter to add)"
              className="flex-1 px-3.5 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-slate-100 placeholder-slate-600 focus:outline-none focus:border-amber-500/50"
            />
            <button
              type="button"
              onClick={handleAddService}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium rounded-lg transition-colors"
            >
              Add Service
            </button>
          </div>

          <div className="flex flex-wrap gap-2 pt-1">
            {formData.relatedServices.map((srv) => (
              <span
                key={srv}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-800/80 border border-slate-700 text-xs text-slate-200"
              >
                <span>{srv}</span>
                <button
                  type="button"
                  onClick={() => handleRemoveService(srv)}
                  className="text-slate-400 hover:text-rose-400 transition-colors"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* SEO */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-6 space-y-4">
        <div className="flex items-center gap-2 pb-4 border-b border-slate-800">
          <Globe className="w-4 h-4 text-amber-400" />
          <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-200">
            SEO & Discovery Metadata
          </h2>
        </div>

        <div className="space-y-4">
          <FormField
            label="SEO Page Title"
            description="Custom title tag for search engines (defaults to industry name)."
          >
            <input
              type="text"
              value={formData.seoTitle}
              onChange={(e) => updateField('seoTitle', e.target.value)}
              placeholder="Technology & Digital Infrastructure PR | Kalka Co."
              className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-lg text-xs text-slate-100 placeholder-slate-600 focus:outline-none focus:border-amber-500/50"
            />
          </FormField>

          <FormField
            label="Meta Description"
            description="Search snippet for organic search results."
          >
            <textarea
              rows={2}
              value={formData.seoDescription}
              onChange={(e) => updateField('seoDescription', e.target.value)}
              placeholder="Strategic communications and media positioning for institutional technology companies..."
              className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-lg text-xs text-slate-100 placeholder-slate-600 focus:outline-none focus:border-amber-500/50 resize-none"
            />
          </FormField>
        </div>
      </div>

      {/* Footer Controls */}
      <PublishControls
        currentStatus={formData.status}
        isSubmitting={isSubmitting}
        hasUnsavedChanges={hasUnsavedChanges}
        backHref="/admin/industries"
        onSaveDraft={() => handleSubmit('draft')}
        onPublish={() => handleSubmit('publish')}
      />
    </div>
  );
};
