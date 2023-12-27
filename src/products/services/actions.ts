import { type Product, productsApi } from "..";

interface GetProductsParams {
  filterKey?: string;
}

export function sleep(seconds: number): Promise<boolean> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, seconds * 1000);
  });
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

type CreateProductDto = Omit<Product, "rating" | "id"> & { id?: string };

export async function createProduct(
  product: CreateProductDto,
): Promise<Product> {
  await sleep(5);
  const { data } = await productsApi.post<Product>(`/products`, product);
  return data;
}
