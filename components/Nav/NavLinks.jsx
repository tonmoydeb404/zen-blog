import Link from "next/link";

const NavLinks = ({
  className = "",
  navlinks = [
    { title: "Home", url: "url", id: "#1", newTab: false },
    { title: "Youtube", slug: "url", url: "url", id: "#2", newTab: false },
    { title: "Javascript", slug: "url", url: "url", id: "#3", newTab: false },
    { title: "React JS", slug: "url", url: "url", id: "#4", newTab: false },
  ],
}) => {
  return navlinks && navlinks.length ? (
    <ul
      className={`nav_links flex items-center gap-5 text-gray-900 ${className}`}
    >
      {navlinks.map((navLink) => (
        <Link
          key={navLink.id}
          href={navLink.url}
          target={navLink.newTab ? "_blank" : "_self"}
        >
          <span className="nav_links_item font-medium  cursor-pointer hover:text-green-600 duration-200">
            {navLink.title}
          </span>
        </Link>
      ))}
    </ul>
  ) : (
    <div></div>
  );
};

export default NavLinks;
