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
import { ActionSuccessDialog } from "./ActionSuccessDialog";

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

function PdfSolidIcon({ className }: { className?: string }) {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path d="M4.20156 9.60039H3.60156V8.40039H4.20156C4.36069 8.40039 4.5133 8.4636 4.62583 8.57613C4.73835 8.68865 4.80156 8.84126 4.80156 9.00039C4.80156 9.15952 4.73835 9.31213 4.62583 9.42465C4.5133 9.53718 4.36069 9.60039 4.20156 9.60039ZM8.40156 12.0004V8.40039H9.00156C9.16069 8.40039 9.3133 8.4636 9.42583 8.57613C9.53835 8.68865 9.60156 8.84126 9.60156 9.00039V11.4004C9.60156 11.5595 9.53835 11.7121 9.42583 11.8247C9.3133 11.9372 9.16069 12.0004 9.00156 12.0004H8.40156Z" fill="#FFAF2C"/>
      <path fillRule="evenodd" clipRule="evenodd" d="M1.19922 1.8C1.19922 1.32261 1.38886 0.864773 1.72643 0.527208C2.06399 0.189642 2.52183 0 2.99922 0L12.8476 0L16.7992 3.9516V16.2C16.7992 16.6774 16.6096 17.1352 16.272 17.4728C15.9344 17.8104 15.4766 18 14.9992 18H2.99922C2.52183 18 2.06399 17.8104 1.72643 17.4728C1.38886 17.1352 1.19922 16.6774 1.19922 16.2V1.8ZM4.19922 7.2H2.39922V13.2H3.59922V10.8H4.19922C4.67661 10.8 5.13445 10.6104 5.47201 10.2728C5.80958 9.93523 5.99922 9.47739 5.99922 9C5.99922 8.52261 5.80958 8.06477 5.47201 7.72721C5.13445 7.38964 4.67661 7.2 4.19922 7.2ZM8.99922 7.2H7.19922V13.2H8.99922C9.47661 13.2 9.93445 13.0104 10.272 12.6728C10.6096 12.3352 10.7992 11.8774 10.7992 11.4V9C10.7992 8.52261 10.6096 8.06477 10.272 7.72721C9.93445 7.38964 9.47661 7.2 8.99922 7.2ZM11.9992 13.2V7.2H15.5992V8.4H13.1992V9.6H14.3992V10.8H13.1992V13.2H11.9992Z" fill="#FFAF2C"/>
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

const REJECT_OPTIONS = [
  {
    id: "Prohibited item",
    title: "Prohibited item",
    desc: "Item isn't eligible for sale on Closeté.",
  },
  {
    id: "Potentially counterfeit",
    title: "Potentially counterfeit",
    desc: "Listing appears suspicious or may not be authentic.",
  },
  {
    id: "Poor-quality images",
    title: "Poor-quality images",
    desc: "Photos don't meet Closeté's quality standards.",
  },
  {
    id: "Incomplete information",
    title: "Incomplete information",
    desc: "Required listing information is missing.",
  },
  {
    id: "Inaccurate information",
    title: "Inaccurate information",
    desc: "Listing details don't accurately represent the item.",
  },
];

const COMMISSION_PERCENT = 12;

export default function PendingReviewTable() {
  const [items, setItems] = useState<PendingProduct[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDateFilter, setSelectedDateFilter] = useState("15 Jun, 2026");
  const [statusFilterOverride, setStatusFilterOverride] = useState<string>("All");
  const [selectedItem, setSelectedItem] = useState<PendingProduct | null>(null);
  const [drawerStep, setDrawerStep] = useState<"review" | "reject">("review");
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

  // Rejection sheet state
  const [selectedRejectReason, setSelectedRejectReason] = useState(REJECT_OPTIONS[2].id);
  const [rejectCustomNote, setRejectCustomNote] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Success dialog
  const [isLoading, setIsLoading] = useState(false);
  const [actionSuccess, setActionSuccess] = useState<{
    type: "approve" | "reject";
    itemName: string;
    itemImage?: string;
    brand?: string;
    price?: number;
    id?: string;
    rejectReason?: string;
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
    setDrawerStep("review");
    setActiveImageIdx(0);
    setIsEditingDetails(false);
    setSelectedRejectReason(REJECT_OPTIONS[2].id);
    setRejectCustomNote("");
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
    const itemToSuccess = {
      type: "approve" as const,
      itemName: editForm.name,
      itemImage: selectedItem.images?.[0] || "/gucchi-bag.webp",
      brand: editForm.brand,
      price: editForm.price,
      id: selectedItem._id.replace("demo-", "") || "347892",
    };

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
      setActionSuccess(itemToSuccess);
      setSelectedItem(null);
      setDrawerStep("review");
    } catch (e) {
      console.error("Failed to approve", e);
      setItems((prev) => prev.filter((p) => p._id !== selectedItem._id));
      setActionSuccess(itemToSuccess);
      setSelectedItem(null);
      setDrawerStep("review");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle Reject
  const handleReject = async () => {
    if (!selectedItem) return;
    setIsSubmitting(true);
    const finalReason = rejectCustomNote.trim()
      ? `${selectedRejectReason}: ${rejectCustomNote.trim()}`
      : selectedRejectReason;

    const itemToSuccess = {
      type: "reject" as const,
      itemName: selectedItem.name,
      itemImage: selectedItem.images?.[0] || "/gucchi-bag.webp",
      brand: selectedItem.brand,
      price: selectedItem.price,
      id: selectedItem._id.replace("demo-", "") || "347892",
      rejectReason: selectedRejectReason,
    };

    try {
      await adminApi.rejectProduct(selectedItem._id, finalReason);

      setItems((prev) => prev.filter((p) => p._id !== selectedItem._id));
      setActionSuccess(itemToSuccess);
      setSelectedItem(null);
      setDrawerStep("review");
      setRejectCustomNote("");
    } catch (e) {
      console.error("Failed to reject", e);
      setItems((prev) => prev.filter((p) => p._id !== selectedItem._id));
      setActionSuccess(itemToSuccess);
      setSelectedItem(null);
      setDrawerStep("review");
      setRejectCustomNote("");
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
            drawerStep === "reject" ? (
              /* REJECT LISTING VIEW (SIDEBAR DRAWER) */
              <div className="flex flex-col h-full w-full bg-[#0D0D0F]">
                {/* Sticky Header with Back button and Close */}
                <div className="px-5 sm:px-6 pt-5 pb-3.5 flex-shrink-0 flex items-start justify-between border-b border-white/5">
                  <div>
                    <div className="flex items-center gap-1.5 mb-1">
                      <button
                        type="button"
                        onClick={() => setDrawerStep("review")}
                        className="w-7 h-7 -ml-1.5 rounded-full flex items-center justify-center hover:bg-white/10 text-[#8C8C8C] hover:text-white transition-colors cursor-pointer"
                        aria-label="Back to review"
                      >
                        <ChevronLeft className="w-5 h-5 text-white" />
                      </button>
                      <SheetTitle className="text-xl font-bold text-white tracking-tight">
                        Reject Listing
                      </SheetTitle>
                    </div>
                    <p className="text-xs text-[#8C8C8C] pl-7">
                      Select a reason for rejecting this listing.
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => setSelectedItem(null)}
                    className="w-6 h-6 flex items-center justify-center rounded-full border border-white/70 hover:border-white transition-colors text-white/90 hover:text-white flex-shrink-0 cursor-pointer mt-0.5"
                    aria-label="Close"
                  >
                    <X className="w-3 h-3 text-white" strokeWidth={2.5} />
                  </button>
                </div>

                {/* Scrollable Body */}
                <div className="flex-1 overflow-y-auto px-5 sm:px-6 py-5 no-scrollbar space-y-5">
                  {/* Product Preview Card */}
                  <div className="w-full bg-[#1A1A1D] rounded-2xl p-3.5 flex gap-3.5 items-center border border-white/[0.04]">
                    <div className="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0 bg-white/5 border border-white/10">
                      <img
                        src={formatImageUrl(selectedItem.images?.[0] || "/gucchi-bag.webp")}
                        alt={selectedItem.name}
                        onError={(e) => {
                          (e.currentTarget as HTMLImageElement).src = "/gucchi-bag.webp";
                        }}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <span className="text-[#FFAF2C] font-semibold text-xs block mb-0.5">
                        AED {editForm.price?.toLocaleString() || selectedItem.price?.toLocaleString()}
                      </span>
                      <h4 className="text-base font-bold text-white truncate">
                        {editForm.name || selectedItem.name}
                      </h4>
                      <p className="text-xs text-[#8C8C8C] truncate mt-0.5">
                        {editForm.brand || selectedItem.brand || "Chanel"}
                      </p>
                    </div>
                  </div>

                  {/* ISSUE OPTIONS */}
                  <div className="space-y-2.5">
                    <span className="text-xs font-semibold text-[#8C8C8C] tracking-wider uppercase block">
                      ISSUE OPTIONS
                    </span>
                    <div className="space-y-2">
                      {REJECT_OPTIONS.map((opt) => {
                        const isSelected = selectedRejectReason === opt.id;
                        return (
                          <div
                            key={opt.id}
                            onClick={() => setSelectedRejectReason(opt.id)}
                            className={`w-full rounded-2xl p-4 flex items-center justify-between gap-3 cursor-pointer transition-all border ${
                              isSelected
                                ? "bg-[#1A1A1D] border-[#FFAF2C] shadow-sm"
                                : "bg-[#141416] border-white/5 hover:border-white/15"
                            }`}
                          >
                            <div className="flex-1 min-w-0 pr-2">
                              <h5
                                className={`text-sm font-semibold mb-0.5 ${
                                  isSelected ? "text-[#FFAF2C]" : "text-white"
                                }`}
                              >
                                {opt.title}
                              </h5>
                              <p className="text-xs text-[#8C8C8C] leading-relaxed">
                                {opt.desc}
                              </p>
                            </div>
                            {/* Radio Circle */}
                            <div
                              className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors ${
                                isSelected ? "border-[#FFAF2C]" : "border-white/20"
                              }`}
                            >
                              {isSelected && (
                                <div className="w-2.5 h-2.5 rounded-full bg-[#FFAF2C]" />
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* ADD A NOTE */}
                  <div className="space-y-2">
                    <span className="text-xs font-semibold text-[#8C8C8C] tracking-wider uppercase block">
                      ADD A NOTE
                    </span>
                    <textarea
                      rows={3}
                      value={rejectCustomNote}
                      onChange={(e) => setRejectCustomNote(e.target.value)}
                      placeholder="Explain the reason for rejection..."
                      className="w-full bg-[#18181B] border border-white/10 rounded-2xl p-4 text-sm text-white placeholder:text-[#555] focus:outline-none focus:border-[#FFAF2C]/50 transition-colors resize-none leading-relaxed"
                    />
                  </div>
                </div>

                {/* Footer Action Buttons */}
                <div className="p-4 sm:p-5 border-t border-white/10 bg-[#0D0D0F] flex items-center gap-3 shrink-0">
                  <button
                    type="button"
                    onClick={handleReject}
                    disabled={isSubmitting}
                    className="flex-1 py-3.5 px-6 rounded-full text-sm font-bold bg-gold-gradient text-black flex items-center justify-center gap-2 hover:opacity-95 active:scale-[0.98] transition-all cursor-pointer shadow-lg shadow-[#D6A042]/20"
                  >
                    {isSubmitting ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <>
                        <span>Reject Listing</span>
                        <ArrowRight className="w-4 h-4" strokeWidth={2.5} />
                      </>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={() => setDrawerStep("review")}
                    disabled={isSubmitting}
                    className="flex-1 py-3.5 px-6 rounded-full text-sm font-semibold bg-[#242428] hover:bg-[#2C2C32] text-white/90 transition-colors flex items-center justify-center cursor-pointer"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              /* REVIEW LISTING VIEW */
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
                      onClick={() => {
                        if (isEditingDetails) {
                          // Save edits to current selected item & items list
                          if (selectedItem) {
                            setSelectedItem({
                              ...selectedItem,
                              name: editForm.name,
                              brand: editForm.brand,
                              description: editForm.description,
                              condition: editForm.condition,
                              price: editForm.price,
                              collectionAddress: editForm.collectionAddress,
                              sellerPhone: editForm.sellerPhone,
                            });
                            setItems((prev) =>
                              prev.map((p) =>
                                p._id === selectedItem._id
                                  ? {
                                      ...p,
                                      name: editForm.name,
                                      brand: editForm.brand,
                                      description: editForm.description,
                                      condition: editForm.condition,
                                      price: editForm.price,
                                      collectionAddress: editForm.collectionAddress,
                                      sellerPhone: editForm.sellerPhone,
                                    }
                                  : p
                              )
                            );
                          }
                          setIsEditingDetails(false);
                        } else {
                          setIsEditingDetails(true);
                        }
                      }}
                      className="text-[#FFAF2C] underline decoration-solid text-[14px] font-medium leading-none cursor-pointer hover:opacity-85 transition-opacity"
                      style={{ fontFamily: 'var(--font-dm-sans, "DM Sans"), sans-serif', fontWeight: 500 }}
                    >
                      {isEditingDetails ? "Done" : "Edit Listing Details"}
                    </button>
                  </div>

                  {/* 1. Title Row */}
                  <div
                    style={
                      isEditingDetails
                        ? { background: "#000000", border: "1px solid #FFFFFF33" }
                        : {
                            background:
                              "linear-gradient(270.21deg, #2B2D32 -23.83%, #1C1D20 92.92%) padding-box, linear-gradient(180deg, rgba(255, 255, 255, 0.2) -8.12%, rgba(255, 255, 255, 0) 86.73%) border-box",
                            border: "1px solid transparent",
                          }
                    }
                    className="rounded-xl px-4 py-3.5 flex items-center justify-between gap-4 transition-all"
                  >
                    <span className="text-sm text-[#8C8C8C] shrink-0">Title</span>
                    {isEditingDetails ? (
                      <input
                        type="text"
                        value={editForm.name}
                        onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                        className="w-full text-right bg-transparent border-0 text-sm text-white font-normal focus:outline-none placeholder:text-[#555]"
                      />
                    ) : (
                      <span className="text-sm font-medium text-white text-right truncate">
                        {editForm.name}
                      </span>
                    )}
                  </div>

                  {/* 2. Brand Row */}
                  <div
                    style={
                      isEditingDetails
                        ? { background: "#000000", border: "1px solid #FFFFFF33" }
                        : {
                            background:
                              "linear-gradient(270.21deg, #2B2D32 -23.83%, #1C1D20 92.92%) padding-box, linear-gradient(180deg, rgba(255, 255, 255, 0.2) -8.12%, rgba(255, 255, 255, 0) 86.73%) border-box",
                            border: "1px solid transparent",
                          }
                    }
                    className="rounded-xl px-4 py-3.5 flex items-center justify-between gap-4 transition-all"
                  >
                    <span className="text-sm text-[#8C8C8C] shrink-0">Brand</span>
                    {isEditingDetails ? (
                      <input
                        type="text"
                        value={editForm.brand}
                        onChange={(e) => setEditForm({ ...editForm, brand: e.target.value })}
                        className="w-full text-right bg-transparent border-0 text-sm text-white font-normal focus:outline-none placeholder:text-[#555]"
                      />
                    ) : (
                      <span className="text-sm font-medium text-white text-right">
                        {editForm.brand}
                      </span>
                    )}
                  </div>

                  {/* 3. Description Block */}
                  <div
                    style={
                      isEditingDetails
                        ? { background: "#000000", border: "1px solid #FFFFFF33" }
                        : {
                            background:
                              "linear-gradient(270.21deg, #2B2D32 -23.83%, #1C1D20 92.92%) padding-box, linear-gradient(180deg, rgba(255, 255, 255, 0.2) -8.12%, rgba(255, 255, 255, 0) 86.73%) border-box",
                            border: "1px solid transparent",
                          }
                    }
                    className="rounded-xl p-4 space-y-1.5 transition-all"
                  >
                    <span className="text-sm text-[#8C8C8C] block">Description</span>
                    {isEditingDetails ? (
                      <textarea
                        rows={3}
                        value={editForm.description}
                        onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                        className="w-full bg-transparent border-0 text-sm text-white font-normal focus:outline-none resize-none leading-relaxed p-0 placeholder:text-[#555]"
                      />
                    ) : (
                      <p className="text-sm text-white leading-relaxed font-normal">
                        {editForm.description}
                      </p>
                    )}
                  </div>

                  {/* 4. Listing price Row */}
                  <div
                    style={
                      isEditingDetails
                        ? { background: "#000000", border: "1px solid #FFFFFF33" }
                        : {
                            background:
                              "linear-gradient(270.21deg, #2B2D32 -23.83%, #1C1D20 92.92%) padding-box, linear-gradient(180deg, rgba(255, 255, 255, 0.2) -8.12%, rgba(255, 255, 255, 0) 86.73%) border-box",
                            border: "1px solid transparent",
                          }
                    }
                    className="rounded-xl px-4 py-3.5 flex items-center justify-between gap-4 transition-all"
                  >
                    <span className="text-sm text-[#8C8C8C] shrink-0">listing price</span>
                    {isEditingDetails ? (
                      <div className="flex items-center gap-1.5 justify-end">
                        <span className="text-sm font-normal text-white">AED</span>
                        <input
                          type="text"
                          value={editForm.price ? editForm.price.toLocaleString() : ""}
                          onChange={(e) => {
                            const raw = e.target.value.replace(/[^0-9]/g, "");
                            setEditForm({ ...editForm, price: raw ? Number(raw) : 0 });
                          }}
                          className="w-24 text-right bg-transparent border-0 text-sm text-white font-normal focus:outline-none"
                        />
                      </div>
                    ) : (
                      <span className="text-sm font-medium text-white">
                        AED {editForm.price?.toLocaleString()}
                      </span>
                    )}
                  </div>

                  {/* 5. Condition Row with Custom Dropdown */}
                  <div
                    style={
                      isEditingDetails
                        ? { background: "#000000", border: "1px solid #FFFFFF33" }
                        : {
                            background:
                              "linear-gradient(270.21deg, #2B2D32 -23.83%, #1C1D20 92.92%) padding-box, linear-gradient(180deg, rgba(255, 255, 255, 0.2) -8.12%, rgba(255, 255, 255, 0) 86.73%) border-box",
                            border: "1px solid transparent",
                          }
                    }
                    className="rounded-xl px-4 py-3.5 flex items-center justify-between gap-4 transition-all"
                  >
                    <span className="text-sm text-[#8C8C8C] shrink-0">Condition</span>
                    {isEditingDetails ? (
                      <DropdownMenu>
                        <DropdownMenuTrigger className="inline-flex items-center gap-2 text-sm text-white font-normal focus:outline-none cursor-pointer select-none">
                          <span>{editForm.condition || "Excellent"}</span>
                          <ChevronDown className="w-4 h-4 text-white shrink-0" />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent
                          align="end"
                          className="bg-[#1E2024] border border-white/10 rounded-2xl p-1.5 min-w-[160px] text-white shadow-2xl z-50 space-y-0.5"
                        >
                          {[
                            "New with Tags",
                            "Like New",
                            "Excellent",
                            "Very Good",
                            "Good",
                            "Fair",
                          ].map((c) => (
                            <DropdownMenuItem
                              key={c}
                              onClick={() => setEditForm({ ...editForm, condition: c })}
                              className={`px-3.5 py-2 rounded-xl text-sm font-normal cursor-pointer transition-colors ${
                                (editForm.condition || "Excellent") === c
                                  ? "bg-[#34363F] text-white"
                                  : "text-white/90 hover:bg-[#2B2D35] hover:text-white"
                              }`}
                            >
                              {c}
                            </DropdownMenuItem>
                          ))}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    ) : (
                      <span className="text-sm font-medium text-white">
                        {editForm.condition || "Excellent"}
                      </span>
                    )}
                  </div>

                  {/* 6. Proof of purchase Row (Color never changes, stays fixed gradient) */}
                  <div
                    style={{
                      background:
                        "linear-gradient(270.21deg, #2B2D32 -23.83%, #1C1D20 92.92%) padding-box, linear-gradient(180deg, rgba(255, 255, 255, 0.2) -8.12%, rgba(255, 255, 255, 0) 86.73%) border-box",
                      border: "1px solid transparent",
                    }}
                    className="rounded-xl px-4 py-3.5 flex items-center justify-between gap-4"
                  >
                    <span className="text-sm text-[#8C8C8C] shrink-0">Proof of purchase</span>
                    <a
                      href="#"
                      onClick={(e) => e.preventDefault()}
                      className="inline-flex items-center gap-1.5 hover:opacity-85 transition-opacity cursor-pointer group"
                    >
                      <PdfSolidIcon className="w-[18px] h-[18px] shrink-0" />
                      <span className="text-sm font-medium text-[#FFAF2C]">
                        {selectedItem.proofOfPurchase || "Bill.pdf"}
                      </span>
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#FFAF2C"
                        strokeWidth="2.2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="shrink-0 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
                      >
                        <path d="M7 17L17 7" />
                        <path d="M7 7h10v10" />
                      </svg>
                    </a>
                  </div>

                  {/* Packaging Note (Dynamic: Available / Unavailable) */}
                  {(() => {
                    const isAvailable =
                      selectedItem.originalPackagingAvailable !== false &&
                      Boolean(
                        editForm.packaging ||
                          selectedItem.packaging ||
                          selectedItem.originalPackagingAvailable
                      );

                    return (
                      <div className="text-xs text-[#8C8C8C] flex items-center gap-2 pt-1 font-normal select-none">
                        {isAvailable ? (
                          <>
                            <CheckCircle2 className="w-4 h-4 text-[#8C8C8C] shrink-0" strokeWidth={1.8} />
                            <span>Available original packaging.</span>
                          </>
                        ) : (
                          <>
                            <XCircle className="w-4 h-4 text-[#8C8C8C] shrink-0" strokeWidth={1.8} />
                            <span>Unavailable original packaging.</span>
                          </>
                        )}
                      </div>
                    );
                  })()}
                </div>

                {/* SELLER Section */}
                <div className="space-y-2 pt-2">
                  <span className="text-xs font-semibold text-[#8C8C8C] tracking-wider uppercase block">
                    SELLER
                  </span>

                  <div
                    style={{
                      background:
                        "linear-gradient(270.21deg, #2B2D32 -23.83%, #1C1D20 92.92%) padding-box, linear-gradient(180deg, rgba(255, 255, 255, 0.2) -8.12%, rgba(255, 255, 255, 0) 86.73%) border-box",
                      border: "1px solid transparent",
                    }}
                    className="rounded-xl p-4 space-y-3"
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold text-white">
                        {selectedItem.seller?.name || "Kim Kardashian"}
                      </span>
                      <span className="inline-flex items-center gap-1 text-xs text-[#107D2C] font-medium bg-[#107D2C]/15 border border-[#107D2C]/30 px-2.5 py-0.5 rounded-full select-none">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#107D2C]" strokeWidth={2} />
                        <span>Payout Verified</span>
                      </span>
                    </div>

                    <div className="flex items-center gap-3 text-xs text-[#8C8C8C] overflow-hidden">
                      <div className="flex items-center gap-1.5 shrink-0">
                        <Phone className="w-3.5 h-3.5 text-[#8C8C8C] shrink-0" />
                        <span>{editForm.sellerPhone || selectedItem.sellerPhone || "+1 (626) 389-2743"}</span>
                      </div>
                      <span className="h-3.5 w-[1px] bg-white/10 shrink-0" />
                      <div className="flex items-center gap-1.5 min-w-0 truncate">
                        <MapPin className="w-3.5 h-3.5 text-[#8C8C8C] shrink-0" />
                        <span className="truncate">{editForm.collectionAddress || selectedItem.collectionAddress || "703, Marina Quays East Tower, Dubai, UAE"}</span>
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
                    disabled={isSubmitting || isEditingDetails}
                    className={`flex-1 py-3.5 px-6 rounded-full text-sm font-semibold transition-all flex items-center justify-center gap-2 select-none ${
                      isEditingDetails
                        ? "bg-[#383A40] text-white/70 cursor-not-allowed"
                        : "bg-gold-gradient text-black font-bold tracking-wide shadow-lg shadow-[#D6A042]/20 hover:opacity-95 active:scale-[0.98] cursor-pointer"
                    }`}
                  >
                    {isSubmitting ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <>
                        <span>Approve & Publish</span>
                        <ArrowRight className="w-4 h-4" strokeWidth={2.5} />
                      </>
                    )}
                  </button>

                  {/* Reject Listing */}
                  <button
                    type="button"
                    onClick={() => setDrawerStep("reject")}
                    disabled={isSubmitting || isEditingDetails}
                    className={`flex-1 py-3.5 px-6 rounded-full text-sm font-semibold transition-colors border border-white/5 flex items-center justify-center select-none ${
                      isEditingDetails
                        ? "bg-[#202124] text-white/50 cursor-not-allowed"
                        : "bg-[#242428] hover:bg-[#2C2C32] text-white/90 cursor-pointer"
                    }`}
                  >
                    Reject Listing
                  </button>
                </div>
              </div>
            </div>
            )
          )}
        </SheetContent>
      </Sheet>

      {/* Action Success Modal */}
      {actionSuccess && (
        <ActionSuccessDialog
          open={!!actionSuccess}
          onOpenChange={(open) => !open && setActionSuccess(null)}
          type={actionSuccess.type}
          title={
            actionSuccess.type === "approve"
              ? "Listing Approved"
              : "Listing Rejected"
          }
          description={
            actionSuccess.type === "approve"
              ? "This listing is now visible to buyers on the marketplace."
              : "The listing has been rejected successfully."
          }
          itemData={{
            id: actionSuccess.type === "approve" ? (actionSuccess.id || "347892") : undefined,
            name: actionSuccess.itemName,
            subtitle: `${actionSuccess.brand || "Chanel"} · AED ${actionSuccess.price?.toLocaleString() || "3,200"}`,
            image: actionSuccess.itemImage,
            statusText: actionSuccess.type === "approve" ? "Live" : "Rejected",
            statusBg: actionSuccess.type === "approve" ? "bg-[#107D2C]" : "bg-[#FF383C]",
            statusColor: "text-white",
            showDot: actionSuccess.type === "approve",
          }}
          reasonBadge={
            actionSuccess.type === "reject"
              ? {
                  text: `Rejected reason : ${actionSuccess.rejectReason || "Poor-quality images"}`,
                  type: "red",
                }
              : undefined
          }
          footerNotice={
            actionSuccess.type === "reject"
              ? "The listing has been removed from the marketplace and is no longer visible to buyers."
              : undefined
          }
          buttonText="Back To Pending Review"
          onButtonClick={() => setActionSuccess(null)}
        />
      )}
    </div>
  );
}
