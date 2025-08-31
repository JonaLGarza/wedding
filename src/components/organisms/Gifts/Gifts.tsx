import { HTMLAttributes } from "react";
import { cn } from "../../../lib/utils";
import Heading from "../../atoms/Heading/Heading";
import { Button } from "../../atoms/Button/Button";
import { CreditCard, ExternalLink } from "lucide-react";

interface GiftOption {
  title: string;
  description: string;
  action: {
    text: string;
    url?: string;
    type: "link" | "copy";
  };
  icon?: React.ReactNode;
}

interface GiftsProps extends HTMLAttributes<HTMLDivElement> {
  message: string;
  options: GiftOption[];
}

export const Gifts = ({
  message,
  options,
  className,
  ...props
}: GiftsProps) => {
  const handleCopyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    // You could add a toast notification here
    alert("Copiado al portapapeles!");
  };

  return (
    <div className={cn("space-y-8", className)} {...props}>
      <Heading level={2} className="text-center">Regalos</Heading>
      
      <div className="text-center max-w-2xl mx-auto">
        <p className="text-lg text-gray-700 leading-relaxed">{message}</p>
      </div>
      
      <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        {options.map((option, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-md p-6 border border-gray-200 hover:shadow-lg transition-shadow"
          >
            <div className="text-center space-y-4">
              {option.icon && (
                <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                  {option.icon}
                </div>
              )}
              
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {option.title}
                </h3>
                <p className="text-gray-600 mb-4">{option.description}</p>
              </div>
              
              {option.action.type === "link" && option.action.url ? (
                <Button
                  asChild
                  className="w-full"
                  variant="outline"
                >
                  <a
                    href={option.action.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center space-x-2"
                  >
                    <span>{option.action.text}</span>
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </Button>
              ) : (
                <Button
                  onClick={() => handleCopyToClipboard(option.action.text)}
                  className="w-full"
                  variant="outline"
                >
                  <CreditCard className="h-4 w-4 mr-2" />
                  Copiar información
                </Button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Gifts;
