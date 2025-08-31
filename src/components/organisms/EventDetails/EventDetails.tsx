import { HTMLAttributes } from "react";
import { cn } from "../../../lib/utils";
import Heading from "../../atoms/Heading/Heading";
import { Calendar, Shirt, Clock, MapPin, Map } from "lucide-react";

interface ItineraryItem {
  title: string;
  time: string;
  location: string;
  address: string;
  mapUrl?: string;
}

interface EventDetailsProps extends HTMLAttributes<HTMLDivElement> {
  title: string;
  date: string;
  ceremonyAddress: string;
  receptionAddress: string;
  dressCode: string;
  itineraryItems: ItineraryItem[];
}

export const EventDetails = ({
  title,
  date,
  dressCode,
  itineraryItems,
  className,
  ...props
}: EventDetailsProps) => {
  return (
    <div className={cn("space-y-8", className)} {...props}>
      <Heading level={2} className="text-center">{title}</Heading>
      
      <div className="text-center max-w-2xl mx-auto mb-8">
        <p className="text-lg text-gray-700">
          A continuación encontrarás el horario y ubicación de los eventos de nuestra boda, 
          así como mapas interactivos para que te sea más fácil llegar a cada lugar.
        </p>
      </div>
      
      {/* Itinerary Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {itineraryItems.map((item, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-md p-6 border-l-4 border-primary"
          >
            <div className="space-y-2">
              <h3 className="text-xl font-semibold text-gray-900">
                {item.title}
              </h3>
              
              <div className="flex items-center space-x-2 text-gray-600">
                <Clock className="h-4 w-4" />
                <span className="font-medium">{item.time}</span>
              </div>
              
              <div className="flex items-start space-x-2 text-gray-600">
                <MapPin className="h-4 w-4 mt-0.5" />
                <div>
                  <p className="font-medium">{item.location}</p>
                  <p className="text-sm text-gray-500">{item.address}</p>
                </div>
              </div>
            </div>

            {/* Map for this item if mapUrl is provided */}
            {item.mapUrl && (
              <div className="mt-6">
                <div className="text-center mb-4">
                  <div className="inline-flex items-center space-x-2 text-primary mb-2">
                    <Map className="h-5 w-5" />
                    <h4 className="text-lg font-semibold">Ubicación</h4>
                  </div>
                  <p className="text-sm text-gray-600">
                    Haz clic en el mapa para obtener direcciones
                  </p>
                </div>
                
                <div className="bg-gray-50 rounded-lg overflow-hidden">
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
                    className="inline-flex items-center space-x-2 text-primary hover:text-primary/80 transition-colors text-sm"
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
        <div className="inline-flex items-center space-x-2 bg-primary/10 px-6 py-3 rounded-full">
          <Calendar className="h-5 w-5 text-primary" />
          <span className="font-medium text-gray-700">{date}</span>
        </div>
        
        <div className="inline-flex items-center space-x-2 bg-gray-100 px-6 py-3 rounded-full">
          <Shirt className="h-5 w-5 text-primary" />
          <span className="font-medium text-gray-700">Código de vestimenta: {dressCode}</span>
        </div>
      </div>
    </div>
  );
};

export default EventDetails; 