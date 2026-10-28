import React, { useEffect, useState } from 'react';
import { Eye, Shield, Sparkles } from 'lucide-react';

export default function LoadingScreen({ onComplete }) {
  const [progress, setProgress] = useState(12);
  const [statusText, setStatusText] = useState('Initializing WebGL Engine...');
  const [fading, setFading] = useState(false);

  useEffect(() => {
    const steps = [
      { p: 35, text: 'Calibrating Spatial Coordinates...' },
      { p: 68, text: 'Loading WebAR Surface Detection Shaders...' },
      { p: 90, text: 'Rendering 3D Virtual Showroom...' },
      { p: 100, text: 'Welcome to AR DRIVE' },
    ];

    let current = 0;
    const interval = setInterval(() => {
      if (current < steps.length) {
        setProgress(steps[current].p);
        setStatusText(steps[current].text);
        current++;
      } else {
        clearInterval(interval);
        setFading(true);
        setTimeout(() => {
          onComplete();
        }, 500);
      }
    }, 380);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#07090e] transition-opacity duration-500 ${
        fading ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[480px] h-[480px] rounded-full bg-cyan-500/10 blur-[120px] pointer-events-none" />

      {/* Futuristic Emblem */}
      <div className="relative mb-8 flex items-center justify-center">
        {/* Animated Scanner Ring */}
        <div className="w-28 h-28 rounded-full border-2 border-dashed border-cyan-500/30 animate-spin" style={{ animationDuration: '8s' }} />
        <div className="absolute w-20 h-20 rounded-full border border-cyan-400/60 animate-pulse" />
        
        {/* Center Logo Icon */}
        <div className="absolute flex flex-col items-center justify-center text-cyan-400">
          <Eye className="w-8 h-8 text-cyan-400" />
        </div>
      </div>

      {/* Brand Title */}
      <div className="text-center space-y-2 z-10 px-4">
        <h1 className="font-['Orbitron',sans-serif] text-3xl sm:text-4xl font-extrabold tracking-widest text-white">
          AR <span className="text-cyan-400">DRIVE</span>
        </h1>
        <p className="text-xs uppercase tracking-[0.25em] text-slate-400 font-medium">
          AR-Based Virtual Car Showroom
        </p>
      </div>

      {/* Progress Bar Container */}
      <div className="mt-10 w-72 max-w-[85vw] z-10">
        <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-800/80 border border-slate-700/50">
          <div
            className="h-full bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-400 transition-all duration-300 ease-out shadow-[0_0_12px_#38bdf8]"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="mt-3 flex items-center justify-between text-[11px] text-slate-400">
          <span className="font-mono text-cyan-400">{statusText}</span>
          <span className="font-mono">{progress}%</span>
        </div>
      </div>

      {/* Platform Badge */}
      <div className="absolute bottom-8 flex items-center gap-2 text-xs text-slate-500">
        <Shield className="w-3.5 h-3.5 text-cyan-500/70" />
        <span>Next-Generation Automotive Experience • 2026</span>
      </div>
    </div>
  );
}
