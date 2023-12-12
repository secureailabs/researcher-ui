// hook from https://usehooks.com/useKeyPress/
import { useState, useEffect } from "react";

// Hook
export default function useKeyPress(targetKey: string) {
  // State for keeping track of whether key is pressed
  const [keyPressed, setKeyPressed] = useState(false);

  // If pressed key is our target key then set to true
  const downHandler = (e : KeyboardEvent) => {
    if (e.key === targetKey) {
      setKeyPressed(true);
    }
  };

  // If released key is our target key then set to false
  const upHandler = ( e : KeyboardEvent ) => {
    if (e.key === targetKey) {
      setKeyPressed(false);
    }
  };

  // Add event listeners
  useEffect(() => {
    window.addEventListener("keydown", downHandler);
    window.addEventListener("keyup", upHandler);
    // Remove event listeners 
    return () => {
      window.removeEventListener("keydown", downHandler);
      window.removeEventListener("keyup", upHandler);
    };
  }, []);

  return keyPressed;
};
