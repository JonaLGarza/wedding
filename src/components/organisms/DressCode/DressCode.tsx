import React from 'react';

interface DressCodeProps {
  className?: string;
}

const DressCode: React.FC<DressCodeProps> = ({ className = '' }) => {
  return (
    <section className={`py-8 ${className}`}>
      <div className="w-full">
        {/* Main Container with soft neutral background for better comfort */}
        <div className="relative bg-[var(--brand-ivory)] overflow-hidden">
          {/* Top accent strip */}
          <div className="h-1 bg-[var(--wedding-champagne-gold)]"></div>
          
          {/* Content - centered with max width for narrower appearance */}
          <div className="max-w-4xl mx-auto px-6 py-12">
            {/* Title */}
            <h2 className="text-4xl md:text-5xl text-center text-[var(--wedding-charcoal-gray)] mb-8 font-viaoda">
              DRESS CODE
            </h2>
            
            {/* Subtitle and Description */}
            <div className="text-left mb-8">
              <h3 className="text-2xl font-viaoda text-[var(--wedding-champagne-gold)] italic mb-3">
                FORMAL
              </h3>
              <p className="text-lg text-[var(--wedding-charcoal-gray)] font-serif">
                Nuestra boda será al exterior sobre una explanada.
              </p>
            </div>
            
            {/* Dress Code Image */}
            <div className="flex justify-center">
              <img 
                src="https://jgwedding-photo-videos.s3.us-east-2.amazonaws.com/dress+code.png"
                alt="Dress Code - Formal"
                className="max-w-full h-auto"
                style={{ maxHeight: '400px' }}
              />
            </div>
          </div>
          
          {/* Bottom accent strip */}
          <div className="h-2 bg-[var(--wedding-champagne-gold)]"></div>
        </div>
      </div>
    </section>
  );
};

export default DressCode;
