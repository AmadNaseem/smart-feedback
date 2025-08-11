import { useEffect } from "react";

export function ThemeProvider({ children }) {
  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.add("dark");
  }, []);
  return children;
}

export const useTheme = () => ({ theme: 'dark' });
