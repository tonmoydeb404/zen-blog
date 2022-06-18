import { MdDarkMode } from "react-icons/md";

const NavTheme = () => {
  return (
    <button className="nav_theme_btn text-2xl p-1 rounded-full hover:bg-green-100 text-green-600 duration-200">
      <MdDarkMode />
    </button>
  );
};

export default NavTheme;
