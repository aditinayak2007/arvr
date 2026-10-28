import React from 'react';
import { Heart } from 'lucide-react';

export default function FavoriteButton({ isFav, onToggle, className = '' }) {
  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        onToggle();
      }}
      className={`p-2.5 rounded-xl border transition-all duration-200 active:scale-90 ${
        isFav
          ? 'bg-rose-500/20 border-rose-500/50 text-rose-400 shadow-[0_0_12px_rgba(244,63,94,0.3)]'
          : 'bg-black/60 border-white/10 text-slate-400 hover:text-white hover:border-white/20'
      } ${className}`}
      title={isFav ? 'Remove from favorites' : 'Save to favorites'}
      aria-label={isFav ? 'Remove from favorites' : 'Save to favorites'}
    >
      <Heart className={`w-4 h-4 transition-transform ${isFav ? 'fill-rose-500 text-rose-500 scale-110' : ''}`} />
    </button>
  );
}
