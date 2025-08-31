import { forwardRef } from 'react';
import { cn } from '../../lib/utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'accent' | 'default' | 'outline' | 'link';
  size?: 'sm' | 'md' | 'lg' | 'default';
  children: React.ReactNode;
}

const variantStyles = {
  primary: [
    'bg-[var(--brand-terracotta)] text-[var(--brand-ivory)]',
    'hover:bg-[#8F4E17] active:bg-[#6D3A10]',
    'focus-visible:ring-2 focus-visible:ring-[color:var(--ring)]'
  ].join(' '),
  default: [
    'bg-[var(--brand-terracotta)] text-[var(--brand-ivory)]',
    'hover:bg-[#8F4E17] active:bg-[#6D3A10]',
    'focus-visible:ring-2 focus-visible:ring-[color:var(--ring)]'
  ].join(' '),
  secondary: [
    'border border-[var(--brand-olive)] text-[var(--brand-olive)] bg-transparent',
    'hover:bg-[var(--brand-olive)]/10 active:bg-[var(--brand-olive)]/20',
    'focus-visible:ring-2 focus-visible:ring-[color:var(--ring)]'
  ].join(' '),
  outline: [
    'border border-[var(--brand-olive)] text-[var(--brand-olive)] bg-transparent',
    'hover:bg-[var(--brand-olive)]/10 active:bg-[var(--brand-olive)]/20',
    'focus-visible:ring-2 focus-visible:ring-[color:var(--ring)]'
  ].join(' '),
  ghost: [
    'text-[var(--brand-olive)] bg-transparent',
    'hover:bg-[var(--brand-olive)]/10 active:bg-[var(--brand-olive)]/20',
    'focus-visible:ring-2 focus-visible:ring-[color:var(--ring)]'
  ].join(' '),
  accent: [
    'bg-[var(--brand-gold)] text-[var(--brand-brown)]',
    'hover:bg-[#B8945A] active:bg-[#A8854A]',
    'focus-visible:ring-2 focus-visible:ring-[color:var(--ring)]'
  ].join(' '),
  link: [
    'text-[var(--brand-olive)] bg-transparent underline',
    'hover:text-[var(--brand-olive)]/80',
    'focus-visible:ring-2 focus-visible:ring-[color:var(--ring)]'
  ].join(' ')
};

const sizeStyles = {
  sm: 'px-4 h-9 text-sm',
  md: 'px-5 h-11 text-base',
  lg: 'px-6 h-12 text-lg',
  default: 'px-5 h-11 text-base'
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', disabled, children, ...props }, ref) => {
    return (
      <button
        className={cn(
          'inline-flex items-center justify-center rounded-2xl font-medium',
          'transition-colors duration-200',
          'focus-visible:outline-none',
          'disabled:opacity-50 disabled:pointer-events-none',
          'min-h-[44px]',
          variantStyles[variant],
          sizeStyles[size],
          className
        )}
        ref={ref}
        disabled={disabled}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button;
