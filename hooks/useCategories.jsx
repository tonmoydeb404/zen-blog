import request from "graphql-request";
import useSWR from "swr";
import { getCategoriesQuery } from "../lib/graphql";

const CMS_ENDPOINT = process.env.CMS_ENDPOINT;

const fetcher = (query) => request(CMS_ENDPOINT, query);

const useCategories = () => {
  const { data, error } = useSWR(getCategoriesQuery, fetcher);

  return {
    categoriesData: data?.categories || [],
    categoriesLoading: !data && !error,
    categoriesErrors: error,
  };
};

export default useCategories;
