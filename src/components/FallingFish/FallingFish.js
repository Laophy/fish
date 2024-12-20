import React from "react";
import { motion } from "framer-motion";
import { useTheme } from "../../context/ThemeContext";
import { BonusText } from "./BonusText";
import { settings } from "../../config/settings";
import { FISH_TYPES } from "../../constants/fishTypes";

export function FallingFish({
  fish,
  onFishClick,
  onAnimationComplete,
  isGolden,
  isClicker,
}) {
  const { isDarkMode } = useTheme();

  return (
    <motion.div
      style={{
        position: "fixed",
        left: fish.x,
        top: -100,
        width: "100px",
        height: "100px",
        filter: isGolden
          ? "drop-shadow(0 0 20px gold) brightness(1.5)"
          : isClicker
          ? "drop-shadow(0 0 20px #4CAF50) brightness(1.2)"
          : "none",
      }}
      initial={{ y: 0 }}
      animate={{ y: window.innerHeight + 200 }}
      transition={{
        duration: isGolden
          ? settings.goldenFish.fallDuration
          : settings.fish.fallDuration,
        ease: "linear",
      }}
      onAnimationComplete={onAnimationComplete}
    >
      <BonusText
        bonus={
          isGolden
            ? fish.bonusMultiplier * 100
            : isClicker
            ? fish.bonusClicks
            : settings.fish.bonusMultiplier * 100
        }
        isClicker={isClicker}
      />
      <motion.img
        src={require(`../../images/fish/fish_${fish.type}/image_${fish.number}.png`)}
        alt={isGolden ? "Golden Bonus Fish" : "Bonus Fish"}
        style={{
          width: "100px",
          height: "100px",
          cursor: "pointer",
          filter: isGolden
            ? "brightness(1.5) saturate(1.5)"
            : isClicker
            ? "hue-rotate(90deg) brightness(1.2)"
            : "none",
        }}
        animate={
          isGolden
            ? {
                scale: [1, 1.2, 1],
                rotate: 360,
              }
            : {}
        }
        transition={
          isGolden
            ? {
                scale: {
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                },
                rotate: {
                  duration: 8,
                  repeat: Infinity,
                  ease: "linear",
                },
              }
            : {}
        }
        onClick={onFishClick}
        whileHover={{ scale: 1.1 }}
        draggable="false"
      />
    </motion.div>
  );
}
