import { useState, useRef, lazy, Suspense } from "react";
import WelcomeHeader from "../components/molecules/WelcomeHeader/WelcomeHeader";
import Navigation from "../components/molecules/Navigation/Navigation";
import RSVPForm, { RSVPFormData } from "../components/organisms/RSVPForm/RSVPForm";
import Confirmation from "../components/organisms/Confirmation/Confirmation";
import { Helmet } from 'react-helmet-async';
import { motion } from "framer-motion";
import { Gift, CreditCard } from "lucide-react";

// Lazy load heavy components
const EventDetails = lazy(() => import("../components/organisms/EventDetails/EventDetails"));
const Gifts = lazy(() => import("../components/organisms/Gifts/Gifts"));
const Accommodation = lazy(() => import("../components/organisms/Accommodation/Accommodation"));
const Gallery = lazy(() => import("../components/organisms/Gallery/Gallery"));

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
const coupleImage = "https://scontent.fntr10-1.fna.fbcdn.net/v/t39.30808-6/499197807_23971003055920950_6816323037988632063_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=cc71e4&_nc_eui2=AeFJtI_tc7QWckmmvsEV6f7q2ms7zJ_kZaraazvMn-RlqjrzzuAz6rN-xaEpFoe9pV0PKlNmqrNg5wPoX_eVQbP7&_nc_ohc=92J1xudvC18Q7kNvwFmXlhz&_nc_oc=Adki3V4cvq4IvZ4w6XH5V3dmlghY3tevC0zokLiUdMznRqVELMPp05hMD87Qh1Jr6bWuF1lwQg7mebrdstmX7XcU&_nc_zt=23&_nc_ht=scontent.fntr10-1.fna&_nc_gid=UGUX8CLGxVkbTZgNlCtvMQ&oh=00_AfWeYMlG3p6pIRJma16XjAIV7U7x9Os5PK51BWor8R4ENQ&oe=68B747CE";

const HomePage = () => {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState<RSVPFormData | null>(null);

  
  const sectionsRef = useRef<{ [key: string]: HTMLDivElement | null }>({});
  
  const setSectionRef = (sectionId: string) => (el: HTMLDivElement | null) => {
    sectionsRef.current[sectionId] = el;
  };
  
  const handleSubmit = (data: RSVPFormData) => {
    setFormData(data);
    setFormSubmitted(true);
    // Here you would typically send this data to your backend
    console.log("Form submitted:", data);
  };
  
  const handleEdit = () => {
    setFormSubmitted(false);
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
      </Helmet>

            {/* Navigation */}
      <Navigation
        items={[
          { id: "home", label: "Inicio", href: "#home" },
          { id: "itinerary", label: "Itinerario", href: "#itinerary" },
          { id: "details", label: "¿Cuándo & Dónde?", href: "#details" },
          { id: "gifts", label: "Regalos", href: "#gifts" },
          { id: "accommodation", label: "Hospedaje", href: "#accommodation" },
          { id: "rsvp", label: "RSVP", href: "#rsvp" },
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
        <div className="w-full space-y-24">
          {/* Home Section */}
          <div ref={setSectionRef("home")}>
            <WelcomeHeader
              coupleNames="Genesis & Jonathan"
              weddingDate="31.10.2025"
              message="Amar no es mirarse el uno al otro, es mirar juntos en la misma dirección."
              imageSrc={coupleImage}
            />
          </div>
          
          {/* Event Details Section (Unified with Itinerary) */}
          <div ref={setSectionRef("details")}>
            <LazyComponentWrapper>
              <EventDetails
                title="¿Cuándo & Dónde?"
                date="31 de Octubre de 2025"
                ceremonyAddress="Gral. Nicolás Bravo 127, Zona Centro, 25000 Saltillo, Coah."
                receptionAddress="Quinta La Alborada, Blvd. Luis Donaldo Colosio #265 Col, La Aurora, 25298 Saltillo, Coah."
                dressCode="Formal"
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
          </div>
          
          {/* Gifts Section */}
          <div ref={setSectionRef("gifts")}>
            <LazyComponentWrapper>
              <Gifts
                message="¡Gracias por formar parte de nuestro inicio como familia!"
                options={[
                  {
                    title: "Sobre",
                    description: "Tendremos una caja para sobres el día del evento.",
                    action: {
                      text: "Información del sobre",
                      type: "copy"
                    },
                    icon: <Gift className="h-8 w-8 text-[var(--brand-terracotta)]" />
                  },
                  {
                    title: "Regalo",
                    description: "Amazon",
                    action: {
                      text: "Clic aquí para ir a nuestra mesa de regalos",
                      url: "https://www.amazon.com",
                      type: "link"
                    },
                    icon: <Gift className="h-8 w-8 text-[var(--brand-terracotta)]" />
                  },
                  {
                    title: "Sobre",
                    description: "Mi cuenta BBVA:",
                    action: {
                      text: "Cuenta CLABE: 012 078 01593760062 7\nTarjeta de débito: 4152 3138 9407 8331",
                      type: "copy"
                    },
                    icon: <CreditCard className="h-8 w-8 text-[var(--brand-terracotta)]" />
                  }
                ]}
              />
            </LazyComponentWrapper>
          </div>
          
          {/* Accommodation Section */}
          <div ref={setSectionRef("accommodation")}>
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
          </div>
          
          {/* RSVP Section */}
          <div ref={setSectionRef("rsvp")}>
            {formSubmitted && formData ? (
              <Confirmation data={formData} onEdit={handleEdit} />
            ) : (
              <RSVPForm onSubmit={handleSubmit} />
            )}
          </div>
          
          {/* Gallery Section */}
          <div ref={setSectionRef("gallery")}>
            <LazyComponentWrapper>
              <Gallery
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
                    src: "https://jgwedding-photo-videos.s3.us-east-2.amazonaws.com/8.jpeg",
                    alt: "Foto de la boda 8",
                    caption: "Momentos especiales"
                  },
                ]}
              />
            </LazyComponentWrapper>
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
