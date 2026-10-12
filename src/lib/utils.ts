import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatImageUrl(url?: string): string {
  if (!url) return "/gucchi-bag.webp";
  const apiBase =
    process.env.NEXT_PUBLIC_API_BASE_URL?.replace(/\/api\/v1\/?$/, "") ||
    "http://localhost:5000";

  if (url.startsWith("http://") || url.startsWith("https://")) {
    if (url.includes("/uploads/")) {
      const uploadPath = url.substring(url.indexOf("/uploads/"));
      return `${apiBase}${uploadPath}`;
    }
    return url;
  }
  if (url.startsWith("/uploads/")) {
    return `${apiBase}${url}`;
  }
  if (url.startsWith("/")) {
    return url;
  }
  return `${apiBase}/uploads/${url}`;
}
