"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Search, Calendar, ChevronDown, Phone, MapPin, Check, ArrowRight, Info, ShoppingBag, ChevronLeft, ShieldCheck, AlertTriangle, AlertCircle, Loader2, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useOrders, Order } from "@/context/OrdersContext";
import { formatImageUrl } from "@/lib/utils";
import { adminApi } from "@/lib/api";
import { ProductImageSlider } from "./ProductImageSlider";
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

// Exact SVG Icons from Closete UI Design File (1)
function SearchIcon({ className }: { className?: string }) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M9.58464 17.5003C13.9569 17.5003 17.5013 13.9559 17.5013 9.58366C17.5013 5.2114 13.9569 1.66699 9.58464 1.66699C5.21238 1.66699 1.66797 5.2114 1.66797 9.58366C1.66797 13.9559 5.21238 17.5003 9.58464 17.5003Z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M18.3346 18.3337L16.668 16.667"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CalendarIcon({ className }: { className?: string }) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M6.66797 1.66699V4.16699"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M13.332 1.66699V4.16699"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M2.91797 7.5752H17.0846"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M17.5 7.08366V14.167C17.5 16.667 16.25 18.3337 13.3333 18.3337H6.66667C3.75 18.3337 2.5 16.667 2.5 14.167V7.08366C2.5 4.58366 3.75 2.91699 6.66667 2.91699H13.3333C16.25 2.91699 17.5 4.58366 17.5 7.08366Z"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M13.0781 11.416H13.0856"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M13.0781 13.916H13.0856"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9.99609 11.416H10.0036"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9.99609 13.916H10.0036"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6.91016 11.416H6.91764"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6.91016 13.916H6.91764"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function VerifiedBadge({ className }: { className?: string }) {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M8.0026 14.6693C11.6693 14.6693 14.6693 11.6693 14.6693 8.0026C14.6693 4.33594 11.6693 1.33594 8.0026 1.33594C4.33594 1.33594 1.33594 4.33594 1.33594 8.0026C1.33594 11.6693 4.33594 14.6693 8.0026 14.6693Z"
        stroke="#107D2C"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M5.17188 8.00384L7.05854 9.89051L10.8385 6.11719"
        stroke="#107D2C"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}


export type IssueOptionItem = {
  id: string;
  desc: string;
  issueType: string;
  defaultOutcome: string;
  hasSubReasons?: boolean;
  subReasons?: string[];
};

export const getIssueOptionsForStatus = (status?: string): IssueOptionItem[] => {
  const s = (status || "Reserved").toLowerCase();

  // Stage 1: Reserved / Awaiting Collection
  if (s === "reserved" || s === "secured" || s === "collection_pending" || s === "awaiting collection") {
    return [
      {
        id: "Seller unavailable",
        desc: "Seller could not complete pickup",
        issueType: "seller_unavailable",
        defaultOutcome: "seller_unavailable",
      },
      {
        id: "Buyer cancelled",
        desc: "Buyer requested cancellation before collection",
        issueType: "buyer_refused",
        defaultOutcome: "buyer_changed_mind",
      },
      {
        id: "Other",
        desc: "Add issue manually",
        issueType: "others",
        defaultOutcome: "others",
      },
    ];
  }

  // Stage 2: Collected (At Hub / In transit to Hub)
  if (s === "collected" || s === "in_transit") {
    return [
      {
        id: "Item failed verification",
        desc: "Authentication mismatch detected",
        issueType: "verification_failed",
        defaultOutcome: "authentication_failed",
        hasSubReasons: true,
        subReasons: ["Authentication mismatch", "Counterfeit / Replica", "Missing proof of authenticity"],
      },
      {
        id: "Condition differs from listing",
        desc: "Undisclosed flaws, stains or damage found",
        issueType: "buyer_refused",
        defaultOutcome: "condition_differs",
      },
      {
        id: "Damaged in transit",
        desc: "Item was damaged during pickup/transit to hub",
        issueType: "buyer_refused",
        defaultOutcome: "condition_differs",
      },
      {
        id: "Buyer requested cancellation",
        desc: "Buyer requested cancellation after collection",
        issueType: "buyer_refused",
        defaultOutcome: "buyer_changed_mind",
      },
      {
        id: "Other",
        desc: "Add issue manually",
        issueType: "others",
        defaultOutcome: "others",
      },
    ];
  }

  // Stage 3: Verification / Authenticated
  if (s === "verified" || s === "verification" || s === "authenticated") {
    return [
      {
        id: "Item failed verification",
        desc: "Authentication mismatch detected",
        issueType: "verification_failed",
        defaultOutcome: "authentication_failed",
        hasSubReasons: true,
        subReasons: ["Authentication mismatch", "Counterfeit / Replica", "Missing proof of authenticity"],
      },
      {
        id: "Condition differs from listing",
        desc: "Undisclosed flaws, stains or damage found",
        issueType: "buyer_refused",
        defaultOutcome: "condition_differs",
      },
      {
        id: "Missing inclusions / packaging",
        desc: "Original box, dust bag or invoice missing",
        issueType: "buyer_refused",
        defaultOutcome: "not_as_described",
      },
      {
        id: "Other",
        desc: "Add issue manually",
        issueType: "others",
        defaultOutcome: "others",
      },
    ];
  }

  // Stage 4: Dispatched / Out for Delivery
  if (s === "dispatched" || s === "ready_for_delivery") {
    return [
      {
        id: "Buyer rejected",
        desc: "Buyer rejected item at delivery",
        issueType: "buyer_refused",
        defaultOutcome: "buyer_changed_mind",
        hasSubReasons: true,
        subReasons: ["Changed mind", "Not as described", "Condition issue", "Other"],
      },
      {
        id: "Buyer unreachable",
        desc: "Buyer could not be reached after delivery attempts",
        issueType: "buyer_refused",
        defaultOutcome: "others",
      },
      {
        id: "Damaged during delivery",
        desc: "Package damaged while out for delivery",
        issueType: "buyer_refused",
        defaultOutcome: "condition_differs",
      },
      {
        id: "Other",
        desc: "Add issue manually",
        issueType: "others",
        defaultOutcome: "others",
      },
    ];
  }

  // Stage 5: Delivered / Completed or fallback
  return [
    {
      id: "Post-delivery dispute",
      desc: "Buyer raised dispute within return window",
      issueType: "buyer_refused",
      defaultOutcome: "others",
    },
    {
      id: "Other",
      desc: "Add issue manually",
      issueType: "others",
      defaultOutcome: "others",
    },
  ];
};

const orderSteps = [
  { title: "Reserved", desc: "Item reserved for you" },
  { title: "Collected", desc: "Picked up from seller" },
  { title: "Authenticated", desc: "Authentication passed" },
  { title: "Dispatched", desc: "In transit to buyer" },
  { title: "Delivered", desc: "Delivered to buyer" }
];

type OrderTableProps = {
  title: string;
  filterStatus?: string | string[];
  showAllStatuses?: boolean;
};

export default function OrderTable({ title, filterStatus, showAllStatuses }: OrderTableProps) {
  const router = useRouter();
  const { orders, advanceOrder, resolveIssue, refreshOrders } = useOrders();

  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // Issue reporting state
  const [sheetView, setSheetView] = useState<"details" | "reportIssue">("details");
  const [issueStep, setIssueStep] = useState<"form" | "success">("form");
  const [selectedIssueOption, setSelectedIssueOption] = useState<string>("");
  const [subReason, setSubReason] = useState("");
  const [issueDetails, setIssueDetails] = useState("");
  const [isSubmittingIssue, setIsSubmittingIssue] = useState(false);
  const [issueSubmitError, setIssueSubmitError] = useState<string | null>(null);
  const [successUpdateOrderId, setSuccessUpdateOrderId] = useState<string | null>(null);

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDateFilter, setSelectedDateFilter] = useState("15 Jun, 2026");
  const [statusFilterOverride, setStatusFilterOverride] = useState<string>("All");

  useEffect(() => {
    if (selectedOrderId) {
      setCurrentImageIndex(0);
    }
  }, [selectedOrderId]);

  // Filter orders based on status & search query
  const filteredOrders = orders.filter((o) => {
    // 1. Status Filter
    if (statusFilterOverride !== "All") {
      if (statusFilterOverride === "Issues") {
        if (o.status !== "Issue" && o.status !== "Issues") return false;
      } else if (o.status.toLowerCase() !== statusFilterOverride.toLowerCase()) {
        return false;
      }
    } else if (!showAllStatuses && filterStatus) {
      if (Array.isArray(filterStatus)) {
        if (!filterStatus.includes(o.status)) return false;
      } else if (o.status !== filterStatus) {
        return false;
      }
    }

    // 2. Search Query (Order ID, Item Name, Seller Name, Buyer Name)
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      const matchId = (o.id || "").toLowerCase().includes(q);
      const matchItem = (o.item?.name || "").toLowerCase().includes(q);
      const matchSeller = (o.seller?.name || "").toLowerCase().includes(q);
      const matchBuyer = (o.buyer?.name || "").toLowerCase().includes(q);
      if (!matchId && !matchItem && !matchSeller && !matchBuyer) {
        return false;
      }
    }

    return true;
  });

  const selectedOrder = orders.find(o => o.id === selectedOrderId) || null;
  const successOrder = orders.find(o => o.id === successUpdateOrderId) || null;

  const handleProgress = () => {
    if (!selectedOrder) return;
    if (selectedOrder.progress >= 4) return;

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

  const currentAvailableOptions = selectedOrder
    ? getIssueOptionsForStatus(selectedOrder.status)
    : [];

  const openReportIssue = (order: Order) => {
    const opts = getIssueOptionsForStatus(order.status);
    setSelectedOrderId(order.id);
    setSheetView("reportIssue");
    setIssueStep("form");
    setSelectedIssueOption(opts[0]?.id || "Other");
    if (opts[0]?.hasSubReasons && opts[0]?.subReasons?.length) {
      setSubReason(opts[0].subReasons[0]);
    } else {
      setSubReason("");
    }
    setIssueDetails("");
    setIssueSubmitError(null);
  };

  const submitIssue = async () => {
    if (!selectedOrder) return;
    const prodId = selectedOrder.productId;
    const ordId = selectedOrder.backendId;

    if (!prodId && !ordId) {
      setIssueSubmitError("Order or Product reference is missing.");
      return;
    }

    const matchedOption = currentAvailableOptions.find(
      (opt) => opt.id === selectedIssueOption
    );

    let issueType = matchedOption?.issueType || "others";
    let outcome = matchedOption?.defaultOutcome || "others";
    let reason = matchedOption?.desc || "Issue reported";

    if (selectedIssueOption === "Item failed verification") {
      issueType = "verification_failed";
      outcome = subReason?.includes("Counterfeit") ? "counterfeit" : "authentication_failed";
      reason = subReason ? `Item failed verification: ${subReason}` : "Authentication mismatch detected";
    } else if (selectedIssueOption === "Buyer rejected at doorstep" || selectedIssueOption === "Buyer rejected") {
      issueType = "buyer_refused";
      if (subReason === "Not as described") {
        outcome = "not_as_described";
        reason = "Buyer reported that the item was not as described";
      } else if (subReason === "Condition issue") {
        outcome = "condition_differs";
        reason = "Buyer reported that the item condition differed from listing";
      } else if (subReason === "Changed mind") {
        outcome = "buyer_changed_mind";
        reason = "Buyer changed their mind at delivery";
      } else {
        outcome = "others";
        reason = issueDetails.trim() || subReason || "Buyer rejected item";
      }
    } else if (selectedIssueOption === "Seller unavailable") {
      issueType = "seller_unavailable";
      outcome = "seller_unavailable";
      reason = "Seller could not complete pickup or was unavailable";
    } else if (selectedIssueOption === "Buyer cancelled" || selectedIssueOption === "Buyer requested cancellation") {
      issueType = "buyer_refused";
      outcome = "buyer_changed_mind";
      reason = "Buyer requested order cancellation";
    } else if (selectedIssueOption === "Condition differs from listing" || selectedIssueOption === "Damaged in transit" || selectedIssueOption === "Damaged during delivery") {
      issueType = "buyer_refused";
      outcome = "condition_differs";
      reason = matchedOption?.desc || "Condition differs or item damaged";
    } else if (selectedIssueOption === "Missing inclusions / packaging") {
      issueType = "buyer_refused";
      outcome = "not_as_described";
      reason = "Original inclusions or packaging missing";
    } else if (selectedIssueOption === "Other") {
      issueType = "others";
      outcome = "others";
      reason = issueDetails.trim() || "Issue reported manually by admin";
    }

    setIsSubmittingIssue(true);
    setIssueSubmitError(null);
    try {
      const res = await adminApi.reportIssue({
        productId: prodId,
        orderId: ordId,
        issueType,
        outcome,
        reason,
      });

      if (!res.success) {
        setIssueSubmitError(res.message || "Failed to submit issue");
        return;
      }

      setSuccessUpdateOrderId(selectedOrder.id);
      await refreshOrders();
      setSelectedOrderId(null);
      setSheetView("details");
      setIssueStep("success");
    } catch (err: any) {
      setIssueSubmitError(err?.message || "Failed to report issue");
    } finally {
      setIsSubmittingIssue(false);
    }
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
          <h2 className="text-lg sm:text-xl font-semibold tracking-tight text-white">{title}</h2>

          <div className="flex flex-wrap items-center gap-2 md:gap-3">
            {/* Search Input */}
            <div className="relative flex-1 min-w-0 md:w-64 md:flex-none">
              <SearchIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#8C8C8C]" />
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search orders.."
                className="w-full bg-transparent border-white/10 rounded-full h-10 pl-10 pr-4 text-sm focus-visible:ring-[#FFAF2C]/30 text-white placeholder:text-[#8C8C8C]"
              />
            </div>

            {/* Date Filter Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-2 px-3.5 h-10 rounded-full border border-white/10 bg-transparent hover:bg-white/5 active:scale-95 transition-all text-sm text-[#EBEBEB] cursor-pointer shrink-0">
                  <CalendarIcon className="h-4 w-4 text-[#8C8C8C]" />
                  <span>{selectedDateFilter || "15 Jun, 2026"}</span>
                  <ChevronDown className="h-4 w-4 text-[#8C8C8C] ml-0.5" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-44 bg-[#1A1A1D] border-white/10 text-white rounded-xl shadow-2xl p-1">
                <DropdownMenuItem onClick={() => setSelectedDateFilter("Today")} className="focus:bg-white/10 cursor-pointer rounded-lg">Today</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSelectedDateFilter("Yesterday")} className="focus:bg-white/10 cursor-pointer rounded-lg">Yesterday</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSelectedDateFilter("Last 7 days")} className="focus:bg-white/10 cursor-pointer rounded-lg">Last 7 days</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSelectedDateFilter("Last 30 days")} className="focus:bg-white/10 cursor-pointer rounded-lg">Last 30 days</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSelectedDateFilter("All Time")} className="focus:bg-white/10 cursor-pointer rounded-lg">All Time</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Status Filter Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-2 px-4 h-10 rounded-full border border-white/10 bg-transparent hover:bg-white/5 active:scale-95 transition-all text-sm text-[#EBEBEB] cursor-pointer shrink-0">
                  <span>{statusFilterOverride || (showAllStatuses ? "All" : (Array.isArray(filterStatus) ? "All" : filterStatus || "All"))}</span>
                  <ChevronDown className="h-4 w-4 text-[#8C8C8C]" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-40 bg-[#1A1A1D] border-white/10 text-white rounded-xl shadow-2xl p-1">
                <DropdownMenuItem onClick={() => setStatusFilterOverride("All")} className="focus:bg-white/10 cursor-pointer rounded-lg">All</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setStatusFilterOverride("Reserved")} className="focus:bg-white/10 cursor-pointer rounded-lg">Reserved</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setStatusFilterOverride("Collected")} className="focus:bg-white/10 cursor-pointer rounded-lg">Collected</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setStatusFilterOverride("Verified")} className="focus:bg-white/10 cursor-pointer rounded-lg">Verified</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setStatusFilterOverride("Dispatched")} className="focus:bg-white/10 cursor-pointer rounded-lg">Dispatched</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setStatusFilterOverride("Delivered")} className="focus:bg-white/10 cursor-pointer rounded-lg">Delivered</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setStatusFilterOverride("Issues")} className="focus:bg-white/10 cursor-pointer rounded-lg">Issues</DropdownMenuItem>
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
                    <img
                      src={formatImageUrl(order.item.image)}
                      alt={order.item.name}
                      onError={(e) => {
                        (e.currentTarget as HTMLImageElement).src = "/gucchi-bag.webp";
                      }}
                      className="w-full h-full object-cover"
                    />
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
                    <div className="flex flex-col flex-1 min-w-0">
                      <div className="flex items-center gap-1.5 text-[#EBEBEB]">
                        <span className="truncate">{order.seller.name}</span>
                        {order.seller.payoutsEnabled && (
                          <span title="Stripe Payout Account Connected" className="inline-flex items-center">
                            <VerifiedBadge className="shrink-0" />
                          </span>
                        )}
                      </div>
                      <span className="text-[#8C8C8C] text-[11px] mt-0.5">{order.seller.location}</span>
                    </div>
                  </div>
                  <div className="flex">
                    <span className="w-20 text-[#8C8C8C] shrink-0">Buyer :</span>
                    <div className="flex flex-col flex-1 min-w-0">
                      <span className="text-[#EBEBEB] truncate">{order.buyer.name}</span>
                      <span className="text-[#8C8C8C] text-[11px] mt-0.5">{order.buyer.location}</span>
                    </div>
                  </div>
                  <div className="flex">
                    <span className="w-20 text-[#8C8C8C] shrink-0">Pickup :</span>
                    <span className="text-[#EBEBEB]">{order.pickup}</span>
                  </div>
                  <div className="flex">
                    <span className="w-20 text-[#8C8C8C] shrink-0">Delivery :</span>
                    <span className="text-[#EBEBEB]">{order.delivery}</span>
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
                <th className="px-6 py-5 border-y border-r border-white/5 rounded-r-2xl">STATUS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center py-24 text-[#8C8C8C]">
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
                          <img
                            src={formatImageUrl(order.item.image)}
                            alt={order.item.name}
                            onError={(e) => {
                              (e.currentTarget as HTMLImageElement).src = "/gucchi-bag.webp";
                            }}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <span className="font-medium text-[#EBEBEB] w-24 truncate">{order.item.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <div className="flex items-center gap-1.5">
                          <span className="font-medium text-[#EBEBEB]">{order.seller.name}</span>
                          {order.seller.payoutsEnabled && (
                            <span title="Stripe Payout Account Connected" className="inline-flex items-center">
                              <VerifiedBadge className="shrink-0" />
                            </span>
                          )}
                        </div>
                        <span className="text-xs text-[#8C8C8C] mt-0.5">{order.seller.location}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className="font-medium text-[#EBEBEB]">{order.buyer.name}</span>
                        <span className="text-xs text-[#8C8C8C] mt-0.5">{order.buyer.location}</span>
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
                <ProductImageSlider
                  images={selectedOrder?.item.images}
                  singleImageFallback={selectedOrder?.item.image}
                  itemName={selectedOrder?.item.name}
                  heightClass="h-40 sm:h-48"
                />

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
                  <div className="bg-[#1A1A1D] rounded-xl p-4 sm:p-5 flex gap-4">
                    {/* Pickup */}
                    <div className="flex-1">
                      <div className="border-l border-white pl-3 sm:pl-4">
                        <div className="text-xs text-[#8C8C8C] mb-1.5">Pickup Window</div>
                        <div className="text-sm font-medium text-white leading-snug">{selectedOrder?.pickup.split('•').join(' · ')}</div>
                      </div>
                    </div>
                    {/* Delivery */}
                    <div className="flex-1">
                      <div className="border-l border-white pl-3 sm:pl-4">
                        <div className="text-xs text-[#8C8C8C] mb-1.5">Estimated Delivery</div>
                        <div className="text-sm font-medium text-white leading-snug">{selectedOrder?.delivery}</div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Seller / Buyer */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="flex-1">
                    <div className="text-sm text-[#8C8C8C] uppercase mb-2 font-medium flex items-center justify-between">
                      <span>Seller</span>
                      <span className="inline-flex items-center gap-1 text-[11px] font-medium text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20 capitalize tracking-normal">
                        <Check className="w-3 h-3" /> Payout Account Connected
                      </span>
                    </div>
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
                {selectedOrder && selectedOrder.status !== "Issue" && selectedOrder.progress < 4 && (
                  <div className="flex flex-col sm:flex-row gap-3 w-full">
                    <button
                      onClick={handleProgress}
                      className="w-full py-3.5 bg-gold-gradient text-black font-semibold rounded-full flex items-center justify-center gap-2 hover:opacity-90 transition-opacity border-0 outline-none text-sm cursor-pointer">
                      {selectedOrder.progress === 0 && "Mark As Collected"}
                      {selectedOrder.progress === 1 && "Mark As Authenticated"}
                      {selectedOrder.progress === 2 && "Mark As Dispatched"}
                      {selectedOrder.progress === 3 && "Mark As Delivered"}
                      <ArrowRight className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => openReportIssue(selectedOrder)}
                      className="w-full py-3.5 bg-[#27272A] text-[#8C8C8C] font-semibold rounded-full flex items-center justify-center hover:bg-white/5 transition-colors border border-white/10 text-sm cursor-pointer">
                      Report an Issue
                    </button>
                  </div>
                )}
              </div>

            </div>
          )}

        </SheetContent>
      </Sheet>

      {/* Report Issue Sheet */}
      <Sheet open={sheetView === "reportIssue" && issueStep === "form"} onOpenChange={(open) => !open && setSheetView("details")}>
        <SheetContent
          side="right"
          showCloseButton={false}
          className="w-full max-w-[550px] bg-black border-l border-white/10 text-white p-0 overflow-hidden flex flex-col"
        >
          {selectedOrder && (
            <div className="flex flex-col h-full w-full">
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
                    <img
                      src={formatImageUrl(selectedOrder.item.image)}
                      alt="Item"
                      onError={(e) => {
                        (e.currentTarget as HTMLImageElement).src = "/gucchi-bag.webp";
                      }}
                      className="w-full h-full object-cover"
                    />
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
                    {currentAvailableOptions.map((opt) => {
                      const isSelected = selectedIssueOption === opt.id;
                      const hasSub = !!(opt.hasSubReasons && opt.subReasons?.length);
                      return (
                        <div key={opt.id} className="space-y-2">
                          <div
                            onClick={() => {
                              setSelectedIssueOption(opt.id);
                              if (hasSub && opt.subReasons?.length) {
                                setSubReason(opt.subReasons[0]);
                              } else {
                                setSubReason("");
                              }
                              if (opt.id !== "Other") {
                                setIssueDetails("");
                              }
                            }}
                            className={`${isSelected && hasSub ? 'flex flex-col gap-3' : 'flex items-center justify-between'} p-4 rounded-xl border cursor-pointer transition-colors ${isSelected ? 'bg-[#1A1A1D] border-[#FFAF2C]' : 'bg-black border-white/10 hover:border-white/20'}`}
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
                            {isSelected && hasSub && opt.subReasons && (
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
                                  <span>{subReason || opt.subReasons[0]}</span>
                                  {dropdownOpen
                                    ? <ChevronDown className="w-4 h-4 text-[#8C8C8C] rotate-180 transition-transform" />
                                    : <ChevronDown className="w-4 h-4 text-[#8C8C8C] transition-transform" />}
                                </button>

                                {/* Dropdown list */}
                                {dropdownOpen && (
                                  <div className="absolute left-0 right-0 top-[calc(100%+4px)] bg-[#1E1E21] rounded-xl border border-white/10 overflow-hidden z-50 shadow-2xl">
                                    {opt.subReasons.map((sub) => (
                                      <button
                                        key={sub}
                                        type="button"
                                        onClick={() => {
                                          setSubReason(sub);
                                          setDropdownOpen(false);
                                        }}
                                        className="w-full flex items-center justify-between px-4 py-3.5 text-sm text-[#8C8C8C] hover:bg-white/5 transition-colors text-left"
                                      >
                                        <span className={subReason === sub ? "text-white font-medium" : ""}>{sub}</span>
                                        {subReason === sub && (
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

                {issueSubmitError && (
                  <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-xl text-xs text-red-400">
                    {issueSubmitError}
                  </div>
                )}

                <div className="flex items-center gap-2 text-xs text-red-500">
                  <Info className="w-4 h-4 shrink-0" />
                  <span>This action may trigger refund or return flow</span>
                </div>
              </div>

              {/* Fixed Footer */}
              <div className="p-4 sm:px-6 sm:py-5 border-t border-white/5 flex-shrink-0 bg-black">
                <button
                  onClick={submitIssue}
                  disabled={isSubmittingIssue || (selectedIssueOption === "Other" && issueDetails.trim() === "")}
                  className={`w-full py-3.5 text-sm font-semibold rounded-full flex items-center justify-center gap-2 transition-all ${
                    isSubmittingIssue || (selectedIssueOption === "Other" && issueDetails.trim() === "")
                    ? "bg-white/10 text-[#8C8C8C] cursor-not-allowed"
                    : "bg-gold-gradient text-black hover:opacity-90"
                    }`}>
                  {isSubmittingIssue ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" /> Submitting Issue...
                    </>
                  ) : (
                    <>
                      Submit Issue <ArrowRight className="w-5 h-5" />
                    </>
                  )}
                </button>
              </div>
            </div>
          )}
        </SheetContent>
      </Sheet>

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
                  <img
                    src={formatImageUrl(successOrder.item.image)}
                    alt={successOrder.item.name}
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src = "/gucchi-bag.webp";
                    }}
                    className="w-full h-full object-cover"
                  />
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
