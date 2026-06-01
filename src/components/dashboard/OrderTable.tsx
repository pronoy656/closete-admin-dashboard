"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Search, Calendar, ChevronDown, Phone, MapPin, Check, ArrowRight, Info, ShoppingCart } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useOrders, Order } from "@/context/OrdersContext";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const issueOptions = [
  { id: "Item failed verification", desc: "Authentication mismatch detected" },
  { id: "Seller unavailable", desc: "Seller could not complete pickup" },
  { id: "Buyer rejected", desc: "Buyer rejected item at delivery" },
  { id: "Other", desc: "Add issue manually" },
];

const statusRouteMap: Record<string, string> = {
  Collected: "/collected",
  Verified: "/verified",
  Delivered: "/delivered",
};

type OrderTableProps = {
  title: string;
  filterStatus?: string | string[];
  showAllStatuses?: boolean;
};

export default function OrderTable({ title, filterStatus, showAllStatuses }: OrderTableProps) {
  const router = useRouter();
  const { orders, advanceOrder } = useOrders();

  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);

  // Issue reporting state
  const [isReportIssueOpen, setIsReportIssueOpen] = useState(false);
  const [issueOrderId, setIssueOrderId] = useState<string | null>(null);
  const [issueStep, setIssueStep] = useState<"form" | "success">("form");
  const [selectedIssueOption, setSelectedIssueOption] = useState<string>("Buyer rejected");
  const [issueDetails, setIssueDetails] = useState("");

  // Filter orders based on status
  const filteredOrders = showAllStatuses
    ? orders
    : orders.filter(o => {
        if (Array.isArray(filterStatus)) return filterStatus.includes(o.status);
        return o.status === filterStatus;
      });

  const selectedOrder = orders.find(o => o.id === selectedOrderId) || null;
  const issueOrder = orders.find(o => o.id === issueOrderId) || null;

  const handleProgress = () => {
    if (!selectedOrder) return;
    if (selectedOrder.progress >= 3) return;

    advanceOrder(selectedOrder.id);
  };

  const openReportIssue = (order: Order) => {
    setIssueOrderId(order.id);
    setIssueStep("form");
    setSelectedIssueOption("Buyer rejected");
    setIssueDetails("");
    setIsReportIssueOpen(true);
  };

  const submitIssue = () => {
    setIssueStep("success");
  };

  const handleBackToDashboard = () => {
    setIsReportIssueOpen(false);
    router.push("/issues");
  };

  return (
    <>
      <div className="w-full h-full text-white bg-[#1A1A1D] rounded-2xl border border-white/5 overflow-hidden">
        
        {/* Header */}
        <div className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/5">
          <h2 className="text-xl font-semibold">{title}</h2>
          
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
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center py-24 text-[#8C8C8C]">
                    <div className="flex flex-col items-center justify-center gap-2">
                      <div className="w-32 h-32 rounded-full bg-[#1A1A1D] border border-white/10 flex items-center justify-center mb-4 shadow-xl relative overflow-hidden">
                         <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent opacity-30" />
                         <ShoppingCart className="w-12 h-12 text-white/40 relative z-10" />
                      </div>
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
                  <tr key={order.id} className="hover:bg-white/[0.02] transition-colors group cursor-pointer" onClick={() => setSelectedOrderId(order.id)}>
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
      <Sheet open={selectedOrderId !== null} onOpenChange={(open) => !open && setSelectedOrderId(null)}>
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
                <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium transition-colors duration-500 ${selectedOrder?.statusBg} ${selectedOrder?.statusColor} mb-2`}>
                  <span className={`w-1.5 h-1.5 rounded-full transition-colors duration-500 ${selectedOrder?.dotColor}`}></span>
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
                    <div className={`absolute -left-3.5 top-0.5 w-7 h-7 rounded-full flex items-center justify-center transition-all duration-500 ${selectedOrder && selectedOrder.progress >= 0 ? 'bg-gold-gradient text-black shadow-[0_0_10px_rgba(230,185,95,0.3)]' : 'bg-[#27272A] border border-white/10'}`}>
                      {selectedOrder && selectedOrder.progress >= 0 ? <Check className="w-4 h-4 text-black" /> : <div className="w-2 h-2 rounded-full bg-[#8C8C8C]" />}
                    </div>
                    <div className={`transition-colors duration-500 text-sm mb-0.5 ${selectedOrder && selectedOrder.progress >= 0 ? "text-white font-medium" : "text-[#8C8C8C]"}`}>Reserved</div>
                    <div className="text-xs text-[#8C8C8C]">Item reserved for you</div>
                  </div>

                  {/* Collected */}
                  <div className="relative pl-6">
                    <div className={`absolute -left-3.5 top-0.5 w-7 h-7 rounded-full flex items-center justify-center transition-all duration-500 ${selectedOrder && selectedOrder.progress >= 1 ? 'bg-gold-gradient text-black shadow-[0_0_10px_rgba(230,185,95,0.3)]' : 'bg-[#27272A] border border-white/10'}`}>
                      {selectedOrder && selectedOrder.progress >= 1 ? <div className="w-2 h-2 rounded-full bg-black" /> : <div className="w-2 h-2 rounded-full bg-[#8C8C8C]" />}
                    </div>
                    <div className={`transition-colors duration-500 text-sm mb-0.5 ${selectedOrder && selectedOrder.progress >= 1 ? "text-white font-medium" : "text-[#8C8C8C]"}`}>Collected</div>
                    <div className="text-xs text-[#8C8C8C]">Picked up from seller</div>
                  </div>

                  {/* Verified */}
                  <div className="relative pl-6">
                    <div className={`absolute -left-3.5 top-0.5 w-7 h-7 rounded-full flex items-center justify-center transition-all duration-500 ${selectedOrder && selectedOrder.progress >= 2 ? 'bg-gold-gradient text-black shadow-[0_0_10px_rgba(230,185,95,0.3)]' : 'bg-[#27272A] border border-white/10'}`}>
                      {selectedOrder && selectedOrder.progress >= 2 ? <div className="w-2 h-2 rounded-full bg-black" /> : <div className="w-2 h-2 rounded-full bg-[#8C8C8C]" />}
                    </div>
                    <div className={`transition-colors duration-500 text-sm mb-0.5 ${selectedOrder && selectedOrder.progress >= 2 ? "text-white font-medium" : "text-[#8C8C8C]"}`}>Verified</div>
                    <div className="text-xs text-[#8C8C8C]">Authentication pending</div>
                  </div>

                  {/* Delivered */}
                  <div className="relative pl-6">
                    <div className={`absolute -left-3.5 top-0.5 w-7 h-7 rounded-full flex items-center justify-center transition-all duration-500 ${selectedOrder && selectedOrder.progress >= 3 ? 'bg-gold-gradient text-black shadow-[0_0_10px_rgba(230,185,95,0.3)]' : 'bg-[#27272A] border border-white/10'}`}>
                      {selectedOrder && selectedOrder.progress >= 3 ? <div className="w-2 h-2 rounded-full bg-black" /> : <div className="w-2 h-2 rounded-full bg-[#8C8C8C]" />}
                    </div>
                    <div className={`transition-colors duration-500 text-sm mb-0.5 ${selectedOrder && selectedOrder.progress >= 3 ? "text-white font-medium" : "text-[#8C8C8C]"}`}>Delivered</div>
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

            {selectedOrder && selectedOrder.status === "Issue" && (
              <button 
                onClick={() => {
                  setSelectedOrderId(null);
                  openReportIssue(selectedOrder);
                }}
                className="w-full h-12 bg-red-500/10 text-red-500 font-semibold rounded-full flex items-center justify-center gap-2 hover:bg-red-500/20 transition-colors mt-4 border border-red-500/20">
                Report Issue <Info className="w-4 h-4" />
              </button>
            )}
          </div>
        </SheetContent>
      </Sheet>

      {/* Report Issue Dialog */}
      <Dialog open={isReportIssueOpen} onOpenChange={setIsReportIssueOpen}>
        <DialogContent className="bg-[#141416] border border-white/10 text-white sm:max-w-[425px] p-0 shadow-2xl rounded-2xl [&>button]:text-white [&>button]:opacity-80 hover:[&>button]:opacity-100 max-h-[90vh] flex flex-col overflow-hidden">
          {issueStep === "form" && issueOrder && (
            <>
              {/* Sticky Header */}
              <div className="px-6 pt-6 pb-4 border-b border-white/5 flex-shrink-0">
                <DialogHeader>
                  <DialogTitle className="text-2xl font-semibold mb-1">Report Issue</DialogTitle>
                  <div className="text-sm text-[#8C8C8C]">Select the issue related to this order</div>
                </DialogHeader>
              </div>

              {/* Scrollable Body */}
              <div className="flex-1 overflow-y-auto px-6 py-4 space-y-5 no-scrollbar">
                <div className="bg-[#1A1A1D] border border-white/5 rounded-xl p-4 flex gap-4 items-center">
                  <div className="w-20 h-20 rounded-lg overflow-hidden bg-white/5 flex-shrink-0">
                    <img src={issueOrder.item.image} alt="Item" className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-[#E6B95F] font-medium text-sm mb-1">{issueOrder.id}</div>
                    <div className="font-semibold truncate text-[15px] mb-1">{issueOrder.item.name}</div>
                    <div className="text-xs text-[#8C8C8C] truncate">{issueOrder.seller.name} to {issueOrder.buyer.name}</div>
                  </div>
                </div>

                <div>
                  <div className="text-xs text-[#8C8C8C] uppercase font-medium mb-3">Issue Options</div>
                  <div className="space-y-3">
                    {issueOptions.map((opt) => {
                      const isSelected = selectedIssueOption === opt.id;
                      return (
                        <div 
                          key={opt.id}
                          onClick={() => setSelectedIssueOption(opt.id)}
                          className={`p-4 rounded-xl border flex items-center justify-between cursor-pointer transition-colors ${
                            isSelected ? 'bg-[#1A1A1D] border-[#E6B95F]' : 'bg-[#141416] border-white/10 hover:border-white/20'
                          }`}
                        >
                          <div>
                            <div className={`font-medium mb-1 ${isSelected ? 'text-[#E6B95F]' : 'text-white'}`}>{opt.id}</div>
                            <div className="text-xs text-[#8C8C8C]">{opt.desc}</div>
                          </div>
                          <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${isSelected ? 'border-[#E6B95F]' : 'border-white/20'}`}>
                            {isSelected && <div className="w-2.5 h-2.5 bg-[#E6B95F] rounded-full" />}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <div className="text-xs text-[#8C8C8C] uppercase font-medium mb-3">Add Details</div>
                  <textarea 
                    value={issueDetails}
                    onChange={(e) => setIssueDetails(e.target.value)}
                    placeholder="Type additional information.."
                    className="w-full bg-[#1A1A1D] border border-white/10 rounded-xl p-4 text-sm text-white placeholder:text-[#8C8C8C] min-h-[100px] resize-none focus:outline-none focus:ring-1 focus:ring-[#E6B95F]/50"
                  />
                </div>

                <div className="flex items-center gap-2 text-xs text-red-500">
                  <Info className="w-4 h-4 shrink-0" />
                  <span>This action may trigger refund or return flow</span>
                </div>
              </div>

              {/* Sticky Footer */}
              <div className="px-6 py-4 border-t border-white/5 flex-shrink-0">
                <button 
                  onClick={submitIssue}
                  className="w-full h-12 bg-gold-gradient text-black font-semibold rounded-full flex items-center justify-center gap-2 hover:opacity-90 transition-opacity">
                  Submit Issue <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </>
          )}

          {issueStep === "success" && (
            <div className="p-6 flex flex-col items-center text-center">
              <div className="w-28 h-28 rounded-full bg-[#1A1A1D] flex items-center justify-center my-8 relative">
                <div className="absolute inset-0 bg-[#00D22B]/10 rounded-full animate-ping" />
                <div className="w-16 h-16 rounded-full bg-gradient-to-b from-[#00E52F] to-[#00A321] flex items-center justify-center shadow-[0_0_30px_rgba(0,210,43,0.4)] relative z-10">
                  <Check className="w-8 h-8 text-white font-bold" strokeWidth={4} />
                </div>
              </div>
              
              <h2 className="text-2xl font-semibold mb-2">Issue reported</h2>
              <div className="text-sm text-[#8C8C8C] mb-8">Order status updated successfully</div>

              <div className="w-full bg-[#1A1A1D] border border-white/5 rounded-xl p-5 mb-8 text-left space-y-3">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-[#8C8C8C]">Report Reference</span>
                  <span className="font-semibold text-[#E6B95F]">#RP-992-K</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-[#8C8C8C]">Update Time</span>
                  <span className="font-medium text-white">Just now</span>
                </div>
              </div>

              <button 
                onClick={handleBackToDashboard}
                className="w-full h-12 bg-gold-gradient text-black font-semibold rounded-full flex items-center justify-center gap-2 hover:opacity-90 transition-opacity">
                Back To Dashboard <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
