"use client";
import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import {
  KeyRound,
  LogOut,
  Eye,
  EyeOff,
  Check,
  AlertCircle,
  X,
  Loader2,
} from "lucide-react";
import { adminApi, clearAuthToken } from "@/lib/api";

function getInitials(name?: string): string {
  if (!name) return "AD";
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "AD";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

export default function TopBarProfile() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [profile, setProfile] = useState<{
    name?: string;
    email?: string;
    role?: string;
  } | null>(null);

  // Change Password Modal State
  const [passwordModalOpen, setPasswordModalOpen] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [pwdLoading, setPwdLoading] = useState(false);
  const [pwdError, setPwdError] = useState("");
  const [pwdSuccess, setPwdSuccess] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

  // Fetch admin profile
  useEffect(() => {
    try {
      const stored = localStorage.getItem("admin_user");
      if (stored) {
        setProfile(JSON.parse(stored));
      }
    } catch {}

    adminApi.getProfile().then((res) => {
      if (res.success && res.data) {
        setProfile(res.data);
        try {
          localStorage.setItem("admin_user", JSON.stringify(res.data));
        } catch {}
      }
    });
  }, []);

  // Click outside to close dropdown
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const initials = getInitials(profile?.name || "Admin");
  const displayName = profile?.name || "Operations Admin";
  const displayEmail = profile?.email || "admin@closete.com";
  const displayRole = profile?.role || "ADMIN";

  const handleLogout = () => {
    clearAuthToken();
    try {
      localStorage.removeItem("admin_user");
    } catch {}
    setIsOpen(false);
    router.push("/login");
  };

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setPwdError("");
    setPwdSuccess(false);

    if (!currentPassword) {
      setPwdError("Please enter your current password");
      return;
    }
    if (newPassword.length < 6) {
      setPwdError("New password must be at least 6 characters");
      return;
    }
    if (newPassword !== confirmPassword) {
      setPwdError("New passwords do not match");
      return;
    }

    setPwdLoading(true);
    try {
      const res = await adminApi.changePassword(
        currentPassword,
        newPassword,
        confirmPassword
      );

      if (res.success) {
        setPwdSuccess(true);
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
        setTimeout(() => {
          setPasswordModalOpen(false);
          setPwdSuccess(false);
        }, 1000);
      } else {
        setPwdError(res.message || "Failed to update password");
      }
    } catch (err: any) {
      setPwdError(err?.message || "An unexpected error occurred");
    } finally {
      setPwdLoading(false);
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Avatar Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="h-10 w-10 rounded-full bg-[#FFAF2C]/10 border border-[#FFAF2C]/40 flex items-center justify-center text-[#FFAF2C] font-semibold text-xs hover:border-[#FFAF2C] hover:bg-[#FFAF2C]/15 transition-all focus:outline-none"
        aria-label="Admin Profile"
        title="Admin Profile"
      >
        {initials}
      </button>

      {/* Popover Dropdown */}
      {isOpen && (
        <div className="absolute right-0 mt-3 w-68 rounded-xl bg-[#141416] border border-white/10 shadow-2xl z-50 overflow-hidden flex flex-col">
          {/* Header Profile Info */}
          <div className="p-4 border-b border-white/5 bg-[#18181A] flex items-center gap-3">
            <div className="h-9 w-9 rounded-full bg-[#FFAF2C]/10 border border-[#FFAF2C]/40 flex items-center justify-center text-[#FFAF2C] font-semibold text-xs shrink-0">
              {initials}
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-xs font-semibold text-white truncate">
                {displayName}
              </div>
              <div className="text-[11px] text-[#8C8C8C] truncate mb-1">
                {displayEmail}
              </div>
              <span className="inline-block px-1.5 py-0.5 rounded text-[10px] font-medium uppercase bg-white/5 text-[#FFAF2C]">
                {displayRole}
              </span>
            </div>
          </div>

          {/* Menu Items */}
          <div className="p-2 space-y-1 text-xs">
            {/* Change Password */}
            <button
              onClick={() => {
                setIsOpen(false);
                setPasswordModalOpen(true);
              }}
              className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-[#CCCCCC] hover:text-white hover:bg-white/5 transition-colors text-left"
            >
              <KeyRound className="w-3.5 h-3.5 text-[#FFAF2C]" />
              <span className="font-medium">Change Password</span>
            </button>
          </div>

          {/* Sign Out Button */}
          <div className="p-2 border-t border-white/5 bg-[#18181A]/50">
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-[#E57373] hover:text-red-400 hover:bg-red-500/10 transition-colors font-medium text-xs text-left"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      )}

      {/* Change Password Modal */}
      {passwordModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-150">
          <div
            className="w-full max-w-sm rounded-xl bg-[#141416] border border-white/10 shadow-2xl overflow-hidden flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="px-5 py-4 border-b border-white/5 flex items-center justify-between bg-[#18181A]">
              <div>
                <h3 className="text-sm font-semibold text-white tracking-wide">
                  Change Password
                </h3>
                <p className="text-xs text-[#8C8C8C]">
                  Update your admin account password
                </p>
              </div>
              <button
                onClick={() => setPasswordModalOpen(false)}
                className="w-7 h-7 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center text-[#A1A1AA] hover:text-white transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handlePasswordSubmit} className="p-5 space-y-3.5">
              {pwdError && (
                <div className="p-2.5 rounded-lg bg-red-500/10 border border-red-500/20 text-[#E57373] text-xs flex items-center gap-2">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                  <span>{pwdError}</span>
                </div>
              )}

              {pwdSuccess && (
                <div className="p-2.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 shrink-0" />
                  <span>Password updated successfully!</span>
                </div>
              )}

              {/* Current Password */}
              <div>
                <label className="text-[11px] font-medium text-[#CCCCCC] mb-1 block">
                  Current Password
                </label>
                <div className="relative">
                  <input
                    type={showCurrent ? "text" : "password"}
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    required
                    placeholder="Enter current password"
                    className="w-full bg-[#18181A] border border-white/10 rounded-lg px-3 py-2 text-xs text-white placeholder-[#555555] focus:outline-none focus:border-[#FFAF2C]/60 pr-9"
                  />
                  <button
                    type="button"
                    onClick={() => setShowCurrent(!showCurrent)}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#777777] hover:text-white"
                  >
                    {showCurrent ? (
                      <EyeOff className="w-3.5 h-3.5" />
                    ) : (
                      <Eye className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>
              </div>

              {/* New Password */}
              <div>
                <label className="text-[11px] font-medium text-[#CCCCCC] mb-1 block">
                  New Password
                </label>
                <div className="relative">
                  <input
                    type={showNew ? "text" : "password"}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                    placeholder="At least 6 characters"
                    className="w-full bg-[#18181A] border border-white/10 rounded-lg px-3 py-2 text-xs text-white placeholder-[#555555] focus:outline-none focus:border-[#FFAF2C]/60 pr-9"
                  />
                  <button
                    type="button"
                    onClick={() => setShowNew(!showNew)}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#777777] hover:text-white"
                  >
                    {showNew ? (
                      <EyeOff className="w-3.5 h-3.5" />
                    ) : (
                      <Eye className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>
              </div>

              {/* Confirm Password */}
              <div>
                <label className="text-[11px] font-medium text-[#CCCCCC] mb-1 block">
                  Confirm Password
                </label>
                <div className="relative">
                  <input
                    type={showConfirm ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    placeholder="Re-enter new password"
                    className="w-full bg-[#18181A] border border-white/10 rounded-lg px-3 py-2 text-xs text-white placeholder-[#555555] focus:outline-none focus:border-[#FFAF2C]/60 pr-9"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirm(!showConfirm)}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#777777] hover:text-white"
                  >
                    {showConfirm ? (
                      <EyeOff className="w-3.5 h-3.5" />
                    ) : (
                      <Eye className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>
              </div>

              {/* Actions */}
              <div className="pt-2 flex items-center justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setPasswordModalOpen(false)}
                  className="px-3 py-1.5 rounded-lg text-xs font-medium text-[#8C8C8C] hover:text-white transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={pwdLoading || pwdSuccess}
                  className="px-4 py-1.5 rounded-lg text-xs font-medium bg-[#FFAF2C] text-black hover:bg-[#FFC86B] transition-colors flex items-center gap-1.5 disabled:opacity-50"
                >
                  {pwdLoading ? (
                    <>
                      <Loader2 className="w-3 h-3 animate-spin" />
                      <span>Updating...</span>
                    </>
                  ) : (
                    <span>Update</span>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
