import { useMutation } from "@tanstack/react-query";
import { productActions } from "..";

export const useProductMutation = () => {
  const mutation = useMutation({
    mutationFn: productActions.createProduct,
    onSuccess: () => {
      console.log("Product created");
    },
    onSettled: () => {
      console.log("Product creation finished");
    },
  });

  return mutation;
};
