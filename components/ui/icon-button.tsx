import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from "react";

type IconButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & { label: string; children: ReactNode };

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(function IconButton({ label, className = "", children, type = "button", ...props }, ref) {
  return <button {...props} ref={ref} type={type} className={["vc-icon-button",className].filter(Boolean).join(" ")} aria-label={label}>{children}</button>;
});
