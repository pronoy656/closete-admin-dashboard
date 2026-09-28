"use client";
import React from "react";
import { Menu } from "lucide-react";

// Exact SVG Icons from "Closete UI Design File (1)"
function NotificationIcon({ className }: { className?: string }) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M12 6.43945V9.76945"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
      />
      <path
        d="M12.0189 2C8.33892 2 5.35892 4.98 5.35892 8.66V10.76C5.35892 11.44 5.07892 12.46 4.72892 13.04L3.45892 15.16C2.67892 16.47 3.21892 17.93 4.65892 18.41C9.43892 20 14.6089 20 19.3889 18.41C20.7389 17.96 21.3189 16.38 20.5889 15.16L19.3189 13.04C18.9689 12.46 18.6889 11.43 18.6889 10.76V8.66C18.6789 5 15.6789 2 12.0189 2Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
      />
      <path
        d="M15.3279 18.8203C15.3279 20.6503 13.8279 22.1503 11.9979 22.1503C11.0879 22.1503 10.2479 21.7703 9.64797 21.1703C9.04797 20.5703 8.66797 19.7303 8.66797 18.8203"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeMiterlimit="10"
      />
    </svg>
  );
}

function SettingsIcon({ className }: { className?: string }) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M3 9.10938V14.8794C3 16.9994 3 16.9994 5 18.3494L10.5 21.5294C11.33 22.0094 12.68 22.0094 13.5 21.5294L19 18.3494C21 16.9994 21 16.9994 21 14.8894V9.10938C21 6.99938 21 6.99938 19 5.64938L13.5 2.46937C12.68 1.98937 11.33 1.98937 10.5 2.46937L5 5.64938C3 6.99938 3 6.99938 3 9.10938Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

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
            aria-label="Open menu"
          >
            <Menu className="h-6 w-6 text-white" />
          </button>
        </div>
      </div>

      {/* Desktop TopBar — visible on md+ (No search bar, exactly as requested) */}
      <div className="hidden md:flex items-center justify-between px-6 py-4 bg-black sticky top-0 z-10 h-20 border-b border-white/5">
        <div className="text-xl font-semibold text-white">
          Active Operations
        </div>

        <div className="flex items-center gap-3">
          {/* Notification */}
          <button
            className="h-10 w-10 rounded-full bg-[#1A1A1D] flex items-center justify-center hover:bg-white/5 transition-colors text-white"
            aria-label="Notifications"
          >
            <NotificationIcon className="h-5 w-5 text-white" />
          </button>

          {/* Settings */}
          <button
            className="h-10 w-10 rounded-full bg-[#1A1A1D] flex items-center justify-center hover:bg-white/5 transition-colors text-white"
            aria-label="Settings"
          >
            <SettingsIcon className="h-5 w-5 text-white" />
          </button>

          {/* Avatar */}
          <div className="h-10 w-10 rounded-full bg-[#FFAF2C]/10 border-2 border-[#FFAF2C]/60 flex items-center justify-center text-[#FFAF2C] font-semibold text-sm">
            AD
          </div>
        </div>
      </div>
    </>
  );
}
