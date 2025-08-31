import { forwardRef } from 'react';
import { cn } from '../../lib/utils';

interface TextareaProps extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, 'size'> {
  error?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

const sizeStyles = {
  sm: 'p-3 text-sm min-h-[72px]',
  md: 'p-4 text-base min-h-[88px]',
  lg: 'p-5 text-lg min-h-[104px]'
};

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, error, size = 'md', ...props }, ref) => {
    return (
      <textarea
        className={cn(
          'rounded-xl border bg-[var(--card)] text-[var(--foreground)] placeholder:text-[var(--muted-foreground)]',
          'transition-all duration-200 resize-vertical',
          'focus:outline-none focus:ring-2 focus:ring-[var(--ring)] focus:border-transparent',
          'disabled:opacity-50 disabled:cursor-not-allowed',
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

Textarea.displayName = 'Textarea';

export default Textarea;
