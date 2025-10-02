import React from 'react';
import { ChevronDown } from 'lucide-react';

interface ModernScrollIndicatorProps {
  className?: string;
  text?: string;
}

const ModernScrollIndicator: React.FC<ModernScrollIndicatorProps> = ({
  className = '',
  text = 'Desliza para descubrir más'
}) => {

  return (
    <div 
      className={`fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50 ${className}`}
      style={{
        animation: 'scrollIndicatorEnter 1s ease-out'
      }}
    >
      <div className="flex flex-col items-center space-y-3">
        {/* Text with enhanced visibility */}
        <div className="text-sm font-medium text-white text-center px-4 py-2 rounded-full bg-black/30 backdrop-blur-md border border-white/30 shadow-lg">
          {text}
        </div>
        
        {/* Enhanced animated scroll indicator */}
        <div className="flex flex-col items-center space-y-1">
          <div className="w-6 h-10 border-2 border-white/80 rounded-full flex justify-center relative">
            <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse"></div>
            <div className="absolute inset-0 border-2 border-white/40 rounded-full animate-ping"></div>
          </div>
          <ChevronDown className="h-5 w-5 text-white animate-bounce" />
        </div>
      </div>
      
      <style dangerouslySetInnerHTML={{
        __html: `
          .scroll-indicator-enter {
            animation: scrollIndicatorEnter 1s ease-out;
          }
          
          @keyframes scrollIndicatorEnter {
            from { 
              opacity: 0; 
              transform: translateX(-50%) translateY(30px) scale(0.8); 
            }
            to { 
              opacity: 1; 
              transform: translateX(-50%) translateY(0) scale(1); 
            }
          }
        `
      }} />
    </div>
  );
};

export default ModernScrollIndicator;
