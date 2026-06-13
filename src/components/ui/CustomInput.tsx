import * as React from "react";
import { cn } from "@/lib/utils";
import { Input } from "./input";

interface CustomInputProps extends React.ComponentProps<"input"> {
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  containerClassName?: string;
}

export function CustomInput({
  className,
  leftIcon,
  rightIcon,
  containerClassName,
  ...props
}: CustomInputProps) {
  return (
    <div className={cn("relative", containerClassName)}>
      {leftIcon && (
        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8C8C8C] flex items-center justify-center">
          {leftIcon}
        </div>
      )}
      <Input
        className={cn(
          leftIcon && "pl-12",
          rightIcon && "pr-12",
          "h-12 bg-[#27272A]/50 border-white/5 text-white placeholder:text-[#8C8C8C] rounded-xl focus-visible:ring-[#FFAF2C]/30 focus-visible:border-[#FFAF2C]/50",
          className
        )}
        {...props}
      />
      {rightIcon && (
        <div className="absolute right-4 top-1/2 -translate-y-1/2 text-[#8C8C8C] flex items-center justify-center">
          {rightIcon}
        </div>
      )}
    </div>
  );
}
