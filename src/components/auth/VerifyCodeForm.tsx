"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ArrowRight } from "lucide-react";

export default function VerifyCodeForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [code, setCode] = useState(["", "", "", "", ""]);

  const handleChange = (index: number, value: string) => {
    if (value.length > 1) return;
    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    // Auto-focus next input
    if (value && index < 4) {
      const nextInput = document.getElementById(`code-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      const prevInput = document.getElementById(`code-${index - 1}`);
      prevInput?.focus();
    }
  };

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      router.push("/new-password");
    }, 600);
  }

  return (
    <div className="w-full">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-serif mb-3 text-white tracking-wide">Verify Reset Password</h1>
        <p className="text-[#8C8C8C]">Enter the code sent to your email to reset your password.</p>
      </div>

      {/* Divider */}
      <div className="w-full h-[1px] bg-white/5 mb-8" />

      <form onSubmit={onSubmit} className="space-y-8">
        <div className="flex justify-between gap-2">
          {code.map((digit, index) => (
            <input
              key={index}
              id={`code-${index}`}
              type="text"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              className="w-14 h-16 bg-[#27272A]/50 border border-white/10 rounded-xl text-center text-2xl font-bold text-white focus:border-[#FFAF2C] focus:ring-1 focus:ring-[#FFAF2C] outline-none transition-all"
            />
          ))}
        </div>

        <div className="pt-8">
          <button
            type="submit"
            disabled={loading}
            className="w-full h-12 text-base font-semibold text-black bg-gold-gradient hover:opacity-90 rounded-full border-0 transition-opacity"
          >
            {loading ? "Verifying..." : (
              <div className="flex items-center justify-center gap-2">
                Verify Code <ArrowRight className="h-5 w-5" />
              </div>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}

