import { cn } from "../../../lib/utils";

interface LogoProps {
  className?: string;
}

export const Logo = ({ className }: LogoProps) => {
  return (
    <div 
      className={cn(
        "relative flex items-center justify-center text-3xl font-bold text-primary",
        "before:content-[''] before:flex-1 before:border-b before:border-primary before:mr-4",
        "after:content-[''] after:flex-1 after:border-b after:border-primary after:ml-4",
        className
      )}
    >
      Nos casamos
    </div>
  );
};

export default Logo;  