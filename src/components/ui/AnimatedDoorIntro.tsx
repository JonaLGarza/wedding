import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "../../components/atoms/Button/Button";
import forestBackground from "../../assets/images/forest.jpg";
import doorImage from "../../assets/fairy-door.png"

interface AnimatedDoorIntroProps {
  onComplete: () => void;
}

const AnimatedDoorIntro = ({ onComplete }: AnimatedDoorIntroProps) => {
  const [showButton, setShowButton] = useState(false);
  const [exitAnimation, setExitAnimation] = useState(false);

  // Door animation duration (5 seconds)
  const animationDuration = 5;

  useEffect(() => {
    // Show button after door animation completes
    const timer = setTimeout(() => {
      setShowButton(true);
    }, animationDuration * 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleButtonClick = () => {
    // Trigger exit animation
    setExitAnimation(true);
    
    // Wait for exit animation to complete before notifying parent
    setTimeout(() => {
      onComplete();
    }, 1500); // 1.5 second exit animation
  };

  return (
    <AnimatePresence>
      {!exitAnimation ? (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5 }}
        >
          {/* Forest Background */}
          <motion.div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ 
              backgroundImage: `url(${forestBackground})`,
              backgroundSize: "cover",
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2 }}
          />
          
          {/* Dark overlay to enhance door visibility */}
          <div className="absolute inset-0 bg-black/20" />
          
          {/* Central container with perspective */}
          <div style={{ perspective: "1000px" }} className="relative z-10">
            {/* Door image that scales up */}
            <motion.div
              className="w-full h-full flex items-center justify-center"
              initial={{ scale: 0.05, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              transition={{ 
                duration: animationDuration,
                ease: "easeOut"
              }}
              onClick={handleButtonClick}
            >
              <img
                src={doorImage} 
                alt="Magical Door"
                className="object-contain max-w-[90%] max-h-[80vh] rounded-lg"
              />
            </motion.div>
          </div>
          
          {/* Button that appears after animation */}
          <AnimatePresence>
            {showButton && (
              <motion.div
                className="absolute bottom-24 z-20"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
              >
                <Button 
                  onClick={handleButtonClick}
                  size="lg" 
                  className="text-2xl px-10 py-6 bg-amber-600 hover:bg-amber-700 shadow-xl rounded-full"
                >
                  ¡Ábreme!
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      ) : (
        <motion.div
          className="fixed inset-0 z-50 bg-black"
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 1.5 }}
          onAnimationComplete={() => onComplete()}
        />
      )}
    </AnimatePresence>
  );
};

export default AnimatedDoorIntro; 