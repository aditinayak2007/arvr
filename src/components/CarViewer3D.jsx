import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';
import { 
  RotateCw, 
  ZoomIn, 
  ZoomOut, 
  Maximize2, 
  Minimize2, 
  Eye, 
  Sun, 
  Moon, 
  Sparkles, 
  RefreshCcw, 
  Layers, 
  Camera, 
  AlertTriangle,
  Lightbulb
} from 'lucide-react';
import { createProceduralCar } from '../utils/threeCarBuilder';
import { loadRealisticCarModel } from '../utils/carModelLoader';

export default function CarViewer3D({
  car,
  selectedColorHex = '#38bdf8',
  selectedFinish = 'metallic',
  onCustomizeClick
}) {
  const mountRef = useRef(null);
  const containerRef = useRef(null);

  // Viewer state
  const [isRotating, setIsRotating] = useState(true);
  const isRotatingRef = useRef(isRotating);
  useEffect(() => {
    isRotatingRef.current = isRotating;
  }, [isRotating]);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [activeAngle, setActiveAngle] = useState('front-three-quarter');
  const [lightingMode, setLightingMode] = useState('studio'); // 'studio' | 'neon' | 'cyber'
  const [headlightsOn, setHeadlightsOn] = useState(true);
  const [wireframeMode, setWireframeMode] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  // Three.js internal references
  const sceneRef = useRef(null);
  const rendererRef = useRef(null);
  const cameraRef = useRef(null);
  const carRootRef = useRef(null);
  const carControllerRef = useRef(null);
  const lightsRef = useRef({});
  const animationFrameIdRef = useRef(null);
  const floorGridRef = useRef(null);

  // Mouse & Touch interaction state
  const isDraggingRef = useRef(false);
  const previousMousePositionRef = useRef({ x: 0, y: 0 });
  const cameraDistanceRef = useRef(6.2);
  const cameraAzimuthRef = useRef(Math.PI / 4); // horizontal angle
  const cameraPolarRef = useRef(Math.PI / 2.6); // vertical angle

  // Update camera position from spherical coordinates
  const updateCameraPosition = useCallback(() => {
    if (!cameraRef.current) return;
    const distance = cameraDistanceRef.current;
    const azimuth = cameraAzimuthRef.current;
    const polar = cameraPolarRef.current;

    const x = distance * Math.sin(polar) * Math.sin(azimuth);
    const y = distance * Math.cos(polar);
    const z = distance * Math.sin(polar) * Math.cos(azimuth);

    cameraRef.current.position.set(x, y, z);
    cameraRef.current.lookAt(0, 0.45, 0);
  }, []);

  // Set camera angle preset
  const setCameraPreset = (presetName) => {
    setActiveAngle(presetName);
    setIsRotating(false);

    switch (presetName) {
      case 'front-three-quarter':
        cameraAzimuthRef.current = Math.PI / 3.8;
        cameraPolarRef.current = Math.PI / 2.7;
        cameraDistanceRef.current = 6.0;
        break;
      case 'side':
        cameraAzimuthRef.current = Math.PI / 2;
        cameraPolarRef.current = Math.PI / 2.5;
        cameraDistanceRef.current = 5.8;
        break;
      case 'rear-three-quarter':
        cameraAzimuthRef.current = Math.PI * 0.82;
        cameraPolarRef.current = Math.PI / 2.8;
        cameraDistanceRef.current = 6.2;
        break;
      case 'top':
        cameraAzimuthRef.current = 0.05;
        cameraPolarRef.current = 0.15;
        cameraDistanceRef.current = 7.5;
        break;
      case 'interior':
        cameraAzimuthRef.current = 0;
        cameraPolarRef.current = Math.PI / 2.4;
        cameraDistanceRef.current = 3.2;
        break;
      default:
        break;
    }
    updateCameraPosition();
  };

  // Zoom controls
  const handleZoom = (delta) => {
    cameraDistanceRef.current = Math.max(2.8, Math.min(10.5, cameraDistanceRef.current + delta));
    updateCameraPosition();
  };

  // Reset Camera
  const handleResetCamera = () => {
    cameraAzimuthRef.current = Math.PI / 4;
    cameraPolarRef.current = Math.PI / 2.6;
    cameraDistanceRef.current = 6.2;
    setIsRotating(true);
    setActiveAngle('front-three-quarter');
    updateCameraPosition();
  };

  // Toggle Fullscreen
  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().catch((err) => {
        console.warn('Fullscreen request failed:', err);
      });
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  // Listen to fullscreen exit via Esc
  useEffect(() => {
    const onFsChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', onFsChange);
    return () => document.removeEventListener('fullscreenchange', onFsChange);
  }, []);

  // Update Car Paint Color & Finish
  useEffect(() => {
    if (carControllerRef.current) {
      carControllerRef.current.setPaintColor(selectedColorHex);
      carControllerRef.current.setFinish(selectedFinish);
    }
  }, [selectedColorHex, selectedFinish]);

  // Toggle Wireframe
  useEffect(() => {
    if (carRootRef.current) {
      carRootRef.current.traverse((child) => {
        if (child.isMesh && child.material) {
          if (Array.isArray(child.material)) {
            child.material.forEach((m) => (m.wireframe = wireframeMode));
          } else {
            child.material.wireframe = wireframeMode;
          }
        }
      });
    }
  }, [wireframeMode]);

  // Lighting preset switcher
  useEffect(() => {
    if (!lightsRef.current.keyLight) return;

    if (lightingMode === 'neon') {
      lightsRef.current.keyLight.color.set('#00d2ff');
      lightsRef.current.keyLight.intensity = 2.4;
      lightsRef.current.fillLight.color.set('#ec4899');
      lightsRef.current.fillLight.intensity = 1.8;
      lightsRef.current.ambient.color.set('#0a0f1e');
      lightsRef.current.ambient.intensity = 0.8;
      if (floorGridRef.current) floorGridRef.current.material.color.set('#00d2ff');
    } else if (lightingMode === 'cyber') {
      lightsRef.current.keyLight.color.set('#38bdf8');
      lightsRef.current.keyLight.intensity = 2.0;
      lightsRef.current.fillLight.color.set('#a855f7');
      lightsRef.current.fillLight.intensity = 2.0;
      lightsRef.current.ambient.color.set('#030712');
      lightsRef.current.ambient.intensity = 0.6;
      if (floorGridRef.current) floorGridRef.current.material.color.set('#a855f7');
    } else {
      // Luxury Studio
      lightsRef.current.keyLight.color.set('#ffffff');
      lightsRef.current.keyLight.intensity = 2.2;
      lightsRef.current.fillLight.color.set('#cbd5e1');
      lightsRef.current.fillLight.intensity = 1.2;
      lightsRef.current.ambient.color.set('#1e293b');
      lightsRef.current.ambient.intensity = 1.0;
      if (floorGridRef.current) floorGridRef.current.material.color.set('#38bdf8');
    }
  }, [lightingMode]);

  // Headlights toggle
  useEffect(() => {
    if (carControllerRef.current && carControllerRef.current.headlightMesh) {
      const hl = carControllerRef.current.headlightMesh;
      if (hl.material) {
        hl.material.emissiveIntensity = headlightsOn ? 2.5 : 0.1;
      }
    }
    if (lightsRef.current.spotlightLeft && lightsRef.current.spotlightRight) {
      lightsRef.current.spotlightLeft.intensity = headlightsOn ? 3.0 : 0;
      lightsRef.current.spotlightRight.intensity = headlightsOn ? 3.0 : 0;
    }
  }, [headlightsOn]);

  // --- Initialize Three.js Scene ---
  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    setIsLoading(true);
    setHasError(false);

    try {
      // 1. Scene setup
      const scene = new THREE.Scene();
      sceneRef.current = scene;
      scene.background = new THREE.Color('#07090e');
      scene.fog = new THREE.FogExp2('#07090e', 0.05);

      // 2. Camera setup
      const width = mount.clientWidth || 800;
      const height = mount.clientHeight || 500;
      const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 50);
      cameraRef.current = camera;
      updateCameraPosition();

      // 3. Renderer setup
      const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false, powerPreference: 'high-performance' });
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.shadowMap.enabled = true;
      renderer.shadowMap.type = THREE.PCFSoftShadowMap;
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.1;
      rendererRef.current = renderer;

      // Clean existing canvas if any
      while (mount.firstChild) {
        mount.removeChild(mount.firstChild);
      }
      mount.appendChild(renderer.domElement);

      // 4. Lighting Rig
      const ambientLight = new THREE.AmbientLight('#1e293b', 1.0);
      scene.add(ambientLight);

      const keyLight = new THREE.DirectionalLight('#ffffff', 2.2);
      keyLight.position.set(5, 8, 5);
      keyLight.castShadow = true;
      keyLight.shadow.mapSize.width = 1024;
      keyLight.shadow.mapSize.height = 1024;
      keyLight.shadow.bias = -0.0001;
      scene.add(keyLight);

      const fillLight = new THREE.DirectionalLight('#cbd5e1', 1.2);
      fillLight.position.set(-6, 5, -5);
      scene.add(fillLight);

      const rimLight = new THREE.DirectionalLight('#38bdf8', 1.8);
      rimLight.position.set(0, 4, -8);
      scene.add(rimLight);

      // Virtual Car Headlight Spotlights pointing forward from the car
      const spotlightLeft = new THREE.SpotLight('#e0f2fe', 3.0, 12, Math.PI / 5, 0.5, 1);
      spotlightLeft.position.set(-0.7, 0.75, 2.3);
      spotlightLeft.target.position.set(-0.7, 0.2, 8);
      scene.add(spotlightLeft);
      scene.add(spotlightLeft.target);

      const spotlightRight = new THREE.SpotLight('#e0f2fe', 3.0, 12, Math.PI / 5, 0.5, 1);
      spotlightRight.position.set(0.7, 0.75, 2.3);
      spotlightRight.target.position.set(0.7, 0.2, 8);
      scene.add(spotlightRight);
      scene.add(spotlightRight.target);

      lightsRef.current = { keyLight, fillLight, rimLight, ambient: ambientLight, spotlightLeft, spotlightRight };

      // 5. Showroom Floor & Interactive Grid
      const floorRadius = 8;
      const floorGeo = new THREE.CircleGeometry(floorRadius, 48);
      const floorMat = new THREE.MeshStandardMaterial({
        color: 0x0a0d14,
        roughness: 0.15,
        metalness: 0.8,
      });
      const floor = new THREE.Mesh(floorGeo, floorMat);
      floor.rotation.x = -Math.PI / 2;
      floor.receiveShadow = true;
      scene.add(floor);

      // Animated Glowing Turntable Ring
      const ringGeo = new THREE.RingGeometry(3.6, 3.65, 64);
      const ringMat = new THREE.MeshBasicMaterial({
        color: 0x00d2ff,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.7,
      });
      const ring = new THREE.Mesh(ringGeo, ringMat);
      ring.rotation.x = -Math.PI / 2;
      ring.position.y = 0.01;
      scene.add(ring);
      floorGridRef.current = ring;

      // Outer dashed showroom perimeter
      const outerRingGeo = new THREE.RingGeometry(5.2, 5.23, 64);
      const outerRingMat = new THREE.MeshBasicMaterial({
        color: 0x334155,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.4,
      });
      const outerRing = new THREE.Mesh(outerRingGeo, outerRingMat);
      outerRing.rotation.x = -Math.PI / 2;
      outerRing.position.y = 0.01;
      scene.add(outerRing);

      // 6. Build the 3D Vehicle using Realistic GLTF Model (with procedural fallback)
      let isMounted = true;
      const modelPath = car?.model3D || '/models/sports-car.glb';
      loadRealisticCarModel(modelPath, selectedColorHex, selectedFinish)
        .then((builderResult) => {
          if (!isMounted) return;
          if (carRootRef.current) {
            scene.remove(carRootRef.current);
          }
          carControllerRef.current = builderResult;
          carRootRef.current = builderResult.carGroup;
          scene.add(builderResult.carGroup);
          setIsLoading(false);
        })
        .catch((err) => {
          console.warn('Real car model load failed, using procedural fallback:', err);
          if (!isMounted) return;
          const fallback = createProceduralCar(
            car?.bodyType || 'Sedan',
            selectedColorHex,
            selectedFinish
          );
          if (carRootRef.current) {
            scene.remove(carRootRef.current);
          }
          carControllerRef.current = fallback;
          carRootRef.current = fallback.carGroup;
          scene.add(fallback.carGroup);
          setIsLoading(false);
        });

      // 7. Render Animation Loop
      let clock = new THREE.Clock();
      const animate = () => {
        animationFrameIdRef.current = requestAnimationFrame(animate);

        const delta = clock.getDelta();

        // Auto-rotation around vehicle center
        if (isRotatingRef.current && !isDraggingRef.current) {
          cameraAzimuthRef.current += delta * 0.35;
          updateCameraPosition();
        }

        // Pulse the turntable glowing ring
        if (ring) {
          const time = clock.getElapsedTime();
          ring.material.opacity = 0.5 + Math.sin(time * 2) * 0.25;
        }

        renderer.render(scene, camera);
      };

      animate();

      // 8. Resize Handler
      const handleResize = () => {
        if (!mountRef.current || !rendererRef.current || !cameraRef.current) return;
        const w = mountRef.current.clientWidth;
        const h = mountRef.current.clientHeight;
        cameraRef.current.aspect = w / h;
        cameraRef.current.updateProjectionMatrix();
        rendererRef.current.setSize(w, h);
      };

      window.addEventListener('resize', handleResize);

      return () => {
        isMounted = false;
        window.removeEventListener('resize', handleResize);
        if (animationFrameIdRef.current) {
          cancelAnimationFrame(animationFrameIdRef.current);
        }
        if (rendererRef.current && rendererRef.current.domElement && mount) {
          try {
            mount.removeChild(rendererRef.current.domElement);
          } catch (e) {
            // ignore cleanup errors
          }
          rendererRef.current.dispose();
        }
      };
    } catch (err) {
      console.error('Three.js initialization error:', err);
      setHasError(true);
      setIsLoading(false);
    }
  }, [car?.id, car?.model3D, car?.bodyType, updateCameraPosition]);

  // Update car paint whenever color / finish changes
  useEffect(() => {
    if (carControllerRef.current) {
      carControllerRef.current.setPaintColor(selectedColorHex);
      carControllerRef.current.setFinish(selectedFinish);
    }
  }, [selectedColorHex, selectedFinish]);

  // --- Mouse & Touch Drag Controls ---
  const handleMouseDown = (e) => {
    isDraggingRef.current = true;
    previousMousePositionRef.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseMove = (e) => {
    if (!isDraggingRef.current) return;

    const deltaX = e.clientX - previousMousePositionRef.current.x;
    const deltaY = e.clientY - previousMousePositionRef.current.y;

    cameraAzimuthRef.current -= deltaX * 0.007;
    // Clamp polar angle so camera doesn't go below floor or flip upside down
    cameraPolarRef.current = Math.max(0.15, Math.min(Math.PI / 2.1, cameraPolarRef.current - deltaY * 0.007));

    updateCameraPosition();
    previousMousePositionRef.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseUp = () => {
    isDraggingRef.current = false;
  };

  const handleWheel = (e) => {
    e.preventDefault();
    handleZoom(e.deltaY * 0.004);
  };

  // Touch handlers for mobile with pinch-to-zoom
  const touchStartDistRef = useRef(0);
  const touchStartDistanceRef = useRef(0);

  const handleTouchStart = (e) => {
    if (e.touches.length === 1) {
      isDraggingRef.current = true;
      previousMousePositionRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    } else if (e.touches.length === 2) {
      // Pinch to zoom
      isDraggingRef.current = false;
      const dx = e.touches[0].clientX - e.touches[1].clientX;
      const dy = e.touches[0].clientY - e.touches[1].clientY;
      touchStartDistRef.current = Math.hypot(dx, dy);
      touchStartDistanceRef.current = cameraDistanceRef.current;
    }
  };

  const handleTouchMove = (e) => {
    if (e.touches.length === 1 && isDraggingRef.current) {
      const deltaX = e.touches[0].clientX - previousMousePositionRef.current.x;
      const deltaY = e.touches[0].clientY - previousMousePositionRef.current.y;

      cameraAzimuthRef.current -= deltaX * 0.008;
      cameraPolarRef.current = Math.max(0.15, Math.min(Math.PI / 2.1, cameraPolarRef.current - deltaY * 0.008));

      updateCameraPosition();
      previousMousePositionRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    } else if (e.touches.length === 2 && touchStartDistRef.current > 0) {
      // Two-finger pinch zoom
      const dx = e.touches[0].clientX - e.touches[1].clientX;
      const dy = e.touches[0].clientY - e.touches[1].clientY;
      const currentDist = Math.hypot(dx, dy);
      if (currentDist > 10) {
        const factor = touchStartDistRef.current / currentDist;
        cameraDistanceRef.current = Math.max(2.8, Math.min(10.5, touchStartDistanceRef.current * factor));
        updateCameraPosition();
      }
    }
  };

  const handleTouchEnd = () => {
    isDraggingRef.current = false;
    touchStartDistRef.current = 0;
  };

  return (
    <div
      ref={containerRef}
      className={`relative w-full rounded-2xl overflow-hidden border border-white/10 bg-[#07090e] shadow-2xl transition-all select-none ${
        isFullscreen ? 'fixed inset-0 z-50 rounded-none' : 'aspect-[16/10] min-h-[380px] sm:min-h-[420px]'
      }`}
    >
      {/* 3D WebGL Canvas Mount Container */}
      <div
        ref={mountRef}
        style={{ touchAction: 'none' }}
        className="w-full h-full cursor-grab active:cursor-grabbing touch-none select-none"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onWheel={handleWheel}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      />

      {/* Loading Overlay */}
      {isLoading && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#07090e]/90 backdrop-blur-sm z-20">
          <div className="w-12 h-12 rounded-full border-2 border-cyan-500/20 border-t-cyan-400 animate-spin mb-3" />
          <p className="font-['Orbitron',sans-serif] text-xs uppercase tracking-widest text-cyan-400">
            Rendering 3D Vehicle Geometry...
          </p>
        </div>
      )}

      {/* Fallback State if WebGL is unavailable */}
      {hasError && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#0d1117] p-6 text-center z-20">
          <AlertTriangle className="w-12 h-12 text-amber-400 mb-3" />
          <h4 className="text-lg font-bold text-white mb-1">Interactive 3D Engine Paused</h4>
          <p className="text-sm text-slate-400 max-w-md mb-4">
            WebGL context could not be acquired or is restricted by your browser. You can still inspect the vehicle specifications, photos, and launch the AR experience.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 text-xs font-semibold text-white bg-cyan-600 hover:bg-cyan-500 rounded-lg flex items-center gap-2"
          >
            <RefreshCcw className="w-4 h-4" />
            <span>Reload 3D Engine</span>
          </button>
        </div>
      )}

      {/* Top Left: Model & Live Status Badges */}
      <div className="absolute top-4 left-4 z-10 pointer-events-none flex flex-col gap-1.5">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-mono font-semibold uppercase tracking-wider bg-black/60 border border-cyan-500/40 text-cyan-300 backdrop-blur-md">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
            WebGL 3D Active
          </span>
          <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-[10px] font-mono bg-white/[0.05] border border-white/10 text-slate-300 backdrop-blur-md">
            PBR Shader • 60 FPS
          </span>
        </div>
        <div className="text-xs font-semibold text-slate-400 drop-shadow">
          Drag to rotate • Scroll to zoom
        </div>
      </div>

      {/* Top Right: Fullscreen & Quick Tools */}
      <div className="absolute top-4 right-4 z-10 flex items-center gap-2">
        <button
          onClick={() => setLightingMode(lightingMode === 'studio' ? 'neon' : lightingMode === 'neon' ? 'cyber' : 'studio')}
          className="p-2 rounded-xl bg-black/60 hover:bg-black/90 border border-white/10 hover:border-cyan-400/50 text-slate-300 hover:text-cyan-300 backdrop-blur-md transition-all"
          title={`Lighting: ${lightingMode.toUpperCase()} (Click to toggle)`}
        >
          <Sun className="w-4 h-4 text-cyan-400" />
        </button>

        <button
          onClick={() => setHeadlightsOn(!headlightsOn)}
          className={`p-2 rounded-xl border backdrop-blur-md transition-all ${
            headlightsOn
              ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300 shadow-[0_0_10px_rgba(0,210,255,0.3)]'
              : 'bg-black/60 border-white/10 text-slate-400 hover:text-white'
          }`}
          title="Toggle Headlights & Beams"
        >
          <Lightbulb className="w-4 h-4" />
        </button>

        <button
          onClick={() => setWireframeMode(!wireframeMode)}
          className={`p-2 rounded-xl border backdrop-blur-md transition-all ${
            wireframeMode
              ? 'bg-amber-500/20 border-amber-400 text-amber-300'
              : 'bg-black/60 border-white/10 text-slate-400 hover:text-white'
          }`}
          title="Toggle Wireframe Mesh Mode"
        >
          <Layers className="w-4 h-4" />
        </button>

        <button
          onClick={toggleFullscreen}
          className="p-2 rounded-xl bg-black/60 hover:bg-black/90 border border-white/10 hover:border-cyan-400/50 text-slate-300 hover:text-white backdrop-blur-md transition-all"
          title={isFullscreen ? 'Exit Fullscreen' : 'Fullscreen 3D Viewer'}
        >
          {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
        </button>
      </div>

      {/* Bottom Center: Camera Presets Bar */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 max-w-[95%] overflow-x-auto p-1.5 rounded-2xl bg-black/70 border border-white/10 backdrop-blur-xl flex items-center gap-1 shadow-2xl">
        <button
          onClick={() => setCameraPreset('front-three-quarter')}
          className={`px-3 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-all ${
            activeAngle === 'front-three-quarter'
              ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/40 shadow-[0_0_8px_rgba(0,210,255,0.2)] font-semibold'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          Front 3/4
        </button>

        <button
          onClick={() => setCameraPreset('side')}
          className={`px-3 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-all ${
            activeAngle === 'side'
              ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/40 shadow-[0_0_8px_rgba(0,210,255,0.2)] font-semibold'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          Side Profile
        </button>

        <button
          onClick={() => setCameraPreset('rear-three-quarter')}
          className={`px-3 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-all ${
            activeAngle === 'rear-three-quarter'
              ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/40 shadow-[0_0_8px_rgba(0,210,255,0.2)] font-semibold'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          Rear View
        </button>

        <button
          onClick={() => setCameraPreset('top')}
          className={`px-3 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-all ${
            activeAngle === 'top'
              ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/40 shadow-[0_0_8px_rgba(0,210,255,0.2)] font-semibold'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          Top Down
        </button>

        <button
          onClick={() => setCameraPreset('interior')}
          className={`px-3 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-all ${
            activeAngle === 'interior'
              ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/40 shadow-[0_0_8px_rgba(0,210,255,0.2)] font-semibold'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          Close-Up
        </button>

        <div className="w-[1px] h-4 bg-white/10 mx-1" />

        {/* Auto Rotate Toggle */}
        <button
          onClick={() => setIsRotating(!isRotating)}
          className={`p-1.5 rounded-lg text-xs transition-all ${
            isRotating
              ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
              : 'text-slate-400 hover:text-white'
          }`}
          title={isRotating ? 'Pause Turntable' : 'Start Auto-Rotation'}
        >
          <RotateCw className={`w-3.5 h-3.5 ${isRotating ? 'animate-spin' : ''}`} style={{ animationDuration: '6s' }} />
        </button>

        {/* Zoom In */}
        <button
          onClick={() => handleZoom(-0.6)}
          className="p-1.5 rounded-lg text-slate-400 hover:text-white transition-colors"
          title="Zoom In"
        >
          <ZoomIn className="w-3.5 h-3.5" />
        </button>

        {/* Zoom Out */}
        <button
          onClick={() => handleZoom(0.6)}
          className="p-1.5 rounded-lg text-slate-400 hover:text-white transition-colors"
          title="Zoom Out"
        >
          <ZoomOut className="w-3.5 h-3.5" />
        </button>

        {/* Reset Camera */}
        <button
          onClick={handleResetCamera}
          className="p-1.5 rounded-lg text-slate-400 hover:text-white transition-colors"
          title="Reset Camera Position"
        >
          <RefreshCcw className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
