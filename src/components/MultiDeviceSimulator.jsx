import React, { useState } from 'react';
import { 
  X, 
  Smartphone, 
  Tablet, 
  RotateCw, 
  Maximize2, 
  ExternalLink, 
  Columns, 
  Monitor, 
  Sparkles,
  RefreshCw
} from 'lucide-react';

export default function MultiDeviceSimulator({ isOpen, onClose }) {
  const [deviceLayout, setDeviceLayout] = useState('dual'); // 'iphone' | 'samsung' | 'dual' | 'tablet'
  const [key, setKey] = useState(0); // to reload iframes

  if (!isOpen) return null;

  const currentUrl = typeof window !== 'undefined' ? window.location.href : 'http://localhost:5173/';

  const devices = [
    {
      id: 'iphone',
      name: 'iPhone 16 Pro',
      dimensions: '393 × 852',
      width: 393,
      height: 750,
      scale: 0.85,
    },
    {
      id: 'samsung',
      name: 'Galaxy S24 Ultra',
      dimensions: '412 × 915',
      width: 412,
      height: 750,
      scale: 0.85,
    },
    {
      id: 'tablet',
      name: 'iPad Pro / Tablet',
      dimensions: '768 × 1024',
      width: 680,
      height: 750,
      scale: 0.75,
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-slate-950/95 backdrop-blur-2xl text-slate-100 overflow-hidden animate-in fade-in duration-200">
      {/* Top Simulator Control Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 border-b border-white/10 bg-black/60 z-10">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
            <Smartphone className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-['Orbitron',sans-serif] text-sm sm:text-base font-bold text-white">
                Multi-Mobile Device Simulator
              </h3>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                Synchronized View
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Test and demonstrate AR DRIVE responsiveness across multiple mobile screen sizes simultaneously
            </p>
          </div>
        </div>

        {/* Device Switcher Tabs */}
        <div className="flex items-center gap-2 bg-slate-900/80 p-1 rounded-xl border border-white/10">
          <button
            onClick={() => setDeviceLayout('dual')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              deviceLayout === 'dual'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/40 shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Columns className="w-3.5 h-3.5" />
            <span>Dual Mobile (iPhone + Android)</span>
          </button>

          <button
            onClick={() => setDeviceLayout('iphone')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              deviceLayout === 'iphone'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/40 shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span>iPhone 16 Pro</span>
          </button>

          <button
            onClick={() => setDeviceLayout('samsung')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              deviceLayout === 'samsung'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/40 shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span>Galaxy S24</span>
          </button>

          <button
            onClick={() => setDeviceLayout('tablet')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              deviceLayout === 'tablet'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/40 shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Tablet className="w-3.5 h-3.5" />
            <span>Tablet View</span>
          </button>
        </div>

        {/* Reload & Close */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setKey(prev => prev + 1)}
            className="p-2 rounded-xl bg-slate-900 border border-white/10 hover:border-cyan-400 text-slate-300 hover:text-white transition-all text-xs"
            title="Reload frames"
          >
            <RefreshCw className="w-4 h-4 text-cyan-400" />
          </button>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-red-600/80 hover:bg-red-600 text-white transition-all"
            title="Close simulator"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Simulator Viewport Area */}
      <div className="flex-1 overflow-auto p-6 flex items-center justify-center gap-8 bg-gradient-to-b from-[#06080d] to-[#0d111a]">
        {/* Dual Phone Mode (iPhone + Android side by side) */}
        {deviceLayout === 'dual' && (
          <div className="flex flex-wrap items-center justify-center gap-10 max-h-full">
            {/* iPhone Shell */}
            <div className="flex flex-col items-center gap-2">
              <span className="text-xs font-mono text-cyan-400 font-semibold">
                📱 Apple iPhone 16 Pro (iOS Safari)
              </span>
              <div className="relative rounded-[48px] p-3.5 bg-gradient-to-b from-slate-700 via-slate-800 to-slate-900 shadow-2xl border-4 border-slate-700/80 shadow-cyan-500/10">
                {/* Dynamic Island */}
                <div className="absolute top-5 left-1/2 -translate-x-1/2 w-24 h-5 bg-black rounded-full z-20 flex items-center justify-end pr-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-slate-900 border border-slate-800" />
                </div>
                {/* Screen */}
                <div className="rounded-[36px] overflow-hidden w-[360px] h-[660px] bg-black border border-white/5 relative">
                  <iframe
                    key={`iphone-${key}`}
                    src={currentUrl}
                    title="iPhone Preview"
                    className="w-full h-full border-0 select-none"
                  />
                </div>
              </div>
            </div>

            {/* Android / Samsung Shell */}
            <div className="flex flex-col items-center gap-2">
              <span className="text-xs font-mono text-cyan-400 font-semibold">
                📱 Samsung Galaxy S24 Ultra (Android Chrome)
              </span>
              <div className="relative rounded-[32px] p-3.5 bg-gradient-to-b from-slate-700 via-slate-800 to-slate-900 shadow-2xl border-4 border-slate-700/80 shadow-cyan-500/10">
                {/* Punch hole camera */}
                <div className="absolute top-5 left-1/2 -translate-x-1/2 w-3.5 h-3.5 bg-black rounded-full z-20 border border-slate-800" />
                {/* Screen */}
                <div className="rounded-[22px] overflow-hidden w-[360px] h-[660px] bg-black border border-white/5 relative">
                  <iframe
                    key={`android-${key}`}
                    src={currentUrl}
                    title="Galaxy S24 Preview"
                    className="w-full h-full border-0 select-none"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Single iPhone Mode */}
        {deviceLayout === 'iphone' && (
          <div className="flex flex-col items-center gap-2">
            <span className="text-xs font-mono text-cyan-400 font-semibold">
              Apple iPhone 16 Pro Viewport (393 × 852)
            </span>
            <div className="relative rounded-[50px] p-4 bg-gradient-to-b from-slate-700 to-slate-900 shadow-2xl border-4 border-slate-600">
              <div className="absolute top-6 left-1/2 -translate-x-1/2 w-28 h-6 bg-black rounded-full z-20" />
              <div className="rounded-[38px] overflow-hidden w-[380px] h-[720px] bg-black border border-white/5">
                <iframe
                  key={`single-iphone-${key}`}
                  src={currentUrl}
                  title="iPhone Preview"
                  className="w-full h-full border-0"
                />
              </div>
            </div>
          </div>
        )}

        {/* Single Galaxy S24 Mode */}
        {deviceLayout === 'samsung' && (
          <div className="flex flex-col items-center gap-2">
            <span className="text-xs font-mono text-cyan-400 font-semibold">
              Samsung Galaxy S24 Viewport (412 × 915)
            </span>
            <div className="relative rounded-[36px] p-4 bg-gradient-to-b from-slate-700 to-slate-900 shadow-2xl border-4 border-slate-600">
              <div className="absolute top-6 left-1/2 -translate-x-1/2 w-3.5 h-3.5 bg-black rounded-full z-20" />
              <div className="rounded-[26px] overflow-hidden w-[390px] h-[720px] bg-black border border-white/5">
                <iframe
                  key={`single-samsung-${key}`}
                  src={currentUrl}
                  title="Galaxy S24 Preview"
                  className="w-full h-full border-0"
                />
              </div>
            </div>
          </div>
        )}

        {/* Tablet Mode */}
        {deviceLayout === 'tablet' && (
          <div className="flex flex-col items-center gap-2">
            <span className="text-xs font-mono text-cyan-400 font-semibold">
              Tablet / iPad Viewport (768 × 1024)
            </span>
            <div className="relative rounded-[32px] p-4 bg-gradient-to-b from-slate-700 to-slate-900 shadow-2xl border-4 border-slate-600">
              <div className="rounded-[22px] overflow-hidden w-[640px] h-[700px] bg-black border border-white/5">
                <iframe
                  key={`tablet-${key}`}
                  src={currentUrl}
                  title="Tablet Preview"
                  className="w-full h-full border-0"
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Information Tip */}
      <div className="p-3 text-center text-xs text-slate-400 bg-black/60 border-t border-white/5 flex items-center justify-center gap-2">
        <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
        <span>
          Both preview screens are fully interactive and execute the real live application in real-time.
        </span>
      </div>
    </div>
  );
}
