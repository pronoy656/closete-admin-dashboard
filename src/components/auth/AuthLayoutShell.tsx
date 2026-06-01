"use client";
import { PropsWithChildren } from "react";
import Image from "next/image";

type AuthLayoutShellProps = PropsWithChildren<{}>;

export default function AuthLayoutShell({
  children,
}: AuthLayoutShellProps) {
  return (
    <div className="min-h-screen bg-[#141416] text-white flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Background radial gradient effect */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[#B68A36]/10 blur-[120px] rounded-full pointer-events-none" />

      {/* Logo */}
      <div className="mb-12 z-10 flex flex-col items-center">
        <h1 className="text-5xl font-serif text-gold-gradient tracking-wide">
          Closeté
        </h1>
      </div>

      {/* Main Card */}
      <div className="w-full max-w-[480px] bg-[#1E1E21]/80 backdrop-blur-xl border border-white/5 rounded-3xl p-8 md:p-12 z-10 shadow-2xl relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[200px] h-[1px] bg-gradient-to-r from-transparent via-[#E6B95F]/50 to-transparent" />
        {children}
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
