"use client";
import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { LogOut, X } from "lucide-react";

// Exact SVG Icons extracted directly from the Figma export files in "Closete UI Design File(3)"

// 1. All Orders (Clip path group.svg)
function AllOrdersIcon({ className }: { className?: string }) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M18.2762 5.63416L15.4679 16.9092C15.2679 17.7508 14.5179 18.3342 13.6512 18.3342H2.70125C1.44292 18.3342 0.542928 17.1007 0.917926 15.8924L4.42625 4.62586C4.66792 3.84252 5.39293 3.30078 6.2096 3.30078H16.4596C17.2512 3.30078 17.9096 3.78411 18.1846 4.45078C18.3429 4.80911 18.3762 5.21749 18.2762 5.63416Z"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeMiterlimit="10"
      />
      <path
        d="M13.3359 18.3333H17.3193C18.3943 18.3333 19.2359 17.425 19.1609 16.35L18.3359 5"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8.06641 5.31675L8.93305 1.7168"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M13.6523 5.32563L14.4357 1.70898"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6.41797 10H13.0847"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M5.58594 13.333H12.2526"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// 2. Awaiting Collection (Frame.svg)
function AwaitingCollectionIcon({ className }: { className?: string }) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M12.6982 1.66699H7.29824C4.16491 1.66699 3.92324 4.48366 5.61491 6.01699L14.3815 13.9837C16.0732 15.517 15.8315 18.3337 12.6982 18.3337H7.29824C4.16491 18.3337 3.92324 15.517 5.61491 13.9837L14.3815 6.01699C16.0732 4.48366 15.8315 1.66699 12.6982 1.66699Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// 3. Collected (Frame-1.svg)
function CollectedIcon({ className }: { className?: string }) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M10.8406 2.43359L15.7573 4.61693C17.1739 5.24193 17.1739 6.27526 15.7573 6.90026L10.8406 9.08359C10.2823 9.33359 9.36561 9.33359 8.80727 9.08359L3.89063 6.90026C2.47396 6.27526 2.47396 5.24193 3.89063 4.61693L8.80727 2.43359C9.36561 2.18359 10.2823 2.18359 10.8406 2.43359Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M2.5 9.16699C2.5 9.86699 3.025 10.6753 3.66667 10.9587L9.325 13.4753C9.75833 13.667 10.25 13.667 10.675 13.4753L16.3333 10.9587C16.975 10.6753 17.5 9.86699 17.5 9.16699"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M2.5 13.333C2.5 14.108 2.95833 14.808 3.66667 15.1247L9.325 17.6413C9.75833 17.833 10.25 17.833 10.675 17.6413L16.3333 15.1247C17.0417 14.808 17.5 14.108 17.5 13.333"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// 4. Verified (Frame-2.svg)
function VerifiedIcon({ className }: { className?: string }) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M10.0013 18.3337C14.5846 18.3337 18.3346 14.5837 18.3346 10.0003C18.3346 5.41699 14.5846 1.66699 10.0013 1.66699C5.41797 1.66699 1.66797 5.41699 1.66797 10.0003C1.66797 14.5837 5.41797 18.3337 10.0013 18.3337Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6.46094 9.99992L8.81927 12.3583L13.5443 7.6416"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// 5. Dispatched (Fast delivery truck)
function DispatchedIcon({ className }: { className?: string }) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M14 18V6a2 2 0 0 0-2-2H3a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2" />
      <path d="M15 18H9" />
      <path d="M19 18h2a1 1 0 0 0 1-1v-4.5l-3-4.5h-5v10" />
      <circle cx="6.5" cy="18" r="2.5" />
      <circle cx="16.5" cy="18" r="2.5" />
    </svg>
  );
}

// 6. Delivered (Frame-3.svg)
function DeliveredIcon({ className }: { className?: string }) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M12.5013 1.66602V9.99935C12.5013 10.916 11.7513 11.666 10.8346 11.666H1.66797V6.34935C2.2763 7.07435 3.20966 7.52435 4.24299 7.49935C5.08466 7.48268 5.84297 7.15768 6.40964 6.61602C6.66797 6.39935 6.88465 6.12434 7.05132 5.82434C7.35132 5.31601 7.51797 4.71599 7.5013 4.09099C7.4763 3.11599 7.04298 2.25768 6.36798 1.66602H12.5013Z"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M18.3346 11.666V14.166C18.3346 15.5493 17.218 16.666 15.8346 16.666H15.0013C15.0013 15.7493 14.2513 14.9993 13.3346 14.9993C12.418 14.9993 11.668 15.7493 11.668 16.666H8.33464C8.33464 15.7493 7.58464 14.9993 6.66797 14.9993C5.7513 14.9993 5.0013 15.7493 5.0013 16.666H4.16797C2.78464 16.666 1.66797 15.5493 1.66797 14.166V11.666H10.8346C11.7513 11.666 12.5013 10.916 12.5013 9.99935V4.16602H14.0346C14.6346 4.16602 15.1846 4.49102 15.4846 5.00769L16.9096 7.49935H15.8346C15.3763 7.49935 15.0013 7.87435 15.0013 8.33268V10.8327C15.0013 11.291 15.3763 11.666 15.8346 11.666H18.3346Z"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6.66667 18.3333C7.58714 18.3333 8.33333 17.5872 8.33333 16.6667C8.33333 15.7462 7.58714 15 6.66667 15C5.74619 15 5 15.7462 5 16.6667C5 17.5872 5.74619 18.3333 6.66667 18.3333Z"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M13.3346 18.3333C14.2551 18.3333 15.0013 17.5872 15.0013 16.6667C15.0013 15.7462 14.2551 15 13.3346 15C12.4141 15 11.668 15.7462 11.668 16.6667C11.668 17.5872 12.4141 18.3333 13.3346 18.3333Z"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M18.3333 10V11.6667H15.8333C15.375 11.6667 15 11.2917 15 10.8333V8.33333C15 7.875 15.375 7.5 15.8333 7.5H16.9083L18.3333 10Z"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M7.49966 4.09195C7.51632 4.71695 7.34967 5.31696 7.04967 5.82529C6.88301 6.12529 6.66632 6.4003 6.40799 6.61697C5.84132 7.15863 5.08301 7.48363 4.24134 7.5003C3.20801 7.5253 2.27466 7.0753 1.66632 6.3503C1.54966 6.2253 1.44966 6.08364 1.35799 5.94198C1.03299 5.45031 0.849656 4.86699 0.832988 4.24199C0.807988 3.19199 1.27465 2.23363 2.02465 1.60863C2.59131 1.14196 3.30797 0.850301 4.0913 0.833635C4.9663 0.81697 5.76633 1.13363 6.36633 1.66697C7.04133 2.25863 7.47466 3.11695 7.49966 4.09195Z"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M2.86719 4.19198L3.70886 4.99194L5.4505 3.30859"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// 7. Pending Review (Frame-4.svg)
function PendingReviewIcon({ className }: { className?: string }) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M18.3346 10.0003C18.3346 14.6003 14.6013 18.3337 10.0013 18.3337C5.4013 18.3337 1.66797 14.6003 1.66797 10.0003C1.66797 5.40033 5.4013 1.66699 10.0013 1.66699C14.6013 1.66699 18.3346 5.40033 18.3346 10.0003Z"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M13.0914 12.6505L10.5081 11.1088C10.0581 10.8421 9.69141 10.2005 9.69141 9.67548V6.25879"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// 8. Issues (Frame-5.svg)
function IssuesIcon({ className }: { className?: string }) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M10 7.5V11.6667"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10.0009 17.8414H4.95084C2.05917 17.8414 0.850839 15.7747 2.25084 13.2497L4.85085 8.56641L7.30085 4.16641C8.78421 1.49141 11.2175 1.49141 12.7009 4.16641L15.1509 8.57474L17.7509 13.2581C19.1509 15.7831 17.9342 17.8497 15.0509 17.8497H10.0009V17.8414Z"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9.99609 14.167H10.0036"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const items = [
  { href: "/all-orders", label: "All Orders", Icon: AllOrdersIcon },
  { href: "/awaiting-collection", label: "Awaiting Collection", Icon: AwaitingCollectionIcon },
  { href: "/collected", label: "Collected", Icon: CollectedIcon },
  { href: "/verified", label: "Verified", Icon: VerifiedIcon },
  { href: "/dispatched", label: "Dispatched", Icon: DispatchedIcon },
  { href: "/delivered", label: "Delivered", Icon: DeliveredIcon },
  { href: "/pending-review", label: "Pending Review", Icon: PendingReviewIcon },
  { href: "/issues", label: "Issues", Icon: IssuesIcon },
];

interface SidebarProps {
  active?: string;
  mobileOpen?: boolean;
  onMobileClose?: () => void;
}

export default function Sidebar({ active, mobileOpen = false, onMobileClose }: SidebarProps) {
  const pathname = usePathname();
  const current = active ?? pathname ?? "";

  const navContent = (
    <>
      <nav className="flex-1 px-3 py-4 space-y-3">
        {items.map((item) => {
          const isActive = current === item.href || current.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onMobileClose}
              className={cn(
                "flex items-center gap-3.5 px-3 py-3.5 text-sm font-medium transition-colors rounded-xl",
                isActive
                  ? "bg-gold-gradient text-black shadow-lg shadow-[#D6A042]/20"
                  : "text-[#8C8C8C] hover:bg-white/5 hover:text-white"
              )}
            >
              <item.Icon className={cn("h-5 w-5 shrink-0", isActive ? "text-black" : "text-[#8C8C8C]")} />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="p-3 mt-auto">
        <Link
          href="/"
          className="flex items-center gap-3 px-3 py-3 text-sm font-medium transition-colors rounded-xl text-red-500/80 hover:bg-red-500/10 hover:text-red-500"
        >
          <LogOut className="h-5 w-5" />
          <span>Logout</span>
        </Link>
      </div>
    </>
  );

  return (
    <>
      {/* Desktop Sidebar — always visible on md+ */}
      <aside className="hidden md:flex h-screen w-56 bg-black text-[#A2A2A2] fixed left-0 top-0 flex-col z-30">
        <div className="p-6 pb-4">
          <span className="text-3xl font-serif text-gold-gradient tracking-wide">Closeté</span>
        </div>
        {navContent}
      </aside>

      {/* Mobile Overlay + Drawer */}
      {mobileOpen && (
        <div className="md:hidden fixed inset-0 z-40 flex">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={onMobileClose}
          />
          {/* Drawer */}
          <aside className="relative w-64 max-w-[80vw] bg-[#0D0D0F] border-r border-white/5 flex flex-col h-full z-50">
            {/* Close button */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-white/5">
              <span className="text-3xl font-serif text-gold-gradient tracking-wide">Closeté</span>
              <button
                onClick={onMobileClose}
                className="w-8 h-8 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 transition-colors"
              >
                <X className="w-4 h-4 text-white" />
              </button>
            </div>
            {navContent}
          </aside>
        </div>
      )}
    </>
  );
}
