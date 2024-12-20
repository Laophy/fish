import React from "react";
import { motion, AnimatePresence } from "framer-motion";

export function ClickFeedback({ x, y, amount = 1 }) {
  return (
    <motion.div
      initial={{ opacity: 1, y: "-100%", x: "-50%" }}
      animate={{ opacity: 0, y: "-500%" }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.15 }}
      style={{
        position: "absolute",
        left: x,
        top: y,
        color: "#4CAF50",
        fontSize: "2rem",
        fontWeight: "bold",
        pointerEvents: "none",
        zIndex: 9999,
        textShadow: "2px 2px 4px rgba(0,0,0,0.3)",
        WebkitTextFillColor: "#4CAF50",
        filter: "drop-shadow(0 0 2px rgba(255,255,255,0.5))",
      }}
    >
      +{amount}
    </motion.div>
  );
}
