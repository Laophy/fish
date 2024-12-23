import { useState, useEffect } from "react";
import { FISH_TYPES } from "../constants/fishTypes";

export const TOTAL_FISH_PER_TYPE = 100; // Number of fish per type
export const TOTAL_STYLES = 6; // Number of styles/rarities
export const TOTAL_UNIQUE_FISH = TOTAL_FISH_PER_TYPE * TOTAL_STYLES;

export function useFishCollection() {
  const [collection, setCollection] = useState(() => {
    try {
      const saved = localStorage.getItem("fishCollection");
      // Convert the saved array back to a Set
      return saved ? new Set(JSON.parse(saved)) : new Set();
    } catch (error) {
      console.error("Error loading fish collection:", error);
      return new Set();
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem("fishCollection", JSON.stringify([...collection]));
    } catch (error) {
      console.error("Error saving fish collection:", error);
    }
  }, [collection]);

  const addToCollection = (fish) => {
    setCollection((prev) => {
      const newCollection = new Set(prev);
      // Create a unique identifier for each fish variation
      const fishId = `${fish.type}_${fish.number}_${fish.style || "normal"}`;
      newCollection.add(fishId);
      return newCollection;
    });
  };

  const getProgress = () => {
    const size = collection.size || 0; // Ensure we have a number even if collection is empty
    const percentage =
      size === 0
        ? "0.0" // Return "0.0" when no fish collected
        : ((size / TOTAL_UNIQUE_FISH) * 100).toFixed(1);

    return {
      current: size,
      total: TOTAL_UNIQUE_FISH,
      percentage,
    };
  };

  return {
    collection,
    addToCollection,
    getProgress,
  };
}
