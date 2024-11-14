"use client";

import { useState, useEffect } from "react";
import { getCookie, setCookie } from "./cookie";

export const useTheme = () => {
  const [isDarkMode, setIsDarkMode] = useState(true);
  useEffect(() => {
    const savedTheme = getCookie("theme");
    const initialMode = savedTheme ? savedTheme === "dark" : true;
    setIsDarkMode(initialMode);

    document.documentElement.classList.toggle("light-mode", !initialMode);
  }, []);

  const toggleTheme = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);

    document.documentElement.classList.toggle("light-mode", !newMode);
    setCookie("theme", newMode ? "dark" : "light");
  };

  return { isDarkMode, toggleTheme };
};

export default useTheme;
