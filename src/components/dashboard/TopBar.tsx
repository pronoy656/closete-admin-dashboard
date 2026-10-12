"use client";
import React from "react";
import { Menu } from "lucide-react";
import TopBarNotifications from "./TopBarNotifications";
import TopBarSettings from "./TopBarSettings";
import TopBarProfile from "./TopBarProfile";

interface TopBarProps {
  onMenuToggle?: () => void;
}

export default function TopBar({ onMenuToggle }: TopBarProps) {
  return (
    <>
      {/* Mobile TopBar — visible on < md */}
      <div className="md:hidden flex items-center justify-between px-4 py-3 bg-black sticky top-0 z-20 border-b border-white/5">
        {/* Text Logo */}
        <span className="text-3xl font-serif text-gold-gradient tracking-wide">
          Closeté
        </span>

        {/* Right: Quick alerts, Profile and Hamburger */}
        <div className="flex items-center gap-2">
          <TopBarNotifications />
          <TopBarProfile />
          <button
            onClick={onMenuToggle}
            className="h-10 w-10 rounded-full bg-[#1A1A1D] border border-white/5 flex items-center justify-center hover:bg-white/10 transition-colors ml-1 text-white"
            aria-label="Open menu"
          >
            <Menu className="h-5 w-5 text-white" />
          </button>
        </div>
      </div>

      {/* Desktop TopBar — visible on md+ */}
      <div className="hidden md:flex items-center justify-between px-6 py-4 bg-black sticky top-0 z-10 h-20 border-b border-white/5">
        <div className="text-xl font-semibold text-white tracking-wide">
          Active Operations
        </div>

        <div className="flex items-center gap-3">
          {/* Operational Notifications Popover */}
          <TopBarNotifications />

          {/* Operations & System Settings Modal */}
          <TopBarSettings />

          {/* Admin Profile Dropdown & Password Management */}
          <TopBarProfile />
        </div>
      </div>
    </>
  );
}
