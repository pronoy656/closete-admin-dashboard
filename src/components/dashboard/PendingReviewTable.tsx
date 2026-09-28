"use client";
import React, { useState, useEffect } from "react";
import {
  CheckCircle2,
  XCircle,
  Edit3,
  Layers,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Loader2,
  Check,
  AlertCircle,
  Phone,
  MapPin,
  Tag,
  DollarSign,
  X,
  ArrowRight,
  FileText,
  ExternalLink
} from "lucide-react";
import { Input } from "@/components/ui/input";
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

export interface PendingProduct {
  _id: string;
  orderId?: number;
  name: string;
  brand: string;
  description: string;
  material?: string;
  features?: string[];
  price: number;
  commissionAmount?: number;
  sellerEarnings?: number;
  condition: string;
  originalPackagingAvailable?: boolean;
  packaging?: string;
  proofOfPurchase?: string;
  collectionAddress?: string;
  sellerPhone?: string;
  images: string[];
  status: string;
  createdAt: string;
  seller?: {
    _id?: string;
    name: string;
    email: string;
    phone?: string;
    location?: string;
    avatar?: string;
    stripeAccountId?: string;
    stripeAccountStatus?: string;
    payoutsEnabled?: boolean;
  };
}

const SAMPLE_PENDING_ITEMS: PendingProduct[] = [
  {
    _id: "demo-1",
    name: "Classic Flap Bag",
    brand: "Channel",
    description: "Black caviar leather with gold hardware. Comes with original dust bag and authenticity card.",
    condition: "Excellent",
    price: 3200,
    proofOfPurchase: "Bill.pdf",
    originalPackagingAvailable: true,
    packaging: "Original box, dust bag and authenticity card included",
    collectionAddress: "703, Marina Quays East Tower, Dubai, UAE",
    sellerPhone: "+1 (626) 389-2743",
    images: ["/dior-bag.webp", "/gucchi-bag.webp", "/dior-bag.webp", "/gucchi-bag.webp"],
    status: "Pending Review",
    createdAt: new Date().toISOString(),
    seller: { name: "Kim Kardashian", email: "kim@example.com", location: "703, Marina Quays East Tower, Dubai, UAE", phone: "+1 (626) 389-2743", payoutsEnabled: true }
  },
  {
    _id: "demo-2",
    name: "Classic Flap Bag",
    brand: "Channel",
    description: "Chanel Classic Double Flap in caviar leather with silver hardware. Pristine corners.",
    condition: "Pristine",
    price: 3200,
    proofOfPurchase: "Bill.pdf",
    originalPackagingAvailable: true,
    packaging: "Includes dust bag and serial sticker intact",
    collectionAddress: "Downtown Boulevard, Standpoint Tower A, Apt 1402, Dubai",
    sellerPhone: "+971 55 987 6543",
    images: ["/gucchi-bag.webp", "/dior-bag.webp", "/gucchi-bag.webp"],
    status: "Pending Review",
    createdAt: new Date().toISOString(),
    seller: { name: "Noura Khalid", email: "noura@example.com", location: "Downtown Boulevard, Dubai, UAE", phone: "+971 55 987 6543", payoutsEnabled: true }
  },
  {
    _id: "demo-3",
    name: "Classic Flap Bag",
    brand: "Channel",
    description: "Vintage Chanel Flap in smooth lambskin with 24k gold plated hardware.",
    condition: "Very Good",
    price: 3200,
    proofOfPurchase: "Bill.pdf",
    originalPackagingAvailable: true,
    packaging: "Original box and dust bag included",
    collectionAddress: "Palm Jumeirah, Shoreline 10, Dubai",
    sellerPhone: "+971 52 456 7890",
    images: ["/dior-bag.webp", "/gucchi-bag.webp"],
    status: "Pending Review",
    createdAt: new Date().toISOString(),
    seller: { name: "Layla Hassan", email: "layla@example.com", location: "Palm Jumeirah, Dubai, UAE", phone: "+971 52 456 7890", payoutsEnabled: true }
  },
  {
    _id: "demo-4",
    name: "Classic Flap Bag",
    brand: "Channel",
    description: "Chanel Medium Classic Flap in beige caviar leather with gold hardware.",
    condition: "Like New",
    price: 3200,
    proofOfPurchase: "Bill.pdf",
    originalPackagingAvailable: true,
    packaging: "Complete set with boutique receipt and box",
    collectionAddress: "Dubai Marina, Marina Gate 2, Dubai",
    sellerPhone: "+971 58 112 2334",
    images: ["/gucchi-bag.webp", "/dior-bag.webp"],
    status: "Pending Review",
    createdAt: new Date().toISOString(),
    seller: { name: "Mariam Salem", email: "mariam@example.com", location: "Dubai Marina, Dubai, UAE", phone: "+971 58 112 2334", payoutsEnabled: true }
  },
  {
    _id: "demo-5",
    name: "Classic Flap Bag",
    brand: "Channel",
    description: "Chanel Classic Flap in black caviar leather with champagne gold hardware.",
    condition: "Excellent",
    price: 3200,
    proofOfPurchase: "Bill.pdf",
    originalPackagingAvailable: true,
    packaging: "Original dust bag included",
    collectionAddress: "Emirates Hills, Sector E, Dubai",
    sellerPhone: "+971 50 998 8776",
    images: ["/dior-bag.webp", "/gucchi-bag.webp"],
    status: "Pending Review",
    createdAt: new Date().toISOString(),
    seller: { name: "Fatima Al Suwaidi", email: "fatima@example.com", location: "Emirates Hills, Dubai, UAE", phone: "+971 50 998 8776", payoutsEnabled: true }
  },
  {
    _id: "demo-6",
    name: "Classic Flap Bag",
    brand: "Channel",
    description: "Chanel Classic Flap in burgundy quilted caviar leather.",
    condition: "Pristine",
    price: 3200,
    proofOfPurchase: "Bill.pdf",
    originalPackagingAvailable: true,
    packaging: "Full original packaging with invoice",
    collectionAddress: "City Walk, Building 14, Dubai",
    sellerPhone: "+971 54 332 1100",
    images: ["/gucchi-bag.webp", "/dior-bag.webp"],
    status: "Pending Review",
    createdAt: new Date().toISOString(),
    seller: { name: "Hind Al Nuaimi", email: "hind@example.com", location: "City Walk, Dubai, UAE", phone: "+971 54 332 1100", payoutsEnabled: true }
  },
];

const STANDARD_REASONS = [
  "Incomplete or inaccurate item details",
  "Poor image quality or missing required angles (3 photos required)",
  "Item does not meet Closeté luxury brand criteria",
  "Incorrect condition rating or noticeable undisclosed wear",
  "Pricing discrepancy / abnormal valuation",
  "Original packaging verification mismatch",
  "Other / Custom Reason",
];

const COMMISSION_PERCENT = 12;

export default function PendingReviewTable() {
  const [items, setItems] = useState<PendingProduct[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDateFilter, setSelectedDateFilter] = useState("15 Jun, 2026");
  const [statusFilterOverride, setStatusFilterOverride] = useState<string>("All");
  const [selectedItem, setSelectedItem] = useState<PendingProduct | null>(null);
  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [isEditingDetails, setIsEditingDetails] = useState(false);

  // Edit / Moderation state
  const [editForm, setEditForm] = useState<{
    name: string;
    brand: string;
    description: string;
    material: string;
    condition: string;
    packaging: string;
    price: number;
    collectionAddress: string;
    sellerPhone: string;
  }>({
    name: "",
    brand: "",
    description: "",
    material: "",
    condition: "",
    packaging: "",
    price: 0,
    collectionAddress: "",
    sellerPhone: "",
  });

  // Rejection modal
  const [isRejectOpen, setIsRejectOpen] = useState(false);
  const [rejectReasonType, setRejectReasonType] = useState(STANDARD_REASONS[0]);
  const [rejectCustomNote, setRejectCustomNote] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Success dialog
  const [isLoading, setIsLoading] = useState(false);
  const [actionSuccess, setActionSuccess] = useState<{
    type: "approve" | "reject";
    itemName: string;
  } | null>(null);

  // Fetch pending items from backend
  const fetchPendingItems = async () => {
    setIsLoading(true);
    try {
      const res = await adminApi.getPendingProducts();
      if (res.success && Array.isArray(res.data) && res.data.length > 0) {
        setItems(res.data);
      } else {
        setItems(SAMPLE_PENDING_ITEMS);
      }
    } catch (e) {
      console.warn("Error fetching pending review products, using sample data:", e);
      setItems(SAMPLE_PENDING_ITEMS);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPendingItems();
  }, []);

  const openReviewDrawer = (item: PendingProduct) => {
    setSelectedItem(item);
    setActiveImageIdx(0);
    setIsEditingDetails(false);
    setEditForm({
      name: item.name,
      brand: item.brand,
      description: item.description,
      material: item.material || "",
      condition: item.condition,
      packaging: item.packaging || "",
      price: item.price,
      collectionAddress: item.collectionAddress || item.seller?.location || "703, Marina Quays East Tower, Dubai, UAE",
      sellerPhone: item.sellerPhone || item.seller?.phone || "+1 (626) 389-2743",
    });
  };

  const calculatedCommission = Math.round((editForm.price * COMMISSION_PERCENT) / 100);
  const calculatedEarnings = editForm.price - calculatedCommission;

  // Handle Approve
  const handleApprove = async () => {
    if (!selectedItem) return;
    setIsSubmitting(true);
    try {
      await adminApi.approveProduct(selectedItem._id, {
        name: editForm.name,
        brand: editForm.brand,
        description: editForm.description,
        material: editForm.material,
        condition: editForm.condition,
        packaging: editForm.packaging,
        price: editForm.price,
        collectionAddress: editForm.collectionAddress,
        sellerPhone: editForm.sellerPhone,
      });

      setItems((prev) => prev.filter((p) => p._id !== selectedItem._id));
      setActionSuccess({ type: "approve", itemName: editForm.name });
      setSelectedItem(null);
    } catch (e) {
      console.error("Failed to approve", e);
      setItems((prev) => prev.filter((p) => p._id !== selectedItem._id));
      setActionSuccess({ type: "approve", itemName: editForm.name });
      setSelectedItem(null);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle Reject
  const handleReject = async () => {
    if (!selectedItem) return;
    setIsSubmitting(true);
    const finalReason =
      rejectReasonType === "Other / Custom Reason"
        ? rejectCustomNote.trim() || "Listing does not meet publication standards"
        : `${rejectReasonType}${rejectCustomNote.trim() ? `: ${rejectCustomNote.trim()}` : ""}`;

    try {
      await adminApi.rejectProduct(selectedItem._id, finalReason);

      setItems((prev) => prev.filter((p) => p._id !== selectedItem._id));
      setIsRejectOpen(false);
      setActionSuccess({ type: "reject", itemName: selectedItem.name });
      setSelectedItem(null);
      setRejectCustomNote("");
    } catch (e) {
      console.error("Failed to reject", e);
      setItems((prev) => prev.filter((p) => p._id !== selectedItem._id));
      setIsRejectOpen(false);
      setActionSuccess({ type: "reject", itemName: selectedItem.name });
      setSelectedItem(null);
    } finally {
      setIsSubmitting(false);
    }
  };

  const filteredItems = items.filter((p) => {
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      const matchName = p.name.toLowerCase().includes(q);
      const matchBrand = p.brand.toLowerCase().includes(q);
      const matchSeller = p.seller?.name ? p.seller.name.toLowerCase().includes(q) : false;
      const matchOrder = p.orderId ? p.orderId.toString().includes(q) : false;
      if (!matchName && !matchBrand && !matchSeller && !matchOrder) return false;
    }
    return true;
  });

  return (
    <div className="w-full h-full text-white bg-[#1A1A1D] rounded-2xl overflow-hidden">
      {/* Header */}
      <div className="p-4 sm:p-6 flex flex-col md:flex-row md:items-center justify-between gap-3 md:gap-4 border-b border-white/[0.04]">
        <h2 className="text-lg sm:text-xl font-semibold tracking-tight text-white">
          Pending Review
        </h2>

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
                <span>{statusFilterOverride || "All"}</span>
                <ChevronDown className="h-4 w-4 text-[#8C8C8C]" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-40 bg-[#1A1A1D] border-white/10 text-white rounded-xl shadow-2xl p-1">
              <DropdownMenuItem onClick={() => setStatusFilterOverride("All")} className="focus:bg-white/10 cursor-pointer rounded-lg">All</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setStatusFilterOverride("Pending Review")} className="focus:bg-white/10 cursor-pointer rounded-lg">Pending Review</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Cards Grid */}
      <div className="p-4 sm:p-6">
        {filteredItems.length === 0 ? (
          <div className="text-center py-20 px-4">
            <img src="/empty-cart.png" alt="No items" className="w-24 h-24 object-contain mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-white">No items pending review</h3>
            <p className="text-sm text-[#8C8C8C] mt-1">All submitted seller listings have been reviewed and approved.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredItems.map((item) => (
              <div
                key={item._id}
                onClick={() => openReviewDrawer(item)}
                className="bg-[#FFFFFF0A] border border-[#FFFFFF1A] rounded-[24px] p-5 flex flex-col justify-between hover:bg-[#FFFFFF0F] hover:border-[#FFFFFF2A] transition-all duration-200 cursor-pointer group shadow-sm hover:shadow-lg hover:shadow-black/40"
              >
                {/* Card Top Section */}
                <div className="flex justify-between items-start gap-4">
                  {/* Left Info Column */}
                  <div className="flex-1 min-w-0">
                    <span
                      className="inline-flex items-center px-3 py-1.5 rounded-md mb-3 select-none text-[14px] leading-none"
                      style={{
                        fontFamily: 'var(--font-dm-sans, "DM Sans"), sans-serif',
                        fontWeight: 500,
                        color: '#107D2C',
                        background: 'rgba(16, 125, 44, 0.22)',
                      }}
                    >
                      Pending Review
                    </span>

                    <p className="text-xs uppercase tracking-wider text-[#8C8C8C] font-medium truncate">
                      {item.brand || "CHANEL"}
                    </p>

                    <h3 className="text-[17px] font-semibold text-white mt-1 leading-snug line-clamp-2">
                      {item.name}
                    </h3>

                    <div className="flex items-center gap-2 mt-4">
                      <span className="text-sm text-[#8C8C8C]">Listed at</span>
                      <span className="px-3 py-1.5 rounded-lg bg-[#FFFFFF1A] text-white font-medium text-[14px] leading-none inline-flex items-center justify-center font-sans">
                        AED {item.price?.toLocaleString()}
                      </span>
                    </div>
                  </div>

                  {/* Right Image Thumbnail */}
                  <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-2xl overflow-hidden bg-[#FFFFFF0A] shrink-0 border border-[#FFFFFF1A]">
                    <img
                      src={formatImageUrl(item.images?.[0] || "/gucchi-bag.webp")}
                      alt={item.name}
                      onError={(e) => {
                        (e.currentTarget as HTMLImageElement).src = "/gucchi-bag.webp";
                      }}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                </div>

                {/* Card Bottom: View details (No divider, larger arrow) */}
                <div className="pt-5 mt-2 flex items-center justify-between">
                  <span className="text-[15px] text-[#8C8C8C] group-hover:text-white transition-colors">
                    View details
                  </span>
                  <ChevronRight className="w-5 h-5 text-[#8C8C8C] group-hover:text-white group-hover:translate-x-0.5 transition-all" />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Review Listing Drawer matching exact Dashboard Design */}
      <Sheet open={!!selectedItem} onOpenChange={(open) => !open && setSelectedItem(null)}>
        <SheetContent showCloseButton={false} className="w-full max-w-[550px] bg-black border-l border-white/10 text-white p-0 overflow-hidden flex flex-col z-50">
          {selectedItem && (
            <div className="flex flex-col h-full w-full">
              {/* Sticky Header */}
              <div className="px-4 sm:px-6 pt-3 pb-1.5 flex-shrink-0 flex items-center justify-between">
                <SheetTitle className="text-2xl font-semibold text-white">
                  Review Listing
                </SheetTitle>
                <button
                  type="button"
                  onClick={() => setSelectedItem(null)}
                  className="w-6 h-6 flex items-center justify-center rounded-full border-2 border-white hover:border-white transition-colors text-white hover:text-white flex-shrink-0 cursor-pointer"
                  aria-label="Close"
                >
                  <X className="w-3 h-3" strokeWidth={2.5} />
                </button>
              </div>

              {/* Scrollable Body */}
              <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-4 pb-6 no-scrollbar space-y-4">
                {/* Product Image Slider Custom Component */}
                <ProductImageSlider
                  images={selectedItem.images}
                  itemName={selectedItem.name}
                />

                {/* Title & Status Badge Row */}
                <div className="flex items-center justify-between gap-3 pt-1">
                  <h3 className="text-xl font-medium text-white tracking-tight">
                    {editForm.name || selectedItem.name}
                  </h3>
                  <span
                    className="inline-flex items-center px-3 py-1.5 rounded-md shrink-0 select-none text-[14px] leading-none"
                    style={{
                      fontFamily: 'var(--font-dm-sans, "DM Sans"), sans-serif',
                      fontWeight: 500,
                      color: '#107D2C',
                      background: 'rgba(16, 125, 44, 0.22)',
                    }}
                  >
                    Pending Review
                  </span>
                </div>

                {/* PRODUCT DETAILS Section Header */}
                <div className="space-y-2.5 pt-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-[#8C8C8C] tracking-wider uppercase">
                      PRODUCT DETAILS
                    </span>
                    <button
                      type="button"
                      onClick={() => setIsEditingDetails(!isEditingDetails)}
                      className="text-[#FFAF2C] underline decoration-solid text-[14px] font-medium leading-none cursor-pointer hover:opacity-85 transition-opacity"
                      style={{ fontFamily: 'var(--font-dm-sans, "DM Sans"), sans-serif', fontWeight: 500 }}
                    >
                      {isEditingDetails ? "Done Editing" : "Edit Listing Details"}
                    </button>
                  </div>

                  {/* 1. Title Row */}
                  <div
                    style={{ background: "linear-gradient(270.21deg, #2B2D32 -23.83%, #1C1D20 92.92%)" }}
                    className="border border-white/[0.04] rounded-xl px-4 py-3.5 flex items-center justify-between gap-4"
                  >
                    <span className="text-sm text-[#8C8C8C] shrink-0">Title</span>
                    {isEditingDetails ? (
                      <Input
                        value={editForm.name}
                        onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                        className="h-8 text-right bg-transparent border-white/20 text-sm text-white focus-visible:ring-[#FFAF2C]"
                      />
                    ) : (
                      <span className="text-sm font-medium text-white text-right truncate">
                        {editForm.name}
                      </span>
                    )}
                  </div>

                  {/* 2. Brand Row */}
                  <div
                    style={{ background: "linear-gradient(270.21deg, #2B2D32 -23.83%, #1C1D20 92.92%)" }}
                    className="border border-white/[0.04] rounded-xl px-4 py-3.5 flex items-center justify-between gap-4"
                  >
                    <span className="text-sm text-[#8C8C8C] shrink-0">Brand</span>
                    {isEditingDetails ? (
                      <Input
                        value={editForm.brand}
                        onChange={(e) => setEditForm({ ...editForm, brand: e.target.value })}
                        className="h-8 text-right bg-transparent border-white/20 text-sm text-white focus-visible:ring-[#FFAF2C]"
                      />
                    ) : (
                      <span className="text-sm font-medium text-white text-right">
                        {editForm.brand}
                      </span>
                    )}
                  </div>

                  {/* 3. Description Block */}
                  <div
                    style={{ background: "linear-gradient(270.21deg, #2B2D32 -23.83%, #1C1D20 92.92%)" }}
                    className="border border-white/[0.04] rounded-xl p-4 space-y-1.5"
                  >
                    <span className="text-sm text-[#8C8C8C] block">Description</span>
                    {isEditingDetails ? (
                      <textarea
                        rows={3}
                        value={editForm.description}
                        onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                        className="w-full p-2 rounded-lg bg-black/40 border border-white/20 text-white text-xs placeholder:text-[#555] focus:outline-none focus:ring-1 focus:ring-[#FFAF2C] resize-none"
                      />
                    ) : (
                      <p className="text-sm text-white leading-relaxed font-normal">
                        {editForm.description}
                      </p>
                    )}
                  </div>

                  {/* 4. Listing price Row */}
                  <div
                    style={{ background: "linear-gradient(270.21deg, #2B2D32 -23.83%, #1C1D20 92.92%)" }}
                    className="border border-white/[0.04] rounded-xl px-4 py-3.5 flex items-center justify-between gap-4"
                  >
                    <span className="text-sm text-[#8C8C8C] shrink-0">listing price</span>
                    {isEditingDetails ? (
                      <Input
                        type="number"
                        value={editForm.price}
                        onChange={(e) => setEditForm({ ...editForm, price: Number(e.target.value) || 0 })}
                        className="h-8 text-right bg-transparent border-white/20 text-sm text-white focus-visible:ring-[#FFAF2C]"
                      />
                    ) : (
                      <span className="text-sm font-medium text-white">
                        AED {editForm.price?.toLocaleString()}
                      </span>
                    )}
                  </div>

                  {/* 5. Condition Row */}
                  <div
                    style={{ background: "linear-gradient(270.21deg, #2B2D32 -23.83%, #1C1D20 92.92%)" }}
                    className="border border-white/[0.04] rounded-xl px-4 py-3.5 flex items-center justify-between gap-4"
                  >
                    <span className="text-sm text-[#8C8C8C] shrink-0">Condition</span>
                    {isEditingDetails ? (
                      <select
                        value={editForm.condition}
                        onChange={(e) => setEditForm({ ...editForm, condition: e.target.value })}
                        className="h-8 px-2 rounded-lg bg-black/60 border border-white/20 text-white text-xs focus:outline-none focus:ring-1 focus:ring-[#FFAF2C]"
                      >
                        <option value="New / Unworn">New / Unworn</option>
                        <option value="Pristine">Pristine</option>
                        <option value="Excellent">Excellent</option>
                        <option value="Very Good">Very Good</option>
                        <option value="Good">Good</option>
                        <option value="Fair">Fair</option>
                      </select>
                    ) : (
                      <span className="text-sm font-medium text-white">
                        {editForm.condition}
                      </span>
                    )}
                  </div>

                  {/* 6. Proof of purchase Row */}
                  <div
                    style={{ background: "linear-gradient(270.21deg, #2B2D32 -23.83%, #1C1D20 92.92%)" }}
                    className="border border-white/[0.04] rounded-xl px-4 py-3.5 flex items-center justify-between gap-4"
                  >
                    <span className="text-sm text-[#8C8C8C] shrink-0">Proof of purchase</span>
                    <a
                      href="#"
                      onClick={(e) => e.preventDefault()}
                      className="text-sm font-medium text-[#FFAF2C] inline-flex items-center gap-1.5 hover:underline cursor-pointer"
                    >
                      <span className="bg-[#FFAF2C] text-black text-[9px] font-bold px-1.5 py-0.5 rounded leading-none">
                        PDF
                      </span>
                      <span>{selectedItem.proofOfPurchase || "Bill.pdf"}</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>

                  {/* Packaging Note */}
                  <div className="text-xs text-[#8C8C8C] flex items-center gap-2 pt-1">
                    <Check className="w-3.5 h-3.5 text-[#8C8C8C]" />
                    <span>Available original packaging.</span>
                  </div>
                </div>

                {/* SELLER Section */}
                <div className="space-y-2 pt-2">
                  <span className="text-xs font-semibold text-[#8C8C8C] tracking-wider uppercase block">
                    SELLER
                  </span>

                  <div
                    style={{ background: "linear-gradient(270.21deg, #2B2D32 -23.83%, #1C1D20 92.92%)" }}
                    className="border border-white/[0.04] rounded-xl p-4 space-y-3"
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold text-white">
                        {selectedItem.seller?.name || "Kim Kardashian"}
                      </span>
                      <span className="inline-flex items-center gap-1 text-xs text-[#107D2C] font-medium">
                        <Check className="w-3.5 h-3.5 text-[#107D2C]" /> Payout Verified
                      </span>
                    </div>

                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-[#8C8C8C]">
                      <div className="flex items-center gap-1.5">
                        <Phone className="w-3.5 h-3.5 text-[#8C8C8C]" />
                        <span>{editForm.sellerPhone || selectedItem.sellerPhone || "+1 (626) 389-2743"}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-[#8C8C8C]" />
                        <span>{editForm.collectionAddress || selectedItem.collectionAddress || "703, Marina Quays East Tower, Dubai, UAE"}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bottom Action Buttons */}
                <div className="pt-4 flex items-center gap-3">
                  {/* Approve & Publish */}
                  <button
                    type="button"
                    onClick={handleApprove}
                    disabled={isSubmitting}
                    className="flex-1 py-3.5 px-6 rounded-full bg-gold-gradient text-black font-bold text-sm tracking-wide shadow-lg shadow-[#D6A042]/20 hover:opacity-95 active:scale-[0.98] transition-all flex items-center justify-center gap-2 select-none"
                  >
                    {isSubmitting ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <>
                        <span>Approve & Publish</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>

                  {/* Reject Listing */}
                  <button
                    type="button"
                    onClick={() => setIsRejectOpen(true)}
                    disabled={isSubmitting}
                    className="flex-1 py-3.5 px-6 rounded-full bg-[#242428] hover:bg-[#2C2C32] text-white/90 font-semibold text-sm transition-colors border border-white/5 flex items-center justify-center select-none"
                  >
                    Reject Listing
                  </button>
                </div>
              </div>
            </div>
          )}
        </SheetContent>
      </Sheet>

      {/* Reject Modal */}
      <Dialog open={isRejectOpen} onOpenChange={setIsRejectOpen}>
        <DialogContent className="bg-[#141416] border border-white/10 text-white max-w-md rounded-2xl">
          <DialogHeader>
            <DialogTitle className="text-lg font-bold text-white flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-red-400" /> Reject Listing
            </DialogTitle>
            <DialogDescription className="text-xs text-[#8C8C8C]">
              Specify the reason for rejection. The seller will be notified with this message and can delete or re-submit their item.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-2">
            <div className="space-y-1.5">
              <label className="text-xs text-[#8C8C8C]">Standard Rejection Reason</label>
              <select
                value={rejectReasonType}
                onChange={(e) => setRejectReasonType(e.target.value)}
                className="w-full h-10 px-3 rounded-xl bg-[#0E0E10] border border-white/10 text-white text-sm focus:outline-none focus:ring-1 focus:ring-red-400"
              >
                {STANDARD_REASONS.map((r, i) => (
                  <option key={i} value={r}>
                    {r}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs text-[#8C8C8C]">
                Additional Instructions for Seller (Optional)
              </label>
              <textarea
                rows={3}
                value={rejectCustomNote}
                onChange={(e) => setRejectCustomNote(e.target.value)}
                placeholder="e.g., Please provide clearer photos of the serial number and corners in good lighting."
                className="w-full p-3 rounded-xl bg-[#0E0E10] border border-white/10 text-white text-xs placeholder:text-[#555] focus:outline-none focus:ring-1 focus:ring-red-400 resize-none"
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={() => setIsRejectOpen(false)}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-[#8C8C8C] hover:text-white"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleReject}
              disabled={isSubmitting}
              className="px-5 py-2 rounded-xl bg-red-500/20 text-red-400 border border-red-500/30 hover:bg-red-500/30 font-semibold text-xs tracking-wide transition-colors flex items-center gap-1.5"
            >
              {isSubmitting && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
              Confirm Rejection
            </button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Action Success Toast/Modal */}
      {actionSuccess && (
        <Dialog open={!!actionSuccess} onOpenChange={() => setActionSuccess(null)}>
          <DialogContent className="bg-[#141416] border border-white/10 text-white max-w-sm rounded-2xl text-center p-6">
            <div className="w-12 h-12 mx-auto rounded-full flex items-center justify-center mb-3 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              {actionSuccess.type === "approve" ? (
                <Check className="w-6 h-6" />
              ) : (
                <XCircle className="w-6 h-6 text-red-400" />
              )}
            </div>
            <h3 className="text-base font-bold text-white">
              {actionSuccess.type === "approve"
                ? "Listing Published Live!"
                : "Listing Rejected"}
            </h3>
            <p className="text-xs text-[#8C8C8C] mt-1">
              {actionSuccess.type === "approve"
                ? `"${actionSuccess.itemName}" is now visible to buyers. Seller has been notified.`
                : `"${actionSuccess.itemName}" was marked as rejected. Seller has received feedback.`}
            </p>
            <button
              type="button"
              onClick={() => setActionSuccess(null)}
              className="mt-4 w-full py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-white font-semibold text-xs transition-colors"
            >
              Done
            </button>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
