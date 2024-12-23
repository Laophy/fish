import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "../../context/ThemeContext";
import { useSound } from "../../context/SoundContext";
import "./UpgradeMenu.css";
import { formatNumber } from "../../utils/numberFormatter";

const getCostStyle = (fishCount, cost, isDarkMode) => ({
  color:
    fishCount >= cost
      ? "#4CAF50" // Green when affordable
      : "#FF5252", // Red when can't afford
  fontWeight: "bold",
});

const UpgradeMenu = ({
  isOpen,
  onToggle,
  clickPower,
  multiplier,
  onUpgradeClickPower,
  onUpgradeMultiplier,
  fishCount,
  clickPowerCost,
  multiplierCost,
  totalClicks,
  comboMultiplier,
  maxCombo,
  superNetLevel,
  superNetBonus,
  superNetCost,
  onUpgradeSuperNet,
  autoClickerLevel,
  autoClickerCost,
  onUpgradeAutoClicker,
  magnetLevel,
  magnetCost,
  onUpgradeMagnet,
  luckyLevel,
  luckyCost,
  onUpgradeLucky,
  comboMasterLevel,
  comboMasterCost,
  onUpgradeComboMaster,
}) => {
  const { isDarkMode } = useTheme();
  const { playClickSound } = useSound();

  const handleUpgrade = (upgradeFunction, cost) => {
    if (fishCount >= cost) {
      upgradeFunction();
      playClickSound();
    }
  };

  const effectiveClickPower = Number(
    ((clickPower + superNetBonus) * multiplier * comboMultiplier).toFixed(2)
  );

  return (
    <div className="upgrade-menu-container">
      <motion.button
        className={`upgrade-toggle-btn ${isDarkMode ? "dark" : "light"}`}
        onClick={onToggle}
        animate={{
          right: isOpen ? "380px" : "0px",
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
            transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
            transition: "transform 0.3s ease",
          }}
        >
          <path d="M19 12H5M12 19l-7-7 7-7" />
        </svg>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className={`upgrade-menu ${isDarkMode ? "dark" : "light"}`}
            initial={{ x: 344, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 344, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            <h2>Stats</h2>
            <div className="stats-container">
              <div className="stats-section">
                <div className="stat-item">
                  <span className="stat-label">Total Clicks:</span>
                  <span className="stat-value">
                    {totalClicks.toLocaleString()}
                  </span>
                </div>
                <div className="stat-item">
                  <span className="stat-label">Base Fish per Click:</span>
                  <span className="stat-value">
                    {(clickPower + superNetBonus).toLocaleString()}
                  </span>
                </div>
                <div className="stat-item">
                  <span className="stat-label">Effective Fish per Click:</span>
                  <span className="stat-value">
                    {effectiveClickPower.toLocaleString()}
                  </span>
                </div>
                <div className="stat-item">
                  <span className="stat-label">Base Multiplier:</span>
                  <span className="stat-value">{multiplier.toFixed(2)}x</span>
                </div>
                <div className="stat-item">
                  <span className="stat-label">Current Combo:</span>
                  <span className="stat-value">
                    {comboMultiplier.toFixed(2)}x
                  </span>
                </div>
                <div className="stat-item">
                  <span className="stat-label">Max Combo:</span>
                  <span className="stat-value">{maxCombo}</span>
                </div>
                <div className="stat-item">
                  <span className="stat-label">Total Fish:</span>
                  <span className="stat-value">{formatNumber(fishCount)}</span>
                </div>
                <div className="stat-item">
                  <span className="stat-label">Super Net Bonus:</span>
                  <span className="stat-value">+{superNetBonus}</span>
                </div>
              </div>
            </div>

            <h2>Upgrades</h2>
            <div className="upgrades-container">
              <div className="upgrade-item">
                <div className="upgrade-info">
                  <h3>Click Power</h3>
                  <p>Current: {clickPower}</p>
                  <div
                    className="upgrade-cost"
                    style={getCostStyle(fishCount, clickPowerCost, isDarkMode)}
                  >
                    Cost: {formatNumber(clickPowerCost)} fish
                  </div>
                </div>
                <button
                  className={`upgrade-btn ${
                    fishCount >= clickPowerCost ? "" : "disabled"
                  }`}
                  onClick={() =>
                    handleUpgrade(onUpgradeClickPower, clickPowerCost)
                  }
                  disabled={fishCount < clickPowerCost}
                >
                  Upgrade
                </button>
              </div>

              <div className="upgrade-item">
                <div className="upgrade-info">
                  <h3>Multiplier</h3>
                  <p>Current: {multiplier.toFixed(2)}x</p>
                  <div
                    className="upgrade-cost"
                    style={getCostStyle(fishCount, multiplierCost, isDarkMode)}
                  >
                    Cost: {formatNumber(multiplierCost)} fish
                  </div>
                </div>
                <button
                  className={`upgrade-btn ${
                    fishCount >= multiplierCost ? "" : "disabled"
                  }`}
                  onClick={() =>
                    handleUpgrade(onUpgradeMultiplier, multiplierCost)
                  }
                  disabled={fishCount < multiplierCost}
                >
                  Upgrade
                </button>
              </div>

              <div className="upgrade-item">
                <div className="upgrade-info">
                  <h3>Super Net</h3>
                  <p>Level: {superNetLevel}</p>
                  <p>Bonus: +{superNetBonus} clicks</p>
                  <div
                    className="upgrade-cost"
                    style={getCostStyle(fishCount, superNetCost, isDarkMode)}
                  >
                    Cost: {formatNumber(superNetCost)} fish
                  </div>
                </div>
                <button
                  className={`upgrade-btn ${
                    fishCount >= superNetCost ? "" : "disabled"
                  }`}
                  onClick={() => handleUpgrade(onUpgradeSuperNet, superNetCost)}
                  disabled={fishCount < superNetCost}
                >
                  Upgrade
                </button>
              </div>

              <div className="upgrade-item">
                <div className="upgrade-info">
                  <h3>Auto-Clicker</h3>
                  <p>Level: {autoClickerLevel}</p>
                  <p>Effect: {autoClickerLevel} clicks per second</p>
                  <div
                    className="upgrade-cost"
                    style={getCostStyle(fishCount, autoClickerCost, isDarkMode)}
                  >
                    Cost: {formatNumber(autoClickerCost)} fish
                  </div>
                </div>
                <button
                  className={`upgrade-btn ${
                    fishCount >= autoClickerCost ? "" : "disabled"
                  }`}
                  onClick={() =>
                    handleUpgrade(onUpgradeAutoClicker, autoClickerCost)
                  }
                  disabled={fishCount < autoClickerCost}
                >
                  Upgrade
                </button>
              </div>

              <div className="upgrade-item">
                <div className="upgrade-info">
                  <h3>Fish Magnet</h3>
                  <p>Level: {magnetLevel}</p>
                  <p>Duration: +{(magnetLevel * 0.5).toFixed(1)} seconds</p>
                  <div
                    className="upgrade-cost"
                    style={getCostStyle(fishCount, magnetCost, isDarkMode)}
                  >
                    Cost: {formatNumber(magnetCost)} fish
                  </div>
                </div>
                <button
                  className={`upgrade-btn ${
                    fishCount >= magnetCost ? "" : "disabled"
                  }`}
                  onClick={() => handleUpgrade(onUpgradeMagnet, magnetCost)}
                  disabled={fishCount < magnetCost}
                >
                  Upgrade
                </button>
              </div>

              <div className="upgrade-item">
                <div className="upgrade-info">
                  <h3>Lucky Fisher</h3>
                  <p>Level: {luckyLevel}</p>
                  <p>Bonus: +{luckyLevel * 5}% special fish chance</p>
                  <div
                    className="upgrade-cost"
                    style={getCostStyle(fishCount, luckyCost, isDarkMode)}
                  >
                    Cost: {formatNumber(luckyCost)} fish
                  </div>
                </div>
                <button
                  className={`upgrade-btn ${
                    fishCount >= luckyCost ? "" : "disabled"
                  }`}
                  onClick={() => handleUpgrade(onUpgradeLucky, luckyCost)}
                  disabled={fishCount < luckyCost}
                >
                  Upgrade
                </button>
              </div>

              <div className="upgrade-item">
                <div className="upgrade-info">
                  <h3>Combo Master</h3>
                  <p>Level: {comboMasterLevel}</p>
                  <p>
                    Duration: +{(comboMasterLevel * 0.2).toFixed(1)} seconds
                  </p>
                  <div
                    className="upgrade-cost"
                    style={getCostStyle(fishCount, comboMasterCost, isDarkMode)}
                  >
                    Cost: {formatNumber(comboMasterCost)} fish
                  </div>
                </div>
                <button
                  className={`upgrade-btn ${
                    fishCount >= comboMasterCost ? "" : "disabled"
                  }`}
                  onClick={() =>
                    handleUpgrade(onUpgradeComboMaster, comboMasterCost)
                  }
                  disabled={fishCount < comboMasterCost}
                >
                  Upgrade
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default UpgradeMenu;
