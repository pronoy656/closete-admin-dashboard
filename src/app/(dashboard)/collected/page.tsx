"use client";
import OrderTable from "@/components/dashboard/OrderTable";

export default function CollectedPage() {
  return <OrderTable title="Collected Orders" filterStatus="Collected" />;
}
