import React from "react";
import { motion } from "framer-motion";
import { useTheme } from "../../context/ThemeContext";
import { usePlayTime } from "../../hooks/usePlayTime";

export function PlayTime() {
  const { isDarkMode } = useTheme();
  const [, formattedTime] = usePlayTime();

  return (
    <motion.div
      style={{
        position: "fixed",
        bottom: "20px",
        left: "20px",
        fontSize: "1.5rem",
        fontFamily: "'Orbitron', sans-serif",
        fontWeight: "700",
        userSelect: "none",
        WebkitUserSelect: "none",
        msUserSelect: "none",
        MozUserSelect: "none",
        background: "linear-gradient(180deg, #fff, #a0a0a0)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: isDarkMode ? "#ffffff" : "#1c2026",
        textShadow: isDarkMode
          ? "0 0 0.5px rgba(255,255,255,0.5), 0 0 100px rgba(255,255,255,0.3)"
          : "0 0 0.5px rgba(0,0,0,0.5), 0 0 100px rgba(0,0,0,0.3)",
        filter: isDarkMode
          ? "drop-shadow(0 2px 4px rgba(0,0,0,0.1))"
          : "drop-shadow(0 2px 8px rgba(0,0,0,0.25))",
        zIndex: 1000,
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {formattedTime}
    </motion.div>
  );
}
