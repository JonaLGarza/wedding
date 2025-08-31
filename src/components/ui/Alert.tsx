import { forwardRef } from 'react';
import { cn } from '../../lib/utils';

interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'info' | 'success' | 'error';
  children: React.ReactNode;
  icon?: React.ReactNode;
}

const variantStyles = {
  info: 'border-[var(--secondary)] bg-[var(--secondary)]/5 text-[var(--secondary-foreground)]',
  success: 'border-[var(--accent)] bg-[var(--accent)]/5 text-[var(--accent-foreground)]',
  error: 'border-[var(--destructive)] bg-[var(--destructive)]/10 text-[var(--destructive)]'
};

const variantIcons = {
  info: 'ℹ️',
  success: '✓',
  error: '⚠️'
};

export const Alert = forwardRef<HTMLDivElement, AlertProps>(
  ({ className, variant = 'info', children, icon, ...props }, ref) => {
    const defaultIcon = icon || variantIcons[variant];
    
    return (
      <div
        ref={ref}
        role="alert"
        aria-live="polite"
        className={cn(
          'rounded-xl border p-4',
          'flex items-start gap-3',
          variantStyles[variant],
          className
        )}
        {...props}
      >
        {defaultIcon && (
          <span className="flex-shrink-0 text-lg" aria-hidden="true">
            {defaultIcon}
          </span>
        )}
        <div className="flex-1">
          {children}
        </div>
      </div>
    );
  }
);

Alert.displayName = 'Alert';

export default Alert;
