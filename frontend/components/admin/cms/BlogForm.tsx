'use client';

import React, { useState, useEffect } from 'react';
import { BookOpen, Globe, User, AlertCircle, Plus } from 'lucide-react';
import Link from 'next/link';
import { FormField } from './FormField';
import { SlugField } from './SlugField';
import { PublishControls } from './PublishControls';
import { fetchAdminList } from '@/lib/api/adminCms';

export interface AuthorInfo {
  name: string;
  role: string;
  avatar?: string;
}

export interface BlogFormData {
  title: string;
  slug: string;
  subtitle: string;
  excerpt: string;
  content: string;
  author: AuthorInfo;
  category: string;
  tags: string[];
  featured: boolean;
  publishedAt?: string;
  seoTitle: string;
  seoDescription: string;
  status: 'published' | 'draft' | 'archived';
}

export interface BlogFormProps {
  initialData?: Partial<BlogFormData>;
  isEditing?: boolean;
  onSubmit: (data: BlogFormData, action: 'draft' | 'publish') => Promise<void>;
  isSubmitting: boolean;
  error?: string | null;
}

interface CategoryOption {
  _id: string;
  name: string;
  slug: string;
}

export const BlogForm: React.FC<BlogFormProps> = ({
  initialData,
  isEditing = false,
  onSubmit,
  isSubmitting,
  error,
}) => {
  const [formData, setFormData] = useState<BlogFormData>({
    title: initialData?.title || '',
    slug: initialData?.slug || '',
    subtitle: initialData?.subtitle || '',
    excerpt: initialData?.excerpt || '',
    content: initialData?.content || '',
    author: {
      name: initialData?.author?.name || 'Kalka Co. Editorial Board',
      role: initialData?.author?.role || 'Strategic Communications',
      avatar: initialData?.author?.avatar || '',
    },
    category: initialData?.category || '',
    tags: initialData?.tags || [],
    featured: initialData?.featured || false,
    publishedAt: initialData?.publishedAt || '',
    seoTitle: initialData?.seoTitle || '',
    seoDescription: initialData?.seoDescription || '',
    status: initialData?.status || 'draft',
  });

  const [categories, setCategories] = useState<CategoryOption[]>([]);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [tagInput, setTagInput] = useState('');

  useEffect(() => {
    async function loadCategories() {
      try {
        const res = await fetchAdminList<CategoryOption>('categories');
        if (res.success && res.data) {
          setCategories(res.data);
          const firstCat = res.data[0]?.name;
          if (firstCat) {
            setFormData((prev) => (prev.category ? prev : { ...prev, category: firstCat }));
          }
        }
      } catch {
        // Fallback gracefully if categories fail to load
      }
    }
    loadCategories();
  }, []);

  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title || '',
        slug: initialData.slug || '',
        subtitle: initialData.subtitle || '',
        excerpt: initialData.excerpt || '',
        content: initialData.content || '',
        author: {
          name: initialData.author?.name || 'Kalka Co. Editorial Board',
          role: initialData.author?.role || 'Strategic Communications',
          avatar: initialData.author?.avatar || '',
        },
        category: initialData.category || '',
        tags: initialData.tags || [],
        featured: initialData.featured ?? false,
        publishedAt: initialData.publishedAt || '',
        seoTitle: initialData.seoTitle || '',
        seoDescription: initialData.seoDescription || '',
        status: initialData.status || 'draft',
      });
    }
  }, [initialData]);

  const updateField = <K extends keyof BlogFormData>(field: K, value: BlogFormData[K]) => {
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

  const updateAuthorField = (field: keyof AuthorInfo, value: string) => {
    setFormData((prev) => ({
      ...prev,
      author: { ...prev.author, [field]: value },
    }));
    setHasUnsavedChanges(true);
  };

  const handleAddTag = (e: React.KeyboardEvent | React.MouseEvent) => {
    if ('key' in e && e.key !== 'Enter') return;
    e.preventDefault();
    const val = tagInput.trim();
    if (val && !formData.tags.includes(val)) {
      setFormData((prev) => ({ ...prev, tags: [...prev.tags, val] }));
      setTagInput('');
      setHasUnsavedChanges(true);
    }
  };

  const handleRemoveTag = (tag: string) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((t) => t !== tag),
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
    if (!formData.excerpt.trim() || formData.excerpt.trim().length < 10) {
      errors.excerpt = 'Excerpt must be at least 10 characters.';
    }
    if (!formData.content.trim() || formData.content.trim().length < 20) {
      errors.content = 'Article body must be at least 20 characters.';
    }
    if (!formData.category.trim()) {
      errors.category = 'Category selection is required.';
    }
    if (!formData.author.name.trim()) {
      errors.authorName = 'Author name is required.';
    }
    if (!formData.author.role.trim()) {
      errors.authorRole = 'Author role is required.';
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (action: 'draft' | 'publish') => {
    if (!validate()) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    const payload: BlogFormData = {
      ...formData,
      status: action === 'publish' ? 'published' : 'draft',
      publishedAt:
        action === 'publish' && !formData.publishedAt
          ? new Date().toISOString()
          : formData.publishedAt,
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

      {/* Section 1: Article Header & Title */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-6 space-y-6">
        <div className="flex items-center gap-2 pb-4 border-b border-slate-800">
          <BookOpen className="w-4 h-4 text-amber-400" />
          <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-200">
            Article Essence & Metadata
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField label="Article Headline / Title" required error={formErrors.title}>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => updateField('title', e.target.value)}
              placeholder="e.g. Navigating Institutional Scrutiny in Modern Media"
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
            label="Subtitle / Deck (Optional)"
            description="Complementary narrative hook displayed beneath main headline."
          >
            <input
              type="text"
              value={formData.subtitle}
              onChange={(e) => updateField('subtitle', e.target.value)}
              placeholder="A strategic playbook for enterprise leadership and communications teams..."
              className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-lg text-xs text-slate-100 placeholder-slate-600 focus:outline-none focus:border-amber-500/50"
            />
          </FormField>

          <FormField
            label="Category"
            required
            error={formErrors.category}
            description="Editorial categorization for taxonomy and filtering."
          >
            <div className="flex gap-2">
              {categories.length > 0 ? (
                <select
                  value={formData.category}
                  onChange={(e) => updateField('category', e.target.value)}
                  className="flex-1 px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-lg text-xs text-slate-100 focus:outline-none focus:border-amber-500/50"
                >
                  <option value="">Select Category</option>
                  {categories.map((c) => (
                    <option key={c._id} value={c.name}>
                      {c.name}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  type="text"
                  value={formData.category}
                  onChange={(e) => updateField('category', e.target.value)}
                  placeholder="e.g. Crisis Communications"
                  className="flex-1 px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-lg text-xs text-slate-100 placeholder-slate-600 focus:outline-none focus:border-amber-500/50"
                />
              )}

              <Link
                href="/admin/insights/categories"
                target="_blank"
                className="px-3 py-2.5 bg-slate-800 hover:bg-slate-700 text-amber-300 text-xs font-medium rounded-lg transition-colors flex items-center gap-1"
                title="Manage Categories"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Manage</span>
              </Link>
            </div>
          </FormField>
        </div>

        <FormField
          label="Executive Excerpt"
          required
          error={formErrors.excerpt}
          description="Summary abstract for index feeds, newsletters, and social previews (max 400 characters)."
        >
          <textarea
            rows={2}
            maxLength={400}
            value={formData.excerpt}
            onChange={(e) => updateField('excerpt', e.target.value)}
            placeholder="When organizational crisis coincides with fragmented digital commentary, standard press releases fail..."
            className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-lg text-xs text-slate-100 placeholder-slate-600 focus:outline-none focus:border-amber-500/50 resize-none"
          />
        </FormField>
      </div>

      {/* Section 2: Full Article Body */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-6 space-y-4">
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-200">
              Article Content (Markdown Supported)
            </h2>
          </div>
          <span className="text-[11px] font-mono text-slate-500">
            {formData.content.split(/\s+/).filter(Boolean).length} Words
          </span>
        </div>

        <FormField label="Perspective Body Content" required error={formErrors.content}>
          <textarea
            rows={14}
            value={formData.content}
            onChange={(e) => updateField('content', e.target.value)}
            placeholder="Write the full perspective, strategic insights, framework details, and analysis..."
            className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-lg font-mono text-xs text-slate-100 placeholder-slate-600 focus:outline-none focus:border-amber-500/50 leading-relaxed"
          />
        </FormField>
      </div>

      {/* Section 3: Author Attribution */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-6 space-y-6">
        <div className="flex items-center gap-2 pb-4 border-b border-slate-800">
          <User className="w-4 h-4 text-amber-400" />
          <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-200">
            Author Attribution
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField label="Author Name" required error={formErrors.authorName}>
            <input
              type="text"
              value={formData.author.name}
              onChange={(e) => updateAuthorField('name', e.target.value)}
              placeholder="e.g. Editorial Board or Strategist Name"
              className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-lg text-xs text-slate-100 placeholder-slate-600 focus:outline-none focus:border-amber-500/50"
            />
          </FormField>

          <FormField label="Author Role / Title" required error={formErrors.authorRole}>
            <input
              type="text"
              value={formData.author.role}
              onChange={(e) => updateAuthorField('role', e.target.value)}
              placeholder="e.g. Strategic Communications Advisory"
              className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-lg text-xs text-slate-100 placeholder-slate-600 focus:outline-none focus:border-amber-500/50"
            />
          </FormField>
        </div>

        <div className="flex flex-col justify-center pt-2">
          <label className="flex items-center gap-3 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={formData.featured}
              onChange={(e) => updateField('featured', e.target.checked)}
              className="w-4 h-4 rounded border-slate-800 text-amber-500 focus:ring-amber-500/30 bg-slate-950"
            />
            <span className="text-xs text-slate-300 font-medium">
              Featured Perspective
            </span>
          </label>
          <p className="text-[11px] text-slate-500 mt-1 pl-7">
            Pin to the top of insights feed and display on the homepage knowledge reel.
          </p>
        </div>
      </div>

      {/* Section 4: Tags & Taxonomy */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-6 space-y-4">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-200 pb-2 border-b border-slate-800">
          Tags & Topics
        </h2>

        <div className="space-y-3">
          <div className="flex gap-2">
            <input
              type="text"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={handleAddTag}
              placeholder="e.g. Crisis Management, Public Affairs (Press Enter to add)"
              className="flex-1 px-3.5 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-slate-100 placeholder-slate-600 focus:outline-none focus:border-amber-500/50"
            />
            <button
              type="button"
              onClick={handleAddTag}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium rounded-lg transition-colors"
            >
              Add Tag
            </button>
          </div>

          <div className="flex flex-wrap gap-2 pt-1">
            {formData.tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-800/80 border border-slate-700 text-xs text-slate-200 font-mono"
              >
                <span>#{tag}</span>
                <button
                  type="button"
                  onClick={() => handleRemoveTag(tag)}
                  className="text-slate-400 hover:text-rose-400 transition-colors"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Section 5: SEO Metadata */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-6 space-y-4">
        <div className="flex items-center gap-2 pb-4 border-b border-slate-800">
          <Globe className="w-4 h-4 text-amber-400" />
          <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-200">
            SEO & Social Metadata
          </h2>
        </div>

        <div className="space-y-4">
          <FormField
            label="SEO Page Title"
            description="Custom title tag for search engine indexing."
          >
            <input
              type="text"
              value={formData.seoTitle}
              onChange={(e) => updateField('seoTitle', e.target.value)}
              placeholder="Title | Kalka Co. Perspectives"
              className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-lg text-xs text-slate-100 placeholder-slate-600 focus:outline-none focus:border-amber-500/50"
            />
          </FormField>

          <FormField
            label="Meta Description"
            description="Search snippet for organic search and OpenGraph cards."
          >
            <textarea
              rows={2}
              value={formData.seoDescription}
              onChange={(e) => updateField('seoDescription', e.target.value)}
              placeholder="Strategic perspective on organizational resilience and communication..."
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
        backHref="/admin/insights"
        onSaveDraft={() => handleSubmit('draft')}
        onPublish={() => handleSubmit('publish')}
      />
    </div>
  );
};
