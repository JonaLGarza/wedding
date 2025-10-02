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
            
            {/* Images Container - Horizontal on desktop, vertical on mobile */}
            <div className="flex flex-col md:flex-row gap-8 items-center md:items-start justify-center">
              {/* Dress Code Column */}
              <div className="flex-1 max-w-md flex flex-col items-center">
                <h3 className="text-2xl font-viaoda text-[var(--wedding-champagne-gold)] italic mb-3 text-center">
                  FORMAL
                </h3>
                <p className="text-lg text-[var(--wedding-charcoal-gray)] font-serif mb-6 text-center">
                  Nuestra boda será al exterior sobre una explanada.
                </p>
                <img 
                  src="https://jgwedding-photo-videos.s3.us-east-2.amazonaws.com/dress+code.png"
                  alt="Dress Code - Formal"
                  className="w-full h-auto object-contain"
                  style={{ maxHeight: '400px' }}
                />
              </div>
              
              {/* Color Palette Column */}
              <div className="flex-1 max-w-md flex flex-col items-center">
                <h3 className="text-2xl font-viaoda text-[var(--wedding-champagne-gold)] italic mb-3 text-center">
                  PALETA DE COLORES
                </h3>
                <p className="text-lg text-[var(--wedding-charcoal-gray)] font-serif mb-6 text-center">
                  Opcional
                </p>
                <img 
                  src="https://jgwedding-photo-videos.s3.us-east-2.amazonaws.com/paleta+de+colores+2.jpg"
                  alt="Paleta de colores para la boda"
                  className="w-full h-auto object-contain"
                  style={{ maxHeight: '400px' }}
                />
              </div>
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
