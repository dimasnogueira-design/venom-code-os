import type { ButtonHTMLAttributes, ReactNode } from "react";

type IconButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & { label: string; children: ReactNode };

export function IconButton({ label, className = "", children, type = "button", ...props }: IconButtonProps) {
  return <button {...props} type={type} className={["vc-icon-button",className].filter(Boolean).join(" ")} aria-label={label}>{children}</button>;
}
