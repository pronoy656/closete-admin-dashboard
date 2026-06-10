"use client";
import React, { createContext, useContext, useState, ReactNode } from "react";

export type Order = {
  id: string;
  item: { name: string; desc: string; image: string; price: string };
  seller: { name: string; phone: string; location: string };
  buyer: { name: string; phone: string; location: string };
  pickup: string;
  delivery: string;
  status: string;
  statusColor: string;
  statusBg: string;
  dotColor: string;
  progress: number;
  note?: string;
  aiAnalysis?: {
    fakePercent: number;
    originalPercent: number;
    reason?: string;
  };
  issue?: {
    reason: string;
    notes?: string;
    createdAt: string;
    referenceId: string;
    responses: { role: string; text: string; time: string }[];
  };
};

const initialOrders: Order[] = [
  {
    id: "#347892",
    item: { name: "Gucci Diana Tote", desc: "Black Leather • Bamboo Handle", image: "/gucchi-bag.webp", price: "AED 3,200" },
    seller: { name: "Kim Kardashian", phone: "+1 (626) 389-2743", location: "Calabasas, CA" },
    buyer: { name: "Gigi Hadid", phone: "+1 (145) 125-3622", location: "New York, NY" },
    pickup: "Today • 11 AM-2 PM",
    delivery: "Tomorrow",
    status: "Verified",
    statusColor: "text-purple-400",
    statusBg: "bg-purple-400/10",
    dotColor: "bg-purple-400",
    progress: 2,
    note: "Item is in excellent condition with minimal signs of wear on the handle.",
    aiAnalysis: { fakePercent: 5, originalPercent: 95 }
  },
  {
    id: "#234892",
    item: { name: "Louis Vuitton Neverfull", desc: "Monogram Canvas", image: "/dior-bag.webp", price: "AED 4,500" },
    seller: { name: "Hailey Bieber", phone: "+1 (626) 389-2743", location: "Calabasas, CA" },
    buyer: { name: "Kendall Jenner", phone: "+1 (145) 125-3622", location: "New York, NY" },
    pickup: "Today • 3-6 PM",
    delivery: "Tomorrow",
    status: "Collected",
    statusColor: "text-blue-400",
    statusBg: "bg-blue-400/10",
    dotColor: "bg-blue-400",
    progress: 1,
    note: "Minor scuff marks on the bottom corners, otherwise pristine.",
    aiAnalysis: { fakePercent: 8, originalPercent: 92 }
  },
  {
    id: "#958743",
    item: { name: "Dior Book Tote", desc: "Oblique Embroidery", image: "/dior-bag.webp", price: "AED 5,200" },
    seller: { name: "Kylie Jenner", phone: "+1 (626) 389-2743", location: "Hidden Hills, CA" },
    buyer: { name: "Bella Hadid", phone: "+1 (145) 125-3622", location: "New York, NY" },
    pickup: "Today • 10 AM-1 PM",
    delivery: "Tomorrow",
    status: "Reserved",
    statusColor: "text-yellow-500",
    statusBg: "bg-yellow-500/10",
    dotColor: "bg-yellow-500",
    progress: 0,
    note: "Inconsistent stitching pattern and incorrect font alignment on the inner logo.",
    aiAnalysis: { fakePercent: 85, originalPercent: 15, reason: "Inconsistent stitching pattern and incorrect font alignment on the inner logo." }
  },
  {
    id: "#495873",
    item: { name: "Prada Re-Edition 2005", desc: "Nylon • Silver Hardware", image: "/gucchi-bag.webp", price: "AED 2,800" },
    seller: { name: "Olivia Rodrigo", phone: "+1 (626) 389-2743", location: "Beverly Hills, CA" },
    buyer: { name: "Selena Gomez", phone: "+1 (145) 125-3622", location: "New York, NY" },
    pickup: "Today • 1-4 PM",
    delivery: "Tomorrow",
    status: "Verified",
    statusColor: "text-purple-400",
    statusBg: "bg-purple-400/10",
    dotColor: "bg-purple-400",
    progress: 2,
    note: "Comes with original dust bag and authenticity card.",
    aiAnalysis: { fakePercent: 2, originalPercent: 98 }
  },
  {
    id: "#873927",
    item: { name: "Classic Flap Bag", desc: "Black Caviar Leather • Gold Hardware", image: "/dior-bag.webp", price: "AED 45,000" },
    seller: { name: "Emma Richards", phone: "+1 (626) 389-2743", location: "Beverly Hills, CA" },
    buyer: { name: "Rachel Miller", phone: "+1 (145) 125-3622", location: "New York, NY" },
    pickup: "Today • 4-7 PM",
    delivery: "Tomorrow",
    status: "Issue",
    statusColor: "text-red-500",
    statusBg: "bg-red-500/10",
    dotColor: "bg-red-500",
    progress: 1,
    note: "Visible scratches reported on the hardware. Buyer declined acceptance at delivery.",
    aiAnalysis: { fakePercent: 60, originalPercent: 40, reason: "Hardware engraving depth does not match authentic pieces from the reported year of production." },
    issue: {
      reason: "Item failed verification",
      notes: "The bag has deep scratches on the back that were not disclosed in the original listing.",
      createdAt: "Today, 4:23 PM",
      referenceId: "#RP-992-K",
      responses: [
        { role: "Buyer", text: "Requested refund due to undisclosed damage.", time: "Today, 4:23 PM" },
        { role: "Admin", text: "Verification failed. Item flagged for review.", time: "Today, 4:45 PM" },
      ]
    }
  },
  {
    id: "#235689",
    item: { name: "Celine Boston Bag", desc: "Macadam Canvas", image: "/gucchi-bag.webp", price: "AED 1,500" },
    seller: { name: "Blake Lively", phone: "+1 (626) 389-2743", location: "New York, NY" },
    buyer: { name: "Ryan Reynolds", phone: "+1 (145) 125-3622", location: "New York, NY" },
    pickup: "Today • 9 AM-12 PM",
    delivery: "Tomorrow",
    status: "Collected",
    statusColor: "text-blue-400",
    statusBg: "bg-blue-400/10",
    dotColor: "bg-blue-400",
    progress: 1,
    note: "Some discoloration on the interior lining, exterior looks great.",
    aiAnalysis: { fakePercent: 12, originalPercent: 88 }
  },
  {
    id: "#578932",
    item: { name: "Fendi Baguette", desc: "Zucca Canvas", image: "/dior-bag.webp", price: "AED 2,100" },
    seller: { name: "Sarah Jessica Parker", phone: "+1 (626) 389-2743", location: "New York, NY" },
    buyer: { name: "Carrie Bradshaw", phone: "+1 (145) 125-3622", location: "New York, NY" },
    pickup: "Today • 6-9 PM",
    delivery: "Tomorrow",
    status: "Delivered",
    statusColor: "text-green-500",
    statusBg: "bg-green-500/10",
    dotColor: "bg-green-500",
    progress: 3,
    note: "Perfect condition, barely used. Original packaging included.",
    aiAnalysis: { fakePercent: 4, originalPercent: 96 }
  },
];

type OrdersContextType = {
  orders: Order[];
  advanceOrder: (orderId: string) => void;
  getOrderById: (orderId: string) => Order | undefined;
};

const OrdersContext = createContext<OrdersContextType | null>(null);

export function useOrders() {
  const ctx = useContext(OrdersContext);
  if (!ctx) throw new Error("useOrders must be used within OrdersProvider");
  return ctx;
}

export function OrdersProvider({ children }: { children: ReactNode }) {
  const [orders, setOrders] = useState<Order[]>(initialOrders);

  const advanceOrder = (orderId: string) => {
    setOrders(prev => prev.map(o => {
      if (o.id !== orderId) return o;
      const nextProgress = o.progress + 1;
      if (nextProgress > 3) return o;

      let newStatus = o.status;
      let newStatusBg = o.statusBg;
      let newStatusColor = o.statusColor;
      let newDotColor = o.dotColor;

      if (nextProgress === 1) {
        newStatus = "Collected";
        newStatusColor = "text-blue-400";
        newStatusBg = "bg-blue-400/10";
        newDotColor = "bg-blue-400";
      } else if (nextProgress === 2) {
        newStatus = "Verified";
        newStatusColor = "text-purple-400";
        newStatusBg = "bg-purple-400/10";
        newDotColor = "bg-purple-400";
      } else if (nextProgress === 3) {
        newStatus = "Delivered";
        newStatusColor = "text-green-500";
        newStatusBg = "bg-green-500/10";
        newDotColor = "bg-green-500";
      }

      return { ...o, progress: nextProgress, status: newStatus, statusColor: newStatusColor, statusBg: newStatusBg, dotColor: newDotColor };
    }));
  };

  const getOrderById = (orderId: string) => orders.find(o => o.id === orderId);

  return (
    <OrdersContext.Provider value={{ orders, advanceOrder, getOrderById }}>
      {children}
    </OrdersContext.Provider>
  );
}
