'use client';

import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Globe, Layers, ListOrdered, Sparkles, AlertCircle } from 'lucide-react';
import { FormField } from './FormField';
import { SlugField } from './SlugField';
import { PublishControls } from './PublishControls';

export interface ServiceFormData {
  name: string;
  slug: string;
  shortDescription: string;
  description: string;
  heroImage: string;
  capabilities: string[];
  process: Array<{ step: number; title: string; description: string }>;
  relatedIndustries: string[];
  featured: boolean;
  displayOrder: number;
  seoTitle: string;
  seoDescription: string;
  status: 'published' | 'draft' | 'archived';
}

export interface ServiceFormProps {
  initialData?: Partial<ServiceFormData>;
  isEditing?: boolean;
  onSubmit: (data: ServiceFormData, action: 'draft' | 'publish') => Promise<void>;
  isSubmitting: boolean;
  error?: string | null;
}

export const ServiceForm: React.FC<ServiceFormProps> = ({
  initialData,
  isEditing = false,
  onSubmit,
  isSubmitting,
  error,
}) => {
  const [formData, setFormData] = useState<ServiceFormData>({
    name: initialData?.name || '',
    slug: initialData?.slug || '',
    shortDescription: initialData?.shortDescription || '',
    description: initialData?.description || '',
    heroImage: initialData?.heroImage || '',
    capabilities: initialData?.capabilities || [''],
    process: initialData?.process?.length
      ? initialData.process
      : [{ step: 1, title: '', description: '' }],
    relatedIndustries: initialData?.relatedIndustries || [],
    featured: initialData?.featured || false,
    displayOrder: initialData?.displayOrder || 0,
    seoTitle: initialData?.seoTitle || '',
    seoDescription: initialData?.seoDescription || '',
    status: initialData?.status || 'draft',
  });

  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [industryInput, setIndustryInput] = useState('');

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name || '',
        slug: initialData.slug || '',
        shortDescription: initialData.shortDescription || '',
        description: initialData.description || '',
        heroImage: initialData.heroImage || '',
        capabilities: initialData.capabilities?.length ? initialData.capabilities : [''],
        process: initialData.process?.length
          ? initialData.process
          : [{ step: 1, title: '', description: '' }],
        relatedIndustries: initialData.relatedIndustries || [],
        featured: initialData.featured ?? false,
        displayOrder: initialData.displayOrder ?? 0,
        seoTitle: initialData.seoTitle || '',
        seoDescription: initialData.seoDescription || '',
        status: initialData.status || 'draft',
      });
    }
  }, [initialData]);

  const updateField = <K extends keyof ServiceFormData>(field: K, value: ServiceFormData[K]) => {
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

  // Capabilities handlers
  const handleAddCapability = () => {
    setFormData((prev) => ({ ...prev, capabilities: [...prev.capabilities, ''] }));
    setHasUnsavedChanges(true);
  };

  const handleUpdateCapability = (index: number, val: string) => {
    setFormData((prev) => {
      const caps = [...prev.capabilities];
      caps[index] = val;
      return { ...prev, capabilities: caps };
    });
    setHasUnsavedChanges(true);
  };

  const handleRemoveCapability = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      capabilities: prev.capabilities.filter((_, i) => i !== index),
    }));
    setHasUnsavedChanges(true);
  };

  // Process handlers
  const handleAddProcess = () => {
    setFormData((prev) => ({
      ...prev,
      process: [
        ...prev.process,
        { step: prev.process.length + 1, title: '', description: '' },
      ],
    }));
    setHasUnsavedChanges(true);
  };

  const handleUpdateProcess = (index: number, field: 'title' | 'description', val: string) => {
    setFormData((prev) => {
      const proc = [...prev.process];
      proc[index] = { ...proc[index], [field]: val };
      return { ...prev, process: proc };
    });
    setHasUnsavedChanges(true);
  };

  const handleRemoveProcess = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      process: prev.process
        .filter((_, i) => i !== index)
        .map((p, idx) => ({ ...p, step: idx + 1 })),
    }));
    setHasUnsavedChanges(true);
  };

  // Related industries handlers
  const handleAddIndustry = (e: React.KeyboardEvent | React.MouseEvent) => {
    if ('key' in e && e.key !== 'Enter') return;
    e.preventDefault();
    const val = industryInput.trim();
    if (val && !formData.relatedIndustries.includes(val)) {
      setFormData((prev) => ({
        ...prev,
        relatedIndustries: [...prev.relatedIndustries, val],
      }));
      setIndustryInput('');
      setHasUnsavedChanges(true);
    }
  };

  const handleRemoveIndustry = (ind: string) => {
    setFormData((prev) => ({
      ...prev,
      relatedIndustries: prev.relatedIndustries.filter((item) => item !== ind),
    }));
    setHasUnsavedChanges(true);
  };

  const validate = (): boolean => {
    const errors: Record<string, string> = {};
    if (!formData.name.trim() || formData.name.trim().length < 2) {
      errors.name = 'Service name must be at least 2 characters.';
    }
    if (!formData.slug.trim() || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(formData.slug)) {
      errors.slug = 'Valid URL slug is required (lowercase letters, numbers, hyphens).';
    }
    if (!formData.shortDescription.trim() || formData.shortDescription.trim().length < 10) {
      errors.shortDescription = 'Short description must be at least 10 characters.';
    }
    if (!formData.description.trim() || formData.description.trim().length < 20) {
      errors.description = 'Full strategic description must be at least 20 characters.';
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (action: 'draft' | 'publish') => {
    if (!validate()) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    const payload: ServiceFormData = {
      ...formData,
      capabilities: formData.capabilities.filter((c) => c.trim().length > 0),
      process: formData.process.filter((p) => p.title.trim().length > 0),
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

      {/* Section 1: Core Practice Information */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-6 space-y-6">
        <div className="flex items-center gap-2 pb-4 border-b border-slate-800">
          <Layers className="w-4 h-4 text-amber-400" />
          <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-200">
            Core Service Information
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField label="Practice Area Name" required error={formErrors.name}>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => updateField('name', e.target.value)}
              placeholder="e.g. Crisis Communications & Advisory"
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
          label="Short Description"
          required
          error={formErrors.shortDescription}
          description="A concise 1-2 sentence overview for cards and meta teasers (max 300 characters)."
        >
          <textarea
            rows={2}
            value={formData.shortDescription}
            maxLength={300}
            onChange={(e) => updateField('shortDescription', e.target.value)}
            placeholder="High-stakes narrative control and rapid crisis response for institutional leadership..."
            className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-lg text-xs text-slate-100 placeholder-slate-600 focus:outline-none focus:border-amber-500/50 resize-none"
          />
        </FormField>

        <FormField
          label="Strategic Practice Overview"
          required
          error={formErrors.description}
          description="Comprehensive methodology and strategic advisory scope."
        >
          <textarea
            rows={6}
            value={formData.description}
            onChange={(e) => updateField('description', e.target.value)}
            placeholder="Detailed overview of client engagement, tactical media execution, and strategic governance..."
            className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-lg text-xs text-slate-100 placeholder-slate-600 focus:outline-none focus:border-amber-500/50"
          />
        </FormField>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
          <FormField
            label="Hero Image Reference"
            description="Static asset path or hosted image URL."
          >
            <input
              type="text"
              value={formData.heroImage}
              onChange={(e) => updateField('heroImage', e.target.value)}
              placeholder="/images/services/crisis.jpg"
              className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-lg text-xs text-slate-100 placeholder-slate-600 focus:outline-none focus:border-amber-500/50"
            />
          </FormField>

          <FormField
            label="Display Priority"
            description="Numeric order on services index (lower numbers appear first)."
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
                Featured Practice Area
              </span>
            </label>
            <p className="text-[11px] text-slate-500 mt-1 pl-7">
              Prominently displayed on homepage practice spotlights.
            </p>
          </div>
        </div>
      </div>

      {/* Section 2: Core Capabilities */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-6 space-y-4">
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-200">
              Key Capabilities
            </h2>
          </div>
          <button
            type="button"
            onClick={handleAddCapability}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-amber-300 text-xs font-medium transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Capability</span>
          </button>
        </div>

        <div className="space-y-2.5">
          {formData.capabilities.map((cap, idx) => (
            <div key={idx} className="flex items-center gap-2">
              <input
                type="text"
                value={cap}
                onChange={(e) => handleUpdateCapability(idx, e.target.value)}
                placeholder="e.g. Media Training & Executive Prep"
                className="flex-1 px-3.5 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-slate-100 placeholder-slate-600 focus:outline-none focus:border-amber-500/50"
              />
              <button
                type="button"
                onClick={() => handleRemoveCapability(idx)}
                className="p-2 text-slate-500 hover:text-rose-400 hover:bg-rose-950/20 rounded-lg transition-colors"
                title="Remove capability"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Section 3: Delivery Process Steps */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-6 space-y-4">
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <ListOrdered className="w-4 h-4 text-amber-400" />
            <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-200">
              Strategic Delivery Process
            </h2>
          </div>
          <button
            type="button"
            onClick={handleAddProcess}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-amber-300 text-xs font-medium transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Step</span>
          </button>
        </div>

        <div className="space-y-4">
          {formData.process.map((step, idx) => (
            <div
              key={idx}
              className="p-4 bg-slate-950/70 border border-slate-800 rounded-lg space-y-3 relative group"
            >
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-mono text-amber-400 uppercase tracking-wider">
                  Step 0{step.step || idx + 1}
                </span>
                {formData.process.length > 1 && (
                  <button
                    type="button"
                    onClick={() => handleRemoveProcess(idx)}
                    className="p-1 text-slate-500 hover:text-rose-400 transition-colors"
                    title="Remove step"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div>
                  <label className="block text-[10px] text-slate-400 uppercase tracking-wider mb-1">
                    Phase Title
                  </label>
                  <input
                    type="text"
                    value={step.title}
                    onChange={(e) => handleUpdateProcess(idx, 'title', e.target.value)}
                    placeholder="e.g. Rapid Assessment"
                    className="w-full px-3 py-1.5 bg-slate-900 border border-slate-800 rounded text-xs text-slate-100 placeholder-slate-600 focus:outline-none focus:border-amber-500/50"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-[10px] text-slate-400 uppercase tracking-wider mb-1">
                    Action Plan & Deliverables
                  </label>
                  <input
                    type="text"
                    value={step.description}
                    onChange={(e) => handleUpdateProcess(idx, 'description', e.target.value)}
                    placeholder="Immediate 2-hour stakeholder discovery and scenario mapping..."
                    className="w-full px-3 py-1.5 bg-slate-900 border border-slate-800 rounded text-xs text-slate-100 placeholder-slate-600 focus:outline-none focus:border-amber-500/50"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Section 4: Related Industries */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-6 space-y-4">
        <div className="flex items-center gap-2 pb-4 border-b border-slate-800">
          <Layers className="w-4 h-4 text-amber-400" />
          <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-200">
            Applicable Industry Sectors
          </h2>
        </div>

        <div className="space-y-3">
          <div className="flex gap-2">
            <input
              type="text"
              value={industryInput}
              onChange={(e) => setIndustryInput(e.target.value)}
              onKeyDown={handleAddIndustry}
              placeholder="e.g. Financial Services, Healthcare (Press Enter to add)"
              className="flex-1 px-3.5 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-slate-100 placeholder-slate-600 focus:outline-none focus:border-amber-500/50"
            />
            <button
              type="button"
              onClick={handleAddIndustry}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium rounded-lg transition-colors"
            >
              Add Sector
            </button>
          </div>

          <div className="flex flex-wrap gap-2 pt-1">
            {formData.relatedIndustries.map((ind) => (
              <span
                key={ind}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-800/80 border border-slate-700 text-xs text-slate-200"
              >
                <span>{ind}</span>
                <button
                  type="button"
                  onClick={() => handleRemoveIndustry(ind)}
                  className="text-slate-400 hover:text-rose-400 transition-colors"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Section 5: Search & Social Metadata (SEO) */}
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
            description="Custom title tag for search engine result pages (defaults to service name)."
          >
            <input
              type="text"
              value={formData.seoTitle}
              onChange={(e) => updateField('seoTitle', e.target.value)}
              placeholder="Crisis Communications & Advisory | Kalka Co."
              className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-lg text-xs text-slate-100 placeholder-slate-600 focus:outline-none focus:border-amber-500/50"
            />
          </FormField>

          <FormField
            label="Meta Description"
            description="Search snippet for organic discovery (recommended: 140-160 characters)."
          >
            <textarea
              rows={2}
              value={formData.seoDescription}
              onChange={(e) => updateField('seoDescription', e.target.value)}
              placeholder="Strategic crisis navigation and media advisory for enterprise leaders..."
              className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-lg text-xs text-slate-100 placeholder-slate-600 focus:outline-none focus:border-amber-500/50 resize-none"
            />
          </FormField>
        </div>
      </div>

      {/* Action Footer */}
      <PublishControls
        currentStatus={formData.status}
        isSubmitting={isSubmitting}
        hasUnsavedChanges={hasUnsavedChanges}
        backHref="/admin/services"
        onSaveDraft={() => handleSubmit('draft')}
        onPublish={() => handleSubmit('publish')}
      />
    </div>
  );
};
