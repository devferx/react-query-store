import { useQuery } from "@tanstack/react-query";
import { productActions } from "..";

interface Options {
  filterKey?: string;
}

export const useProducts = ({ filterKey }: Options) => {
  const {
    isLoading,
    isError,
    error,
    isFetching,
    data: products = [],
  } = useQuery({
    queryKey: ["products", { filterKey }],
    queryFn: () => productActions.getProducts({ filterKey }),
    staleTime: 1000 * 60 * 60, // 1 hour
  });

  return {
    error,
    isError,
    isLoading,
    isFetching,
    products,
  };
};
