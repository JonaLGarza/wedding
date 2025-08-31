import { forwardRef, InputHTMLAttributes } from "react";
import { cn } from "../../../lib/utils";

const Radio = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>(
  ({ className, ...props }, ref) => {
    return (
      <input
        type="radio"
        className={cn(
          "h-4 w-4 cursor-pointer text-[var(--brand-terracotta)] focus:ring-[var(--brand-terracotta)]",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);

Radio.displayName = "Radio";

export default Radio; 