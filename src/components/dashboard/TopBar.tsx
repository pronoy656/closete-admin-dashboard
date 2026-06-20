"use client";
import { Bell, Settings, Menu } from "lucide-react";
import Image from "next/image";

interface TopBarProps {
  onMenuToggle?: () => void;
}

export default function TopBar({ onMenuToggle }: TopBarProps) {
  return (
    <>
      {/* Mobile TopBar — visible on < md */}
      <div className="md:hidden flex items-center justify-between px-4 py-3 bg-black sticky top-0 z-20 border-b border-white/5">
        {/* Text Logo */}
        <span className="text-3xl font-serif text-gold-gradient tracking-wide">Closeté</span>

        {/* Right: Hamburger only */}
        <div className="flex items-center">
          <button
            onClick={onMenuToggle}
            className="h-11 w-11 rounded-full bg-[#1A1A1D] flex items-center justify-center hover:bg-white/5 transition-colors"
          >
            <Menu className="h-6 w-6 text-white" />
          </button>
        </div>
      </div>

      {/* Desktop TopBar — visible on md+ */}
      <div className="hidden md:flex items-center justify-between px-6 py-4 bg-black sticky top-0 z-10 h-20 border-b border-white/5">
        <div className="text-xl font-semibold text-white">
          Active Operations
        </div>

        <div className="flex items-center gap-3">
          {/* Bell */}
          <button className="h-10 w-10 rounded-full bg-[#1A1A1D] flex items-center justify-center hover:bg-white/5 transition-colors">
            <Bell className="h-4 w-4 text-white" />
          </button>

          {/* Settings */}
          <button className="h-10 w-10 rounded-full bg-[#1A1A1D] flex items-center justify-center hover:bg-white/5 transition-colors">
            <Settings className="h-4 w-4 text-white" />
          </button>

          {/* Avatar */}
          <button className="h-10 w-10 rounded-full overflow-hidden border-2 border-[#FFAF2C]/60">
            <Image src="/auth-hero.png" alt="User" width={40} height={40} className="object-cover h-full w-full" />
          </button>
        </div>
      </div>
    </>
  );
}
