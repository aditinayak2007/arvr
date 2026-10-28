import React, { useState, useEffect, useRef } from 'react';
import { 
  Camera, 
  X, 
  RotateCw, 
  Maximize2, 
  CheckCircle2, 
  Sparkles, 
  Globe, 
  ExternalLink,
  ShieldAlert,
  Smartphone,
  Scan
} from 'lucide-react';
import * as THREE from 'three';
import { loadRealisticCarModel } from '../utils/carModelLoader';

const QUICK_COLORS = [
  { name: 'Rosso Corsa', hex: '#dc2626' },
  { name: 'Giallo Modena', hex: '#eab308' },
  { name: 'Blu Tour de France', hex: '#1d4ed8' },
  { name: 'Nero Daytona', hex: '#0a0a0a' },
  { name: 'Bianco Avus', hex: '#f8fafc' },
  { name: 'Grigio Silverstone', hex: '#64748b' },
];

export default function ARCameraSimulator({
  car,
  colorHex = '#dc2626',
  onClose
}) {
  const [cameraActive, setCameraActive] = useState(false);
  const [cameraPermissionError, setCameraPermissionError] = useState(null);
  const [carRotation, setCarRotation] = useState(0);
  const [carScaleMode, setCarScaleMode] = useState('half'); // 'tabletop' | 'half' | 'life-size'
  const [activeColor, setActiveColor] = useState(colorHex);
  const [screenshotFlash, setScreenshotFlash] = useState(false);
  const [isModelLoading, setIsModelLoading] = useState(true);
  const [showInsecureGuide, setShowInsecureGuide] = useState(false);

  const videoRef = useRef(null);
  const threeMountRef = useRef(null);
  const sceneRef = useRef(null);
  const carRootRef = useRef(null);
  const carControllerRef = useRef(null);
  const rendererRef = useRef(null);
  const animIdRef = useRef(null);
  const floorGridRef = useRef(null);

  const isSecure = typeof window !== 'undefined' && (
    window.isSecureContext ||
    window.location.protocol === 'https:' ||
    window.location.hostname === 'localhost' ||
    window.location.hostname === '127.0.0.1'
  );

  // 1. Start live phone camera feed with robust multi-constraint fallbacks
  const startCamera = async () => {
    setCameraPermissionError(null);
    setShowInsecureGuide(false);

    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      const errText = isSecure 
        ? 'Camera API is not supported on this browser. Please use Chrome or Safari.'
        : 'Mobile browsers block camera access on unencrypted HTTP. Tap the secure link below to open your camera.';
      setCameraPermissionError(errText);
      if (!isSecure) setShowInsecureGuide(true);
      return;
    }

    try {
      let stream = null;

      // Attempt 1: Back environment camera (1080p ideal)
      try {
        stream = await navigator.mediaDevices.getUserMedia({
          video: {
            facingMode: { ideal: 'environment' },
            width: { ideal: 1920 },
            height: { ideal: 1080 }
          },
          audio: false
        });
      } catch (e1) {
        // Attempt 2: Environment camera without strict resolution
        try {
          stream = await navigator.mediaDevices.getUserMedia({
            video: { facingMode: 'environment' },
            audio: false
          });
        } catch (e2) {
          // Attempt 3: Any available camera
          stream = await navigator.mediaDevices.getUserMedia({
            video: true,
            audio: false
          });
        }
      }

      if (stream && videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.setAttribute('playsinline', 'true');
        await videoRef.current.play();
        setCameraActive(true);
        setCameraPermissionError(null);
        setShowInsecureGuide(false);
        // Hide virtual floor grid when real camera is active
        if (floorGridRef.current) {
          floorGridRef.current.visible = false;
        }
      }
    } catch (err) {
      console.warn('Camera permission or device error:', err);
      if (err.name === 'NotAllowedError') {
        setCameraPermissionError('Camera permission was denied. Please allow camera access in your browser site settings.');
      } else if (!isSecure) {
        setCameraPermissionError('Insecure HTTP connection. Tap below to switch to the Secure HTTPS link.');
        setShowInsecureGuide(true);
      } else {
        setCameraPermissionError('Unable to start camera feed. Please check your device camera permissions.');
      }
    }
  };

  useEffect(() => {
    startCamera();

    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        const stream = videoRef.current.srcObject;
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  // 2. Setup Three.js overlay with the real Ferrari model
  useEffect(() => {
    const mount = threeMountRef.current;
    if (!mount) return;

    const width = mount.clientWidth || window.innerWidth;
    const height = mount.clientHeight || window.innerHeight;

    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 1.4, 4.2);
    camera.lookAt(0, 0.35, 0);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;
    rendererRef.current = renderer;

    while (mount.firstChild) {
      mount.removeChild(mount.firstChild);
    }
    mount.appendChild(renderer.domElement);

    // Realistic outdoor / indoor lighting rig
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.8);
    scene.add(ambientLight);

    const sunLight = new THREE.DirectionalLight(0xfff8ee, 3.2);
    sunLight.position.set(4, 9, 4);
    sunLight.castShadow = true;
    scene.add(sunLight);

    const fillLight = new THREE.DirectionalLight(0x88ccff, 1.4);
    fillLight.position.set(-4, 5, -4);
    scene.add(fillLight);

    const rimLight = new THREE.DirectionalLight(0x00d2ff, 1.2);
    rimLight.position.set(0, 4, -6);
    scene.add(rimLight);

    // Elegant showroom floor ring (visible while camera is inactive)
    const floorGroup = new THREE.Group();
    const ringGeo = new THREE.RingGeometry(1.6, 1.62, 64);
    const ringMat = new THREE.MeshBasicMaterial({ color: 0x00d2ff, side: THREE.DoubleSide, transparent: true, opacity: 0.7 });
    const ring = new THREE.Mesh(ringGeo, ringMat);
    ring.rotation.x = -Math.PI / 2;
    ring.position.y = 0.01;
    floorGroup.add(ring);

    const outerRingGeo = new THREE.RingGeometry(2.3, 2.32, 64);
    const outerRingMat = new THREE.MeshBasicMaterial({ color: 0x38bdf8, side: THREE.DoubleSide, transparent: true, opacity: 0.35 });
    const outerRing = new THREE.Mesh(outerRingGeo, outerRingMat);
    outerRing.rotation.x = -Math.PI / 2;
    outerRing.position.y = 0.01;
    floorGroup.add(outerRing);

    floorGridRef.current = floorGroup;
    scene.add(floorGroup);

    // Load real sports car model
    setIsModelLoading(true);
    loadRealisticCarModel(car?.model3D || '/models/sports-car.glb', activeColor, 'metallic')
      .then((controller) => {
        carControllerRef.current = controller;
        carRootRef.current = controller.carGroup;
        controller.carGroup.position.set(0, 0, 0);
        controller.carGroup.visible = true;
        scene.add(controller.carGroup);
        setIsModelLoading(false);
      })
      .catch((err) => {
        console.error('Failed to load 3D car:', err);
        setIsModelLoading(false);
      });

    // Render loop
    const animate = () => {
      animIdRef.current = requestAnimationFrame(animate);
      if (carRootRef.current) {
        carRootRef.current.rotation.y = rotationRef.current;
        const targetScale = scaleModeRef.current === 'life-size' ? 0.95 : scaleModeRef.current === 'half' ? 0.58 : 0.32;
        carRootRef.current.scale.set(targetScale, targetScale, targetScale);
      }
      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      if (!mount || !renderer || !camera) return;
      const w = mount.clientWidth || window.innerWidth;
      const h = mount.clientHeight || window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animIdRef.current) cancelAnimationFrame(animIdRef.current);
      if (renderer) renderer.dispose();
    };
  }, [car?.id, car?.model3D]);

  const rotationRef = useRef(0);
  const scaleModeRef = useRef('half');
  const isDraggingRef = useRef(false);
  const lastTouchXRef = useRef(0);

  // Sync rotation & scale with refs
  useEffect(() => {
    rotationRef.current = carRotation;
    if (carRootRef.current) {
      carRootRef.current.rotation.y = carRotation;
    }
  }, [carRotation]);

  useEffect(() => {
    scaleModeRef.current = carScaleMode;
    if (carRootRef.current) {
      const targetScale = carScaleMode === 'life-size' ? 0.95 : carScaleMode === 'half' ? 0.58 : 0.32;
      carRootRef.current.scale.set(targetScale, targetScale, targetScale);
    }
  }, [carScaleMode]);

  const handlePointerDown = (clientX) => {
    isDraggingRef.current = true;
    lastTouchXRef.current = clientX;
  };

  const handlePointerMove = (clientX) => {
    if (!isDraggingRef.current) return;
    const deltaX = clientX - lastTouchXRef.current;
    lastTouchXRef.current = clientX;
    setCarRotation((prev) => prev + deltaX * 0.012);
  };

  const handlePointerUp = () => {
    isDraggingRef.current = false;
  };

  const handleRotate = () => {
    setCarRotation((prev) => prev + Math.PI / 4);
  };

  const handleCycleScale = () => {
    if (carScaleMode === 'life-size') setCarScaleMode('tabletop');
    else if (carScaleMode === 'tabletop') setCarScaleMode('half');
    else setCarScaleMode('life-size');
  };

  const handleTakeScreenshot = () => {
    setScreenshotFlash(true);
    setTimeout(() => setScreenshotFlash(false), 1200);
  };

  const handleLaunchNativeAR = () => {
    const mv = document.querySelector('model-viewer');
    if (mv && mv.activateAR) {
      mv.activateAR();
    } else {
      window.open('https://discovered-thru-intended-console.trycloudflare.com', '_blank');
    }
  };

  useEffect(() => {
    if (carControllerRef.current?.setPaintColor) {
      carControllerRef.current.setPaintColor(activeColor);
    }
  }, [activeColor]);

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-black overflow-hidden font-sans select-none">
      {/* Live Phone Camera Video Feed & Touch Zone */}
      <div 
        className="relative flex-1 w-full h-full overflow-hidden bg-[#07090e] flex items-center justify-center cursor-grab active:cursor-grabbing touch-none select-none"
        onTouchStart={(e) => e.touches.length > 0 && handlePointerDown(e.touches[0].clientX)}
        onTouchMove={(e) => e.touches.length > 0 && handlePointerMove(e.touches[0].clientX)}
        onTouchEnd={handlePointerUp}
        onMouseDown={(e) => handlePointerDown(e.clientX)}
        onMouseMove={(e) => handlePointerMove(e.clientX)}
        onMouseUp={handlePointerUp}
        onMouseLeave={handlePointerUp}
      >
        {/* Real-time Video Stream */}
        <video
          ref={videoRef}
          playsInline
          autoPlay
          muted
          className={`absolute inset-0 w-full h-full object-cover pointer-events-none transition-opacity duration-700 ${
            cameraActive ? 'opacity-100 z-10' : 'opacity-0 z-0'
          }`}
        />

        {/* Studio Floor Backdrop while Camera is inactive */}
        {!cameraActive && (
          <div className="absolute inset-0 bg-gradient-to-b from-[#0c1220] via-[#07090e] to-black pointer-events-none z-0" />
        )}

        {/* 3D Car WebGL Canvas Overlay */}
        <div ref={threeMountRef} className="absolute inset-0 z-20 pointer-events-none" />

        {/* Top Header Bar */}
        <div className="absolute top-4 inset-x-4 z-40 flex items-center justify-between pointer-events-auto">
          <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/80 border border-white/15 backdrop-blur-md shadow-lg">
            <span className={`w-2.5 h-2.5 rounded-full ${cameraActive ? 'bg-emerald-400 animate-pulse' : 'bg-cyan-400'}`} />
            <span className="text-xs font-bold text-white font-['Orbitron',sans-serif]">
              {car?.brand} {car?.model}
            </span>
          </div>

          <button
            onClick={onClose}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-black/80 hover:bg-black/90 border border-white/20 text-white text-xs font-semibold backdrop-blur-md active:scale-95 transition-all shadow-lg"
          >
            <X className="w-4 h-4" />
            <span>Close</span>
          </button>
        </div>

        {/* Elegant Non-Blocking Floating Prompt when Camera is Not Active */}
        {!cameraActive && (
          <div className="absolute top-16 inset-x-4 max-w-sm mx-auto z-40 pointer-events-auto">
            <div className="p-4 rounded-2xl bg-black/85 border border-cyan-500/30 backdrop-blur-xl shadow-2xl space-y-3 text-center">
              <div className="flex items-center justify-center gap-2 text-cyan-400 text-xs font-bold uppercase tracking-wider">
                <Camera className="w-4 h-4" />
                <span>Camera AR Setup</span>
              </div>

              <p className="text-[11px] text-slate-300 leading-relaxed">
                {cameraPermissionError || (
                  !isSecure 
                    ? 'Mobile Chrome requires HTTPS for camera access. Switch to the Secure HTTPS link below or launch Google WebAR.' 
                    : 'Point camera toward your floor to project the car.'
                )}
              </p>

              <div className="flex flex-col gap-2 pt-1">
                {/* Secure Tunnel Link Button */}
                {!isSecure && (
                  <a
                    href="https://discovered-thru-intended-console.trycloudflare.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-xl font-bold text-xs text-black bg-gradient-to-r from-cyan-400 to-sky-300 shadow-[0_0_15px_rgba(0,210,255,0.4)] active:scale-95 transition-all"
                  >
                    <Globe className="w-4 h-4" />
                    <span>Open in Secure HTTPS (Enables Camera)</span>
                  </a>
                )}

                <div className="flex items-center gap-2">
                  {/* Retry / Turn On Camera */}
                  <button
                    onClick={startCamera}
                    className="flex-1 py-2 px-3 rounded-xl font-semibold text-xs text-white bg-slate-800 hover:bg-slate-700 border border-white/10 active:scale-95 transition-all"
                  >
                    🔄 Retry Camera
                  </button>

                  {/* Native Google WebAR Button */}
                  <button
                    onClick={handleLaunchNativeAR}
                    className="flex-1 py-2 px-3 rounded-xl font-semibold text-xs text-cyan-300 bg-cyan-950/60 hover:bg-cyan-900/60 border border-cyan-500/30 active:scale-95 transition-all"
                  >
                    📱 Google WebAR
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Loading Indicator */}
        {isModelLoading && (
          <div className="absolute inset-0 z-35 flex flex-col items-center justify-center bg-black/60 backdrop-blur-sm pointer-events-none">
            <div className="w-10 h-10 rounded-full border-2 border-cyan-500/20 border-t-cyan-400 animate-spin mb-3" />
            <p className="text-xs font-semibold text-white uppercase tracking-wider">
              Loading {car?.brand} {car?.model}...
            </p>
          </div>
        )}

        {/* Photo Flash Animation */}
        {screenshotFlash && (
          <div className="absolute inset-0 bg-white z-50 animate-out fade-out duration-500 flex items-center justify-center pointer-events-none">
            <div className="bg-black/80 text-white px-5 py-2.5 rounded-2xl flex items-center gap-2 border border-white/20">
              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              <span className="font-semibold text-sm">Photo Captured!</span>
            </div>
          </div>
        )}

        {/* Bottom Floating Control Bar */}
        <div className="absolute bottom-6 inset-x-4 z-40 flex flex-col items-center gap-3 pointer-events-auto">
          {/* Quick Color Palette Swatches */}
          <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-black/85 border border-white/15 backdrop-blur-xl shadow-xl">
            {QUICK_COLORS.map((c) => (
              <button
                key={c.name}
                onClick={() => setActiveColor(c.hex)}
                className={`w-7 h-7 rounded-full border-2 transition-transform ${
                  activeColor === c.hex ? 'scale-125 border-cyan-400 shadow-[0_0_10px_#38bdf8]' : 'border-white/20'
                }`}
                style={{ backgroundColor: c.hex }}
                title={c.name}
              />
            ))}
          </div>

          {/* Core Action Buttons */}
          <div className="p-2 rounded-2xl bg-black/90 border border-white/15 backdrop-blur-2xl flex items-center gap-2 shadow-2xl max-w-full overflow-x-auto">
            {/* Rotate Car */}
            <button
              onClick={handleRotate}
              className="flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-white/[0.08] hover:bg-white/[0.15] text-white text-xs font-semibold border border-white/10 active:scale-95"
            >
              <RotateCw className="w-4 h-4 text-cyan-400" />
              <span>Rotate</span>
            </button>

            {/* Cycle Scale */}
            <button
              onClick={handleCycleScale}
              className="flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-white/[0.08] hover:bg-white/[0.15] text-white text-xs font-semibold border border-white/10 active:scale-95"
            >
              <Maximize2 className="w-4 h-4 text-amber-400" />
              <span>
                {carScaleMode === 'life-size' ? '1:1 Life Size' : carScaleMode === 'half' ? '1:2 Scale' : 'Tabletop'}
              </span>
            </button>

            {/* Native WebAR Button */}
            <button
              onClick={handleLaunchNativeAR}
              className="flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-cyan-950/70 hover:bg-cyan-900/70 text-cyan-300 text-xs font-semibold border border-cyan-500/40 active:scale-95"
              title="Launch Google Scene Viewer"
            >
              <Smartphone className="w-4 h-4 text-cyan-400" />
              <span>Native AR</span>
            </button>

            {/* Snap Photo */}
            <button
              onClick={handleTakeScreenshot}
              className="p-2.5 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-black shadow-[0_0_15px_rgba(0,210,255,0.4)] active:scale-95"
              title="Take Photo"
            >
              <Camera className="w-4 h-4 text-black" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
