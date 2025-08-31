import { cn } from '../../lib/utils';

interface HeroImageProps {
  src: string;
  alt: string;
  className?: string;
}

export const HeroImage = ({ src, alt, className }: HeroImageProps) => {
  return (
    <div className={cn(
      "relative mx-auto max-w-4xl",
      "rounded-2xl overflow-hidden",
      "border-2 border-[var(--card)]",
      "shadow-lg shadow-[var(--accent)]/20",
      "transition-all duration-300 hover:shadow-xl hover:shadow-[var(--accent)]/30",
      className
    )}>
      <img
        src={src}
        alt={alt}
        className="w-full h-auto object-cover"
        loading="lazy"
      />
    </div>
  );
};

export default HeroImage;
