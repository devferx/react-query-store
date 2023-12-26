import { type Product, productsApi } from "..";

interface GetProductsParams {
  filterKey?: string;
}

export async function getProducts({ filterKey }: GetProductsParams) {
  const { data } = await productsApi.get<Product[]>(`/products`);
  return data;
}
