import React, { useState, useMemo } from 'react';
import { 
  Search, 
  SlidersHorizontal, 
  RotateCcw, 
  Sparkles, 
  Car, 
  AlertCircle,
  Calculator
} from 'lucide-react';
import { CARS_DATA } from '../data/cars';
import CarCard from '../components/CarCard';
import SearchBar from '../components/SearchBar';
import FilterPanel from '../components/FilterPanel';
import EMICalculator from '../components/EMICalculator';

export default function Showroom({
  onSelectCar,
  onOpenAR,
  favorites = [],
  onToggleFavorite
}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('All');
  const [selectedBodyType, setSelectedBodyType] = useState('All');
  const [selectedFuelType, setSelectedFuelType] = useState('All');
  const [selectedTransmission, setSelectedTransmission] = useState('All');
  const [priceRange, setPriceRange] = useState(400000000); // 40 Crore max
  const [showEMI, setShowEMI] = useState(false);

  // Reset all filters
  const handleResetFilters = () => {
    setSearchTerm('');
    setSelectedBrand('All');
    setSelectedBodyType('All');
    setSelectedFuelType('All');
    setSelectedTransmission('All');
    setPriceRange(400000000);
  };

  // Filter logic
  const filteredCars = useMemo(() => {
    return CARS_DATA.filter((car) => {
      // 1. Search keyword match (brand, model, bodyType, fuelType, description)
      if (searchTerm.trim()) {
        const query = searchTerm.toLowerCase().trim();
        const matchesBrand = car.brand.toLowerCase().includes(query);
        const matchesModel = car.model.toLowerCase().includes(query);
        const matchesBody = car.bodyType.toLowerCase().includes(query);
        const matchesFuel = car.fuelType.toLowerCase().includes(query);
        if (!matchesBrand && !matchesModel && !matchesBody && !matchesFuel) {
          return false;
        }
      }

      // 2. Brand filter
      if (selectedBrand !== 'All' && car.brand !== selectedBrand) {
        return false;
      }

      // 3. Body Type filter
      if (selectedBodyType !== 'All' && car.bodyType !== selectedBodyType) {
        return false;
      }

      // 4. Fuel Type filter
      if (selectedFuelType !== 'All' && car.fuelType !== selectedFuelType) {
        return false;
      }

      // 5. Transmission filter
      if (selectedTransmission !== 'All' && car.transmission !== selectedTransmission) {
        return false;
      }

      // 6. Price range
      if (car.price > priceRange) {
        return false;
      }

      return true;
    });
  }, [searchTerm, selectedBrand, selectedBodyType, selectedFuelType, selectedTransmission, priceRange]);

  return (
    <div className="space-y-10 pt-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-4 border-b border-white/[0.08]">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-cyan-500/10 border border-cyan-400/30 text-cyan-300">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>Virtual Inventory Catalog</span>
          </div>
          <h1 className="font-['Orbitron',sans-serif] text-3xl sm:text-4xl font-extrabold text-white">
            Explore Our Virtual Showroom
          </h1>
          <p className="text-sm text-slate-300 max-w-xl">
            Filter by manufacturer, body profile, electric powertrains, and price cap. Select any vehicle to inspect in 360° 3D or place in AR.
          </p>
        </div>

        {/* Quick EMI toggle button */}
        <button
          onClick={() => setShowEMI(!showEMI)}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold border transition-all ${
            showEMI
              ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300 shadow-[0_0_15px_rgba(0,210,255,0.2)]'
              : 'glass-panel border-white/10 text-slate-300 hover:text-white'
          }`}
        >
          <Calculator className="w-4 h-4 text-cyan-400" />
          <span>{showEMI ? 'Hide EMI Calculator' : 'Financing & EMI Calculator'}</span>
        </button>
      </div>

      {/* EMI Calculator collapsible section */}
      {showEMI && (
        <div className="animate-in fade-in slide-in-from-top-4 duration-300">
          <EMICalculator initialPrice={6000000} carName="Showroom Fleet" />
        </div>
      )}

      {/* Main Grid: Filters on Left (4 cols), Results on Right (8 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Filter Panel */}
        <div className="lg:col-span-4 space-y-4">
          <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          
          <FilterPanel
            selectedBrand={selectedBrand}
            setSelectedBrand={setSelectedBrand}
            selectedBodyType={selectedBodyType}
            setSelectedBodyType={setSelectedBodyType}
            selectedFuelType={selectedFuelType}
            setSelectedFuelType={setSelectedFuelType}
            selectedTransmission={selectedTransmission}
            setSelectedTransmission={setSelectedTransmission}
            priceRange={priceRange}
            setPriceRange={setPriceRange}
            onResetFilters={handleResetFilters}
            totalResults={filteredCars.length}
          />
        </div>

        {/* Right Car Cards Grid */}
        <div className="lg:col-span-8 space-y-6">
          {/* Status Bar */}
          <div className="flex items-center justify-between text-xs text-slate-400 px-1">
            <span>
              Showing <strong className="text-white">{filteredCars.length}</strong> vehicles matching your criteria
            </span>
            {(selectedBrand !== 'All' || selectedBodyType !== 'All' || searchTerm || priceRange < 20000000) && (
              <button
                onClick={handleResetFilters}
                className="text-cyan-400 hover:underline flex items-center gap-1"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset search</span>
              </button>
            )}
          </div>

          {filteredCars.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {filteredCars.map((car) => (
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
          ) : (
            /* Empty State */
            <div className="glass-panel p-12 rounded-3xl border border-white/10 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-slate-900 border border-white/10 flex items-center justify-center mx-auto text-slate-400">
                <AlertCircle className="w-8 h-8 text-amber-400" />
              </div>
              <h3 className="font-['Orbitron',sans-serif] text-xl font-bold text-white">
                No Vehicles Found
              </h3>
              <p className="text-xs text-slate-400 max-w-sm mx-auto">
                No vehicles match your active search and filter constraints. Try expanding your price cap or clearing specific filters.
              </p>
              <button
                onClick={handleResetFilters}
                className="px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider text-black bg-cyan-400 hover:bg-cyan-300 transition-all shadow-lg"
              >
                Clear All Filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
