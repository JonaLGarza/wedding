import { useState } from "react";
import WelcomeHeader from "../components/molecules/WelcomeHeader/WelcomeHeader";
import EventDetails from "../components/organisms/EventDetails/EventDetails";
import RSVPForm, { RSVPFormData } from "../components/organisms/RSVPForm/RSVPForm";
import Confirmation from "../components/organisms/Confirmation/Confirmation";
import { Helmet } from 'react-helmet-async';
import { motion } from "framer-motion";

// You would replace this with your actual couple image
const coupleImage = "https://scontent.fntr10-1.fna.fbcdn.net/v/t39.30808-6/499197807_23971003055920950_6816323037988632063_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=cc71e4&_nc_eui2=AeFJtI_tc7QWckmmvsEV6f7q2ms7zJ_kZaraazvMn-RlqjrzzuAz6rN-xaEpFoe9pV0PKlNmqrNg5wPoX_eVQbP7&_nc_ohc=92J1xudvC18Q7kNvwFmXlhz&_nc_oc=Adki3V4cvq4IvZ4w6XH5V3dmlghY3tevC0zokLiUdMznRqVELMPp05hMD87Qh1Jr6bWuF1lwQg7mebrdstmX7XcU&_nc_zt=23&_nc_ht=scontent.fntr10-1.fna&_nc_gid=UGUX8CLGxVkbTZgNlCtvMQ&oh=00_AfWeYMlG3p6pIRJma16XjAIV7U7x9Os5PK51BWor8R4ENQ&oe=68B747CE";

const HomePage = () => {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState<RSVPFormData | null>(null);
  
  const handleSubmit = (data: RSVPFormData) => {
    setFormData(data);
    setFormSubmitted(true);
    // Here you would typically send this data to your backend
    console.log("Form submitted:", data);
  };
  
  const handleEdit = () => {
    setFormSubmitted(false);
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

      {/* Main Content - Will be visible after intro or immediately if intro is disabled */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
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
