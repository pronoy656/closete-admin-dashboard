"use client";
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Bell,
  Check,
  Package,
  AlertCircle,
  FileText,
  ChevronRight,
  Inbox,
} from "lucide-react";
import { adminApi } from "@/lib/api";
export type AlertItem = {
  id: string;
  backendId?: string;
  type: "review" | "order" | "issue" | "system";
  title: string;
  description: string;
  time: string;
  link: string;
  read: boolean;
};

// Module-level deduplication to prevent multiple simultaneous API calls across mobile/desktop mounts
let cachedAlerts: AlertItem[] | null = null;
let lastCacheTime = 0;
let inFlightAlertsPromise: Promise<AlertItem[]> | null = null;

export default function TopBarNotifications() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [filter, setFilter] = useState<"all" | "unread">("all");
  const [alerts, setAlerts] = useState<AlertItem[]>([]);
  const [readIds, setReadIds] = useState<Set<string>>(new Set());
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Load read IDs from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem("closete_read_alerts");
      if (stored) {
        setReadIds(new Set(JSON.parse(stored)));
      }
    } catch {}
  }, []);

  // Fetch notifications directly from backend API (deduplicated)
  useEffect(() => {
    let isMounted = true;

    async function loadAlerts() {
      const now = Date.now();
      if (cachedAlerts && now - lastCacheTime < 4000) {
        if (isMounted) setAlerts(cachedAlerts);
        return;
      }

      if (inFlightAlertsPromise) {
        try {
          const res = await inFlightAlertsPromise;
          if (isMounted) setAlerts(res);
        } catch {}
        return;
      }

      inFlightAlertsPromise = (async () => {
        const collectedAlerts: AlertItem[] = [];

        // Direct in-app notifications from backend API only - no synthesized alerts
        try {
          const notifRes = await adminApi.getNotifications();
          const list = Array.isArray(notifRes.data)
            ? notifRes.data
            : Array.isArray(notifRes.data?.result)
              ? notifRes.data.result
              : [];

          list.forEach((n: any) => {
            const rawId = (n._id || n.id)?.toString();
            const notifType = (n.type || "").toLowerCase();
            let alertType: AlertItem["type"] = "system";
            let link = "/all-orders";

            if (notifType.includes("review") || notifType.includes("product")) {
              alertType = "review";
              link = "/pending-review";
            } else if (notifType.includes("issue") || notifType.includes("dispute")) {
              alertType = "issue";
              link = "/issues";
            } else if (notifType.includes("order")) {
              alertType = "order";
              link = "/all-orders";
            }

            collectedAlerts.push({
              id: `backend-${rawId}`,
              backendId: rawId,
              type: alertType,
              title: n.title || "Notification",
              description: n.body || n.message || "",
              time: n.createdAt
                ? new Date(n.createdAt).toLocaleDateString()
                : "Recent",
              link: n.link || n.url || link,
              read: Boolean(n.readAt || n.read || n.isRead),
            });
          });
        } catch (err) {
          console.warn("Could not load backend notifications:", err);
        }

        cachedAlerts = collectedAlerts;
        lastCacheTime = Date.now();
        return collectedAlerts;
      })().finally(() => {
        inFlightAlertsPromise = null;
      });

      try {
        const result = await inFlightAlertsPromise;
        if (isMounted) {
          setAlerts(result);
        }
      } catch {}
    }

    loadAlerts();
  }, []);

  // Click outside listener
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const unreadAlerts = alerts.filter((a) => !readIds.has(a.id) && !a.read);
  const unreadCount = unreadAlerts.length;

  const displayedAlerts = filter === "unread" ? unreadAlerts : alerts;

  const handleMarkAllRead = async () => {
    const newReadIds = new Set(readIds);
    alerts.forEach((a) => newReadIds.add(a.id));
    setReadIds(newReadIds);
    cachedAlerts = null;
    try {
      localStorage.setItem(
        "closete_read_alerts",
        JSON.stringify(Array.from(newReadIds))
      );
      await adminApi.markAllNotificationsRead();
    } catch (e) {
      console.warn("Failed to mark all notifications as read:", e);
    }
  };

  const handleItemClick = async (alert: AlertItem) => {
    const newReadIds = new Set(readIds);
    newReadIds.add(alert.id);
    setReadIds(newReadIds);
    cachedAlerts = null;
    try {
      localStorage.setItem(
        "closete_read_alerts",
        JSON.stringify(Array.from(newReadIds))
      );
      if (alert.backendId) {
        adminApi.markNotificationRead(alert.backendId).catch(() => {});
      }
    } catch {}
    setIsOpen(false);
    router.push(alert.link);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Bell Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative h-10 w-10 rounded-full bg-[#1A1A1D] border border-white/5 flex items-center justify-center hover:bg-white/10 transition-colors text-white focus:outline-none"
        aria-label="Notifications"
        title="Notifications"
      >
        <Bell className="h-4.5 w-4.5 text-[#CCCCCC]" />

        {/* Clean, calm badge — no pulse, no neon glow */}
        {unreadCount > 0 && (
          <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-[#FFAF2C]" />
        )}
      </button>

      {/* Popover Dropdown */}
      {isOpen && (
        <div className="absolute right-0 mt-3 w-80 sm:w-92 rounded-xl bg-[#141416] border border-white/10 shadow-2xl z-50 overflow-hidden flex flex-col">
          {/* Header */}
          <div className="px-4 py-3.5 border-b border-white/5 flex items-center justify-between bg-[#18181A]">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-white tracking-wide">
                Notifications
              </span>
              {unreadCount > 0 && (
                <span className="px-1.5 py-0.5 rounded text-[11px] font-medium bg-[#FFAF2C]/10 text-[#FFAF2C]">
                  {unreadCount} new
                </span>
              )}
            </div>

            {unreadCount > 0 && (
              <button
                onClick={handleMarkAllRead}
                className="text-xs text-[#8C8C8C] hover:text-[#FFAF2C] transition-colors flex items-center gap-1"
              >
                <Check className="w-3.5 h-3.5" />
                <span>Mark all as read</span>
              </button>
            )}
          </div>

          {/* Clean Segment Tabs */}
          <div className="px-4 py-2 flex items-center gap-1.5 bg-[#121214] border-b border-white/5 text-xs">
            <button
              onClick={() => setFilter("all")}
              className={`px-2.5 py-1 rounded-md text-xs font-medium transition-colors ${
                filter === "all"
                  ? "bg-white/10 text-white"
                  : "text-[#8C8C8C] hover:text-white"
              }`}
            >
              All ({alerts.length})
            </button>
            <button
              onClick={() => setFilter("unread")}
              className={`px-2.5 py-1 rounded-md text-xs font-medium transition-colors ${
                filter === "unread"
                  ? "bg-white/10 text-[#FFAF2C]"
                  : "text-[#8C8C8C] hover:text-[#FFAF2C]"
              }`}
            >
              Unread ({unreadCount})
            </button>
          </div>

          {/* Alert List — Clean scroll area with completely hidden/clean scrollbar */}
          <div className="max-h-76 overflow-y-auto divide-y divide-white/5 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
            {displayedAlerts.length === 0 ? (
              <div className="py-10 px-4 text-center flex flex-col items-center justify-center">
                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center mb-2.5 text-[#666666]">
                  <Inbox className="w-5 h-5" />
                </div>
                <p className="text-xs font-medium text-white mb-0.5">
                  No notifications
                </p>
                <p className="text-[11px] text-[#8C8C8C]">
                  {filter === "unread"
                    ? "You are all caught up."
                    : "No alerts at this time."}
                </p>
              </div>
            ) : (
              displayedAlerts.map((alert) => {
                const isRead = readIds.has(alert.id) || alert.read;
                return (
                  <div
                    key={alert.id}
                    onClick={() => handleItemClick(alert)}
                    className={`px-4 py-3 flex items-start gap-3 cursor-pointer transition-colors hover:bg-white/[0.04] ${
                      !isRead ? "bg-white/[0.015]" : "opacity-75"
                    }`}
                  >
                    {/* Minimalist uniform icon */}
                    <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center shrink-0 mt-0.5 text-[#A0A0A0]">
                      {alert.type === "review" ? (
                        <FileText className="w-4 h-4 text-[#FFAF2C]" />
                      ) : alert.type === "issue" ? (
                        <AlertCircle className="w-4 h-4 text-[#E57373]" />
                      ) : (
                        <Package className="w-4 h-4 text-[#CCCCCC]" />
                      )}
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-1 mb-0.5">
                        <span
                          className={`text-xs font-medium truncate ${
                            !isRead ? "text-white" : "text-[#A0A0A0]"
                          }`}
                        >
                          {alert.title}
                        </span>
                        <span className="text-[10px] text-[#666666] shrink-0">
                          {alert.time}
                        </span>
                      </div>
                      <p className="text-[11px] text-[#8C8C8C] line-clamp-2 leading-relaxed">
                        {alert.description}
                      </p>
                    </div>

                    {!isRead && (
                      <span className="w-1.5 h-1.5 rounded-full bg-[#FFAF2C] shrink-0 self-center" />
                    )}
                  </div>
                );
              })
            )}
          </div>

          {/* Footer Navigation */}
          <div className="px-4 py-2.5 border-t border-white/5 bg-[#18181A] flex items-center justify-between text-xs">
            <Link
              href="/pending-review"
              onClick={() => setIsOpen(false)}
              className="text-[#FFAF2C] hover:underline font-medium flex items-center gap-1 transition-colors"
            >
              <span>Pending Review</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
            <Link
              href="/all-orders"
              onClick={() => setIsOpen(false)}
              className="text-[#8C8C8C] hover:text-white transition-colors"
            >
              All Orders
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
