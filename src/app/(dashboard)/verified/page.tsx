"use client";
import OrderTable from "@/components/dashboard/OrderTable";

export default function VerifiedPage() {
  return <OrderTable title="Verified Orders" filterStatus="Verified" />;
}
