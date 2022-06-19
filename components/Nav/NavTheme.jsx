import { MdDarkMode, MdLightMode } from "react-icons/md";
import { useThemeContext } from "../../contexts/ThemeContext";

const NavTheme = () => {
  const { theme, toggleTheme } = useThemeContext();

  return (
    <button className="nav_theme_btn" onClick={toggleTheme}>
      {theme === "light" ? <MdDarkMode /> : <MdLightMode />}
    </button>
  );
};

export default NavTheme;
