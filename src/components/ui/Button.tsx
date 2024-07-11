import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import { ButtonHTMLAttributes, ReactNode, useState } from "react";

type VariantType = "default" | "dark";

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  loading?: boolean;
  outline?: boolean;
  variant?: VariantType;
  icon?: ReactNode;
  iconRight?: ReactNode;
};

export default function Button({
  className,
  children,
  outline = false,
  variant = "default",
  loading,
  icon,
  iconRight,
  ...restProps
}: ButtonProps) {
  const localVariant = variant ?? "default";
  return (
    <button
      className={cn(
        "px-4 py-2 text-center font-semibold rounded-md inline-flex items-center justify-center gap-2",
        {
          "border border-green-500 bg-green-500 text-white":
            localVariant === "default" && !outline,
          "border border-black bg-black text-white":
            localVariant === "dark" && !outline,
          "border border-green-500": localVariant === "default" && outline,
          "border border-gray-500": localVariant === "dark" && outline,
        },
        className,
      )}
      {...restProps}
    >
      {loading ? <Loader2 size={16} className="animate-spin" /> : icon ?? <></>}
      {children}
      {iconRight}
    </button>
  );
}
