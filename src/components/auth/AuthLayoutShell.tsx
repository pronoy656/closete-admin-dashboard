"use client";
import { PropsWithChildren } from "react";
import Image from "next/image";

type AuthLayoutShellProps = PropsWithChildren<{}>;

export default function AuthLayoutShell({
  children,
}: AuthLayoutShellProps) {
  return (
    <div className="min-h-screen bg-[#141416] text-white flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Background radial gradient effect removed as per request */}

      {/* Logo */}
      <div className="mb-12 z-10 flex flex-col items-center">
        <h1 className="text-6xl font-serif text-gold-gradient tracking-wide">
          Closeté
        </h1>
      </div>

      {/* Main Card Wrapper */}
      <div className="w-full max-w-[480px] relative z-10">
        
        {/* Torch Light Behind Form */}
        <div 
          className="absolute top-[250px] left-1/2 -translate-x-1/2 -translate-y-full pointer-events-none -z-10 blur-[35px] opacity-100"
          style={{
            width: "402.55px",
            height: "290px",
            background: "linear-gradient(to top, rgba(255,175,44,0.8) 0%, rgba(255,175,44,0.4) 20%, rgba(255,175,44,0.05) 70%, transparent 100%)",
            clipPath: "polygon(15% 0, 85% 0, 50% 100%, 50% 100%)"
          }}
        />

        {/* Actual Form Card */}
        <div className="w-full bg-[#1E1E21]/80 backdrop-blur-xl border border-white/5 rounded-3xl p-8 md:p-12 shadow-2xl relative z-10">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[250px] h-[3px] bg-gradient-to-r from-transparent via-[#FFAF2C]/80 to-transparent shadow-[0_0_25px_rgba(255,175,44,0.8)]" />
          {children}
        </div>
      </div>

      {/* Footer */}
      <div className="mt-12 text-sm text-[#8C8C8C] flex gap-4 z-10">
        <span>Reserved</span>
        <span>•</span>
        <span>Verified</span>
        <span>•</span>
        <span>Delivered</span>
      </div>
    </div>
  );
}
