"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { CustomInput } from "@/components/ui/CustomInput";
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
        <div className="text-left">
          <label className="text-sm font-medium text-[#EBEBEB] mb-3.5 block">New Password</label>
          <CustomInput
            type={showNewPassword ? "text" : "password"}
            required
            placeholder="••••••••"
            leftIcon={<Lock className="h-5 w-5" />}
            rightIcon={
              <button
                type="button"
                onClick={() => setShowNewPassword(!showNewPassword)}
                className="hover:text-white transition-colors flex items-center justify-center"
              >
                {showNewPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            }
          />
        </div>
        <div className="text-left">
          <label className="text-sm font-medium text-[#EBEBEB] mb-3.5 block">Confirm Password</label>
          <CustomInput
            type={showConfirmPassword ? "text" : "password"}
            required
            placeholder="••••••••"
            leftIcon={<Lock className="h-5 w-5" />}
            rightIcon={
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="hover:text-white transition-colors flex items-center justify-center"
              >
                {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            }
          />
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

