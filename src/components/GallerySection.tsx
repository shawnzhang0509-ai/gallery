import React from 'react';
import { GallerySection as GallerySectionType } from '../types';
import { MasonryGrid } from './MasonryGrid';

interface GallerySectionProps {
  section: GallerySectionType;
  onPhotoClick: (photo: GallerySectionType['photos'][number]) => void;
  isLast?: boolean;
}

export const GallerySection: React.FC<GallerySectionProps> = ({
  section,
  onPhotoClick,
  isLast = false,
}) => {
  return (
    <section
      id={section.id}
      className={`scroll-mt-28 ${isLast ? '' : 'mb-[100px]'}`}
      aria-labelledby={`${section.id}-title`}
    >
      <header className="mb-14">
        <h2
          id={`${section.id}-title`}
          className="text-3xl font-light tracking-wide text-stone-100 sm:text-4xl lg:text-[2.75rem] lg:leading-tight"
        >
          {section.title}
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-stone-400 sm:text-base">
          {section.subtitle}
        </p>
        <p className="mt-4 text-xs tracking-wider text-stone-600">
          {section.photos.length} 幅作品
        </p>
      </header>

      <MasonryGrid photos={section.photos} onPhotoClick={onPhotoClick} />
    </section>
  );
};
