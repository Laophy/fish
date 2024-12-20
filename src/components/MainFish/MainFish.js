import React from "react";
import { motion } from "framer-motion";
import { useTheme } from "../../context/ThemeContext";

export function MainFish({ fishNumber, onClick }) {
  const { isDarkMode } = useTheme();

  const handleClick = (e) => {
    onClick(e);
  };

  return (
    <motion.img
      src={require(`../../images/fish/fish_${fishNumber.type}/image_${fishNumber.number}.png`)}
      alt="Click Me"
      style={{
        cursor: "pointer",
        width: "250px",
        height: "250px",
        transformOrigin: "center",
        imageRendering: "crisp-edges",
        userSelect: "none",
        WebkitUserSelect: "none",
        msUserSelect: "none",
        MozUserSelect: "none",
        WebkitTouchCallout: "none",
        filter: isDarkMode
          ? "drop-shadow(0 0 20px rgba(255, 255, 255, 0.5))"
          : "drop-shadow(0 0 20px rgba(0, 0, 0, 0.5))",
      }}
      onClick={handleClick}
      draggable="false"
      animate={{
        rotate: 360,
        scale: 1,
      }}
      transition={{
        rotate: {
          duration: 20,
          ease: "linear",
          repeat: Infinity,
        },
        scale: {
          type: "spring",
          stiffness: 400,
          damping: 17,
        },
      }}
      whileTap={{ scale: 1.1 }}
    />
  );
}
