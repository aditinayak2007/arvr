import React from 'react';
import { 
  Fuel, 
  Gauge, 
  Zap, 
  ArrowRight, 
  Smartphone, 
  Eye, 
  ShieldCheck,
  Sparkles
} from 'lucide-react';
import FavoriteButton from './FavoriteButton';

export default function CarCard({
  car,
  isFavorite,
  onToggleFavorite,
  onViewDetails,
  onViewAR
}) {
  return (
    <div
      onClick={() => onViewDetails(car)}
      className="group relative rounded-2xl glass-card overflow-hidden transition-all duration-300 hover:-translate-y-1.5 cursor-pointer flex flex-col justify-between"
    >
      {/* Top Media & Image Showcase */}
      <div className="relative aspect-[16/10] overflow-hidden bg-slate-950">
        <img
          src={car.image}
          alt={`${car.brand} ${car.model}`}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />

        {/* Ambient Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0b0e17] via-transparent to-black/40 pointer-events-none" />

        {/* Top Badges */}
        <div className="absolute top-3 inset-x-3 flex items-center justify-between z-10">
          <div className="flex items-center gap-1.5">
            <span className="px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider bg-black/75 border border-white/10 text-cyan-300 backdrop-blur-md">
              {car.bodyType}
            </span>
            {car.isFeatured && (
              <span className="px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider bg-cyan-500/20 border border-cyan-400/40 text-cyan-200 backdrop-blur-md flex items-center gap-1">
                <Sparkles className="w-2.5 h-2.5 text-cyan-400" />
                Featured
              </span>
            )}
          </div>

          {/* Favorite Button */}
          <FavoriteButton
            isFav={isFavorite}
            onToggle={() => onToggleFavorite(car.id)}
          />
        </div>

        {/* 3D Ready Badge */}
        <div className="absolute bottom-3 left-3 flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-mono bg-cyan-950/70 border border-cyan-500/30 text-cyan-300 backdrop-blur-md">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
          Interactive 3D & WebAR
        </div>
      </div>

      {/* Card Content Information */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div>
          {/* Brand & Model */}
          <div className="flex items-start justify-between gap-2">
            <div>
              <span className="text-xs uppercase tracking-widest text-cyan-400 font-bold">
                {car.brand}
              </span>
              <h3 className="font-['Orbitron',sans-serif] text-base font-bold text-white group-hover:text-cyan-300 transition-colors line-clamp-1">
                {car.model}
              </h3>
            </div>
          </div>

          {/* Price display */}
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-lg font-extrabold text-white">
              {car.priceDisplay}
            </span>
            <span className="text-[11px] text-slate-400">
              ({car.priceUsd})
            </span>
            <span className="text-[10px] text-cyan-400/80 uppercase font-mono font-medium">
              Ex-Showroom
            </span>
          </div>
        </div>

        {/* Key Specs Pills Grid */}
        <div className="grid grid-cols-3 gap-2 py-2 border-y border-white/[0.06] text-[11px] text-slate-300">
          <div className="flex items-center gap-1.5">
            <Fuel className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
            <span className="truncate">{car.fuelType}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Zap className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            <span className="truncate">{car.transmission}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Gauge className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            <span className="truncate">{car.mileage.split(' ')[0]}</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-2 pt-1">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onViewDetails(car);
            }}
            className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl text-xs font-semibold text-white bg-slate-800/80 hover:bg-slate-700/80 border border-white/10 hover:border-white/25 transition-all"
          >
            <Eye className="w-3.5 h-3.5 text-slate-400" />
            <span>3D View</span>
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onViewAR(car);
            }}
            className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl text-xs font-bold text-black bg-gradient-to-r from-cyan-400 to-sky-300 hover:from-cyan-300 hover:to-sky-200 transition-all shadow-[0_0_12px_rgba(0,210,255,0.25)]"
          >
            <Smartphone className="w-3.5 h-3.5 text-black" />
            <span>View in AR</span>
          </button>
        </div>
      </div>
    </div>
  );
}
