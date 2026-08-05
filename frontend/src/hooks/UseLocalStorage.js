import { useState, useEffect } from "react";

function UseLocalStorage(key, initialValue) {
  // LocalStorage se data uthao
  const [value, setValue] = useState(() => {
    const savedData = localStorage.getItem(key);

    if (savedData) {
      return JSON.parse(savedData);
    }

    return initialValue;
  });

  // Data change hote hi LocalStorage me save karo
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
}

export default UseLocalStorage;