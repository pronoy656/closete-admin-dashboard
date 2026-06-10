"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { User, Key, Lock, ArrowRight, Eye, EyeOff } from "lucide-react";

export default function LoginForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      router.push("/all-orders");
    }, 600);
  }

  return (
    <div className="w-full">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-serif mb-3 text-white tracking-wide">Welcome back</h1>
        <p className="text-[#8C8C8C]">Sign in to manage orders and operations</p>
      </div>

      {/* Divider */}
      <div className="w-full h-[1px] bg-white/5 mb-8" />

      <form onSubmit={onSubmit} className="space-y-6">
        <div className="space-y-4">
          <label className="text-sm font-medium text-[#EBEBEB]">User name</label>
          <div className="relative">
            <User className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-[#8C8C8C]" />
            <Input
              type="text"
              required
              placeholder="Enter username"
              className="h-12 bg-[#27272A]/50 border-white/5 text-white placeholder:text-[#8C8C8C] pl-12 focus-visible:ring-[#FFAF2C]/30 focus-visible:border-[#FFAF2C]/50 rounded-xl"
            />
          </div>
        </div>
        
        <div className="space-y-4 text-left">
          <label className="text-sm font-medium text-[#EBEBEB]">Password</label>
          <div className="relative">
            <Key className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-[#8C8C8C]" />
            <Input
              type={showPassword ? "text" : "password"}
              required
              placeholder="Enter password"
              className="h-12 bg-[#27272A]/50 border-white/5 text-white placeholder:text-[#8C8C8C] pl-12 pr-12 focus-visible:ring-[#FFAF2C]/30 focus-visible:border-[#FFAF2C]/50 rounded-xl"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-[#8C8C8C] hover:text-white transition-colors"
            >
              {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
            </button>
          </div>
        </div>

        <div className="flex justify-end">
          <Link href="/reset" className="text-sm font-medium text-[#FFAF2C] hover:text-[#FFD375] transition-colors">
            Forget password ?
          </Link>
        </div>

        <div className="pt-8 space-y-4">
          <div className="flex items-center justify-center gap-2 text-sm text-[#8C8C8C]">
            <Lock className="h-4 w-4" />
            <span>Secure access for authorized operations staff</span>
          </div>

          <Button
            type="submit"
            className="w-full h-12 text-base font-semibold text-black bg-gold-gradient hover:opacity-90 rounded-full border-0 transition-opacity"
            disabled={loading}
          >
            {loading ? "Signing in..." : (
              <div className="flex items-center gap-2">
                Sign In <ArrowRight className="h-5 w-5" />
              </div>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}
