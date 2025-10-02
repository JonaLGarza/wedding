import React, { useState, useRef, useEffect, ReactNode } from 'react';

interface VirtualizedSectionProps {
  children: ReactNode;
  fallback?: ReactNode;
  rootMargin?: string;
  threshold?: number;
  className?: string;
  minHeight?: string;
}

const VirtualizedSection: React.FC<VirtualizedSectionProps> = ({
  children,
  fallback,
  rootMargin = '100px',
  threshold = 0.1,
  className = '',
  minHeight = '400px'
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasLoaded) {
          setIsVisible(true);
          setHasLoaded(true);
          // Disconnect observer after first load
          observer.disconnect();
        }
      },
      {
        rootMargin,
        threshold
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [rootMargin, threshold, hasLoaded]);

  const defaultFallback = (
    <div 
      className="flex items-center justify-center py-16"
      style={{ minHeight }}
    >
      <div className="text-center space-y-4">
        <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-[var(--brand-terracotta)] border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
        <p className="text-sm text-[var(--muted-fg)]">Loading...</p>
      </div>
    </div>
  );

  return (
    <div ref={sectionRef} className={className} style={{ minHeight }}>
      {isVisible ? children : (fallback || defaultFallback)}
    </div>
  );
};

export default VirtualizedSection;
