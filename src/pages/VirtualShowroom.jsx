import React, { useState } from 'react';
import { 
  Compass, 
  Sparkles, 
  Eye, 
  Smartphone, 
  Layers, 
  ArrowRight, 
  MapPin, 
  Zap, 
  ShieldCheck, 
  Gauge,
  Volume2,
  VolumeX,
  RotateCw
} from 'lucide-react';
import { CARS_DATA } from '../data/cars';
import CarViewer3D from '../components/CarViewer3D';
import CarCustomizer, { STANDARD_COLORS } from '../components/CarCustomizer';

export default function VirtualShowroom({
  onSelectCar,
  onOpenAR,
  onBookTestDrive
}) {
  // Hotspot configurations
  const hotspots = [
    {
      id: 'hotspot-01',
      number: '01',
      title: 'Featured SUV',
      category: 'suv',
      defaultCarId: 'bmw-x5',
      tagline: 'All-Terrain Dominance & Dual-Axle Air Suspension',
      accentColor: '#38bdf8'
    },
    {
      id: 'hotspot-02',
      number: '02',
      title: 'Electric Vehicles',
      category: 'electric',
      defaultCarId: 'tesla-model-3',
      tagline: 'Zero-Emission Instant Torque & Autonomous Navigation',
      accentColor: '#00d2ff'
    },
    {
      id: 'hotspot-03',
      number: '03',
      title: 'Luxury Collection',
      category: 'luxury',
      defaultCarId: 'mercedes-c-class',
      tagline: 'Refined Craftsmanship, OLED Cockpits & Pure Comfort',
      accentColor: '#cbd5e1'
    },
    {
      id: 'hotspot-04',
      number: '04',
      title: 'Sports Collection',
      category: 'sports',
      defaultCarId: 'porsche-taycan',
      tagline: '800-Volt Track Aerodynamics & Launch Control',
      accentColor: '#ef4444'
    }
  ];

  const [activeHotspotId, setActiveHotspotId] = useState('hotspot-01');
  const activeHotspot = hotspots.find(h => h.id === activeHotspotId) || hotspots[0];
  
  // Cars matching current hotspot category
  const categoryCars = CARS_DATA.filter(c => c.hotspotCategory === activeHotspot.category);
  const [selectedCarId, setSelectedCarId] = useState(activeHotspot.defaultCarId);
  const currentCar = CARS_DATA.find(c => c.id === selectedCarId) || categoryCars[0] || CARS_DATA[0];

  // Customizer state
  const [currentColor, setCurrentColor] = useState(currentCar.colors?.[0] || STANDARD_COLORS[4]);
  const [currentFinish, setCurrentFinish] = useState('metallic');

  // Change hotspot
  const handleSelectHotspot = (hs) => {
    setActiveHotspotId(hs.id);
    setSelectedCarId(hs.defaultCarId);
    const newCar = CARS_DATA.find(c => c.id === hs.defaultCarId);
    if (newCar?.colors?.[0]) {
      setCurrentColor(newCar.colors[0]);
    }
  };

  return (
    <div className="space-y-10 pt-6">
      {/* Showroom Atmosphere Header */}
      <div className="text-center space-y-3 max-w-3xl mx-auto px-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-cyan-500/10 border border-cyan-400/30 text-cyan-300">
          <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
          <span>Interactive 3D / 2.5D Showroom Environment</span>
        </div>

        <h1 className="font-['Orbitron',sans-serif] text-3xl sm:text-5xl font-black text-white tracking-wide">
          Welcome to <span className="text-cyan-400">AR DRIVE</span> Showroom
        </h1>

        <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
          Navigate through our interactive automotive zones. Select a showroom hotspot to bring the spotlight vehicle to the central turntable platform, inspect geometry, and customize paint materials.
        </p>
      </div>

      {/* Showroom Hotspot Selector Bar */}
      <div className="max-w-5xl mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {hotspots.map((hs) => {
            const isActive = hs.id === activeHotspotId;
            return (
              <button
                key={hs.id}
                onClick={() => handleSelectHotspot(hs)}
                className={`relative p-4 rounded-2xl border text-left transition-all duration-300 overflow-hidden group ${
                  isActive
                    ? 'glass-panel border-cyan-400 bg-cyan-950/20 shadow-[0_0_20px_rgba(0,210,255,0.25)]'
                    : 'glass-card border-white/10 hover:border-white/20'
                }`}
              >
                {isActive && (
                  <div className="absolute top-0 right-0 w-16 h-16 bg-cyan-500/20 rounded-bl-full pointer-events-none" />
                )}

                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono text-xs font-bold text-cyan-400">
                    HOTSPOT {hs.number}
                  </span>
                  <div
                    className={`w-2.5 h-2.5 rounded-full ${
                      isActive ? 'bg-cyan-400 animate-ping' : 'bg-slate-700'
                    }`}
                  />
                </div>

                <h3 className="font-['Orbitron',sans-serif] text-sm font-bold text-white group-hover:text-cyan-300 transition-colors">
                  {hs.title}
                </h3>

                <p className="text-[11px] text-slate-400 line-clamp-1 mt-1">
                  {hs.tagline}
                </p>
              </button>
            );
          })}
        </div>
      </div>

      {/* Central Showroom Stage: 3D Viewer & Stage Info */}
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: 3D Turntable Stage (7 cols) */}
        <div className="lg:col-span-8 space-y-4">
          <div className="relative rounded-3xl overflow-hidden border border-white/15 bg-gradient-to-b from-[#0e1320] to-[#07090e] p-2 shadow-2xl">
            {/* Showroom Ceiling Spotlight Lighting visualizer */}
            <div className="absolute top-0 inset-x-0 h-28 bg-gradient-to-b from-cyan-500/20 via-blue-500/5 to-transparent pointer-events-none blur-2xl" />

            {/* Three.js 3D Viewer */}
            <CarViewer3D
              car={currentCar}
              selectedColorHex={currentColor.hex}
              selectedFinish={currentFinish}
            />
          </div>

          {/* Showroom Platform Switcher: Vehicles inside this hotspot category */}
          <div className="glass-panel p-4 rounded-2xl border border-white/10 space-y-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 block font-['Orbitron',sans-serif]">
              Vehicles on Display in {activeHotspot.title}:
            </span>
            <div className="flex flex-wrap gap-2">
              {categoryCars.map((c) => (
                <button
                  key={c.id}
                  onClick={() => {
                    setSelectedCarId(c.id);
                    if (c.colors?.[0]) setCurrentColor(c.colors[0]);
                  }}
                  className={`px-3.5 py-2 rounded-xl text-xs font-medium transition-all ${
                    c.id === currentCar.id
                      ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400 font-bold shadow-[0_0_10px_rgba(0,210,255,0.2)]'
                      : 'bg-slate-900/60 text-slate-300 hover:text-white border border-white/5'
                  }`}
                >
                  {c.brand} {c.model}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Vehicle Telemetry & Customizer (5 cols) */}
        <div className="lg:col-span-4 space-y-6">
          {/* Active Podium Car Telemetry Card */}
          <div className="glass-panel p-6 rounded-3xl border border-white/10 space-y-5">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                  {currentCar.bodyType}
                </span>
                <span className="text-xs uppercase font-mono text-slate-400">
                  {currentCar.year} Model
                </span>
              </div>
              <h2 className="font-['Orbitron',sans-serif] text-2xl font-bold text-white">
                {currentCar.brand} <span className="text-cyan-400">{currentCar.model}</span>
              </h2>
              <div className="mt-2 text-xl font-extrabold text-white">
                {currentCar.priceDisplay}{' '}
                <span className="text-xs text-slate-400 font-normal font-sans">
                  ({currentCar.priceUsd})
                </span>
              </div>
            </div>

            {/* Quick Metrics */}
            <div className="grid grid-cols-2 gap-3 p-3.5 rounded-2xl bg-black/40 border border-white/5 text-xs font-mono">
              <div>
                <span className="text-slate-400 block text-[10px]">POWER</span>
                <span className="text-cyan-300 font-bold">{currentCar.power.split('@')[0]}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px]">ACCELERATION</span>
                <span className="text-emerald-300 font-bold">{currentCar.acceleration}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px]">TOP SPEED</span>
                <span className="text-white font-bold">{currentCar.topSpeed}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px]">EFFICIENCY/RANGE</span>
                <span className="text-amber-300 font-bold">{currentCar.mileage.split(' ')[0]}</span>
              </div>
            </div>

            {/* Customizer */}
            <CarCustomizer
              car={currentCar}
              selectedColor={currentColor}
              setSelectedColor={setCurrentColor}
              selectedFinish={currentFinish}
              setSelectedFinish={setCurrentFinish}
              onReset={() => {
                if (currentCar.colors?.[0]) setCurrentColor(currentCar.colors[0]);
                setCurrentFinish('metallic');
              }}
            />

            {/* Actions */}
            <div className="space-y-2 pt-2">
              <button
                onClick={() => onOpenAR(currentCar)}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-xs uppercase tracking-wider text-black bg-gradient-to-r from-cyan-400 to-sky-300 hover:from-cyan-300 shadow-[0_0_15px_rgba(0,210,255,0.3)] transition-all"
              >
                <Smartphone className="w-4 h-4 text-black" />
                <span>Experience {currentCar.model} in AR</span>
              </button>

              <button
                onClick={() => onSelectCar(currentCar)}
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl font-semibold text-xs text-white bg-slate-800 hover:bg-slate-700 border border-white/10 transition-all"
              >
                <Eye className="w-4 h-4 text-slate-400" />
                <span>Full Technical Specifications</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
