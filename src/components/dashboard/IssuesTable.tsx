"use client";
import React, { useState, useEffect, useCallback } from "react";
import {
  Search,
  AlertCircle,
  CheckCircle2,
  Trash2,
  RotateCcw,
  Eye,
  Loader2,
  Calendar,
  DollarSign,
  User,
  MapPin,
  Phone,
  ArrowRight,
  X,
  Package,
  ShieldAlert,
  Info,
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

export interface IssueItem {
  _id: string;
  issueType: string;
  outcome?: string;
  reason?: string;
  resolved: boolean;
  createdAt: string;
  updatedAt: string;
  product?: {
    _id: string;
    orderId?: number;
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
  admin?: {
    _id?: string;
    name?: string;
    email?: string;
  };
}

export default function IssuesTable() {
  const [issues, setIssues] = useState<IssueItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterTab, setFilterTab] = useState<"all" | "unresolved" | "resolved">("all");

  const [selectedIssue, setSelectedIssue] = useState<IssueItem | null>(null);
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
    if (filterTab === "unresolved" && issue.resolved) return false;
    if (filterTab === "resolved" && !issue.resolved) return false;

    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    const prodName = issue.product?.name?.toLowerCase() || "";
    const brand = issue.product?.brand?.toLowerCase() || "";
    const reason = issue.reason?.toLowerCase() || "";
    const buyerName = issue.buyer?.name?.toLowerCase() || "";
    const sellerName = issue.seller?.name?.toLowerCase() || "";

    return (
      prodName.includes(q) ||
      brand.includes(q) ||
      reason.includes(q) ||
      buyerName.includes(q) ||
      sellerName.includes(q)
    );
  });

  const unresolvedCount = issues.filter((i) => !i.resolved).length;
  const resolvedCount = issues.filter((i) => i.resolved).length;

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
    if (!type) return "General Issue";
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

  return (
    <div className="w-full h-full text-white bg-[#1A1A1D] rounded-2xl overflow-hidden flex flex-col">
      {/* Header & Controls */}
      <div className="p-4 sm:p-6 border-b border-white/5 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <h2 className="text-xl sm:text-2xl font-semibold text-white">Reported Issues</h2>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-red-500/10 text-red-400 border border-red-500/20">
              {unresolvedCount} Open
            </span>
          </div>
          <p className="text-xs sm:text-sm text-[#8C8C8C] mt-1">
            Manage rejected deliveries, authentication mismatches, and resolve product listings.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
          {/* Search */}
          <div className="relative flex-1 min-w-[200px] sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#8C8C8C]" />
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search issues, buyer, seller..."
              className="w-full bg-[#0D0D0F] border-white/10 rounded-full h-10 pl-10 text-sm focus-visible:ring-[#FFAF2C]/30 text-white"
            />
          </div>

          {/* Filter Tabs */}
          <div className="flex items-center bg-[#0D0D0F] p-1 rounded-full border border-white/10 text-xs font-medium">
            <button
              onClick={() => setFilterTab("all")}
              className={`px-3 py-1.5 rounded-full transition-all ${
                filterTab === "all"
                  ? "bg-gold-gradient text-black font-semibold shadow"
                  : "text-[#8C8C8C] hover:text-white"
              }`}
            >
              All ({issues.length})
            </button>
            <button
              onClick={() => setFilterTab("unresolved")}
              className={`px-3 py-1.5 rounded-full transition-all ${
                filterTab === "unresolved"
                  ? "bg-gold-gradient text-black font-semibold shadow"
                  : "text-[#8C8C8C] hover:text-white"
              }`}
            >
              Unresolved ({unresolvedCount})
            </button>
            <button
              onClick={() => setFilterTab("resolved")}
              className={`px-3 py-1.5 rounded-full transition-all ${
                filterTab === "resolved"
                  ? "bg-gold-gradient text-black font-semibold shadow"
                  : "text-[#8C8C8C] hover:text-white"
              }`}
            >
              Resolved ({resolvedCount})
            </button>
          </div>
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-y-auto">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-24 text-[#8C8C8C]">
            <Loader2 className="w-8 h-8 animate-spin text-[#FFAF2C] mb-3" />
            <p className="text-sm">Loading reported issues...</p>
          </div>
        ) : filteredIssues.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center px-4">
            <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-4">
              <CheckCircle2 className="w-8 h-8 text-green-400" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-1">No issues found</h3>
            <p className="text-sm text-[#8C8C8C] max-w-sm">
              {searchQuery
                ? "No issues matched your search query."
                : filterTab === "unresolved"
                ? "All reported issues have been resolved."
                : "There are currently no recorded issues."}
            </p>
          </div>
        ) : (
          <>
            {/* Desktop Table View */}
            <div className="hidden md:block">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-white/5 text-[11px] text-[#8C8C8C] uppercase tracking-wider font-semibold">
                    <th className="py-3.5 px-6">Product & Item</th>
                    <th className="py-3.5 px-6">Issue Type</th>
                    <th className="py-3.5 px-6">Reason / Note</th>
                    <th className="py-3.5 px-6">Parties</th>
                    <th className="py-3.5 px-6">Status</th>
                    <th className="py-3.5 px-6 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 text-sm">
                  {filteredIssues.map((issue) => {
                    const prodImg = getProductImage(issue.product);
                    return (
                      <tr
                        key={issue._id}
                        className="hover:bg-white/[0.02] transition-colors cursor-pointer"
                        onClick={() => setSelectedIssue(issue)}
                      >
                        {/* Product */}
                        <td className="py-4 px-6">
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 rounded-xl bg-white/5 overflow-hidden flex-shrink-0 border border-white/10">
                              <img
                                src={prodImg}
                                alt={issue.product?.name || "Product"}
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                  (e.currentTarget as HTMLImageElement).src = "/gucchi-bag.webp";
                                }}
                              />
                            </div>
                            <div>
                              <div className="font-medium text-white line-clamp-1">
                                {issue.product?.name || "Product"}
                              </div>
                              <div className="text-xs text-[#8C8C8C]">
                                {issue.product?.brand || "Brand"} • AED {issue.product?.price?.toLocaleString() || "0"}
                              </div>
                            </div>
                          </div>
                        </td>

                        {/* Issue Type */}
                        <td className="py-4 px-6">
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-red-500/10 text-red-400 border border-red-500/20">
                            <ShieldAlert className="w-3.5 h-3.5" />
                            {formatIssueType(issue.issueType)}
                          </span>
                        </td>

                        {/* Reason */}
                        <td className="py-4 px-6 max-w-xs">
                          <p className="text-xs text-white/90 line-clamp-2">
                            {issue.reason || "No detailed reason specified"}
                          </p>
                          <span className="text-[10px] text-[#8C8C8C]">
                            {new Date(issue.createdAt).toLocaleDateString()}
                          </span>
                        </td>

                        {/* Parties */}
                        <td className="py-4 px-6">
                          <div className="text-xs space-y-0.5">
                            <div className="text-[#8C8C8C]">
                              <span className="text-white/60">Seller:</span> {issue.seller?.name || "Seller"}
                            </div>
                            <div className="text-[#8C8C8C]">
                              <span className="text-white/60">Buyer:</span> {issue.buyer?.name || "Buyer"}
                            </div>
                          </div>
                        </td>

                        {/* Status */}
                        <td className="py-4 px-6">
                          {issue.resolved ? (
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-green-500/10 text-green-400 border border-green-500/20">
                              <CheckCircle2 className="w-3.5 h-3.5" />
                              Resolved
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-yellow-500/10 text-yellow-400 border border-yellow-500/20">
                              <AlertCircle className="w-3.5 h-3.5" />
                              Action Required
                            </span>
                          )}
                        </td>

                        {/* Actions */}
                        <td className="py-4 px-6 text-right" onClick={(e) => e.stopPropagation()}>
                          <button
                            onClick={() => setSelectedIssue(issue)}
                            className="px-3.5 py-1.5 bg-white/5 hover:bg-white/10 text-xs font-medium text-white rounded-full transition-colors border border-white/10"
                          >
                            Review Details
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Mobile Cards View */}
            <div className="md:hidden p-3 space-y-3">
              {filteredIssues.map((issue) => {
                const prodImg = getProductImage(issue.product);
                return (
                  <div
                    key={issue._id}
                    onClick={() => setSelectedIssue(issue)}
                    className="p-4 bg-[#141416] rounded-2xl border border-white/5 active:scale-[0.99] transition-transform space-y-3"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-white/5 overflow-hidden flex-shrink-0 border border-white/10">
                        <img
                          src={prodImg}
                          alt={issue.product?.name || "Product"}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            (e.currentTarget as HTMLImageElement).src = "/gucchi-bag.webp";
                          }}
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-medium text-white truncate">
                          {issue.product?.name || "Product"}
                        </div>
                        <div className="text-xs text-[#8C8C8C]">
                          AED {issue.product?.price?.toLocaleString() || "0"}
                        </div>
                      </div>
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-red-500/10 text-red-400 border border-red-500/20">
                        {formatIssueType(issue.issueType)}
                      </span>
                    </div>

                    <p className="text-xs text-[#8C8C8C] line-clamp-2">
                      {issue.reason || "No detailed reason specified"}
                    </p>

                    <div className="flex items-center justify-between pt-2 border-t border-white/5 text-xs">
                      <span className={issue.resolved ? "text-green-400" : "text-yellow-400"}>
                        {issue.resolved ? "✓ Resolved" : "⚠ Action Required"}
                      </span>
                      <span className="text-[#FFAF2C] font-medium">Review Issue →</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>

      {/* Drawer: Issue Details & Resolution Actions */}
      <Sheet open={Boolean(selectedIssue)} onOpenChange={(open) => !open && setSelectedIssue(null)}>
        <SheetContent
          side="right"
          className="w-full sm:max-w-[480px] p-0 bg-[#0D0D0F] border-l border-white/10 text-white flex flex-col h-full overflow-hidden [&>button]:hidden"
        >
          {selectedIssue && (
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className="p-5 border-b border-white/10 flex items-center justify-between">
                <div>
                  <SheetTitle className="text-lg font-bold text-white">Issue Resolution</SheetTitle>
                  <div className="text-xs text-[#8C8C8C]">
                    Reported on {new Date(selectedIssue.createdAt).toLocaleString()}
                  </div>
                </div>
                <button
                  onClick={() => setSelectedIssue(null)}
                  className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center text-white/70 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Scrollable Body */}
              <div className="flex-1 overflow-y-auto p-5 space-y-5">
                {/* Issue Type Banner */}
                <div className="p-4 rounded-2xl bg-red-500/10 border border-red-500/20 space-y-1.5">
                  <div className="flex items-center gap-2 text-red-400 font-semibold text-sm">
                    <ShieldAlert className="w-4 h-4 shrink-0" />
                    <span>{formatIssueType(selectedIssue.issueType)}</span>
                  </div>
                  <p className="text-xs text-white/90 leading-relaxed">
                    {selectedIssue.reason || "No additional notes provided."}
                  </p>
                  {selectedIssue.outcome && (
                    <div className="text-[11px] text-red-300/80 pt-1">
                      Outcome code: <code className="font-mono">{selectedIssue.outcome}</code>
                    </div>
                  )}
                </div>

                {/* Product Information */}
                <div>
                  <div className="text-xs uppercase text-[#8C8C8C] font-semibold tracking-wider mb-2.5">
                    Product Details
                  </div>
                  <div className="p-3.5 bg-[#141416] rounded-2xl border border-white/5 flex gap-3.5 items-center">
                    <div className="w-16 h-16 rounded-xl bg-black overflow-hidden flex-shrink-0 border border-white/10">
                      <img
                        src={getProductImage(selectedIssue.product)}
                        alt={selectedIssue.product?.name || "Product"}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold text-white text-sm truncate">
                        {selectedIssue.product?.name || "Unnamed Product"}
                      </div>
                      <div className="text-xs text-[#8C8C8C] mt-0.5">
                        {selectedIssue.product?.brand || "Brand"} • {selectedIssue.product?.condition || "Condition N/A"}
                      </div>
                      <div className="text-sm font-bold text-[#FFAF2C] mt-1">
                        AED {selectedIssue.product?.price?.toLocaleString() || "0"}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Seller & Buyer Info */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {/* Seller */}
                  <div className="p-3.5 bg-[#141416] rounded-2xl border border-white/5 space-y-1.5">
                    <div className="text-xs text-[#8C8C8C] font-medium flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5 text-[#FFAF2C]" /> Seller
                    </div>
                    <div className="font-semibold text-white text-sm truncate">
                      {selectedIssue.seller?.name || "Unknown"}
                    </div>
                    <div className="text-xs text-[#8C8C8C] truncate">
                      {selectedIssue.seller?.email || "No email"}
                    </div>
                    <div className="text-xs text-[#8C8C8C] truncate">
                      {selectedIssue.seller?.phone || selectedIssue.seller?.contact || "No phone"}
                    </div>
                  </div>

                  {/* Buyer */}
                  <div className="p-3.5 bg-[#141416] rounded-2xl border border-white/5 space-y-1.5">
                    <div className="text-xs text-[#8C8C8C] font-medium flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5 text-blue-400" /> Buyer (Refunded)
                    </div>
                    <div className="font-semibold text-white text-sm truncate">
                      {selectedIssue.buyer?.name || "Unknown"}
                    </div>
                    <div className="text-xs text-[#8C8C8C] truncate">
                      {selectedIssue.buyer?.email || "No email"}
                    </div>
                    <div className="text-xs text-[#8C8C8C] truncate">
                      {selectedIssue.buyer?.phone || selectedIssue.buyer?.contact || "No phone"}
                    </div>
                  </div>
                </div>

                {/* Resolution Status */}
                <div className="p-4 bg-[#141416] rounded-2xl border border-white/5 flex items-center justify-between">
                  <span className="text-xs text-[#8C8C8C]">Resolution State:</span>
                  {selectedIssue.resolved ? (
                    <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-green-500/10 text-green-400 border border-green-500/20 flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Resolved
                    </span>
                  ) : (
                    <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-yellow-500/10 text-yellow-400 border border-yellow-500/20 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" /> Awaiting Admin Action
                    </span>
                  )}
                </div>

                <div className="p-3.5 bg-white/5 rounded-2xl text-xs text-[#8C8C8C] flex gap-2">
                  <Info className="w-4 h-4 text-[#FFAF2C] shrink-0 mt-0.5" />
                  <span>
                    The buyer has already been refunded for this issue. Choose an action below to decide what happens to the product listing.
                  </span>
                </div>
              </div>

              {/* Action Footer */}
              {!selectedIssue.resolved && (
                <div className="p-4 sm:p-5 border-t border-white/10 bg-[#0D0D0F] space-y-2">
                  <button
                    onClick={() => setResolveActionType("make_available")}
                    className="w-full py-3 text-sm font-semibold rounded-full bg-gold-gradient text-black hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
                  >
                    <RotateCcw className="w-4 h-4" /> Make Available (Live in Shop)
                  </button>

                  <button
                    onClick={() => setResolveActionType("delete")}
                    className="w-full py-3 text-sm font-semibold rounded-full bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 transition-colors flex items-center justify-center gap-2"
                  >
                    <Trash2 className="w-4 h-4" /> Delete Product Permanently
                  </button>
                </div>
              )}
            </div>
          )}
        </SheetContent>
      </Sheet>

      {/* Confirmation Dialog for Resolving Action */}
      <Dialog
        open={Boolean(resolveActionType)}
        onOpenChange={(open) => !open && !isResolving && setResolveActionType(null)}
      >
        <DialogContent className="bg-[#0D0D0F] border border-white/10 text-white max-w-md rounded-3xl p-6">
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
                  This will permanently <strong>Delete</strong> the product and its uploaded images from storage and remove it from all wishlists. This action cannot be undone.
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
                  ? "bg-gold-gradient text-black hover:opacity-90"
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
    </div>
  );
}
