import { useEffect } from 'react';

export const useServiceWorker = () => {
  useEffect(() => {
    // Only register service worker in production
    if (process.env.NODE_ENV === 'production' && 'serviceWorker' in navigator) {
      const registerSW = async () => {
        try {
          const registration = await navigator.serviceWorker.register('/sw.js', {
            scope: '/wedding/'
          });
          
          console.log('Service Worker registered:', registration);
          
          // Handle updates
          registration.addEventListener('updatefound', () => {
            const newWorker = registration.installing;
            if (newWorker) {
              newWorker.addEventListener('statechange', () => {
                if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                  // New content is available, prompt user to refresh
                  if (window.confirm('New content available! Refresh to update?')) {
                    window.location.reload();
                  }
                }
              });
            }
          });
          
        } catch (error) {
          console.log('Service Worker registration failed:', error);
        }
      };
      
      registerSW();
    }
  }, []);
};

export const useOfflineDetection = () => {
  useEffect(() => {
    const handleOnline = () => {
      console.log('App is online');
      // Sync any offline data
    };
    
    const handleOffline = () => {
      console.log('App is offline');
      // Show offline indicator
    };
    
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);
};
