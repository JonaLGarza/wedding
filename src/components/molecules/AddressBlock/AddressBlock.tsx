import { HTMLAttributes } from "react";
import { cn } from "../../../lib/utils";
import GoogleMap from "../../atoms/GoogleMap/GoogleMap";
import Heading from "../../atoms/Heading/Heading";
import { MapPin } from "lucide-react";

interface AddressBlockProps extends HTMLAttributes<HTMLDivElement> {
  title: string;
  address: string;
  showMap?: boolean;
}

export const AddressBlock = ({
  title,
  address,
  showMap = true,
  className,
  ...props
}: AddressBlockProps) => {
  return (
    <div className={cn("space-y-4", className)} {...props}>
      <Heading level={3}>{title}</Heading>
      
      <div className="flex items-start space-x-2">
        <MapPin className="h-5 w-5 text-[var(--brand-terracotta)] mt-0.5" />
        <p className="text-[var(--muted-fg)]">{address}</p>
      </div>
      
      {showMap && (
        <div className="mt-4">
          <GoogleMap address={address} height="200px" />
        </div>
      )}
    </div>
  );
};

export default AddressBlock; 