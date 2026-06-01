"use client";
import React, { useState } from "react";
import { Search, Calendar, ChevronDown, MoreHorizontal, Phone, MapPin, Check, ArrowRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

type Order = {
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
    progress: 2
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
    progress: 1
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
    progress: 0
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
    progress: 2
  },
  {
    id: "#873927",
    item: { name: "Hermès Birkin", desc: "Togo Leather • Gold Hardware", image: "/dior-bag.webp", price: "AED 45,000" },
    seller: { name: "Jennifer Aniston", phone: "+1 (626) 389-2743", location: "Beverly Hills, CA" },
    buyer: { name: "Angelina Jolie", phone: "+1 (145) 125-3622", location: "New York, NY" },
    pickup: "Today • 4-7 PM",
    delivery: "Tomorrow",
    status: "Issue",
    statusColor: "text-red-500",
    statusBg: "bg-red-500/10",
    dotColor: "bg-red-500",
    progress: 1
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
    progress: 1
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
    progress: 3
  },
];

export default function Overview() {
  const [ordersList, setOrdersList] = useState<Order[]>(initialOrders);
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);

  const selectedOrder = ordersList.find(o => o.id === selectedOrderId) || null;

  const handleProgress = () => {
    if (!selectedOrder) return;
    const nextProgress = selectedOrder.progress + 1;
    if (nextProgress > 3) return;

    let newStatus = selectedOrder.status;
    let newStatusBg = selectedOrder.statusBg;
    let newStatusColor = selectedOrder.statusColor;
    let newDotColor = selectedOrder.dotColor;

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

    setOrdersList(prev => prev.map(o => 
      o.id === selectedOrder.id 
        ? { ...o, progress: nextProgress, status: newStatus, statusColor: newStatusColor, statusBg: newStatusBg, dotColor: newDotColor }
        : o
    ));
  };

  return (
    <>
      <div className="w-full h-full text-white bg-[#1A1A1D] rounded-2xl border border-white/5 overflow-hidden">
        
        {/* Header */}
        <div className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/5">
          <h2 className="text-xl font-semibold">All Orders</h2>
          
          <div className="flex flex-wrap items-center gap-3">
            <div className="relative w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#8C8C8C]" />
              <Input 
                placeholder="Search orders.." 
                className="w-full bg-transparent border-white/10 rounded-full h-10 pl-10 text-sm focus-visible:ring-[#E6B95F]/30 text-white"
              />
            </div>
            
            <button className="flex items-center gap-2 h-10 px-4 rounded-full border border-white/10 text-sm font-medium hover:bg-white/5 transition-colors">
              <Calendar className="h-4 w-4 text-[#8C8C8C]" />
              <span>15 Jun, 2026</span>
              <ChevronDown className="h-4 w-4 text-[#8C8C8C] ml-2" />
            </button>
            
            <button className="flex items-center gap-2 h-10 px-4 rounded-full border border-white/10 text-sm font-medium hover:bg-white/5 transition-colors min-w-[100px] justify-between">
              <span>All</span>
              <ChevronDown className="h-4 w-4 text-[#8C8C8C]" />
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="w-full overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-[#8C8C8C] uppercase font-semibold border-b border-white/5 bg-[#141416]/50">
              <tr>
                <th className="px-6 py-5">ORDER ID</th>
                <th className="px-6 py-5">ITEM</th>
                <th className="px-6 py-5">SELLER</th>
                <th className="px-6 py-5">BUYER</th>
                <th className="px-6 py-5">PICKUP</th>
                <th className="px-6 py-5">DELIVERY</th>
                <th className="px-6 py-5">STATUS</th>
                <th className="px-6 py-5"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {ordersList.map((order, i) => (
                <tr key={i} className="hover:bg-white/[0.02] transition-colors group">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="font-semibold text-[#E6B95F]">{order.id}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded bg-white/10 flex-shrink-0 overflow-hidden">
                        <img src={order.item.image} alt={order.item.name} className="w-full h-full object-cover" />
                      </div>
                      <span className="font-medium text-[#EBEBEB] w-24 truncate">{order.item.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <span className="font-medium text-[#EBEBEB]">{order.seller.name}</span>
                      <span className="text-xs text-[#8C8C8C]">{order.seller.location}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <span className="font-medium text-[#EBEBEB]">{order.buyer.name}</span>
                      <span className="text-xs text-[#8C8C8C]">{order.buyer.location}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-[#8C8C8C]">
                    {order.pickup}
                  </td>
                  <td className="px-6 py-4 text-[#8C8C8C]">
                    {order.delivery}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium ${order.statusBg} ${order.statusColor}`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${order.dotColor}`}></span>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <button className="text-[#8C8C8C] hover:text-white transition-colors cursor-pointer outline-none">
                          <MoreHorizontal className="h-5 w-5" />
                        </button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="bg-[#1A1A1D] border border-white/10 text-white">
                        <DropdownMenuItem 
                          className="cursor-pointer hover:bg-white/5 focus:bg-white/5 focus:text-white text-sm"
                          onClick={() => setSelectedOrderId(order.id)}
                        >
                          View details
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Order Details Drawer */}
      <Sheet open={selectedOrder !== null} onOpenChange={(open) => !open && setSelectedOrderId(null)}>
        <SheetContent className="w-full sm:max-w-md bg-[#141416] border-l border-white/10 text-white p-0 overflow-y-auto [&>button]:right-6 [&>button]:top-6 [&>button]:text-white [&>button]:bg-transparent [&>button]:opacity-100 hover:[&>button]:bg-white/10 hover:[&>button]:rounded-full [&>button]:p-1">
          <div className="p-6">
            <SheetHeader className="flex flex-row items-center justify-between space-y-0 mb-6 mt-1">
              <SheetTitle className="text-xl font-semibold text-white">Order Details</SheetTitle>
            </SheetHeader>
            
            {/* Image */}
            <div className="w-full h-48 rounded-xl overflow-hidden mb-6">
              <img src={selectedOrder?.item.image} alt={selectedOrder?.item.name} className="w-full h-full object-cover" />
            </div>

            {/* Header Info */}
            <div className="flex justify-between items-start mb-2">
              <div>
                <div className="text-[#E6B95F] font-semibold mb-1">{selectedOrder?.id}</div>
                <h3 className="text-xl font-medium">{selectedOrder?.item.name}</h3>
                <p className="text-sm text-[#8C8C8C]">{selectedOrder?.item.desc}</p>
              </div>
              <div className="flex flex-col items-end">
                <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium ${selectedOrder?.statusBg} ${selectedOrder?.statusColor} mb-2`}>
                  <span className={`w-1.5 h-1.5 rounded-full ${selectedOrder?.dotColor}`}></span>
                  {selectedOrder?.status}
                </span>
                <span className="font-semibold">{selectedOrder?.item.price}</span>
              </div>
            </div>

            {/* Windows */}
            <div className="bg-[#1A1A1D] rounded-xl p-4 flex mt-6 mb-6">
              <div className="flex-1 border-r border-white/5 pr-4">
                <div className="text-xs text-[#8C8C8C] mb-1">Pickup Window</div>
                <div className="text-sm font-medium">{selectedOrder?.pickup.split('•').join('·')}</div>
              </div>
              <div className="flex-1 pl-4">
                <div className="text-xs text-[#8C8C8C] mb-1">Estimated Delivery</div>
                <div className="text-sm font-medium">{selectedOrder?.delivery}</div>
              </div>
            </div>

            {/* Seller / Buyer */}
            <div className="flex gap-4 mb-6">
              <div className="flex-1">
                <div className="text-xs text-[#8C8C8C] uppercase mb-2 font-medium">Seller</div>
                <div className="bg-[#1A1A1D] rounded-xl p-4">
                  <div className="font-medium mb-2">{selectedOrder?.seller.name}</div>
                  <div className="flex items-center gap-2 text-sm text-[#8C8C8C] mb-1">
                    <Phone className="w-4 h-4 shrink-0" /> <span className="truncate">{selectedOrder?.seller.phone}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-[#8C8C8C]">
                    <MapPin className="w-4 h-4 shrink-0" /> <span className="truncate">{selectedOrder?.seller.location}</span>
                  </div>
                </div>
              </div>
              <div className="flex-1">
                <div className="text-xs text-[#8C8C8C] uppercase mb-2 font-medium">Buyer</div>
                <div className="bg-[#1A1A1D] rounded-xl p-4">
                  <div className="font-medium mb-2">{selectedOrder?.buyer.name}</div>
                  <div className="flex items-center gap-2 text-sm text-[#8C8C8C] mb-1">
                    <Phone className="w-4 h-4 shrink-0" /> <span className="truncate">{selectedOrder?.buyer.phone}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-[#8C8C8C]">
                    <MapPin className="w-4 h-4 shrink-0" /> <span className="truncate">{selectedOrder?.buyer.location}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Progress */}
            <div className="mb-8">
              <div className="text-xs text-[#8C8C8C] uppercase mb-4 font-medium">Order Progress</div>
              <div className="bg-[#1A1A1D] rounded-xl p-5">
                <div className="relative border-l border-white/10 ml-3 space-y-6">
                  
                  {/* Reserved */}
                  <div className="relative pl-6">
                    <div className={`absolute -left-3.5 top-0.5 w-7 h-7 rounded-full flex items-center justify-center ${selectedOrder && selectedOrder.progress >= 0 ? 'bg-gold-gradient text-black shadow-[0_0_10px_rgba(230,185,95,0.3)]' : 'bg-[#27272A] border border-white/10'}`}>
                      {selectedOrder && selectedOrder.progress >= 0 ? <Check className="w-4 h-4 text-black" /> : <div className="w-2 h-2 rounded-full bg-[#8C8C8C]" />}
                    </div>
                    <div className={selectedOrder && selectedOrder.progress >= 0 ? "text-white font-medium text-sm mb-0.5" : "text-[#8C8C8C] text-sm mb-0.5"}>Reserved</div>
                    <div className="text-xs text-[#8C8C8C]">Item reserved for you</div>
                  </div>

                  {/* Collected */}
                  <div className="relative pl-6">
                    <div className={`absolute -left-3.5 top-0.5 w-7 h-7 rounded-full flex items-center justify-center ${selectedOrder && selectedOrder.progress >= 1 ? 'bg-gold-gradient text-black shadow-[0_0_10px_rgba(230,185,95,0.3)]' : 'bg-[#27272A] border border-white/10'}`}>
                      {selectedOrder && selectedOrder.progress >= 1 ? <div className="w-2 h-2 rounded-full bg-black" /> : <div className="w-2 h-2 rounded-full bg-[#8C8C8C]" />}
                    </div>
                    <div className={selectedOrder && selectedOrder.progress >= 1 ? "text-white font-medium text-sm mb-0.5" : "text-[#8C8C8C] text-sm mb-0.5"}>Collected</div>
                    <div className="text-xs text-[#8C8C8C]">Picked up from seller</div>
                  </div>

                  {/* Verified */}
                  <div className="relative pl-6">
                    <div className={`absolute -left-3.5 top-0.5 w-7 h-7 rounded-full flex items-center justify-center ${selectedOrder && selectedOrder.progress >= 2 ? 'bg-gold-gradient text-black shadow-[0_0_10px_rgba(230,185,95,0.3)]' : 'bg-[#27272A] border border-white/10'}`}>
                      {selectedOrder && selectedOrder.progress >= 2 ? <div className="w-2 h-2 rounded-full bg-black" /> : <div className="w-2 h-2 rounded-full bg-[#8C8C8C]" />}
                    </div>
                    <div className={selectedOrder && selectedOrder.progress >= 2 ? "text-white font-medium text-sm mb-0.5" : "text-[#8C8C8C] text-sm mb-0.5"}>Verified</div>
                    <div className="text-xs text-[#8C8C8C]">Authentication pending</div>
                  </div>

                  {/* Delivered */}
                  <div className="relative pl-6">
                    <div className={`absolute -left-3.5 top-0.5 w-7 h-7 rounded-full flex items-center justify-center ${selectedOrder && selectedOrder.progress >= 3 ? 'bg-gold-gradient text-black shadow-[0_0_10px_rgba(230,185,95,0.3)]' : 'bg-[#27272A] border border-white/10'}`}>
                      {selectedOrder && selectedOrder.progress >= 3 ? <div className="w-2 h-2 rounded-full bg-black" /> : <div className="w-2 h-2 rounded-full bg-[#8C8C8C]" />}
                    </div>
                    <div className={selectedOrder && selectedOrder.progress >= 3 ? "text-white font-medium text-sm mb-0.5" : "text-[#8C8C8C] text-sm mb-0.5"}>Delivered</div>
                    <div className="text-xs text-[#8C8C8C]">Delivery pending</div>
                  </div>

                </div>
              </div>
            </div>

            {selectedOrder && selectedOrder.progress < 3 && (
              <button 
                onClick={handleProgress}
                className="w-full h-12 bg-gold-gradient text-black font-semibold rounded-full flex items-center justify-center gap-2 hover:opacity-90 transition-opacity">
                {selectedOrder.progress === 0 && "Mark As Collected"}
                {selectedOrder.progress === 1 && "Mark As Verified"}
                {selectedOrder.progress === 2 && "Mark As Delivered"}
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}
