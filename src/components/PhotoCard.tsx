import React from 'react';
import { Photo } from '../types';
import { MapPin } from 'lucide-react';
import { FaceBlurImage } from './FaceBlurImage';

interface PhotoCardProps {
  photo: Photo;
  onClick: (photo: Photo) => void;
}

export const PhotoCard: React.FC<PhotoCardProps> = ({ photo, onClick }) => {
  const displayUrl = photo.thumbnailUrl || photo.url;

  return (
    <article
      className="group relative mb-5 cursor-pointer break-inside-avoid overflow-hidden rounded-sm bg-stone-900"
      onClick={() => onClick(photo)}
    >
      <FaceBlurImage
        src={displayUrl}
        alt={photo.title}
        blurFaces={photo.blurFaces}
        className="w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
      />

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      <div className="pointer-events-none absolute inset-x-0 bottom-0 translate-y-2 p-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
        <h3 className="text-sm font-medium text-white">{photo.title}</h3>
        {photo.location && (
          <p className="mt-1 flex items-center gap-1 text-xs text-stone-300">
            <MapPin size={11} />
            {photo.location}
          </p>
        )}
        {photo.tags.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-1.5">
            {photo.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-white/10 px-2 py-0.5 text-[10px] text-stone-200 backdrop-blur-sm"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </article>
  );
};
