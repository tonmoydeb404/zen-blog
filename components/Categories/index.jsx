import { BiSad } from "react-icons/bi";
import useCategories from "../../hooks/useCategories";
import CategoriesItem from "./CategoriesItem";

const Categories = () => {
  const { categoriesData } = useCategories();

  return (
    <div className="categories py-3 px-4 border border-gray-300 rounded-sm">
      <h3 className="categories_header text-xl font-semibold mb-3">
        Categories
      </h3>

      <div className="categories_body flex-col gap-3 flex">
        {categoriesData && categoriesData.length ? (
          categoriesData.map((category) => (
            <CategoriesItem
              title={category.node?.title}
              posts={category.node?.posts}
              slug={category.node?.slug}
              key={category.node?.id}
            />
          ))
        ) : (
          <p className="categories_none tect-sm text-gray-500 flex flex-col items-center gap-1 py-2">
            <span className="text-2xl">
              <BiSad />
            </span>
            no categories available
          </p>
        )}
      </div>
    </div>
  );
};

export default Categories;
