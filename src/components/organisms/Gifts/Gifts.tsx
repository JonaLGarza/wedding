import { HTMLAttributes } from "react";
import { cn } from "../../../lib/utils";
import Heading from "../../atoms/Heading/Heading";
import { Button } from "../../atoms/Button/Button";
import { ExternalLink, Copy, Check } from "lucide-react";
import { useState } from "react";

interface GiftOption {
  title: string;
  description: string;
  action?: {
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
  const [copiedStates, setCopiedStates] = useState<{ [key: number]: boolean }>({});

  const handleCopyToClipboard = async (text: string, index: number) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedStates(prev => ({ ...prev, [index]: true }));
      setTimeout(() => {
        setCopiedStates(prev => ({ ...prev, [index]: false }));
      }, 2000);
    } catch {
      // Fallback for older browsers
      const textArea = document.createElement("textarea");
      textArea.value = text;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
      
      setCopiedStates(prev => ({ ...prev, [index]: true }));
      setTimeout(() => {
        setCopiedStates(prev => ({ ...prev, [index]: false }));
      }, 2000);
    }
  };

  return (
    <div className={cn("space-y-8", className)} {...props}>
      <Heading level={2} className="text-center">Regalos</Heading>
      
      <div className="text-center max-w-2xl mx-auto">
        <p className="text-lg text-[var(--muted-fg)] leading-relaxed">{message}</p>
      </div>
      
      <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        {options.map((option, index) => (
          <div
            key={index}
            className="bg-[var(--brand-ivory)]/70 backdrop-blur rounded-2xl shadow-md p-6 border border-[color:var(--brand-beige)] hover:shadow-lg transition-all duration-200 hover:scale-[0.98]"
          >
                         <div className={`text-center ${option.action ? 'space-y-4' : 'h-full flex flex-col justify-center space-y-4'}`}>
               {option.icon && (
                 <div className="mx-auto w-16 h-16 bg-[var(--brand-terracotta)]/10 rounded-full flex items-center justify-center">
                   {option.icon}
                 </div>
               )}
               
               <div className={option.action ? '' : 'flex-1 flex flex-col justify-center'}>
                 <h3 className="text-xl font-semibold text-[var(--brand-olive)] mb-2">
                   {option.title}
                 </h3>
                 <p className="text-[var(--muted-fg)] mb-4">{option.description}</p>
               </div>
               
               {option.action && (
                 option.action.type === "link" && option.action.url ? (
                   <Button
                     asChild
                     className="w-full"
                     variant="secondary"
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
                   <div className="space-y-3">
                     {/* Texto visible y copiable */}
                     <div 
                       className="bg-[var(--brand-beige)]/20 rounded-lg p-3 cursor-pointer hover:bg-[var(--brand-beige)]/30 transition-colors duration-200"
                       onClick={() => handleCopyToClipboard(option.action!.text, index)}
                       title="Haz clic para copiar"
                     >
                       <p className="text-sm text-[var(--brand-olive)] font-medium break-all">
                         {option.action!.text}
                       </p>
                     </div>
                     
                     {/* Botón para copiar */}
                     <Button
                       onClick={() => handleCopyToClipboard(option.action!.text, index)}
                       className="w-full"
                       variant="secondary"
                       disabled={copiedStates[index]}
                     >
                       {copiedStates[index] ? (
                         <>
                           <Check className="h-4 w-4 mr-2" />
                           ¡Copiado!
                         </>
                       ) : (
                         <>
                           <Copy className="h-4 w-4 mr-2" />
                           Copiar información
                         </>
                       )}
                     </Button>
                   </div>
                 )
               )}
             </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Gifts;
