"use client";
import OrderTable from "@/components/dashboard/OrderTable";

export default function DispatchedPage() {
  return <OrderTable title="Dispatched Orders" filterStatus="Dispatched" />;
}
