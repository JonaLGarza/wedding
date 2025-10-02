import { useRef, lazy, Suspense } from "react";
import WelcomeHeader from "../components/molecules/WelcomeHeader/WelcomeHeader";
import Navigation from "../components/molecules/Navigation/Navigation";
import SaltilloGuide from "../components/organisms/SaltilloGuide/SaltilloGuide";
import DressCode from "../components/organisms/DressCode/DressCode";
import VirtualizedSection from "../components/atoms/VirtualizedSection/VirtualizedSection";
import { usePerformanceOptimization, useResourceHints } from "../hooks/usePerformanceOptimization";
import { Helmet } from 'react-helmet-async';
import { motion } from "framer-motion";
import { Gift, CreditCard } from "lucide-react";

// Lazy load heavy components
const EventDetails = lazy(() => import("../components/organisms/EventDetails/EventDetails"));
const Gifts = lazy(() => import("../components/organisms/Gifts/Gifts"));
const Accommodation = lazy(() => import("../components/organisms/Accommodation/Accommodation"));
const VirtualizedGallery = lazy(() => import("../components/organisms/Gallery/VirtualizedGallery"));

// Loading component for lazy components
const LazyComponentWrapper = ({ children }: { children: React.ReactNode }) => (
  <Suspense fallback={
    <div className="flex items-center justify-center py-16">
      <div className="text-center space-y-4">
        <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-[var(--brand-terracotta)] border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
        <p className="text-sm text-[var(--muted-fg)]">Loading...</p>
      </div>
    </div>
  }>
    {children}
  </Suspense>
);

// You would replace this with your actual couple image
const coupleImage = "https://jgwedding-photo-videos.s3.us-east-2.amazonaws.com/portada.jpg";

const HomePage = () => {
  const sectionsRef = useRef<{ [key: string]: HTMLDivElement | null }>({});
  
  // Performance optimizations
  usePerformanceOptimization();
  useResourceHints();
  
  const setSectionRef = (sectionId: string) => (el: HTMLDivElement | null) => {
    sectionsRef.current[sectionId] = el;
  };
  
  const handleNavigate = (sectionId: string) => {
    const element = sectionsRef.current[sectionId];
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };
  
  return (
    <>
      <Helmet>
        <title>Boda de Genesis y Jonathan - 31.10.2025</title>
        <meta
          name="description"
          content="Boda de Genesis y Jonathan - 31 de Octubre de 2025. Únete a nosotros para celebrar este momento tan especial lleno de amor y felicidad."
        />
        {/* Critical resource preloading */}
        <link rel="preload" as="image" href={coupleImage} />
        <link rel="preload" as="image" href="https://jgwedding-photo-videos.s3.us-east-2.amazonaws.com/dress+code.png" />
        <link rel="preload" as="image" href="https://jgwedding-photo-videos.s3.us-east-2.amazonaws.com/paleta+de+colores+2.jpg" />
        
        {/* DNS prefetch for external resources */}
        <link rel="dns-prefetch" href="//jgwedding-photo-videos.s3.us-east-2.amazonaws.com" />
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        
        {/* Preconnect to critical domains */}
        <link rel="preconnect" href="https://jgwedding-photo-videos.s3.us-east-2.amazonaws.com" />
        
        {/* Performance hints */}
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <meta name="theme-color" content="#8B4513" />
      </Helmet>

            {/* Navigation */}
      <Navigation
        items={[
          { id: "home", label: "Inicio", href: "#home" },
          { id: "details", label: "¿Cuándo & Dónde?", href: "#details" },
          { id: "dresscode", label: "Dress Code", href: "#dresscode" },
          { id: "gifts", label: "Regalos", href: "#gifts" },
          { id: "accommodation", label: "Hospedaje", href: "#accommodation" },
          { id: "gallery", label: "Galería", href: "#gallery" },
        ]}
        onNavigate={handleNavigate}
      />

      {/* Main Content */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
        className="w-full"
      >
        <div className="w-full">
          {/* Home Section - No virtualization to prevent background issues */}
          <div ref={setSectionRef("home")}>
            <WelcomeHeader
              coupleNames="Genesis & Jonathan"
              message="Prefiero compartir una sola vida contigo que enfrentar sin ti todas las edades de este mundo"
              imageSrc={coupleImage}
            />
          </div>
          
          <div className="space-y-8">
          
          {/* Event Details Section (Unified with Itinerary) */}
          <div ref={setSectionRef("details")}>
            <VirtualizedSection minHeight="600px">
              <LazyComponentWrapper>
                <EventDetails
                  title="¿Cuándo & Dónde?"
                  itineraryItems={[
                    {
                      title: "Ceremonia Religiosa",
                      time: "16:00 horas",
                      location: "Catedral de Saltillo",
                      address: "Catedral de Saltillo, 25000 Saltillo, Coah.",
                      mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3603.49850011825!2d-101.00227262313328!3d25.421592377567265!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x868872bc380a9cdb%3A0x9f50f4884172fdb8!2sCatedral+de+Saltillo+de+Santiago+Ap%C3%B3stol!5e0!3m2!1ses!2smx!4v1756628566716!5m2!1ses!2smx"
                    },
                    {
                      title: "Recepción",
                      time: "19:00 horas",
                      location: "Quinta La Alborada",
                      address: "Quinta La Alborada, Blvd. Luis Donaldo Colosio #265 Col, La Aurora, 25298 Saltillo, Coah.",
                      mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3602.7659758989776!2d-100.93042899999999!3d25.446086399999995!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8688127ed73d06cb%3A0x87e0a2c0437556af!2sQuinta+Alborada!5e0!3m2!1ses!2smx!4v1756630437905!5m2!1ses!2smx"
                    }
                  ]}
                />
              </LazyComponentWrapper>
            </VirtualizedSection>
          </div>
          
          {/* Dress Code Section */}
          <div ref={setSectionRef("dresscode")}>
            <VirtualizedSection minHeight="500px">
              <DressCode />
            </VirtualizedSection>
          </div>
          
          {/* Gifts Section */}
          <div ref={setSectionRef("gifts")}>
            <VirtualizedSection minHeight="400px">
              <LazyComponentWrapper>
                <Gifts
                  message="¡Gracias por formar parte de nuestro inicio como familia!"
                  options={[
                    {
                      title: "Sobre",
                      description: "Tendremos una caja para sobres el día del evento.",
                      icon: <Gift className="h-8 w-8 text-[var(--brand-terracotta)]" />
                    },
                    {
                      title: "Transferencia :D",
                      description: "Mi cuenta Citibanamex:",
                      action: {
                        text: "5204 1660 3074 2391",
                        type: "copy"
                      },
                      icon: <CreditCard className="h-8 w-8 text-[var(--brand-terracotta)]" />
                    }
                  ]}
                />
              </LazyComponentWrapper>
            </VirtualizedSection>
          </div>
          
          {/* Accommodation Section */}
          <div ref={setSectionRef("accommodation")}>
            <VirtualizedSection minHeight="500px">
              <LazyComponentWrapper>
                <Accommodation
                  title="Hospedaje"
                  message="Te recomendamos estos hoteles cercanos al evento:"
                  hotels={[
                    {
                      name: "Fiesta Inn Saltillo",
                      address: "Carr. Monterrey - Saltillo No. 6607, Zona Industrial, 25270 Saltillo, Coah.",
                      phone: "8444110000"
                    },
                    {
                      name: "Hampton by Hilton Saltillo",
                      address: "Carr. Monterrey - Saltillo 6580, Sin Nombre de Col 25, 25270 Saltillo, Coah.",
                      phone: "8444504500"
                    }
                  ]}
                />
              </LazyComponentWrapper>
            </VirtualizedSection>
          </div>
          
          {/* Saltillo Guide Section */}
          <div ref={setSectionRef("saltilloguide")}>
            <VirtualizedSection minHeight="400px">
              <SaltilloGuide />
            </VirtualizedSection>
          </div>
          
          {/* RSVP Section */} {/* 
            <div ref={setSectionRef("rsvp")}>
              {formSubmitted && formData ? (
                <Confirmation data={formData} onEdit={handleEdit} />
              ) : (
                <RSVPForm onSubmit={handleSubmit} />
              )}
            </div>
          */}
          
          {/* Gallery Section */}
          <div ref={setSectionRef("gallery")}>
            <VirtualizedSection minHeight="800px">
              <LazyComponentWrapper>
                <VirtualizedGallery
                  className="px-4"
                  title="Galería"
                  message="¡Les compartimos fotografías especiales para nosotros!"
                  images={[
                    {
                      id: "1",
                      src: "https://jgwedding-photo-videos.s3.us-east-2.amazonaws.com/1.jpeg",
                      alt: "Foto de la boda 1",
                      caption: "Momentos especiales"
                    },
                    {
                      id: "2",
                      src: "https://jgwedding-photo-videos.s3.us-east-2.amazonaws.com/2.jpeg",
                      alt: "Foto de la boda 2",
                      caption: "Momentos especiales"
                    },
                    {
                      id: "3",
                      src: "https://jgwedding-photo-videos.s3.us-east-2.amazonaws.com/3.jpeg",
                      alt: "Foto de la boda 3",
                      caption: "Momentos especiales"
                    },
                    {
                      id: "4",
                      src: "https://jgwedding-photo-videos.s3.us-east-2.amazonaws.com/4.jpeg",
                      alt: "Foto de la boda 4",
                      caption: "Momentos especiales"
                    },
                    {
                      id: "5",
                      src: "https://jgwedding-photo-videos.s3.us-east-2.amazonaws.com/5.jpeg",
                      alt: "Foto de la boda 5",
                      caption: "Momentos especiales"
                    },
                    {
                      id: "6",
                      src: "https://jgwedding-photo-videos.s3.us-east-2.amazonaws.com/6.jpeg",
                      alt: "Foto de la boda 6",
                      caption: "Momentos especiales"
                    },
                    {
                      id: "7",
                      src: "https://jgwedding-photo-videos.s3.us-east-2.amazonaws.com/7.jpeg",
                      alt: "Foto de la boda 7",
                      caption: "Momentos especiales"
                    },
                    {
                      id: "8",
                      src: "https://jgwedding-photo-videos.s3.us-east-2.amazonaws.com/portada.jpg",
                      alt: "Foto de la boda 8",
                      caption: "Momentos especiales"
                    },
                  ]}
                />
              </LazyComponentWrapper>
            </VirtualizedSection>
          </div>
          </div>
        </div>
        
        <footer className="text-center py-10 text-sm text-[var(--muted-fg)]/70">
          <p>© 2025 JonaLGarza. Todos los derechos reservados.</p>
        </footer>
      </motion.div>
    </>
  );
};

export default HomePage;
