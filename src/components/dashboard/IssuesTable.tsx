"use client";
import React, { useState, useEffect, useCallback, useRef } from "react";
import {
  AlertCircle,
  CheckCircle2,
  Trash2,
  RotateCcw,
  Loader2,
  MapPin,
  Phone,
  ArrowRight,
  X,
  ShieldAlert,
  Info,
  ChevronDown,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
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
import { adminApi } from "@/lib/api";
import { formatImageUrl } from "@/lib/utils";
import { ProductImageSlider } from "./ProductImageSlider";

// Exact SVG Icons from Closete UI Design File
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
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <circle cx="7" cy="7" r="6" fill="#107D2C" />
      <path d="M4.5 7L6.2 8.7L9.5 5.3" stroke="white" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export interface IssueItem {
  _id: string;
  issueType: string;
  outcome?: string;
  reason?: string;
  resolved: boolean;
  createdAt: string;
  updatedAt: string;
  order?: any;
  orderNumber?: string;
  product?: {
    _id: string;
    name?: string;
    brand?: string;
    price?: number;
    images?: string[];
    image?: string;
    condition?: string;
    description?: string;
    status?: string;
  };
  seller?: {
    _id?: string;
    name?: string;
    email?: string;
    phone?: string;
    contact?: string;
    location?: string;
    country?: string;
    avatar?: string;
    image?: string;
    payoutsEnabled?: boolean;
  };
  buyer?: {
    _id?: string;
    name?: string;
    email?: string;
    phone?: string;
    contact?: string;
    location?: string;
    country?: string;
    avatar?: string;
    image?: string;
  };
}

export default function IssuesTable() {
  const [issues, setIssues] = useState<IssueItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDateFilter, setSelectedDateFilter] = useState("All Time");
  const [statusFilterOverride, setStatusFilterOverride] = useState<string>("All");

  const [selectedIssueState, setSelectedIssueState] = useState<IssueItem | null>(null);
  const [activeIssue, setActiveIssue] = useState<IssueItem | null>(null);
  const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleCloseDrawer = () => {
    setSelectedIssueState(null);
    if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
    closeTimeoutRef.current = setTimeout(() => {
      setActiveIssue(null);
    }, 400);
  };

  const setSelectedIssue = (issue: IssueItem | null) => {
    if (issue === null) {
      handleCloseDrawer();
    } else {
      if (closeTimeoutRef.current) {
        clearTimeout(closeTimeoutRef.current);
        closeTimeoutRef.current = null;
      }
      setSelectedIssueState(issue);
      setActiveIssue(issue);
    }
  };

  const selectedIssue = selectedIssueState || activeIssue;
  const [resolveActionType, setResolveActionType] = useState<"make_available" | "delete" | null>(null);
  const [isResolving, setIsResolving] = useState<boolean>(false);
  const [resolveError, setResolveError] = useState<string | null>(null);

  const fetchIssues = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await adminApi.getIssues();
      if (res.success && Array.isArray(res.data)) {
        setIssues(res.data);
      } else {
        setIssues([]);
      }
    } catch (err) {
      console.error("Failed to fetch issues:", err);
      setIssues([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchIssues();
  }, [fetchIssues]);

  // Filtered issues
  const filteredIssues = issues.filter((issue) => {
    // Status Filter
    if (statusFilterOverride === "Unresolved" && issue.resolved) return false;
    if (statusFilterOverride === "Resolved" && !issue.resolved) return false;

    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      const cleanQ = q.replace(/^#/, "");
      const prodName = issue.product?.name?.toLowerCase() || "";
      const brand = issue.product?.brand?.toLowerCase() || "";
      const reason = issue.reason?.toLowerCase() || "";
      const buyerName = issue.buyer?.name?.toLowerCase() || "";
      const sellerName = issue.seller?.name?.toLowerCase() || "";
      const orderNum = (
        issue.orderNumber ||
        issue.order?.orderNumber ||
        issue._id
      )?.toString().toLowerCase();

      if (
        !prodName.includes(q) &&
        !brand.includes(q) &&
        !reason.includes(q) &&
        !buyerName.includes(q) &&
        !sellerName.includes(q) &&
        !orderNum.includes(q) &&
        !orderNum.includes(cleanQ)
      ) {
        return false;
      }
    }

    // Date filter
    if (selectedDateFilter !== "All Time") {
      if (!issue.createdAt) {
        if (selectedDateFilter === "Yesterday") return false;
      } else {
        const itemDate = new Date(issue.createdAt);
        const now = new Date();
        if (selectedDateFilter === "Today") {
          if (itemDate.toDateString() !== now.toDateString()) return false;
        } else if (selectedDateFilter === "Yesterday") {
          const yesterday = new Date(now);
          yesterday.setDate(yesterday.getDate() - 1);
          if (itemDate.toDateString() !== yesterday.toDateString()) return false;
        } else if (selectedDateFilter === "Last 7 days") {
          const sevenDaysAgo = new Date(now);
          sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
          if (itemDate < sevenDaysAgo) return false;
        } else if (selectedDateFilter === "Last 30 days") {
          const thirtyDaysAgo = new Date(now);
          thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
          if (itemDate < thirtyDaysAgo) return false;
        }
      }
    }

    return true;
  });

  const handleExecuteResolve = async () => {
    if (!selectedIssue || !resolveActionType) return;

    setIsResolving(true);
    setResolveError(null);
    try {
      const res = await adminApi.resolveIssue(selectedIssue._id, resolveActionType);
      if (!res.success) {
        setResolveError(res.message || "Failed to resolve issue");
        return;
      }

      await fetchIssues();
      setSelectedIssue(null);
      setResolveActionType(null);
    } catch (err: any) {
      setResolveError(err?.message || "Failed to resolve issue");
    } finally {
      setIsResolving(false);
    }
  };

  const formatIssueType = (type?: string) => {
    if (!type) return "Issue";
    switch (type) {
      case "verification_failed":
        return "Verification Failed";
      case "buyer_refused":
        return "Buyer Refused";
      case "seller_unavailable":
        return "Seller Unavailable";
      case "others":
        return "Manual Issue";
      default:
        return type.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
    }
  };

  const getProductImage = (prod?: IssueItem["product"]) => {
    if (!prod) return "/gucchi-bag.webp";
    if (prod.images && prod.images.length > 0) return formatImageUrl(prod.images[0]);
    if (prod.image) return formatImageUrl(prod.image);
    return "/gucchi-bag.webp";
  };

  const getDisplayOrderId = (issue: IssueItem) => {
    if (issue.orderNumber) return issue.orderNumber;
    if (issue.order?.orderNumber) return issue.order.orderNumber;
    return issue._id ? `#${issue._id.slice(-6).toUpperCase()}` : "N/A";
  };

  return (
    <>
      <div className="w-full h-full text-white bg-[#1A1A1D] rounded-2xl overflow-hidden">
        {/* Header matching exact dashboard standard */}
        <div className="p-4 sm:p-6 flex flex-col md:flex-row md:items-center justify-between gap-3 md:gap-4 border-b border-white/[0.04]">
          <h2 className="text-lg sm:text-xl font-semibold tracking-tight text-white">
            Issues
          </h2>

          <div className="flex flex-wrap items-center gap-2 md:gap-3">
            {/* Search Input */}
            <div className="relative flex-1 min-w-0 md:w-64 md:flex-none">
              <SearchIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#8C8C8C]" />
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search orders.."
                className="w-full bg-transparent border-white/10 rounded-full h-10 pl-10 pr-9 text-sm focus-visible:ring-[#FFAF2C]/30 text-white placeholder:text-[#8C8C8C]"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8C8C8C] hover:text-white transition-colors"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Date Filter Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-2 px-3.5 h-10 rounded-full border border-white/10 bg-transparent hover:bg-white/5 active:scale-95 transition-all text-sm text-[#EBEBEB] cursor-pointer shrink-0">
                  <CalendarIcon className="h-4 w-4 text-[#8C8C8C]" />
                  <span>{selectedDateFilter || "All Time"}</span>
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
          </div>
        </div>

        {/* Mobile View */}
        <div className="md:hidden px-3 py-4 space-y-3">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-20 text-[#8C8C8C]">
              <Loader2 className="w-8 h-8 animate-spin text-[#FFAF2C] mb-3" />
              <p className="text-sm">Loading issues...</p>
            </div>
          ) : filteredIssues.length === 0 ? (
            <div className="flex flex-col items-center justify-center gap-2 py-16 text-[#8C8C8C]">
              <img src="/empty-cart.png" alt="No issues" className="w-24 h-24 object-contain mb-4 opacity-70" />
              <h3 className="text-xl font-semibold text-white">No issues found</h3>
              <p className="text-sm text-center">There are currently no recorded issues matching this filter</p>
            </div>
          ) : (
            filteredIssues.map((issue) => (
              <div
                key={issue._id}
                onClick={() => setSelectedIssue(issue)}
                className="bg-[#1A1A1D] rounded-2xl p-4 cursor-pointer active:opacity-80 transition-opacity border border-white/5 space-y-3"
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="font-semibold text-sm text-[#FFAF2C]">{getDisplayOrderId(issue)}</span>
                  <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold ${
                    issue.resolved ? "bg-[#107D2C]/15 text-[#107D2C] border border-[#107D2C]/30" : "bg-red-500/15 text-red-400 border border-red-500/30"
                  }`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${issue.resolved ? "bg-[#107D2C]" : "bg-red-500"}`} />
                    {issue.resolved ? "Resolved" : "Issue"}
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-white/5 overflow-hidden flex-shrink-0 border border-white/10">
                    <img
                      src={getProductImage(issue.product)}
                      alt={issue.product?.name || "Product"}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.currentTarget as HTMLImageElement).src = "/gucchi-bag.webp";
                      }}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-white truncate text-sm">
                      {issue.product?.name || "Product"}
                    </div>
                    <div className="text-xs text-[#8C8C8C]">
                      {issue.product?.brand || "Brand"} • AED {issue.product?.price?.toLocaleString() || "0"}
                    </div>
                  </div>
                </div>

                {issue.reason && (
                  <p className="text-xs text-[#8C8C8C] line-clamp-2 bg-white/[0.02] p-2.5 rounded-xl border border-white/5">
                    {issue.reason}
                  </p>
                )}
              </div>
            ))
          )}
        </div>

        {/* Desktop Table View matching OrderTable design */}
        <div className="hidden md:block w-full overflow-x-auto overflow-y-hidden px-6 pt-4 pb-6">
          <table className="w-full text-sm text-left border-separate border-spacing-0">
            <thead>
              <tr className="text-xs text-[#8C8C8C] bg-white/5 uppercase font-semibold">
                <th className="px-6 py-5 border-y border-l border-white/5 rounded-l-2xl">ORDER ID</th>
                <th className="px-6 py-5 border-y border-white/5">ITEM</th>
                <th className="px-6 py-5 border-y border-white/5">SELLER</th>
                <th className="px-6 py-5 border-y border-white/5">BUYER</th>
                <th className="px-6 py-5 border-y border-white/5">ISSUE REASON</th>
                <th className="px-6 py-5 border-y border-r border-white/5 rounded-r-2xl">STATUS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {isLoading ? (
                <tr>
                  <td colSpan={6} className="text-center py-24 text-[#8C8C8C]">
                    <div className="flex flex-col items-center justify-center">
                      <Loader2 className="w-8 h-8 animate-spin text-[#FFAF2C] mb-3" />
                      <p className="text-sm">Loading reported issues...</p>
                    </div>
                  </td>
                </tr>
              ) : filteredIssues.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-24 text-[#8C8C8C]">
                    <div className="flex flex-col items-center justify-center gap-2">
                      <img
                        src="/empty-cart.png"
                        alt="No issues"
                        className="w-32 h-32 object-contain mb-6 opacity-70"
                      />
                      <h3 className="text-2xl font-semibold text-white mb-1">No issues found</h3>
                      <p className="text-sm text-[#8C8C8C] mb-6">There are currently no recorded issues matching this filter</p>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredIssues.map((issue) => {
                  const prodImg = getProductImage(issue.product);
                  return (
                    <tr
                      key={issue._id}
                      className="hover:bg-white/[0.02] transition-colors group cursor-pointer"
                      onClick={() => setSelectedIssue(issue)}
                    >
                      {/* ORDER ID */}
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="font-semibold text-[#FFAF2C]">{getDisplayOrderId(issue)}</span>
                      </td>

                      {/* ITEM */}
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded bg-white/10 flex-shrink-0 overflow-hidden">
                            <img
                              src={prodImg}
                              alt={issue.product?.name || "Product"}
                              onError={(e) => {
                                (e.currentTarget as HTMLImageElement).src = "/gucchi-bag.webp";
                              }}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="flex flex-col min-w-0">
                            <span className="font-medium text-[#EBEBEB] truncate max-w-[140px]">{issue.product?.name || "Product"}</span>
                            <span className="text-xs text-[#8C8C8C]">{issue.product?.brand || "Brand"}</span>
                          </div>
                        </div>
                      </td>

                      {/* SELLER */}
                      <td className="px-6 py-4">
                        <div className="flex flex-col">
                          <div className="flex items-center gap-1.5">
                            <span className="font-medium text-[#EBEBEB]">{issue.seller?.name || "Seller"}</span>
                            {issue.seller?.payoutsEnabled && (
                              <span title="Payout Verified" className="inline-flex items-center">
                                <VerifiedBadge className="shrink-0" />
                              </span>
                            )}
                          </div>
                          <span className="text-[#8C8C8C] text-xs mt-0.5 max-w-[180px] truncate">{issue.seller?.location || "Dubai, UAE"}</span>
                        </div>
                      </td>

                      {/* BUYER */}
                      <td className="px-6 py-4">
                        <div className="flex flex-col">
                          <span className="font-medium text-[#EBEBEB]">{issue.buyer?.name || "Buyer"}</span>
                          <span className="text-[#8C8C8C] text-xs mt-0.5 max-w-[180px] truncate">{issue.buyer?.location || "Dubai, UAE"}</span>
                        </div>
                      </td>

                      {/* ISSUE REASON */}
                      <td className="px-6 py-4 max-w-xs">
                        <p className="text-xs text-white/90 line-clamp-2">
                          {issue.reason || formatIssueType(issue.issueType)}
                        </p>
                        <span className="text-[11px] text-[#8C8C8C]">
                          {new Date(issue.createdAt).toLocaleDateString()}
                        </span>
                      </td>

                      {/* STATUS */}
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${
                          issue.resolved
                            ? "bg-[#107D2C]/15 text-[#107D2C] border border-[#107D2C]/30"
                            : "bg-red-500/15 text-red-400 border border-red-500/30"
                        }`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${issue.resolved ? "bg-[#107D2C]" : "bg-red-500"}`} />
                          {issue.resolved ? "Resolved" : "Issue"}
                        </span>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Details Drawer matching OrderTable Drawer */}
      <Sheet open={Boolean(selectedIssueState)} onOpenChange={(open) => !open && setSelectedIssue(null)}>
        <SheetContent showCloseButton={false} className="w-full max-w-[550px] bg-black border-l border-white/10 text-white p-0 overflow-hidden flex flex-col z-50">
          {selectedIssue && (
            <div className="flex flex-col h-full w-full">
              {/* Sticky Header */}
              <div className="px-4 sm:px-6 pt-4 pb-2 flex-shrink-0 flex items-center justify-between">
                <div>
                  <SheetTitle className="text-2xl font-semibold text-white">
                    Issue Details
                  </SheetTitle>
                  <SheetDescription className="sr-only">
                    Issue details and resolution
                  </SheetDescription>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedIssue(null)}
                  className="w-6 h-6 flex items-center justify-center rounded-full border-2 border-white hover:border-white transition-colors text-white hover:text-white flex-shrink-0 cursor-pointer"
                  aria-label="Close"
                >
                  <X className="w-3 h-3" strokeWidth={2.5} />
                </button>
              </div>

              {/* Scrollable Body */}
              <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-4 pb-6 no-scrollbar space-y-4">
                {/* Product Image Slider */}
                <ProductImageSlider
                  images={selectedIssue.product?.images}
                  singleImageFallback={selectedIssue.product?.image}
                  itemName={selectedIssue.product?.name}
                  heightClass="h-40 sm:h-48"
                />

                {/* Header Info */}
                <div className="flex justify-between items-start">
                  <div>
                    <div className="text-[#FFAF2C] font-semibold mb-1 text-base">
                      {getDisplayOrderId(selectedIssue)}
                    </div>
                    <h3 className="text-xl sm:text-2xl font-medium">{selectedIssue.product?.name || "Product"}</h3>
                    <p className="text-sm sm:text-base text-[#8C8C8C]">{selectedIssue.product?.brand || "Brand"}</p>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium mb-2 ${
                      selectedIssue.resolved
                        ? "bg-[#107D2C]/15 text-[#107D2C] border border-[#107D2C]/30"
                        : "bg-red-500/15 text-red-400 border border-red-500/30"
                    }`}>
                      <span className={`w-2 h-2 rounded-full ${selectedIssue.resolved ? "bg-[#107D2C]" : "bg-red-500"}`} />
                      {selectedIssue.resolved ? "Resolved" : "Issue"}
                    </span>
                    <span className="font-semibold text-lg">
                      AED {selectedIssue.product?.price?.toLocaleString() || "0"}
                    </span>
                  </div>
                </div>

                {/* Seller / Buyer Cards with equal height */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full">
                  {/* SELLER */}
                  <div className="flex flex-col min-w-0">
                    <div className="text-xs text-[#8C8C8C] uppercase mb-2 font-medium">
                      SELLER
                    </div>
                    <div className="bg-[#1A1A1D] rounded-xl p-4 sm:p-5 flex-1 flex flex-col min-w-0">
                      <div className="font-semibold text-base sm:text-lg mb-2 text-white truncate">
                        {selectedIssue.seller?.name || "Seller"}
                      </div>
                      <div className="inline-flex items-center gap-1.5 text-xs text-[#107D2C] font-medium bg-[#107D2C]/10 border border-[#107D2C]/30 px-2.5 py-1 rounded-lg select-none mb-3 self-start">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#107D2C] shrink-0" strokeWidth={2} />
                        <span>Payout Verified</span>
                      </div>
                      <div className="mt-auto space-y-2 min-w-0">
                        <div className="flex items-center gap-2 text-xs sm:text-sm text-[#8C8C8C] min-w-0">
                          <Phone className="w-4 h-4 shrink-0" /> <span className="truncate">{selectedIssue.seller?.phone || selectedIssue.seller?.contact || "+1 (626) 389-2743"}</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs sm:text-sm text-[#8C8C8C] min-w-0">
                          <MapPin className="w-4 h-4 shrink-0" /> <span className="truncate" title={selectedIssue.seller?.location}>{selectedIssue.seller?.location || "703, Marina Quays East Tower, Dubai, UAE"}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* BUYER */}
                  <div className="flex flex-col min-w-0">
                    <div className="text-xs text-[#8C8C8C] uppercase mb-2 font-medium">
                      BUYER
                    </div>
                    <div className="bg-[#1A1A1D] rounded-xl p-4 sm:p-5 flex-1 flex flex-col min-w-0">
                      <div className="font-semibold text-base sm:text-lg mb-2 text-white truncate">
                        {selectedIssue.buyer?.name || "Buyer"}
                      </div>
                      <div className="mt-auto space-y-2 min-w-0">
                        <div className="flex items-center gap-2 text-xs sm:text-sm text-[#8C8C8C] min-w-0">
                          <Phone className="w-4 h-4 shrink-0" /> <span className="truncate">{selectedIssue.buyer?.phone || selectedIssue.buyer?.contact || "+1 (145) 125-3622"}</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs sm:text-sm text-[#8C8C8C] min-w-0">
                          <MapPin className="w-4 h-4 shrink-0" /> <span className="truncate" title={selectedIssue.buyer?.location}>{selectedIssue.buyer?.location || "2003, One Park Avenue, Sobha Hartland, Dubai, UAE"}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* NOTE Section */}
                <div>
                  <div className="text-xs text-[#8C8C8C] uppercase mb-2 font-medium">NOTE</div>
                  <div className="bg-[#1A1A1D] rounded-xl p-4">
                    <div className="text-xs sm:text-sm text-[#8C8C8C] leading-relaxed">
                      {selectedIssue.reason || "Visible scratches reported on the hardware. Buyer declined acceptance at delivery."}
                    </div>
                  </div>
                </div>

                {/* Issue Details Box */}
                <div>
                  <div className="text-xs text-[#8C8C8C] uppercase mb-2 font-medium">Issue Information</div>
                  <div className="bg-[#1A1A1D] rounded-xl p-4 border border-white/5 space-y-3">
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-[#8C8C8C]">Issue Type</span>
                      <span className="font-semibold text-white">{formatIssueType(selectedIssue.issueType)}</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-[#8C8C8C]">Reported At</span>
                      <span className="font-semibold text-white">{new Date(selectedIssue.createdAt).toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-[#8C8C8C]">Buyer Resolution</span>
                      <span className="font-semibold text-green-400">Refunded</span>
                    </div>
                  </div>
                </div>

                {/* Resolution Actions */}
                {!selectedIssue.resolved && (
                  <div className="pt-2 space-y-2.5">
                    <button
                      onClick={() => setResolveActionType("make_available")}
                      className="w-full py-3.5 px-6 rounded-full text-sm font-bold bg-gold-gradient text-black flex items-center justify-center gap-2 hover:opacity-95 active:scale-[0.98] transition-all cursor-pointer shadow-lg shadow-[#D6A042]/20"
                    >
                      <RotateCcw className="w-4 h-4" />
                      <span>Make Available (Re-list Product)</span>
                    </button>

                    <button
                      onClick={() => setResolveActionType("delete")}
                      className="w-full py-3.5 px-6 rounded-full text-sm font-semibold bg-[#242428] hover:bg-[#2C2C32] text-red-400 hover:text-red-300 transition-colors flex items-center justify-center gap-2 cursor-pointer border border-red-500/20"
                    >
                      <Trash2 className="w-4 h-4" />
                      <span>Delete Product Permanently</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
        </SheetContent>
      </Sheet>

      {/* Confirmation Dialog */}
      <Dialog
        open={Boolean(resolveActionType)}
        onOpenChange={(open) => !open && !isResolving && setResolveActionType(null)}
      >
        <DialogContent className="bg-[#1A1A1D] border border-white/10 text-white max-w-md rounded-3xl p-6">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold flex items-center gap-2">
              {resolveActionType === "make_available" ? (
                <>
                  <RotateCcw className="w-5 h-5 text-[#FFAF2C]" /> Confirm Re-listing Product
                </>
              ) : (
                <>
                  <Trash2 className="w-5 h-5 text-red-500" /> Confirm Permanent Deletion
                </>
              )}
            </DialogTitle>
            <DialogDescription className="text-sm text-[#8C8C8C] pt-2">
              {resolveActionType === "make_available" ? (
                <span>
                  This will mark the issue as <strong>Resolved</strong> and set the product status back to <strong>Live</strong> on the marketplace so other buyers can purchase it.
                </span>
              ) : (
                <span>
                  This will permanently <strong>Delete</strong> the product from storage and remove it from all listings. This action cannot be undone.
                </span>
              )}
            </DialogDescription>
          </DialogHeader>

          {resolveError && (
            <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs mt-2">
              {resolveError}
            </div>
          )}

          <div className="flex items-center justify-end gap-3 mt-6">
            <button
              disabled={isResolving}
              onClick={() => setResolveActionType(null)}
              className="px-5 py-2.5 rounded-full text-sm font-medium text-[#8C8C8C] hover:text-white transition-colors"
            >
              Cancel
            </button>
            <button
              disabled={isResolving}
              onClick={handleExecuteResolve}
              className={`px-6 py-2.5 rounded-full text-sm font-semibold flex items-center gap-2 transition-all ${
                resolveActionType === "make_available"
                  ? "bg-gold-gradient text-black hover:opacity-90 font-bold"
                  : "bg-red-500 hover:bg-red-600 text-white shadow-lg shadow-red-500/20"
              }`}
            >
              {isResolving ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" /> Processing...
                </>
              ) : resolveActionType === "make_available" ? (
                "Make Live"
              ) : (
                "Delete Permanently"
              )}
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
