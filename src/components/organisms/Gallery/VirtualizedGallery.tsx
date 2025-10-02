import { HTMLAttributes, useState, useRef, useEffect } from "react";
import { cn } from "../../../lib/utils";
import Heading from "../../atoms/Heading/Heading";
import LazyImage from "../../atoms/LazyImage/LazyImage";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  caption?: string;
}

interface VirtualizedGalleryProps extends HTMLAttributes<HTMLDivElement> {
  title: string;
  message: string;
  images: GalleryImage[];
  itemsPerRow?: number;
  loadMoreThreshold?: number;
}

export const VirtualizedGallery = ({
  title,
  message,
  images,
  className,
  itemsPerRow = 4,
  loadMoreThreshold = 2,
  ...props
}: VirtualizedGalleryProps) => {
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleImages, setVisibleImages] = useState<GalleryImage[]>([]);
  const [loadedCount, setLoadedCount] = useState(itemsPerRow * 2); // Load initial batch
  const [isLoading, setIsLoading] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  // Initialize visible images
  useEffect(() => {
    setVisibleImages(images.slice(0, loadedCount));
  }, [images, loadedCount]);

  // Load more images when scrolling
  useEffect(() => {
    if (loadedCount >= images.length) return;

    const loadMore = () => {
      if (isLoading) return;
      
      setIsLoading(true);
      setTimeout(() => {
        const newCount = Math.min(loadedCount + itemsPerRow * 2, images.length);
        setLoadedCount(newCount);
        setVisibleImages(images.slice(0, newCount));
        setIsLoading(false);
      }, 300); // Simulate loading delay
    };

    // Create intersection observer for load more trigger
    const trigger = document.createElement('div');
    trigger.style.height = '20px';
    trigger.style.width = '100%';
    
    if (containerRef.current) {
      containerRef.current.appendChild(trigger);
      
      observerRef.current = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting && loadedCount < images.length) {
            loadMore();
          }
        },
        { rootMargin: '100px' }
      );
      
      observerRef.current.observe(trigger);
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
      if (trigger.parentNode) {
        trigger.parentNode.removeChild(trigger);
      }
    };
  }, [loadedCount, images.length, itemsPerRow, isLoading]);

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
      
      <div ref={containerRef} className="columns-2 md:columns-3 lg:columns-4 gap-4 max-w-6xl mx-auto">
        {visibleImages.map((image, index) => {
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
              <LazyImage
                src={image.src}
                alt={image.alt}
                className={`w-full ${height} object-cover`}
              />
            </div>
          );
        })}
        
        {/* Loading indicator */}
        {isLoading && (
          <div className="col-span-full flex justify-center py-8">
            <div className="inline-block h-6 w-6 animate-spin rounded-full border-2 border-solid border-[var(--brand-terracotta)] border-r-transparent"></div>
          </div>
        )}
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
              <LazyImage
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

export default VirtualizedGallery;
