export const settings = {
  sound: {
    enabled: true,
    volume: 0.3,
  },
  mainFish: {
    changeInterval: 60000,
  },
  fish: {
    spawnInterval: 10000,
    bonusMultiplier: 0.1,
    fallDuration: 8,
  },
  goldenFish: {
    spawnInterval: 30000,
    minBonus: 20,
    maxBonus: 50,
    fallDuration: 12,
  },
  clickerFish: {
    spawnInterval: 60000, // Every minute
    minClicks: 1,
    maxClicks: 100,
  },
};

// You can also export individual settings for easier imports
export const soundSettings = settings.sound;
export const fishSettings = settings.fish;
export const goldenFishSettings = settings.goldenFish;
export const mainFishSettings = settings.mainFish;
