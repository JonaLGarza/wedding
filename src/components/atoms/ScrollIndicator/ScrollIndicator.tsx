import React, { useState, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';

interface ScrollIndicatorProps {
  className?: string;
  text?: string;
  showAfter?: number; // Show after X seconds
  hideAfterScroll?: number; // Hide after scrolling X pixels
}

const ScrollIndicator: React.FC<ScrollIndicatorProps> = ({
  className = '',
  text = 'Desliza para ver más',
  showAfter = 2000, // Show after 2 seconds
  hideAfterScroll = 100 // Hide after scrolling 100px
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [shouldHide, setShouldHide] = useState(false);

  useEffect(() => {
    // Show indicator after delay
    const showTimer = setTimeout(() => {
      setIsVisible(true);
    }, showAfter);

    // Hide indicator after scrolling
    const handleScroll = () => {
      const scrollY = window.scrollY;
      if (scrollY > hideAfterScroll) {
        setShouldHide(true);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      clearTimeout(showTimer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [showAfter, hideAfterScroll]);

  if (!isVisible || shouldHide) return null;

  return (
    <div 
      className={`fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50 transition-all duration-500 ease-in-out ${className}`}
      style={{
        animation: 'scrollIndicatorFadeIn 0.8s ease-out, scrollIndicatorBounce 2s infinite 1s'
      }}
    >
      <div className="flex flex-col items-center space-y-3 text-white">
        <div className="text-sm font-medium opacity-90 text-center px-4">
          {text}
        </div>
        <div className="flex flex-col items-center space-y-1">
          <ChevronDown className="h-6 w-6 animate-bounce" />
          <ChevronDown className="h-4 w-4 animate-bounce" style={{ animationDelay: '0.1s' }} />
          <ChevronDown className="h-3 w-3 animate-bounce" style={{ animationDelay: '0.2s' }} />
        </div>
      </div>
      
      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes scrollIndicatorFadeIn {
            from { 
              opacity: 0; 
              transform: translateX(-50%) translateY(20px); 
            }
            to { 
              opacity: 1; 
              transform: translateX(-50%) translateY(0); 
            }
          }
          
          @keyframes scrollIndicatorBounce {
            0%, 20%, 50%, 80%, 100% {
              transform: translateX(-50%) translateY(0);
            }
            40% {
              transform: translateX(-50%) translateY(-8px);
            }
            60% {
              transform: translateX(-50%) translateY(-4px);
            }
          }
        `
      }} />
    </div>
  );
};

export default ScrollIndicator;
