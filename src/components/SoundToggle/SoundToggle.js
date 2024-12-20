import React from "react";
import { motion } from "framer-motion";
import { useTheme } from "../../context/ThemeContext";
import { useSound } from "../../context/SoundContext";

export function SoundToggle() {
  const { isDarkMode } = useTheme();
  const { isSoundEnabled, toggleSound } = useSound();

  return (
    <motion.div
      style={{
        position: "fixed",
        top: "20px",
        left: "20px",
        backgroundColor: isDarkMode
          ? "rgba(0, 0, 0, 0.2)"
          : "rgba(255, 255, 255, 0.2)",
        border: `1px solid ${
          isDarkMode ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)"
        }`,
        borderRadius: "50%",
        width: "40px",
        height: "40px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        cursor: "pointer",
        zIndex: 1000,
        backdropFilter: "blur(5px)",
        boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
      }}
      onClick={toggleSound}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
    >
      <motion.img
        src={isSoundEnabled ? "/icons/sound-on.svg" : "/icons/sound-off.svg"}
        alt={isSoundEnabled ? "Sound On" : "Sound Off"}
        style={{
          width: "24px",
          height: "24px",
          filter: isDarkMode ? "invert(1)" : "none",
        }}
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
      />
    </motion.div>
  );
}
