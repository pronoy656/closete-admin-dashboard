"use client";
import OrderTable from "@/components/dashboard/OrderTable";

export default function DeliveredPage() {
  return <OrderTable title="Delivered Orders" filterStatus="Delivered" />;
}
