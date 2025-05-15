import { useEffect, useState } from "react";

export const useOnePercentChance = (showTime)=> {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const initialDelay = setTimeout(() => {
      const chance = Math.floor(Math.random() * 100);
      if (chance === 0) {
        setIsVisible(true);
        const hideTimer = setTimeout(() => {
          setIsVisible(false);
        }, showTime);

        return () => clearTimeout(hideTimer);
      }
    }, 10000);

    return () => clearTimeout(initialDelay);
  }, [showTime]);

  return isVisible;
}