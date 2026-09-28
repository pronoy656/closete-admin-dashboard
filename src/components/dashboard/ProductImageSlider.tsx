"use client";
import React, { useState } from "react";
import { ArrowRight } from "lucide-react";
import { formatImageUrl } from "@/lib/utils";

interface ProductImageSliderProps {
  images?: string[];
  singleImageFallback?: string;
  itemName?: string;
  className?: string;
  heightClass?: string;
}

export function ProductImageSlider({
  images,
  singleImageFallback,
  itemName = "Product",
  className = "",
  heightClass = "h-44 sm:h-52",
}: ProductImageSliderProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const galleryImages =
    images && images.length > 0
      ? images.filter(Boolean)
      : singleImageFallback
      ? [singleImageFallback]
      : ["/dior-bag.webp", "/gucchi-bag.webp", "/dior-bag.webp", "/gucchi-bag.webp"];

  const hasMultiple = galleryImages.length > 1;

  return (
    <div className={`relative w-full ${heightClass} mb-4 select-none ${className}`}>
      <div className="w-full h-full rounded-xl overflow-hidden relative">
        {hasMultiple ? (
          <>
            <div className="w-[88%] h-full">
              <div className="flex h-full w-full">
                {galleryImages.map((img, idx) => (
                  <div
                    key={idx}
                    className="w-full h-full flex-shrink-0 pr-2 transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] cursor-pointer"
                    style={idx === 0 ? { marginLeft: `-${currentImageIndex * 100}%` } : {}}
                    onClick={() => setCurrentImageIndex(idx)}
                  >
                    <img
                      src={formatImageUrl(img)}
                      alt={`${itemName} - ${idx + 1}`}
                      onError={(e) => {
                        (e.currentTarget as HTMLImageElement).src = "/gucchi-bag.webp";
                      }}
                      className="w-full h-full object-cover rounded-xl"
                    />
                  </div>
                ))}
              </div>
            </div>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setCurrentImageIndex((prev) => (prev + 1) % galleryImages.length);
              }}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-full text-white bg-gradient-to-br from-white/20 to-black/10 backdrop-blur-md border border-white/20 shadow-[inset_1px_2px_5px_rgba(255,255,255,0.8),inset_-1px_-2px_5px_rgba(0,0,0,0.3),0_8px_20px_rgba(0,0,0,0.4)] transition-all z-10 group brightness-110 hover:brightness-125 cursor-pointer"
              aria-label="Next image"
            >
              <ArrowRight
                className="w-5 h-5 drop-shadow-sm group-hover:scale-110 transition-transform"
                strokeWidth={2.5}
              />
            </button>
          </>
        ) : (
          <img
            src={formatImageUrl(galleryImages[0])}
            alt={itemName}
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).src = "/gucchi-bag.webp";
            }}
            className="w-full h-full object-cover rounded-xl"
          />
        )}
      </div>

      {/* Dots exactly on the middle of the bottom border */}
      {hasMultiple && (
        <div className="absolute left-1/2 -translate-x-1/2 bottom-0 translate-y-1/2 flex items-center gap-1.5 px-3 py-1.5 bg-[#1A1A1D] rounded-full border border-white/10 z-20 shadow-lg">
          {galleryImages.map((_, idx) => (
            <div
              key={idx}
              onClick={() => setCurrentImageIndex(idx)}
              className={`rounded-full transition-all duration-300 cursor-pointer ${
                idx === currentImageIndex ? "w-2 h-2 bg-[#FFAF2C]" : "w-1.5 h-1.5 bg-[#8C8C8C]"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
