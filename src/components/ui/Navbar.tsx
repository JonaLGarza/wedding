import { forwardRef } from 'react';
import { cn } from '../../lib/utils';

interface NavbarProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
}

interface NavbarLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  children: React.ReactNode;
  active?: boolean;
}

export const Navbar = forwardRef<HTMLElement, NavbarProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <nav
        ref={ref}
        className={cn(
          'sticky top-0 z-50',
          'bg-[var(--brand-ivory)]/90 backdrop-blur',
          'border-b border-[color:var(--brand-beige)]',
          'transition-colors duration-200',
          className
        )}
        {...props}
      >
        <div className="container-constrained">
          <div className="flex h-16 items-center justify-between">
            {children}
          </div>
        </div>
      </nav>
    );
  }
);

export const NavbarLink = forwardRef<HTMLAnchorElement, NavbarLinkProps>(
  ({ className, active, children, ...props }, ref) => {
    return (
      <a
        ref={ref}
        className={cn(
          'flex items-center px-3 py-2 text-[var(--brand-olive)]',
          'transition-colors duration-200',
          'hover:text-[var(--brand-olive-700)]',
          'relative',
          active && 'font-semibold',
          className
        )}
        {...props}
      >
        {children}
        {active && (
          <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[var(--brand-gold)]" />
        )}
      </a>
    );
  }
);

Navbar.displayName = 'Navbar';
NavbarLink.displayName = 'NavbarLink';

export default Navbar;
