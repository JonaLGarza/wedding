import { useEffect } from 'react';

export const usePerformanceOptimization = () => {
  useEffect(() => {
    // Preload critical fonts
    const preloadFonts = () => {
      const fontUrls = [
        'https://fonts.googleapis.com/css2?family=Viaoda+Libre:wght@400&display=swap'
      ];
      
      fontUrls.forEach(url => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'style';
        link.href = url;
        document.head.appendChild(link);
      });
    };

    // Optimize scroll performance
    const optimizeScroll = () => {
      let ticking = false;
      
      const updateScroll = () => {
        // Throttle scroll events
        if (!ticking) {
          requestAnimationFrame(() => {
            ticking = false;
          });
          ticking = true;
        }
      };

      window.addEventListener('scroll', updateScroll, { passive: true });
      
      return () => {
        window.removeEventListener('scroll', updateScroll);
      };
    };

    // Preload critical images
    const preloadCriticalImages = () => {
      const criticalImages = [
        'https://jgwedding-photo-videos.s3.us-east-2.amazonaws.com/portada.jpg',
        'https://jgwedding-photo-videos.s3.us-east-2.amazonaws.com/dress+code.png'
      ];

      criticalImages.forEach(src => {
        const img = new Image();
        img.src = src;
      });
    };

    // Initialize optimizations
    preloadFonts();
    preloadCriticalImages();
    const cleanupScroll = optimizeScroll();

    return () => {
      cleanupScroll();
    };
  }, []);
};

export const useResourceHints = () => {
  useEffect(() => {
    // Add resource hints for better performance
    const addResourceHints = () => {
      const hints = [
        { rel: 'dns-prefetch', href: '//fonts.googleapis.com' },
        { rel: 'dns-prefetch', href: '//jgwedding-photo-videos.s3.us-east-2.amazonaws.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com' }
      ];

      hints.forEach(hint => {
        if (!document.querySelector(`link[rel="${hint.rel}"][href="${hint.href}"]`)) {
          const link = document.createElement('link');
          link.rel = hint.rel;
          link.href = hint.href;
          document.head.appendChild(link);
        }
      });
    };

    addResourceHints();
  }, []);
};
