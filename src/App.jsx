import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CustomCursor from './components/CustomCursor';
import LoadingScreen from './components/LoadingScreen';
import TestDriveModal from './components/TestDriveModal';
import MobileConnectModal from './components/MobileConnectModal';
import MultiDeviceSimulator from './components/MultiDeviceSimulator';

import Home from './pages/Home';
import Showroom from './pages/Showroom';
import CarDetails from './pages/CarDetails';
import ARExperience from './pages/ARExperience';
import VirtualShowroom from './pages/VirtualShowroom';
import Compare from './pages/Compare';
import Favorites from './pages/Favorites';
import About from './pages/About';

import { CARS_DATA } from './data/cars';
import { getFavorites, toggleFavorite } from './utils/storage';
import { Info, GraduationCap, Sparkles, Smartphone } from 'lucide-react';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [activePage, setActivePage] = useState('home');
  const [selectedCar, setSelectedCar] = useState(CARS_DATA[0]);
  const [comparedCarIds, setComparedCarIds] = useState(['ferrari-458-spider-rosso', 'ferrari-458-spider-giallo', 'ferrari-458-spider-blu']);
  const [favorites, setFavorites] = useState([]);

  // Modals
  const [isTestDriveOpen, setIsTestDriveOpen] = useState(false);
  const [testDriveCarId, setTestDriveCarId] = useState(null);
  const [isMobileConnectOpen, setIsMobileConnectOpen] = useState(false);
  const [isSimulatorOpen, setIsSimulatorOpen] = useState(false);

  // Load favorites on mount
  useEffect(() => {
    setFavorites(getFavorites());
  }, []);

  // Handle favorite toggle
  const handleToggleFavorite = (carId) => {
    const updated = toggleFavorite(carId);
    setFavorites(updated);
  };

  // Navigate to car details
  const handleViewCarDetails = (car) => {
    setSelectedCar(car);
    setActivePage('car-details');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Open AR directly
  const handleOpenAR = (car) => {
    setSelectedCar(car);
    setActivePage('ar-experience');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Open Test Drive modal
  const handleOpenTestDrive = (carId = null) => {
    setTestDriveCarId(carId || selectedCar.id);
    setIsTestDriveOpen(true);
  };

  // Add car to comparison and switch to compare page
  const handleCompareCar = (carId) => {
    if (!comparedCarIds.includes(carId)) {
      if (comparedCarIds.length >= 3) {
        setComparedCarIds([comparedCarIds[0], comparedCarIds[1], carId]);
      } else {
        setComparedCarIds([...comparedCarIds, carId]);
      }
    }
    setActivePage('compare');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#07090e] text-slate-100 flex flex-col relative selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* 1. Initial High-Tech Loading Screen */}
      {isLoading && (
        <LoadingScreen onComplete={() => setIsLoading(false)} />
      )}

      {/* 2. Desktop Custom Cursor */}
      <CustomCursor />

      {/* 3. Global Navbar */}
      <Navbar
        activePage={activePage}
        setActivePage={(page) => {
          setActivePage(page);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        favoritesCount={favorites.length}
        onOpenTestDrive={() => handleOpenTestDrive()}
        onOpenMobileConnect={() => setIsMobileConnectOpen(true)}
      />

      {/* 4. Page Router Content */}
      <main className="flex-1">
        {activePage === 'home' && (
          <Home
            onNavigate={(page) => {
              setActivePage(page);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onSelectCar={handleViewCarDetails}
            onOpenAR={handleOpenAR}
            onBookTestDrive={handleOpenTestDrive}
            favorites={favorites}
            onToggleFavorite={handleToggleFavorite}
          />
        )}

        {activePage === 'showroom' && (
          <Showroom
            onSelectCar={handleViewCarDetails}
            onOpenAR={handleOpenAR}
            favorites={favorites}
            onToggleFavorite={handleToggleFavorite}
          />
        )}

        {activePage === 'virtual-showroom' && (
          <VirtualShowroom
            onSelectCar={handleViewCarDetails}
            onOpenAR={handleOpenAR}
            onBookTestDrive={handleOpenTestDrive}
          />
        )}

        {activePage === 'car-details' && (
          <CarDetails
            car={selectedCar}
            onBack={() => setActivePage('showroom')}
            onOpenAR={handleOpenAR}
            onCompare={handleCompareCar}
            onBookTestDrive={handleOpenTestDrive}
            isFavorite={favorites.includes(selectedCar.id)}
            onToggleFavorite={handleToggleFavorite}
          />
        )}

        {activePage === 'ar-experience' && (
          <ARExperience
            initialCarId={selectedCar.id}
            onViewDetails={handleViewCarDetails}
          />
        )}

        {activePage === 'compare' && (
          <Compare
            comparedCarIds={comparedCarIds}
            setComparedCarIds={setComparedCarIds}
            onViewDetails={handleViewCarDetails}
            onViewAR={handleOpenAR}
          />
        )}

        {activePage === 'favorites' && (
          <Favorites
            favorites={favorites}
            onToggleFavorite={handleToggleFavorite}
            onViewDetails={handleViewCarDetails}
            onViewAR={handleOpenAR}
            onExploreShowroom={() => setActivePage('showroom')}
          />
        )}

        {activePage === 'about' && (
          <About onBookTestDrive={handleOpenTestDrive} />
        )}
      </main>

      {/* 5. Footer */}
      <Footer
        onNavigate={(page) => {
          setActivePage(page);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      {/* 6. Modals */}
      <TestDriveModal
        isOpen={isTestDriveOpen}
        onClose={() => setIsTestDriveOpen(false)}
        initialCarId={testDriveCarId}
      />

      <MobileConnectModal
        isOpen={isMobileConnectOpen}
        onClose={() => setIsMobileConnectOpen(false)}
        onOpenSimulator={() => setIsSimulatorOpen(true)}
      />

      <MultiDeviceSimulator
        isOpen={isSimulatorOpen}
        onClose={() => setIsSimulatorOpen(false)}
      />
    </div>
  );
}
