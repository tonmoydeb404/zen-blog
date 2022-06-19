import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { BiSad } from "react-icons/bi";
import { MdSearch } from "react-icons/md";
import useCategories from "../../hooks/useCategories";

const NavSearch = () => {
  const [modal, setModal] = useState(false);
  const { categoriesData } = useCategories();
  const [query, setQuery] = useState("");
  const router = useRouter();
  const searchRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    router.push(`/search?q=${query.toLowerCase()}`);
    setQuery("");
    setModal(false);
  };

  useEffect(() => {
    if (modal && searchRef.current) {
      searchRef.current.focus();
    }
  }, [modal]);

  return (
    <>
      <button
        className="nav_search_btn "
        onClick={() => setModal((prevState) => !prevState)}
      >
        <MdSearch />
      </button>

      <div
        className={`nav_search_modal ${modal ? "show" : "hide"}`}
        id="modal"
        onClick={(e) => e.target.id === "modal" && setModal(false)}
      >
        <form className="nav_search_form" onSubmit={handleSubmit}>
          <div className="nav_search_input_box ">
            <MdSearch className="text-xl" />
            <input
              type="search"
              className="nav_search_input "
              placeholder="Search article"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              ref={searchRef}
            />
          </div>

          <div className="nav_search_suggest">
            {categoriesData && categoriesData.length ? (
              <>
                <h3 className="nav_search_suggest_title ">
                  visit articles category:
                </h3>
                <div className="nav_search_suggest_list ">
                  {categoriesData.map((category) => (
                    <Link
                      key={category.node?.id}
                      href={`/categories/${category.node?.slug}`}
                    >
                      <a
                        onClick={() => setModal(false)}
                        className="nav_search_suggest_item"
                      >
                        {category.node?.title}
                      </a>
                    </Link>
                  ))}
                </div>
              </>
            ) : (
              <p className="nav_search_suggest_none">
                {" "}
                <BiSad /> sorry no suggestions
              </p>
            )}
          </div>
        </form>
      </div>
    </>
  );
};

export default NavSearch;
