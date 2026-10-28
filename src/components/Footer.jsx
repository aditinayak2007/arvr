import React from 'react';
import { Car, Shield, Sparkles, Heart, ArrowUp } from 'lucide-react';

export default function Footer({ onNavigate }) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="mt-24 border-t border-white/[0.08] bg-[#05070a] relative overflow-hidden text-slate-400 text-xs">
      {/* Subtle top neon border accent */}
      <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand Info Column */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                <Car className="w-5 h-5" />
              </div>
              <div>
                <span className="font-['Orbitron',sans-serif] text-xl font-bold tracking-wider text-white">
                  AR <span className="text-cyan-400">DRIVE</span>
                </span>
                <span className="block text-[10px] uppercase tracking-widest text-slate-400">
                  AR-Based Virtual Car Showroom
                </span>
              </div>
            </div>

            <p className="text-sm text-slate-400 max-w-sm leading-relaxed">
              Experience cars differently. AR DRIVE combines interactive WebGL 3D, markerless Augmented Reality, dynamic vehicle customization, and smart multi-attribute comparison.
            </p>

            <div className="flex items-center gap-2 text-[11px] text-cyan-400/90 font-mono">
              <Shield className="w-3.5 h-3.5 text-cyan-400" />
              <span>Next-Generation Virtual Automotive Platform • 2026</span>
            </div>
          </div>

          {/* Quick Links Column */}
          <div className="space-y-3">
            <h4 className="font-['Orbitron',sans-serif] text-xs font-bold uppercase tracking-wider text-white">
              Quick Links
            </h4>
            <ul className="space-y-2">
              {[
                { id: 'home', label: 'Home' },
                { id: 'showroom', label: 'Showroom' },
                { id: 'virtual-showroom', label: '3D Virtual Showroom' },
                { id: 'compare', label: 'Compare Vehicles' },
                { id: 'ar-experience', label: 'AR Experience' },
                { id: 'about', label: 'About AR DRIVE' },
              ].map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => {
                      onNavigate(link.id);
                      scrollToTop();
                    }}
                    className="hover:text-cyan-400 transition-colors text-left"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Technology Column */}
          <div className="space-y-3">
            <h4 className="font-['Orbitron',sans-serif] text-xs font-bold uppercase tracking-wider text-white">
              Experience
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Augmented Reality & Interactive 3D Web Systems for Next-Generation Automobile Discovery.
            </p>

            <div className="pt-2">
              <button
                onClick={scrollToTop}
                className="flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-900 border border-white/10 hover:border-cyan-400 text-slate-300 hover:text-white transition-all text-xs"
              >
                <ArrowUp className="w-3.5 h-3.5 text-cyan-400" />
                <span>Back to Top</span>
              </button>
            </div>
          </div>
        </div>

        {/* Bottom copyright notice */}
        <div className="mt-12 pt-6 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div>
            © 2026 AR DRIVE. All rights reserved.
          </div>
          <div className="text-slate-400">
            Engineered by <span className="text-cyan-300 font-medium">Aditi Nayak</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
