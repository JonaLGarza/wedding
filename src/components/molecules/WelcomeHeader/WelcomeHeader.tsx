import { HTMLAttributes } from "react";
import { cn } from "../../../lib/utils";
import Logo from "../../atoms/Logo/Logo";
import Heading from "../../atoms/Heading/Heading";

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
    <div className={cn("text-center space-y-6", className)} {...props}>
      <Logo className="mx-auto" />
      
      <Heading level={1} className="font-serif">{coupleNames}</Heading>
      
      {imageSrc && (
        <div className="relative h-64 sm:h-80 md:h-96 overflow-hidden rounded-lg">
          <img
            src={imageSrc}
            alt={`${coupleNames} - Wedding`}
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>
      )}
      
      <p className="text-lg text-gray-700 max-w-2xl mx-auto">{message}</p>
    </div>
  );
};

export default WelcomeHeader; 