import React, { useState } from 'react';
import { 
  Sparkles, 
  ArrowRight, 
  Smartphone, 
  Eye, 
  Layers, 
  Scale, 
  Shield, 
  Compass, 
  Car, 
  ChevronRight, 
  CheckCircle2, 
  Gauge, 
  RotateCw, 
  GraduationCap,
  Calendar
} from 'lucide-react';
import { CARS_DATA } from '../data/cars';
import CarCard from '../components/CarCard';
import CarViewer3D from '../components/CarViewer3D';

export default function Home({
  onNavigate,
  onSelectCar,
  onOpenAR,
  onBookTestDrive,
  favorites = [],
  onToggleFavorite
}) {
  const featuredCars = CARS_DATA.filter((c) => c.isFeatured).slice(0, 4);
  const heroCar = CARS_DATA[0]; // BMW 3 Series Gran Limousine

  const [heroColorHex, setHeroColorHex] = useState('#38bdf8');

  return (
    <div className="space-y-24">
      {/* 1. Hero Section */}
      <section className="relative pt-28 pb-12 sm:pt-36 sm:pb-20 overflow-hidden">
        {/* Ambient futuristic lighting & glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-gradient-to-b from-cyan-500/15 via-blue-600/5 to-transparent blur-[140px] pointer-events-none" />
        <div className="absolute top-12 left-10 w-72 h-72 bg-blue-500/10 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Content (6 cols) */}
            <div className="lg:col-span-6 space-y-6 text-center lg:text-left">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-cyan-950/60 border border-cyan-400/30 text-cyan-300 shadow-[0_0_15px_rgba(0,210,255,0.2)]">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                <span>NEXT-GENERATION CAR EXPERIENCE</span>
              </div>

              {/* Hero Heading */}
              <h1 className="font-['Orbitron',sans-serif] text-4xl sm:text-6xl lg:text-5xl xl:text-6xl font-black text-white tracking-tight leading-[1.1]">
                Experience Your <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-white">
                  Dream Car
                </span>{' '}
                in AR.
              </h1>

              {/* Supporting Text */}
              <p className="text-base sm:text-lg text-slate-300 max-w-xl mx-auto lg:mx-0 leading-relaxed">
                Explore, customize and visualize your next car through an immersive virtual showroom. Place 1:1 true-scale vehicles directly into your driveway with browser WebAR.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
                <button
                  onClick={() => onNavigate('showroom')}
                  className="flex items-center gap-2.5 px-7 py-3.5 rounded-xl font-bold text-sm text-black bg-gradient-to-r from-cyan-400 to-sky-300 hover:from-cyan-300 shadow-[0_0_25px_rgba(0,210,255,0.4)] active:scale-95 transition-all"
                >
                  <Eye className="w-4 h-4 text-black" />
                  <span>Explore Showroom</span>
                </button>

                <button
                  onClick={() => onOpenAR(heroCar)}
                  className="flex items-center gap-2.5 px-6 py-3.5 rounded-xl font-semibold text-sm text-white glass-panel hover:bg-white/10 border border-white/15 active:scale-95 transition-all"
                >
                  <Smartphone className="w-4 h-4 text-cyan-400" />
                  <span>Experience in AR</span>
                </button>

                <button
                  onClick={() => onBookTestDrive(heroCar.id)}
                  className="flex items-center gap-2 px-5 py-3.5 rounded-xl text-xs font-semibold text-slate-200 hover:text-white bg-slate-900/60 hover:bg-slate-800/80 border border-white/10 transition-all active:scale-95"
                >
                  <Sparkles className="w-4 h-4 text-cyan-400" />
                  <span>Book Test Drive</span>
                </button>
              </div>

              {/* Floating Live Telemetry Pills */}
              <div className="pt-6 flex flex-wrap items-center justify-center lg:justify-start gap-3 text-xs font-mono text-slate-400">
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900/60 border border-white/5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  <span>WebGL PBR 60 FPS</span>
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900/60 border border-white/5">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                  <span>SLAM Surface Detection</span>
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900/60 border border-white/5">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                  <span>Aerodynamic 0.22 Cd</span>
                </div>
              </div>
            </div>

            {/* Right Hero 3D Vehicle Showcase (6 cols) */}
            <div className="lg:col-span-6 relative">
              <div className="relative rounded-3xl overflow-hidden glass-panel border border-cyan-500/30 shadow-[0_0_50px_rgba(0,210,255,0.15)] p-2">
                {/* 3D Viewer */}
                <CarViewer3D
                  car={heroCar}
                  selectedColorHex={heroColorHex}
                  selectedFinish="metallic"
                />

                {/* Quick Color Palette Switcher on Hero */}
                <div className="absolute bottom-4 left-4 z-20 flex items-center gap-1.5 p-1.5 rounded-xl bg-black/75 border border-white/10 backdrop-blur-md">
                  <span className="text-[10px] font-mono text-slate-400 px-1">COLOR:</span>
                  {['#38bdf8', '#dc2626', '#f8fafc', '#0a0a0a', '#15803d', '#eab308'].map((cHex) => (
                    <button
                      key={cHex}
                      onClick={() => setHeroColorHex(cHex)}
                      className="w-5 h-5 rounded-full border border-white/20 transition-transform hover:scale-125"
                      style={{ backgroundColor: cHex }}
                      title={`Paint color ${cHex}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Statistics Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 glass-panel p-6 sm:p-8 rounded-3xl border border-white/10">
          <div className="text-center space-y-1">
            <span className="font-['Orbitron',sans-serif] text-3xl sm:text-4xl font-extrabold text-cyan-400">
              50+
            </span>
            <p className="text-xs uppercase tracking-widest text-slate-400 font-semibold">
              Car Models
            </p>
          </div>

          <div className="text-center space-y-1 border-l border-white/10">
            <span className="font-['Orbitron',sans-serif] text-3xl sm:text-4xl font-extrabold text-cyan-400">
              360°
            </span>
            <p className="text-xs uppercase tracking-widest text-slate-400 font-semibold">
              Interactive View
            </p>
          </div>

          <div className="text-center space-y-1 border-l border-white/10">
            <span className="font-['Orbitron',sans-serif] text-3xl sm:text-4xl font-extrabold text-cyan-400">
              AR
            </span>
            <p className="text-xs uppercase tracking-widest text-slate-400 font-semibold">
              Real-World Visualization
            </p>
          </div>

          <div className="text-center space-y-1 border-l border-white/10">
            <span className="font-['Orbitron',sans-serif] text-3xl sm:text-4xl font-extrabold text-cyan-400">
              24/7
            </span>
            <p className="text-xs uppercase tracking-widest text-slate-400 font-semibold">
              Virtual Showroom
            </p>
          </div>
        </div>
      </section>

      {/* 3. "A New Way to Explore Cars" - 4 Premium Feature Cards */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <span className="text-xs uppercase tracking-widest font-mono font-bold text-cyan-400">
            INNOVATION IN AUTOMOTIVE RETAIL
          </span>
          <h2 className="font-['Orbitron',sans-serif] text-2xl sm:text-4xl font-extrabold text-white">
            A New Way to Explore Cars
          </h2>
          <p className="text-sm text-slate-300">
            Moving beyond static photos. Experience vehicle geometry, spatial scale, and materials from the comfort of your home.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Card 1: Interactive 3D */}
          <div className="glass-card p-6 rounded-2xl border border-white/10 space-y-4 hover:-translate-y-1 transition-all duration-300 group">
            <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 group-hover:scale-110 group-hover:shadow-[0_0_15px_rgba(0,210,255,0.4)] transition-all">
              <Eye className="w-6 h-6" />
            </div>
            <h3 className="font-['Orbitron',sans-serif] text-base font-bold text-white group-hover:text-cyan-300 transition-colors">
              Interactive 3D
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Rotate and inspect vehicles from every angle with real-time orbit controls and precision camera presets.
            </p>
          </div>

          {/* Card 2: AR Visualization */}
          <div className="glass-card p-6 rounded-2xl border border-white/10 space-y-4 hover:-translate-y-1 transition-all duration-300 group">
            <div className="w-12 h-12 rounded-2xl bg-sky-500/10 border border-sky-500/30 flex items-center justify-center text-sky-400 group-hover:scale-110 group-hover:shadow-[0_0_15px_rgba(56,189,248,0.4)] transition-all">
              <Smartphone className="w-6 h-6" />
            </div>
            <h3 className="font-['Orbitron',sans-serif] text-base font-bold text-white group-hover:text-cyan-300 transition-colors">
              AR Visualization
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Place the selected car in your real-world environment. Test true dimensions in your parking spot or garage.
            </p>
          </div>

          {/* Card 3: Smart Comparison */}
          <div className="glass-card p-6 rounded-2xl border border-white/10 space-y-4 hover:-translate-y-1 transition-all duration-300 group">
            <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400 group-hover:scale-110 group-hover:shadow-[0_0_15px_rgba(99,102,241,0.4)] transition-all">
              <Scale className="w-6 h-6" />
            </div>
            <h3 className="font-['Orbitron',sans-serif] text-base font-bold text-white group-hover:text-cyan-300 transition-colors">
              Smart Comparison
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Compare specifications, features, performance figures, and pricing side-by-side with clear visual differences.
            </p>
          </div>

          {/* Card 4: Virtual Showroom */}
          <div className="glass-card p-6 rounded-2xl border border-white/10 space-y-4 hover:-translate-y-1 transition-all duration-300 group">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 group-hover:scale-110 group-hover:shadow-[0_0_15px_rgba(16,185,129,0.4)] transition-all">
              <Layers className="w-6 h-6" />
            </div>
            <h3 className="font-['Orbitron',sans-serif] text-base font-bold text-white group-hover:text-cyan-300 transition-colors">
              Virtual Showroom
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Explore cars without physically visiting a dealership. Inspect themed hotspots and change studio spotlights.
            </p>
          </div>
        </div>
      </section>

      {/* 4. Visual Process Flow Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center space-y-2">
          <span className="text-xs uppercase font-mono tracking-wider text-cyan-400">
            THE AR DRIVE PIPELINE
          </span>
          <h2 className="font-['Orbitron',sans-serif] text-2xl sm:text-3xl font-extrabold text-white">
            Explore → Customize → View in 3D → Experience in AR → Compare → Enquire
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-6 gap-3 pt-4">
          {[
            { step: '01', title: 'Choose a Vehicle', desc: 'Browse curated multi-brand catalog' },
            { step: '02', title: 'Explore in 3D', desc: 'Inspect mesh normals & 360° geometry' },
            { step: '03', title: 'Customize', desc: 'Dynamic PBR paint shader swatches' },
            { step: '04', title: 'View in AR', desc: 'True-scale SLAM ground placement' },
            { step: '05', title: 'Compare', desc: 'Side-by-side technical matrix' },
            { step: '06', title: 'Virtual Test Drive', desc: 'Schedule interactive concierge trial' },
          ].map((item, idx) => (
            <div
              key={item.step}
              className="glass-card p-4 rounded-2xl border border-white/5 space-y-2 text-center flex flex-col justify-between"
            >
              <div className="text-xs font-mono font-bold text-cyan-400">
                STEP {item.step}
              </div>
              <h4 className="text-xs font-bold text-white font-['Orbitron',sans-serif]">
                {item.title}
              </h4>
              <p className="text-[10px] text-slate-400">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 5. Featured Vehicles Showcase */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-cyan-400 font-bold">
              FEATURED VEHICLES
            </span>
            <h2 className="font-['Orbitron',sans-serif] text-2xl sm:text-3xl font-bold text-white">
              Trending in Our Showroom
            </h2>
          </div>

          <button
            onClick={() => onNavigate('showroom')}
            className="flex items-center gap-1.5 text-xs font-semibold text-cyan-400 hover:text-cyan-300 group"
          >
            <span>View All 50+ Models</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredCars.map((car) => (
            <CarCard
              key={car.id}
              car={car}
              isFavorite={favorites.includes(car.id)}
              onToggleFavorite={onToggleFavorite}
              onViewDetails={onSelectCar}
              onViewAR={onOpenAR}
            />
          ))}
        </div>
      </section>

      {/* 6. Test Drive CTA Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden glass-panel border border-cyan-500/30 p-8 sm:p-12 text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-8 shadow-2xl">
          <div className="space-y-3 max-w-xl">
            <span className="text-xs uppercase font-mono font-bold tracking-widest text-cyan-400">
              START YOUR JOURNEY TODAY
            </span>
            <h3 className="font-['Orbitron',sans-serif] text-2xl sm:text-3xl font-bold text-white">
              Ready to See Your Future Car in Augmented Reality?
            </h3>
            <p className="text-sm text-slate-300">
              Book a live virtual test drive or launch the WebAR simulator directly in your browser.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => onBookTestDrive()}
              className="px-6 py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider text-black bg-cyan-400 hover:bg-cyan-300 shadow-[0_0_20px_rgba(0,210,255,0.4)] transition-all"
            >
              Book Virtual Test Drive
            </button>
            <button
              onClick={() => onNavigate('virtual-showroom')}
              className="px-5 py-3.5 rounded-xl font-semibold text-xs text-white bg-slate-800 hover:bg-slate-700 border border-white/10"
            >
              Enter 3D Showroom
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
