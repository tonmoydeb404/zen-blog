import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { defaultTheme } from "../lib/constant";

const ThemeContext = createContext(defaultTheme);

export const useThemeContext = () => useContext(ThemeContext);
export const ThemeContextProvider = ({ children }) => {
  const [theme, setTheme] = useState(defaultTheme);
  const isMounted = useRef(false);

  // update theme on mount
  useEffect(() => {
    const localTheme = localStorage.getItem("zen-blog-theme");
    if (localTheme !== null && typeof localTheme === "string") {
      setTheme(localTheme);
    }
  }, []);

  // save theme on state change
  useEffect(() => {
    if (isMounted.current) {
      localStorage.setItem("zen-blog-theme", theme);
    } else {
      isMounted.current = true;
    }
  }, [theme]);

  // update theme in html
  useEffect(() => {
    if (document) {
      document.documentElement.classList.remove(
        theme === "dark" ? "light" : "dark"
      );
      document.documentElement.classList.add(theme);
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "dark" ? "light" : "dark"));
  };

  const value = useMemo(
    () => ({
      theme,
      setTheme,
      toggleTheme,
    }),
    [theme]
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};
