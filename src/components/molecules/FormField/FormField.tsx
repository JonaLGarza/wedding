import { ReactNode } from "react";
import { cn } from "../../../lib/utils";
import { Label } from "../../atoms/Label/Label";

interface FormFieldProps {
  label: string;
  htmlFor: string;
  error?: string;
  className?: string;
  children: ReactNode;
}

export const FormField = ({
  label,
  htmlFor,
  error,
  className,
  children,
}: FormFieldProps) => {
  return (
    <div className={cn("space-y-2", className)}>
      <Label htmlFor={htmlFor}>{label}</Label>
      {children}
      {error && <p className="text-sm text-[var(--brand-terracotta)]">{error}</p>}
    </div>
  );
};

export default FormField; 