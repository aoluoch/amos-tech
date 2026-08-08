import type { ReactNode } from "react";

export function FormLabel({
  children,
  required = false,
  htmlFor
}: {
  children: ReactNode;
  required?: boolean;
  htmlFor?: string;
}) {
  return (
    <label htmlFor={htmlFor} className="block">
      <span className="font-semibold">
        {children}
        {required ? <span className="ml-1 text-brand" aria-hidden="true">*</span> : null}
      </span>
    </label>
  );
}
