import { type Product, productsApi } from "..";

interface GetProductsParams {
  filterKey?: string;
}

export async function getProducts({
  filterKey,
}: GetProductsParams): Promise<Product[]> {
  const filterUrl = filterKey ? `?category=${filterKey}` : "";
  const { data } = await productsApi.get<Product[]>(`/products${filterUrl}`);
  return data;
}

export async function getProductById(id: number): Promise<Product> {
  const { data } = await productsApi.get<Product>(`/products/${id}`);
  return data;
}
