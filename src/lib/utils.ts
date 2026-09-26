import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatImageUrl(url?: string): string {
  if (!url) return "/gucchi-bag.webp";
  if (url.startsWith("http://") || url.startsWith("https://")) {
    if (url.includes("/uploads/")) {
      const uploadPath = url.substring(url.indexOf("/uploads/"));
      return `http://localhost:5000${uploadPath}`;
    }
    return url;
  }
  if (url.startsWith("/")) {
    return `http://localhost:5000${url}`;
  }
  return `http://localhost:5000/uploads/${url}`;
}
