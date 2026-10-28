import React from 'react';
import { 
  Heart, 
  Trash2, 
  Eye, 
  Smartphone, 
  Scale, 
  ArrowRight,
  Car
} from 'lucide-react';
import { CARS_DATA } from '../data/cars';
import CarCard from '../components/CarCard';

export default function Favorites({
  favorites = [],
  onToggleFavorite,
  onViewDetails,
  onViewAR,
  onExploreShowroom
}) {
  const favoriteCars = CARS_DATA.filter((c) => favorites.includes(c.id));

  return (
    <div className="space-y-10 pt-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-4 border-b border-white/[0.08]">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-rose-500/10 border border-rose-500/30 text-rose-300">
            <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500" />
            <span>Saved Vehicles ({favoriteCars.length})</span>
          </div>
          <h1 className="font-['Orbitron',sans-serif] text-3xl sm:text-4xl font-extrabold text-white">
            My Favorites
          </h1>
          <p className="text-sm text-slate-300 max-w-xl">
            Your saved car lineup. Persisted across browser sessions using HTML5 LocalStorage.
          </p>
        </div>

        {favoriteCars.length > 0 && (
          <button
            onClick={onExploreShowroom}
            className="flex items-center gap-2 text-xs font-semibold text-cyan-400 hover:text-cyan-300 group"
          >
            <span>Browse more cars</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        )}
      </div>

      {/* Grid or Empty State */}
      {favoriteCars.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {favoriteCars.map((car) => (
            <CarCard
              key={car.id}
              car={car}
              isFavorite={true}
              onToggleFavorite={onToggleFavorite}
              onViewDetails={onViewDetails}
              onViewAR={onViewAR}
            />
          ))}
        </div>
      ) : (
        <div className="glass-panel p-12 rounded-3xl border border-white/10 text-center space-y-5 max-w-md mx-auto">
          <div className="w-16 h-16 rounded-full bg-rose-500/10 border border-rose-500/30 flex items-center justify-center mx-auto text-rose-400">
            <Heart className="w-8 h-8" />
          </div>
          <div className="space-y-2">
            <h3 className="font-['Orbitron',sans-serif] text-xl font-bold text-white">
              No Favorites Saved Yet
            </h3>
            <p className="text-xs text-slate-400">
              Browse our virtual showroom and tap the heart icon on any vehicle to save it to your wishlist.
            </p>
          </div>
          <button
            onClick={onExploreShowroom}
            className="px-6 py-3 rounded-xl font-bold text-xs uppercase tracking-wider text-black bg-cyan-400 hover:bg-cyan-300 transition-all shadow-[0_0_15px_rgba(0,210,255,0.3)]"
          >
            Explore Showroom
          </button>
        </div>
      )}
    </div>
  );
}
