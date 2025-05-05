import { cn } from "../../../lib/utils";

interface LogoProps {
  className?: string;
}

export const Logo = ({ className }: LogoProps) => {
  return (
    <div className={cn("font-serif text-3xl font-bold text-primary", className)}>
      G & J
    </div>
  );
};

export default Logo; 