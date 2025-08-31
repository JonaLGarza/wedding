import { forwardRef } from 'react';
import { cn } from '../../lib/utils';

interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  error?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

const sizeStyles = {
  sm: 'h-9 px-3 text-sm',
  md: 'h-11 px-4 text-base',
  lg: 'h-12 px-5 text-lg'
};

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, error, size = 'md', ...props }, ref) => {
    return (
      <input
        className={cn(
          'rounded-xl border bg-[var(--card)] text-[var(--foreground)] placeholder:text-[var(--muted-foreground)]',
          'transition-all duration-200',
          'focus:outline-none focus:ring-2 focus:ring-[var(--ring)] focus:border-transparent',
          'disabled:opacity-50 disabled:cursor-not-allowed',
          'min-h-[44px]',
          error 
            ? 'border-[var(--destructive)] focus:ring-[var(--destructive)]/50' 
            : 'border-[var(--border)]',
          sizeStyles[size],
          className
        )}
        ref={ref}
        aria-invalid={error}
        {...props}
      />
    );
  }
);

Input.displayName = 'Input';

export default Input;
