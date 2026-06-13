"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CustomInput } from "@/components/ui/CustomInput";
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
        <div>
          <label className="text-sm font-medium text-[#EBEBEB] mb-2.5 block">User name</label>
          <CustomInput
            type="text"
            required
            placeholder="Enter username"
            leftIcon={<User className="h-5 w-5" />}
          />
        </div>

        <div className="space-y-3">
          <div className="text-left">
            <label className="text-sm font-medium text-[#EBEBEB] mb-2.5 block">Password</label>
            <CustomInput
              type={showPassword ? "text" : "password"}
              required
              placeholder="Enter password"
              leftIcon={<Key className="h-5 w-5" />}
              rightIcon={
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="hover:text-white transition-colors flex items-center justify-center"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              }
            />
          </div>

          <div className="flex justify-end">
            <Link href="/reset" className="text-sm font-medium text-[#FFAF2C] hover:text-[#FFD375] transition-colors">
              Forget password ?
            </Link>
          </div>
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
