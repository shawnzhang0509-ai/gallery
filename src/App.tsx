import React, { useMemo, useState } from 'react';
import { MasonryGrid } from './components/MasonryGrid';
import { GalleryHeader } from './components/GalleryHeader';
import { CategoryFilter } from './components/CategoryFilter';
import { ImageViewer } from './components/ImageViewer';
import { photos as allPhotos } from './data/photos';
import { siteConfig } from './config/site';
import { Photo, PhotoCategory } from './types';

function collectCategories(photos: Photo[]): PhotoCategory[] {
  const tagSet = new Set<string>();
  photos.forEach((photo) => photo.tags.forEach((tag) => tagSet.add(tag)));
  return ['全部', ...Array.from(tagSet).sort((a, b) => a.localeCompare(b, 'zh-CN'))];
}

export default function App() {
  const [activeCategory, setActiveCategory] = useState<PhotoCategory>('全部');
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);

  const categories = useMemo(() => collectCategories(allPhotos), []);

  const filteredPhotos = useMemo(() => {
    if (activeCategory === '全部') return allPhotos;
    return allPhotos.filter((photo) => photo.tags.includes(activeCategory));
  }, [activeCategory]);

  return (
    <div className="min-h-screen bg-ink text-stone-200">
      <GalleryHeader />

      <main className="mx-auto max-w-7xl px-4 pb-20 pt-10 sm:px-6 lg:px-8">
        <section className="mb-12 text-center">
          <p className="text-xs uppercase tracking-[0.35em] text-amber-500/80">Portfolio</p>
          <h1 className="mt-3 text-3xl font-light tracking-wide text-stone-100 sm:text-4xl">
            {siteConfig.title}
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-stone-400 sm:text-base">
            {siteConfig.description}
          </p>
          <p className="mt-2 text-xs text-stone-600">
            共 {allPhotos.length} 幅作品
          </p>
        </section>

        {categories.length > 1 && (
          <section className="mb-10">
            <CategoryFilter
              categories={categories}
              active={activeCategory}
              onChange={setActiveCategory}
            />
          </section>
        )}

        <MasonryGrid photos={filteredPhotos} onPhotoClick={setSelectedPhoto} />
      </main>

      <footer className="border-t border-stone-800/80 py-10">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <p className="text-sm leading-relaxed text-stone-500">{siteConfig.about}</p>
          <p className="mt-4 text-xs text-stone-600">
            © {new Date().getFullYear()} {siteConfig.author}
          </p>
        </div>
      </footer>

      {selectedPhoto && (
        <ImageViewer photo={selectedPhoto} onClose={() => setSelectedPhoto(null)} />
      )}
    </div>
  );
}
