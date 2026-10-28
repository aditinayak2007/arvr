import React from 'react';
import { Palette, RotateCcw, Check, Sparkles } from 'lucide-react';

export const STANDARD_COLORS = [
  { name: 'Obsidian Black', hex: '#0a0b0e', finish: 'metallic' },
  { name: 'Pearl White', hex: '#f8fafc', finish: 'metallic' },
  { name: 'Metallic Silver', hex: '#94a3b8', finish: 'metallic' },
  { name: 'Racing Red', hex: '#dc2626', finish: 'gloss' },
  { name: 'Ocean Blue', hex: '#0284c7', finish: 'metallic' },
  { name: 'Forest Green', hex: '#15803d', finish: 'metallic' },
  { name: 'Cyber Gold', hex: '#eab308', finish: 'metallic' },
  { name: 'Sunset Orange', hex: '#ea580c', finish: 'gloss' },
];

export default function CarCustomizer({
  car,
  selectedColor,
  setSelectedColor,
  selectedFinish,
  setSelectedFinish,
  onReset
}) {
  // Use car's own custom color palette if available, plus standard options
  const colorPalette = car?.colors && car.colors.length > 0 ? car.colors : STANDARD_COLORS;

  return (
    <div className="glass-panel p-5 rounded-2xl border border-white/10 space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400">
            <Palette className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-['Orbitron',sans-serif] text-sm font-bold tracking-wide text-white uppercase">
              Customize Your Car
            </h3>
            <p className="text-[11px] text-slate-400">
              Real-time WebGL Physical Shader Material
            </p>
          </div>
        </div>

        {/* Reset Color Button */}
        <button
          onClick={onReset}
          className="flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-medium text-slate-400 hover:text-white bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 rounded-lg transition-all"
          title="Reset to factory stock color"
        >
          <RotateCcw className="w-3 h-3" />
          <span>Reset Color</span>
        </button>
      </div>

      {/* Color Swatches Grid */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs">
          <span className="text-slate-400">Exterior Paint:</span>
          <span className="font-semibold text-cyan-300">
            {selectedColor.name} <span className="text-[10px] text-slate-500 font-mono">({selectedColor.hex})</span>
          </span>
        </div>

        <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-4 gap-2.5">
          {colorPalette.map((colorItem) => {
            const isSelected = selectedColor.hex.toLowerCase() === colorItem.hex.toLowerCase();
            return (
              <button
                key={colorItem.name + colorItem.hex}
                onClick={() => setSelectedColor(colorItem)}
                className={`group relative flex flex-col items-center justify-center p-2 rounded-xl border transition-all ${
                  isSelected
                    ? 'border-cyan-400 bg-cyan-950/30 shadow-[0_0_12px_rgba(0,210,255,0.25)]'
                    : 'border-white/10 bg-slate-900/50 hover:border-white/30'
                }`}
              >
                <div
                  className="w-8 h-8 rounded-full border border-white/20 shadow-inner flex items-center justify-center transition-transform group-hover:scale-110"
                  style={{
                    backgroundColor: colorItem.hex,
                    boxShadow: isSelected ? '0 0 10px ' + colorItem.hex : 'none'
                  }}
                >
                  {isSelected && (
                    <Check
                      className={`w-4 h-4 ${
                        colorItem.hex.toLowerCase() === '#f8fafc' || colorItem.hex.toLowerCase() === '#f1f5f9'
                          ? 'text-black'
                          : 'text-white'
                      }`}
                    />
                  )}
                </div>
                <span className="mt-1 text-[10px] font-medium text-slate-300 truncate w-full text-center">
                  {colorItem.name.split(' ')[0]}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Paint Finish Selector */}
      <div className="space-y-2 pt-2 border-t border-white/[0.06]">
        <div className="text-xs text-slate-400">Paint Finish Type:</div>
        <div className="grid grid-cols-3 gap-2">
          {['metallic', 'gloss', 'matte'].map((finish) => {
            const active = selectedFinish === finish;
            return (
              <button
                key={finish}
                onClick={() => setSelectedFinish(finish)}
                className={`py-1.5 px-2 rounded-lg text-xs font-medium capitalize transition-all border ${
                  active
                    ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300 font-semibold'
                    : 'bg-slate-900/40 border-white/5 text-slate-400 hover:text-slate-200'
                }`}
              >
                {finish}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
