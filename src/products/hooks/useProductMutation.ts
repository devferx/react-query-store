import { useMutation, useQueryClient } from "@tanstack/react-query";
import { type Product, productActions } from "..";

export const useProductMutation = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: productActions.createProduct,
    onMutate: (product) => {
      console.log("Mutando - Optimistic update");

      const optimisticProduct: Product = {
        ...product,
        id: Math.random(),
      };

      queryClient.setQueryData<Product[]>(
        ["products", { filterKey: product.category }],
        (oldData: Product[] | undefined) => {
          if (!oldData) return [optimisticProduct];

          return [...oldData, optimisticProduct];
        },
      );

      // Store the product in the cache of query client
    },
    onSuccess: (product) => {
      // queryClient.invalidateQueries({
      //   queryKey: ["products", { filterKey: data.category }],
      // });

      queryClient.setQueryData(
        ["products", { filterKey: product.category }],
        (oldData: Product[]) => {
          if (!oldData) return [product];

          return [...oldData, product];
        },
      );
    },
  });

  return mutation;
};
