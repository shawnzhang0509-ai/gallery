import { gallerySections } from '../data/sections';
import { GallerySection, Photo, resolvePhotoPrivacy } from '../types';

export function groupPhotosByModel(photos: Photo[]): GallerySection[] {
  return gallerySections
    .map((section) => ({
      ...section,
      photos: photos
        .filter((photo) => photo.model === section.model)
        .map((photo) => resolvePhotoPrivacy(photo, section)),
    }))
    .filter((section) => section.photos.length > 0);
}
