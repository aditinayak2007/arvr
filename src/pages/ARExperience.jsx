import React, { useState } from 'react';
import { 
  Smartphone, 
  Sparkles, 
  Car, 
  Layers, 
  Compass, 
  CheckCircle2, 
  HelpCircle,
  Eye
} from 'lucide-react';
import { CARS_DATA } from '../data/cars';
import ARViewer from '../components/ARViewer';

export default function ARExperience({
  initialCarId,
  onViewDetails
}) {
  const [selectedCarId, setSelectedCarId] = useState(initialCarId || CARS_DATA[0].id);
  const currentCar = CARS_DATA.find((c) => c.id === selectedCarId) || CARS_DATA[0];

  return (
    <div className="space-y-10 pt-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Top Header & Model Switcher */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-white/[0.08]">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-cyan-500/10 border border-cyan-400/30 text-cyan-300">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>WebAR Spatial Visualization</span>
          </div>

          <h1 className="font-['Orbitron',sans-serif] text-3xl sm:text-4xl font-extrabold text-white">
            Experience Your Car in AR
          </h1>

          <p className="text-sm text-slate-300 max-w-2xl leading-relaxed">
            See how your selected car looks in your own surroundings before making a decision. Walk around the 1:1 true-scale vehicle in 360 degrees.
          </p>
        </div>

        {/* Vehicle Selection Dropdown */}
        <div className="space-y-1.5 w-full md:w-72">
          <label className="text-xs font-semibold text-slate-300 block">
            Select Vehicle to Project:
          </label>
          <select
            value={selectedCarId}
            onChange={(e) => setSelectedCarId(e.target.value)}
            className="w-full px-4 py-3 rounded-2xl bg-slate-900 border border-cyan-500/40 text-white text-xs font-semibold focus:outline-none focus:border-cyan-400 shadow-lg"
          >
            {CARS_DATA.map((car) => (
              <option key={car.id} value={car.id}>
                {car.brand} {car.model}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Main AR Component Engine */}
      <ARViewer car={currentCar} />

      {/* Technical Overview of the AR Pipeline */}
      <div className="glass-panel p-8 rounded-3xl border border-white/10 space-y-4">
        <h3 className="font-['Orbitron',sans-serif] text-sm font-bold uppercase tracking-wider text-slate-300">
          How WebAR Spatial Technology Works
        </h3>
        <p className="text-xs text-slate-400 leading-relaxed">
          AR DRIVE uses real-time computer vision and WebGL to anchor true-to-scale 3D vehicles onto your room floor, driveway, or garage. On mobile devices, your phone camera detects ground planes so you can walk around the car in 360°, inspect custom metallic finishes, and preview life-size dimensions directly in your real environment.
        </p>
      </div>
    </div>
  );
}
