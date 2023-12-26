import { useParams } from "react-router-dom";
import { ProductCard, useProduct } from "..";

export const ProductByIdPage = () => {
  const { id } = useParams();
  const { product, isLoading } = useProduct({ id: +id! });
  return (
    <div className="flex-col">
      <h1 className="text-2xl font-bold">Producto</h1>

      {isLoading && <p className="text-gray-500">Cargando...</p>}
      {product && <ProductCard product={product} fullDescription={true} />}
    </div>
  );
};
