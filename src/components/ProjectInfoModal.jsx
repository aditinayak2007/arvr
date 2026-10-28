import React from 'react';
import { 
  X, 
  Info, 
  Code, 
  Cpu, 
  CheckCircle2, 
  Layers, 
  User, 
  Sparkles,
  ExternalLink
} from 'lucide-react';

export default function ProjectInfoModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg glass-panel p-6 sm:p-8 rounded-3xl border border-cyan-500/30 shadow-2xl space-y-6">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-white/[0.06] hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
          title="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
            <Info className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] font-mono uppercase tracking-widest text-cyan-400 font-bold">
              Engineering Academic Portfolio
            </span>
            <h3 className="font-['Orbitron',sans-serif] text-xl font-extrabold text-white">
              Project Information
            </h3>
          </div>
        </div>

        {/* Core Specs Grid */}
        <div className="p-5 rounded-2xl bg-black/60 border border-white/10 space-y-3 font-mono text-xs">
          <div className="flex flex-col sm:flex-row sm:justify-between py-1 border-b border-white/[0.06] gap-1">
            <span className="text-slate-400 uppercase tracking-wider font-sans font-semibold">PROJECT:</span>
            <span className="text-white font-bold">AR-Based Virtual Car Showroom</span>
          </div>

          <div className="flex flex-col sm:flex-row sm:justify-between py-1 border-b border-white/[0.06] gap-1">
            <span className="text-slate-400 uppercase tracking-wider font-sans font-semibold">DOMAIN:</span>
            <span className="text-cyan-300 font-semibold">Augmented Reality / Virtual Reality</span>
          </div>

          <div className="flex flex-col sm:flex-row sm:justify-between py-1 border-b border-white/[0.06] gap-1">
            <span className="text-slate-400 uppercase tracking-wider font-sans font-semibold">PURPOSE:</span>
            <span className="text-slate-200">Interactive automobile visualization & WebAR</span>
          </div>

          <div className="flex flex-col sm:flex-row sm:justify-between py-1 border-b border-white/[0.06] gap-1">
            <span className="text-slate-400 uppercase tracking-wider font-sans font-semibold">TECHNOLOGIES:</span>
            <span className="text-white font-semibold">React, Three.js, WebAR, JavaScript, Tailwind CSS</span>
          </div>

          <div className="flex flex-col sm:flex-row sm:justify-between py-1 gap-1">
            <span className="text-slate-400 uppercase tracking-wider font-sans font-semibold">STUDENT / AUTHOR:</span>
            <span className="text-cyan-400 font-bold">Aditi Nayak (Engineering Student)</span>
          </div>
        </div>

        {/* Key Architectural Highlights */}
        <div className="space-y-2">
          <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400">
            System Highlights
          </h4>
          <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-300">
            <div className="flex items-center gap-1.5 p-2 rounded-xl bg-white/[0.03] border border-white/5">
              <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
              <span>Three.js PBR Shaders</span>
            </div>
            <div className="flex items-center gap-1.5 p-2 rounded-xl bg-white/[0.03] border border-white/5">
              <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
              <span>WebXR & Quick Look</span>
            </div>
            <div className="flex items-center gap-1.5 p-2 rounded-xl bg-white/[0.03] border border-white/5">
              <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
              <span>Real-Time Color Shading</span>
            </div>
            <div className="flex items-center gap-1.5 p-2 rounded-xl bg-white/[0.03] border border-white/5">
              <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
              <span>Financial EMI Modeling</span>
            </div>
          </div>
        </div>

        <button
          onClick={onClose}
          className="w-full py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider text-black bg-cyan-400 hover:bg-cyan-300 transition-all shadow-[0_0_15px_rgba(0,210,255,0.3)]"
        >
          Close Project Info
        </button>
      </div>
    </div>
  );
}
