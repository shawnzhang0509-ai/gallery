import React from 'react';
import { X, Tag, Calendar, Sparkles } from 'lucide-react';
import { Photo } from '../types';

interface ImageViewerProps {
  photo: Photo;
  onClose: () => void;
}

export const ImageViewer: React.FC<ImageViewerProps> = ({ photo, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-md animate-fade-in" onClick={onClose}>
      <button 
        onClick={onClose} 
        className="absolute top-4 right-4 p-2 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors"
      >
        <X size={24} />
      </button>

      <div className="max-w-7xl w-full h-full p-4 md:p-10 flex flex-col md:flex-row gap-6" onClick={e => e.stopPropagation()}>
        {/* Image Container */}
        <div className="flex-1 flex items-center justify-center relative min-h-0">
          <img 
            src={photo.url} 
            alt={photo.description} 
            className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
          />
        </div>

        {/* Sidebar Info */}
        <div className="w-full md:w-96 bg-dark-card border border-slate-800 rounded-xl p-6 flex flex-col shadow-xl h-fit overflow-y-auto max-h-[50vh] md:max-h-full">
           <div className="mb-4">
              <h3 className="text-xl font-bold text-white mb-2">Details</h3>
              <p className="text-slate-300 text-sm leading-relaxed">
                {photo.description || 'No description provided.'}
              </p>
           </div>

           <div className="h-px bg-slate-800 my-4" />

           <div className="space-y-4">
              <div>
                <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Tags</h4>
                <div className="flex flex-wrap gap-2">
                  {photo.tags.map(tag => (
                    <span key={tag} className="inline-flex items-center px-2.5 py-1 rounded-md bg-slate-800 text-brand-300 text-xs border border-slate-700">
                      <Tag size={10} className="mr-1.5" />
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Source</h4>
                <div className="flex items-center text-sm text-slate-300">
                  {photo.source === 'generated' ? (
                    <><Sparkles size={16} className="mr-2 text-brand-400" /> AI Generated</>
                  ) : (
                    <><Tag size={16} className="mr-2 text-blue-400" /> Uploaded</>
                  )}
                </div>
              </div>
              
              <div>
                <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Created</h4>
                <div className="flex items-center text-sm text-slate-300">
                  <Calendar size={16} className="mr-2 text-slate-500" />
                  {new Date(photo.createdAt).toLocaleDateString()}
                </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};