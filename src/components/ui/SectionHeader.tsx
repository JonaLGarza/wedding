import { forwardRef } from 'react';
import { cn } from '../../lib/utils';
import { Badge } from './Badge';

interface SectionHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  subtitle?: string;
  title: string;
  description?: string;
  children?: React.ReactNode;
}

export const SectionHeader = forwardRef<HTMLDivElement, SectionHeaderProps>(
  ({ className, subtitle, title, description, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'text-center space-y-6',
          'py-16 md:py-24',
          className
        )}
        {...props}
      >
        {subtitle && (
          <Badge variant="accent" className="mx-auto">
            {subtitle}
          </Badge>
        )}
        
        <h2 className="text-4xl md:text-5xl font-serif font-medium text-[var(--foreground)] leading-tight">
          {title}
        </h2>
        
        {description && (
          <p className="max-w-2xl mx-auto text-lg text-[var(--muted-foreground)] leading-relaxed font-sans">
            {description}
          </p>
        )}
        
        {children}
      </div>
    );
  }
);

SectionHeader.displayName = 'SectionHeader';

export default SectionHeader;
