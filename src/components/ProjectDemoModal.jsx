import React, { useState } from 'react';
import { 
  X, 
  GraduationCap, 
  ChevronRight, 
  ChevronLeft, 
  CheckCircle2, 
  Car, 
  Eye, 
  Palette, 
  RotateCw, 
  Smartphone, 
  Scale, 
  Calculator, 
  Sparkles,
  ArrowRight
} from 'lucide-react';

export default function ProjectDemoModal({
  isOpen,
  onClose,
  onNavigateAction
}) {
  const [currentStep, setCurrentStep] = useState(0);

  if (!isOpen) return null;

  const demoSteps = [
    {
      title: "1. Multi-Vehicle Catalog & Filtering",
      concept: "Client-Side Dynamic Filtering & State Architecture",
      icon: Car,
      description: "Users can explore electric, hybrid, and internal combustion vehicles with live instant search by manufacturer, body profile, and price thresholds.",
      academicBenefit: "Demonstrates high-performance client state filtering without database latency.",
      actionLabel: "Go to Showroom",
      actionTarget: "showroom"
    },
    {
      title: "2. Three.js Interactive 3D Viewing",
      concept: "WebGL Hardware Accelerated Rendering & Orbit Camera",
      icon: Eye,
      description: "Examine realistic vehicle geometry rendered via WebGL with PBR (Physically-Based Rendering) physical shaders, directional studio lighting, and floor contact shadows.",
      academicBenefit: "Applies computer graphics concepts: matrix projection, vector normals, and frame-rate optimization.",
      actionLabel: "Inspect 3D Vehicle",
      actionTarget: "car-details"
    },
    {
      title: "3. Real-Time Dynamic Color Customization",
      concept: "Shader Uniforms & Mesh Material Mutation",
      icon: Palette,
      description: "Select exterior paint swatches (Obsidian Black, Pearl White, Racing Red, etc.) with real-time updates to material roughness, clearcoat, and metallic reflectiveness.",
      academicBenefit: "Demonstrates interactive graphic state synchronization without re-meshing or reloading assets.",
      actionLabel: "Open Customizer",
      actionTarget: "car-details"
    },
    {
      title: "4. Multi-Angle & 360° Inspection",
      concept: "Spherical Coordinate Transformation (Azimuth & Polar Angles)",
      icon: RotateCw,
      description: "Freely orbit around the car using mouse or touch drag, or snap to precision presets (Front 3/4, Side Profile, Rear View, Top Down, Interior Driver POV).",
      academicBenefit: "Demonstrates 3D camera viewport clamping, touch gesture event listening, and smooth rotational interpolation.",
      actionLabel: "View 3D Showroom",
      actionTarget: "virtual-showroom"
    },
    {
      title: "5. Augmented Reality (AR) in Real Space",
      concept: "WebXR & Markerless SLAM Surface Tracking",
      icon: Smartphone,
      description: "Project true-scale 3D vehicles onto real-world ground planes using WebXR on Android, Apple AR Quick Look on iOS, or the desktop AR Camera Simulator mode.",
      academicBenefit: "Demonstrates modern WebAR, device gyroscope/accelerometer sensor fusion, and spatial scale calibration.",
      actionLabel: "Launch AR Experience",
      actionTarget: "ar-experience"
    },
    {
      title: "6. Multi-Vehicle Technical Comparison",
      concept: "Matrix-Based Relational Attribute Comparison",
      icon: Scale,
      description: "Compare up to 3 cars side-by-side across horsepower, torque, acceleration, electric range, seating, and safety scores.",
      academicBenefit: "Demonstrates multi-entity relational comparison and responsive tabular data presentation.",
      actionLabel: "Open Comparison",
      actionTarget: "compare"
    },
    {
      title: "7. Financial Modeling & EMI Projection",
      concept: "Compound Interest Amortization Algorithms",
      icon: Calculator,
      description: "Calculate down payments, loan tenure in months, and projected monthly payments using mathematical compound interest equations with instant graphical visual bars.",
      academicBenefit: "Integrates practical financial modeling algorithms directly into an automotive ecommerce pipeline.",
      actionLabel: "Try EMI Calculator",
      actionTarget: "showroom"
    }
  ];

  const activeStepData = demoSteps[currentStep];
  const StepIcon = activeStepData.icon;

  const handleExecuteAction = () => {
    onNavigateAction(activeStepData.actionTarget);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl glass-panel p-6 sm:p-8 rounded-3xl border border-cyan-500/30 shadow-2xl shadow-cyan-500/10 space-y-6">
        {/* Top Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10">
          <div className="flex items-center gap-2.5">
            <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-['Orbitron',sans-serif] text-base sm:text-lg font-bold text-white">
                  Academic Project Walkthrough
                </h3>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                  Step {currentStep + 1} of {demoSteps.length}
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Interactive demonstration guide for college evaluators & professors
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full bg-white/[0.06] hover:bg-white/10 text-slate-400 hover:text-white"
            title="Close Walkthrough"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Current Step Content Box */}
        <div className="glass-card p-6 rounded-2xl border border-white/10 space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-cyan-500/20 border border-cyan-400/40 text-cyan-300">
              <StepIcon className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[11px] font-mono uppercase tracking-wider text-cyan-400 font-bold block">
                AR/VR Academic Concept: {activeStepData.concept}
              </span>
              <h4 className="font-['Orbitron',sans-serif] text-lg font-bold text-white">
                {activeStepData.title}
              </h4>
            </div>
          </div>

          <p className="text-sm text-slate-300 leading-relaxed">
            {activeStepData.description}
          </p>

          <div className="p-3.5 rounded-xl bg-cyan-950/30 border border-cyan-500/20 text-xs text-cyan-200 flex items-start gap-2">
            <Sparkles className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
            <div>
              <strong className="text-cyan-300">Curriculum Value: </strong>
              {activeStepData.academicBenefit}
            </div>
          </div>
        </div>

        {/* Stepper Progress Bar */}
        <div className="space-y-2">
          <div className="grid grid-cols-7 gap-1.5">
            {demoSteps.map((_, idx) => (
              <div
                key={idx}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  idx === currentStep
                    ? 'bg-cyan-400 shadow-[0_0_8px_#38bdf8]'
                    : idx < currentStep
                    ? 'bg-cyan-700/60'
                    : 'bg-slate-800'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Bottom Actions */}
        <div className="flex items-center justify-between gap-3 pt-2">
          <button
            onClick={() => setCurrentStep((prev) => Math.max(0, prev - 1))}
            disabled={currentStep === 0}
            className="flex items-center gap-1 px-4 py-2 rounded-xl text-xs font-semibold text-slate-300 bg-white/[0.05] hover:bg-white/10 disabled:opacity-30 disabled:pointer-events-none transition-all"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Previous</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={handleExecuteAction}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-black bg-cyan-400 hover:bg-cyan-300 shadow-[0_0_15px_rgba(0,210,255,0.3)] transition-all"
            >
              <span>{activeStepData.actionLabel}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            {currentStep < demoSteps.length - 1 ? (
              <button
                onClick={() => setCurrentStep((prev) => Math.min(demoSteps.length - 1, prev + 1))}
                className="flex items-center gap-1 px-4 py-2 rounded-xl text-xs font-semibold text-white bg-slate-800 hover:bg-slate-700 border border-white/10 transition-all"
              >
                <span>Next Step</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={onClose}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-emerald-300 bg-emerald-500/20 border border-emerald-500/40"
              >
                Complete Tour
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
