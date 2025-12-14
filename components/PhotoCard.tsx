import React from 'react';
import { Photo } from '../types';
import { Download, Sparkles, Tag, ZoomIn } from 'lucide-react';

interface PhotoCardProps {
  photo: Photo;
  onClick: (photo: Photo) => void;
}

export const PhotoCard: React.FC<PhotoCardProps> = ({ photo, onClick }) => {
  return (
    <div 
      className="group relative break-inside-avoid mb-6 rounded-xl overflow-hidden bg-dark-card border border-slate-800 hover:border-brand-500/50 transition-all duration-300 shadow-xl cursor-pointer"
      onClick={() => onClick(photo)}
    >
      <div className="relative overflow-hidden aspect-auto">
        <img 
          src={photo.url} 
          alt={photo.description || 'Gallery image'} 
          className="w-full h-auto object-cover transform transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
        />
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
          <p className="text-white text-sm line-clamp-2 font-light mb-2">
            {photo.description || 'No description available'}
          </p>
          
          <div className="flex flex-wrap gap-1 mb-3">
            {photo.tags.slice(0, 3).map(tag => (
              <span key={tag} className="text-[10px] px-2 py-0.5 rounded-full bg-white/20 text-white backdrop-blur-sm">
                #{tag}
              </span>
            ))}
          </div>

          <div className="flex items-center justify-between mt-1">
            <span className="text-[10px] text-slate-400 uppercase tracking-wider flex items-center gap-1">
               {photo.source === 'generated' ? <Sparkles size={10} className="text-brand-400" /> : <Tag size={10} />}
               {photo.source}
            </span>
            <div className="flex gap-2">
               <button className="p-1.5 rounded-full bg-white/20 hover:bg-white/40 text-white transition-colors">
                  <ZoomIn size={14} />
               </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};