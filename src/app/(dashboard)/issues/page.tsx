"use client";
import OrderTable from "@/components/dashboard/OrderTable";

export default function IssuesPage() {
  return <OrderTable title="Reported Issues" filterStatus="Issue" />;
}
