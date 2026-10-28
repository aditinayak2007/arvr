import React from 'react';
import { 
  Filter, 
  RotateCcw, 
  Car, 
  Fuel, 
  Zap, 
  Check, 
  DollarSign, 
  SlidersHorizontal 
} from 'lucide-react';
import { BRANDS, BODY_TYPES, FUEL_TYPES, TRANSMISSIONS } from '../data/cars';

export default function FilterPanel({
  selectedBrand,
  setSelectedBrand,
  selectedBodyType,
  setSelectedBodyType,
  selectedFuelType,
  setSelectedFuelType,
  selectedTransmission,
  setSelectedTransmission,
  priceRange,
  setPriceRange,
  onResetFilters,
  totalResults
}) {
  return (
    <div className="glass-panel p-5 rounded-2xl border border-white/10 space-y-6">
      {/* Panel Top Header */}
      <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="w-4 h-4 text-cyan-400" />
          <h3 className="font-['Orbitron',sans-serif] text-xs font-bold uppercase tracking-wider text-white">
            Filter Vehicles
          </h3>
          <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
            {totalResults} Available
          </span>
        </div>

        <button
          onClick={onResetFilters}
          className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-cyan-300 transition-colors"
          title="Clear all filters"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Clear All</span>
        </button>
      </div>

      {/* Brand Selection */}
      <div className="space-y-2.5">
        <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider block">
          Manufacturer / Brand
        </label>
        <div className="flex flex-wrap gap-1.5">
          {BRANDS.map((brand) => {
            const active = selectedBrand === brand;
            return (
              <button
                key={brand}
                onClick={() => setSelectedBrand(brand)}
                className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
                  active
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/50 shadow-[0_0_10px_rgba(0,210,255,0.2)] font-semibold'
                    : 'bg-slate-900/50 text-slate-400 hover:text-slate-200 border border-white/[0.05]'
                }`}
              >
                {brand}
              </button>
            );
          })}
        </div>
      </div>

      {/* Body Types */}
      <div className="space-y-2.5">
        <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider block">
          Body Architecture
        </label>
        <div className="flex flex-wrap gap-1.5">
          {BODY_TYPES.map((type) => {
            const active = selectedBodyType === type;
            return (
              <button
                key={type}
                onClick={() => setSelectedBodyType(type)}
                className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
                  active
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/50 shadow-[0_0_10px_rgba(0,210,255,0.2)] font-semibold'
                    : 'bg-slate-900/50 text-slate-400 hover:text-slate-200 border border-white/[0.05]'
                }`}
              >
                {type}
              </button>
            );
          })}
        </div>
      </div>

      {/* Fuel Type & Transmission Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Fuel Type */}
        <div className="space-y-2">
          <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider block">
            Powertrain / Fuel
          </label>
          <select
            value={selectedFuelType}
            onChange={(e) => setSelectedFuelType(e.target.value)}
            className="w-full px-3 py-2 rounded-xl bg-slate-900/80 border border-white/10 text-white text-xs focus:outline-none focus:border-cyan-400"
          >
            {FUEL_TYPES.map((f) => (
              <option key={f} value={f} className="bg-slate-900 text-white">
                {f}
              </option>
            ))}
          </select>
        </div>

        {/* Transmission */}
        <div className="space-y-2">
          <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider block">
            Transmission
          </label>
          <select
            value={selectedTransmission}
            onChange={(e) => setSelectedTransmission(e.target.value)}
            className="w-full px-3 py-2 rounded-xl bg-slate-900/80 border border-white/10 text-white text-xs focus:outline-none focus:border-cyan-400"
          >
            {TRANSMISSIONS.map((t) => (
              <option key={t} value={t} className="bg-slate-900 text-white">
                {t}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Price Range Slider */}
      <div className="space-y-2 pt-2 border-t border-white/[0.06]">
        <div className="flex items-center justify-between text-xs">
          <span className="font-semibold text-slate-300 uppercase tracking-wider">
            Max Price Cap
          </span>
          <span className="font-mono font-bold text-cyan-400">
            ₹{(priceRange / 100000).toFixed(1)} Lakh (₹{(priceRange / 10000000).toFixed(2)} Cr)
          </span>
        </div>

        <input
          type="range"
          min="30000000"
          max="400000000"
          step="10000000"
          value={priceRange}
          onChange={(e) => setPriceRange(Number(e.target.value))}
          className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
        />

        <div className="flex justify-between text-[10px] text-slate-500 font-mono">
          <span>₹3.0 Crore</span>
          <span>₹40.0 Crore</span>
        </div>
      </div>
    </div>
  );
}
