import React, { useEffect } from 'react';
import { Calendar, Camera, MapPin, X } from 'lucide-react';
import { Photo } from '../types';
import { FaceBlurImage } from './FaceBlurImage';

interface ImageViewerProps {
  photo: Photo;
  onClose: () => void;
}

export const ImageViewer: React.FC<ImageViewerProps> = ({ photo, onClose }) => {
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <button
        type="button"
        onClick={onClose}
        className="absolute right-4 top-4 rounded-full p-2 text-stone-300 transition-colors hover:bg-white/10 hover:text-white"
        aria-label="关闭"
      >
        <X size={22} />
      </button>

      <div
        className="flex h-full w-full max-w-7xl flex-col gap-6 lg:flex-row lg:items-center"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex min-h-0 flex-1 items-center justify-center">
          <FaceBlurImage
            src={photo.url}
            alt={photo.title}
            blurFaces={photo.blurFaces}
            faceRegions={photo.faceRegions}
            loading="eager"
            wrapperClassName="inline-block max-w-full"
            className="max-h-[70vh] max-w-full object-contain lg:max-h-[85vh]"
          />
        </div>

        <aside className="w-full shrink-0 rounded-lg border border-stone-800 bg-stone-950/80 p-6 lg:w-80">
          <h2 className="text-xl font-medium text-stone-100">{photo.title}</h2>

          {photo.description && (
            <p className="mt-3 text-sm leading-relaxed text-stone-400">{photo.description}</p>
          )}

          <dl className="mt-6 space-y-4 text-sm">
            {photo.location && (
              <div>
                <dt className="mb-1 flex items-center gap-1.5 text-xs uppercase tracking-wider text-stone-600">
                  <MapPin size={12} />
                  地点
                </dt>
                <dd className="text-stone-300">{photo.location}</dd>
              </div>
            )}

            {photo.takenAt && (
              <div>
                <dt className="mb-1 flex items-center gap-1.5 text-xs uppercase tracking-wider text-stone-600">
                  <Calendar size={12} />
                  拍摄日期
                </dt>
                <dd className="text-stone-300">
                  {new Date(photo.takenAt).toLocaleDateString('zh-CN', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </dd>
              </div>
            )}

            {(photo.camera || photo.lens) && (
              <div>
                <dt className="mb-1 flex items-center gap-1.5 text-xs uppercase tracking-wider text-stone-600">
                  <Camera size={12} />
                  器材
                </dt>
                <dd className="text-stone-300">
                  {[photo.camera, photo.lens].filter(Boolean).join(' · ')}
                </dd>
              </div>
            )}

            {photo.tags.length > 0 && (
              <div>
                <dt className="mb-2 text-xs uppercase tracking-wider text-stone-600">标签</dt>
                <dd className="flex flex-wrap gap-2">
                  {photo.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-stone-800 bg-stone-900 px-2.5 py-1 text-xs text-stone-300"
                    >
                      {tag}
                    </span>
                  ))}
                </dd>
              </div>
            )}
          </dl>
        </aside>
      </div>
    </div>
  );
};
