import { useEffect, useState } from "react";
import { fetchCategories } from "../services";

const useCategories = () => {
  const [categoriesData, setCategoriesData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState({});

  // load categories
  useEffect(() => {
    const getCategories = async () => {
      try {
        setLoading(true);
        setErrors({});
        const cates = await fetchCategories();
        setCategoriesData(cates);
        setLoading(false);
        setErrors({});
      } catch (error) {
        setErrors(error);
        setLoading(false);
      }
    };

    getCategories();
  }, []);
  return {
    categoriesData,
    categoriesLoading: loading,
    categoriesErrors: errors,
  };
};

export default useCategories;
