'use client';

import React, { useEffect, useState, useCallback } from 'react';
import Link from 'next/link';
import { Tag, Plus, Edit3, Trash2, AlertCircle, ArrowLeft, Loader2, X, Check } from 'lucide-react';
import { CMSPageHeader } from '@/components/admin/cms/CMSPageHeader';
import { ContentTable, Column } from '@/components/admin/cms/ContentTable';
import { DeleteConfirmationModal } from '@/components/admin/cms/DeleteConfirmationModal';
import { FormField } from '@/components/admin/cms/FormField';
import { SlugField } from '@/components/admin/cms/SlugField';
import {
  fetchAdminList,
  createAdminItem,
  updateAdminItem,
  deleteAdminItem,
} from '@/lib/api/adminCms';
import { useAdminAuth } from '@/contexts/AdminAuthContext';

interface CategoryItem {
  _id: string;
  name: string;
  slug: string;
  description?: string;
  articleCount?: number;
  updatedAt: string;
}

export default function AdminCategoriesPage() {
  const { hasPermission } = useAdminAuth();
  const canPublish = hasPermission('content:publish');
  const canEdit = hasPermission('content:edit');

  const [categories, setCategories] = useState<CategoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Modal state for Add/Edit
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<CategoryItem | null>(null);
  const [modalName, setModalName] = useState('');
  const [modalSlug, setModalSlug] = useState('');
  const [modalDescription, setModalDescription] = useState('');
  const [modalSaving, setModalSaving] = useState(false);
  const [modalError, setModalError] = useState<string | null>(null);

  // Delete modal state
  const [deletingItem, setDeletingItem] = useState<CategoryItem | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const loadCategories = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetchAdminList<CategoryItem>('categories');
      if (res.success && res.data) {
        setCategories(res.data);
      } else {
        setError(res.error || 'Failed to load categories');
      }
    } catch {
      setError('A network error occurred while retrieving categories');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadCategories();
  }, [loadCategories]);

  const openCreateModal = () => {
    setEditingItem(null);
    setModalName('');
    setModalSlug('');
    setModalDescription('');
    setModalError(null);
    setIsModalOpen(true);
  };

  const openEditModal = (cat: CategoryItem) => {
    setEditingItem(cat);
    setModalName(cat.name);
    setModalSlug(cat.slug);
    setModalDescription(cat.description || '');
    setModalError(null);
    setIsModalOpen(true);
  };

  const handleSaveModal = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!modalName.trim() || modalName.trim().length < 2) {
      setModalError('Category name must be at least 2 characters');
      return;
    }
    if (!modalSlug.trim() || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(modalSlug)) {
      setModalError('Valid URL slug is required (lowercase letters, numbers, hyphens)');
      return;
    }

    setModalSaving(true);
    setModalError(null);

    try {
      if (editingItem) {
        const res = await updateAdminItem('categories', editingItem._id, {
          name: modalName.trim(),
          slug: modalSlug.trim(),
          description: modalDescription.trim() || undefined,
        });
        if (res.success) {
          setIsModalOpen(false);
          await loadCategories();
        } else {
          setModalError(res.error || 'Failed to update category');
        }
      } else {
        const res = await createAdminItem('categories', {
          name: modalName.trim(),
          slug: modalSlug.trim(),
          description: modalDescription.trim() || undefined,
        });
        if (res.success) {
          setIsModalOpen(false);
          await loadCategories();
        } else {
          setModalError(res.error || 'Failed to create category');
        }
      }
    } catch {
      setModalError('A network error occurred while saving category');
    } finally {
      setModalSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!deletingItem) return;
    if ((deletingItem.articleCount || 0) > 0) {
      setError(
        `Cannot delete category "${deletingItem.name}" because it is currently referenced by ${deletingItem.articleCount} article(s). Reassign those articles before deleting.`
      );
      setDeletingItem(null);
      return;
    }

    setIsDeleting(true);
    try {
      const res = await deleteAdminItem('categories', deletingItem._id);
      if (res.success) {
        setDeletingItem(null);
        await loadCategories();
      } else {
        setError(res.error || 'Failed to delete category');
        setDeletingItem(null);
      }
    } catch {
      setError('Network error occurred while deleting category');
      setDeletingItem(null);
    } finally {
      setIsDeleting(false);
    }
  };

  const columns: Column<CategoryItem>[] = [
    {
      key: 'name',
      header: 'Category Name',
      render: (item) => (
        <div className="space-y-0.5">
          <span className="font-serif font-semibold text-slate-100">
            {item.name}
          </span>
          {item.description && (
            <p className="text-[11px] text-slate-400 line-clamp-1">
              {item.description}
            </p>
          )}
        </div>
      ),
    },
    {
      key: 'slug',
      header: 'URL Slug',
      render: (item) => (
        <span className="font-mono text-xs text-amber-400/90">
          /{item.slug}
        </span>
      ),
    },
    {
      key: 'articleCount',
      header: 'Referenced Articles',
      render: (item) => (
        <span
          className={`inline-flex items-center px-2 py-0.5 rounded text-[11px] font-mono ${
            (item.articleCount || 0) > 0
              ? 'bg-amber-500/10 text-amber-300 border border-amber-500/20'
              : 'bg-slate-800/60 text-slate-400'
          }`}
        >
          {item.articleCount || 0} {item.articleCount === 1 ? 'Article' : 'Articles'}
        </span>
      ),
    },
    {
      key: 'actions',
      header: 'Actions',
      className: 'text-right',
      render: (item) => (
        <div className="flex items-center justify-end gap-2">
          {canEdit && (
            <button
              onClick={() => openEditModal(item)}
              className="p-1.5 rounded-lg text-slate-400 hover:text-amber-400 hover:bg-slate-800 transition-colors"
              title="Edit Category"
            >
              <Edit3 className="w-4 h-4" />
            </button>
          )}

          {canPublish && (
            <button
              onClick={() => setDeletingItem(item)}
              className="p-1.5 rounded-lg text-slate-500 hover:text-rose-400 hover:bg-rose-950/20 transition-colors"
              title="Delete Category"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          )}
        </div>
      ),
    },
  ];

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2 text-xs text-slate-400 mb-2">
            <Link
              href="/admin/insights"
              className="hover:text-amber-400 flex items-center gap-1 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Insights</span>
            </Link>
          </div>
          <h1 className="text-2xl font-serif font-bold text-slate-100 flex items-center gap-2">
            <Tag className="w-5 h-5 text-amber-400" />
            <span>Editorial Categories</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1 max-w-2xl">
            Configure taxonomy classifications for articles and research briefings. Deletion is automatically protected if referenced by existing articles.
          </p>
        </div>

        {canEdit && (
          <button
            onClick={openCreateModal}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-semibold shadow-md transition-all self-start sm:self-auto"
          >
            <Plus className="w-4 h-4" />
            <span>New Category</span>
          </button>
        )}
      </div>

      {error && (
        <div className="mb-6 p-4 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs flex items-center justify-between">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-rose-400 flex-shrink-0" />
            <span>{error}</span>
          </div>
          <button
            onClick={() => setError(null)}
            className="text-slate-400 hover:text-slate-200"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      <ContentTable
        columns={columns}
        data={categories}
        loading={loading}
        emptyTitle="No categories found"
        emptyDescription="Create your first editorial taxonomy classification."
        emptyAction={
          canEdit ? (
            <button
              onClick={openCreateModal}
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-amber-500 text-slate-950 rounded-lg text-xs font-semibold hover:bg-amber-400 transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span>Create First Category</span>
            </button>
          ) : undefined
        }
        page={1}
        totalPages={1}
        total={categories.length}
        onPageChange={() => {}}
      />

      {/* Add / Edit Category Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden">
            <div className="p-6 border-b border-slate-800 flex items-center justify-between">
              <h3 className="font-serif text-base font-semibold text-slate-100">
                {editingItem ? 'Edit Category' : 'Create New Category'}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-slate-200"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveModal} className="p-6 space-y-4">
              {modalError && (
                <div className="p-3 rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 flex-shrink-0 text-rose-400" />
                  <span>{modalError}</span>
                </div>
              )}

              <FormField label="Category Name" required>
                <input
                  type="text"
                  value={modalName}
                  onChange={(e) => setModalName(e.target.value)}
                  placeholder="e.g. Crisis Communications"
                  className="w-full px-3.5 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-slate-100 placeholder-slate-600 focus:outline-none focus:border-amber-500/50"
                  autoFocus
                />
              </FormField>

              <SlugField
                slug={modalSlug}
                onChange={setModalSlug}
                sourceValue={modalName}
                isExistingItem={Boolean(editingItem)}
              />

              <FormField label="Description (Optional)">
                <textarea
                  rows={3}
                  value={modalDescription}
                  onChange={(e) => setModalDescription(e.target.value)}
                  placeholder="Brief editorial scope and topic coverage..."
                  className="w-full px-3.5 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-slate-100 placeholder-slate-600 focus:outline-none focus:border-amber-500/50 resize-none"
                />
              </FormField>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-lg bg-slate-800 text-slate-300 text-xs hover:bg-slate-700 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={modalSaving}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-semibold transition-all disabled:opacity-50"
                >
                  {modalSaving ? (
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  ) : (
                    <Check className="w-3.5 h-3.5" />
                  )}
                  <span>{editingItem ? 'Save Changes' : 'Create Category'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deletingItem && (
        <DeleteConfirmationModal
          isOpen={Boolean(deletingItem)}
          itemName={deletingItem.name}
          itemType="Category"
          isDeleting={isDeleting}
          onConfirm={handleDelete}
          onClose={() => setDeletingItem(null)}
        />
      )}
    </div>
  );
}
