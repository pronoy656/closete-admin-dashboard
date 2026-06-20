"use client";
import React, { useState } from "react";
import Sidebar from "@/components/dashboard/Sidebar";
import TopBar from "@/components/dashboard/TopBar";
import { OrdersProvider } from "@/context/OrdersContext";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  return (
    <OrdersProvider>
      <div className="min-h-screen bg-black text-white">
        {/* Sidebar — desktop fixed, mobile drawer */}
        <Sidebar
          mobileOpen={mobileSidebarOpen}
          onMobileClose={() => setMobileSidebarOpen(false)}
        />

        {/* Main content area */}
        <div className="md:ml-56 flex flex-col min-h-screen">
          {/* TopBar — passes toggle handler for mobile hamburger */}
          <TopBar onMenuToggle={() => setMobileSidebarOpen(true)} />
          <main className="px-3 sm:px-6 pt-3 pb-6 flex-1 bg-black">
            {children}
          </main>
        </div>
      </div>
    </OrdersProvider>
  );
}
