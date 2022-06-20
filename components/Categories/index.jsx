import { BiSad } from "react-icons/bi";
import useCategories from "../../hooks/useCategories";
import CategoriesItem from "./CategoriesItem";

const Categories = () => {
  const { categoriesData } = useCategories();

  return (
    <div className="widget categories">
      <h3 className="widget_header text-xl">Categories</h3>

      <div className="widget_body">
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
          <p className="widget_none">
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
