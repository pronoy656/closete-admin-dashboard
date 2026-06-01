"use client";
import OrderTable from "@/components/dashboard/OrderTable";

export default function AwaitingCollectionPage() {
  return <OrderTable title="Awaiting Collection" filterStatus="Reserved" />;
}
