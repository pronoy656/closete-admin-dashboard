"use client";
import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import {
  FileText,
  Clock,
  PackageCheck,
  ShieldCheck,
  Truck,
  AlertCircle,
  LogOut,
  X
} from "lucide-react";

const items = [
  { href: "/all-orders", label: "All Orders", Icon: FileText },
  { href: "/awaiting-collection", label: "Awaiting Collection", Icon: Clock },
  { href: "/collected", label: "Collected", Icon: PackageCheck },
  { href: "/verified", label: "Verified", Icon: ShieldCheck },
  { href: "/delivered", label: "Delivered", Icon: Truck },
  { href: "/issues", label: "Issues", Icon: AlertCircle },
];

interface SidebarProps {
  active?: string;
  mobileOpen?: boolean;
  onMobileClose?: () => void;
}

export default function Sidebar({ active, mobileOpen = false, onMobileClose }: SidebarProps) {
  const pathname = usePathname();
  const current = active ?? pathname ?? "";

  const navContent = (
    <>
      <nav className="flex-1 px-3 py-4 space-y-3">
        {items.map((item) => {
          const isActive = current === item.href || current.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onMobileClose}
              className={cn(
                "flex items-center gap-3.5 px-3 py-3.5 text-sm font-medium transition-colors rounded-xl",
                isActive
                  ? "bg-gold-gradient text-black shadow-lg shadow-[#D6A042]/20"
                  : "text-[#8C8C8C] hover:bg-white/5 hover:text-white"
              )}
            >
              <item.Icon className={cn("h-5 w-5 shrink-0", isActive ? "text-black" : "text-[#8C8C8C]")} />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="p-3 mt-auto">
        <Link
          href="/"
          className="flex items-center gap-3 px-3 py-3 text-sm font-medium transition-colors rounded-xl text-red-500/80 hover:bg-red-500/10 hover:text-red-500"
        >
          <LogOut className="h-5 w-5" />
          <span>Logout</span>
        </Link>
      </div>
    </>
  );

  return (
    <>
      {/* Desktop Sidebar — always visible on md+ */}
      <aside className="hidden md:flex h-screen w-56 bg-black text-[#A2A2A2] fixed left-0 top-0 flex-col z-30">
        <div className="p-6 pb-4">
          <span className="text-3xl font-serif text-gold-gradient tracking-wide">Closeté</span>
        </div>
        {navContent}
      </aside>

      {/* Mobile Overlay + Drawer */}
      {mobileOpen && (
        <div className="md:hidden fixed inset-0 z-40 flex">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={onMobileClose}
          />
          {/* Drawer */}
          <aside className="relative w-64 max-w-[80vw] bg-[#0D0D0F] border-r border-white/5 flex flex-col h-full z-50">
            {/* Close button */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-white/5">
              <span className="text-3xl font-serif text-gold-gradient tracking-wide">Closeté</span>
              <button
                onClick={onMobileClose}
                className="w-8 h-8 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 transition-colors"
              >
                <X className="w-4 h-4 text-white" />
              </button>
            </div>
            {navContent}
          </aside>
        </div>
      )}
    </>
  );
}
