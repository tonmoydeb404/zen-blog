import { useEffect, useState } from "react";
import { getCategories } from "../services";

const useCategories = () => {
  const [categoriesData, setCategoriesData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState({});

  // load categories
  useEffect(() => {
    const getCategoriesFunc = async () => {
      try {
        setLoading(true);
        setErrors({});
        const data = await getCategories();
        setCategoriesData(data.categories);
        setLoading(false);
        setErrors({});
      } catch (error) {
        setErrors(error);
        setLoading(false);
      }
    };

    getCategoriesFunc();
  }, []);
  return {
    categoriesData,
    categoriesLoading: loading,
    categoriesErrors: errors,
  };
};

export default useCategories;
