// src/App.tsx（基于老代码，仅修改数据部分）

import React from 'react';
import { MasonryGrid } from './components/MasonryGrid';
import { Photo } from './types';

// ✅ 静态图片列表（放在 public/images/）
const STATIC_PHOTOS: Photo[] = [
  {
    id: '1',
    url: '/images/Villa1.jpg',
    description: 'Your photo 1',
    tags: ['photo'],
    source: 'static',
    createdAt: Date.now()
  },
  {
    id: '2',
    url: '/images/Villa2.jpg',
    description: 'Your photo 2',
    tags: ['art'],
    source: 'static',
    createdAt: Date.now() - 1000
  },
  {
    id: '3',
    url: '/images/Villa3.jpg',
    description: 'Your photo 2',
    tags: ['art'],
    source: 'static',
    createdAt: Date.now() - 1000
  },
  {
    id: '4',
    url: '/images/Villa4.jpg',
    description: 'Your photo 2',
    tags: ['art'],
    source: 'static',
    createdAt: Date.now() - 1000
  },
  // ➕ 按需添加
];

export default function App() {
  // ❌ 移除 useState, useEffect, localStorage, modal 等逻辑
  // ✅ 直接渲染静态数据

  return (
    <div className="min-h-screen bg-dark-bg text-dark-text font-sans">
      {/* Header（保留原样） */}
      <header className="sticky top-0 z-40 bg-dark-bg/80 backdrop-blur-lg border-b border-slate-800">
        <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center">
          <div className="flex items-center gap-2">
            <div className="bg-gradient-to-tr from-brand-600 to-purple-600 p-2 rounded-lg">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                <circle cx="12" cy="12" r="10"></circle>
                <path d="m15 9-6 6"></path>
                <path d="m9 9 6 6"></path>
              </svg>
            </div>
            <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
              Lumina
            </span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-8 pb-16">
        <MasonryGrid 
          photos={STATIC_PHOTOS} 
          onPhotoClick={() => {}} // 点击无反应（或可加 console.log）
        />
      </main>
    </div>
  );
}