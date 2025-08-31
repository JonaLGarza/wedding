import { ButtonHTMLAttributes, forwardRef } from "react";
import { cn } from "../../../lib/utils";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link" | "primary";
  size?: "default" | "sm" | "lg" | "icon";
  asChild?: boolean;
}

const buttonVariants = {
  variant: {
    default: "bg-[var(--primary)] text-[var(--primary-foreground)] hover:bg-[var(--primary)]/90 hover:shadow-md hover:shadow-[var(--primary)]/30 transition-all duration-200",
    primary: "bg-[var(--primary)] text-[var(--primary-foreground)] hover:bg-[var(--primary)]/90 hover:shadow-md hover:shadow-[var(--primary)]/30 transition-all duration-200",
    destructive: "bg-[var(--destructive)] text-[var(--primary-foreground)] hover:bg-[var(--destructive)]/90 hover:shadow-md hover:shadow-[var(--destructive)]/30 transition-all duration-200",
    outline: "border border-[var(--secondary)] text-[var(--secondary-foreground)] bg-transparent hover:bg-[var(--secondary)]/10 hover:shadow-md hover:shadow-[var(--secondary)]/30 transition-all duration-200",
    secondary: "bg-[var(--secondary)] text-[var(--secondary-foreground)] hover:bg-[var(--secondary)]/90 hover:shadow-md hover:shadow-[var(--secondary)]/30 transition-all duration-200",
    ghost: "text-[var(--foreground)] hover:bg-[var(--muted)]/20 hover:shadow-md hover:shadow-[var(--muted)]/30 transition-all duration-200",
    link: "text-[var(--accent)] underline-offset-4 hover:underline hover:text-[var(--accent)]/80 transition-colors duration-200",
  },
  size: {
    default: "h-11 px-4 py-2 min-h-[44px]",
    sm: "h-9 px-3 py-2 min-h-[44px]",
    lg: "h-12 px-8 py-3 min-h-[44px]",
    icon: "h-11 w-11 min-h-[44px] min-w-[44px]",
  },
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", asChild = false, ...props }, ref) => {
    const Comp = asChild ? "span" : "button";
    
    return (
      <Comp
        className={cn(
          "inline-flex items-center justify-center rounded-xl text-sm font-medium ring-offset-background transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)] disabled:pointer-events-none disabled:opacity-50",
          buttonVariants.variant[variant],
          buttonVariants.size[size],
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";

export default Button; 