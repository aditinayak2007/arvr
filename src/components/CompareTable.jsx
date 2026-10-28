import React from 'react';
import { 
  Plus, 
  X, 
  Check, 
  Scale, 
  Sparkles, 
  Eye, 
  Smartphone, 
  RotateCcw,
  Zap,
  Shield,
  Gauge
} from 'lucide-react';
import { CARS_DATA } from '../data/cars';

export default function CompareTable({
  comparedCarIds = [],
  onRemoveCar,
  onAddCar,
  onChangeCar,
  onViewDetails,
  onViewAR
}) {
  const comparedCars = comparedCarIds
    .map((id) => CARS_DATA.find((c) => c.id === id))
    .filter(Boolean);

  const availableCarsToSelect = CARS_DATA.filter(
    (c) => !comparedCarIds.includes(c.id)
  );

  const specRows = [
    { label: 'Ex-Showroom Price', key: 'priceDisplay' },
    { label: 'Body Architecture', key: 'bodyType' },
    { label: 'Powertrain / Fuel', key: 'fuelType' },
    { label: 'Engine / Electric Motor', key: 'engine' },
    { label: 'Horsepower / Power Output', key: 'power' },
    { label: 'Torque Output', key: 'torque' },
    { label: '0-100 km/h Acceleration', key: 'acceleration' },
    { label: 'Top Track Speed', key: 'topSpeed' },
    { label: 'Fuel Efficiency / Range', key: 'mileage' },
    { label: 'Transmission', key: 'transmission' },
    { label: 'Seating Capacity', key: 'seating' },
    { label: 'Boot Capacity', key: 'bootSpace' },
    { label: 'NCAP Safety Rating', key: 'safetyRating' },
  ];

  return (
    <div className="space-y-6">
      {/* Table Header Controls */}
      <div className="flex flex-wrap items-center justify-between gap-4 glass-panel p-4 rounded-2xl border border-white/10">
        <div className="flex items-center gap-2">
          <Scale className="w-5 h-5 text-cyan-400" />
          <span className="text-sm font-semibold text-white">
            Comparing {comparedCars.length} of 3 Vehicles
          </span>
        </div>

        {comparedCars.length < 3 && availableCarsToSelect.length > 0 && (
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400">Add to comparison:</span>
            <select
              onChange={(e) => {
                if (e.target.value) {
                  onAddCar(e.target.value);
                  e.target.value = '';
                }
              }}
              defaultValue=""
              className="px-3 py-1.5 rounded-xl bg-slate-900 border border-cyan-500/30 text-white text-xs focus:outline-none focus:border-cyan-400"
            >
              <option value="" disabled>+ Choose Vehicle...</option>
              {availableCarsToSelect.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.brand} {c.model}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      {/* Responsive Comparison Table Container */}
      <div className="overflow-x-auto rounded-2xl border border-white/10 glass-panel shadow-2xl">
        <table className="w-full text-left border-collapse min-w-[700px]">
          {/* Table Header: Vehicle Cards */}
          <thead>
            <tr className="border-b border-white/10 bg-slate-950/60">
              <th className="p-4 w-1/4 text-xs font-['Orbitron',sans-serif] uppercase tracking-wider text-slate-400">
                Technical Metric
              </th>

              {[0, 1, 2].map((slotIndex) => {
                const car = comparedCars[slotIndex];
                return (
                  <th key={slotIndex} className="p-4 w-1/4 align-top">
                    {car ? (
                      <div className="space-y-3">
                        <div className="relative rounded-xl overflow-hidden aspect-[16/10] bg-slate-900 border border-white/10">
                          <img
                            src={car.image}
                            alt={car.model}
                            className="w-full h-full object-cover"
                          />
                          <button
                            onClick={() => onRemoveCar(car.id)}
                            className="absolute top-1.5 right-1.5 p-1 rounded-full bg-black/70 hover:bg-rose-600 text-white text-xs transition-colors"
                            title="Remove from comparison"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        <div>
                          <div className="text-[10px] text-cyan-400 font-bold uppercase tracking-widest">
                            {car.brand}
                          </div>
                          <div className="font-['Orbitron',sans-serif] text-sm font-bold text-white line-clamp-1">
                            {car.model}
                          </div>
                          <div className="text-xs font-mono text-slate-300 font-semibold mt-0.5">
                            {car.priceDisplay}
                          </div>
                        </div>

                        {/* Change vehicle selector */}
                        <div className="flex flex-col gap-1.5">
                          <select
                            value={car.id}
                            onChange={(e) => onChangeCar(slotIndex, e.target.value)}
                            className="w-full px-2 py-1 rounded-lg bg-slate-900 border border-white/10 text-white text-[11px] focus:outline-none focus:border-cyan-400"
                          >
                            {CARS_DATA.map((c) => (
                              <option key={c.id} value={c.id}>
                                {c.brand} {c.model}
                              </option>
                            ))}
                          </select>

                          <div className="grid grid-cols-2 gap-1 pt-1">
                            <button
                              onClick={() => onViewDetails(car)}
                              className="px-2 py-1 text-[10px] font-semibold text-white bg-slate-800 hover:bg-slate-700 rounded-lg text-center"
                            >
                              3D Details
                            </button>
                            <button
                              onClick={() => onViewAR(car)}
                              className="px-2 py-1 text-[10px] font-bold text-black bg-cyan-400 hover:bg-cyan-300 rounded-lg text-center"
                            >
                              AR View
                            </button>
                          </div>
                        </div>
                      </div>
                    ) : (
                      /* Empty slot */
                      <div className="h-full min-h-[220px] rounded-2xl border-2 border-dashed border-white/10 flex flex-col items-center justify-center p-4 text-center space-y-3 bg-white/[0.01]">
                        <div className="w-10 h-10 rounded-full bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
                          <Plus className="w-5 h-5" />
                        </div>
                        <div className="text-xs text-slate-400">
                          Slot {slotIndex + 1} Empty
                        </div>
                        {availableCarsToSelect.length > 0 && (
                          <select
                            onChange={(e) => {
                              if (e.target.value) {
                                onAddCar(e.target.value);
                              }
                            }}
                            defaultValue=""
                            className="px-2.5 py-1.5 rounded-lg bg-slate-900 border border-cyan-500/30 text-white text-xs w-full focus:outline-none"
                          >
                            <option value="" disabled>Select Vehicle...</option>
                            {availableCarsToSelect.map((c) => (
                              <option key={c.id} value={c.id}>
                                {c.brand} {c.model}
                              </option>
                            ))}
                          </select>
                        )}
                      </div>
                    )}
                  </th>
                );
              })}
            </tr>
          </thead>

          {/* Table Body Specifications */}
          <tbody className="divide-y divide-white/[0.06] text-xs">
            {specRows.map((row, rIdx) => (
              <tr key={row.key} className={rIdx % 2 === 0 ? 'bg-white/[0.01]' : 'bg-transparent'}>
                <td className="p-3.5 font-semibold text-slate-300 bg-black/20">
                  {row.label}
                </td>
                {[0, 1, 2].map((slotIdx) => {
                  const car = comparedCars[slotIdx];
                  return (
                    <td key={slotIdx} className="p-3.5 text-slate-200 font-mono">
                      {car ? (
                        <span className={row.key === 'priceDisplay' ? 'font-bold text-cyan-300' : ''}>
                          {car[row.key] || '—'}
                        </span>
                      ) : (
                        <span className="text-slate-600">—</span>
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="text-xs text-slate-500 text-center font-mono">
        Official manufacturer specifications and verified equipment data.
      </div>
    </div>
  );
}
