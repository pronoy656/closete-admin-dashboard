"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { CustomInput } from "@/components/ui/CustomInput";
import { ArrowRight, Mail } from "lucide-react";

export default function ResetEmailForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      router.push("/verify");
    }, 600);
  }

  return (
    <div className="w-full">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-serif mb-3 text-white tracking-wide">Forgot Password</h1>
        <p className="text-[#8C8C8C]">Enter your email to receive a reset code</p>
      </div>

      {/* Divider */}
      <div className="w-full h-[1px] bg-white/5 mb-8" />

      <form onSubmit={onSubmit} className="space-y-6">
        <div className="text-left">
          <label className="text-sm font-medium text-[#EBEBEB] mb-4 block">Email</label>
          <CustomInput
            type="email"
            required
            placeholder="you@example.com"
            leftIcon={<Mail className="h-5 w-5" />}
          />
        </div>
        
        <div className="pt-8">
          <button
            type="submit"
            disabled={loading}
            className="w-full h-12 text-base font-semibold text-black bg-gold-gradient hover:opacity-90 rounded-full border-0 transition-opacity"
          >
            {loading ? "Sending..." : (
              <div className="flex items-center justify-center gap-2">
                Send Reset Link <ArrowRight className="h-5 w-5" />
              </div>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}

