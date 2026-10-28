import React, { useState } from 'react';
import { 
  Scale, 
  Sparkles, 
  Plus, 
  RotateCcw, 
  ArrowRight,
  Eye,
  Smartphone
} from 'lucide-react';
import { CARS_DATA } from '../data/cars';
import CompareTable from '../components/CompareTable';

export default function Compare({
  comparedCarIds = ['bmw-3-series', 'tesla-model-3', 'mercedes-c-class'],
  setComparedCarIds,
  onViewDetails,
  onViewAR
}) {
  const handleRemoveCar = (idToRemove) => {
    setComparedCarIds((prev) => prev.filter((id) => id !== idToRemove));
  };

  const handleAddCar = (newId) => {
    if (comparedCarIds.length < 3 && !comparedCarIds.includes(newId)) {
      setComparedCarIds((prev) => [...prev, newId]);
    }
  };

  const handleChangeCar = (slotIndex, newId) => {
    setComparedCarIds((prev) => {
      const next = [...prev];
      next[slotIndex] = newId;
      return next;
    });
  };

  const handleResetToDefault = () => {
    setComparedCarIds(['bmw-3-series', 'tesla-model-3', 'mercedes-c-class']);
  };

  return (
    <div className="space-y-10 pt-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-4 border-b border-white/[0.08]">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-cyan-500/10 border border-cyan-400/30 text-cyan-300">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>Multi-Vehicle Comparison Matrix</span>
          </div>
          <h1 className="font-['Orbitron',sans-serif] text-3xl sm:text-4xl font-extrabold text-white">
            Compare Vehicles
          </h1>
          <p className="text-sm text-slate-300 max-w-xl">
            Neutral, side-by-side analysis of performance, battery/fuel range, transmission, dimensions, and pricing for up to 3 cars.
          </p>
        </div>

        <button
          onClick={handleResetToDefault}
          className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-slate-300 bg-slate-900 border border-white/10 hover:border-cyan-400 transition-all self-start sm:self-auto"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset Comparison</span>
        </button>
      </div>

      {/* Comparison Table */}
      <CompareTable
        comparedCarIds={comparedCarIds}
        onRemoveCar={handleRemoveCar}
        onAddCar={handleAddCar}
        onChangeCar={handleChangeCar}
        onViewDetails={onViewDetails}
        onViewAR={onViewAR}
      />
    </div>
  );
}
