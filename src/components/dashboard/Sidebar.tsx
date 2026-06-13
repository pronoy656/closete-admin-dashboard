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
  LogOut
} from "lucide-react";

const items = [
  { href: "/all-orders", label: "All Orders", Icon: FileText },
  { href: "/awaiting-collection", label: "Awaiting Collection", Icon: Clock },
  { href: "/collected", label: "Collected", Icon: PackageCheck },
  { href: "/verified", label: "Verified", Icon: ShieldCheck },
  { href: "/delivered", label: "Delivered", Icon: Truck },
  { href: "/issues", label: "Issues", Icon: AlertCircle },
];

export default function Sidebar({ active }: { active?: string }) {
  const pathname = usePathname();
  const current = active ?? pathname ?? "";

  return (
    <aside className="h-screen w-56 bg-black text-[#A2A2A2] fixed left-0 top-0 flex flex-col">
      <div className="p-6 pb-4">
        <img
          src="/Closeté.png"
          alt="Closeté Logo"
          width={90}
          height={40}
          className="w-[110px] h-[32px] object-contain"
        />
      </div>

      <nav className="flex-1 px-3 py-4 space-y-3">
        {items.map((item) => {
          const isActive = current === item.href || current.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
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
    </aside>
  );
}
