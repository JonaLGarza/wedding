import React from 'react';

const CriticalCSS: React.FC = () => {
  return (
    <style dangerouslySetInnerHTML={{
      __html: `
        /* Critical CSS for above-the-fold content */
        * {
          box-sizing: border-box;
        }
        
        body {
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
          line-height: 1.6;
          color: #333;
        }
        
        /* Critical styles for WelcomeHeader */
        .welcome-header {
          position: relative;
          text-align: center;
          padding: 4rem 1rem;
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          justify-content: center;
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
        }
        
        .welcome-header::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.55);
          z-index: 1;
        }
        
        .welcome-content {
          position: relative;
          z-index: 10;
          color: white;
        }
        
        /* Critical styles for navigation */
        .nav-container {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 1000;
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(10px);
        }
        
        /* Critical loading states */
        .loading-spinner {
          display: inline-block;
          width: 2rem;
          height: 2rem;
          border: 4px solid #f3f3f3;
          border-top: 4px solid #8B4513;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }
        
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        /* Critical responsive styles */
        @media (max-width: 768px) {
          .welcome-header {
            padding: 2rem 1rem;
          }
        }
        
        /* Critical font loading - handled in HTML for better performance */
        
        /* Critical layout styles */
        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 1rem;
        }
        
        /* Critical button styles */
        .btn {
          display: inline-block;
          padding: 0.75rem 1.5rem;
          background: #8B4513;
          color: white;
          text-decoration: none;
          border-radius: 0.5rem;
          transition: background-color 0.3s ease;
        }
        
        .btn:hover {
          background: #A0522D;
        }
      `
    }} />
  );
};

export default CriticalCSS;
