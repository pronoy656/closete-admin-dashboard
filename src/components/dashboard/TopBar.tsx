"use client";
import { Bell, Settings, Search } from "lucide-react";
import Image from "next/image";

export default function TopBar() {
  return (
    <div className="flex items-center justify-between px-6 py-4 bg-black sticky top-0 z-10 h-20">
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
  );
}
