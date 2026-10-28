import React, { useState, useEffect } from 'react';
import { 
  Compass, 
  Layers, 
  SlidersHorizontal, 
  Smartphone, 
  Heart, 
  Menu, 
  X, 
  Sparkles, 
  Info, 
  Car,
  ChevronRight,
  ShieldAlert
} from 'lucide-react';

export default function Navbar({ 
  activePage, 
  setActivePage, 
  favoritesCount = 0, 
  onOpenTestDrive, 
  onOpenMobileConnect 
}) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'showroom', label: 'Showroom' },
    { id: 'virtual-showroom', label: '3D Showroom' },
    { id: 'ar-experience', label: 'AR Experience' },
    { id: 'compare', label: 'Compare' },
    { id: 'about', label: 'About' },
  ];

  const handleNavClick = (pageId) => {
    setActivePage(pageId);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#07090e]/85 backdrop-blur-xl border-b border-white/[0.08] shadow-2xl shadow-black/50 py-3'
          : 'bg-gradient-to-b from-[#07090e]/90 to-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand Logo */}
          <button
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3 group text-left focus:outline-none"
          >
            <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-600/10 border border-cyan-500/30 group-hover:border-cyan-400 transition-all duration-300 group-hover:shadow-[0_0_15px_rgba(0,210,255,0.4)]">
              <Car className="w-5 h-5 text-cyan-400 group-hover:scale-110 transition-transform duration-300" />
              <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-cyan-500"></span>
              </span>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-['Orbitron',sans-serif] text-xl font-black tracking-wider text-white">
                  AR <span className="text-cyan-400">DRIVE</span>
                </span>
                <span className="px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider bg-cyan-950/60 text-cyan-300 border border-cyan-500/30 rounded">
                  WebAR
                </span>
              </div>
              <span className="block text-[10px] uppercase tracking-widest text-slate-400 font-medium -mt-0.5">
                Virtual Car Showroom
              </span>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 bg-slate-900/40 p-1.5 rounded-full border border-white/[0.06] backdrop-blur-md">
            {navLinks.map((link) => {
              const isActive = activePage === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`px-4 py-2 text-xs font-medium tracking-wide rounded-full transition-all duration-200 relative ${
                    isActive
                      ? 'text-white bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-400/40 shadow-[0_0_15px_rgba(0,210,255,0.15)] font-semibold'
                      : 'text-slate-300 hover:text-white hover:bg-white/[0.05]'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-0.5 bg-cyan-400 rounded-full shadow-[0_0_8px_#38bdf8]" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Action Buttons */}
          <div className="hidden md:flex items-center gap-2.5">
            {/* Mobile Access / QR Code button */}
            <button
              onClick={onOpenMobileConnect}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-cyan-300 bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 hover:border-cyan-400/50 rounded-lg transition-all duration-200 shadow-[0_0_12px_rgba(0,210,255,0.15)]"
              title="Open website on mobile phone via QR code or local Wi-Fi IP"
            >
              <Smartphone className="w-3.5 h-3.5 text-cyan-400" />
              <span>Open in Mobile</span>
            </button>



            {/* Favorites Icon */}
            <button
              onClick={() => handleNavClick('favorites')}
              className={`relative p-2.5 rounded-xl border transition-all duration-200 ${
                activePage === 'favorites'
                  ? 'bg-rose-500/15 border-rose-500/40 text-rose-400'
                  : 'bg-slate-900/60 border-white/[0.08] text-slate-300 hover:text-white hover:border-white/20'
              }`}
              title="Saved Favorites"
            >
              <Heart className={`w-4 h-4 ${favoritesCount > 0 ? 'fill-rose-500 text-rose-500' : ''}`} />
              {favoritesCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 flex items-center justify-center w-5 h-5 text-[10px] font-bold text-white bg-rose-600 rounded-full shadow-md animate-pulse">
                  {favoritesCount}
                </span>
              )}
            </button>

            {/* Test Drive / Enquiry CTA */}
            <button
              onClick={onOpenTestDrive}
              className="flex items-center gap-2 px-4 py-2 text-xs font-semibold text-black bg-gradient-to-r from-cyan-400 to-sky-300 hover:from-cyan-300 hover:to-sky-200 rounded-xl shadow-[0_0_20px_rgba(0,210,255,0.35)] hover:shadow-[0_0_25px_rgba(0,210,255,0.5)] transition-all duration-200 active:scale-95"
            >
              <Sparkles className="w-3.5 h-3.5 text-black" />
              <span>Book Virtual Test Drive</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={() => handleNavClick('favorites')}
              className="relative p-2 text-slate-300 hover:text-white"
            >
              <Heart className={`w-5 h-5 ${favoritesCount > 0 ? 'fill-rose-500 text-rose-500' : ''}`} />
              {favoritesCount > 0 && (
                <span className="absolute top-0 right-0 flex items-center justify-center w-4 h-4 text-[9px] font-bold text-white bg-rose-600 rounded-full">
                  {favoritesCount}
                </span>
              )}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-300 hover:text-white rounded-lg bg-slate-900/80 border border-white/10"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#07090e]/95 backdrop-blur-2xl border-b border-white/10 px-4 pt-4 pb-6 space-y-3 animate-in fade-in slide-in-from-top duration-200">
          <div className="grid grid-cols-2 gap-2">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`flex items-center justify-between p-3 rounded-xl text-left text-sm font-medium transition-all ${
                  activePage === link.id
                    ? 'bg-cyan-500/15 border border-cyan-400/40 text-cyan-300'
                    : 'bg-slate-900/60 border border-white/[0.05] text-slate-300'
                }`}
              >
                <span>{link.label}</span>
                <ChevronRight className="w-4 h-4 text-slate-500" />
              </button>
            ))}
          </div>

          <div className="pt-2 border-t border-white/10 flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                handleNavClick('ar-experience');
              }}
              className="w-full flex items-center justify-center gap-2 p-3 rounded-xl text-sm font-semibold text-cyan-300 bg-cyan-500/15 border border-cyan-500/30"
            >
              <Smartphone className="w-4 h-4 text-cyan-400" />
              <span>📷 Launch AR Camera in Space</span>
            </button>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenTestDrive();
              }}
              className="w-full flex items-center justify-center gap-2 p-3 rounded-xl text-sm font-bold text-black bg-cyan-400 hover:bg-cyan-300"
            >
              <Sparkles className="w-4 h-4 text-black" />
              <span>Book Virtual Test Drive</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
