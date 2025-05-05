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
        {isAttending ? "Thank You For Your RSVP!" : "We'll Miss You!"}
      </Heading>
      
      <p className="text-lg text-gray-700">
        {isAttending
          ? `We're excited to celebrate with you, ${data.name}!`
          : `We're sorry you can't make it, ${data.name}. You'll be missed!`}
      </p>
      
      {isAttending && (
        <div className="mt-4 space-y-4 bg-gray-50 p-6 rounded-lg text-left">
          <div>
            <h3 className="font-medium">Number of Guests:</h3>
            <p>{data.guestCount}</p>
          </div>
          
          {data.mealPreference && (
            <div>
              <h3 className="font-medium">Meal Preference:</h3>
              <p className="capitalize">{data.mealPreference}</p>
            </div>
          )}
        </div>
      )}
      
      <div className="mt-8">
        <Button onClick={onEdit} variant="outline">
          Edit Your RSVP
        </Button>
      </div>
      
      <p className="text-sm text-gray-500 mt-4">
        A confirmation has been sent to {data.email}
      </p>
    </div>
  );
};

export default Confirmation; 