import toast from "react-hot-toast";
import { ShoppingCart } from "lucide-react";
import useUserStore from "../store/useUserStore.ts";
import useCartStore from "../store/useCartStore.ts";

interface ProductProps {
  _id: string;
  category?: string;
  description?: string;
  image?: string;
  name: string;
  price: number;
  quantity: number;
  isFeatured?: boolean;
}

const ProductCard = ({ product }: { product: ProductProps }) => {
  const { user } = useUserStore();
  const { addToCart } = useCartStore();

  const handleAddToCart = () => {
    if (!user) {
      return toast.error("Please login to add products to cart", {
        id: "login",
      });
    } else {
      addToCart(product);
    }
  };
  return (
    <div className="flex w-full relative flex-col overflow-hidden rounded-lg border border-gray-700 shadow-lg">
      <div className="relative mx-3 mt-3 flex h-60 overflow-hidden rounded-xl">
        <img
          src={product.image}
          alt="product image"
          className="object-cover w-full"
        />
        <div className="absolute inset-0 bg-black/30" />
      </div>

      <div className="mt-4 px-5 pb-5">
        <h5 className="text-xl font-semibold tracking-tight text-white">
          {product.name}
        </h5>
        <div className="mt-2 mb-5 flex items-center justify-between">
          <p>
            <span className="text-3xl font-bold text-emerald-400">
              {product.price}$
            </span>
          </p>
        </div>
        <button
          className="flex items-center justify-center rounded-lg bg-emerald-600 px-5 py-2.5 text-center text-sm
        font-medium text-white cursor-pointer hover:bg-emerald-700 focus:outline-none focus:ring-4 focus:ring-emerald-300"
          onClick={handleAddToCart}
        >
          <ShoppingCart size={22} className="mr-2" />
          Add to cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
