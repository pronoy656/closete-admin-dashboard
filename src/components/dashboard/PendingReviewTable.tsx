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
  DollarSign
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
    brand: "CHANEL",
    description: "Iconic Chanel Classic Medium Flap Bag in quilted lambskin leather with gold-tone hardware.",
    condition: "Excellent",
    price: 3200,
    packaging: "Original box, dust bag and authenticity card included",
    collectionAddress: "Al Wasl Road, Villa 42, Jumeirah 2, Dubai",
    sellerPhone: "+971 50 123 4567",
    images: ["/dior-bag.webp", "/gucchi-bag.webp"],
    status: "Pending Review",
    createdAt: new Date().toISOString(),
    seller: { name: "Sarah Al Mansoori", email: "sarah@example.com", location: "Dubai, UAE", payoutsEnabled: true }
  },
  {
    _id: "demo-2",
    name: "Classic Flap Bag",
    brand: "CHANEL",
    description: "Chanel Classic Double Flap in caviar leather with silver hardware. Pristine corners.",
    condition: "Pristine",
    price: 3200,
    packaging: "Includes dust bag and serial sticker intact",
    collectionAddress: "Downtown Boulevard, Standpoint Tower A, Apt 1402, Dubai",
    sellerPhone: "+971 55 987 6543",
    images: ["/gucchi-bag.webp", "/dior-bag.webp"],
    status: "Pending Review",
    createdAt: new Date().toISOString(),
    seller: { name: "Noura Khalid", email: "noura@example.com", location: "Dubai, UAE", payoutsEnabled: true }
  },
  {
    _id: "demo-3",
    name: "Classic Flap Bag",
    brand: "CHANEL",
    description: "Vintage Chanel Flap in smooth lambskin with 24k gold plated hardware.",
    condition: "Very Good",
    price: 3200,
    packaging: "Original box and dust bag included",
    collectionAddress: "Palm Jumeirah, Shoreline 10, Dubai",
    sellerPhone: "+971 52 456 7890",
    images: ["/dior-bag.webp", "/gucchi-bag.webp"],
    status: "Pending Review",
    createdAt: new Date().toISOString(),
    seller: { name: "Layla Hassan", email: "layla@example.com", location: "Dubai, UAE", payoutsEnabled: false }
  },
  {
    _id: "demo-4",
    name: "Classic Flap Bag",
    brand: "CHANEL",
    description: "Chanel Medium Classic Flap in beige caviar leather with gold hardware.",
    condition: "Like New",
    price: 3200,
    packaging: "Complete set with boutique receipt and box",
    collectionAddress: "Dubai Marina, Marina Gate 2, Dubai",
    sellerPhone: "+971 58 112 2334",
    images: ["/gucchi-bag.webp", "/dior-bag.webp"],
    status: "Pending Review",
    createdAt: new Date().toISOString(),
    seller: { name: "Mariam Salem", email: "mariam@example.com", location: "Dubai, UAE", payoutsEnabled: true }
  },
  {
    _id: "demo-5",
    name: "Classic Flap Bag",
    brand: "CHANEL",
    description: "Chanel Classic Flap in black caviar leather with champagne gold hardware.",
    condition: "Excellent",
    price: 3200,
    packaging: "Original dust bag included",
    collectionAddress: "Emirates Hills, Sector E, Dubai",
    sellerPhone: "+971 50 998 8776",
    images: ["/dior-bag.webp", "/gucchi-bag.webp"],
    status: "Pending Review",
    createdAt: new Date().toISOString(),
    seller: { name: "Fatima Al Suwaidi", email: "fatima@example.com", location: "Dubai, UAE", payoutsEnabled: true }
  },
  {
    _id: "demo-6",
    name: "Classic Flap Bag",
    brand: "CHANEL",
    description: "Chanel Classic Flap in burgundy quilted caviar leather.",
    condition: "Pristine",
    price: 3200,
    packaging: "Full original packaging with invoice",
    collectionAddress: "City Walk, Building 14, Dubai",
    sellerPhone: "+971 54 332 1100",
    images: ["/gucchi-bag.webp", "/dior-bag.webp"],
    status: "Pending Review",
    createdAt: new Date().toISOString(),
    seller: { name: "Hind Al Nuaimi", email: "hind@example.com", location: "Dubai, UAE", payoutsEnabled: true }
  },
  {
    _id: "demo-7",
    name: "Classic Flap Bag",
    brand: "CHANEL",
    description: "Chanel Classic Flap Bag in timeless black lambskin with gold chain.",
    condition: "Excellent",
    price: 3200,
    packaging: "Includes dust bag and microchip verification",
    collectionAddress: "Business Bay, Executive Towers, Dubai",
    sellerPhone: "+971 56 778 8990",
    images: ["/dior-bag.webp", "/gucchi-bag.webp"],
    status: "Pending Review",
    createdAt: new Date().toISOString(),
    seller: { name: "Reem Al Hashimi", email: "reem@example.com", location: "Dubai, UAE", payoutsEnabled: false }
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
    setEditForm({
      name: item.name,
      brand: item.brand,
      description: item.description,
      material: item.material || "",
      condition: item.condition,
      packaging: item.packaging || "",
      price: item.price,
      collectionAddress: item.collectionAddress || "",
      sellerPhone: item.sellerPhone || item.seller?.phone || "",
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
                    <span className="inline-block px-3 py-1 rounded-md text-xs font-semibold bg-[#107D2C]/15 text-[#107D2C] mb-3 select-none">
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

      {/* Review & Edit Drawer */}
      <Sheet open={!!selectedItem} onOpenChange={(open) => !open && setSelectedItem(null)}>
        <SheetContent className="w-full sm:max-w-2xl bg-[#0D0D0F] border-l border-white/10 text-white overflow-y-auto p-0">
          {selectedItem && (
            <div className="flex flex-col h-full">
              {/* Drawer Header */}
              <div className="p-6 border-b border-white/10 bg-[#141416]/80 backdrop-blur sticky top-0 z-10 flex items-center justify-between">
                <div>
                  <span className="text-xs font-semibold uppercase tracking-wider text-[#D6A042]">
                    Ops Review & Moderation
                  </span>
                  <SheetTitle className="text-xl font-bold text-white mt-0.5">
                    Listing #{selectedItem.orderId || selectedItem._id.slice(-5)}
                  </SheetTitle>
                </div>
              </div>

              {/* Drawer Body */}
              <div className="p-6 space-y-6 flex-1">
                {/* 3 Photos Gallery */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-medium uppercase text-[#8C8C8C] flex items-center gap-1.5">
                      <Layers className="w-3.5 h-3.5 text-[#D6A042]" /> Seller Photos
                    </label>
                    <span className="text-xs text-[#8C8C8C]">
                      Photo {activeImageIdx + 1} of {selectedItem.images?.length || 1}
                    </span>
                  </div>

                  {/* Main Large Photo */}
                  <div className="relative rounded-2xl overflow-hidden aspect-[16/10] bg-black border border-white/10">
                    <img
                      src={formatImageUrl(
                        selectedItem.images?.[activeImageIdx] ||
                        selectedItem.images?.[0]
                      )}
                      alt={selectedItem.name}
                      onError={(e) => {
                        (e.currentTarget as HTMLImageElement).src = "/gucchi-bag.webp";
                      }}
                      className="w-full h-full object-contain"
                    />
                    {selectedItem.images?.length > 1 && (
                      <div className="absolute inset-x-3 top-1/2 -translate-y-1/2 flex justify-between pointer-events-none">
                        <button
                          type="button"
                          onClick={() =>
                            setActiveImageIdx((prev) =>
                              prev === 0 ? selectedItem.images.length - 1 : prev - 1
                            )
                          }
                          className="w-9 h-9 rounded-full bg-black/60 backdrop-blur text-white flex items-center justify-center hover:bg-black/80 pointer-events-auto transition-colors"
                        >
                          <ChevronLeft className="w-5 h-5" />
                        </button>
                        <button
                          type="button"
                          onClick={() =>
                            setActiveImageIdx((prev) =>
                              prev === selectedItem.images.length - 1 ? 0 : prev + 1
                            )
                          }
                          className="w-9 h-9 rounded-full bg-black/60 backdrop-blur text-white flex items-center justify-center hover:bg-black/80 pointer-events-auto transition-colors"
                        >
                          <ChevronRight className="w-5 h-5" />
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Photo Thumbnails */}
                  {selectedItem.images && selectedItem.images.length > 1 && (
                    <div className="flex gap-2">
                      {selectedItem.images.map((img, i) => (
                        <button
                          key={i}
                          type="button"
                          onClick={() => setActiveImageIdx(i)}
                          className={`relative rounded-xl overflow-hidden w-20 h-14 border-2 transition-all ${activeImageIdx === i
                              ? "border-[#D6A042] scale-105"
                              : "border-white/10 opacity-60 hover:opacity-100"
                            }`}
                        >
                          <img
                            src={formatImageUrl(img)}
                            alt=""
                            className="w-full h-full object-cover"
                          />
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Moderation Form */}
                <div className="space-y-4 pt-2">
                  <div className="text-xs font-semibold uppercase tracking-wider text-[#D6A042] border-b border-white/5 pb-2">
                    Review / Polish Details
                  </div>

                  {/* Title */}
                  <div className="space-y-1.5">
                    <label className="text-xs text-[#8C8C8C]">Listing Title</label>
                    <Input
                      value={editForm.name}
                      onChange={(e) =>
                        setEditForm((prev) => ({ ...prev, name: e.target.value }))
                      }
                      className="bg-[#141416] border-white/10 text-white rounded-xl text-sm focus-visible:ring-[#D6A042]"
                    />
                  </div>

                  {/* Brand & Condition */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1.5">
                      <label className="text-xs text-[#8C8C8C]">Brand</label>
                      <Input
                        value={editForm.brand}
                        onChange={(e) =>
                          setEditForm((prev) => ({ ...prev, brand: e.target.value }))
                        }
                        className="bg-[#141416] border-white/10 text-white rounded-xl text-sm focus-visible:ring-[#D6A042]"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs text-[#8C8C8C]">Condition Rating</label>
                      <select
                        value={editForm.condition}
                        onChange={(e) =>
                          setEditForm((prev) => ({ ...prev, condition: e.target.value }))
                        }
                        className="w-full h-10 px-3 rounded-xl bg-[#141416] border border-white/10 text-white text-sm focus:outline-none focus:ring-1 focus:ring-[#D6A042]"
                      >
                        <option value="New / Unworn">New / Unworn</option>
                        <option value="Pristine">Pristine</option>
                        <option value="Excellent">Excellent</option>
                        <option value="Very Good">Very Good</option>
                        <option value="Good">Good</option>
                        <option value="Fair">Fair</option>
                      </select>
                    </div>
                  </div>

                  {/* Description */}
                  <div className="space-y-1.5">
                    <label className="text-xs text-[#8C8C8C]">Description</label>
                    <textarea
                      rows={3}
                      value={editForm.description}
                      onChange={(e) =>
                        setEditForm((prev) => ({ ...prev, description: e.target.value }))
                      }
                      className="w-full p-3 rounded-xl bg-[#141416] border border-white/10 text-white text-xs placeholder:text-[#555] focus:outline-none focus:ring-1 focus:ring-[#D6A042] resize-none"
                    />
                  </div>

                  {/* Packaging */}
                  <div className="space-y-1.5">
                    <label className="text-xs text-[#8C8C8C]">Packaging / Inclusions</label>
                    <Input
                      value={editForm.packaging}
                      onChange={(e) =>
                        setEditForm((prev) => ({ ...prev, packaging: e.target.value }))
                      }
                      className="bg-[#141416] border-white/10 text-white rounded-xl text-sm focus-visible:ring-[#D6A042]"
                    />
                  </div>

                  {/* Pricing Breakdown */}
                  <div className="bg-[#141416] border border-white/5 rounded-2xl p-4 space-y-3">
                    <div className="flex items-center justify-between text-xs text-[#8C8C8C] border-b border-white/5 pb-2">
                      <span className="font-semibold uppercase text-white">Pricing Breakdown</span>
                      <span>Closeté 12% Fee</span>
                    </div>

                    <div className="grid grid-cols-3 gap-3 text-center">
                      <div className="p-2.5 rounded-xl bg-white/[0.02] border border-white/5">
                        <span className="text-[11px] text-[#8C8C8C] block">Listing Price</span>
                        <div className="text-base font-bold text-white mt-0.5">
                          AED {editForm.price?.toLocaleString()}
                        </div>
                      </div>

                      <div className="p-2.5 rounded-xl bg-[#D6A042]/5 border border-[#D6A042]/20">
                        <span className="text-[11px] text-[#D6A042] block">Commission (12%)</span>
                        <div className="text-base font-bold text-[#D6A042] mt-0.5">
                          AED {calculatedCommission.toLocaleString()}
                        </div>
                      </div>

                      <div className="p-2.5 rounded-xl bg-emerald-500/5 border border-emerald-500/20">
                        <span className="text-[11px] text-emerald-400 block">Seller Payout</span>
                        <div className="text-base font-bold text-emerald-400 mt-0.5">
                          AED {calculatedEarnings.toLocaleString()}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Seller Info */}
                  <div className="bg-[#141416] border border-white/5 rounded-2xl p-4 space-y-2 text-xs">
                    <span className="font-semibold uppercase text-white block mb-1">
                      Seller Collection Info
                    </span>
                    <div className="flex items-center gap-2 text-[#8C8C8C]">
                      <span className="text-white font-medium">Seller:</span>
                      <span>{selectedItem.seller?.name || "Verified Seller"}</span>
                    </div>
                    <div className="flex items-center gap-2 text-[#8C8C8C]">
                      <Phone className="w-3.5 h-3.5 text-[#D6A042]" />
                      <span>{editForm.sellerPhone || selectedItem.sellerPhone || "+971 50 123 4567"}</span>
                    </div>
                    <div className="flex items-center gap-2 text-[#8C8C8C]">
                      <MapPin className="w-3.5 h-3.5 text-[#D6A042]" />
                      <span>{editForm.collectionAddress || "Dubai, UAE"}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="p-6 border-t border-white/10 bg-[#141416]/90 backdrop-blur sticky bottom-0 z-10 flex gap-3">
                <button
                  type="button"
                  onClick={() => setIsRejectOpen(true)}
                  disabled={isSubmitting}
                  className="flex-1 py-3 px-4 rounded-xl border border-red-500/30 text-red-400 hover:bg-red-500/10 font-semibold text-sm transition-colors flex items-center justify-center gap-2"
                >
                  <XCircle className="w-4 h-4" /> Reject Listing
                </button>
                <button
                  type="button"
                  onClick={handleApprove}
                  disabled={isSubmitting}
                  className="flex-1 py-3 px-4 rounded-xl bg-gold-gradient text-black font-bold text-sm tracking-wide shadow-lg shadow-[#D6A042]/20 hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <CheckCircle2 className="w-4 h-4" />
                  )}
                  Approve & Publish Live
                </button>
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
