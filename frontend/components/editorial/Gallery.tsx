'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { Modal } from '@/components/ui/Modal';
import { Badge } from '@/components/ui/Badge';
import { ImageIcon } from 'lucide-react';

export interface GalleryItemData {
  id: string;
  title: string;
  category: string;
  datePlaceholder?: string;
  description?: string;
  caption?: string;
  imageUrl?: string;
}

export interface GalleryProps {
  items: GalleryItemData[];
  className?: string;
}

export const Gallery: React.FC<GalleryProps> = ({ items, className }) => {
  const [selectedItem, setSelectedItem] = useState<GalleryItemData | null>(null);

  return (
    <div className={cn('w-full', className)}>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((item) => (
          <div
            key={item.id}
            onClick={() => setSelectedItem(item)}
            className="group cursor-pointer bg-white border border-slate-200 rounded overflow-hidden hover:border-gold hover:shadow-elevated transition-all duration-200 text-left"
          >
            {/* Visual Frame */}
            <div className="relative h-48 bg-navy-deep overflow-hidden flex items-center justify-center text-center text-slate-400 group-hover:bg-navy transition-colors">
              {item.imageUrl ? (
                <Image
                  src={item.imageUrl}
                  alt={item.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              ) : (
                <div className="p-6">
                  <Badge variant="gold" size="sm" className="mb-2">
                    {item.category}
                  </Badge>
                  <div className="flex items-center justify-center gap-1.5 text-xs text-slate-400">
                    <ImageIcon className="w-4 h-4 text-gold/60" />
                    <span>Visual Asset</span>
                  </div>
                </div>
              )}
            </div>
            {/* Info */}
            <div className="p-4">
              {item.datePlaceholder && (
                <span className="text-xs text-slate-400 uppercase tracking-wider block">
                  {item.datePlaceholder}
                </span>
              )}
              <h4 className="font-serif text-base font-semibold text-navy mt-1 group-hover:text-gold-dark transition-colors">
                {item.title}
              </h4>
              {item.caption && (
                <p className="text-xs text-slate-600 mt-1 line-clamp-2">{item.caption}</p>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {selectedItem && (
        <Modal
          isOpen={!!selectedItem}
          onClose={() => setSelectedItem(null)}
          title={selectedItem.title}
          description={
            [selectedItem.category, selectedItem.datePlaceholder].filter(Boolean).join(' • ')
          }
          size="lg"
        >
          <div className="space-y-4">
            <div className="relative h-72 sm:h-96 bg-navy-deep rounded overflow-hidden flex items-center justify-center">
              {selectedItem.imageUrl ? (
                <Image
                  src={selectedItem.imageUrl}
                  alt={selectedItem.title}
                  fill
                  className="object-contain"
                  sizes="(max-width: 1200px) 100vw, 1000px"
                />
              ) : (
                <div className="text-slate-300 text-center p-8">
                  <ImageIcon className="w-12 h-12 text-gold/60 mx-auto mb-3" />
                  <p className="font-serif text-lg font-semibold text-gold">
                    {selectedItem.title}
                  </p>
                  <p className="text-xs text-slate-400 mt-2">
                    Visual archive asset record.
                  </p>
                </div>
              )}
            </div>
            {(selectedItem.description || selectedItem.caption) && (
              <p className="text-sm text-slate-700 leading-relaxed">
                {selectedItem.description || selectedItem.caption}
              </p>
            )}
          </div>
        </Modal>
      )}
    </div>
  );
};
