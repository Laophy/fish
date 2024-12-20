import React from "react";
import { motion } from "framer-motion";

export function BonusText({ bonus, isClicker }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      style={{
        position: "absolute",
        top: "-30px",
        left: "50%",
        transform: "translateX(-50%)",
        color: isClicker ? "#4CAF50" : "#FFD700",
        fontWeight: "bold",
        fontSize: "1.2rem",
        textShadow: "2px 2px 4px rgba(0,0,0,0.3)",
        whiteSpace: "nowrap",
      }}
    >
      {isClicker ? `+${bonus} clicks` : `+${bonus}%`}
    </motion.div>
  );
}
