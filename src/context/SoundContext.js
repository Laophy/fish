import React, { createContext, useContext, useRef } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { settings } from "../config/settings";

const SoundContext = createContext();

export function SoundProvider({ children }) {
  const [isSoundEnabled, setSoundEnabled] = useLocalStorage(
    "soundEnabled",
    true
  );
  const audioRef = useRef(new Audio("/sounds/click.mp3"));
  audioRef.current.volume = settings.sound.volume;

  const playClickSound = () => {
    if (isSoundEnabled) {
      audioRef.current.currentTime = 0;
      audioRef.current.play();
    }
  };

  const toggleSound = () => {
    setSoundEnabled(!isSoundEnabled);
    audioRef.current.currentTime = 0;
    audioRef.current.play();
  };

  return (
    <SoundContext.Provider
      value={{ isSoundEnabled, toggleSound, playClickSound }}
    >
      {children}
    </SoundContext.Provider>
  );
}

export function useSound() {
  return useContext(SoundContext);
}
