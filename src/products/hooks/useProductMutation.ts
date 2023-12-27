import { useMutation, useQueryClient } from "@tanstack/react-query";
import { type Product, productActions } from "..";

export const useProductMutation = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: productActions.createProduct,
    onMutate: (product) => {
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

      return {
        optimisticProduct,
      };
    },
    onSuccess: (product, variables, context) => {
      // queryClient.invalidateQueries({
      //   queryKey: ["products", { filterKey: data.category }],
      // });

      queryClient.setQueryData(
        ["products", { filterKey: product.category }],
        (oldData: Product[]) => {
          if (!oldData) return [product];

          return oldData.map((cacheProduct) => {
            return cacheProduct.id === context?.optimisticProduct.id
              ? product
              : cacheProduct;
          });
        },
      );
    },
  });

  return mutation;
};
