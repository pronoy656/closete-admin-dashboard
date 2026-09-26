"use client";
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  useCallback,
} from "react";
import { adminApi } from "@/lib/api";

export type Order = {
  id: string;
  backendId?: string;
  productId?: string;
  item: {
    name: string;
    desc: string;
    image: string;
    images?: string[];
    price: string;
  };
  seller: {
    name: string;
    phone: string;
    location: string;
    payoutsEnabled?: boolean;
    stripeAccountStatus?: string;
  };
  buyer: { name: string; phone: string; location: string };
  pickup: string;
  delivery: string;
  status: string;
  statusColor: string;
  statusBg: string;
  dotColor: string;
  progress: number;
  note?: string;
  aiAnalysis?: {
    fakePercent: number;
    originalPercent: number;
    reason?: string;
  };
  issue?: {
    reason: string;
    notes?: string;
    createdAt: string;
    referenceId: string;
    responses: { role: string; text: string; time: string }[];
  };
};

function mapBackendOrderToOrder(raw: any): Order {
  const statusStr = (raw.status || "secured").toLowerCase();

  let progress = 0;
  let statusLabel = "Reserved";
  let statusColor = "text-yellow-500";
  let statusBg = "bg-yellow-500/10";
  let dotColor = "bg-yellow-500";

  if (
    statusStr === "collected" ||
    statusStr === "collection_pending" ||
    statusStr === "in_transit"
  ) {
    progress = 1;
    statusLabel = "Collected";
    statusColor = "text-blue-400";
    statusBg = "bg-blue-400/10";
    dotColor = "bg-blue-400";
  } else if (
    statusStr === "verification" ||
    statusStr === "verified" ||
    statusStr === "authenticated" ||
    statusStr === "payout_processing"
  ) {
    progress = 2;
    statusLabel = "Authenticated";
    statusColor = "text-purple-400";
    statusBg = "bg-purple-400/10";
    dotColor = "bg-purple-400";
  } else if (
    statusStr === "dispatched" ||
    statusStr === "ready_for_delivery"
  ) {
    progress = 3;
    statusLabel = "Dispatched";
    statusColor = "text-sky-400";
    statusBg = "bg-sky-400/10";
    dotColor = "bg-sky-400";
  } else if (
    statusStr === "delivered" ||
    statusStr === "completed"
  ) {
    progress = 4;
    statusLabel = "Delivered";
    statusColor = "text-green-500";
    statusBg = "bg-green-500/10";
    dotColor = "bg-green-500";
  } else if (
    statusStr === "issue" ||
    statusStr === "cancelled" ||
    statusStr === "refunded"
  ) {
    progress = 1;
    statusLabel = "Issue";
    statusColor = "text-red-500";
    statusBg = "bg-red-500/10";
    dotColor = "bg-red-500";
  }

  const prod = raw.product || {};
  const seller = raw.seller || {};
  const buyer = raw.buyer || {};
  const del = raw.deliveryDetails || {};

  const images =
    prod.images && prod.images.length > 0
      ? prod.images
      : ["/gucchi-bag.webp"];

  return {
    id: raw.orderNumber
      ? `#${raw.orderNumber.replace(/CLT-/, "")}`
      : `#${raw._id?.slice(-6)}`,
    backendId: raw._id,
    productId: prod._id || (typeof raw.product === 'string' ? raw.product : undefined),
    item: {
      name: prod.name || "Luxury Item",
      desc:
        prod.description ||
        `${prod.brand || ""} • ${prod.condition || ""}`,
      image: images[0],
      images,
      price: `AED ${raw.price?.toLocaleString() || prod.price?.toLocaleString() || "0"}`,
    },
    seller: {
      name: seller.name || "Verified Seller",
      phone: seller.phone || seller.contact || "+971 50 123 4567",
      location: seller.location || del.location || "Dubai, UAE",
      payoutsEnabled: Boolean(
        seller.payoutsEnabled || seller.stripeAccountId,
      ),
      stripeAccountStatus:
        seller.stripeAccountStatus ||
        (seller.stripeAccountId ? "active" : undefined),
    },
    buyer: {
      name: buyer.name || del.name || "Buyer",
      phone: del.phone || buyer.phone || "+971 52 987 6543",
      location: del.address || buyer.location || "Dubai, UAE",
    },
    pickup: raw.pickupWindow?.start
      ? `Today • ${new Date(raw.pickupWindow.start).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}`
      : "Today • 11 AM-2 PM",
    delivery: raw.estimatedDeliveryAt
      ? new Date(raw.estimatedDeliveryAt).toLocaleDateString()
      : "Tomorrow",
    status: statusLabel,
    statusColor,
    statusBg,
    dotColor,
    progress,
    note: raw.note,
    aiAnalysis: { fakePercent: 4, originalPercent: 96 },
    issue: raw.issue
      ? {
          reason: raw.issue.reason || "Under review",
          notes: raw.issue.notes,
          createdAt: raw.issue.createdAt || "Recent",
          referenceId: `#ISSUE-${raw._id?.slice(-4)}`,
          responses: raw.issue.responses || [],
        }
      : undefined,
  };
}

type OrdersContextType = {
  orders: Order[];
  isLoading: boolean;
  refreshOrders: () => Promise<void>;
  advanceOrder: (orderId: string) => Promise<void>;
  resolveIssue: (
    orderId: string,
    resolution: "queue" | "resolve",
  ) => Promise<void>;
  getOrderById: (orderId: string) => Order | undefined;
};

const OrdersContext = createContext<OrdersContextType | null>(null);

export function useOrders() {
  const ctx = useContext(OrdersContext);
  if (!ctx) throw new Error("useOrders must be used within OrdersProvider");
  return ctx;
}

export function OrdersProvider({ children }: { children: ReactNode }) {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchOrders = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await adminApi.getAllOrders();
      if (res.success && res.data && Array.isArray(res.data)) {
        const mapped = res.data.map(mapBackendOrderToOrder);
        setOrders(mapped);
      } else {
        setOrders([]);
      }
    } catch (e) {
      console.warn("Error fetching orders:", e);
      setOrders([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  const advanceOrder = async (orderId: string) => {
    const targetOrder = orders.find((o) => o.id === orderId);
    if (!targetOrder || targetOrder.progress >= 4) return;

    const nextProgress = targetOrder.progress + 1;
    let targetStatusBackend = "collected";
    let newStatus = "Collected";
    let newStatusColor = "text-blue-400";
    let newStatusBg = "bg-blue-400/10";
    let newDotColor = "bg-blue-400";

    if (nextProgress === 1) {
      targetStatusBackend = "collected";
      newStatus = "Collected";
      newStatusColor = "text-blue-400";
      newStatusBg = "bg-blue-400/10";
      newDotColor = "bg-blue-400";
    } else if (nextProgress === 2) {
      targetStatusBackend = "verification";
      newStatus = "Authenticated";
      newStatusColor = "text-purple-400";
      newStatusBg = "bg-purple-400/10";
      newDotColor = "bg-purple-400";
    } else if (nextProgress === 3) {
      targetStatusBackend = "dispatched";
      newStatus = "Dispatched";
      newStatusColor = "text-sky-400";
      newStatusBg = "bg-sky-400/10";
      newDotColor = "bg-sky-400";
    } else if (nextProgress === 4) {
      targetStatusBackend = "delivered";
      newStatus = "Delivered";
      newStatusColor = "text-green-500";
      newStatusBg = "bg-green-500/10";
      newDotColor = "bg-green-500";
    }

    // Call backend API if backendId exists
    if (targetOrder.backendId) {
      try {
        await adminApi.updateOrderStatus(targetOrder.backendId, targetStatusBackend);
      } catch (err) {
        console.error("Failed to update status on server:", err);
      }
    }

    // Update local state
    setOrders((prev) =>
      prev.map((o) => {
        if (o.id !== orderId) return o;
        return {
          ...o,
          progress: nextProgress,
          status: newStatus,
          statusColor: newStatusColor,
          statusBg: newStatusBg,
          dotColor: newDotColor,
        };
      })
    );
  };

  const resolveIssue = async (orderId: string, resolution: "queue" | "resolve") => {
    const targetOrder = orders.find((o) => o.id === orderId);
    if (!targetOrder) return;

    if (targetOrder.backendId) {
      try {
        await adminApi.updateOrderStatus(
          targetOrder.backendId,
          resolution === "queue" ? "secured" : "delivered"
        );
      } catch (err) {
        console.error("Failed to resolve issue on server:", err);
      }
    }

    setOrders((prev) =>
      prev.map((o) => {
        if (o.id !== orderId) return o;
        const nextProgress = resolution === "queue" ? 0 : 4;
        const newStatus = resolution === "queue" ? "Reserved" : "Delivered";
        const newStatusColor =
          resolution === "queue" ? "text-yellow-500" : "text-green-500";
        const newStatusBg =
          resolution === "queue" ? "bg-yellow-500/10" : "bg-green-500/10";
        const newDotColor =
          resolution === "queue" ? "bg-yellow-500" : "bg-green-500";

        const { issue, ...rest } = o;
        return {
          ...rest,
          progress: nextProgress,
          status: newStatus,
          statusColor: newStatusColor,
          statusBg: newStatusBg,
          dotColor: newDotColor,
        };
      })
    );
  };

  const getOrderById = (orderId: string) => orders.find((o) => o.id === orderId);

  return (
    <OrdersContext.Provider
      value={{
        orders,
        isLoading,
        refreshOrders: fetchOrders,
        advanceOrder,
        resolveIssue,
        getOrderById,
      }}
    >
      {children}
    </OrdersContext.Provider>
  );
}
