import { HTMLAttributes } from "react";
import { cn } from "../../../lib/utils";
import Heading from "../../atoms/Heading/Heading";
import { AddToCalendar } from "../../atoms/AddToCalendar";
import { CountdownTimer } from "../../atoms/CountdownTimer";

interface WelcomeHeaderProps extends HTMLAttributes<HTMLDivElement> {
  coupleNames: string;
  message: string;
  imageSrc?: string;
}

export const WelcomeHeader = ({
  coupleNames,
  message,
  imageSrc,
  className,
  ...props
}: WelcomeHeaderProps) => {
  return (
    <div 
      className={cn(
        "relative text-center space-y-8 py-16 min-h-screen flex flex-col justify-center p-4",
        imageSrc && "bg-cover bg-center bg-no-repeat",
        className
      )} 
      style={imageSrc ? { backgroundImage: `url(${imageSrc})` } : {}}
      {...props}
    >
      {/* Background Overlay */}
      {imageSrc && (
        <div className="absolute inset-0 bg-black/40"></div>
      )}
      
      {/* Content */}
      <div className="relative z-10 space-y-4">
        {/* Countdown Timer */}
        <div className="mb-8">
          <CountdownTimer 
            targetDate={new Date('2025-10-31T16:00:00-06:00')} 
            className="mb-6"
          />
        </div>

        <div className={cn(
        "relative flex items-center justify-center text-3xl font-bold text-white",
        "before:content-[''] before:flex-1 before:border-b before:border-white before:mr-4",
        "after:content-[''] after:flex-1 after:border-b after:border-white after:ml-4",
        className
      )}>
          <span className="text-xxl font-medium font-viaoda tracking-[.25em]">¡Nos casamos!</span>
        </div>
        <Heading level={1} className="font-script text-5xl md:text-6xl text-white">
          {coupleNames}
        </Heading>
        
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
      </div>
      
      <div className="relative z-5 max-w-3xl mx-auto space-y-4">
        <p className="text-xl text-white leading-relaxed">{message}</p>
      </div>
    </div>
  );
};

export default WelcomeHeader; 