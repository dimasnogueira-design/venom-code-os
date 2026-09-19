import { X } from "lucide-react";
import type { ButtonHTMLAttributes } from "react";
import { IconButton } from "./icon-button";

type VenomCloseProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, "aria-label" | "children"> & { label?: string };

export function VenomClose({ label = "Fechar", className = "", ...props }: VenomCloseProps) {
  return <IconButton {...props} label={label} className={["vc-close",className].filter(Boolean).join(" ")}><X size={22} aria-hidden="true" /></IconButton>;
}
