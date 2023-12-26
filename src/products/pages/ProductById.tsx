import { useParams } from "react-router-dom";
import { ProductCard, useProduct } from "..";
import { useEffect } from "react";

export const ProductByIdPage = () => {
  const { id } = useParams();
  const { product, isLoading } = useProduct({ id: +id! });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="flex-col">
      <h1 className="text-2xl font-bold">Producto</h1>

      {isLoading && <p className="text-gray-500">Cargando...</p>}
      {product && <ProductCard product={product} fullDescription={true} />}
    </div>
  );
};
