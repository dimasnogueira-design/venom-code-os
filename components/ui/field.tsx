import type { ReactNode } from "react";

type FieldProps = { label:string; htmlFor:string; children:ReactNode; message?:string; invalid?:boolean; className?:string };

export function Field({ label, htmlFor, children, message, invalid = false, className = "" }: FieldProps) {
  return <label className={["vc-field",className].filter(Boolean).join(" ")} htmlFor={htmlFor} data-invalid={invalid || undefined}><span>{label}</span>{children}{message && <span className="vc-field-message">{message}</span>}</label>;
}
