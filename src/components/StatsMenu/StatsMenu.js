import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "../../context/ThemeContext";
import { useSound } from "../../context/SoundContext";
import { TOTAL_UNIQUE_FISH } from "../../hooks/useFishCollection";
import { formatNumber } from "../../utils/numberFormatter";
import "./StatsMenu.css";

const StatsMenu = ({
  isOpen,
  onToggle,
  collection,
  totalClicks,
  totalGoldenFishCaught,
  totalBonusFishCaught,
  totalClickerFishCaught,
  totalFrenzyFishCaught,
  achievements = [],
  getProgress,
  totalCurseFishCaught,
}) => {
  const { isDarkMode } = useTheme();
  const { playClickSound } = useSound();

  return (
    <div className="stats-menu-container">
      <motion.button
        className={`stats-toggle-btn ${isDarkMode ? "dark" : "light"}`}
        onClick={onToggle}
        animate={{
          left: isOpen ? "340px" : "0px", // Menu width
        }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke={isDarkMode ? "#fff" : "#000"}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{
            transform: isOpen ? "rotate(0deg)" : "rotate(180deg)",
            transition: "transform 0.3s ease",
          }}
        >
          <path d="M19 12H5M12 19l-7-7 7-7" />
        </svg>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className={`stats-menu ${isDarkMode ? "dark" : "light"}`}
            initial={{ x: -344, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -344, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            <h2>Collections</h2>
            <div className="stats-section">
              <div className="stat-item">
                <span className="stat-label">Fish Collection:</span>
                <span className="stat-value">
                  {collection.size} / {TOTAL_UNIQUE_FISH} (
                  {getProgress().percentage}%)
                </span>
              </div>
              <div className="stat-item">
                <span className="stat-label">Collection Progress:</span>
                <div className="progress-bar">
                  <div
                    className="progress-fill"
                    style={{
                      width: `${(collection.size / TOTAL_UNIQUE_FISH) * 100}%`,
                    }}
                  />
                </div>
              </div>
            </div>

            <h2>Special Fish Caught</h2>
            <div className="stats-section">
              <div className="stat-item">
                <span className="stat-label">Golden Fish:</span>
                <span className="stat-value">
                  {totalGoldenFishCaught.toLocaleString()}
                </span>
              </div>
              <div className="stat-item">
                <span className="stat-label">Bonus Fish:</span>
                <span className="stat-value">
                  {totalBonusFishCaught.toLocaleString()}
                </span>
              </div>
              <div className="stat-item">
                <span className="stat-label">Clicker Fish:</span>
                <span className="stat-value">
                  {totalClickerFishCaught.toLocaleString()}
                </span>
              </div>
              <div className="stat-item">
                <span className="stat-label">Curse Fish:</span>
                <span className="stat-value">
                  {totalCurseFishCaught.toLocaleString()}
                </span>
              </div>
            </div>

            <h2>Achievements</h2>
            <div className="achievements-section">
              {achievements.map((achievement) => (
                <div
                  key={achievement.id}
                  className={`achievement-item ${
                    achievement.unlocked ? "unlocked" : "locked"
                  }`}
                >
                  <div className="achievement-icon">
                    {achievement.unlocked ? "🏆" : "🔒"}
                  </div>
                  <div className="achievement-info">
                    <h3>{achievement.name}</h3>
                    <p>{achievement.description}</p>
                    {!achievement.unlocked && achievement.progress && (
                      <div className="progress-bar">
                        <div
                          className="progress-fill"
                          style={{
                            width: `${
                              (achievement.progress.current /
                                achievement.progress.required) *
                              100
                            }%`,
                          }}
                        />
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default StatsMenu;
