import { useState } from "react";
import WelcomeHeader from "../components/molecules/WelcomeHeader/WelcomeHeader";
import EventDetails from "../components/organisms/EventDetails/EventDetails";
import RSVPForm, { RSVPFormData } from "../components/organisms/RSVPForm/RSVPForm";
import Confirmation from "../components/organisms/Confirmation/Confirmation";
import AnimatedDoorIntro from "../components/ui/AnimatedDoorIntro";
import { Helmet } from 'react-helmet-async';
import { motion } from "framer-motion";

// You would replace this with your actual couple image
const coupleImage = "https://scontent.fntr10-1.fna.fbcdn.net/v/t39.30808-6/475702217_9183062895141543_8348098127693293811_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=cc71e4&_nc_ohc=JDkQH1sQsh8Q7kNvwEELLPk&_nc_oc=AdmrR9ZyBYCg11s8VresxRoNHtgkdZxuRFDYaiPErbUojoGdwCc9jPrjBY18Kc72hCC06oOlMsaFz4ho5BPKyhhh&_nc_zt=23&_nc_ht=scontent.fntr10-1.fna&_nc_gid=imp1UzqteftGM_AUnkGktA&oh=00_AfGP4wuDOP-7QeAf-0MNFUy3IKhHeugzghXe4qFoFyXVtA&oe=681EC21A";

const HomePage = () => {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState<RSVPFormData | null>(null);
  const [showIntro, setShowIntro] = useState(true);
  
  const handleSubmit = (data: RSVPFormData) => {
    setFormData(data);
    setFormSubmitted(true);
    // Here you would typically send this data to your backend
    console.log("Form submitted:", data);
  };
  
  const handleEdit = () => {
    setFormSubmitted(false);
  };

  const handleIntroComplete = () => {
    setShowIntro(false);
  };
  
  return (
    <>
      <Helmet>
        <title>Boda de Jonathan y Genesis</title>
        <meta
          name="description"
          content="Boda de Jonathan y Genesis"
        />
      </Helmet>

      {/* Door Intro Animation */}
      {showIntro && <AnimatedDoorIntro onComplete={handleIntroComplete} />}

      {/* Main Content - Will be visible after intro or immediately if intro is disabled */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: !showIntro ? 1 : 0 }}
        transition={{ duration: 1.5 }}
        className="w-full"
      >
        <div className="container mx-auto px-4 py-12 space-y-24">
          <WelcomeHeader
            coupleNames="Genesis & Jonathan"
            message="Nos casamos! Únanse a nosotros para esta ocasión especial lleno de amor y risas."
            imageSrc={coupleImage}
          />
          
          <EventDetails
            date="Viernes, 31 Octubre, 2025"
            time="Ceremonia: 4:00 PM | Recepción: 6:00 PM"
            ceremonyAddress="Catedral de Saltillo"
            receptionAddress="Quinta Alborada"
            dressCode="Formal Attire"
          />
          
          {formSubmitted && formData ? (
            <Confirmation data={formData} onEdit={handleEdit} />
          ) : (
            <RSVPForm onSubmit={handleSubmit} />
          )}
        </div>
        <footer className="text-center py-10 text-sm text-muted-foreground">
          © {new Date().getFullYear()} Jonathan Lopez. All rights reserved.
        </footer>
      </motion.div>
    </>
  );
};

export default HomePage;
