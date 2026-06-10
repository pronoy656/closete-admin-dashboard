"use client";
import { Input } from "@/components/ui/input";
import { Bell, Settings, Search } from "lucide-react";
import Image from "next/image";

export default function TopBar() {
  return (
    <div className="flex items-center justify-between px-8 py-4 border-b border-white/5 bg-[#141416] sticky top-0 z-10 h-20">
      <div className="text-xl font-semibold text-white">
        Active Operations
      </div>

      <div className="flex items-center gap-4">
     
        
        <button className="h-10 w-10 rounded-full bg-[#1A1A1D] border border-white/10 flex items-center justify-center hover:bg-white/5 transition-colors">
          <Bell className="h-4 w-4 text-white" />
        </button>
        
        <button className="h-10 w-10 rounded-full bg-[#1A1A1D] border border-white/10 flex items-center justify-center hover:bg-white/5 transition-colors">
          <Settings className="h-4 w-4 text-white" />
        </button>

        <button className="h-10 w-10 rounded-full overflow-hidden border border-[#E6B95F]/50">
          <Image src="/auth-hero.png" alt="User" width={40} height={40} className="object-cover h-full w-full" />
        </button>
      </div>
    </div>
  );
}
