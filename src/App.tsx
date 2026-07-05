import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { GalleryHeader } from './components/GalleryHeader';
import { GallerySection } from './components/GallerySection';
import { ModelNav } from './components/ModelNav';
import { ImageViewer } from './components/ImageViewer';
import { photos as allPhotos } from './data/photos';
import { siteConfig } from './config/site';
import { Photo } from './types';
import { groupPhotosByModel } from './utils/groupPhotos';

export default function App() {
  const sections = useMemo(() => groupPhotosByModel(allPhotos), []);
  const [activeSectionId, setActiveSectionId] = useState(sections[0]?.id ?? '');
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);

  const scrollToSection = useCallback((sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setActiveSectionId(sectionId);
    }
  }, []);

  useEffect(() => {
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visible[0]?.target.id) {
          setActiveSectionId(visible[0].target.id);
        }
      },
      {
        rootMargin: '-30% 0px -55% 0px',
        threshold: [0, 0.25, 0.5, 0.75, 1],
      },
    );

    sections.forEach((section) => {
      const el = document.getElementById(section.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [sections]);

  const totalPhotos = allPhotos.length;

  return (
    <div className="min-h-screen bg-ink text-stone-200">
      <GalleryHeader />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex gap-10 pb-20 pt-10 lg:gap-16 xl:gap-20">
          <ModelNav
            variant="sidebar"
            sections={sections}
            activeSectionId={activeSectionId}
            onNavigate={scrollToSection}
          />

          <main className="min-w-0 flex-1">
            <section className="mb-16 text-center lg:mb-20 lg:text-left">
              <p className="text-xs uppercase tracking-[0.35em] text-amber-500/80">Portfolio</p>
              <h1 className="mt-3 text-3xl font-light tracking-wide text-stone-100 sm:text-4xl">
                {siteConfig.title}
              </h1>
              <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-stone-400 sm:text-base lg:mx-0">
                {siteConfig.description}
              </p>
              <p className="mt-2 text-xs text-stone-600">共 {totalPhotos} 幅作品</p>
            </section>

            <ModelNav
              variant="mobile"
              sections={sections}
              activeSectionId={activeSectionId}
              onNavigate={scrollToSection}
            />

            <div className="mt-8 lg:mt-0">
              {sections.map((section, index) => (
                <GallerySection
                  key={section.id}
                  section={section}
                  onPhotoClick={setSelectedPhoto}
                  isLast={index === sections.length - 1}
                />
              ))}
            </div>
          </main>
        </div>
      </div>

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
