import React, { useState } from 'react';
import { X, Sparkles, Wand2 } from 'lucide-react';
import { Button } from './Button';
import { generateImage } from '../services/geminiService';
import { Photo } from '../types';

interface GenerateModalProps {
  onClose: () => void;
  onGenerate: (photo: Photo) => void;
}

export const GenerateModal: React.FC<GenerateModalProps> = ({ onClose, onGenerate }) => {
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = async () => {
    if (!prompt.trim()) return;

    setIsGenerating(true);
    try {
      // Enhance prompt for better results in "girls photo gallery" context if vague
      let finalPrompt = prompt;
      if (!prompt.toLowerCase().includes('portrait') && !prompt.toLowerCase().includes('girl') && !prompt.toLowerCase().includes('woman')) {
         finalPrompt = `Portrait of a girl, ${prompt}, cinematic lighting, 8k resolution, photorealistic, highly detailed, beautiful depth of field`;
      }
      
      const base64Image = await generateImage(finalPrompt);
      
      if (base64Image) {
        const newPhoto: Photo = {
          id: Date.now().toString(),
          url: base64Image,
          source: 'generated',
          tags: ['generated', 'ai', ...prompt.split(' ').slice(0, 3)],
          description: `AI Generated: ${prompt}`,
          createdAt: Date.now()
        };
        onGenerate(newPhoto);
        onClose();
      } else {
        alert("Failed to generate image. Try a different prompt.");
      }
    } catch (err) {
      console.error(err);
      alert("Generation failed. Please check your API key.");
    } finally {
      setIsGenerating(false);
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
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-brand-500/20 rounded-lg text-brand-400">
               <Wand2 size={24} />
            </div>
            <h2 className="text-2xl font-bold text-white">Generate Portrait</h2>
          </div>
          <p className="text-slate-400 mb-6">Describe the image you want to create. Gemini will bring your imagination to life.</p>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1">Prompt</label>
              <textarea 
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="e.g., A cyberpunk girl with neon glasses in Tokyo at night..."
                className="w-full h-32 bg-slate-900 border border-slate-700 rounded-xl p-4 text-white focus:ring-2 focus:ring-brand-500 focus:border-transparent resize-none placeholder-slate-600"
                autoFocus
              />
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <Button variant="ghost" onClick={onClose} disabled={isGenerating}>Cancel</Button>
              <Button 
                onClick={handleGenerate} 
                loading={isGenerating} 
                disabled={!prompt.trim()}
                icon={<Sparkles size={18} />}
              >
                {isGenerating ? 'Dreaming...' : 'Generate'}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};