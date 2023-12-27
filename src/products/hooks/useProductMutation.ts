import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Product, productActions } from "..";

export const useProductMutation = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: productActions.createProduct,
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
