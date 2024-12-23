import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
} from "react";

const SoundContext = createContext();

// Create a pool of audio elements to reuse
const AUDIO_POOL_SIZE = 5;
const createAudioPool = () => {
  const pool = [];
  for (let i = 0; i < AUDIO_POOL_SIZE; i++) {
    const audio = new Audio();
    audio.src = "./sounds/click.mp3";
    audio.volume = 0.3;
    pool.push(audio);
  }
  return pool;
};

export function SoundProvider({ children }) {
  const [isSoundEnabled, setIsSoundEnabled] = useState(() => {
    const saved = localStorage.getItem("isSoundEnabled");
    return saved !== null ? JSON.parse(saved) : true;
  });

  const audioPool = useRef(createAudioPool());
  const currentAudioIndex = useRef(0);
  const lastPlayTime = useRef(0);

  useEffect(() => {
    localStorage.setItem("isSoundEnabled", JSON.stringify(isSoundEnabled));
  }, [isSoundEnabled]);

  const toggleSound = () => {
    setIsSoundEnabled((prev) => !prev);
  };

  const playClickSound = () => {
    if (!isSoundEnabled) return;

    // Throttle sound playback to maximum once every 50ms
    const now = Date.now();
    if (now - lastPlayTime.current < 50) return;
    lastPlayTime.current = now;

    // Reuse audio elements from the pool
    const audio = audioPool.current[currentAudioIndex.current];
    currentAudioIndex.current =
      (currentAudioIndex.current + 1) % AUDIO_POOL_SIZE;

    // Reset and play
    audio.currentTime = 0;
    audio.play().catch((err) => console.log("Sound play error:", err));
  };

  // Clean up audio elements on unmount
  useEffect(() => {
    return () => {
      audioPool.current.forEach((audio) => {
        audio.pause();
        audio.src = "";
      });
      audioPool.current = [];
    };
  }, []);

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
