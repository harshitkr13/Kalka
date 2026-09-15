'use client';

import React, { useEffect, useState, useCallback } from 'react';
import { Copy, Trash2, Plus, AlertCircle, Check, Image as ImageIcon, ExternalLink } from 'lucide-react';
import { CMSPageHeader } from '@/components/admin/cms/CMSPageHeader';
import { ContentFilters } from '@/components/admin/cms/ContentFilters';
import { DeleteConfirmationModal } from '@/components/admin/cms/DeleteConfirmationModal';
import { fetchAdminList, createAdminItem, deleteAdminItem } from '@/lib/api/adminCms';
import { useAdminAuth } from '@/contexts/AdminAuthContext';

interface GalleryItem {
  _id: string;
  title: string;
  url: string;
  filename?: string;
  category?: string;
  altText?: string;
  tags?: string[];
  fileSize?: number;
  mimeType?: string;
  width?: number;
  height?: number;
  status: 'published' | 'draft' | 'archived';
  createdAt: string;
}

export default function AdminMediaAssetsPage() {
  const { hasPermission } = useAdminAuth();
  const canPublish = hasPermission('content:publish');

  const [items, setItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('all');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Modal for new asset registration
  const [showAddModal, setShowAddModal] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newUrl, setNewUrl] = useState('');
  const [newCategory, setNewCategory] = useState('general');
  const [newAltText, setNewAltText] = useState('');
  const [newTags, setNewTags] = useState('');
  const [isAdding, setIsAdding] = useState(false);
  const [addError, setAddError] = useState<string | null>(null);

  // Delete modal
  const [deletingItem, setDeletingItem] = useState<GalleryItem | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const loadAssets = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetchAdminList<GalleryItem>('gallery', {
        search: search.trim() || undefined,
        category: category !== 'all' ? category : undefined,
      });

      if (res.success && res.data) {
        setItems(res.data);
      } else {
        setError(res.error || 'Failed to load media assets');
      }
    } catch {
      setError('Network error occurred while fetching media assets');
    } finally {
      setLoading(false);
    }
  }, [search, category]);

  useEffect(() => {
    loadAssets();
  }, [loadAssets]);

  const handleCopy = (url: string, id: string) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsAdding(true);
    setAddError(null);

    const tagsList = newTags
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);

    try {
      const res = await createAdminItem('gallery', {
        title: newTitle,
        url: newUrl,
        category: newCategory,
        altText: newAltText || newTitle,
        tags: tagsList,
        status: 'published',
      });

      if (res.success) {
        setShowAddModal(false);
        setNewTitle('');
        setNewUrl('');
        setNewCategory('general');
        setNewAltText('');
        setNewTags('');
        await loadAssets();
      } else {
        setAddError(res.error || 'Failed to register asset');
      }
    } catch {
      setAddError('Network error occurred while adding asset');
    } finally {
      setIsAdding(false);
    }
  };

  const handleDelete = async () => {
    if (!deletingItem) return;
    setIsDeleting(true);
    try {
      const res = await deleteAdminItem('gallery', deletingItem._id);
      if (res.success) {
        setDeletingItem(null);
        await loadAssets();
      } else {
        alert(res.error || 'Failed to delete asset');
      }
    } catch {
      alert('Network error occurred while deleting asset');
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="space-y-6">
      <CMSPageHeader
        title="Institutional Media Assets & Gallery"
        description="Unified digital asset library governing logos, executive portraits, campaign imagery, and press media files."
        secondaryAction={
          <button
            onClick={() => setShowAddModal(true)}
            className="inline-flex items-center gap-2 px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 text-sm font-semibold rounded-lg transition-colors shadow-sm"
          >
            <Plus className="w-4 h-4" />
            Register Asset
          </button>
        }
      />

      {error && (
        <div className="p-4 rounded-lg bg-rose-950/40 border border-rose-800/80 text-rose-300 text-sm flex items-center gap-3">
          <AlertCircle className="w-5 h-5 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}

      <ContentFilters
        search={search}
        onSearchChange={setSearch}
        status="all"
        onStatusChange={() => {}}
        extraFilterLabel="Category"
        extraFilterValue={category}
        extraFilterOptions={[
          { label: 'All Categories', value: 'all' },
          { label: 'Brand & Logos', value: 'brand' },
          { label: 'Team Portraits', value: 'team' },
          { label: 'Case Studies', value: 'case-studies' },
          { label: 'General / Press', value: 'general' },
        ]}
        onExtraFilterChange={setCategory}
        onReset={() => {
          setSearch('');
          setCategory('all');
        }}
      />

      {loading ? (
        <div className="p-12 text-center text-slate-400 font-mono text-sm">
          Loading institutional media library...
        </div>
      ) : items.length === 0 ? (
        <div className="p-12 text-center border border-dashed border-slate-800 rounded-xl bg-slate-900/30">
          <ImageIcon className="w-10 h-10 text-slate-600 mx-auto mb-3" />
          <p className="text-slate-300 font-medium">No media assets found in gallery</p>
          <p className="text-slate-500 text-xs mt-1">
            Register media files from the authoritative /assets/ directory to track usage metadata.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {items.map((item) => (
            <div
              key={item._id}
              className="group bg-slate-900/60 border border-slate-800 rounded-xl overflow-hidden hover:border-slate-700 transition-all flex flex-col"
            >
              <div className="relative aspect-video bg-slate-950 flex items-center justify-center overflow-hidden border-b border-slate-800">
                <img
                  src={item.url}
                  alt={item.altText || item.title}
                  className="w-full h-full object-contain p-2 group-hover:scale-105 transition-transform duration-300"
                  onError={(e) => {
                    (e.target as HTMLElement).style.display = 'none';
                  }}
                />
              </div>

              <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                <div>
                  <h4 className="text-sm font-medium text-slate-200 line-clamp-1">{item.title}</h4>
                  <div className="flex items-center gap-2 text-xs text-slate-400 mt-1 font-mono">
                    <span className="uppercase text-amber-400">{item.category || 'Asset'}</span>
                    {item.width && item.height && (
                      <>
                        <span>•</span>
                        <span>{item.width}x{item.height}</span>
                      </>
                    )}
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between gap-2">
                  <button
                    onClick={() => handleCopy(item.url, item._id)}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-mono transition-colors"
                  >
                    {copiedId === item._id ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-emerald-400">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 text-slate-400" />
                        <span>Copy URL</span>
                      </>
                    )}
                  </button>

                  <div className="flex items-center gap-1">
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 rounded text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-colors"
                      title="Open full asset in new tab"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>

                    {canPublish && (
                      <button
                        onClick={() => setDeletingItem(item)}
                        className="p-1.5 rounded text-slate-400 hover:text-rose-400 hover:bg-rose-950/40 transition-colors"
                        title="Delete asset registration"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add Asset Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="bg-slate-900 border border-slate-800 rounded-xl max-w-lg w-full p-6 space-y-4 shadow-xl">
            <h3 className="text-lg font-semibold text-slate-100">Register Digital Media Asset</h3>
            <p className="text-xs text-slate-400">
              Register authoritative assets located in the project&apos;s /assets/ directory or CDN storage.
            </p>

            {addError && (
              <div className="p-3 bg-rose-950/40 border border-rose-800 text-rose-300 text-xs rounded-lg">
                {addError}
              </div>
            )}

            <form onSubmit={handleCreate} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase font-mono text-slate-300 mb-1">
                  Asset Title *
                </label>
                <input
                  type="text"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  required
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-slate-100 text-sm focus:border-amber-500 focus:outline-none"
                  placeholder="e.g. Kalka Official Mark (Dark)"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase font-mono text-slate-300 mb-1">
                  Asset Path / URL *
                </label>
                <input
                  type="text"
                  value={newUrl}
                  onChange={(e) => setNewUrl(e.target.value)}
                  required
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-slate-100 text-sm font-mono focus:border-amber-500 focus:outline-none"
                  placeholder="/assets/brand/kalka-co-logo.svg"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase font-mono text-slate-300 mb-1">
                    Category
                  </label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-slate-100 text-sm focus:border-amber-500 focus:outline-none"
                  >
                    <option value="brand">Brand & Logos</option>
                    <option value="team">Team Portraits</option>
                    <option value="case-studies">Case Studies</option>
                    <option value="general">General / Press</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase font-mono text-slate-300 mb-1">
                    Alt Text
                  </label>
                  <input
                    type="text"
                    value={newAltText}
                    onChange={(e) => setNewAltText(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-slate-100 text-sm focus:border-amber-500 focus:outline-none"
                    placeholder="Descriptive alt text"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase font-mono text-slate-300 mb-1">
                  Tags (comma-separated)
                </label>
                <input
                  type="text"
                  value={newTags}
                  onChange={(e) => setNewTags(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-slate-100 text-sm focus:border-amber-500 focus:outline-none"
                  placeholder="logo, brand, vector, dark-theme"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 text-sm text-slate-400 hover:text-slate-200 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isAdding}
                  className="px-5 py-2 bg-amber-500 hover:bg-amber-400 disabled:opacity-50 text-slate-950 text-sm font-semibold rounded-lg transition-colors shadow-sm"
                >
                  {isAdding ? 'Registering...' : 'Register Asset'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {deletingItem && (
        <DeleteConfirmationModal
          isOpen={Boolean(deletingItem)}
          itemName={deletingItem.title}
          itemType="media asset"
          isDeleting={isDeleting}
          onConfirm={handleDelete}
          onClose={() => setDeletingItem(null)}
        />
      )}
    </div>
  );
}
