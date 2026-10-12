"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { CustomInput } from "@/components/ui/CustomInput";
import Link from "next/link";
import { Mail, Key, Lock, ArrowRight, Eye, EyeOff, AlertCircle } from "lucide-react";
import { adminApi, setAuthToken } from "@/lib/api";

export default function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("admin@example.com");
  const [password, setPassword] = useState("AdminPassword123!@");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErrorMessage("");
    setLoading(true);

    try {
      const res = await adminApi.login(email.trim(), password);
      if (res.success && res.data?.accessToken) {
        setAuthToken(res.data.accessToken);
        if (res.data.user) {
          localStorage.setItem("admin_user", JSON.stringify(res.data.user));
        }
        router.push("/all-orders");
      } else {
        setErrorMessage(res.message || "Invalid administrator credentials");
      }
    } catch (err: any) {
      setErrorMessage(err?.message || "Failed to sign in. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="w-full">
      <div className="text-center mb-6 sm:mb-10">
        <h1 className="text-3xl sm:text-4xl font-serif mb-2 sm:mb-3 text-white tracking-wide">Welcome back</h1>
        <p className="text-sm sm:text-base text-[#8C8C8C]">Sign in to manage orders and operations</p>
      </div>

      {/* Divider */}
      <div className="w-full h-[1px] bg-white/5 mb-8" />

      {errorMessage && (
        <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm flex items-center gap-2.5">
          <AlertCircle className="w-5 h-5 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      <form onSubmit={onSubmit} className="space-y-6">
        <div>
          <label className="text-sm font-medium text-[#EBEBEB] mb-2.5 block">Email Address</label>
          <CustomInput
            type="email"
            required
            value={email}
            onChange={(e: any) => setEmail(e.target.value)}
            placeholder="admin@example.com"
            leftIcon={<Mail className="h-5 w-5" />}
          />
        </div>

        <div className="space-y-3">
          <div className="text-left">
            <label className="text-sm font-medium text-[#EBEBEB] mb-2.5 block">Password</label>
            <CustomInput
              type={showPassword ? "text" : "password"}
              required
              value={password}
              onChange={(e: any) => setPassword(e.target.value)}
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

        <div className="pt-5 sm:pt-8 space-y-4">
          <div className="flex items-center justify-center gap-1.5 sm:gap-2 text-[#8C8C8C]">
            <Lock className="h-3.5 w-3.5 sm:h-4 sm:w-4 shrink-0" />
            <span className="text-xs sm:text-sm whitespace-nowrap">Secure access for authorized operations staff</span>
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
