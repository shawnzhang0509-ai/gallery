import { gallerySections } from '../data/sections';
import { GallerySection, Photo } from '../types';

export function groupPhotosByModel(photos: Photo[]): GallerySection[] {
  return gallerySections
    .map((section) => ({
      ...section,
      photos: photos.filter((photo) => photo.model === section.model),
    }))
    .filter((section) => section.photos.length > 0);
}
