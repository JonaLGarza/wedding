import { HTMLAttributes } from "react";
import { cn } from "../../../lib/utils";

interface LogoProps extends HTMLAttributes<HTMLDivElement> {
  text: string;
}

export const Logo = ({ text, className, ...props }: LogoProps) => {
  return (
    <div
      className={cn(
        "relative flex items-center justify-center text-3xl font-bold text-[var(--brand-olive)]",
        "before:content-[''] before:flex-1 before:border-b before:border-[var(--brand-olive)] before:mr-4",
        "after:content-[''] after:flex-1 after:border-b after:border-[var(--brand-olive)] after:ml-4",
        className
      )}
      {...props}
    >
      <span className="text-xxl font-medium font-viaoda tracking-[.25em]">{text}</span>
    </div>
  );
};

export default Logo;  