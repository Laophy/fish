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
import {
  useFishCollection,
  TOTAL_UNIQUE_FISH,
} from "./hooks/useFishCollection";
import UpgradeMenu from "./components/UpgradeMenu/UpgradeMenu";
import StatsMenu from "./components/StatsMenu/StatsMenu";
import { formatNumber } from "./utils/numberFormatter";

const getFrenzyStyle = (isDarkMode, isFrenzyActive) => ({
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
  backgroundColor: isFrenzyActive
    ? "rgba(255, 223, 150, 0.95)"
    : isDarkMode
    ? "rgba(28, 32, 38, 0.95)"
    : "rgba(230, 232, 235, 0.95)",
});

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
  const [combo, setCombo] = useState(0);
  const [maxCombo, setMaxCombo] = useState(0);
  const comboTimeout = React.useRef(null);
  const { collection, addToCollection, getProgress } = useFishCollection();
  const [isUpgradeMenuOpen, setIsUpgradeMenuOpen] = useState(false);
  const [clickPower, setClickPower] = useLocalStorage("clickPower", 1);
  const [clickMultiplier, setClickMultiplier] = useLocalStorage(
    "clickMultiplier",
    1
  );
  const [totalClicks, setTotalClicks] = useLocalStorage("totalClicks", 0);
  const [superNetLevel, setSuperNetLevel] = useLocalStorage("superNetLevel", 0);
  const [isStatsMenuOpen, setIsStatsMenuOpen] = useState(false);
  const [totalGoldenFishCaught, setTotalGoldenFishCaught] = useLocalStorage(
    "totalGoldenFish",
    0
  );
  const [totalBonusFishCaught, setTotalBonusFishCaught] = useLocalStorage(
    "totalBonusFish",
    0
  );
  const [totalClickerFishCaught, setTotalClickerFishCaught] = useLocalStorage(
    "totalClickerFish",
    0
  );
  const [frenzyFish, setFrenzyFish] = useState(null);
  const [isFrenzyActive, setIsFrenzyActive] = useState(false);
  const [frenzyTimeLeft, setFrenzyTimeLeft] = useState(0);
  const [totalFrenzyFishCaught, setTotalFrenzyFishCaught] = useLocalStorage(
    "totalFrenzyFish",
    0
  );
  const [curseFish, setCurseFish] = useState([]);
  const [totalCurseFishCaught, setTotalCurseFishCaught] = useLocalStorage(
    "totalCurseFish",
    0
  );
  const [autoClickerLevel, setAutoClickerLevel] = useLocalStorage(
    "autoClickerLevel",
    0
  );
  const [magnetLevel, setMagnetLevel] = useLocalStorage("magnetLevel", 0);
  const [luckyLevel, setLuckyLevel] = useLocalStorage("luckyLevel", 0);
  const [comboMasterLevel, setComboMasterLevel] = useLocalStorage(
    "comboMasterLevel",
    0
  );
  const [totalFrenzyTime, setTotalFrenzyTime] = useState(0);

  const handleClick = (e) => {
    setTotalClicks((prev) => prev + 1);
    const superNetBonus = superNetLevel * 5;
    const bonusAmount = (activeBonus || 1) * (clickPower + superNetBonus);
    const comboMultiplier = Number(Math.min(1 + combo * 0.1, 2).toFixed(2));
    const totalMultiplier = Number(
      (clickMultiplier * comboMultiplier).toFixed(2)
    );
    const earnedAmount = bonusAmount * totalMultiplier;
    const newCount = count + earnedAmount;
    setCount(newCount);
    setCombo((prev) => prev + 1);
    setMaxCombo((prev) => Math.max(prev, combo + 1));

    clearTimeout(comboTimeout.current);
    comboTimeout.current = setTimeout(() => setCombo(0), 1000);

    playClickSound();

    const newEffect = {
      id: Date.now(),
      x: e.clientX,
      y: e.clientY,
      amount: Math.floor(earnedAmount),
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
    setTotalBonusFishCaught((prev) => prev + 1);
    const bonus = Math.floor(count * settings.fish.bonusMultiplier);
    setCount((prev) => prev + bonus);
    addToCollection(fallingFish);
    setFallingFish(null);
    playClickSound();

    toast.success(`Bonus Fish! +${formatNumber(bonus)} fish`, {
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
    setTotalGoldenFishCaught((prev) => prev + 1);
    const bonus = Math.floor(count * goldenFish.bonusMultiplier);
    setCount((prev) => prev + bonus);
    addToCollection(goldenFish);
    setGoldenFish(null);
    playClickSound();

    toast.success(`Golden Fish! +${formatNumber(bonus)} fish`, {
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
    setTotalClickerFishCaught((prev) => prev + 1);
    addToCollection(clickerFish);
    setActiveBonus((prev) => (prev || 0) + clickerFish.bonusClicks);
    setBonusTimeLeft((prev) => prev + 25);
    setClickerFish(null);
    playClickSound();

    toast.success(
      `Clicker Fish! +${
        clickerFish.bonusClicks
      } clicks per click for 25s (Total: ${
        (activeBonus || 0) + clickerFish.bonusClicks
      } clicks)`,
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

  const spawnFrenzyFish = useCallback(() => {
    const randomType =
      FISH_TYPES[Math.floor(Math.random() * FISH_TYPES.length)];
    const randomNumber = Math.floor(Math.random() * 100);
    const centerWidth = window.innerWidth * 0.4;
    const sideWidth = (window.innerWidth - centerWidth) / 2;
    const randomX =
      Math.random() < 0.5
        ? Math.floor(Math.random() * sideWidth)
        : Math.floor(window.innerWidth - sideWidth + Math.random() * sideWidth);

    setFrenzyFish({
      type: randomType,
      number: randomNumber,
      x: randomX,
      text: "FRENZY",
    });
  }, []);

  const handleFrenzyFishClick = () => {
    setTotalFrenzyFishCaught((prev) => prev + 1);
    addToCollection(frenzyFish);
    setIsFrenzyActive(true);
    setFrenzyTimeLeft((prev) => prev + 10);
    setFrenzyFish(null);
    playClickSound();

    toast.success(
      `Fish Frenzy extended! ${
        totalFrenzyTime > 15 ? "⚠️ DANGER INCREASING!" : ""
      }`,
      {
        icon: "🌊",
        style: {
          background: isDarkMode ? "#2d3748" : "#fff",
          color: isDarkMode ? "#fff" : "#2d3748",
          fontWeight: "bold",
        },
        duration: 2000,
      }
    );
  };

  const spawnCurseFish = useCallback(() => {
    const randomType =
      FISH_TYPES[Math.floor(Math.random() * FISH_TYPES.length)];
    const randomNumber = Math.floor(Math.random() * 100);
    const centerWidth = window.innerWidth * 0.4;
    const sideWidth = (window.innerWidth - centerWidth) / 2;
    const randomX =
      Math.random() < 0.5
        ? Math.floor(Math.random() * sideWidth)
        : Math.floor(window.innerWidth - sideWidth + Math.random() * sideWidth);

    const newCurseFish = {
      id: Date.now(),
      type: randomType,
      number: randomNumber,
      x: randomX,
      text: "CURSE",
    };

    setCurseFish((prev) => [...prev, newCurseFish]);
  }, []);

  const handleCurseFishClick = (clickedFish) => {
    setTotalCurseFishCaught((prev) => prev + 1);
    addToCollection(clickedFish);
    setActiveBonus(null);
    setBonusTimeLeft(0);
    setIsFrenzyActive(false);
    setFrenzyTimeLeft(0);
    setCurseFish((prev) => prev.filter((fish) => fish.id !== clickedFish.id));
    playClickSound();

    toast.error("Curse Fish! All bonuses removed!", {
      icon: "💀",
      style: {
        background: isDarkMode ? "#2d3748" : "#fff",
        color: isDarkMode ? "#fff" : "#2d3748",
        fontWeight: "bold",
      },
      duration: 2000,
    });
  };

  useEffect(() => {
    const spawnInterval = setInterval(
      () => {
        if (!fallingFish) {
          spawnFallingFish();
        }
      },
      isFrenzyActive ? 500 : settings.fish.spawnInterval
    );

    return () => clearInterval(spawnInterval);
  }, [fallingFish, spawnFallingFish, isFrenzyActive]);

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
    const goldenTimer = setInterval(
      () => {
        if (!goldenFish) {
          spawnGoldenFish();
        }
      },
      isFrenzyActive ? 500 : settings.goldenFish.spawnInterval
    );

    return () => clearInterval(goldenTimer);
  }, [goldenFish, spawnGoldenFish, isFrenzyActive]);

  useEffect(() => {
    const clickerTimer = setInterval(
      () => {
        if (!clickerFish) {
          spawnClickerFish();
        }
      },
      isFrenzyActive ? 500 : settings.clickerFish.spawnInterval
    );

    return () => clearInterval(clickerTimer);
  }, [clickerFish, spawnClickerFish, isFrenzyActive]);

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

  useEffect(() => {
    const frenzyTimer = setInterval(
      () => {
        if (!frenzyFish) {
          spawnFrenzyFish();
        }
      },
      isFrenzyActive ? 500 : settings.fish.spawnInterval * 2
    );

    return () => clearInterval(frenzyTimer);
  }, [frenzyFish, spawnFrenzyFish, isFrenzyActive]);

  useEffect(() => {
    if (frenzyTimeLeft > 0) {
      const timer = setInterval(() => {
        setFrenzyTimeLeft((prev) => {
          if (prev <= 1) {
            setIsFrenzyActive(false);
            setTotalFrenzyTime(0);
            return 0;
          }
          return prev - 1;
        });

        setTotalFrenzyTime((prev) => prev + 1);
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [frenzyTimeLeft]);

  useEffect(() => {
    const curseTimer = setInterval(
      () => {
        spawnCurseFish();
      },
      isFrenzyActive
        ? totalFrenzyTime > 15
          ? Math.max(200, 500 - (totalFrenzyTime - 15) * 50)
          : 500
        : settings.curseFish.spawnInterval
    );

    return () => clearInterval(curseTimer);
  }, [spawnCurseFish, isFrenzyActive, totalFrenzyTime]);

  useEffect(() => {
    if (autoClickerLevel > 0) {
      const interval = setInterval(() => {
        const clicksPerSecond = autoClickerLevel;
        setCount(
          (prev) => prev + clicksPerSecond * clickPower * clickMultiplier
        );
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [autoClickerLevel, clickPower, clickMultiplier]);

  const getClickPowerCost = () =>
    Math.floor(50 * Math.pow(1.5, clickPower - 1));
  const getMultiplierCost = () =>
    Math.floor(100 * Math.pow(2, clickMultiplier - 1));
  const getSuperNetCost = () => Math.floor(200 * Math.pow(1.8, superNetLevel));
  const getAutoClickerCost = () =>
    Math.floor(500 * Math.pow(2, autoClickerLevel));
  const getMagnetCost = () => Math.floor(300 * Math.pow(1.7, magnetLevel));
  const getLuckyCost = () => Math.floor(400 * Math.pow(1.9, luckyLevel));
  const getComboMasterCost = () =>
    Math.floor(350 * Math.pow(1.8, comboMasterLevel));

  const upgradeClickPower = () => {
    const cost = getClickPowerCost();
    if (count >= cost) {
      setCount((prev) => prev - cost);
      setClickPower((prev) => prev + 1);
    }
  };

  const upgradeMultiplier = () => {
    const cost = getMultiplierCost();
    if (count >= cost) {
      setCount((prev) => prev - cost);
      setClickMultiplier((prev) => Number((prev + 0.1).toFixed(2)));
    }
  };

  const upgradeSuperNet = () => {
    const cost = getSuperNetCost();
    if (count >= cost) {
      setCount((prev) => prev - cost);
      setSuperNetLevel((prev) => prev + 1);
    }
  };

  const upgradeAutoClicker = () => {
    const cost = getAutoClickerCost();
    if (count >= cost) {
      setCount((prev) => prev - cost);
      setAutoClickerLevel((prev) => prev + 1);
    }
  };

  const upgradeMagnet = () => {
    const cost = getMagnetCost();
    if (count >= cost) {
      setCount((prev) => prev - cost);
      setMagnetLevel((prev) => prev + 1);
    }
  };

  const upgradeLucky = () => {
    const cost = getLuckyCost();
    if (count >= cost) {
      setCount((prev) => prev - cost);
      setLuckyLevel((prev) => prev + 1);
    }
  };

  const upgradeComboMaster = () => {
    const cost = getComboMasterCost();
    if (count >= cost) {
      setCount((prev) => prev - cost);
      setComboMasterLevel((prev) => prev + 1);
    }
  };

  return (
    <motion.div
      style={getFrenzyStyle(isDarkMode, isFrenzyActive)}
      animate={{
        backgroundColor: isFrenzyActive
          ? "rgba(255, 223, 150, 0.95)"
          : isDarkMode
          ? "rgba(28, 32, 38, 0.95)"
          : "rgba(230, 232, 235, 0.95)",
      }}
      transition={{ duration: 0.3 }}
    >
      <Toaster
        position="top-center"
        containerStyle={{
          top: 20,
        }}
        toastOptions={{
          style: {
            borderRadius: "10px",
            padding: "16px",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          },
          duration: 2000,
          success: {
            duration: 2000,
          },
        }}
        containerClassName="toast-container"
      />
      <style>
        {`
          .toast-container > div {
            margin-bottom: 8px !important;
          }
          .toast-container > div:nth-child(n+4) {
            display: none !important;
          }
        `}
      </style>
      <AnimatePresence>
        {clickEffects.map((effect) => (
          <ClickFeedback
            key={effect.id}
            x={effect.x}
            y={effect.y}
            amount={effect.amount}
          />
        ))}
      </AnimatePresence>
      <SoundToggle />
      <ThemeToggle />
      <Counter count={count} isFrenzyActive={isFrenzyActive} />
      <MainFish fishNumber={fishNumber} onClick={handleClick} />
      <PlayTime />
      {fallingFish && (
        <FallingFish
          fish={fallingFish}
          onFishClick={handleFallingFishClick}
          onAnimationComplete={() => setFallingFish(null)}
          isFrenzyActive={isFrenzyActive}
        />
      )}
      {goldenFish && (
        <FallingFish
          fish={goldenFish}
          onFishClick={handleGoldenFishClick}
          onAnimationComplete={() => setGoldenFish(null)}
          isGolden={true}
          isFrenzyActive={isFrenzyActive}
        />
      )}
      {clickerFish && (
        <FallingFish
          fish={clickerFish}
          onFishClick={handleClickerFishClick}
          onAnimationComplete={() => setClickerFish(null)}
          isClicker={true}
          isFrenzyActive={isFrenzyActive}
        />
      )}
      {frenzyFish && (
        <FallingFish
          fish={frenzyFish}
          onFishClick={handleFrenzyFishClick}
          onAnimationComplete={() => setFrenzyFish(null)}
          isFrenzy={true}
          isFrenzyActive={isFrenzyActive}
        />
      )}
      {curseFish.map((fish) => (
        <FallingFish
          key={fish.id}
          fish={fish}
          onFishClick={() => handleCurseFishClick(fish)}
          onAnimationComplete={() => {
            setCurseFish((prev) => prev.filter((f) => f.id !== fish.id));
          }}
          isCurse={true}
          isFrenzyActive={isFrenzyActive}
        />
      ))}
      <BonusTimer
        bonusClicks={activeBonus}
        clickTimeLeft={bonusTimeLeft}
        isFrenzyActive={isFrenzyActive}
        frenzyTimeLeft={frenzyTimeLeft}
      />
      <UpgradeMenu
        isOpen={isUpgradeMenuOpen}
        onToggle={() => setIsUpgradeMenuOpen((prev) => !prev)}
        clickPower={clickPower}
        multiplier={clickMultiplier}
        onUpgradeClickPower={upgradeClickPower}
        onUpgradeMultiplier={upgradeMultiplier}
        fishCount={count}
        clickPowerCost={getClickPowerCost()}
        multiplierCost={getMultiplierCost()}
        totalClicks={totalClicks}
        comboMultiplier={Math.min(1 + combo * 0.1, 2)}
        maxCombo={maxCombo}
        superNetLevel={superNetLevel}
        superNetBonus={superNetLevel * 5}
        superNetCost={getSuperNetCost()}
        onUpgradeSuperNet={upgradeSuperNet}
        autoClickerLevel={autoClickerLevel}
        autoClickerCost={getAutoClickerCost()}
        onUpgradeAutoClicker={upgradeAutoClicker}
        magnetLevel={magnetLevel}
        magnetCost={getMagnetCost()}
        onUpgradeMagnet={upgradeMagnet}
        luckyLevel={luckyLevel}
        luckyCost={getLuckyCost()}
        onUpgradeLucky={upgradeLucky}
        comboMasterLevel={comboMasterLevel}
        comboMasterCost={getComboMasterCost()}
        onUpgradeComboMaster={upgradeComboMaster}
      />
      <StatsMenu
        isOpen={isStatsMenuOpen}
        onToggle={() => setIsStatsMenuOpen((prev) => !prev)}
        collection={collection}
        totalClicks={totalClicks}
        totalGoldenFishCaught={totalGoldenFishCaught}
        totalBonusFishCaught={totalBonusFishCaught}
        totalClickerFishCaught={totalClickerFishCaught}
        totalFrenzyFishCaught={totalFrenzyFishCaught}
        getProgress={getProgress}
        fishCount={count}
        totalCurseFishCaught={totalCurseFishCaught}
        achievements={[
          {
            id: 1,
            name: "Click Novice",
            description: "Click 1,000 times",
            unlocked: totalClicks >= 1000,
            progress: {
              current: totalClicks,
              required: 1000,
            },
          },
          {
            id: 2,
            name: "Click Apprentice",
            description: "Click 5,000 times",
            unlocked: totalClicks >= 5000,
            progress: {
              current: totalClicks,
              required: 5000,
            },
          },
          {
            id: 3,
            name: "Click Enthusiast",
            description: "Click 10,000 times",
            unlocked: totalClicks >= 10000,
            progress: {
              current: totalClicks,
              required: 10000,
            },
          },
          {
            id: 4,
            name: "Click Expert",
            description: "Click 20,000 times",
            unlocked: totalClicks >= 20000,
            progress: {
              current: totalClicks,
              required: 20000,
            },
          },
          {
            id: 5,
            name: "Click Master",
            description: "Click 50,000 times",
            unlocked: totalClicks >= 50000,
            progress: {
              current: totalClicks,
              required: 50000,
            },
          },
          {
            id: 6,
            name: "Click Champion",
            description: "Click 100,000 times",
            unlocked: totalClicks >= 100000,
            progress: {
              current: totalClicks,
              required: 100000,
            },
          },
          {
            id: 7,
            name: "Click Legend",
            description: "Click 500,000 times",
            unlocked: totalClicks >= 500000,
            progress: {
              current: totalClicks,
              required: 500000,
            },
          },
          {
            id: 8,
            name: "Click Millionaire",
            description: "Click 1,000,000 times",
            unlocked: totalClicks >= 1000000,
            progress: {
              current: totalClicks,
              required: 1000000,
            },
          },
          {
            id: 9,
            name: "Click Deity",
            description: "Click 10,000,000 times",
            unlocked: totalClicks >= 10000000,
            progress: {
              current: totalClicks,
              required: 10000000,
            },
          },
          {
            id: 10,
            name: "Click God",
            description: "Click 100,000,000 times",
            unlocked: totalClicks >= 100000000,
            progress: {
              current: totalClicks,
              required: 100000000,
            },
          },
          // Collection achievements
          {
            id: 11,
            name: "Novice Collector",
            description: "Collect 25% of all fish",
            unlocked: collection.size / TOTAL_UNIQUE_FISH >= 0.25,
            progress: {
              current: collection.size,
              required: Math.ceil(TOTAL_UNIQUE_FISH * 0.25),
            },
          },
          {
            id: 12,
            name: "Advanced Collector",
            description: "Collect 50% of all fish",
            unlocked: collection.size / TOTAL_UNIQUE_FISH >= 0.5,
            progress: {
              current: collection.size,
              required: Math.ceil(TOTAL_UNIQUE_FISH * 0.5),
            },
          },
          {
            id: 13,
            name: "Expert Collector",
            description: "Collect 75% of all fish",
            unlocked: collection.size / TOTAL_UNIQUE_FISH >= 0.75,
            progress: {
              current: collection.size,
              required: Math.ceil(TOTAL_UNIQUE_FISH * 0.75),
            },
          },
          {
            id: 14,
            name: "Master Collector",
            description: "Collect 100% of all fish",
            unlocked: collection.size >= TOTAL_UNIQUE_FISH,
            progress: {
              current: collection.size,
              required: TOTAL_UNIQUE_FISH,
            },
          },
        ]}
      />
    </motion.div>
  );
}

export default App;
