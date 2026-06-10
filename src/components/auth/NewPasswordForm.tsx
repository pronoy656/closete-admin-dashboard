"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff, ArrowRight, Lock } from "lucide-react";

export default function NewPasswordForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      router.push("/overview");
    }, 600);
  }

  return (
    <div className="w-full">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-serif mb-3 text-white tracking-wide">Set New Password</h1>
        <p className="text-[#8C8C8C]">Create a new secure password for your account</p>
      </div>

      {/* Divider */}
      <div className="w-full h-[1px] bg-white/5 mb-8" />

      <form onSubmit={onSubmit} className="space-y-6">
        <div className="space-y-4 text-left">
          <label className="text-sm font-medium text-[#EBEBEB]">New Password</label>
          <div className="relative">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-[#8C8C8C]" />
            <Input
              type={showNewPassword ? "text" : "password"}
              required
              placeholder="••••••••"
              className="h-12 bg-[#27272A]/50 border-white/5 text-white placeholder:text-[#8C8C8C] pl-12 pr-12 focus-visible:ring-[#FFAF2C]/30 focus-visible:border-[#FFAF2C]/50 rounded-xl"
            />
            <button
              type="button"
              onClick={() => setShowNewPassword(!showNewPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-[#8C8C8C] hover:text-white transition-colors"
            >
              {showNewPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
            </button>
          </div>
        </div>
        <div className="space-y-4 text-left">
          <label className="text-sm font-medium text-[#EBEBEB]">Confirm Password</label>
          <div className="relative">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-[#8C8C8C]" />
            <Input
              type={showConfirmPassword ? "text" : "password"}
              required
              placeholder="••••••••"
              className="h-12 bg-[#27272A]/50 border-white/5 text-white placeholder:text-[#8C8C8C] pl-12 pr-12 focus-visible:ring-[#FFAF2C]/30 focus-visible:border-[#FFAF2C]/50 rounded-xl"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-[#8C8C8C] hover:text-white transition-colors"
            >
              {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
            </button>
          </div>
        </div>
        
        <div className="pt-8">
          <button
            type="submit"
            disabled={loading}
            className="w-full h-12 text-base font-semibold text-black bg-gold-gradient hover:opacity-90 rounded-full border-0 transition-opacity"
          >
            {loading ? "Saving..." : (
              <div className="flex items-center justify-center gap-2">
                Set New Password <ArrowRight className="h-5 w-5" />
              </div>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}

