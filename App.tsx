import React, { useState, useEffect, useMemo } from 'react';
import { Upload, Plus, Search, Camera, Aperture } from 'lucide-react';
import { MasonryGrid } from './components/MasonryGrid';
import { Button } from './components/Button';
import { UploadModal } from './components/UploadModal';
import { GenerateModal } from './components/GenerateModal';
import { ImageViewer } from './components/ImageViewer';
import { Photo, ModalType } from './types';

// Initial Sample Data to make the gallery look good immediately
const SAMPLE_PHOTOS: Photo[] = [
  {
    id: '1',
    url: 'https://picsum.photos/id/64/800/1200',
    description: 'A portrait of a girl with windblown hair in soft natural light.',
    tags: ['portrait', 'natural', 'girl', 'wind', 'soft'],
    source: 'sample',
    createdAt: Date.now() - 100000
  },
  {
    id: '2',
    url: 'https://picsum.photos/id/129/800/800',
    description: 'Urban setting with moody lighting.',
    tags: ['urban', 'moody', 'city', 'street'],
    source: 'sample',
    createdAt: Date.now() - 200000
  },
  {
    id: '3',
    url: 'https://picsum.photos/id/338/800/1000',
    description: 'Artistic silhouette against a sunset.',
    tags: ['silhouette', 'artistic', 'sunset', 'warm'],
    source: 'sample',
    createdAt: Date.now() - 300000
  },
   {
    id: '4',
    url: 'https://picsum.photos/id/331/800/1200',
    description: 'Fashion style shot with high contrast.',
    tags: ['fashion', 'contrast', 'style', 'studio'],
    source: 'sample',
    createdAt: Date.now() - 400000
  },
];

const App: React.FC = () => {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [modalOpen, setModalOpen] = useState<ModalType>(ModalType.NONE);
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Load photos from local storage or use samples on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem('lumina_photos');
      if (saved) {
        setPhotos(JSON.parse(saved));
      } else {
        setPhotos(SAMPLE_PHOTOS);
      }
    } catch (e) {
      console.error("Failed to load from local storage", e);
      setPhotos(SAMPLE_PHOTOS);
    }
  }, []);

  // Save to local storage whenever photos change
  useEffect(() => {
    if (photos.length > 0) {
      try {
        // Limit storage to avoid quota exceeded errors with base64 strings
        // Just store the last 20 for this demo if they are uploads
        const toSave = photos.slice(0, 20); 
        localStorage.setItem('lumina_photos', JSON.stringify(toSave));
      } catch (e) {
        console.warn("Storage quota exceeded, could not persist latest changes");
      }
    }
  }, [photos]);

  const handleUpload = (newPhoto: Photo) => {
    setPhotos(prev => [newPhoto, ...prev]);
  };

  const handlePhotoClick = (photo: Photo) => {
    setSelectedPhoto(photo);
    setModalOpen(ModalType.VIEW);
  };

  const filteredPhotos = useMemo(() => {
    if (!searchQuery) return photos;
    const lowerQ = searchQuery.toLowerCase();
    return photos.filter(p => 
      p.tags.some(t => t.toLowerCase().includes(lowerQ)) ||
      p.description?.toLowerCase().includes(lowerQ)
    );
  }, [photos, searchQuery]);

  return (
    <div className="min-h-screen bg-dark-bg text-dark-text font-sans selection:bg-brand-500 selection:text-white">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-dark-bg/80 backdrop-blur-lg border-b border-slate-800">
        <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <div className="bg-gradient-to-tr from-brand-600 to-purple-600 p-2 rounded-lg">
                <Aperture className="text-white h-6 w-6" />
              </div>
              <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
                Lumina
              </span>
            </div>

            {/* Search Bar (Desktop) */}
            <div className="hidden md:flex flex-1 max-w-md mx-8 relative group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-slate-500 group-focus-within:text-brand-400 transition-colors" />
              </div>
              <input
                type="text"
                placeholder="Search tags, descriptions..."
                className="block w-full pl-10 pr-3 py-2 border border-slate-700 rounded-full leading-5 bg-slate-900 text-slate-100 placeholder-slate-500 focus:outline-none focus:bg-slate-800 focus:ring-1 focus:ring-brand-500 focus:border-brand-500 sm:text-sm transition-all"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3">
              <Button 
                variant="secondary" 
                size="sm" 
                icon={<Upload size={16} />}
                onClick={() => setModalOpen(ModalType.UPLOAD)}
                className="hidden sm:flex"
              >
                Upload
              </Button>
              <Button 
                variant="primary" 
                size="sm" 
                icon={<Plus size={16} />}
                onClick={() => setModalOpen(ModalType.GENERATE)}
              >
                Generate
              </Button>
            </div>
          </div>
          
          {/* Mobile Search */}
          <div className="md:hidden pb-4">
             <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-4 w-4 text-slate-500" />
                </div>
                <input
                  type="text"
                  placeholder="Search..."
                  className="block w-full pl-10 py-2 border border-slate-700 rounded-lg bg-slate-900 text-sm text-white focus:border-brand-500 focus:ring-1 focus:ring-brand-500 outline-none"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
             </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-8">
        <MasonryGrid photos={filteredPhotos} onPhotoClick={handlePhotoClick} />
      </main>

      {/* Floating Action Button for Mobile Upload */}
      <div className="fixed bottom-6 right-6 md:hidden">
        <button 
          onClick={() => setModalOpen(ModalType.UPLOAD)}
          className="bg-brand-600 text-white p-4 rounded-full shadow-lg shadow-brand-600/40 hover:bg-brand-700 transition-colors"
        >
          <Camera size={24} />
        </button>
      </div>

      {/* Modals */}
      {modalOpen === ModalType.UPLOAD && (
        <UploadModal 
          onClose={() => setModalOpen(ModalType.NONE)} 
          onUpload={handleUpload}
        />
      )}

      {modalOpen === ModalType.GENERATE && (
        <GenerateModal 
          onClose={() => setModalOpen(ModalType.NONE)}
          onGenerate={handleUpload}
        />
      )}

      {modalOpen === ModalType.VIEW && selectedPhoto && (
        <ImageViewer 
          photo={selectedPhoto} 
          onClose={() => {
            setModalOpen(ModalType.NONE);
            setSelectedPhoto(null);
          }} 
        />
      )}
    </div>
  );
};

export default App;