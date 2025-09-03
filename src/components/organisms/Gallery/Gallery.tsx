import { HTMLAttributes, useState } from "react";
import { cn } from "../../../lib/utils";
import Heading from "../../atoms/Heading/Heading";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  caption?: string;
}

interface GalleryProps extends HTMLAttributes<HTMLDivElement> {
  title: string;
  message: string;
  images: GalleryImage[];
}

export const Gallery = ({
  title,
  message,
  images,
  className,
  ...props
}: GalleryProps) => {
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const openModal = (image: GalleryImage, index: number) => {
    setSelectedImage(image);
    setCurrentIndex(index);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  const goToPrevious = () => {
    const newIndex = currentIndex === 0 ? images.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
    setSelectedImage(images[newIndex]);
  };

  const goToNext = () => {
    const newIndex = currentIndex === images.length - 1 ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
    setSelectedImage(images[newIndex]);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      closeModal();
    } else if (e.key === "ArrowLeft") {
      goToPrevious();
    } else if (e.key === "ArrowRight") {
      goToNext();
    }
  };

  return (
    <div className={cn("space-y-8", className)} {...props}>
      <Heading level={2} className="text-center">{title}</Heading>
      
      <div className="text-center max-w-2xl mx-auto">
        <p className="text-lg text-[var(--muted-fg)] leading-relaxed">{message}</p>
      </div>
      
      <div className="columns-2 md:columns-3 lg:columns-4 gap-4 max-w-6xl mx-auto">
        {images.map((image, index) => {
          // Create different heights for Pinterest-style masonry effect
          const heights = [
            'h-48 md:h-56', // Short
            'h-64 md:h-72', // Medium
            'h-80 md:h-96', // Tall
            'h-56 md:h-64', // Medium-short
            'h-72 md:h-80', // Medium-tall
            'h-96 md:h-112', // Very tall
          ];
          
          const height = heights[index % heights.length];
          
          return (
            <div
              key={image.id}
              className={`break-inside-avoid mb-4 overflow-hidden rounded-xl cursor-pointer hover:opacity-90 transition-all duration-300 hover:scale-[1.02] shadow-lg hover:shadow-xl`}
              onClick={() => openModal(image, index)}
            >
              <img
                src={image.src}
                alt={image.alt}
                className={`w-full ${height} object-cover`}
              />
            </div>
          );
        })}
      </div>

      {/* Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-[var(--brand-olive)]/90 z-50 flex items-center justify-center p-4"
          onClick={closeModal}
          onKeyDown={handleKeyDown}
          tabIndex={0}
        >
          <div className="relative max-w-4xl max-h-full">
            <button
              onClick={(e) => {
                e.stopPropagation();
                closeModal();
              }}
              className="absolute top-4 right-4 text-[var(--brand-ivory)] hover:text-[var(--brand-beige)] z-10 transition-colors"
            >
              <X className="h-8 w-8" />
            </button>
            
            <button
              onClick={(e) => {
                e.stopPropagation();
                goToPrevious();
              }}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[var(--brand-ivory)] hover:text-[var(--brand-beige)] z-10 transition-colors"
            >
              <ChevronLeft className="h-8 w-8" />
            </button>
            
            <button
              onClick={(e) => {
                e.stopPropagation();
                goToNext();
              }}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-[var(--brand-ivory)] hover:text-[var(--brand-beige)] z-10 transition-colors"
            >
              <ChevronRight className="h-8 w-8" />
            </button>
            
            <div className="relative">
              <img
                src={selectedImage.src}
                alt={selectedImage.alt}
                className="max-w-full max-h-full object-contain"
                onClick={(e) => e.stopPropagation()}
              />
              
              {selectedImage.caption && (
                <div className="absolute bottom-0 left-0 right-0 bg-[var(--brand-olive)]/50 text-[var(--brand-ivory)] p-4 text-center">
                  <p>{selectedImage.caption}</p>
                </div>
              )}
            </div>
            
            <div className="text-center text-[var(--brand-ivory)] mt-4">
              <span className="text-sm">
                {currentIndex + 1} de {images.length}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery;
