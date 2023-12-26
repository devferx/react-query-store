import { type Product, productsApi } from "..";

interface GetProductsParams {
  filterKey?: string;
}

export async function getProducts({ filterKey }: GetProductsParams) {
  const filterUrl = filterKey ? `?category=${filterKey}` : "";
  const { data } = await productsApi.get<Product[]>(`/products${filterUrl}`);
  return data;
}
