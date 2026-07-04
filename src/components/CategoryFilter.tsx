import React from 'react';
import { PhotoCategory } from '../types';

interface CategoryFilterProps {
  categories: PhotoCategory[];
  active: PhotoCategory;
  onChange: (category: PhotoCategory) => void;
}

export const CategoryFilter: React.FC<CategoryFilterProps> = ({
  categories,
  active,
  onChange,
}) => {
  return (
    <div className="flex flex-wrap justify-center gap-2">
      {categories.map((category) => {
        const isActive = category === active;
        return (
          <button
            key={category}
            type="button"
            onClick={() => onChange(category)}
            className={[
              'rounded-full px-4 py-1.5 text-sm transition-colors',
              isActive
                ? 'bg-amber-500/15 text-amber-200 ring-1 ring-amber-500/30'
                : 'text-stone-400 hover:bg-stone-800/60 hover:text-stone-200',
            ].join(' ')}
          >
            {category}
          </button>
        );
      })}
    </div>
  );
};
