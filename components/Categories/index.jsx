import useCategories from "../../hooks/useCategories";
import CategoriesBody from "./CategoriesBody";

const Categories = () => {
  const { categoriesData, categoriesLoading, categoriesErrors } =
    useCategories();

  return (
    <div className="widget categories">
      <h3 className="widget_header text-xl">Categories</h3>

      <CategoriesBody
        data={categoriesData}
        loading={categoriesLoading}
        error={categoriesErrors}
      />
    </div>
  );
};

export default Categories;
