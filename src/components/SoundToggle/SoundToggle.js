import React from "react";
import { motion } from "framer-motion";
import { useSound } from "../../context/SoundContext";
import { useTheme } from "../../context/ThemeContext";

const SoundOnIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
    <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07" />
  </svg>
);

const SoundOffIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
    <line x1="23" y1="9" x2="17" y2="15" />
    <line x1="17" y1="9" x2="23" y2="15" />
  </svg>
);

export function SoundToggle() {
  const { isSoundEnabled, toggleSound } = useSound();
  const { isDarkMode } = useTheme();

  return (
    <motion.button
      onClick={toggleSound}
      style={{
        position: "fixed",
        top: "20px",
        right: "60px",
        background: "none",
        border: "none",
        cursor: "pointer",
        color: isDarkMode ? "#fff" : "#1c2026",
        zIndex: 1000,
      }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
    >
      {isSoundEnabled ? <SoundOnIcon /> : <SoundOffIcon />}
    </motion.button>
  );
}
