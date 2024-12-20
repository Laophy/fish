import { useState, useEffect } from "react";
import moment from "moment";

export function usePlayTime() {
  const [playTime, setPlayTime] = useState(() => {
    const savedPlayTime = localStorage.getItem("playTime");
    return savedPlayTime ? parseInt(savedPlayTime, 10) : 0;
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setPlayTime((prevTime) => {
        const newTime = prevTime + 1;
        localStorage.setItem("playTime", newTime.toString());
        return newTime;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatPlayTime = (seconds) => {
    const duration = moment.duration(seconds, "seconds");
    const days = Math.floor(duration.asDays());
    const hours = duration.hours();
    const mins = duration.minutes();
    const secs = duration.seconds();

    return `${days}d ${hours}h ${mins}m ${secs}s`;
  };

  return [playTime, formatPlayTime(playTime)];
}
