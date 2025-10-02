import React, { useState, useRef, useEffect } from 'react';

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  style?: React.CSSProperties;
  placeholder?: string;
  onLoad?: () => void;
  onError?: () => void;
  priority?: boolean;
  quality?: number;
}

const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  className = '',
  style,
  placeholder,
  onLoad,
  onError,
  priority = false,
  quality = 75
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(priority);
  const [hasError, setHasError] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (priority) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: '50px',
        threshold: 0.1
      }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, [priority]);

  const handleLoad = () => {
    setIsLoaded(true);
    onLoad?.();
  };

  const handleError = () => {
    setHasError(true);
    onError?.();
  };

  // Generate optimized src with quality parameter if it's an S3 URL
  const getOptimizedSrc = (originalSrc: string) => {
    if (originalSrc.includes('s3.us-east-2.amazonaws.com')) {
      // For S3 URLs, we can add query parameters for optimization
      return `${originalSrc}?w=800&q=${quality}&f=webp`;
    }
    return originalSrc;
  };

  const defaultPlaceholder = (
    <div 
      className="bg-gray-200 animate-pulse flex items-center justify-center"
      style={style}
    >
      <div className="text-gray-400 text-sm">Loading...</div>
    </div>
  );

  return (
    <div ref={imgRef} className={className} style={style}>
      {!isInView ? (
        placeholder || defaultPlaceholder
      ) : hasError ? (
        <div 
          className="bg-gray-100 flex items-center justify-center text-gray-500"
          style={style}
        >
          <div className="text-center">
            <div className="text-sm">Failed to load image</div>
          </div>
        </div>
      ) : (
        <img
          src={getOptimizedSrc(src)}
          alt={alt}
          className={`transition-opacity duration-300 ${isLoaded ? 'opacity-100' : 'opacity-0'} ${className}`}
          style={style}
          onLoad={handleLoad}
          onError={handleError}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
        />
      )}
    </div>
  );
};

export default OptimizedImage;
