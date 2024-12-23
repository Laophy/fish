import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "../../context/ThemeContext";

export function BonusTimer({
  bonusClicks,
  clickTimeLeft,
  isFrenzyActive,
  frenzyTimeLeft,
}) {
  const { isDarkMode } = useTheme();
  const hasAnyBonus = bonusClicks || isFrenzyActive;

  if (!hasAnyBonus) return null;

  return (
    <AnimatePresence>
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
        {bonusClicks && (
          <>
            <div>Active Bonus: +{bonusClicks} clicks</div>
            <div>{clickTimeLeft}s</div>
          </>
        )}
        {isFrenzyActive && <div>Fish Frenzy! {frenzyTimeLeft}s</div>}
      </motion.div>
    </AnimatePresence>
  );
}
