"use client";
import React, { useState } from "react";
import { AlertCircle, Calendar, ChevronDown, Search, ArrowRight, Phone, MapPin, Info } from "lucide-react";
import { Input } from "@/components/ui/input";

type IssueReport = {
  ref: string;
  orderId: string;
  item: string;
  image: string;
  seller: string;
  buyer: string;
  issueType: string;
  details: string;
  reportedAt: string;
  status: string;
};

const issueReports: IssueReport[] = [
  {
    ref: "#RP-992-K",
    orderId: "#873927",
    item: "Classic Flap Bag",
    image: "/dior-bag.webp",
    seller: "Emma Richards",
    buyer: "Rachel Miller",
    issueType: "Buyer rejected",
    details: "Buyer rejected item at delivery due to condition mismatch.",
    reportedAt: "Just now",
    status: "Open",
  },
];

export default function IssuesPage() {
  const [search, setSearch] = useState("");
  const filtered = issueReports.filter(
    (r) =>
      r.ref.toLowerCase().includes(search.toLowerCase()) ||
      r.orderId.toLowerCase().includes(search.toLowerCase()) ||
      r.item.toLowerCase().includes(search.toLowerCase()) ||
      r.issueType.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="w-full h-full text-white bg-[#1A1A1D] rounded-2xl border border-white/5 overflow-hidden">
      {/* Header */}
      <div className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/5">
        <div className="flex items-center gap-3">
          <AlertCircle className="w-5 h-5 text-red-500" />
          <h2 className="text-xl font-semibold">Reported Issues</h2>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#8C8C8C]" />
            <Input
              placeholder="Search issues.."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-transparent border-white/10 rounded-full h-10 pl-10 text-sm focus-visible:ring-[#E6B95F]/30 text-white"
            />
          </div>
          <button className="flex items-center gap-2 h-10 px-4 rounded-full border border-white/10 text-sm font-medium hover:bg-white/5 transition-colors">
            <Calendar className="h-4 w-4 text-[#8C8C8C]" />
            <span>15 Jun, 2026</span>
            <ChevronDown className="h-4 w-4 text-[#8C8C8C] ml-2" />
          </button>
          <button className="flex items-center gap-2 h-10 px-4 rounded-full border border-white/10 text-sm font-medium hover:bg-white/5 transition-colors min-w-[100px] justify-between">
            <span>All</span>
            <ChevronDown className="h-4 w-4 text-[#8C8C8C]" />
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="w-full overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="text-xs text-[#8C8C8C] uppercase font-semibold border-b border-white/5 bg-[#141416]/50">
            <tr>
              <th className="px-6 py-5">REFERENCE</th>
              <th className="px-6 py-5">ORDER</th>
              <th className="px-6 py-5">ITEM</th>
              <th className="px-6 py-5">ISSUE TYPE</th>
              <th className="px-6 py-5">SELLER</th>
              <th className="px-6 py-5">BUYER</th>
              <th className="px-6 py-5">REPORTED</th>
              <th className="px-6 py-5">STATUS</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={8} className="text-center py-16 text-[#8C8C8C]">
                  <div className="flex flex-col items-center gap-3">
                    <AlertCircle className="w-10 h-10 text-white/10" />
                    <span>No issues reported yet</span>
                  </div>
                </td>
              </tr>
            ) : (
              filtered.map((report, i) => (
                <tr key={i} className="hover:bg-white/[0.02] transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="font-semibold text-[#E6B95F]">{report.ref}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-[#8C8C8C]">{report.orderId}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="h-9 w-9 rounded-lg bg-white/10 flex-shrink-0 overflow-hidden">
                        <img src={report.image} alt={report.item} className="w-full h-full object-cover" />
                      </div>
                      <span className="font-medium text-[#EBEBEB] truncate max-w-[130px]">{report.item}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 text-red-400 text-xs font-medium">
                      <Info className="w-3 h-3" />
                      {report.issueType}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-[#EBEBEB]">{report.seller}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-[#EBEBEB]">{report.buyer}</span>
                  </td>
                  <td className="px-6 py-4 text-[#8C8C8C]">{report.reportedAt}</td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-orange-500/10 text-orange-400 text-xs font-medium">
                      <span className="w-1.5 h-1.5 rounded-full bg-orange-400"></span>
                      {report.status}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
