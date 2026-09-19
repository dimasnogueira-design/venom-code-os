import { cloneElement, type ReactElement } from "react";

type FieldControlProps = { "aria-describedby"?: string; "aria-invalid"?: boolean };
type FieldProps = { label:string; htmlFor:string; children:ReactElement<FieldControlProps>; message?:string; invalid?:boolean; className?:string };

export function Field({ label, htmlFor, children, message, invalid = false, className = "" }: FieldProps) {
  const messageId = `${htmlFor}-message`;
  const describedBy = [children.props["aria-describedby"], message ? messageId : undefined].filter(Boolean).join(" ") || undefined;
  const control = cloneElement(children, {
    "aria-describedby": describedBy,
    "aria-invalid": invalid || undefined,
  });
  return <label className={["vc-field",className].filter(Boolean).join(" ")} htmlFor={htmlFor} data-invalid={invalid || undefined}><span>{label}</span>{control}{message && <span className="vc-field-message" id={messageId}>{message}</span>}</label>;
}
