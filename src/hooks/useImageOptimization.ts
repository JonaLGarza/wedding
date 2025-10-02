import { useState, useEffect } from 'react';

interface ImageOptimizationOptions {
  quality?: number;
  format?: 'webp' | 'jpeg' | 'png';
  width?: number;
  height?: number;
}

export const useImageOptimization = () => {
  const [supportsWebP, setSupportsWebP] = useState(false);
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    // Check WebP support
    const checkWebPSupport = () => {
      const canvas = document.createElement('canvas');
      canvas.width = 1;
      canvas.height = 1;
      return canvas.toDataURL('image/webp').indexOf('data:image/webp') === 0;
    };

    setSupportsWebP(checkWebPSupport());

    // Monitor online status
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const optimizeImageUrl = (
    originalUrl: string, 
    options: ImageOptimizationOptions = {}
  ): string => {
    const {
      quality = 75,
      format = supportsWebP ? 'webp' : 'jpeg',
      width,
      height
    } = options;

    // For S3 URLs, add optimization parameters
    if (originalUrl.includes('s3.us-east-2.amazonaws.com')) {
      const params = new URLSearchParams();
      
      if (quality !== 75) params.set('q', quality.toString());
      if (format !== 'jpeg') params.set('f', format);
      if (width) params.set('w', width.toString());
      if (height) params.set('h', height.toString());
      
      // Add cache busting for development
      if (process.env.NODE_ENV === 'development') {
        params.set('t', Date.now().toString());
      }
      
      const separator = originalUrl.includes('?') ? '&' : '?';
      return `${originalUrl}${separator}${params.toString()}`;
    }

    return originalUrl;
  };

  const getResponsiveImageSrc = (
    baseUrl: string,
    sizes: { width: number; quality?: number }[]
  ): string => {
    if (!supportsWebP) return baseUrl;

    const srcset = sizes
      .map(({ width, quality = 75 }) => {
        const optimizedUrl = optimizeImageUrl(baseUrl, { width, quality, format: 'webp' });
        return `${optimizedUrl} ${width}w`;
      })
      .join(', ');

    return srcset;
  };

  const preloadCriticalImages = (imageUrls: string[]) => {
    if (!isOnline) return;

    imageUrls.forEach(url => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'image';
      link.href = optimizeImageUrl(url, { quality: 85 });
      document.head.appendChild(link);
    });
  };

  return {
    supportsWebP,
    isOnline,
    optimizeImageUrl,
    getResponsiveImageSrc,
    preloadCriticalImages
  };
};
