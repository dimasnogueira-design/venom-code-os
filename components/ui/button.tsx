import type { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "ghost" | "action";
  loading?: boolean;
  children: ReactNode;
};

export function Button({ variant = "secondary", loading = false, className = "", disabled, children, ...props }: ButtonProps) {
  return <button {...props} className={["button","vc-button",variant,className].filter(Boolean).join(" ")} disabled={disabled || loading} aria-busy={loading || undefined}>{children}</button>;
}
