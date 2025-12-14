import React, { useState, useRef } from 'react';
import { Upload, X, Loader2, Image as ImageIcon } from 'lucide-react';
import { Button } from './Button';
import { analyzeImage, fileToBase64 } from '../services/geminiService';
import { Photo } from '../types';

interface UploadModalProps {
  onClose: () => void;
  onUpload: (photo: Photo) => void;
}

export const UploadModal: React.FC<UploadModalProps> = ({ onClose, onUpload }) => {
  const [dragActive, setDragActive] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const processFile = async (file: File) => {
    if (!file.type.startsWith('image/')) return;
    
    // Create preview
    const objectUrl = URL.createObjectURL(file);
    setPreview(objectUrl);
    
    setIsAnalyzing(true);
    try {
      // Get Base64 for Gemini
      const fullBase64 = await fileToBase64(file);
      // Strip prefix for API
      const base64Data = fullBase64.split(',')[1];
      
      const analysis = await analyzeImage(base64Data, file.type);
      
      const newPhoto: Photo = {
        id: Date.now().toString(),
        url: fullBase64, // Storing base64 to persist in LS (careful with size)
        source: 'upload',
        tags: analysis.tags,
        description: analysis.description,
        createdAt: Date.now()
      };
      
      onUpload(newPhoto);
      onClose();
    } catch (err) {
      console.error(err);
      alert("Failed to analyze image. Please check your API key.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="bg-dark-card border border-slate-700 w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden relative animate-slide-up">
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors"
        >
          <X size={24} />
        </button>
        
        <div className="p-8">
          <h2 className="text-2xl font-bold text-white mb-2">Upload Photo</h2>
          <p className="text-slate-400 mb-6">Upload an image to automatically tag and describe it using Gemini Vision.</p>
          
          {isAnalyzing ? (
            <div className="flex flex-col items-center justify-center py-12 space-y-4">
              <div className="relative">
                {preview && (
                  <img src={preview} className="w-24 h-24 object-cover rounded-lg opacity-50" alt="Preview" />
                )}
                <div className="absolute inset-0 flex items-center justify-center">
                   <Loader2 className="animate-spin text-brand-500 h-10 w-10" />
                </div>
              </div>
              <p className="text-brand-200 animate-pulse">Analyzing visuals...</p>
            </div>
          ) : (
            <div 
              className={`border-2 border-dashed rounded-xl p-10 flex flex-col items-center justify-center transition-colors cursor-pointer ${
                dragActive ? "border-brand-500 bg-brand-500/10" : "border-slate-700 hover:border-slate-500 hover:bg-slate-800/50"
              }`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
            >
              <input 
                ref={fileInputRef}
                type="file" 
                className="hidden" 
                accept="image/*"
                onChange={handleChange}
              />
              <div className="w-16 h-16 rounded-full bg-slate-800 flex items-center justify-center mb-4 text-brand-400">
                <Upload size={32} />
              </div>
              <p className="text-lg font-medium text-slate-200 mb-1">Click to upload or drag and drop</p>
              <p className="text-sm text-slate-500">SVG, PNG, JPG or GIF (max. 800x400px recommended)</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};