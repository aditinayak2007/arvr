import React, { useState, useEffect } from 'react';
import { 
  Smartphone, 
  QrCode, 
  CheckCircle2, 
  Sparkles, 
  Compass, 
  Eye, 
  Layers, 
  ArrowRight, 
  Info,
  Maximize2,
  Camera,
  Play
} from 'lucide-react';
import ARCameraSimulator from './ARCameraSimulator';
import MobileConnectModal from './MobileConnectModal';
import { resolveAssetUrl } from '../utils/assetHelper';
export default function ARViewer({ car, selectedColorHex }) {
  const [isMobileDevice, setIsMobileDevice] = useState(false);
  const [showCameraAR, setShowCameraAR] = useState(false);
  const [showQrModal, setShowQrModal] = useState(false);

  const activeColorHex = selectedColorHex || car?.colors?.[0]?.hex || '#dc2626';

  useEffect(() => {
    // Detect mobile device
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;
    const isMobile = /android|iphone|ipad|ipod|windows phone/i.test(userAgent.toLowerCase());
    setIsMobileDevice(isMobile);
  }, []);

  const currentUrl = typeof window !== 'undefined' ? window.location.href : 'https://ardrive.app';
  // Generates a QR code SVG / URL for mobile scanning
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=240x240&data=${encodeURIComponent(
    currentUrl
  )}&bgcolor=0a0e17&color=00d2ff&margin=10`;

  return (
    <div className="space-y-8">
      {/* Central AR Showcase Container */}
      <div className="relative rounded-3xl overflow-hidden glass-panel border border-white/10 p-6 sm:p-10 text-center">
        {/* Ambient neon backdrop */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-32 bg-gradient-to-b from-cyan-500/15 via-blue-500/5 to-transparent blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-2xl mx-auto space-y-5">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-cyan-500/10 border border-cyan-400/30 text-cyan-300">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>WebAR Markerless Surface Placement</span>
          </div>

          <h2 className="font-['Orbitron',sans-serif] text-2xl sm:text-4xl font-extrabold text-white tracking-wide">
            Experience the <span className="text-cyan-400">{car.brand} {car.model}</span> in Your Space
          </h2>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            See how your selected car looks in your own driveway, parking space, or garage before making a decision. Walk around the 1:1 true-scale vehicle in 360 degrees.
          </p>

          {/* Action CTAs */}
          <div className="pt-4 flex flex-wrap items-center justify-center gap-3">
            {/* Mobile View Buttons */}
            {isMobileDevice ? (
              <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
                {/* Primary Button: Live In-Browser Camera AR */}
                <button
                  onClick={() => setShowCameraAR(true)}
                  className="w-full sm:w-auto flex items-center justify-center gap-2.5 px-7 py-4 rounded-xl font-bold text-sm text-black bg-gradient-to-r from-cyan-400 to-sky-300 hover:from-cyan-300 shadow-[0_0_25px_rgba(0,210,255,0.4)] active:scale-95 transition-all"
                >
                  <Camera className="w-5 h-5 text-black" />
                  <span>📷 Open Phone Camera (AR)</span>
                </button>

                {/* Secondary Button: Native WebXR / Quick Look */}
                <button
                  onClick={() => {
                    const mv = document.querySelector('model-viewer');
                    if (mv && mv.activateAR) {
                      mv.activateAR();
                    } else {
                      setShowCameraAR(true);
                    }
                  }}
                  className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl font-semibold text-xs text-white bg-slate-800 hover:bg-slate-700 border border-white/10 active:scale-95 transition-all"
                >
                  <Smartphone className="w-4 h-4 text-cyan-400" />
                  <span>Native AR View</span>
                </button>
              </div>
            ) : (
              /* Desktop: Launch Camera AR + Show QR Code button */
              <div className="flex flex-wrap items-center justify-center gap-3">
                <button
                  onClick={() => setShowCameraAR(true)}
                  className="flex items-center gap-2.5 px-7 py-4 rounded-xl font-bold text-sm text-black bg-gradient-to-r from-cyan-400 to-sky-300 hover:from-cyan-300 shadow-[0_0_25px_rgba(0,210,255,0.4)] active:scale-95 transition-all"
                >
                  <Camera className="w-5 h-5 text-black" />
                  <span>📷 Open Camera AR View</span>
                </button>

                <button
                  onClick={() => setShowQrModal(true)}
                  className="flex items-center gap-2 px-5 py-4 rounded-xl font-semibold text-sm text-white bg-slate-800/80 hover:bg-slate-700/80 border border-white/10 active:scale-95 transition-all"
                >
                  <QrCode className="w-5 h-5 text-cyan-400" />
                  <span>Open on Mobile (QR)</span>
                </button>
              </div>
            )}
          </div>

          {/* Notice on device capabilities */}
          <div className="pt-2 text-xs text-slate-400">
            {!isMobileDevice ? (
              <span className="flex items-center justify-center gap-1.5 text-slate-300">
                <Info className="w-3.5 h-3.5 text-cyan-400" />
                Click "Open Camera AR View" to activate your camera, or scan the QR code to open directly on your smartphone.
              </span>
            ) : (
              <span className="text-cyan-300 flex items-center justify-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                Tap "Open Phone Camera (AR)" to project the real vehicle onto your floor in true 1:1 scale.
              </span>
            )}
          </div>
        </div>

        {/* Embedded Model Viewer */}
        <div className="mt-8 rounded-2xl overflow-hidden border border-white/10 bg-slate-950/70 p-4 max-w-xl mx-auto">
          <model-viewer
            src={resolveAssetUrl(car?.model3D || 'models/sports-car.glb')}
            poster={car.thumbnail}
            alt={car.model}
            ar
            ar-modes="webxr quick-look scene-viewer"
            ar-scale="auto"
            camera-controls
            touch-action="pan-y"
            auto-rotate
            shadow-intensity="1.5"
            style={{ width: '100%', height: '320px', backgroundColor: '#07090e' }}
          >
            <div slot="ar-button" className="hidden" />
          </model-viewer>
          <div className="mt-2 text-center text-[11px] text-slate-400 font-mono">
            Interactive 3D / AR Reality Engine
          </div>
        </div>
      </div>

      {/* AR Guided Instructions Steps */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="glass-card p-5 rounded-2xl border border-white/5 space-y-2">
          <div className="w-8 h-8 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 font-bold text-xs font-mono">
            01
          </div>
          <h4 className="text-white font-semibold text-sm">Open on Smartphone</h4>
          <p className="text-xs text-slate-400 leading-relaxed">
            Scan the QR code or visit on your iOS / Android phone and allow camera permission.
          </p>
        </div>

        <div className="glass-card p-5 rounded-2xl border border-white/5 space-y-2">
          <div className="w-8 h-8 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 font-bold text-xs font-mono">
            02
          </div>
          <h4 className="text-white font-semibold text-sm">Detect Surface</h4>
          <p className="text-xs text-slate-400 leading-relaxed">
            Move your phone slowly over the floor, driveway, or tabletop to let SLAM detect a surface.
          </p>
        </div>

        <div className="glass-card p-5 rounded-2xl border border-white/5 space-y-2">
          <div className="w-8 h-8 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 font-bold text-xs font-mono">
            03
          </div>
          <h4 className="text-white font-semibold text-sm">Place & Walk Around</h4>
          <p className="text-xs text-slate-400 leading-relaxed">
            Tap to position the 1:1 scale vehicle. Walk around the car, inspect alloy wheels, and snap photos.
          </p>
        </div>
      </div>

      {/* Supported Experience Checklist */}
      <div className="glass-panel p-6 rounded-2xl border border-white/10 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h4 className="font-['Orbitron',sans-serif] text-xs font-bold uppercase tracking-wider text-slate-300">
            Supported AR Capabilities
          </h4>
          <p className="text-xs text-slate-400">Standard browser WebXR and Quick Look compatibility</p>
        </div>

        <div className="flex flex-wrap items-center gap-4 text-xs font-medium text-slate-200">
          <span className="flex items-center gap-1.5 text-cyan-400">
            <CheckCircle2 className="w-4 h-4" />
            Mobile AR (WebXR & Quick Look)
          </span>
          <span className="flex items-center gap-1.5 text-cyan-400">
            <CheckCircle2 className="w-4 h-4" />
            3D Orbit Preview
          </span>
          <span className="flex items-center gap-1.5 text-cyan-400">
            <CheckCircle2 className="w-4 h-4" />
            Surface SLAM Placement
          </span>
          <span className="flex items-center gap-1.5 text-cyan-400">
            <CheckCircle2 className="w-4 h-4" />
            360° Real-World Walkaround
          </span>
        </div>
      </div>

      {/* Mobile Connect QR Code Modal */}
      <MobileConnectModal
        isOpen={showQrModal}
        onClose={() => setShowQrModal(false)}
      />

      {/* AR Camera Live Active */}
      {showCameraAR && (
        <ARCameraSimulator
          car={car}
          colorHex={activeColorHex}
          onClose={() => setShowCameraAR(false)}
        />
      )}
    </div>
  );
}
