import { HTMLAttributes } from "react";
import { cn } from "../../../lib/utils";
import Heading from "../../atoms/Heading/Heading";
import { Calendar, Heart } from "lucide-react";

interface WelcomeHeaderProps extends HTMLAttributes<HTMLDivElement> {
  coupleNames: string;
  weddingDate: string;
  message: string;
  imageSrc?: string;
}

export const WelcomeHeader = ({
  coupleNames,
  weddingDate,
  message,
  imageSrc,
  className,
  ...props
}: WelcomeHeaderProps) => {
  return (
    <div className={cn("text-center space-y-8 py-16", className)} {...props}>
      <div className="space-y-4">
        <div className={cn(
        "relative flex items-center justify-center text-3xl font-bold text-primary",
        "before:content-[''] before:flex-1 before:border-b before:border-primary before:mr-4",
        "after:content-[''] after:flex-1 after:border-b after:border-primary after:ml-4",
        className
      )}>
          <span className="text-xxl font-medium font-viaoda tracking-[.25em]">¡Nos casamos!</span>
        </div>
        <Heading level={1} className="font-script text-5xl md:text-6xl text-primary">
          {coupleNames}
        </Heading>
        
        <div className="flex items-center justify-center space-x-2 text-gray-600">
          <Calendar className="h-5 w-5" />
          <span className="text-lg font-medium">{weddingDate}</span>
        </div>
      </div>
      
      {imageSrc && (
        <div className="relative h-80 sm:h-96 md:h-[500px] overflow-hidden rounded-2xl shadow-2xl">
          <img
            src={imageSrc}
            alt={`${coupleNames} - Wedding`}
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/20"></div>
        </div>
      )}
      
      <div className="max-w-3xl mx-auto space-y-4">
        <p className="text-xl text-gray-700 leading-relaxed">{message}</p>
      </div>
    </div>
  );
};

export default WelcomeHeader; 