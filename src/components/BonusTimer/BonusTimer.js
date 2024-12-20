import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "../../context/ThemeContext";

export function BonusTimer({ bonusClicks, timeLeft }) {
  const { isDarkMode } = useTheme();

  return (
    <AnimatePresence>
      {bonusClicks ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          style={{
            position: "fixed",
            bottom: "20px",
            right: "20px",
            padding: "10px 20px",
            borderRadius: "10px",
            background: isDarkMode
              ? "rgba(76, 175, 80, 0.2)"
              : "rgba(76, 175, 80, 0.1)",
            border: "2px solid #4CAF50",
            color: isDarkMode ? "#fff" : "#1c2026",
            fontFamily: "'Orbitron', sans-serif",
            fontWeight: "700",
            fontSize: "1.2rem",
            zIndex: 1000,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "5px",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          }}
        >
          <div>Active Bonus: +{bonusClicks} clicks</div>
          <div>{timeLeft}s</div>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          style={{
            position: "fixed",
            bottom: "20px",
            right: "20px",
            padding: "10px 20px",
            borderRadius: "10px",
            background: isDarkMode
              ? "rgba(0, 0, 0, 0.2)"
              : "rgba(0, 0, 0, 0.1)",
            color: isDarkMode ? "#666" : "#999",
            fontFamily: "'Orbitron', sans-serif",
            fontWeight: "700",
            fontSize: "1.2rem",
            zIndex: 1000,
          }}
        >
          No Active Bonus
        </motion.div>
      )}
    </AnimatePresence>
  );
}
