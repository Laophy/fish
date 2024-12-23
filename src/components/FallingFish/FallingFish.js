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
  isFrenzy,
  isFrenzyActive,
  isCurse,
}) {
  const { isDarkMode } = useTheme();

  const getFallDuration = () => {
    if (isGolden) {
      return isFrenzyActive
        ? settings.goldenFish.fallDuration / 2
        : settings.goldenFish.fallDuration;
    }
    return isFrenzyActive
      ? settings.fish.fallDuration / 2
      : settings.fish.fallDuration;
  };

  const variants = {
    normal: {
      y: ["0vh", "100vh"],
      transition: {
        y: { duration: getFallDuration(), ease: "linear" },
      },
    },
    golden: {
      y: ["0vh", "100vh"],
      rotate: [0, 360],
      scale: [1, 1.2, 1],
      transition: {
        y: { duration: getFallDuration(), ease: "linear" },
        rotate: { duration: 3, repeat: Infinity, ease: "linear" },
        scale: { duration: 2, repeat: Infinity, yoyo: true },
      },
    },
    clicker: {
      y: ["0vh", "100vh"],
      rotate: [0, 360],
      scale: [1, 1.2, 1],
      transition: {
        y: { duration: getFallDuration(), ease: "linear" },
        rotate: { duration: 3, repeat: Infinity, ease: "linear" },
        scale: { duration: 2, repeat: Infinity, yoyo: true },
      },
    },
    frenzy: {
      y: ["0vh", "100vh"],
      rotate: [0, 360],
      scale: [1, 1.2, 1],
      transition: {
        y: { duration: getFallDuration(), ease: "linear" },
        rotate: { duration: 3, repeat: Infinity, ease: "linear" },
        scale: { duration: 2, repeat: Infinity, yoyo: true },
      },
    },
    curse: {
      y: ["0vh", "100vh"],
      rotate: [0, 360],
      scale: [1, 1.3, 1],
      transition: {
        y: { duration: getFallDuration(), ease: "linear" },
        rotate: { duration: 2, repeat: Infinity, ease: "linear" },
        scale: { duration: 1, repeat: Infinity, yoyo: true },
      },
    },
  };

  return (
    <motion.div
      style={{
        position: "fixed",
        left: fish.x,
        top: -100,
        cursor: "pointer",
        filter: isGolden
          ? "brightness(1.5) saturate(1.5) drop-shadow(0 0 10px gold)"
          : isClicker
          ? "brightness(1.2) saturate(1.2) drop-shadow(0 0 10px cyan)"
          : isFrenzy
          ? "brightness(1.3) saturate(1.3) drop-shadow(0 0 10px orange)"
          : isCurse
          ? "brightness(1.4) saturate(1.4) drop-shadow(0 0 15px red)"
          : "none",
      }}
      initial={{ y: "-10vh" }}
      animate={{ y: "100vh" }}
      transition={{ duration: getFallDuration(), ease: "linear" }}
      onAnimationComplete={onAnimationComplete}
      onClick={(e) => {
        e.stopPropagation();
        onFishClick();
      }}
    >
      {!isFrenzy && !isCurse && (
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
      )}
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
            : isCurse
            ? {
                scale: [1, 1.3, 1],
                rotate: 360,
              }
            : isClicker || isFrenzy
            ? {
                scale: [1, 1.2, 1],
                rotate: 360,
              }
            : {
                rotate: 360,
              }
        }
        transition={
          isGolden || isCurse || isClicker || isFrenzy
            ? {
                scale: {
                  duration: isCurse ? 1 : 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                },
                rotate: {
                  duration: isCurse ? 2 : isClicker ? 4 : isFrenzy ? 3 : 8,
                  repeat: Infinity,
                  ease: "linear",
                },
              }
            : {
                rotate: {
                  duration: 12,
                  repeat: Infinity,
                  ease: "linear",
                },
              }
        }
        whileHover={{ scale: 1.1 }}
        draggable="false"
      />
      {(isFrenzy || isCurse) && fish.text && (
        <motion.div
          style={{
            position: "absolute",
            top: "-35px",
            width: "100%",
            textAlign: "center",
            color: "#FFD700",
            fontWeight: "bold",
            fontSize: "1.2rem",
            textShadow: "0 0 5px rgba(0,0,0,0.5)",
          }}
        >
          {fish.text}
        </motion.div>
      )}
    </motion.div>
  );
}
