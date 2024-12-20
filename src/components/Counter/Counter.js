import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "../../context/ThemeContext";

export function Counter({ count }) {
  const { isDarkMode } = useTheme();

  const splitNumber = (number) => {
    const suffixes = [
      "",
      "K",
      "M",
      "B",
      "T",
      "Qa",
      "Qi",
      "Sx",
      "Sp",
      "Oc",
      "No",
      "Dc",
    ];
    const base = 1000;
    const exponent = Math.floor(Math.log(number) / Math.log(base));

    if (exponent < 1) return number.toString();

    const index = Math.min(exponent, suffixes.length - 1);
    const shortNumber = (number / Math.pow(base, index)).toFixed(1);

    return shortNumber + suffixes[index];
  };

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
        background: "linear-gradient(180deg, #fff, #a0a0a0)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: isDarkMode ? "#ffffff" : "#1c2026",
        textShadow: isDarkMode
          ? "0 0 0.5px rgba(255,255,255,0.5), 0 0 100px rgba(255,255,255,0.3)"
          : "0 0 0.5px rgba(0,0,0,0.5), 0 0 100px rgba(0,0,0,0.3)",
        filter: isDarkMode
          ? "drop-shadow(0 2px 4px rgba(0,0,0,0.1))"
          : "drop-shadow(0 2px 8px rgba(0,0,0,0.25))",
      }}
    >
      <AnimatePresence mode="popLayout">
        {splitNumber(count)
          .split("")
          .map((digit, index) => (
            <motion.span
              key={index + digit}
              initial={{ rotateX: -90, opacity: 0 }}
              animate={{ rotateX: 0, opacity: 1 }}
              exit={{ rotateX: 90, opacity: 0 }}
              transition={{
                type: "spring",
                stiffness: 500,
                damping: 25,
                duration: 0.25,
              }}
              style={{
                display: "inline-block",
                perspective: "1000px",
                transformStyle: "preserve-3d",
                padding: "0 2px",
                minWidth: "0.6em",
                textAlign: "center",
              }}
            >
              {digit}
            </motion.span>
          ))}
      </AnimatePresence>
    </div>
  );
}
