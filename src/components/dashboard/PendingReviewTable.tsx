"use client";
import React, { useState, useEffect } from "react";
import {
  Search,
  CheckCircle2,
  XCircle,
  Edit3,
  Eye,
  ShieldCheck,
  AlertCircle,
  DollarSign,
  Package,
  MapPin,
  Phone,
  Calendar,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Loader2,
  Percent,
  Layers,
  Tag,
  Check
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
import { adminApi } from "@/lib/api";
import { formatImageUrl } from "@/lib/utils";

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
      if (res.success && Array.isArray(res.data)) {
        setItems(res.data);
      } else {
        setItems([]);
      }
    } catch (e) {
      console.warn("Error fetching pending review products:", e);
      setItems([]);
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

      // Update local state
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
    const q = searchQuery.toLowerCase();
    return (
      p.name.toLowerCase().includes(q) ||
      p.brand.toLowerCase().includes(q) ||
      (p.seller?.name && p.seller.name.toLowerCase().includes(q)) ||
      (p.orderId && p.orderId.toString().includes(q))
    );
  });

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-gradient-to-r from-[#141416] via-[#1A1A1E] to-[#141416] p-6 rounded-2xl border border-white/5">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="text-2xl font-bold text-white tracking-tight">
              Pending Review
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#D6A042]/10 text-[#D6A042] border border-[#D6A042]/20">
              {filteredItems.length} awaiting ops action
            </span>
          </div>
          <p className="text-sm text-[#8C8C8C] mt-1">
            Review, standardise and approve luxury listings submitted by sellers before they go live on Closeté.
          </p>
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8C8C8C]" />
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search brand, item, or seller..."
            className="pl-10 bg-[#0E0E10] border-white/10 text-white placeholder:text-[#666] rounded-xl text-sm focus-visible:ring-[#D6A042]"
          />
        </div>
      </div>

      {/* Listings Table */}
      <div className="bg-[#121214] rounded-2xl border border-white/5 overflow-hidden">
        {filteredItems.length === 0 ? (
          <div className="text-center py-20 px-4">
            <div className="w-14 h-14 mx-auto rounded-full bg-[#D6A042]/10 flex items-center justify-center text-[#D6A042] mb-3">
              <Sparkles className="w-7 h-7" />
            </div>
            <h3 className="text-lg font-semibold text-white">No Listings Pending Review</h3>
            <p className="text-sm text-[#8C8C8C] mt-1 max-w-md mx-auto">
              All submitted seller listings have been reviewed and published live.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-[#C4C4C4]">
              <thead className="text-xs uppercase bg-[#18181C] text-[#8C8C8C] border-b border-white/5">
                <tr>
                  <th className="py-4 px-5">Item & 3 Photos</th>
                  <th className="py-4 px-4">Brand & Condition</th>
                  <th className="py-4 px-4">Listing Price</th>
                  <th className="py-4 px-4">Commission / Earnings</th>
                  <th className="py-4 px-4">Seller & Payout Status</th>
                  <th className="py-4 px-5 text-right">Ops Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {filteredItems.map((prod) => {
                  const hasPayoutConnected =
                    prod.seller?.payoutsEnabled ||
                    prod.seller?.stripeAccountStatus === "active";
                  const comm =
                    prod.commissionAmount ??
                    Math.round((prod.price * COMMISSION_PERCENT) / 100);
                  const earn = prod.sellerEarnings ?? prod.price - comm;

                  return (
                    <tr
                      key={prod._id}
                      className="hover:bg-white/[0.02] transition-colors group"
                    >
                      {/* Item & Photos */}
                      <td className="py-4 px-5">
                        <div className="flex items-center gap-3.5">
                          <div className="flex -space-x-4 shrink-0">
                            {(prod.images || []).slice(0, 3).map((img, i) => (
                              <img
                                key={i}
                                src={formatImageUrl(img)}
                                alt={prod.name}
                                onError={(e) => {
                                  (e.currentTarget as HTMLImageElement).src = "/gucchi-bag.webp";
                                }}
                                className="w-12 h-12 rounded-xl object-cover border-2 border-[#121214] shadow-md group-hover:scale-105 transition-transform"
                              />
                            ))}
                          </div>
                          <div>
                            <div className="font-semibold text-white line-clamp-1">
                              {prod.name}
                            </div>
                            <div className="text-xs text-[#8C8C8C] mt-0.5 line-clamp-1">
                              {prod.packaging || "Original packaging details provided"}
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Brand & Condition */}
                      <td className="py-4 px-4">
                        <div className="font-medium text-white">{prod.brand}</div>
                        <span className="inline-block mt-1 px-2 py-0.5 text-xs rounded-md bg-white/5 text-[#A0A0A0] border border-white/5">
                          {prod.condition}
                        </span>
                      </td>

                      {/* Price */}
                      <td className="py-4 px-4 font-semibold text-white">
                        AED {prod.price?.toLocaleString()}
                      </td>

                      {/* Commission & Earnings */}
                      <td className="py-4 px-4 text-xs">
                        <div className="text-[#D6A042]">
                          Commission (12%): AED {comm.toLocaleString()}
                        </div>
                        <div className="text-emerald-400 font-medium mt-0.5">
                          Seller Earns: AED {earn.toLocaleString()}
                        </div>
                      </td>

                      {/* Seller & Payout */}
                      <td className="py-4 px-4">
                        <div className="text-sm font-medium text-white">
                          {prod.seller?.name || "Verified Seller"}
                        </div>
                        <div className="mt-1">
                          {hasPayoutConnected ? (
                            <span className="inline-flex items-center gap-1 text-[11px] font-medium text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                              <Check className="w-3 h-3" /> Payout Account Connected
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 text-[11px] font-medium text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded-full border border-amber-500/20">
                              <AlertCircle className="w-3 h-3" /> Payout Setup Pending
                            </span>
                          )}
                        </div>
                      </td>

                      {/* Action */}
                      <td className="py-4 px-5 text-right">
                        <button
                          onClick={() => openReviewDrawer(prod)}
                          className="px-4 py-2 rounded-xl bg-gold-gradient text-black font-semibold text-xs tracking-wide shadow-md hover:opacity-90 transition-opacity inline-flex items-center gap-1.5"
                        >
                          <Edit3 className="w-3.5 h-3.5" /> Review & Action
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
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
                      <Layers className="w-3.5 h-3.5 text-[#D6A042]" /> Seller Photos (3 Preserved)
                    </label>
                    <span className="text-xs text-[#8C8C8C]">
                      Photo {activeImageIdx + 1} of {selectedItem.images?.length || 3}
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

                  {/* Thumbnail Row */}
                  <div className="grid grid-cols-3 gap-3">
                    {(selectedItem.images || []).map((img, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setActiveImageIdx(idx)}
                        className={`relative rounded-xl overflow-hidden aspect-square border-2 transition-all ${
                          activeImageIdx === idx
                            ? "border-[#D6A042] shadow-lg shadow-[#D6A042]/20"
                            : "border-white/10 opacity-70 hover:opacity-100"
                        }`}
                      >
                        <img
                          src={formatImageUrl(img)}
                          alt=""
                          onError={(e) => {
                            (e.currentTarget as HTMLImageElement).src = "/gucchi-bag.webp";
                          }}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                </div>

                {/* Seller & Payout Badge Info Card */}
                <div className="bg-[#141417] p-4 rounded-xl border border-white/5 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img
                      src={
                        selectedItem.seller?.avatar ||
                        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80"
                      }
                      alt={selectedItem.seller?.name || "Seller"}
                      className="w-10 h-10 rounded-full object-cover border border-white/10"
                    />
                    <div>
                      <div className="text-sm font-semibold text-white">
                        {selectedItem.seller?.name || "Fatima Al-Zahra"}
                      </div>
                      <div className="text-xs text-[#8C8C8C]">
                        {selectedItem.seller?.email || "seller@closete.com"}
                      </div>
                    </div>
                  </div>

                  <div>
                    {selectedItem.seller?.payoutsEnabled ||
                    selectedItem.seller?.stripeAccountStatus === "active" ? (
                      <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
                        <Check className="w-3.5 h-3.5" /> Payout Account Connected
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-400 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">
                        <AlertCircle className="w-3.5 h-3.5" /> Payout Setup Pending
                      </span>
                    )}
                  </div>
                </div>

                {/* Ops Editable Fields */}
                <div className="space-y-4">
                  <div className="text-xs font-semibold uppercase tracking-wider text-[#D6A042] flex items-center gap-1.5">
                    <Edit3 className="w-3.5 h-3.5" /> Standardise & Edit Listing Info
                  </div>

                  {/* Title */}
                  <div className="space-y-1.5">
                    <label className="text-xs text-[#8C8C8C]">Item Title</label>
                    <Input
                      value={editForm.name}
                      onChange={(e) =>
                        setEditForm({ ...editForm, name: e.target.value })
                      }
                      className="bg-[#141416] border-white/10 text-white rounded-xl text-sm"
                    />
                  </div>

                  {/* Brand & Condition */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1.5">
                      <label className="text-xs text-[#8C8C8C]">Brand / Designer</label>
                      <Input
                        value={editForm.brand}
                        onChange={(e) =>
                          setEditForm({ ...editForm, brand: e.target.value })
                        }
                        className="bg-[#141416] border-white/10 text-white rounded-xl text-sm"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs text-[#8C8C8C]">Condition</label>
                      <select
                        value={editForm.condition}
                        onChange={(e) =>
                          setEditForm({ ...editForm, condition: e.target.value })
                        }
                        className="w-full h-9 px-3 rounded-xl bg-[#141416] border border-white/10 text-white text-sm focus:outline-none focus:ring-1 focus:ring-[#D6A042]"
                      >
                        <option value="Brand New">Brand New</option>
                        <option value="Like New">Like New</option>
                        <option value="Excellent">Excellent</option>
                        <option value="Very Good">Very Good</option>
                        <option value="Good">Good</option>
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
                        setEditForm({ ...editForm, description: e.target.value })
                      }
                      className="w-full p-3 rounded-xl bg-[#141416] border border-white/10 text-white text-sm focus:outline-none focus:ring-1 focus:ring-[#D6A042] resize-none"
                    />
                  </div>

                  {/* Material & Packaging */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1.5">
                      <label className="text-xs text-[#8C8C8C]">Material / Hardware</label>
                      <Input
                        value={editForm.material}
                        onChange={(e) =>
                          setEditForm({ ...editForm, material: e.target.value })
                        }
                        className="bg-[#141416] border-white/10 text-white rounded-xl text-sm"
                        placeholder="e.g., Caviar Leather, Gold Hardware"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs text-[#8C8C8C]">Packaging Included</label>
                      <Input
                        value={editForm.packaging}
                        onChange={(e) =>
                          setEditForm({ ...editForm, packaging: e.target.value })
                        }
                        className="bg-[#141416] border-white/10 text-white rounded-xl text-sm"
                        placeholder="e.g., Dust bag, Box, Authenticity Card"
                      />
                    </div>
                  </div>

                  {/* Pricing Breakdown Card */}
                  <div className="p-4 rounded-xl bg-[#141417] border border-[#D6A042]/20 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold uppercase text-[#D6A042] flex items-center gap-1.5">
                        <DollarSign className="w-4 h-4" /> Pricing & Commission Calculation
                      </span>
                    </div>

                    <div className="grid grid-cols-3 gap-3">
                      <div>
                        <label className="text-[11px] text-[#8C8C8C] block mb-1">
                          Listing Price (AED)
                        </label>
                        <Input
                          type="number"
                          value={editForm.price}
                          onChange={(e) =>
                            setEditForm({
                              ...editForm,
                              price: Number(e.target.value) || 0,
                            })
                          }
                          className="bg-[#0E0E10] border-white/10 text-white font-semibold rounded-xl text-sm"
                        />
                      </div>
                      <div className="p-2.5 rounded-xl bg-white/[0.02] border border-white/5">
                        <span className="text-[11px] text-[#8C8C8C] block">
                          Closeté Fee ({COMMISSION_PERCENT}%)
                        </span>
                        <span className="text-sm font-bold text-[#D6A042] mt-1 block">
                          AED {calculatedCommission.toLocaleString()}
                        </span>
                      </div>
                      <div className="p-2.5 rounded-xl bg-white/[0.02] border border-white/5">
                        <span className="text-[11px] text-[#8C8C8C] block">
                          Seller Earnings (88%)
                        </span>
                        <span className="text-sm font-bold text-emerald-400 mt-1 block">
                          AED {calculatedEarnings.toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Collection Details */}
                  <div className="space-y-3 pt-1">
                    <label className="text-xs font-semibold uppercase text-[#8C8C8C] flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-[#D6A042]" /> Seller Collection Details
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-[11px] text-[#8C8C8C]">Pickup Address</label>
                        <Input
                          value={editForm.collectionAddress}
                          onChange={(e) =>
                            setEditForm({
                              ...editForm,
                              collectionAddress: e.target.value,
                            })
                          }
                          className="bg-[#141416] border-white/10 text-white rounded-xl text-xs"
                        />
                      </div>
                      <div>
                        <label className="text-[11px] text-[#8C8C8C]">Contact Phone</label>
                        <Input
                          value={editForm.sellerPhone}
                          onChange={(e) =>
                            setEditForm({
                              ...editForm,
                              sellerPhone: e.target.value,
                            })
                          }
                          className="bg-[#141416] border-white/10 text-white rounded-xl text-xs"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Drawer Footer Actions */}
              <div className="p-6 border-t border-white/10 bg-[#141416] sticky bottom-0 z-10 flex gap-3">
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
