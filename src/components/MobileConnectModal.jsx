import React, { useState } from 'react';
import { 
  X, 
  Smartphone, 
  QrCode, 
  Copy, 
  Check, 
  Wifi, 
  Globe, 
  ExternalLink, 
  Sparkles, 
  Info,
  ShieldCheck,
  Columns,
  Share2
} from 'lucide-react';

export default function MobileConnectModal({ 
  isOpen, 
  onClose,
  onOpenSimulator 
}) {
  const [activeTab, setActiveTab] = useState('wifi'); // 'wifi' | 'public'
  const [copied, setCopied] = useState(false);

  // Local Hotspot / Wi-Fi URL (default IP of host machine on port 5173)
  const [wifiUrl, setWifiUrl] = useState('http://172.20.10.10:5173');

  const [publicUrl, setPublicUrl] = useState('https://discovered-thru-intended-console.trycloudflare.com');
  const tunnelPassword = '';

  if (!isOpen) return null;

  const currentActiveUrl = activeTab === 'wifi' ? wifiUrl : publicUrl;

  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=260x260&data=${encodeURIComponent(
    currentActiveUrl
  )}&bgcolor=080b12&color=00d2ff&margin=10`;

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'AR DRIVE - Virtual Car Showroom',
          text: 'Explore interactive 3D cars and experience WebAR on your mobile device!',
          url: currentActiveUrl,
        });
      } catch (err) {
        // user cancelled or share failed
      }
    } else {
      handleCopy(currentActiveUrl);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg glass-panel p-6 sm:p-8 rounded-3xl border border-cyan-500/40 shadow-2xl shadow-cyan-500/15 space-y-6 text-center max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-white/[0.06] hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
          title="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-mono font-bold uppercase bg-cyan-500/10 text-cyan-300 border border-cyan-400/30">
            <Smartphone className="w-3.5 h-3.5 text-cyan-400" />
            <span>Connect Multiple Mobile Devices</span>
          </div>

          <h3 className="font-['Orbitron',sans-serif] text-xl sm:text-2xl font-extrabold text-white">
            Open AR DRIVE on Any Phone
          </h3>

          <p className="text-xs text-slate-300">
            Connect iPhones, Android phones, or tablets simultaneously using Local Wi-Fi or Public Cloud HTTPS.
          </p>
        </div>

        {/* Connection Type Tabs */}
        <div className="grid grid-cols-2 gap-2 p-1.5 rounded-2xl bg-black/60 border border-white/10">
          <button
            onClick={() => setActiveTab('wifi')}
            className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl text-xs font-semibold transition-all ${
              activeTab === 'wifi'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/50 shadow-md font-bold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Wifi className="w-4 h-4 text-cyan-400" />
            <span>1. Local Wi-Fi Network</span>
          </button>

          <button
            onClick={() => setActiveTab('public')}
            className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl text-xs font-semibold transition-all ${
              activeTab === 'public'
                ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-400/50 shadow-md font-bold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Globe className="w-4 h-4 text-indigo-400" />
            <span>2. Worldwide HTTPS Cloud</span>
          </button>
        </div>

        {/* High-Contrast QR Code Display */}
        <div className="relative inline-block p-4 rounded-3xl bg-[#080b12] border-2 border-cyan-500/40 shadow-[0_0_30px_rgba(0,210,255,0.25)]">
          <img
            src={qrCodeUrl}
            alt="Scan QR code to open AR DRIVE on mobile"
            className="w-52 h-52 rounded-2xl mx-auto"
          />
          <div className="mt-2.5 text-[10px] text-cyan-400 font-mono flex items-center justify-center gap-1.5">
            {activeTab === 'wifi' ? (
              <>
                <Wifi className="w-3.5 h-3.5" />
                <span>Local Subnet: 192.168.1.107:5173</span>
              </>
            ) : (
              <>
                <Globe className="w-3.5 h-3.5 text-indigo-400" />
                <span className="text-indigo-300">Public SSL HTTPS • Works on 4G/5G Worldwide</span>
              </>
            )}
          </div>
        </div>

        {/* Dynamic Details based on Tab */}
        {activeTab === 'wifi' ? (
          /* Tab 1: Local Wi-Fi */
          <div className="space-y-3 text-left">
            <div className="space-y-1">
              <label className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
                Local Network URL (Same Wi-Fi):
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={wifiUrl}
                  onChange={(e) => setWifiUrl(e.target.value)}
                  className="flex-1 px-3.5 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-white font-mono text-xs focus:outline-none focus:border-cyan-400"
                />
                <button
                  onClick={() => handleCopy(wifiUrl)}
                  className="flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl text-xs font-semibold text-black bg-cyan-400 hover:bg-cyan-300 transition-all active:scale-95 shrink-0"
                >
                  {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  <span>{copied ? 'Copied' : 'Copy'}</span>
                </button>
              </div>
            </div>

            <div className="p-3 rounded-2xl bg-black/50 border border-white/10 text-[11px] text-slate-300 space-y-1">
              <div className="flex items-center gap-1.5 text-cyan-300 font-semibold">
                <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
                <span>Instant Zero-Lag Local Connection:</span>
              </div>
              <p className="text-slate-400 leading-relaxed text-[11px]">
                Any iPhone or Android phone connected to the same Wi-Fi router can scan this QR code or type <strong className="text-white">{wifiUrl}</strong> into their browser.
              </p>
            </div>
          </div>
        ) : (
          /* Tab 2: Public Cloud Tunnel */
          <div className="space-y-3 text-left">
            <div className="space-y-1">
              <label className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
                Public HTTPS Cloud Tunnel URL:
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={publicUrl}
                  onChange={(e) => setPublicUrl(e.target.value)}
                  className="flex-1 px-3.5 py-2.5 rounded-xl bg-slate-900 border border-indigo-500/30 text-white font-mono text-xs focus:outline-none focus:border-indigo-400"
                />
                <button
                  onClick={() => handleCopy(publicUrl)}
                  className="flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl text-xs font-semibold text-black bg-cyan-400 hover:bg-cyan-300 transition-all active:scale-95 shrink-0"
                >
                  {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  <span>{copied ? 'Copied' : 'Copy'}</span>
                </button>
              </div>
            </div>

            {/* Tunnel Password Alert Box */}
            <div className="p-3.5 rounded-2xl bg-indigo-950/40 border border-indigo-500/30 text-[11px] text-slate-300 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-indigo-300 flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-indigo-400" />
                  Tunnel Security Password:
                </span>
                <button
                  onClick={() => handleCopy(tunnelPassword)}
                  className="px-2 py-0.5 rounded bg-indigo-500/20 hover:bg-indigo-500/40 text-indigo-200 font-mono text-[10px] border border-indigo-500/30"
                >
                  Copy IP
                </button>
              </div>
              <div className="p-2 rounded-xl bg-black/60 font-mono font-bold text-center text-sm text-cyan-300 border border-white/10">
                {tunnelPassword}
              </div>
              <p className="text-slate-400 leading-relaxed text-[10px]">
                When opening on cellular 4G/5G or outside Wi-Fi, enter this IP password on the prompt screen once to start the session.
              </p>
            </div>
          </div>
        )}

        {/* Action Buttons: Simulator & Share */}
        <div className="pt-2 flex flex-col sm:flex-row gap-2.5">
          {onOpenSimulator && (
            <button
              onClick={() => {
                onClose();
                onOpenSimulator();
              }}
              className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-bold text-white bg-slate-800 hover:bg-slate-700 border border-white/15 transition-all"
            >
              <Columns className="w-4 h-4 text-cyan-400" />
              <span>Multi-Device Simulator (On-Screen)</span>
            </button>
          )}

          <button
            onClick={handleNativeShare}
            className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-300 bg-white/[0.06] hover:bg-white/10 border border-white/10 transition-all"
          >
            <Share2 className="w-4 h-4 text-cyan-400" />
            <span>Share Link</span>
          </button>
        </div>

        <button
          onClick={onClose}
          className="w-full py-2.5 rounded-xl text-xs font-semibold text-slate-400 hover:text-white transition-colors"
        >
          Close
        </button>
      </div>
    </div>
  );
}
