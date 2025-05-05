import { HTMLAttributes } from "react";
import { cn } from "../../../lib/utils";

interface GoogleMapProps extends HTMLAttributes<HTMLIFrameElement> {
  address: string;
  zoom?: number;
  height?: string;
  width?: string;
}

export const GoogleMap = ({
  address,
  zoom = 15,
  height = "300px",
  width = "100%",
  className,
  ...props
}: GoogleMapProps) => {
  const encodedAddress = encodeURIComponent(address);
  const mapUrl = `https://www.google.com/maps/embed/v1/place?key=AIzaSyD55UPwY4DFfI3w4N8Fdbc0nU4AOP4jVdU&q=${encodedAddress}&zoom=${zoom}`;

  return (
    <iframe
      src={mapUrl}
      height={height}
      width={width}
      className={cn("border-0 rounded-md", className)}
      referrerPolicy="no-referrer-when-downgrade"
      loading="lazy"
      allowFullScreen
      {...props}
    />
  );
};

export default GoogleMap; 