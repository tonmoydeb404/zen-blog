import Link from "next/link";
import NavLinks from "./NavLinks";
import NavSearch from "./NavSearch";
import NavTheme from "./NavTheme";

const Nav = () => {
  return (
    <>
      <nav className="nav py-3 shadow-sm shadow-gray-300 sticky top-0 bg-white z-[99999]">
        <div className="nav_container container flex items-center gap-10 flex-wrap">
          <Link href={"/"}>
            <a>
              <h1 className="nav_brand text-2xl font-bold cursor-pointer">
                <span className="text-green-600">NEXT</span> Blog
              </h1>
            </a>
          </Link>

          <NavLinks className="hidden md:flex" />

          <div className="nav_actions ml-auto inline-flex items-center gap-5">
            <NavTheme />
            <NavSearch />
          </div>
        </div>
      </nav>

      <div className="nav_container-mobile container mt-0.5 py-2 bg-white overflow-x-auto shadow-sm shadow-gray-300 md:hidden ">
        <NavLinks className="text-sm" />
      </div>
    </>
  );
};

export default Nav;
