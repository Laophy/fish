import React from "react";
import { motion } from "framer-motion";
import { formatNumber } from "../../utils/numberFormatter";
import { useTheme } from "../../context/ThemeContext";

export function Counter({ count, isFrenzyActive }) {
  const { isDarkMode } = useTheme();
  const rainbowColors = [
    "#FF0000", // Red
    "#FF7F00", // Orange
    "#FFFF00", // Yellow
    "#00FF00", // Green
    "#0000FF", // Blue
    "#4B0082", // Indigo
    "#8B00FF", // Violet
  ];

  return (
    <div
      style={{
        fontSize: "6rem",
        marginBottom: "8rem",
        userSelect: "none",
        WebkitUserSelect: "none",
        msUserSelect: "none",
        MozUserSelect: "none",
        fontFamily: "'Orbitron', sans-serif",
        fontWeight: "900",
        display: "flex",
        gap: "0.1em",
        WebkitTextFillColor: isFrenzyActive
          ? "unset"
          : isDarkMode
          ? "#ffffff"
          : "#1c2026",
        textShadow: isDarkMode
          ? "0 0 0.5px rgba(255,255,255,0.5), 0 0 100px rgba(255,255,255,0.3)"
          : "0 0 0.5px rgba(0,0,0,0.5), 0 0 100px rgba(0,0,0,0.3)",
        filter: isDarkMode
          ? "drop-shadow(0 2px 4px rgba(0,0,0,0.1))"
          : "drop-shadow(0 2px 8px rgba(0,0,0,0.25))",
      }}
    >
      <motion.span
        animate={
          isFrenzyActive
            ? {
                color: rainbowColors,
              }
            : {}
        }
        transition={
          isFrenzyActive
            ? {
                color: {
                  repeat: Infinity,
                  duration: 2,
                },
              }
            : {}
        }
        style={{
          WebkitTextFillColor: isFrenzyActive ? "unset" : "inherit",
        }}
      >
        {formatNumber(count)}
      </motion.span>
      <span
        style={{
          WebkitTextFillColor: isFrenzyActive
            ? isDarkMode
              ? "#ffffff"
              : "#1c2026"
            : "inherit",
        }}
      >
        {" "}
      </span>
    </div>
  );
}
