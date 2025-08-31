import { HTMLAttributes } from "react";
import { cn } from "../../../lib/utils";
import Heading from "../../atoms/Heading/Heading";
import { Button } from "../../atoms/Button/Button";
import { Phone, MapPin, ExternalLink } from "lucide-react";

interface Hotel {
  name: string;
  address: string;
  phone: string;
  website?: string;
  description?: string;
}

interface AccommodationProps extends HTMLAttributes<HTMLDivElement> {
  title: string;
  message: string;
  hotels: Hotel[];
}

export const Accommodation = ({
  title,
  message,
  hotels,
  className,
  ...props
}: AccommodationProps) => {
  return (
    <div className={cn("space-y-8", className)} {...props}>
      <Heading level={2} className="text-center">{title}</Heading>
      
      <div className="text-center max-w-2xl mx-auto">
        <p className="text-lg text-gray-700 leading-relaxed">{message}</p>
      </div>
      
      <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        {hotels.map((hotel, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-md p-6 border border-gray-200 hover:shadow-lg transition-shadow"
          >
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-gray-900 text-center">
                {hotel.name}
              </h3>
              
              {hotel.description && (
                <p className="text-gray-600 text-center">{hotel.description}</p>
              )}
              
              <div className="space-y-3">
                <div className="flex items-start space-x-2 text-gray-600">
                  <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
                  <p className="text-sm">{hotel.address}</p>
                </div>
                
                <div className="flex items-center space-x-2 text-gray-600">
                  <Phone className="h-4 w-4 flex-shrink-0" />
                  <span className="text-sm">{hotel.phone}</span>
                </div>
              </div>
              
              <div className="flex space-x-3 pt-2">
                <Button
                  asChild
                  className="flex-1"
                  variant="outline"
                  size="sm"
                >
                  <a
                    href={`tel:${hotel.phone}`}
                    className="flex items-center justify-center space-x-2"
                  >
                    <Phone className="h-4 w-4" />
                    <span>Llamar</span>
                  </a>
                </Button>
                
                {hotel.website && (
                  <Button
                    asChild
                    className="flex-1"
                    variant="outline"
                    size="sm"
                  >
                    <a
                      href={hotel.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center space-x-2"
                    >
                      <ExternalLink className="h-4 w-4" />
                      <span>Ver sitio</span>
                    </a>
                  </Button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Accommodation;
