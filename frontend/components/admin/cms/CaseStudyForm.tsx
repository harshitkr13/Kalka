'use client';

import React, { useState, useEffect } from 'react';
import { Briefcase, Globe, Plus, Trash2, AlertCircle } from 'lucide-react';
import { FormField } from './FormField';
import { SlugField } from './SlugField';
import { PublishControls } from './PublishControls';

export interface MetricItem {
  label: string;
  value: string;
}

export interface CaseStudyFormData {
  title: string;
  slug: string;
  clientName: string;
  industry: string;
  summary: string;
  challenge: string;
  strategy: string;
  execution: string;
  results: string;
  metrics: MetricItem[];
  coverImage: string;
  gallery: string[];
  mediaCoverage: string[];
  featured: boolean;
  seoTitle: string;
  seoDescription: string;
  status: 'published' | 'draft' | 'archived';
}

export interface CaseStudyFormProps {
  initialData?: Partial<CaseStudyFormData>;
  isEditing?: boolean;
  onSubmit: (data: CaseStudyFormData, action: 'draft' | 'publish') => Promise<void>;
  isSubmitting: boolean;
  error?: string | null;
}

export const CaseStudyForm: React.FC<CaseStudyFormProps> = ({
  initialData,
  isEditing = false,
  onSubmit,
  isSubmitting,
  error,
}) => {
  const [formData, setFormData] = useState<CaseStudyFormData>({
    title: initialData?.title || '',
    slug: initialData?.slug || '',
    clientName: initialData?.clientName || '',
    industry: initialData?.industry || '',
    summary: initialData?.summary || '',
    challenge: initialData?.challenge || '',
    strategy: initialData?.strategy || '',
    execution: initialData?.execution || '',
    results: initialData?.results || '',
    metrics: initialData?.metrics || [],
    coverImage: initialData?.coverImage || '',
    gallery: initialData?.gallery || [],
    mediaCoverage: initialData?.mediaCoverage || [],
    featured: initialData?.featured || false,
    seoTitle: initialData?.seoTitle || '',
    seoDescription: initialData?.seoDescription || '',
    status: initialData?.status || 'draft',
  });

  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title || '',
        slug: initialData.slug || '',
        clientName: initialData.clientName || '',
        industry: initialData.industry || '',
        summary: initialData.summary || '',
        challenge: initialData.challenge || '',
        strategy: initialData.strategy || '',
        execution: initialData.execution || '',
        results: initialData.results || '',
        metrics: initialData.metrics || [],
        coverImage: initialData.coverImage || '',
        gallery: initialData.gallery || [],
        mediaCoverage: initialData.mediaCoverage || [],
        featured: initialData.featured ?? false,
        seoTitle: initialData.seoTitle || '',
        seoDescription: initialData.seoDescription || '',
        status: initialData.status || 'draft',
      });
    }
  }, [initialData]);

  const updateField = <K extends keyof CaseStudyFormData>(
    field: K,
    value: CaseStudyFormData[K]
  ) => {
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

  // Metrics handlers
  const handleAddMetric = () => {
    setFormData((prev) => ({
      ...prev,
      metrics: [...prev.metrics, { label: '', value: '' }],
    }));
    setHasUnsavedChanges(true);
  };

  const handleUpdateMetric = (index: number, field: 'label' | 'value', val: string) => {
    setFormData((prev) => {
      const mets = [...prev.metrics];
      mets[index] = { ...mets[index], [field]: val };
      return { ...prev, metrics: mets };
    });
    setHasUnsavedChanges(true);
  };

  const handleRemoveMetric = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      metrics: prev.metrics.filter((_, i) => i !== index),
    }));
    setHasUnsavedChanges(true);
  };

  const validate = (): boolean => {
    const errors: Record<string, string> = {};
    if (!formData.title.trim() || formData.title.trim().length < 3) {
      errors.title = 'Title must be at least 3 characters.';
    }
    if (!formData.slug.trim() || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(formData.slug)) {
      errors.slug = 'Valid URL slug is required.';
    }
    if (!formData.clientName.trim() || formData.clientName.trim().length < 2) {
      errors.clientName = 'Client identifier / description is required.';
    }
    if (!formData.industry.trim() || formData.industry.trim().length < 2) {
      errors.industry = 'Industry classification is required.';
    }
    if (!formData.summary.trim() || formData.summary.trim().length < 10) {
      errors.summary = 'Summary must be at least 10 characters.';
    }
    if (!formData.challenge.trim() || formData.challenge.trim().length < 10) {
      errors.challenge = 'Challenge narrative must be at least 10 characters.';
    }
    if (!formData.strategy.trim() || formData.strategy.trim().length < 10) {
      errors.strategy = 'Strategic response must be at least 10 characters.';
    }
    if (!formData.execution.trim() || formData.execution.trim().length < 10) {
      errors.execution = 'Execution methodology must be at least 10 characters.';
    }
    if (!formData.results.trim() || formData.results.trim().length < 10) {
      errors.results = 'Outcome & results summary must be at least 10 characters.';
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (action: 'draft' | 'publish') => {
    if (!validate()) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    const payload: CaseStudyFormData = {
      ...formData,
      metrics: formData.metrics.filter((m) => m.label.trim() && m.value.trim()),
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

      {/* Section 1: Overview & Metadata */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-6 space-y-6">
        <div className="flex items-center gap-2 pb-4 border-b border-slate-800">
          <Briefcase className="w-4 h-4 text-amber-400" />
          <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-200">
            Case Study Overview
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField label="Case Study Title" required error={formErrors.title}>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => updateField('title', e.target.value)}
              placeholder="e.g. Navigating Regulatory Scrutiny in Digital Health"
              className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-lg text-xs text-slate-100 placeholder-slate-600 focus:outline-none focus:border-amber-500/50"
            />
          </FormField>

          <SlugField
            slug={formData.slug}
            onChange={(val) => updateField('slug', val)}
            sourceValue={formData.title}
            error={formErrors.slug}
            isExistingItem={isEditing}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            label="Client Identifier / Archetype"
            required
            error={formErrors.clientName}
            description="Client name or anonymous institutional descriptor (e.g., 'Series B HealthTech Enterprise')."
          >
            <input
              type="text"
              value={formData.clientName}
              onChange={(e) => updateField('clientName', e.target.value)}
              placeholder="e.g. Institutional Financial Advisory"
              className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-lg text-xs text-slate-100 placeholder-slate-600 focus:outline-none focus:border-amber-500/50"
            />
          </FormField>

          <FormField
            label="Industry Classification"
            required
            error={formErrors.industry}
            description="Corresponding industry sector for categorization."
          >
            <input
              type="text"
              value={formData.industry}
              onChange={(e) => updateField('industry', e.target.value)}
              placeholder="e.g. Technology & Digital Infrastructure"
              className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-lg text-xs text-slate-100 placeholder-slate-600 focus:outline-none focus:border-amber-500/50"
            />
          </FormField>
        </div>

        <FormField
          label="Executive Summary"
          required
          error={formErrors.summary}
          description="High-level briefing summarizing the crisis or objective and resolution."
        >
          <textarea
            rows={3}
            value={formData.summary}
            onChange={(e) => updateField('summary', e.target.value)}
            placeholder="A concise summary of the engagement, tactical challenge, and institutional outcome..."
            className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-lg text-xs text-slate-100 placeholder-slate-600 focus:outline-none focus:border-amber-500/50 resize-none"
          />
        </FormField>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
          <FormField
            label="Cover Image Reference"
            description="Asset path or hosted image URL."
          >
            <input
              type="text"
              value={formData.coverImage}
              onChange={(e) => updateField('coverImage', e.target.value)}
              placeholder="/assets/case-studies/default-cover.webp"
              className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-lg text-xs text-slate-100 placeholder-slate-600 focus:outline-none focus:border-amber-500/50"
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
                Featured Case Study
              </span>
            </label>
            <p className="text-[11px] text-slate-500 mt-1 pl-7">
              Showcased on homepage and featured portfolio sections.
            </p>
          </div>
        </div>
      </div>

      {/* Section 2: Narrative Arc (Challenge, Strategy, Execution, Results) */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-6 space-y-6">
        <div className="flex items-center gap-2 pb-4 border-b border-slate-800">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-200">
            Case Narrative Architecture
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            label="The Challenge"
            required
            error={formErrors.challenge}
            description="Specific narrative disruption, regulatory obstacle, or institutional stakes."
          >
            <textarea
              rows={5}
              value={formData.challenge}
              onChange={(e) => updateField('challenge', e.target.value)}
              placeholder="Detail the operational situation, media pressures, and threats to organizational posture..."
              className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-lg text-xs text-slate-100 placeholder-slate-600 focus:outline-none focus:border-amber-500/50"
            />
          </FormField>

          <FormField
            label="The Strategy"
            required
            error={formErrors.strategy}
            description="Strategic orientation, messaging pillars, and counter-framing architecture."
          >
            <textarea
              rows={5}
              value={formData.strategy}
              onChange={(e) => updateField('strategy', e.target.value)}
              placeholder="Strategic positioning, defensive messaging framework, and spokesperson protocols..."
              className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-lg text-xs text-slate-100 placeholder-slate-600 focus:outline-none focus:border-amber-500/50"
            />
          </FormField>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            label="Execution Methodology"
            required
            error={formErrors.execution}
            description="Tactical roll-out, media interactions, and leadership advisement."
          >
            <textarea
              rows={5}
              value={formData.execution}
              onChange={(e) => updateField('execution', e.target.value)}
              placeholder="Chronological execution of media outreach, press releases, and editorial briefings..."
              className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-lg text-xs text-slate-100 placeholder-slate-600 focus:outline-none focus:border-amber-500/50"
            />
          </FormField>

          <FormField
            label="Institutional Outcome & Results"
            required
            error={formErrors.results}
            description="Reputational stability achieved, stakeholder sentiment shift, or policy resolution."
          >
            <textarea
              rows={5}
              value={formData.results}
              onChange={(e) => updateField('results', e.target.value)}
              placeholder="Qualitative and validated outcomes, neutralizing hostile sentiment and establishing authority..."
              className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-lg text-xs text-slate-100 placeholder-slate-600 focus:outline-none focus:border-amber-500/50"
            />
          </FormField>
        </div>
      </div>

      {/* Section 3: Verified Impact Metrics (Optional) */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-6 space-y-4">
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div>
            <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-200">
              Documented Impact Metrics
            </h2>
            <p className="text-[11px] text-slate-400">
              Only include factual, client-authorized impact numbers. Leave blank if purely qualitative.
            </p>
          </div>
          <button
            type="button"
            onClick={handleAddMetric}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-amber-300 text-xs font-medium transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Metric</span>
          </button>
        </div>

        <div className="space-y-3">
          {formData.metrics.map((m, idx) => (
            <div key={idx} className="flex items-center gap-3">
              <input
                type="text"
                value={m.value}
                onChange={(e) => handleUpdateMetric(idx, 'value', e.target.value)}
                placeholder="Value (e.g. 100% or 48 Hours)"
                className="w-48 px-3.5 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs font-mono text-amber-300 placeholder-slate-600 focus:outline-none focus:border-amber-500/50"
              />
              <input
                type="text"
                value={m.label}
                onChange={(e) => handleUpdateMetric(idx, 'label', e.target.value)}
                placeholder="Metric Label (e.g. Positive Sentiment Retention)"
                className="flex-1 px-3.5 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-slate-100 placeholder-slate-600 focus:outline-none focus:border-amber-500/50"
              />
              <button
                type="button"
                onClick={() => handleRemoveMetric(idx)}
                className="p-2 text-slate-500 hover:text-rose-400 hover:bg-rose-950/20 rounded-lg transition-colors"
                title="Remove metric"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Section 4: SEO Metadata */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-6 space-y-4">
        <div className="flex items-center gap-2 pb-4 border-b border-slate-800">
          <Globe className="w-4 h-4 text-amber-400" />
          <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-200">
            SEO & Social Preview
          </h2>
        </div>

        <div className="space-y-4">
          <FormField
            label="SEO Page Title"
            description="Title displayed in search engine results."
          >
            <input
              type="text"
              value={formData.seoTitle}
              onChange={(e) => updateField('seoTitle', e.target.value)}
              placeholder="Case Study: Crisis Advisory | Kalka Co."
              className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-lg text-xs text-slate-100 placeholder-slate-600 focus:outline-none focus:border-amber-500/50"
            />
          </FormField>

          <FormField
            label="Meta Description"
            description="Brief overview for search snippets."
          >
            <textarea
              rows={2}
              value={formData.seoDescription}
              onChange={(e) => updateField('seoDescription', e.target.value)}
              placeholder="Examining strategic narrative architecture and crisis mitigation..."
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
        backHref="/admin/case-studies"
        onSaveDraft={() => handleSubmit('draft')}
        onPublish={() => handleSubmit('publish')}
      />
    </div>
  );
};
