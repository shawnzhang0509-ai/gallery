import React from 'react';
import { Camera } from 'lucide-react';
import { siteConfig } from '../config/site';

export const GalleryHeader: React.FC = () => {
  return (
    <header className="sticky top-0 z-40 border-b border-stone-800/80 bg-ink/90 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-full border border-stone-700 bg-stone-900">
            <Camera size={16} className="text-amber-400/90" strokeWidth={1.5} />
          </div>
          <div className="leading-tight">
            <p className="text-base font-medium tracking-wide text-stone-100">{siteConfig.title}</p>
            <p className="text-[11px] uppercase tracking-[0.2em] text-stone-500">{siteConfig.subtitle}</p>
          </div>
        </div>
        <p className="hidden text-sm text-stone-500 sm:block">{siteConfig.author}</p>
      </div>
    </header>
  );
};
