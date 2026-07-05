import React from 'react';
import { Photo } from '../types';
import { PhotoCard } from './PhotoCard';

interface MasonryGridProps {
  photos: Photo[];
  onPhotoClick: (photo: Photo) => void;
}

export const MasonryGrid: React.FC<MasonryGridProps> = ({ photos, onPhotoClick }) => {
  if (photos.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-stone-500">
        <p className="text-lg text-stone-400">暂无作品</p>
        <p className="mt-2 text-sm">该系列暂无照片。</p>
      </div>
    );
  }

  return (
    <div className="columns-1 gap-5 sm:columns-2 lg:columns-3 xl:columns-4">
      {photos.map((photo) => (
        <PhotoCard key={photo.id} photo={photo} onClick={onPhotoClick} />
      ))}
    </div>
  );
};
