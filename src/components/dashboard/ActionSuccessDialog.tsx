"use client";
import React from "react";
import { X, ArrowRight } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { formatImageUrl } from "@/lib/utils";

export interface SuccessItemData {
  id?: string | number;
  name: string;
  subtitle?: string; // e.g. "Chanel · AED 3,200" or "Buyer : Rachel Miller"
  image?: string;
  statusText?: string; // e.g. "Live", "Approved", "Rejected", "Delivered"
  statusBg?: string; // e.g. "bg-[#107D2C]" or "bg-[#EA384C]"
  statusColor?: string; // e.g. "text-white"
  dotColor?: string; // e.g. "bg-white"
  showDot?: boolean;
}

export interface InfoRowData {
  label: string;
  value: string;
  valueColor?: string;
}

export interface ReasonBadgeData {
  text: string;
  type?: "green" | "red"; // green -> #0C2417 / #00D22B, red -> #251417 / #FF4D4D
}

export interface ActionSuccessDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  type?: "approve" | "reject" | "issue" | "update";
  iconType?: "green-check" | "red-cross";
  title: string;
  description: string;
  itemData?: SuccessItemData;
  infoRows?: InfoRowData[];
  reasonBadge?: ReasonBadgeData | string;
  footerNote?: string;
  footerNotice?: string;
  buttonText?: string;
  onButtonClick?: () => void;
}

export function ActionSuccessDialog({
  open,
  onOpenChange,
  type = "approve",
  iconType,
  title,
  description,
  itemData,
  infoRows,
  reasonBadge,
  footerNote,
  footerNotice,
  buttonText = "Back To Dashboard",
  onButtonClick,
}: ActionSuccessDialogProps) {
  const handleClose = () => {
    onOpenChange(false);
  };

  const handleAction = () => {
    if (onButtonClick) {
      onButtonClick();
    } else {
      handleClose();
    }
  };

  // Determine icon: if iconType is explicitly set, use it; otherwise 'reject' -> red-cross, others -> green-check
  const isRedCross = iconType ? iconType === "red-cross" : type === "reject";

  // Parse reasonBadge if provided as string or object
  const badgeData: ReasonBadgeData | null =
    typeof reasonBadge === "string"
      ? {
          text: reasonBadge,
          type:
            reasonBadge.toLowerCase().includes("reject") ||
            reasonBadge.toLowerCase().includes("condition")
              ? "red"
              : "green",
        }
      : reasonBadge || null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="text-white w-[calc(100vw-32px)] max-w-[420px] p-0 shadow-2xl rounded-3xl overflow-hidden [&>button]:hidden z-50 select-none"
        style={{
          background:
            "linear-gradient(#0D0D0F, #0D0D0F) padding-box, linear-gradient(to bottom, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0.10) 40%, transparent 85%) border-box",
          border: "1px solid transparent",
        }}
      >
        <div className="relative flex flex-col items-center text-center px-4 sm:px-6 pt-7 pb-6">
          {/* Close button */}
          <button
            type="button"
            onClick={handleClose}
            className="absolute top-4 right-4 w-6 h-6 rounded-full border border-white/80 flex items-center justify-center hover:border-white transition-colors flex-shrink-0 cursor-pointer text-white"
            aria-label="Close"
          >
            <X className="w-3 h-3 text-white" strokeWidth={2.5} />
          </button>

          {/* Layered concentric circle hero icon */}
          <div className="relative flex items-center justify-center mb-5">
            <div className="w-32 h-32 sm:w-36 sm:h-36 rounded-full bg-[#18181B]/80 border border-white/[0.03]" />
            <div className="absolute w-24 h-24 sm:w-26 sm:h-26 rounded-full bg-[#202024]/90 border border-white/[0.04]" />
            {isRedCross ? (
              <img
                src="/image 13.png"
                alt="Rejected"
                onError={(e) => {
                  (e.currentTarget as HTMLElement).style.display = "none";
                }}
                className="absolute w-14 h-14 sm:w-16 sm:h-16 object-contain drop-shadow-[0_8px_16px_rgba(234,56,76,0.35)]"
              />
            ) : (
              <img
                src="/image 12.png"
                alt="Success"
                onError={(e) => {
                  (e.currentTarget as HTMLElement).style.display = "none";
                }}
                className="absolute w-14 h-14 sm:w-16 sm:h-16 object-contain drop-shadow-[0_8px_16px_rgba(0,210,43,0.35)]"
              />
            )}
          </div>

          <DialogTitle className="text-xl sm:text-[22px] font-bold text-white mb-1 tracking-tight">
            {title}
          </DialogTitle>
          <DialogDescription className="text-xs sm:text-sm text-[#8C8C8C] mb-4 max-w-[320px] leading-relaxed font-normal">
            {description}
          </DialogDescription>

          {/* Product Item Card */}
          {itemData && (
            <div className="w-full bg-[#1A1A1D] rounded-2xl p-3 sm:p-3.5 mb-3.5 text-left flex gap-3.5 items-center border border-white/[0.04]">
              {itemData.image && (
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl overflow-hidden flex-shrink-0 bg-white/5 border border-white/10">
                  <img
                    src={formatImageUrl(itemData.image)}
                    alt={itemData.name}
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src = "/gucchi-bag.webp";
                    }}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start mb-0.5">
                  {itemData.id ? (
                    <span className="text-[#FFAF2C] font-semibold text-xs sm:text-sm">
                      #{itemData.id}
                    </span>
                  ) : (
                    <span />
                  )}
                  {itemData.statusText && (
                    <span
                      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold ${
                        itemData.statusBg ||
                        (itemData.statusText.toLowerCase().includes("reject")
                          ? "bg-[#FF383C]"
                          : "bg-[#107D2C]")
                      } ${itemData.statusColor || "text-white"}`}
                    >
                      {itemData.showDot && (
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${
                            itemData.dotColor || "bg-white"
                          }`}
                        />
                      )}
                      {itemData.statusText}
                    </span>
                  )}
                </div>
                <h4 className="text-sm sm:text-[15px] font-semibold text-white truncate">
                  {itemData.name}
                </h4>
                {itemData.subtitle && (
                  <p className="text-xs text-[#8C8C8C] truncate mt-0.5">
                    {itemData.subtitle}
                  </p>
                )}
              </div>
            </div>
          )}

          {/* Info Rows (e.g. for Issue Reports) */}
          {infoRows && infoRows.length > 0 && (
            <div className="w-full bg-[#1A1A1D] rounded-2xl p-4 mb-3.5 text-left space-y-3 border border-white/[0.04]">
              {infoRows.map((row, i) => (
                <div key={i} className="flex justify-between items-center text-sm">
                  <span className="text-[#8C8C8C]">{row.label}</span>
                  <span
                    className={`font-semibold ${
                      row.valueColor || "text-[#FFAF2C]"
                    }`}
                  >
                    {row.value}
                  </span>
                </div>
              ))}
            </div>
          )}

          {/* Reason Badge Pill (e.g. "Rejected reason : Poor-quality images" or "Approval reason : Product verified") */}
          {badgeData && (
            <div className="mb-2.5">
              <span
                className={`inline-flex items-center px-4 py-1.5 rounded-full text-xs font-normal ${
                  badgeData.type === "red"
                    ? "bg-[#251417] text-[#FF4D4D]"
                    : "bg-[#0C2417] text-[#00D22B]"
                }`}
              >
                {badgeData.text}
              </span>
            </div>
          )}

          {/* Footer Notice text */}
          {footerNotice && (
            <p className="text-xs text-[#8C8C8C] leading-relaxed mb-3 px-2">
              {footerNotice}
            </p>
          )}

          {/* Optional Footer Note */}
          {footerNote && !badgeData && (
            <div className="text-xs sm:text-sm text-[#00D22B] mb-3">
              {footerNote}
            </div>
          )}

          {/* Action Button (Full gold pill button) */}
          <button
            type="button"
            onClick={handleAction}
            className="w-full h-11 sm:h-12 bg-gold-gradient text-black font-semibold rounded-full flex items-center justify-center gap-2 hover:opacity-95 active:scale-[0.98] transition-all cursor-pointer shadow-lg shadow-[#D6A042]/20 text-sm mt-1"
          >
            <span>{buttonText}</span>
            <ArrowRight className="w-4 h-4" strokeWidth={2.5} />
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
