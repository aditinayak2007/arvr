import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Smartphone, 
  Scale, 
  Heart, 
  Sparkles, 
  Calendar, 
  ShieldCheck, 
  Fuel, 
  Gauge, 
  Zap, 
  CheckCircle2, 
  Layers, 
  Maximize2, 
  Palette,
  Calculator,
  Eye
} from 'lucide-react';
import CarViewer3D from '../components/CarViewer3D';
import CarCustomizer, { STANDARD_COLORS } from '../components/CarCustomizer';
import EMICalculator from '../components/EMICalculator';
import FavoriteButton from '../components/FavoriteButton';

export default function CarDetails({
  car,
  onBack,
  onOpenAR,
  onCompare,
  onBookTestDrive,
  isFavorite,
  onToggleFavorite
}) {
  const [selectedColor, setSelectedColor] = useState(car.colors?.[0] || STANDARD_COLORS[0]);
  const [selectedFinish, setSelectedFinish] = useState('metallic');
  const [activeTab, setActiveTab] = useState('specs'); // 'specs' | 'features' | 'dimensions' | 'emi'

  const handleResetColor = () => {
    if (car.colors && car.colors.length > 0) {
      setSelectedColor(car.colors[0]);
    } else {
      setSelectedColor(STANDARD_COLORS[0]);
    }
    setSelectedFinish('metallic');
  };

  return (
    <div className="space-y-8 pt-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Top Breadcrumb & Back Action */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform text-cyan-400" />
          <span>Back to Showroom</span>
        </button>

        <div className="flex items-center gap-3">
          <FavoriteButton
            isFav={isFavorite}
            onToggle={() => onToggleFavorite(car.id)}
          />

          <button
            onClick={() => onCompare(car.id)}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-white bg-slate-900 border border-white/10 hover:border-cyan-400 transition-all"
          >
            <Scale className="w-3.5 h-3.5 text-cyan-400" />
            <span>Compare</span>
          </button>
        </div>
      </div>

      {/* Main Showcase Grid: Left 3D Viewer (7 cols), Right Info & Customizer (5 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* LEFT COLUMN: Large 3D Vehicle Viewer */}
        <div className="lg:col-span-7 space-y-4">
          <CarViewer3D
            car={car}
            selectedColorHex={selectedColor.hex}
            selectedFinish={selectedFinish}
          />

          {/* Quick AR Callout directly under 3D canvas */}
          <div className="glass-panel p-4 rounded-2xl border border-cyan-500/20 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400">
                <Smartphone className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-white uppercase tracking-wider font-['Orbitron',sans-serif]">
                  WebAR True-Scale Projection
                </h4>
                <p className="text-[11px] text-slate-400">
                  Project this {car.model} in 1:1 scale onto your driveway or room floor.
                </p>
              </div>
            </div>

            <button
              onClick={() => onOpenAR(car)}
              className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider text-black bg-cyan-400 hover:bg-cyan-300 shadow-[0_0_15px_rgba(0,210,255,0.3)] transition-all shrink-0"
            >
              <Smartphone className="w-4 h-4 text-black" />
              <span>Launch AR</span>
            </button>
          </div>
        </div>

        {/* RIGHT COLUMN: Vehicle Specs, Customizer & Actions */}
        <div className="lg:col-span-5 space-y-6">
          {/* Header Card */}
          <div className="glass-panel p-6 rounded-3xl border border-white/10 space-y-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-cyan-500/15 text-cyan-300 border border-cyan-500/30">
                  {car.bodyType}
                </span>
                <span className="text-[10px] font-mono text-cyan-400/80">
                  Verified Production Specs
                </span>
              </div>

              <span className="text-xs uppercase tracking-widest font-bold text-cyan-400">
                {car.brand}
              </span>
              <h1 className="font-['Orbitron',sans-serif] text-2xl sm:text-3xl font-extrabold text-white">
                {car.model}
              </h1>

              <div className="mt-3 flex items-baseline gap-2">
                <span className="font-['Orbitron',sans-serif] text-2xl sm:text-3xl font-black text-white">
                  {car.priceDisplay}
                </span>
                <span className="text-xs text-slate-400">
                  ({car.priceUsd})
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              {car.description}
            </p>

            {/* CTAs Row */}
            <div className="grid grid-cols-2 gap-2 pt-2">
              <button
                onClick={() => onBookTestDrive(car.id)}
                className="flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-xs uppercase tracking-wider text-black bg-gradient-to-r from-cyan-400 to-sky-300 hover:from-cyan-300 shadow-[0_0_20px_rgba(0,210,255,0.3)] transition-all active:scale-95"
              >
                <Calendar className="w-4 h-4 text-black" />
                <span>Book Test Drive</span>
              </button>

              <button
                onClick={() => onOpenAR(car)}
                className="flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-xs uppercase tracking-wider text-white bg-slate-900 hover:bg-slate-800 border border-cyan-400/40 transition-all active:scale-95"
              >
                <Smartphone className="w-4 h-4 text-cyan-400" />
                <span>View in AR</span>
              </button>
            </div>
          </div>

          {/* Color Customizer Component */}
          <CarCustomizer
            car={car}
            selectedColor={selectedColor}
            setSelectedColor={setSelectedColor}
            selectedFinish={selectedFinish}
            setSelectedFinish={setSelectedFinish}
            onReset={handleResetColor}
          />
        </div>
      </div>

      {/* Tabs Section: Detailed Specs, Features, Dimensions, and EMI */}
      <div className="space-y-6 pt-4">
        {/* Tab Buttons */}
        <div className="flex border-b border-white/10 gap-2 overflow-x-auto">
          {[
            { id: 'specs', label: 'Technical Specifications' },
            { id: 'features', label: 'Key Features & Safety' },
            { id: 'dimensions', label: 'Dimensions & Capacity' },
            { id: 'emi', label: 'EMI Financing Calculator' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-3 px-4 text-xs font-semibold whitespace-nowrap border-b-2 transition-all ${
                activeTab === tab.id
                  ? 'border-cyan-400 text-cyan-300 font-bold'
                  : 'border-transparent text-slate-400 hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab 1: Specs */}
        {activeTab === 'specs' && (
          <div className="glass-panel p-6 rounded-3xl border border-white/10">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 font-mono text-xs">
              <div className="p-4 rounded-2xl bg-black/40 border border-white/5 space-y-1">
                <span className="text-slate-400 text-[10px] uppercase font-sans">Engine / Motor</span>
                <p className="text-white font-bold">{car.engine}</p>
              </div>

              <div className="p-4 rounded-2xl bg-black/40 border border-white/5 space-y-1">
                <span className="text-slate-400 text-[10px] uppercase font-sans">Power Output</span>
                <p className="text-cyan-300 font-bold">{car.power}</p>
              </div>

              <div className="p-4 rounded-2xl bg-black/40 border border-white/5 space-y-1">
                <span className="text-slate-400 text-[10px] uppercase font-sans">Peak Torque</span>
                <p className="text-cyan-300 font-bold">{car.torque}</p>
              </div>

              <div className="p-4 rounded-2xl bg-black/40 border border-white/5 space-y-1">
                <span className="text-slate-400 text-[10px] uppercase font-sans">0-100 km/h Sprint</span>
                <p className="text-emerald-300 font-bold">{car.acceleration}</p>
              </div>

              <div className="p-4 rounded-2xl bg-black/40 border border-white/5 space-y-1">
                <span className="text-slate-400 text-[10px] uppercase font-sans">Top Track Speed</span>
                <p className="text-white font-bold">{car.topSpeed}</p>
              </div>

              <div className="p-4 rounded-2xl bg-black/40 border border-white/5 space-y-1">
                <span className="text-slate-400 text-[10px] uppercase font-sans">Mileage / Range</span>
                <p className="text-amber-300 font-bold">{car.mileage}</p>
              </div>

              <div className="p-4 rounded-2xl bg-black/40 border border-white/5 space-y-1">
                <span className="text-slate-400 text-[10px] uppercase font-sans">Transmission</span>
                <p className="text-white font-bold">{car.transmission}</p>
              </div>

              <div className="p-4 rounded-2xl bg-black/40 border border-white/5 space-y-1">
                <span className="text-slate-400 text-[10px] uppercase font-sans">Powertrain / Fuel</span>
                <p className="text-white font-bold">{car.fuelType}</p>
              </div>

              <div className="p-4 rounded-2xl bg-black/40 border border-white/5 space-y-1">
                <span className="text-slate-400 text-[10px] uppercase font-sans">NCAP Safety Rating</span>
                <p className="text-emerald-400 font-bold">{car.safetyRating}</p>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Features */}
        {activeTab === 'features' && (
          <div className="glass-panel p-6 rounded-3xl border border-white/10 space-y-4">
            <h4 className="text-xs font-['Orbitron',sans-serif] uppercase tracking-wider text-slate-300 font-bold">
              Standard Equipment & High-Tech Features
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {car.features?.map((f, idx) => (
                <div key={idx} className="flex items-center gap-2.5 p-3 rounded-xl bg-white/[0.03] border border-white/5 text-xs text-slate-200">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span>{f}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 3: Dimensions */}
        {activeTab === 'dimensions' && (
          <div className="glass-panel p-6 rounded-3xl border border-white/10">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 font-mono text-xs">
              <div className="p-4 rounded-2xl bg-black/40 border border-white/5">
                <span className="text-slate-400 text-[10px] block font-sans">Length</span>
                <span className="text-white font-bold">{car.dimensions?.length || '4,700 mm'}</span>
              </div>
              <div className="p-4 rounded-2xl bg-black/40 border border-white/5">
                <span className="text-slate-400 text-[10px] block font-sans">Width</span>
                <span className="text-white font-bold">{car.dimensions?.width || '1,850 mm'}</span>
              </div>
              <div className="p-4 rounded-2xl bg-black/40 border border-white/5">
                <span className="text-slate-400 text-[10px] block font-sans">Height</span>
                <span className="text-white font-bold">{car.dimensions?.height || '1,450 mm'}</span>
              </div>
              <div className="p-4 rounded-2xl bg-black/40 border border-white/5">
                <span className="text-slate-400 text-[10px] block font-sans">Wheelbase</span>
                <span className="text-white font-bold">{car.dimensions?.wheelbase || '2,850 mm'}</span>
              </div>
              <div className="p-4 rounded-2xl bg-black/40 border border-white/5">
                <span className="text-slate-400 text-[10px] block font-sans">Seating</span>
                <span className="text-cyan-300 font-bold">{car.seating}</span>
              </div>
              <div className="p-4 rounded-2xl bg-black/40 border border-white/5">
                <span className="text-slate-400 text-[10px] block font-sans">Boot Capacity</span>
                <span className="text-cyan-300 font-bold">{car.bootSpace}</span>
              </div>
            </div>
          </div>
        )}

        {/* Tab 4: EMI Calculator for this specific car */}
        {activeTab === 'emi' && (
          <EMICalculator initialPrice={car.price} carName={`${car.brand} ${car.model}`} />
        )}
      </div>
    </div>
  );
}
