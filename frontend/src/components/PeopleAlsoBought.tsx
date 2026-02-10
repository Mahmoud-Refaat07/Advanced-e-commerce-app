import { useEffect } from "react";
import { useProductStore } from "../store/useProductStore.ts";

import ProductCard from "./ProductCard";
import LoadingSpinner from "./LoadingSpinner";

const PeopleAlsoBought = () => {
  const { recommedations, getRecommendedProducts, loading } = useProductStore();

  useEffect(() => {
    getRecommendedProducts();
  }, [getRecommendedProducts]);
  return (
    <div className="mt-8">
      <h3 className="text-2xl font-semibold text-emerald-400 ">
        People also bought
      </h3>
      {loading ? (
        <LoadingSpinner />
      ) : (
        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {recommedations.map((product) => (
            <ProductCard
              key={product._id}
              product={{
                ...product,
                quantity: 1,
                price: Number(product.price),
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default PeopleAlsoBought;
