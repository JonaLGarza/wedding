import React from 'react';
import { ShoppingBag, UtensilsCrossed, Mountain } from 'lucide-react';

interface SaltilloGuideProps {
  className?: string;
}

const SaltilloGuide: React.FC<SaltilloGuideProps> = ({ className = '' }) => {
  return (
    <section className={`py-8 ${className}`}>
      <div className="w-full">
        {/* Main Container with dark background - full width but narrower content */}
        <div className="relative bg-[var(--wedding-charcoal-gray)] overflow-hidden">
          {/* Top accent strip */}
          <div className="h-1 bg-[var(--wedding-champagne-gold)]"></div>
          
          {/* Content - centered with max width for narrower appearance */}
          <div className="max-w-4xl mx-auto px-6 py-10">
            {/* Title */}
            <h2 className="text-3xl md:text-4xl text-center text-[var(--wedding-ivory-white)] mb-10">
              ¿QUÉ HACER EN SALTILLO?
            </h2>
            
            {/* Three columns layout */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
              {/* Shopping Column */}
              <div className="space-y-4">
                <div className="flex justify-center">
                  <ShoppingBag className="h-12 w-12 text-[var(--wedding-champagne-gold)]" />
                </div>
                <h3 className="text-xl font-extrabold font-viaoda text-[var(--wedding-ivory-white)] capitalize">
                  Shopping
                </h3>
                <ul className="space-y-2 text-left font-thin">
                  <li className="text-[var(--wedding-ivory-white)] font-serif text-base flex items-center">
                    <span className="w-2 h-2 bg-[var(--wedding-champagne-gold)] rounded-full mr-3 flex-shrink-0"></span>
                    Plaza Real Saltillo
                  </li>
                  <li className="text-[var(--wedding-ivory-white)] font-serif text-base flex items-center">
                    <span className="w-2 h-2 bg-[var(--wedding-champagne-gold)] rounded-full mr-3 flex-shrink-0"></span>
                    Galerías Saltillo
                  </li>
                  <li className="text-[var(--wedding-ivory-white)] font-serif text-base flex items-center">
                    <span className="w-2 h-2 bg-[var(--wedding-champagne-gold)] rounded-full mr-3 flex-shrink-0"></span>
                    Plaza Sendero Sur
                  </li>
                  <li className="text-[var(--wedding-ivory-white)] font-serif text-base flex items-center">
                    <span className="w-2 h-2 bg-[var(--wedding-champagne-gold)] rounded-full mr-3 flex-shrink-0"></span>
                    Paseo Villalta
                  </li>
                  <li className="text-[var(--wedding-ivory-white)] font-serif text-base flex items-center">
                    <span className="w-2 h-2 bg-[var(--wedding-champagne-gold)] rounded-full mr-3 flex-shrink-0"></span>
                    Plaza Patio Saltillo
                  </li>
                </ul>
              </div>
              
              {/* Restaurants Column */}
              <div className="space-y-4">
                <div className="flex justify-center">
                  <UtensilsCrossed className="h-12 w-12 text-[var(--wedding-champagne-gold)]" />
                </div>
                <h3 className="text-xl font-extrabold font-viaoda text-[var(--wedding-ivory-white)] capitalize">
                  Restaurantes
                </h3>
                <ul className="space-y-2 text-left font-thin">
                  <li className="text-[var(--wedding-ivory-white)] font-serif text-base flex items-center">
                    <span className="w-2 h-2 bg-[var(--wedding-champagne-gold)] rounded-full mr-3 flex-shrink-0"></span>
                    Zona Centro (restaurantes tradicionales como El Tapanco, Los Compadres)
                  </li>
                  <li className="text-[var(--wedding-ivory-white)] font-serif text-base flex items-center">
                    <span className="w-2 h-2 bg-[var(--wedding-champagne-gold)] rounded-full mr-3 flex-shrink-0"></span>
                    Manantial (área gastronómica con opciones variadas)
                  </li>
                  <li className="text-[var(--wedding-ivory-white)] font-serif text-base flex items-center">
                    <span className="w-2 h-2 bg-[var(--wedding-champagne-gold)] rounded-full mr-3 flex-shrink-0"></span>
                    Plaza Galerías (restaurantes de cadena y casuales)
                  </li>
                  <li className="text-[var(--wedding-ivory-white)] font-serif text-base flex items-center">
                    <span className="w-2 h-2 bg-[var(--wedding-champagne-gold)] rounded-full mr-3 flex-shrink-0"></span>
                    Distrito Vanguardia (zona nueva con restaurantes y bares modernos)
                  </li>
                  <li className="text-[var(--wedding-ivory-white)] font-serif text-base flex items-center">
                    <span className="w-2 h-2 bg-[var(--wedding-champagne-gold)] rounded-full mr-3 flex-shrink-0"></span>
                    Colosio (avenida con amplia oferta de restaurantes)
                  </li>
                </ul>
              </div>
              
              {/* Tourist Places Column */}
              <div className="space-y-4">
                <div className="flex justify-center">
                  <Mountain className="h-12 w-12 text-[var(--wedding-champagne-gold)]" />
                </div>
                <h3 className="text-xl font-extrabold font-viaoda text-[var(--wedding-ivory-white)] capitalize">
                  Lugares turísticos
                </h3>
                <ul className="space-y-2 text-left font-thin">
                  <li className="text-[var(--wedding-ivory-white)] font-serif text-base flex items-center">
                    <span className="w-2 h-2 bg-[var(--wedding-champagne-gold)] rounded-full mr-3 flex-shrink-0"></span>
                    Museo del Desierto
                  </li>
                  <li className="text-[var(--wedding-ivory-white)] font-serif text-base flex items-center">
                    <span className="w-2 h-2 bg-[var(--wedding-champagne-gold)] rounded-full mr-3 flex-shrink-0"></span>
                    Catedral de Santiago
                  </li>
                  <li className="text-[var(--wedding-ivory-white)] font-serif text-base flex items-center">
                    <span className="w-2 h-2 bg-[var(--wedding-champagne-gold)] rounded-full mr-3 flex-shrink-0"></span>
                    Alameda Zaragoza
                  </li>
                  <li className="text-[var(--wedding-ivory-white)] font-serif text-base flex items-center">
                    <span className="w-2 h-2 bg-[var(--wedding-champagne-gold)] rounded-full mr-3 flex-shrink-0"></span>
                    Mirador de Saltillo
                  </li>
                  <li className="text-[var(--wedding-ivory-white)] font-serif text-base flex items-center">
                    <span className="w-2 h-2 bg-[var(--wedding-champagne-gold)] rounded-full mr-3 flex-shrink-0"></span>
                    Bosque Urbano "El Chapulín"
                  </li>
                </ul>
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

export default SaltilloGuide;
