import React from 'react';
import { GallerySection } from '../types';

interface ModelNavProps {
  sections: GallerySection[];
  activeSectionId: string;
  onNavigate: (sectionId: string) => void;
  variant: 'sidebar' | 'mobile';
}

export const ModelNav: React.FC<ModelNavProps> = ({
  sections,
  activeSectionId,
  onNavigate,
  variant,
}) => {
  if (variant === 'sidebar') {
    return (
      <nav
        className="sticky top-24 w-44 shrink-0 self-start pt-2"
        aria-label="模特导航"
      >
        <p className="mb-4 text-[10px] uppercase tracking-[0.25em] text-stone-600">
          Collections
        </p>
        <ul className="space-y-1">
          {sections.map((section) => {
            const isActive = section.id === activeSectionId;
            return (
              <li key={section.id}>
                <button
                  type="button"
                  onClick={() => onNavigate(section.id)}
                  className={[
                    'w-full rounded-md px-3 py-2.5 text-left transition-colors',
                    isActive
                      ? 'bg-amber-500/10 text-amber-200 ring-1 ring-amber-500/25'
                      : 'text-stone-400 hover:bg-stone-900/80 hover:text-stone-200',
                  ].join(' ')}
                >
                  <span className="block text-sm font-medium">{section.title}</span>
                  <span className="mt-0.5 block text-[11px] text-stone-600">
                    {section.photos.length} 张
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>
    );
  }

  return (
    <nav
      className="sticky top-16 z-30 -mx-4 border-b border-stone-800/80 bg-ink/95 px-4 py-3 backdrop-blur-xl sm:-mx-6 sm:px-6 lg:hidden"
      aria-label="模特导航"
    >
      <div className="flex gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {sections.map((section) => {
          const isActive = section.id === activeSectionId;
          return (
            <button
              key={section.id}
              type="button"
              onClick={() => onNavigate(section.id)}
              className={[
                'shrink-0 rounded-full px-4 py-2 text-sm transition-colors',
                isActive
                  ? 'bg-amber-500/15 text-amber-200 ring-1 ring-amber-500/30'
                  : 'bg-stone-900/60 text-stone-400 hover:text-stone-200',
              ].join(' ')}
            >
              {section.title}
              <span className="ml-1.5 text-[11px] text-stone-600">
                {section.photos.length}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
