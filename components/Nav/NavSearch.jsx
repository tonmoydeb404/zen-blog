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
        className="nav_search_btn text-2xl p-1 rounded-full hover:bg-gray-100 text-gray-900 duration-200"
        onClick={() => setModal((prevState) => !prevState)}
      >
        <MdSearch />
      </button>

      <div
        className={`modal fixed w-full min-h-screen top-0 left-0 flex items-center justify-center flex-col bg-black/30 backdrop-blur-sm overflow-hidden duration-200 ${
          modal
            ? "opacity-100 pointer-events-auto"
            : " opacity-0 pointer-events-none"
        }`}
        id="modal"
        onClick={(e) => e.target.id === "modal" && setModal(false)}
      >
        <form className="search_form" onSubmit={handleSubmit}>
          <div className="search_input_box bg-white flex items-center px-5 py-3 gap-2 text-base rounded shadow shadow-gray-400">
            <MdSearch className="text-xl" />
            <input
              type="search"
              className="search_input outline-none w-[500px]"
              placeholder="Search article"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              ref={searchRef}
            />
          </div>

          <div className="search_recomendations bg-white mt-5 px-5 py-4 rounded">
            {categoriesData && categoriesData.length ? (
              <>
                <h3 className="search_recomendations_title font-medium text-base">
                  visit articles category:{" "}
                </h3>
                <div className="search_recomendations_list mt-2 flex flex-wrap gap-1">
                  {categoriesData.map((category) => (
                    <Link
                      key={category.node?.id}
                      href={`/categories/${category.node?.slug}`}
                    >
                      <a
                        onClick={() => setModal(false)}
                        className="text-sm px-2 py-1 border border-green-600 rounded-sm hover:bg-green-600 hover:text-white duration-200"
                      >
                        {category.node?.title}
                      </a>
                    </Link>
                  ))}
                </div>
              </>
            ) : (
              <p className="text-center flex items-center justify-center gap-1 text-gray-600">
                {" "}
                <BiSad /> sorry no recomendations
              </p>
            )}
          </div>
        </form>
      </div>
    </>
  );
};

export default NavSearch;
