export const settings = {
  sound: {
    enabled: true,
    volume: 0.3,
  },
  mainFish: {
    changeInterval: 60000,
  },
  fish: {
    spawnInterval: 5000,
    bonusMultiplier: 0.1,
    fallDuration: 4,
  },
  goldenFish: {
    spawnInterval: 15000,
    minBonus: 20,
    maxBonus: 50,
    fallDuration: 2,
  },
  clickerFish: {
    spawnInterval: 60000,
    minClicks: 1,
    maxClicks: 100,
    fallDuration: 4,
  },
  curseFish: {
    spawnInterval: 30000,
    fallDuration: 3.5,
  },
};

// You can also export individual settings for easier imports
export const soundSettings = settings.sound;
export const fishSettings = settings.fish;
export const goldenFishSettings = settings.goldenFish;
export const mainFishSettings = settings.mainFish;
