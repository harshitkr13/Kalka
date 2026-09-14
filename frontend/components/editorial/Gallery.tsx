'use client';

import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { Modal } from '@/components/ui/Modal';
import { Badge } from '@/components/ui/Badge';

export interface GalleryItemData {
  id: string;
  title: string;
  category: string;
  datePlaceholder: string;
  description: string;
  caption?: string;
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
            <div className="h-44 bg-navy-deep flex items-center justify-center p-6 text-center text-slate-400 group-hover:bg-navy transition-colors">
              <div>
                <Badge variant="gold" size="sm" className="mb-2">
                  {item.category}
                </Badge>
                <p className="text-xs font-serif text-slate-300">
                  [DEMO GALLERY MEDIA]
                </p>
              </div>
            </div>
            {/* Info */}
            <div className="p-4">
              <span className="text-[10px] text-slate-400 uppercase tracking-wider block">
                {item.datePlaceholder}
              </span>
              <h4 className="font-serif text-base font-semibold text-navy mt-1 group-hover:text-gold-dark transition-colors">
                {item.title}
              </h4>
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
          description={`${selectedItem.category} • ${selectedItem.datePlaceholder}`}
          size="lg"
        >
          <div className="space-y-4">
            <div className="h-64 bg-navy-deep rounded flex items-center justify-center text-slate-300 text-center p-8">
              <div>
                <p className="font-serif text-lg font-semibold text-gold">
                  [DEMO HIGH-RESOLUTION MEDIA VIEWER]
                </p>
                <p className="text-xs text-slate-400 mt-2">
                  Verified assets will load via Cloudinary media manager in production.
                </p>
              </div>
            </div>
            <p className="text-sm text-slate-700 leading-relaxed">
              {selectedItem.description}
            </p>
          </div>
        </Modal>
      )}
    </div>
  );
};
