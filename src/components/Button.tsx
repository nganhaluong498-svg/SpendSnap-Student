import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "../lib/utils";

type ButtonVariant = "primary" | "secondary" | "violet" | "ghost";
type ButtonSize = "sm" | "md" | "icon";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-momo-primary text-white shadow-pink hover:bg-momo-magenta active:bg-momo-magenta",
  secondary:
    "border border-momo-border bg-white text-momo-text hover:border-momo-primary/30 hover:bg-momo-soft",
  violet:
    "bg-momo-violet text-white shadow-[0_16px_34px_rgba(124,58,237,0.18)] hover:bg-violet-700 active:bg-violet-800",
  ghost: "text-momo-muted hover:bg-momo-soft hover:text-momo-primary",
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "h-9 px-3 text-sm",
  md: "h-10 px-5 text-sm",
  icon: "h-10 w-10 p-0",
};

export function Button({
  children,
  className,
  leftIcon,
  rightIcon,
  size = "md",
  type = "button",
  variant = "primary",
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-[14px] font-semibold transition duration-200 disabled:cursor-not-allowed disabled:opacity-60",
        variantClasses[variant],
        sizeClasses[size],
        className,
      )}
      type={type}
      {...props}
    >
      {leftIcon}
      {children}
      {rightIcon}
    </button>
  );
}
