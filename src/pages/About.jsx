import React, { useState } from 'react';
import { 
  Shield, 
  GraduationCap, 
  Code, 
  Cpu, 
  CheckCircle2, 
  Sparkles, 
  Car, 
  Send, 
  Mail, 
  User, 
  Phone, 
  MessageSquare,
  ArrowRight
} from 'lucide-react';
import { CARS_DATA } from '../data/cars';

export default function About({ onBookTestDrive }) {
  // Contact form state
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [interestedCar, setInterestedCar] = useState(CARS_DATA[0].model);
  const [contactMessage, setContactMessage] = useState('');
  const [contactSubmitted, setContactSubmitted] = useState(false);

  const handleContactSubmit = (e) => {
    e.preventDefault();
    if (!contactName.trim() || !contactEmail.trim()) return;
    setContactSubmitted(true);
    setTimeout(() => {
      setContactName('');
      setContactEmail('');
      setContactPhone('');
      setContactMessage('');
    }, 4000);
  };

  const objectives = [
    "Reduce the need for physical showroom visits through remote spatial inspection",
    "Provide interactive 360-degree vehicle visualization using hardware-accelerated WebGL",
    "Allow prospective buyers to dynamically customize paint materials and finishes",
    "Enable AR-based real-world visualization on mobile devices without app installation",
    "Help users compare specifications, dimensions, and financing terms side-by-side",
    "Demonstrate the practical application of AR/VR in the modern automotive retail industry"
  ];

  const technologies = [
    { name: "React 19 & Vite", role: "Component architecture & fast HMR tooling" },
    { name: "Three.js", role: "WebGL 3D engine, PBR physical shaders & camera orbit controls" },
    { name: "WebAR & <model-viewer>", role: "Markerless SLAM surface tracking, WebXR & Quick Look" },
    { name: "Tailwind CSS v4", role: "Modern automotive dark UI, glassmorphism & responsive layout" },
    { name: "JavaScript (ES6+)", role: "Client-side state management & financial algorithms" },
    { name: "HTML5 Canvas & Web Media", role: "Webcam video streams, surface crosshairs & shadow maps" }
  ];

  return (
    <div className="space-y-16 pt-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* 1. Header & Platform Scope */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-cyan-500/10 border border-cyan-400/30 text-cyan-300">
          <Sparkles className="w-4 h-4 text-cyan-400" />
          <span>Next-Generation Automotive Innovation</span>
        </div>

        <h1 className="font-['Orbitron',sans-serif] text-3xl sm:text-5xl font-black text-white tracking-wide">
          About <span className="text-cyan-400">AR DRIVE</span>
        </h1>

        <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
          “AR DRIVE is an AR-based virtual car showroom designed to demonstrate how Augmented Reality, 3D visualization and interactive web technologies transform the modern vehicle discovery and buying experience.”
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-mono text-slate-400 pt-2">
          <span className="px-3 py-1 rounded-xl bg-slate-900 border border-white/10">
            Platform: <strong className="text-cyan-300">AR DRIVE Virtual Showroom</strong>
          </span>
          <span className="px-3 py-1 rounded-xl bg-slate-900 border border-white/10">
            Technology: <strong className="text-cyan-300">Three.js • WebXR • WebGL</strong>
          </span>
          <span className="px-3 py-1 rounded-xl bg-slate-900 border border-white/10">
            Engineer: <strong className="text-white">Aditi Nayak</strong>
          </span>
        </div>
      </div>

      {/* 2. Project Objectives */}
      <div className="glass-panel p-8 rounded-3xl border border-white/10 space-y-6">
        <div className="flex items-center gap-2.5">
          <div className="p-2.5 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400">
            <Shield className="w-5 h-5" />
          </div>
          <h2 className="font-['Orbitron',sans-serif] text-xl font-bold text-white">
            Core Project Objectives
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {objectives.map((obj, i) => (
            <div key={i} className="flex items-start gap-3 p-4 rounded-2xl bg-white/[0.02] border border-white/5">
              <CheckCircle2 className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
              <span className="text-xs text-slate-200 leading-relaxed">{obj}</span>
            </div>
          ))}
        </div>
      </div>

      {/* 3. Technologies Used */}
      <div className="space-y-6">
        <h2 className="font-['Orbitron',sans-serif] text-xl font-bold text-white text-center">
          Technologies & Architectural Stack
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {technologies.map((t, idx) => (
            <div key={idx} className="glass-card p-5 rounded-2xl border border-white/10 space-y-2">
              <div className="flex items-center gap-2">
                <Code className="w-4 h-4 text-cyan-400" />
                <h4 className="font-['Orbitron',sans-serif] text-sm font-bold text-white">
                  {t.name}
                </h4>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                {t.role}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* 4. Visual Process Section */}
      <div className="space-y-6">
        <div className="text-center space-y-2">
          <span className="text-xs uppercase font-mono tracking-wider text-cyan-400">
            END-TO-END WORKFLOW
          </span>
          <h2 className="font-['Orbitron',sans-serif] text-xl sm:text-2xl font-bold text-white">
            Six-Step Virtual Showroom Experience
          </h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {[
            { step: 'STEP 01', title: 'Choose a Vehicle', desc: 'Browse multiple brands & filters' },
            { step: 'STEP 02', title: 'Explore in 3D', desc: 'WebGL orbit inspection' },
            { step: 'STEP 03', title: 'Customize', desc: 'PBR paint shader variations' },
            { step: 'STEP 04', title: 'View in AR', desc: 'Real-world ground placement' },
            { step: 'STEP 05', title: 'Compare', desc: 'Multi-car feature matrix' },
            { step: 'STEP 06', title: 'Virtual Test Drive', desc: 'Schedule private test drive' },
          ].map((item, idx) => (
            <div
              key={item.step}
              className="glass-card p-4 rounded-2xl border border-white/10 text-center space-y-2 flex flex-col justify-between"
            >
              <span className="text-xs font-mono font-bold text-cyan-400">{item.step}</span>
              <h4 className="font-['Orbitron',sans-serif] text-xs font-bold text-white">{item.title}</h4>
              <p className="text-[11px] text-slate-400">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* 5. Contact & Enquiry Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start pt-6 border-t border-white/10">
        <div className="lg:col-span-5 space-y-4">
          <span className="text-xs font-mono uppercase tracking-widest text-cyan-400 font-bold">
            GET IN TOUCH
          </span>
          <h2 className="font-['Orbitron',sans-serif] text-2xl font-bold text-white">
            Have Questions About AR DRIVE?
          </h2>
          <p className="text-xs text-slate-300 leading-relaxed">
            Reach out for showroom partnerships, private test drive appointments, or technical feedback on the WebAR experience.
          </p>

          <div className="space-y-3 pt-2 text-xs text-slate-400 font-mono">
            <div className="flex items-center gap-3">
              <Mail className="w-4 h-4 text-cyan-400" />
              <span>contact@ardrive.project</span>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="w-4 h-4 text-cyan-400" />
              <span>+91 98765 43210</span>
            </div>
            <div className="flex items-center gap-3">
              <GraduationCap className="w-4 h-4 text-cyan-400" />
              <span>Department of Computer Science & Engineering</span>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="lg:col-span-7 glass-panel p-6 sm:p-8 rounded-3xl border border-white/10 space-y-4">
          {contactSubmitted ? (
            <div className="p-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-center space-y-3">
              <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto" />
              <h4 className="font-['Orbitron',sans-serif] text-base font-bold text-white">
                Thank you! Your enquiry has been received.
              </h4>
              <p className="text-xs text-slate-300">
                We will get back to you shortly regarding your interested vehicle.
              </p>
            </div>
          ) : (
            <form onSubmit={handleContactSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Name *</label>
                  <input
                    type="text"
                    required
                    value={contactName}
                    onChange={(e) => setContactName(e.target.value)}
                    placeholder="Your Name"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-white text-xs focus:outline-none focus:border-cyan-400"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Email *</label>
                  <input
                    type="email"
                    required
                    value={contactEmail}
                    onChange={(e) => setContactEmail(e.target.value)}
                    placeholder="email@example.com"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-white text-xs focus:outline-none focus:border-cyan-400"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Phone</label>
                  <input
                    type="tel"
                    value={contactPhone}
                    onChange={(e) => setContactPhone(e.target.value)}
                    placeholder="+91 Phone Number"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-white text-xs focus:outline-none focus:border-cyan-400"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Interested Car</label>
                  <select
                    value={interestedCar}
                    onChange={(e) => setInterestedCar(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-white text-xs focus:outline-none focus:border-cyan-400"
                  >
                    {CARS_DATA.map((c) => (
                      <option key={c.id} value={`${c.brand} ${c.model}`}>
                        {c.brand} {c.model}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Message</label>
                <textarea
                  rows="3"
                  value={contactMessage}
                  onChange={(e) => setContactMessage(e.target.value)}
                  placeholder="I would like to enquire about..."
                  className="w-full p-3 rounded-xl bg-slate-900 border border-white/10 text-white text-xs focus:outline-none focus:border-cyan-400"
                />
              </div>

              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-xs uppercase tracking-wider text-black bg-cyan-400 hover:bg-cyan-300 transition-all shadow-[0_0_15px_rgba(0,210,255,0.3)]"
              >
                <Send className="w-4 h-4 text-black" />
                <span>Send Enquiry</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
