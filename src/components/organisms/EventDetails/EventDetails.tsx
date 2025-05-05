import { HTMLAttributes } from "react";
import { cn } from "../../../lib/utils";
import Heading from "../../atoms/Heading/Heading";
import AddressBlock from "../../molecules/AddressBlock/AddressBlock";
import { Calendar, Clock, Shirt } from "lucide-react";

interface EventDetailsProps extends HTMLAttributes<HTMLDivElement> {
  date: string;
  time: string;
  ceremonyAddress: string;
  receptionAddress: string;
  dressCode: string;
}

export const EventDetails = ({
  date,
  time,
  ceremonyAddress,
  receptionAddress,
  dressCode,
  className,
  ...props
}: EventDetailsProps) => {
  return (
    <div className={cn("space-y-8", className)} {...props}>
      <Heading level={2} className="text-center">Detalles del evento</Heading>
      
      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <Calendar className="h-5 w-5 text-primary" />
              <h3 className="font-medium text-lg">Fecha</h3>
            </div>
            <p className="text-gray-700 pl-7">{date}</p>
          </div>
          
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <Clock className="h-5 w-5 text-primary" />
              <h3 className="font-medium text-lg">Hora</h3>
            </div>
            <p className="text-gray-700 pl-7">{time}</p>
          </div>
          
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <Shirt className="h-5 w-5 text-primary" />
              <h3 className="font-medium text-lg">Código de vestimenta</h3>
            </div>
            <p className="text-gray-700 pl-7">{dressCode}</p>
          </div>
        </div>
        
        <div className="space-y-8">
          <AddressBlock
            title="Ceremonia"
            address={ceremonyAddress}
          />
          
          <AddressBlock
            title="Recepción"
            address={receptionAddress}
          />
        </div>
      </div>
    </div>
  );
};

export default EventDetails; 