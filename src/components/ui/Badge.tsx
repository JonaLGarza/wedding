import { forwardRef } from 'react';
import { cn } from '../../lib/utils';

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'primary' | 'secondary' | 'accent' | 'subtle' | 'olive' | 'terracotta' | 'gold';
  children: React.ReactNode;
}

const variantStyles = {
  primary: 'bg-[var(--primary)] text-[var(--primary-foreground)]',
  secondary: 'bg-[var(--secondary)] text-[var(--secondary-foreground)]',
  accent: 'bg-[var(--accent)] text-[var(--accent-foreground)]',
  subtle: 'bg-[var(--muted)] text-[var(--muted-foreground)]',
  olive: 'bg-[var(--brand-olive)] text-[var(--brand-ivory)]',
  terracotta: 'bg-[var(--brand-terracotta)] text-[var(--brand-ivory)]',
  gold: 'bg-[var(--brand-gold)] text-[var(--brand-brown)]'
};

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant = 'primary', children, ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={cn(
          'inline-flex items-center rounded-xl px-2.5 py-1 text-xs font-medium',
          'uppercase tracking-wide',
          variantStyles[variant],
          className
        )}
        {...props}
      >
        {children}
      </span>
    );
  }
);

Badge.displayName = 'Badge';

export default Badge;
