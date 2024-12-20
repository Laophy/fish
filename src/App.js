import React, { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import toast, { Toaster } from "react-hot-toast";
import { useTheme } from "./context/ThemeContext";
import { useSound } from "./context/SoundContext";
import { useLocalStorage } from "./hooks/useLocalStorage";
import { FISH_TYPES } from "./constants/fishTypes";
import { Counter } from "./components/Counter/Counter";
import { MainFish } from "./components/MainFish/MainFish";
import { FallingFish } from "./components/FallingFish/FallingFish";
import { PlayTime } from "./components/PlayTime/PlayTime";
import { ThemeToggle } from "./components/ThemeToggle/ThemeToggle";
import { SoundToggle } from "./components/SoundToggle/SoundToggle";
import { settings } from "./config/settings";
import { ClickFeedback } from "./components/Counter/ClickFeedback";
import { BonusTimer } from "./components/BonusTimer/BonusTimer";

function App() {
  const { isDarkMode } = useTheme();
  const { playClickSound } = useSound();
  const [count, setCount] = useLocalStorage("count", 0);
  const [fishNumber, setFishNumber] = useState(() => ({
    number: Math.floor(Math.random() * 100),
    type: FISH_TYPES[Math.floor(Math.random() * FISH_TYPES.length)],
  }));
  const [fallingFish, setFallingFish] = useState(null);
  const [goldenFish, setGoldenFish] = useState(null);
  const [clickEffects, setClickEffects] = useState([]);
  const [clickerFish, setClickerFish] = useState(null);
  const [activeBonus, setActiveBonus] = useState(null);
  const [bonusTimeLeft, setBonusTimeLeft] = useState(0);

  const handleClick = (e) => {
    const bonusAmount = activeBonus || 1;
    const newCount = count + bonusAmount;
    setCount(newCount);
    playClickSound();

    const newEffect = {
      id: Date.now(),
      x: e.clientX,
      y: e.clientY,
    };
    setClickEffects((prev) => [...prev, newEffect]);
    setTimeout(() => {
      setClickEffects((prev) =>
        prev.filter((effect) => effect.id !== newEffect.id)
      );
    }, 500);
  };

  const spawnFallingFish = useCallback(() => {
    const randomType =
      FISH_TYPES[Math.floor(Math.random() * FISH_TYPES.length)];
    const randomNumber = Math.floor(Math.random() * 100);
    const centerWidth = window.innerWidth * 0.4;
    const sideWidth = (window.innerWidth - centerWidth) / 2;
    const randomX =
      Math.random() < 0.5
        ? Math.floor(Math.random() * sideWidth)
        : Math.floor(window.innerWidth - sideWidth + Math.random() * sideWidth);

    setFallingFish({
      type: randomType,
      number: randomNumber,
      x: randomX,
    });
  }, []);

  const handleFallingFishClick = () => {
    const bonus = Math.floor(count * settings.fish.bonusMultiplier);
    setCount((prev) => prev + bonus);
    setFallingFish(null);
    playClickSound();

    toast.success(`Bonus Fish! +${bonus.toLocaleString()} fish`, {
      style: {
        background: isDarkMode ? "#2d3748" : "#fff",
        color: isDarkMode ? "#fff" : "#2d3748",
        fontWeight: "bold",
      },
      duration: 2000,
    });
  };

  const spawnGoldenFish = useCallback(() => {
    const randomType =
      FISH_TYPES[Math.floor(Math.random() * FISH_TYPES.length)];
    const randomNumber = Math.floor(Math.random() * 100);
    const centerWidth = window.innerWidth * 0.4;
    const sideWidth = (window.innerWidth - centerWidth) / 2;
    const randomX =
      Math.random() < 0.5
        ? Math.floor(Math.random() * sideWidth)
        : Math.floor(window.innerWidth - sideWidth + Math.random() * sideWidth);

    const randomBonus =
      Math.floor(
        Math.random() *
          (settings.goldenFish.maxBonus - settings.goldenFish.minBonus + 1)
      ) + settings.goldenFish.minBonus;

    setGoldenFish({
      type: randomType,
      number: randomNumber,
      x: randomX,
      bonusMultiplier: randomBonus / 100,
    });
  }, []);

  const handleGoldenFishClick = () => {
    const bonus = Math.floor(count * goldenFish.bonusMultiplier);
    setCount((prev) => prev + bonus);
    setGoldenFish(null);
    playClickSound();

    toast.success(`Golden Fish! +${bonus.toLocaleString()} fish`, {
      icon: "✨",
      style: {
        background: isDarkMode ? "#2d3748" : "#fff",
        color: isDarkMode ? "#fff" : "#2d3748",
        fontWeight: "bold",
      },
      duration: 2000,
    });
  };

  const spawnClickerFish = useCallback(() => {
    const randomType =
      FISH_TYPES[Math.floor(Math.random() * FISH_TYPES.length)];
    const randomNumber = Math.floor(Math.random() * 100);
    const centerWidth = window.innerWidth * 0.4;
    const sideWidth = (window.innerWidth - centerWidth) / 2;
    const randomX =
      Math.random() < 0.5
        ? Math.floor(Math.random() * sideWidth)
        : Math.floor(window.innerWidth - sideWidth + Math.random() * sideWidth);

    const bonusClicks =
      Math.floor(
        Math.random() *
          (settings.clickerFish.maxClicks - settings.clickerFish.minClicks + 1)
      ) + settings.clickerFish.minClicks;

    setClickerFish({
      type: randomType,
      number: randomNumber,
      x: randomX,
      bonusClicks,
    });
  }, []);

  const handleClickerFishClick = () => {
    setActiveBonus(clickerFish.bonusClicks);
    setBonusTimeLeft(25);
    setClickerFish(null);
    playClickSound();

    toast.success(
      `Clicker Fish! +${clickerFish.bonusClicks} clicks per click for 25s`,
      {
        icon: "🎯",
        style: {
          background: isDarkMode ? "#2d3748" : "#fff",
          color: isDarkMode ? "#fff" : "#2d3748",
          fontWeight: "bold",
        },
        duration: 2000,
      }
    );
  };

  useEffect(() => {
    const spawnInterval = setInterval(() => {
      if (!fallingFish) {
        spawnFallingFish();
      }
    }, settings.fish.spawnInterval);

    return () => clearInterval(spawnInterval);
  }, [fallingFish, spawnFallingFish]);

  useEffect(() => {
    const fishTimer = setInterval(() => {
      const randomFish = Math.floor(Math.random() * 100);
      const randomType =
        FISH_TYPES[Math.floor(Math.random() * FISH_TYPES.length)];
      setFishNumber({ number: randomFish, type: randomType });
    }, settings.mainFish.changeInterval);

    return () => clearInterval(fishTimer);
  }, []);

  useEffect(() => {
    const goldenTimer = setInterval(() => {
      if (!goldenFish) {
        spawnGoldenFish();
      }
    }, settings.goldenFish.spawnInterval);

    return () => clearInterval(goldenTimer);
  }, [goldenFish, spawnGoldenFish]);

  useEffect(() => {
    const clickerTimer = setInterval(() => {
      if (!clickerFish) {
        spawnClickerFish();
      }
    }, settings.clickerFish.spawnInterval);

    return () => clearInterval(clickerTimer);
  }, [clickerFish, spawnClickerFish]);

  useEffect(() => {
    if (bonusTimeLeft > 0) {
      const timer = setInterval(() => {
        setBonusTimeLeft((prev) => {
          if (prev <= 1) {
            setActiveBonus(null);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [bonusTimeLeft]);

  return (
    <motion.div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        position: "relative",
        userSelect: "none",
        WebkitUserSelect: "none",
        msUserSelect: "none",
        MozUserSelect: "none",
        transition: "background-color 0.3s ease",
        backgroundColor: isDarkMode
          ? "rgba(28, 32, 38, 0.95)"
          : "rgba(230, 232, 235, 0.95)",
      }}
      animate={{
        backgroundColor: isDarkMode
          ? "rgba(28, 32, 38, 0.95)"
          : "rgba(230, 232, 235, 0.95)",
      }}
      transition={{ duration: 0.3 }}
    >
      <Toaster
        position="top-center"
        toastOptions={{
          style: {
            borderRadius: "10px",
            padding: "16px",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          },
        }}
      />
      <AnimatePresence>
        {clickEffects.map((effect) => (
          <ClickFeedback
            key={effect.id}
            x={effect.x}
            y={effect.y}
            amount={activeBonus || 1}
          />
        ))}
      </AnimatePresence>
      <SoundToggle />
      <ThemeToggle />
      <Counter count={count} />
      <MainFish fishNumber={fishNumber} onClick={handleClick} />
      <PlayTime />
      {fallingFish && (
        <FallingFish
          fish={fallingFish}
          onFishClick={handleFallingFishClick}
          onAnimationComplete={() => setFallingFish(null)}
        />
      )}
      {goldenFish && (
        <FallingFish
          fish={goldenFish}
          onFishClick={handleGoldenFishClick}
          onAnimationComplete={() => setGoldenFish(null)}
          isGolden={true}
        />
      )}
      {clickerFish && (
        <FallingFish
          fish={clickerFish}
          onFishClick={handleClickerFishClick}
          onAnimationComplete={() => setClickerFish(null)}
          isClicker={true}
        />
      )}
      <BonusTimer bonusClicks={activeBonus} timeLeft={bonusTimeLeft} />
    </motion.div>
  );
}

export default App;
