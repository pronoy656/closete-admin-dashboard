"use client";
import React, { useState } from "react";
import { AlertCircle, Calendar, ChevronDown, Search, ArrowRight, Phone, MapPin, Info, ShoppingCart } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

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
  const [selectedIssue, setSelectedIssue] = useState<IssueReport | null>(null);

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
                <td colSpan={8} className="text-center py-24 text-[#8C8C8C]">
                  <div className="flex flex-col items-center justify-center gap-2">
                    <div className="w-32 h-32 rounded-full bg-[#1A1A1D] border border-white/10 flex items-center justify-center mb-4 shadow-xl relative overflow-hidden">
                       <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent opacity-30" />
                       <ShoppingCart className="w-12 h-12 text-white/40 relative z-10" />
                    </div>
                    <h3 className="text-2xl font-semibold text-white mb-1">No issues found</h3>
                    <p className="text-sm text-[#8C8C8C] mb-6">There are currently no issues matching this filter</p>
                    <button className="px-8 py-2.5 bg-gold-gradient text-black font-semibold rounded-full hover:opacity-90 transition-opacity">
                      Clear Filters
                    </button>
                  </div>
                </td>
              </tr>
            ) : (
              filtered.map((report, i) => (
                <tr key={i} className="hover:bg-white/[0.02] transition-colors cursor-pointer" onClick={() => setSelectedIssue(report)}>
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

      {/* Issue Details Dialog */}
      <Dialog open={selectedIssue !== null} onOpenChange={(open) => !open && setSelectedIssue(null)}>
        <DialogContent className="bg-[#141416] border border-white/10 text-white sm:max-w-[425px] p-6 shadow-2xl rounded-2xl [&>button]:text-white [&>button]:opacity-80 hover:[&>button]:opacity-100">
          {selectedIssue && (
            <>
              <DialogHeader className="mb-6">
                <DialogTitle className="text-2xl font-semibold mb-1">Issue Details</DialogTitle>
                <div className="text-sm text-[#8C8C8C]">Reference: {selectedIssue.ref}</div>
              </DialogHeader>

              <div className="bg-[#1A1A1D] border border-white/5 rounded-xl p-4 flex gap-4 items-center mb-6">
                <div className="w-20 h-20 rounded-lg overflow-hidden bg-white/5 flex-shrink-0">
                  <img src={selectedIssue.image} alt="Item" className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-[#E6B95F] font-medium text-sm mb-1">{selectedIssue.orderId}</div>
                  <div className="font-semibold truncate text-[15px] mb-1">{selectedIssue.item}</div>
                  <div className="text-xs text-[#8C8C8C] truncate">{selectedIssue.seller} to {selectedIssue.buyer}</div>
                </div>
              </div>

              <div className="mb-6">
                <div className="text-xs text-[#8C8C8C] uppercase font-medium mb-3">Issue Type</div>
                <div className="p-4 rounded-xl border bg-[#1A1A1D] border-[#E6B95F] text-[#E6B95F] font-medium flex items-center gap-2">
                  <AlertCircle className="w-5 h-5" />
                  {selectedIssue.issueType}
                </div>
              </div>

              <div className="mb-6">
                <div className="text-xs text-[#8C8C8C] uppercase font-medium mb-3">Details</div>
                <div className="w-full bg-[#1A1A1D] border border-white/10 rounded-xl p-4 text-sm text-[#EBEBEB] min-h-[100px]">
                  {selectedIssue.details}
                </div>
              </div>

              <div className="flex gap-3 mt-8">
                 <button 
                   onClick={() => setSelectedIssue(null)}
                   className="flex-1 h-12 bg-white/5 hover:bg-white/10 text-white font-medium rounded-full transition-colors border border-white/10">
                   Contact Parties
                 </button>
                 <button 
                   onClick={() => setSelectedIssue(null)}
                   className="flex-1 h-12 bg-gold-gradient text-black font-semibold rounded-full transition-colors hover:opacity-90">
                   Resolve Issue
                 </button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
