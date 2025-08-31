import { HTMLAttributes } from "react";
import { cn } from "../../../lib/utils";
import Heading from "../../atoms/Heading/Heading";
import { Button } from "../../atoms/Button/Button";
import { RSVPFormData } from "../RSVPForm/RSVPForm";
import { CheckCircle2, XCircle } from "lucide-react";

interface ConfirmationProps extends HTMLAttributes<HTMLDivElement> {
  data: RSVPFormData;
  onEdit: () => void;
}

export const Confirmation = ({
  data,
  onEdit,
  className,
  ...props
}: ConfirmationProps) => {
  const isAttending = data.attending === "yes";
  
  return (
    <div className={cn("text-center space-y-6 max-w-lg mx-auto", className)} {...props}>
      <div className="flex justify-center">
        {isAttending ? (
          <CheckCircle2 className="h-16 w-16 text-green-500" />
        ) : (
          <XCircle className="h-16 w-16 text-amber-500" />
        )}
      </div>
      
      <Heading level={2}>
        {isAttending ? "¡Gracias por tu RSVP!" : "¡Te extrañaremos!"}
      </Heading>
      
      <p className="text-lg text-gray-700">
        {isAttending
          ? `¡Nos emociona celebrar contigo, ${data.name}!`
          : `Lamentamos que no puedas venir, ${data.name}. ¡Te extrañaremos!`}
      </p>
      
      {isAttending && (
        <div className="mt-4 space-y-4 bg-gray-50 p-6 rounded-lg text-left">
          <div>
            <h3 className="font-medium">Número de invitados:</h3>
            <p>{data.guestCount}</p>
          </div>
          
          <div>
            <h3 className="font-medium">Teléfono:</h3>
            <p>{data.phone}</p>
          </div>
        </div>
      )}
      
      <div className="mt-8">
        <Button onClick={onEdit} variant="outline">
          Editar tu RSVP
        </Button>
      </div>
      
      <p className="text-sm text-gray-500 mt-4">
        Se ha enviado una confirmación a tu teléfono
      </p>
    </div>
  );
};

export default Confirmation; 