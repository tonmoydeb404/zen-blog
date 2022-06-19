import Link from "next/link";
import { siteNav } from "../../lib/constant";

const NavLinks = ({ className = "" }) => {
  return siteNav && siteNav.length ? (
    <ul className={`nav_links ${className}`}>
      {siteNav.map((navLink) => (
        <Link
          key={navLink.id}
          href={navLink.url}
          target={navLink.newTab ? "_blank" : "_self"}
        >
          <a className="nav_links_item">{navLink.title}</a>
        </Link>
      ))}
    </ul>
  ) : (
    <div></div>
  );
};

export default NavLinks;
