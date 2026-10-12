"use client";
import React, { useState, useEffect } from "react";
import {
  Settings,
  Volume2,
  VolumeX,
  RefreshCw,
  Percent,
  CreditCard,
  Server,
  Check,
  X,
} from "lucide-react";

// Synthesized gentle notification chime
function playPreviewChime() {
  try {
    const AudioCtx =
      window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    const now = ctx.currentTime;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = "sine";
    osc.frequency.setValueAtTime(587.33, now);
    osc.frequency.exponentialRampToValueAtTime(880, now + 0.12);

    gain.gain.setValueAtTime(0.08, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.4);
  } catch (e) {
    console.warn("Audio preview not available:", e);
  }
}

export default function TopBarSettings() {
  const [isOpen, setIsOpen] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [refreshInterval, setRefreshInterval] = useState("60");
  const [saveSuccess, setSaveSuccess] = useState(false);

  useEffect(() => {
    try {
      const storedSound = localStorage.getItem("closete_sound_alerts");
      if (storedSound !== null) {
        setSoundEnabled(storedSound === "true");
      }
      const storedInterval = localStorage.getItem("closete_refresh_interval");
      if (storedInterval !== null) {
        setRefreshInterval(storedInterval);
      }
    } catch {}
  }, []);

  const handleToggleSound = () => {
    const nextVal = !soundEnabled;
    setSoundEnabled(nextVal);
    if (nextVal) {
      playPreviewChime();
    }
  };

  const handleSave = () => {
    try {
      localStorage.setItem("closete_sound_alerts", String(soundEnabled));
      localStorage.setItem("closete_refresh_interval", refreshInterval);
      setSaveSuccess(true);
      setTimeout(() => {
        setSaveSuccess(false);
        setIsOpen(false);
      }, 600);
    } catch {
      setIsOpen(false);
    }
  };

  return (
    <>
      {/* Gear Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="h-10 w-10 rounded-full bg-[#1A1A1D] border border-white/5 flex items-center justify-center hover:bg-white/10 transition-colors text-white focus:outline-none"
        aria-label="Settings"
        title="Settings"
      >
        <Settings className="h-4.5 w-4.5 text-[#CCCCCC]" />
      </button>

      {/* Settings Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-150">
          <div
            className="w-full max-w-md rounded-xl bg-[#141416] border border-white/10 shadow-2xl overflow-hidden flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="px-5 py-4 border-b border-white/5 flex items-center justify-between bg-[#18181A]">
              <div>
                <h3 className="text-sm font-semibold text-white tracking-wide">
                  Settings & Preferences
                </h3>
                <p className="text-xs text-[#8C8C8C]">
                  Operational preferences and diagnostics
                </p>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="w-7 h-7 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center text-[#A1A1AA] hover:text-white transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-5 space-y-5 max-h-[75vh] overflow-y-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
              {/* Section 1: Audio & Refresh */}
              <div className="space-y-3">
                <span className="text-[11px] font-medium text-[#777777] uppercase tracking-wider block">
                  Alerts & Automation
                </span>

                {/* Sound Chime Toggle */}
                <div className="flex items-center justify-between p-3 rounded-lg bg-white/[0.02] border border-white/5">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-[#CCCCCC]">
                      {soundEnabled ? (
                        <Volume2 className="w-4 h-4 text-[#FFAF2C]" />
                      ) : (
                        <VolumeX className="w-4 h-4 text-[#666666]" />
                      )}
                    </div>
                    <div>
                      <span className="text-xs font-medium text-white block">
                        Sound for Alerts
                      </span>
                      <span className="text-[11px] text-[#8C8C8C]">
                        Audio tone on new operations updates
                      </span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={handleToggleSound}
                    className={`w-11 h-6 flex items-center rounded-full p-0.5 transition-colors ${
                      soundEnabled ? "bg-[#FFAF2C]" : "bg-white/10"
                    }`}
                  >
                    <div
                      className={`bg-black w-5 h-5 rounded-full shadow-sm transform transition-transform ${
                        soundEnabled ? "translate-x-5" : "translate-x-0"
                      }`}
                    />
                  </button>
                </div>

                {/* Auto Refresh Interval */}
                <div className="flex items-center justify-between p-3 rounded-lg bg-white/[0.02] border border-white/5">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-[#CCCCCC]">
                      <RefreshCw className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-xs font-medium text-white block">
                        Auto Sync Frequency
                      </span>
                      <span className="text-[11px] text-[#8C8C8C]">
                        Background refresh frequency
                      </span>
                    </div>
                  </div>

                  <select
                    value={refreshInterval}
                    onChange={(e) => setRefreshInterval(e.target.value)}
                    className="bg-[#18181A] border border-white/10 text-white text-xs rounded-md px-2.5 py-1.5 focus:outline-none focus:border-[#FFAF2C]/60"
                  >
                    <option value="0">Manual Only</option>
                    <option value="30">Every 30s</option>
                    <option value="60">Every 60s</option>
                    <option value="120">Every 2 min</option>
                  </select>
                </div>
              </div>

              {/* Section 2: Platform Rates & Payouts */}
              <div className="space-y-2.5 pt-2 border-t border-white/5">
                <span className="text-[11px] font-medium text-[#777777] uppercase tracking-wider block">
                  Platform Marketplace
                </span>

                <div className="grid grid-cols-2 gap-2.5">
                  <div className="p-3 rounded-lg bg-white/[0.02] border border-white/5">
                    <div className="flex items-center gap-1.5 text-[#8C8C8C] mb-1">
                      <Percent className="w-3.5 h-3.5" />
                      <span className="text-[11px]">Platform Fee</span>
                    </div>
                    <div className="text-base font-semibold text-white">12%</div>
                    <span className="text-[10px] text-[#666666]">
                      Standard consignment
                    </span>
                  </div>

                  <div className="p-3 rounded-lg bg-white/[0.02] border border-white/5">
                    <div className="flex items-center gap-1.5 text-[#8C8C8C] mb-1">
                      <CreditCard className="w-3.5 h-3.5" />
                      <span className="text-[11px]">Payout Engine</span>
                    </div>
                    <div className="text-xs font-medium text-white flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                      Connected
                    </div>
                    <span className="text-[10px] text-[#666666]">
                      Stripe Connect
                    </span>
                  </div>
                </div>
              </div>

              {/* Section 3: System Health */}
              <div className="space-y-2 pt-2 border-t border-white/5 text-xs">
                <span className="text-[11px] font-medium text-[#777777] uppercase tracking-wider block">
                  System Diagnostics
                </span>

                <div className="p-3 rounded-lg bg-white/[0.02] border border-white/5 space-y-1.5 text-[11px]">
                  <div className="flex items-center justify-between">
                    <span className="text-[#8C8C8C] flex items-center gap-1.5">
                      <Server className="w-3 h-3 text-[#FFAF2C]" />
                      Backend API
                    </span>
                    <span className="text-[#CCCCCC] font-medium flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                      Operational
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-[#8C8C8C]">Dashboard Version</span>
                    <span className="text-white font-mono">v1.0.10</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="px-5 py-3 border-t border-white/5 bg-[#18181A] flex items-center justify-end gap-2.5">
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="px-3.5 py-1.5 rounded-lg text-xs font-medium text-[#8C8C8C] hover:text-white transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSave}
                disabled={saveSuccess}
                className="px-4 py-1.5 rounded-lg text-xs font-medium bg-[#FFAF2C] text-black hover:bg-[#FFC86B] transition-colors flex items-center gap-1.5"
              >
                {saveSuccess ? (
                  <>
                    <Check className="w-3.5 h-3.5" />
                    <span>Saved</span>
                  </>
                ) : (
                  <span>Save Changes</span>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
