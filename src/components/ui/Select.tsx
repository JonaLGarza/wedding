import { forwardRef } from 'react';
import { cn } from '../../lib/utils';

interface SelectProps extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'size'> {
  error?: boolean;
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

const sizeStyles = {
  sm: 'h-9 px-3 text-sm',
  md: 'h-11 px-4 text-base',
  lg: 'h-12 px-5 text-lg'
};

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, error, size = 'md', children, ...props }, ref) => {
    return (
      <select
        className={cn(
          'rounded-xl border bg-[var(--card)] text-[var(--foreground)]',
          'transition-all duration-200',
          'focus:outline-none focus:ring-2 focus:ring-[var(--ring)] focus:border-transparent',
          'disabled:opacity-50 disabled:cursor-not-allowed',
          'min-h-[44px]',
          'appearance-none bg-no-repeat bg-right pr-10',
          'bg-[url("data:image/svg+xml,%3csvg xmlns=\'http://www.w3.org/2000/svg\' fill=\'none\' viewBox=\'0 0 20 20\'%3e%3cpath stroke=\'%23A3B18A\' stroke-linecap=\'round\' stroke-linejoin=\'round\' stroke-width=\'1.5\' d=\'m6 8 4 4 4-4\'/%3e%3c/svg%3e")]',
          error 
            ? 'border-[var(--destructive)] focus:ring-[var(--destructive)]/50' 
            : 'border-[var(--border)]',
          sizeStyles[size],
          className
        )}
        ref={ref}
        aria-invalid={error}
        {...props}
      >
        {children}
      </select>
    );
  }
);

Select.displayName = 'Select';

export default Select;
