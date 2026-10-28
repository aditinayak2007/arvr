import React, { useState } from 'react';
import { 
  X, 
  Sparkles, 
  Calendar, 
  Clock, 
  User, 
  Mail, 
  Phone, 
  Car, 
  CheckCircle2, 
  Glasses, 
  Send 
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { CARS_DATA } from '../data/cars';
import { saveTestDriveBooking } from '../utils/storage';

export default function TestDriveModal({
  isOpen,
  onClose,
  initialCarId = null
}) {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [selectedCarId, setSelectedCarId] = useState(initialCarId || CARS_DATA[0].id);
  const [preferredDate, setPreferredDate] = useState('');
  const [preferredTime, setPreferredTime] = useState('11:00 AM');
  const [vrDevice, setVrDevice] = useState('web-ar');
  const [message, setMessage] = useState('');
  
  const [errors, setErrors] = useState({});
  const [submittedData, setSubmittedData] = useState(null);

  if (!isOpen) return null;

  const validate = () => {
    const errs = {};
    if (!fullName.trim()) errs.fullName = 'Full Name is required';
    if (!email.trim() || !/\S+@\S+\.\S+/.test(email)) errs.email = 'Valid Email is required';
    if (!phone.trim() || phone.length < 8) errs.phone = 'Valid Phone Number is required';
    if (!preferredDate) errs.preferredDate = 'Please select a date';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    const car = CARS_DATA.find((c) => c.id === selectedCarId);

    const bookingPayload = {
      fullName,
      email,
      phone,
      carId: selectedCarId,
      carName: `${car?.brand} ${car?.model}`,
      preferredDate,
      preferredTime,
      vrDevice,
      message,
    };

    const saved = saveTestDriveBooking(bookingPayload);
    setSubmittedData(saved);

    // Trigger celebration confetti
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#00d2ff', '#38bdf8', '#ffffff', '#6366f1']
      });
    } catch (err) {
      // ignore
    }
  };

  const resetAndClose = () => {
    setSubmittedData(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg glass-panel p-6 sm:p-8 rounded-3xl border border-white/15 shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={resetAndClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-white/[0.06] hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
          title="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {submittedData ? (
          /* Submission Success State */
          <div className="py-6 text-center space-y-5">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center mx-auto text-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.3)]">
              <CheckCircle2 className="w-9 h-9" />
            </div>

            <div className="space-y-2">
              <h3 className="font-['Orbitron',sans-serif] text-xl font-bold text-white">
                Virtual Test Drive Requested!
              </h3>
              <p className="text-sm text-slate-300">
                Thank you, <span className="font-semibold text-white">{submittedData.fullName}</span>! Your virtual test drive request has been submitted.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-black/50 border border-white/10 text-xs text-left space-y-2 font-mono">
              <div className="flex justify-between">
                <span className="text-slate-400">Booking Ref:</span>
                <span className="text-cyan-400 font-bold">{submittedData.id}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Vehicle:</span>
                <span className="text-white">{submittedData.carName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Schedule:</span>
                <span className="text-white">{submittedData.preferredDate} at {submittedData.preferredTime}</span>
              </div>
            </div>

            <p className="text-xs text-slate-400">
              Our digital showroom concierge will send a session calendar invite and WebAR room link to <span className="text-white">{submittedData.email}</span>.
            </p>

            <button
              onClick={resetAndClose}
              className="w-full py-3 rounded-xl font-bold text-xs uppercase tracking-wider text-black bg-cyan-400 hover:bg-cyan-300 transition-all shadow-lg"
            >
              Back to Showroom
            </button>
          </div>
        ) : (
          /* Booking Form */
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Modal Heading */}
            <div className="space-y-1">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono uppercase bg-cyan-500/10 text-cyan-300 border border-cyan-500/30">
                <Sparkles className="w-3 h-3 text-cyan-400" />
                Next-Gen Experience
              </div>
              <h3 className="font-['Orbitron',sans-serif] text-xl font-bold text-white">
                Book a Virtual Test Drive
              </h3>
              <p className="text-xs text-slate-400">
                Schedule a 1-on-1 guided WebAR walkaround & virtual cockpit session.
              </p>
            </div>

            <div className="space-y-3.5">
              {/* Full Name */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Full Name *
                </label>
                <div className="relative">
                  <User className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Aditi Nayak"
                    className="w-full pl-10 pr-3 py-2.5 rounded-xl bg-slate-900/80 border border-white/10 text-white text-xs focus:outline-none focus:border-cyan-400"
                  />
                </div>
                {errors.fullName && <p className="text-[10px] text-rose-400 mt-1">{errors.fullName}</p>}
              </div>

              {/* Email & Phone Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Email Address *
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="aditi@example.com"
                      className="w-full pl-10 pr-3 py-2.5 rounded-xl bg-slate-900/80 border border-white/10 text-white text-xs focus:outline-none focus:border-cyan-400"
                    />
                  </div>
                  {errors.email && <p className="text-[10px] text-rose-400 mt-1">{errors.email}</p>}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Phone Number *
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+91 98765 43210"
                      className="w-full pl-10 pr-3 py-2.5 rounded-xl bg-slate-900/80 border border-white/10 text-white text-xs focus:outline-none focus:border-cyan-400"
                    />
                  </div>
                  {errors.phone && <p className="text-[10px] text-rose-400 mt-1">{errors.phone}</p>}
                </div>
              </div>

              {/* Select Car */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Select Vehicle *
                </label>
                <div className="relative">
                  <Car className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
                  <select
                    value={selectedCarId}
                    onChange={(e) => setSelectedCarId(e.target.value)}
                    className="w-full pl-10 pr-3 py-2.5 rounded-xl bg-slate-900/80 border border-white/10 text-white text-xs focus:outline-none focus:border-cyan-400"
                  >
                    {CARS_DATA.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.brand} {c.model} ({c.priceDisplay})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Date & Time Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Preferred Date *
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
                    <input
                      type="date"
                      value={preferredDate}
                      min={new Date().toISOString().split('T')[0]}
                      onChange={(e) => setPreferredDate(e.target.value)}
                      className="w-full pl-10 pr-3 py-2.5 rounded-xl bg-slate-900/80 border border-white/10 text-white text-xs focus:outline-none focus:border-cyan-400"
                    />
                  </div>
                  {errors.preferredDate && <p className="text-[10px] text-rose-400 mt-1">{errors.preferredDate}</p>}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Time Slot
                  </label>
                  <div className="relative">
                    <Clock className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
                    <select
                      value={preferredTime}
                      onChange={(e) => setPreferredTime(e.target.value)}
                      className="w-full pl-10 pr-3 py-2.5 rounded-xl bg-slate-900/80 border border-white/10 text-white text-xs focus:outline-none focus:border-cyan-400"
                    >
                      <option value="10:00 AM">10:00 AM - Morning</option>
                      <option value="12:00 PM">12:00 PM - Midday</option>
                      <option value="03:00 PM">03:00 PM - Afternoon</option>
                      <option value="05:30 PM">05:30 PM - Evening</option>
                      <option value="08:00 PM">08:00 PM - Night Session</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* VR / AR Platform preference */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Visualization Platform
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'web-ar', label: 'Mobile WebAR' },
                    { id: 'desktop-3d', label: 'Desktop 3D' },
                    { id: 'vr-headset', label: 'VR Headset' },
                  ].map((p) => (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => setVrDevice(p.id)}
                      className={`py-2 px-2 rounded-xl text-[11px] font-medium border text-center transition-all ${
                        vrDevice === p.id
                          ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300'
                          : 'bg-slate-900/40 border-white/5 text-slate-400 hover:text-white'
                      }`}
                    >
                      {p.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Message / Special requests */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Message / Inquiries (Optional)
                </label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows="2"
                  placeholder="I'm interested in the electric range and AR cockpit visualization..."
                  className="w-full p-2.5 rounded-xl bg-slate-900/80 border border-white/10 text-white text-xs focus:outline-none focus:border-cyan-400"
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-xs uppercase tracking-wider text-black bg-gradient-to-r from-cyan-400 to-sky-300 hover:from-cyan-300 shadow-[0_0_20px_rgba(0,210,255,0.35)] transition-all active:scale-95"
            >
              <Send className="w-4 h-4 text-black" />
              <span>Request Virtual Test Drive</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
