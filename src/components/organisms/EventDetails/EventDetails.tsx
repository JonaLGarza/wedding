import { HTMLAttributes } from "react";
import { cn } from "../../../lib/utils";
import Heading from "../../atoms/Heading/Heading";
import { Calendar, Shirt, Clock, MapPin, Map } from "lucide-react";
import { AddToCalendar } from "../../atoms/AddToCalendar/AddToCalendar";

interface ItineraryItem {
  title: string;
  time: string;
  location: string;
  address: string;
  mapUrl?: string;
}

interface EventDetailsProps extends HTMLAttributes<HTMLDivElement> {
  title: string;
  dressCode: string;
  itineraryItems: ItineraryItem[];
}

export const EventDetails = ({
  title,
  dressCode,
  itineraryItems,
  className,
  ...props
}: EventDetailsProps) => {
  return (
    <div className={cn("space-y-4 px-4", className)} {...props}>
      <Heading level={2} className="text-center">{title}</Heading>
              {/* Add to Calendar Button */}
        <div className="flex justify-center relative z-20">
          <AddToCalendar
            title="Boda de Genesis & Jonathan"
            start="2025-10-31T16:00:00-06:00"
            end="2025-10-31T23:00:00-06:00"
            description="Celebración de nuestra boda. ¡Esperamos que puedas acompañarnos en este día tan especial!"
            location="Gral. Nicolás Bravo 127, Zona Centro, 25000 Saltillo, Coah."
            allDay={false}
            className="mt-4"
          />
        </div>
      
      <div className="text-center max-w-2xl mx-auto mb-8">
        <p className="text-lg text-[var(--muted-fg)]">
          A continuación encontrarás el horario y ubicación de los eventos de nuestra boda, 
          así como mapas interactivos para que te sea más fácil llegar a cada lugar.
        </p>
      </div>
      
      {/* Itinerary Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {itineraryItems.map((item, index) => (
          <div
            key={index}
            className="bg-[var(--brand-ivory)]/70 backdrop-blur rounded-2xl shadow-md p-6 border-l-4 border-[var(--brand-terracotta)]"
          >
            <div className="space-y-2">
              <h3 className="text-xl font-semibold text-[var(--brand-olive)]">
                {item.title}
              </h3>
              
              <div className="flex items-center space-x-2 text-[var(--muted-fg)]">
                <Clock className="h-4 w-4" />
                <span className="font-medium">{item.time}</span>
              </div>
              
              <div className="flex items-start space-x-2 text-[var(--muted-fg)]">
                <MapPin className="h-4 w-4 mt-0.5" />
                <div>
                  <p className="font-medium">{item.location}</p>
                  <p className="text-sm text-[var(--muted-fg)]/70">{item.address}</p>
                </div>
              </div>
            </div>

            {/* Map for this item if mapUrl is provided */}
            {item.mapUrl && (
              <div className="mt-6">
                <div className="text-center mb-4">
                  <div className="inline-flex items-center space-x-2 text-[var(--brand-terracotta)] mb-2">
                    <Map className="h-5 w-5" />
                    <h4 className="text-lg font-semibold">Ubicación</h4>
                  </div>
                  <p className="text-sm text-[var(--muted-fg)]">
                    Haz clic en el mapa para obtener direcciones
                  </p>
                </div>
                
                <div className="bg-[var(--brand-beige)]/20 rounded-lg overflow-hidden">
                  <iframe 
                    src={item.mapUrl}
                    width="100%" 
                    height="250" 
                    style={{ border: 0 }} 
                    allowFullScreen 
                    loading="lazy" 
                    referrerPolicy="no-referrer-when-downgrade"
                    title={`Ubicación de ${item.location}`}
                    className="w-full"
                  />
                </div>
                
                <div className="text-center mt-3">
                  <a
                    href={`https://www.google.com/maps/search/${encodeURIComponent(item.location)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-2 text-[var(--brand-terracotta)] hover:text-[var(--brand-terracotta-700)] transition-colors text-sm"
                  >
                    <Map className="h-4 w-4" />
                    <span>Abrir en Google Maps</span>
                  </a>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
      
      {/* Date and Dress Code Section */}
      <div className="text-center space-y-6">
        <div className="inline-flex items-center space-x-2 bg-[var(--brand-beige)]/30 px-6 py-3 rounded-full">
          <Shirt className="h-5 w-5 text-[var(--brand-terracotta)]" />
          <span className="font-medium text-[var(--brand-olive)]">Código de vestimenta: {dressCode}</span>
        </div>
      </div>
    </div>
  );
};

export default EventDetails; 