"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Search, Calendar, ChevronDown, Phone, MapPin, Check, ArrowRight, Info, ShoppingBag, ChevronLeft, ShieldCheck, AlertTriangle, AlertCircle, Loader2, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useOrders, Order } from "@/context/OrdersContext";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";


const issueOptions = [
  { id: "Item failed verification", desc: "Authentication mismatch detected" },
  { id: "Seller unavailable", desc: "Seller could not complete pickup" },
  { id: "Buyer rejected", desc: "Buyer rejected item at delivery" },
  { id: "Other", desc: "Add issue manually" },
];

const orderSteps = [
  { title: "Reserved", desc: "Item reserved for you" },
  { title: "Collected", desc: "Picked up from seller" },
  { title: "Verified", desc: "Authentication pending" },
  { title: "Delivered", desc: "Delivery pending" }
];

type OrderTableProps = {
  title: string;
  filterStatus?: string | string[];
  showAllStatuses?: boolean;
};

export default function OrderTable({ title, filterStatus, showAllStatuses }: OrderTableProps) {
  const router = useRouter();
  const { orders, advanceOrder, resolveIssue } = useOrders();

  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // Issue reporting state
  const [sheetView, setSheetView] = useState<"details" | "reportIssue">("details");
  const [issueStep, setIssueStep] = useState<"form" | "success">("form");
  const [selectedIssueOption, setSelectedIssueOption] = useState<string>("Buyer rejected");
  const [buyerRejectReason, setBuyerRejectReason] = useState("Changed mind");
  const [issueDetails, setIssueDetails] = useState("");
  const [successUpdateOrderId, setSuccessUpdateOrderId] = useState<string | null>(null);

  // Filter orders based on status
  const filteredOrders = showAllStatuses
    ? orders
    : orders.filter(o => {
      if (Array.isArray(filterStatus)) return filterStatus.includes(o.status);
      return o.status === filterStatus;
    });

  const selectedOrder = orders.find(o => o.id === selectedOrderId) || null;
  const successOrder = orders.find(o => o.id === successUpdateOrderId) || null;

  const handleProgress = () => {
    if (!selectedOrder) return;
    if (selectedOrder.progress >= 3) return;

    advanceOrder(selectedOrder.id);
    setSuccessUpdateOrderId(selectedOrder.id);
    setSelectedOrderId(null);
  };

  const handleResolveIssue = (orderId: string) => {
    resolveIssue(orderId, "resolve");
    setSelectedOrderId(null);
  };

  const handleMoveToQueue = (orderId: string) => {
    resolveIssue(orderId, "queue");
    setSelectedOrderId(null);
  };

  const openReportIssue = (order: Order) => {
    setSelectedOrderId(order.id);
    setSheetView("reportIssue");
    setIssueStep("form");
    setSelectedIssueOption("Buyer rejected");
    setBuyerRejectReason("Changed mind");
    setIssueDetails("");
  };

  const submitIssue = () => {
    setSelectedOrderId(null);
    setSheetView("details");
    setIssueStep("success");
  };

  const handleBackToDashboard = () => {
    setIssueStep("form");
    router.push("/issues");
  };

  const getCurrentFormattedTime = () => {
    const now = new Date();
    const day = now.getDate();
    const month = now.toLocaleString('en-US', { month: 'short' });
    const year = now.getFullYear();
    let hours = now.getHours();
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12;
    return `${day} ${month}, ${year} | ${hours}.${minutes} ${ampm}`;
  };

  return (
    <>
      <div className="w-full h-full text-white bg-[#1A1A1D] rounded-2xl overflow-hidden">

        {/* Header */}
        <div className="p-4 sm:p-6 flex flex-col md:flex-row md:items-center justify-between gap-3 md:gap-4">
          <h2 className="text-lg sm:text-xl font-semibold">{title}</h2>

          <div className="flex flex-wrap items-center gap-2 md:gap-3">
            <div className="relative flex-1 min-w-0 md:w-64 md:flex-none">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#8C8C8C]" />
              <Input
                placeholder="Search orders.."
                className="w-full bg-transparent border-white/10 rounded-full h-10 pl-10 text-sm focus-visible:ring-[#FFAF2C]/30 text-white"
              />
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center justify-center h-10 w-10 rounded-full border border-white/10 hover:bg-white/5 active:scale-95 transition-all shrink-0 cursor-pointer">
                  <Calendar className="h-4 w-4 text-[#8C8C8C]" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-40 bg-[#1A1A1D] border-white/10 text-white rounded-xl shadow-2xl">
                <DropdownMenuItem className="focus:bg-white/10 cursor-pointer">Today</DropdownMenuItem>
                <DropdownMenuItem className="focus:bg-white/10 cursor-pointer">Yesterday</DropdownMenuItem>
                <DropdownMenuItem className="focus:bg-white/10 cursor-pointer">Last 7 days</DropdownMenuItem>
                <DropdownMenuItem className="focus:bg-white/10 cursor-pointer">Last 30 days</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* ===== MOBILE CARD LIST — hidden on md+ ===== */}
        <div className="md:hidden px-3 pb-4 space-y-0">
          {filteredOrders.length === 0 ? (
            <div className="flex flex-col items-center justify-center gap-2 py-16 text-[#8C8C8C]">
              <img src="/empty-cart.png" alt="No orders" className="w-24 h-24 object-contain mb-4" />
              <h3 className="text-xl font-semibold text-white">No orders found</h3>
              <p className="text-sm text-center">There are currently no orders matching this filter</p>
            </div>
          ) : (
            filteredOrders.map((order) => (
              <div
                key={order.id}
                onClick={() => setSelectedOrderId(order.id)}
                className="bg-[#1A1A1D] rounded-2xl mb-3 overflow-hidden cursor-pointer active:opacity-80 transition-opacity border border-white/5"
              >
                {/* Card top: image + name + status */}
                <div className="flex items-center gap-3 p-3 pb-2.5">
                  <div className="w-11 h-11 rounded-xl overflow-hidden bg-white/10 flex-shrink-0">
                    <img src={order.item.image} alt={order.item.name} className="w-full h-full object-cover" />
                  </div>
                  <span className="flex-1 font-medium text-[#EBEBEB] text-[15px] leading-tight truncate">{order.item.name}</span>
                  <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold shrink-0 ${order.statusBg} ${order.statusColor}`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${order.dotColor}`} />
                    {order.status}
                  </span>
                </div>

                {/* Divider */}
                <div className="h-px bg-white/5 mx-3" />

                {/* Detail rows */}
                <div className="px-3 py-2.5 space-y-2 text-[13px]">
                  <div className="flex">
                    <span className="w-20 text-[#8C8C8C] shrink-0">Order ID :</span>
                    <span className="font-semibold text-[#FFAF2C]">{order.id}</span>
                  </div>
                  <div className="flex">
                    <span className="w-20 text-[#8C8C8C] shrink-0">Seller :</span>
                    <span className="text-[#EBEBEB] truncate">
                      <span className="text-[#8C8C8C] mr-1 text-[11px]">{order.seller.location}</span>
                      {order.seller.name}
                    </span>
                  </div>
                  <div className="flex">
                    <span className="w-20 text-[#8C8C8C] shrink-0">Buyer :</span>
                    <span className="text-[#EBEBEB] truncate">
                      <span className="text-[#8C8C8C] mr-1 text-[11px]">{order.buyer.location}</span>
                      {order.buyer.name}
                    </span>
                  </div>
                  <div className="flex">
                    <span className="w-20 text-[#8C8C8C] shrink-0">Pickup :</span>
                    <span className="text-[#EBEBEB]">{order.pickup}</span>
                  </div>
                  <div className="flex">
                    <span className="w-20 text-[#8C8C8C] shrink-0">Delivery :</span>
                    <span className="text-[#EBEBEB]">{order.delivery}</span>
                  </div>
                  <div className="flex items-center">
                    <span className="w-20 text-[#8C8C8C] shrink-0">AI Insights :</span>
                    <span className="text-[#EBEBEB]">
                      {order.aiAnalysis ? (
                        (() => {
                          const isAuthentic = (order.aiAnalysis.originalPercent ?? 0) >= (order.aiAnalysis.fakePercent ?? 0);
                          const percentage = isAuthentic ? order.aiAnalysis.originalPercent : order.aiAnalysis.fakePercent;
                          const tooltipReason = order.aiAnalysis.reason || "Materials, hardware engravings, and logo stamps are fully consistent with authentic brand specifications.";
                          const tooltipBg = isAuthentic ? "bg-[#142518] border-[#1D3C22]" : "bg-[#2D1416] border-[#4C1C1F]";

                          return (
                            <div className="flex items-center gap-1.5" onClick={(e) => { e.stopPropagation(); }}>
                              <span className={isAuthentic ? "text-green-500 font-medium" : "text-[#FF383C] font-medium"}>
                                {percentage}% {isAuthentic ? "Authentic" : "Fake"}
                              </span>
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <button 
                                    type="button" 
                                    className="cursor-pointer focus:outline-none"
                                    onClick={(e) => { e.stopPropagation(); }}
                                  >
                                    <Info className="w-3.5 h-3.5 text-[#8C8C8C] hover:text-white transition-colors" />
                                  </button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent 
                                  side="bottom"
                                  sideOffset={8}
                                  className={`w-64 p-3 ${tooltipBg} border text-white text-xs rounded-xl shadow-2xl text-center z-50`}
                                >
                                  <span className="block leading-relaxed">
                                    {tooltipReason}
                                  </span>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </div>
                          );
                        })()
                      ) : (
                        <span className="flex items-center gap-1 text-[#8C8C8C]">
                          <Loader2 className="w-3 h-3 animate-spin" /> Analyzing...
                        </span>
                      )}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* ===== DESKTOP TABLE — hidden on mobile ===== */}
        <div className="hidden md:block w-full overflow-x-auto overflow-y-hidden px-6">
          <table className="w-full text-sm text-left border-separate border-spacing-0">
            <thead>
              <tr className="text-xs text-[#8C8C8C] bg-white/5 uppercase font-semibold">
                <th className="px-6 py-5 border-y border-l border-white/5 rounded-l-2xl">ORDER ID</th>
                <th className="px-6 py-5 border-y border-white/5">ITEM</th>
                <th className="px-6 py-5 border-y border-white/5">SELLER</th>
                <th className="px-6 py-5 border-y border-white/5">BUYER</th>
                <th className="px-6 py-5 border-y border-white/5">PICKUP</th>
                <th className="px-6 py-5 border-y border-white/5">DELIVERY</th>
                <th className="px-6 py-5 text-center border-y border-white/5">AI INSIGHTS</th>
                <th className="px-6 py-5 border-y border-r border-white/5 rounded-r-2xl">STATUS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan={8} className="text-center py-24 text-[#8C8C8C]">
                    <div className="flex flex-col items-center justify-center gap-2">
                      <img
                        src="/empty-cart.png"
                        alt="No orders"
                        className="w-32 h-32 object-contain mb-6"
                      />
                      <h3 className="text-2xl font-semibold text-white mb-1">No orders found</h3>
                      <p className="text-sm text-[#8C8C8C] mb-6">There are currently no orders matching this filter</p>
                      <button className="px-8 py-2.5 bg-gold-gradient text-black font-semibold rounded-full hover:opacity-90 transition-opacity">
                        Clear Filters
                      </button>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredOrders.map((order, i) => (
                  <tr
                    key={order.id}
                    className="hover:bg-white/[0.02] transition-colors group cursor-pointer"
                    onClick={() => setSelectedOrderId(order.id)}
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="font-semibold text-[#FFAF2C]">{order.id}</span>
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
                    <td className="px-6 py-4 text-center">
                      {order.aiAnalysis ? (
                        (() => {
                          const isAuthentic = (order.aiAnalysis.originalPercent ?? 0) >= (order.aiAnalysis.fakePercent ?? 0);
                          const percentage = isAuthentic ? order.aiAnalysis.originalPercent : order.aiAnalysis.fakePercent;
                          const strokeColor = isAuthentic ? "#22c55e" : "#FF383C";
                          const radius = 16;
                          const circumference = 2 * Math.PI * radius;
                          const strokeDashoffset = circumference - (percentage / 100) * circumference;
                          const tooltipReason = order.aiAnalysis.reason || "Materials, hardware engravings, and logo stamps are fully consistent with authentic brand specifications.";

                          const tooltipBg = isAuthentic ? "bg-[#142518] border-[#1D3C22]" : "bg-[#2D1416] border-[#4C1C1F]";
                          const caretBorderColor = isAuthentic ? "border-b-[#1D3C22]" : "border-b-[#4C1C1F]";
                          const caretBgColor = isAuthentic ? "border-b-[#142518]" : "border-b-[#2D1416]";

                          return (
                            <div className="flex flex-col items-center justify-center gap-1.5 mx-auto w-fit">
                              {/* Circular progress bar */}
                              <div className="relative flex items-center justify-center w-12 h-12">
                                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                                  {/* Background Track */}
                                  <circle
                                    cx="18"
                                    cy="18"
                                    r={radius}
                                    fill="none"
                                    stroke="#27272A"
                                    strokeWidth="3.5"
                                  />
                                  {/* Progress Segment */}
                                  <circle
                                    cx="18"
                                    cy="18"
                                    r={radius}
                                    fill="none"
                                    stroke={strokeColor}
                                    strokeWidth="3.5"
                                    strokeDasharray={circumference}
                                    strokeDashoffset={strokeDashoffset}
                                    strokeLinecap="round"
                                    className="transition-all duration-1000 ease-out"
                                  />
                                </svg>
                                <span className="absolute text-[11px] font-semibold text-white">{percentage}%</span>
                              </div>

                              {/* Label & Tooltip */}
                              <div onClick={(e) => e.stopPropagation()}>
                                <Tooltip delayDuration={100}>
                                  <TooltipTrigger asChild>
                                    <div className="relative group/tooltip inline-flex items-center gap-1 cursor-pointer">
                                      <span className="text-xs text-[#8C8C8C] group-hover/tooltip:text-white transition-colors">
                                        {isAuthentic ? "Authentic" : "Fake"}
                                      </span>
                                      <Info className="w-3.5 h-3.5 text-[#8C8C8C] group-hover/tooltip:text-white transition-colors" />
                                    </div>
                                  </TooltipTrigger>
                                  <TooltipContent 
                                    side="bottom"
                                    sideOffset={8}
                                    className={`w-64 p-3 ${tooltipBg} border text-white text-xs rounded-xl shadow-2xl text-center`}
                                  >
                                    <span className="block leading-relaxed">
                                      {tooltipReason}
                                    </span>
                                  </TooltipContent>
                                </Tooltip>
                              </div>
                            </div>
                          );
                        })()
                      ) : (
                        <div className="flex flex-col items-center justify-center gap-2 text-xs text-[#8C8C8C] mx-auto w-fit">
                          <Loader2 className="w-3.5 h-3.5 animate-spin" />
                          <span>Analyzing...</span>
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium transition-colors duration-500 ${order.statusBg} ${order.statusColor}`}>
                        <span className={`w-1.5 h-1.5 rounded-full transition-colors duration-500 ${order.dotColor}`}></span>
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Order Details Drawer */}
      <Sheet open={selectedOrderId !== null} onOpenChange={(open) => {
        if (!open) {
          setSelectedOrderId(null);
          setTimeout(() => setSheetView("details"), 300);
        }
      }}>
        <SheetContent showCloseButton={false} className="w-full max-w-[550px] bg-black border-l border-white/10 text-white p-0 overflow-hidden flex flex-col">
          {(sheetView === "details" || sheetView === "reportIssue") && (
            <div className="flex flex-col h-full w-full">
              {/* Sticky Header */}
              <div className="px-4 sm:px-6 pt-3 pb-1.5 flex-shrink-0 flex items-center justify-between">
                <span className="text-2xl font-semibold text-white">Order Details</span>
                <button
                  onClick={() => setSelectedOrderId(null)}
                  className="w-6 h-6 flex items-center justify-center rounded-full border-2 border-white hover:border-white transition-colors text-white hover:text-white flex-shrink-0"
                >
                  <X className="w-3 h-3" strokeWidth={2.5} />
                </button>
              </div>

              {/* Scrollable Body */}
              <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-4 pb-6 no-scrollbar space-y-4">

                {/* Image */}
                <div className="w-full h-40 sm:h-48 rounded-xl overflow-hidden">
                  <img src={selectedOrder?.item.image} alt={selectedOrder?.item.name} className="w-full h-full object-cover" />
                </div>

                {/* Header Info */}
                <div className="flex justify-between items-start">
                  <div>
                    <div className="text-[#FFAF2C] font-semibold mb-1 text-base">{selectedOrder?.id}</div>
                    <h3 className="text-xl sm:text-2xl font-medium">{selectedOrder?.item.name}</h3>
                    <p className="text-sm sm:text-base text-[#8C8C8C]">{selectedOrder?.item.desc}</p>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium transition-colors duration-500 ${selectedOrder?.statusBg} ${selectedOrder?.statusColor} mb-2`}>
                      <span className={`w-2 h-2 rounded-full transition-colors duration-500 ${selectedOrder?.dotColor}`}></span>
                      {selectedOrder?.status}
                    </span>
                    <span className="font-semibold text-lg">{selectedOrder?.item.price}</span>
                  </div>
                </div>

                {/* Windows */}
                {selectedOrder?.status !== "Issue" && (
                  <div className="bg-[#1A1A1D] rounded-xl overflow-hidden">
                    <div className="flex divide-x divide-white/10">
                      {/* Pickup */}
                      <div className="flex-1 p-4 border-l-2 border-white/50">
                        <div className="text-xs text-[#8C8C8C] mb-1.5">Pickup Window</div>
                        <div className="text-sm font-medium text-white leading-snug">{selectedOrder?.pickup.split('•').join(' · ')}</div>
                      </div>
                      {/* Delivery */}
                      <div className="flex-1 p-4 border-l-2 border-white/50">
                        <div className="text-xs text-[#8C8C8C] mb-1.5">Estimated Delivery</div>
                        <div className="text-sm font-medium text-white leading-snug">{selectedOrder?.delivery}</div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Seller / Buyer */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="flex-1">
                    <div className="text-sm text-[#8C8C8C] uppercase mb-2 font-medium">Seller</div>
                    <div className="bg-[#1A1A1D] rounded-xl p-5">
                      <div className="font-semibold text-lg mb-2">{selectedOrder?.seller.name}</div>
                      <div className="flex items-center gap-2 text-[15px] text-[#8C8C8C] mb-2">
                        <Phone className="w-4 h-4 shrink-0" /> <span className="truncate">{selectedOrder?.seller.phone}</span>
                      </div>
                      <div className="flex items-center gap-2 text-[15px] text-[#8C8C8C]">
                        <MapPin className="w-4 h-4 shrink-0" /> <span className="truncate">{selectedOrder?.seller.location}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="text-sm text-[#8C8C8C] uppercase mb-2 font-medium">Buyer</div>
                    <div className="bg-[#1A1A1D] rounded-xl p-5">
                      <div className="font-semibold text-lg mb-2">{selectedOrder?.buyer.name}</div>
                      <div className="flex items-center gap-2 text-[15px] text-[#8C8C8C] mb-2">
                        <Phone className="w-4 h-4 shrink-0" /> <span className="truncate">{selectedOrder?.buyer.phone}</span>
                      </div>
                      <div className="flex items-center gap-2 text-[15px] text-[#8C8C8C]">
                        <MapPin className="w-4 h-4 shrink-0" /> <span className="truncate">{selectedOrder?.buyer.location}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Note section */}
                {selectedOrder?.note && (
                  <div>
                    <div className="text-xs text-[#8C8C8C] uppercase mb-2 font-medium">Note</div>
                    <div className="bg-[#1A1A1D] rounded-xl p-4">
                      <div className="text-sm text-[#8C8C8C]">{selectedOrder.note}</div>
                    </div>
                  </div>
                )}

                {/* Progress */}
                {selectedOrder?.status !== "Issue" && (
                  <div>
                    <div className="text-xs text-[#8C8C8C] uppercase mb-4 font-medium">Order Progress</div>
                    <div className="bg-[#1A1A1D] rounded-xl p-5">
                      <div className="space-y-8">
                        {orderSteps.map((step, index) => {
                          const progress = selectedOrder?.progress ?? 0;
                          const isCompleted = progress > index;
                          const isActive = progress === index;
                          const isPending = progress < index;

                          return (
                            <div key={index} className="relative pl-12">
                              {index < orderSteps.length - 1 && (
                                <div className={`absolute top-9 left-[17px] w-[2px] h-[calc(100%+4px)] transition-colors duration-500 ${progress > index ? 'bg-[#FFAF2C]' : 'bg-[#27272A]'}`} />
                              )}
                              <div className="absolute left-0 top-0 flex items-center justify-center w-9 h-9">
                                {isActive && (
                                  <div className="absolute inset-0 rounded-full border-[1.5px] border-dashed border-[#D6A042] animate-[spin_8s_linear_infinite] scale-110" />
                                )}
                                <div className={`w-7 h-7 rounded-full flex items-center justify-center transition-all duration-500 z-10 ${isCompleted || isActive ? 'bg-gold-gradient text-black shadow-[0_0_12px_rgba(230,185,95,0.4)]' : 'bg-[#27272A] border border-white/10'}`}>
                                  {isCompleted && <Check className="w-4 h-4 text-black" />}
                                  {isActive && <div className="w-2 h-2 rounded-full bg-black" />}
                                  {isPending && <div className="w-2 h-2 rounded-full bg-[#8C8C8C]" />}
                                </div>
                              </div>
                              <div className={`transition-colors duration-500 text-sm leading-tight font-medium mb-0.5 ${isCompleted || isActive ? "text-white" : "text-[#8C8C8C]"}`}>
                                {step.title}
                              </div>
                              <div className="text-[#8C8C8C] text-xs">
                                {step.desc}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                )}

                {/* Read-only Issue Details */}
                {selectedOrder?.status === "Issue" && selectedOrder.issue && (
                  <div>
                    <div className="text-xs text-[#8C8C8C] uppercase mb-4 font-medium">Issue Details</div>
                    <div className="bg-[#1A1A1D] rounded-xl p-4 border border-white/5 space-y-4">
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-[#8C8C8C]">Reason</span>
                        <span className="font-semibold text-white">{selectedOrder.issue.reason}</span>
                      </div>
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-[#8C8C8C]">Created</span>
                        <span className="font-semibold text-white">{selectedOrder.issue.createdAt}</span>
                      </div>
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-[#8C8C8C]">Reference ID</span>
                        <span className="font-semibold text-[#FFAF2C]">{selectedOrder.issue.referenceId}</span>
                      </div>
                      {selectedOrder.issue.notes && (
                        <div className="pt-4 border-t border-white/5 text-sm">
                          <span className="text-[#8C8C8C] block mb-2 font-medium">Notes</span>
                          <div className="bg-black p-4 rounded-lg text-white border border-white/5">
                            {selectedOrder.issue.notes}
                          </div>
                        </div>
                      )}
                    </div>
                    {selectedOrder.issue.responses && selectedOrder.issue.responses.length > 0 && (
                      <div className="mt-6">
                        <div className="text-xs text-[#8C8C8C] uppercase mb-4 font-medium">Responses & Activity</div>
                        <div className="space-y-3">
                          {selectedOrder.issue.responses.map((resp, i) => (
                            <div key={i} className="bg-[#1A1A1D] border border-white/5 p-4 rounded-xl">
                              <div className="flex items-center justify-between mb-2">
                                <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${resp.role === "Admin" ? "bg-purple-500/10 text-purple-400" :
                                  resp.role === "Buyer" ? "bg-blue-500/10 text-blue-400" :
                                    "bg-orange-500/10 text-orange-400"
                                  }`}>{resp.role}</span>
                                <span className="text-xs text-[#8C8C8C]">{resp.time}</span>
                              </div>
                              <div className="text-sm text-white">{resp.text}</div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="mt-8 flex gap-3">
                      <button 
                        onClick={() => handleMoveToQueue(selectedOrder.id)}
                        className="flex-1 py-3 bg-[#1A1A1D] border border-white/10 rounded-xl text-sm font-semibold text-white hover:bg-white/5 transition-colors"
                      >
                        Move Back to Queue
                      </button>
                      <button 
                        onClick={() => handleResolveIssue(selectedOrder.id)}
                        className="flex-1 py-3 bg-gold-gradient text-black rounded-xl text-sm font-semibold hover:opacity-90 transition-opacity"
                      >
                        Resolve Issue
                      </button>
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                {selectedOrder && selectedOrder.status !== "Issue" && (
                  selectedOrder.progress < 3 ? (
                    <div className="flex flex-col sm:flex-row gap-3 w-full">
                      <button
                        onClick={handleProgress}
                        className="w-full py-3.5 bg-gold-gradient text-black font-semibold rounded-full flex items-center justify-center gap-2 hover:opacity-90 transition-opacity border-0 outline-none text-sm">
                        {selectedOrder.progress === 0 && "Mark As Collected"}
                        {selectedOrder.progress === 1 && "Mark As Verified"}
                        {selectedOrder.progress === 2 && "Mark As Delivered"}
                        <ArrowRight className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => openReportIssue(selectedOrder)}
                        className="w-full py-3.5 bg-[#27272A] text-[#8C8C8C] font-semibold rounded-full flex items-center justify-center hover:bg-white/5 transition-colors border border-white/10 text-sm">
                        Report an Issue
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => openReportIssue(selectedOrder)}
                      className="w-full h-12 bg-[#27272A] text-[#8C8C8C] font-semibold rounded-full flex items-center justify-center hover:bg-white/5 transition-colors border border-white/10 text-sm">
                      Report An Issue
                    </button>
                  )
                )}
              </div>

            </div>
          )}

        </SheetContent>
      </Sheet>

      {/* Report Issue Dialog */}
      <Dialog open={sheetView === "reportIssue" && issueStep === "form"} onOpenChange={(open) => !open && setSheetView("details")}>
        <DialogContent
          className="text-white w-[calc(100vw-32px)] max-w-[500px] max-h-[85vh] p-0 shadow-2xl rounded-3xl overflow-hidden [&>button]:hidden"
          style={{
            background: 'linear-gradient(#0D0D0F, #0D0D0F) padding-box, linear-gradient(to bottom, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0.12) 40%, transparent 85%) border-box',
            border: '1px solid transparent',
          }}
        >
          {selectedOrder && (
            <div className="flex flex-col h-full w-full max-h-[85vh]">
              {/* Sticky Header */}
              <div className="px-4 sm:px-6 pt-6 pb-4 border-b border-white/5 flex-shrink-0 flex items-center justify-between">
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold mb-1 text-white">Report Issue</h2>
                  <div className="text-sm text-[#8C8C8C] font-normal">Select the issue related to this order</div>
                </div>
                {/* Close Button */}
                <button
                  onClick={() => setSheetView("details")}
                  className="w-8 h-8 rounded-full border-2 border-white/80 flex items-center justify-center hover:border-white transition-colors flex-shrink-0"
                >
                  <X className="w-4 h-4 text-white" strokeWidth={2.5} />
                </button>
              </div>

              {/* Scrollable body */}
              <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-4 pb-6 space-y-5 no-scrollbar">
                {/* Order summary card */}
                <div className="bg-[#1A1A1D] border border-white/5 rounded-xl p-4 flex gap-4 items-center">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-lg overflow-hidden bg-white/5 flex-shrink-0">
                    <img src={selectedOrder.item.image} alt="Item" className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-[#FFAF2C] font-medium text-sm mb-1">{selectedOrder.id}</div>
                    <div className="font-semibold truncate text-[14px] sm:text-[15px] mb-1">{selectedOrder.item.name}</div>
                    <div className="text-xs text-[#8C8C8C] truncate">{selectedOrder.seller.name} to {selectedOrder.buyer.name}</div>
                  </div>
                </div>

                {/* Options */}
                <div>
                  <div className="text-xs text-[#8C8C8C] uppercase font-medium mb-3">Issue Options</div>
                  <div className="space-y-3">
                    {issueOptions.map((opt) => {
                      const isSelected = selectedIssueOption === opt.id;
                      return (
                        <div key={opt.id} className="space-y-2">
                          <div
                            onClick={() => {
                              setSelectedIssueOption(opt.id);
                              if (opt.id !== "Other") {
                                setIssueDetails("");
                              }
                            }}
                            className={`${isSelected && opt.id === "Buyer rejected" ? 'flex flex-col gap-3' : 'flex items-center justify-between'} p-4 rounded-xl border cursor-pointer transition-colors ${isSelected ? 'bg-[#1A1A1D] border-[#FFAF2C]' : 'bg-black border-white/10 hover:border-white/20'}`}
                          >
                            <div className="flex items-center justify-between w-full">
                              <div>
                                <div className={`font-medium mb-1 ${isSelected ? 'text-[#FFAF2C]' : 'text-white'}`}>{opt.id}</div>
                                <div className="text-xs text-[#8C8C8C]">{opt.desc}</div>
                              </div>
                              <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${isSelected ? 'border-[#FFAF2C]' : 'border-white/20'}`}>
                                {isSelected && <div className="w-2.5 h-2.5 bg-[#FFAF2C] rounded-full" />}
                              </div>
                            </div>
                            {isSelected && opt.id === "Buyer rejected" && (
                              <div
                                className="relative w-full"
                                onClick={(e) => e.stopPropagation()}
                              >
                                {/* Custom dropdown trigger */}
                                <button
                                  type="button"
                                  onClick={() => setDropdownOpen((o) => !o)}
                                  className="w-full bg-[#1E1E21] border border-white/10 rounded-xl h-12 px-4 text-sm text-white flex items-center justify-between focus:outline-none"
                                >
                                  <span>{buyerRejectReason}</span>
                                  {dropdownOpen
                                    ? <ChevronDown className="w-4 h-4 text-[#8C8C8C] rotate-180 transition-transform" />
                                    : <ChevronDown className="w-4 h-4 text-[#8C8C8C] transition-transform" />}
                                </button>

                                {/* Dropdown list */}
                                {dropdownOpen && (
                                  <div className="absolute left-0 right-0 top-[calc(100%+4px)] bg-[#1E1E21] rounded-xl border border-white/10 overflow-hidden z-50 shadow-2xl">
                                    {["Changed mind", "Not as described", "Condition issue", "Other"].map((opt) => (
                                      <button
                                        key={opt}
                                        type="button"
                                        onClick={() => {
                                          setBuyerRejectReason(opt);
                                          setDropdownOpen(false);
                                        }}
                                        className="w-full flex items-center justify-between px-4 py-3.5 text-sm text-[#8C8C8C] hover:bg-white/5 transition-colors text-left"
                                      >
                                        <span className={buyerRejectReason === opt ? "text-white font-medium" : ""}>{opt}</span>
                                        {buyerRejectReason === opt && (
                                          <Check className="w-4 h-4 text-white" />
                                        )}
                                      </button>
                                    ))}
                                  </div>
                                )}
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Add Details textarea only if Other issue option selected */}
                {selectedIssueOption === "Other" && (
                  <div>
                    <div className="text-xs text-[#8C8C8C] uppercase font-medium mb-3">Add Details</div>
                    <textarea
                      value={issueDetails}
                      onChange={(e) => setIssueDetails(e.target.value)}
                      placeholder="Type additional information.."
                      className="w-full bg-[#1A1A1D] border border-white/10 rounded-xl p-4 text-sm text-white placeholder:text-[#8C8C8C] min-h-[100px] resize-none focus:outline-none focus:ring-1 focus:ring-[#FFAF2C]/50 focus:border-[#FFAF2C]"
                    />
                  </div>
                )}

                <div className="flex items-center gap-2 text-xs text-red-500">
                  <Info className="w-4 h-4 shrink-0" />
                  <span>This action may trigger refund or return flow</span>
                </div>

                {/* Inline Footer Button */}
                <div className="pt-2">
                  <button
                    onClick={submitIssue}
                    disabled={selectedIssueOption === "Other" && issueDetails.trim() === ""}
                    className={`w-full py-3.5 text-sm font-semibold rounded-full flex items-center justify-center gap-2 transition-all ${selectedIssueOption === "Other" && issueDetails.trim() === ""
                      ? "bg-white/10 text-[#8C8C8C] cursor-not-allowed"
                      : "bg-gold-gradient text-black hover:opacity-90"
                      }`}>
                    Submit Issue <ArrowRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Issue Reported Success Dialog */}
      <Dialog open={issueStep === "success"} onOpenChange={(open) => !open && setIssueStep("form")}>
        <DialogContent
          className="text-white w-[calc(100vw-32px)] max-w-[380px] p-0 shadow-2xl rounded-3xl overflow-hidden [&>button]:hidden"
          style={{
            background: 'linear-gradient(#0D0D0F, #0D0D0F) padding-box, linear-gradient(to bottom, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0.12) 40%, transparent 85%) border-box',
            border: '1px solid transparent',
          }}
        >
          <div className="relative flex flex-col items-center text-center px-4 sm:px-6 pt-7 pb-6">

            {/* Close button */}
            <button
              onClick={() => setIssueStep("form")}
              className="absolute top-4 right-4 w-6 h-6 rounded-full border-2 border-white/80 flex items-center justify-center hover:border-white transition-colors flex-shrink-0"
            >
              <X className="w-3 h-3 text-white" strokeWidth={2.5} />
            </button>

            {/* Layered circle icon */}
            <div className="relative flex items-center justify-center mb-5">
              <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-full bg-[#1A1A1D]" />
              <div className="absolute w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-[#222224]" />
              <img
                src="/image 12.png"
                alt="Success"
                className="absolute w-16 h-16 sm:w-20 sm:h-20 object-contain drop-shadow-2xl"
              />
            </div>

            <DialogTitle className="text-xl sm:text-2xl font-bold text-white mb-1">Issue reported</DialogTitle>
            <DialogDescription className="text-sm text-[#8C8C8C] mb-4">Order status updated successfully</DialogDescription>

            {/* Info card */}
            <div className="w-full bg-[#1A1A1D] rounded-2xl p-4 mb-4 text-left space-y-3">
              <div className="flex justify-between items-center text-sm">
                <span className="text-[#8C8C8C]">Report Reference</span>
                <span className="font-semibold text-[#FFAF2C]">#RP-992-K</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-[#8C8C8C]">Update Time</span>
                <span className="font-medium text-white">{getCurrentFormattedTime()}</span>
              </div>
            </div>

            <button
              onClick={handleBackToDashboard}
              className="w-full h-11 bg-gold-gradient text-black font-semibold rounded-full flex items-center justify-center gap-2 hover:opacity-90 transition-opacity">
              Back To Dashboard <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Success Dialog for Status Update */}
      <Dialog open={successUpdateOrderId !== null} onOpenChange={(open) => !open && setSuccessUpdateOrderId(null)}>
        <DialogContent
          className="text-white w-[calc(100vw-32px)] max-w-[400px] p-0 shadow-2xl rounded-3xl overflow-hidden [&>button]:hidden"
          style={{
            background: 'linear-gradient(#0D0D0F, #0D0D0F) padding-box, linear-gradient(to bottom, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0.12) 40%, transparent 85%) border-box',
            border: '1px solid transparent',
          }}
        >
          {successOrder && (
            <div className="relative flex flex-col items-center text-center px-4 sm:px-6 pt-7 pb-6">

              {/* Close button */}
              <button
                onClick={() => setSuccessUpdateOrderId(null)}
                className="absolute top-4 right-4 w-6 h-6 rounded-full border-2 border-white/80 flex items-center justify-center hover:border-white transition-colors flex-shrink-0"
              >
                <X className="w-3 h-3 text-white" strokeWidth={2.5} />
              </button>

              {/* Layered circle icon */}
              <div className="relative flex items-center justify-center mb-5">
                <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-full bg-[#1A1A1D]" />
                <div className="absolute w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-[#222224]" />
                <img
                  src="/image 12.png"
                  alt="Success"
                  className="absolute w-16 h-16 sm:w-20 sm:h-20 object-contain drop-shadow-2xl"
                />
              </div>

              <DialogTitle className="text-xl sm:text-2xl font-bold text-white mb-1">Order updated successfully</DialogTitle>
              <DialogDescription className="text-sm text-[#8C8C8C] mb-4">
                {successOrder.progress >= 3
                  ? "Order has been delivered successfully"
                  : successOrder.progress === 2
                    ? "Product verification complete"
                    : "Item picked up from seller"}
              </DialogDescription>

              {/* Order card */}
              <div className="w-full bg-[#1A1A1D] rounded-2xl p-3 sm:p-4 mb-4 text-left flex gap-3 items-center">
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl overflow-hidden flex-shrink-0 bg-white/5">
                  <img src={successOrder.item.image} alt={successOrder.item.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start mb-1">
                    <span className="text-[#FFAF2C] font-semibold text-sm">{successOrder.id}</span>
                    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] sm:text-[11px] font-semibold ${successOrder.statusBg} ${successOrder.statusColor}`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${successOrder.dotColor}`} />
                      {successOrder.status}
                    </span>
                  </div>
                  <div className="font-semibold text-white text-[14px] sm:text-[15px] mb-0.5 truncate">{successOrder.item.name}</div>
                  <div className="text-xs text-[#8C8C8C]">Buyer : <span className="text-white font-medium">{successOrder.buyer.name}</span></div>
                </div>
              </div>

              {/* Approval reason */}
              <div className="text-xs sm:text-sm text-[#00D22B] mb-4">
                Approval reason : Status changed to {successOrder.status}
              </div>

              <button
                onClick={() => setSuccessUpdateOrderId(null)}
                className="w-full h-11 bg-gold-gradient text-black font-semibold rounded-full flex items-center justify-center gap-2 hover:opacity-90 transition-opacity border-0 outline-none">
                Back To Dashboard <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </DialogContent>
      </Dialog>


    </>
  );
}
