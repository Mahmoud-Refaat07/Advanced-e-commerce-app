import { useEffect } from "react";
import { useProductStore } from "../store/useProductStore";
import { motion } from "framer-motion";
import { Star, Trash } from "lucide-react";

interface Product {
  _id: string;
  description: string;
  image: string;
  name: string;
  price: number;
  category: string;
  isFeatured: boolean;
}

const ProductsList = () => {
  const { loading, products, deleteProduct, toggleFeaturedProduct } =
    useProductStore();

  console.log("UI products", products);

  return (
    <motion.div
      className="bg-gray-800 shadow-lg rounded-lg overflow-hidden max-w-4xl mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <table className="min-w-full divide-y divide-gray-700">
        <thead className="bg-gray-700 divide-y divide-gray-700">
          <tr>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
            >
              Product
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
            >
              Price
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
            >
              Category
            </th>

            <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
              Featured
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
            >
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-gray-800 divide-y divide-gray-700">
          {products.map((product: Product) => (
            <tr key={product._id} className="hover:bg-gray-700">
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <div className="shrink-0 h-10 w-10 ">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-white">
                      {product.name}
                    </p>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <p className="text-sm font-medium text-white">
                  {product.price}$
                </p>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <p className="text-sm font-medium text-white">
                  {product.category}
                </p>
              </td>

              <td className="px-6 py-4 whitespace-nowrap">
                <button
                  onClick={() => toggleFeaturedProduct(product._id)}
                  className={`p-1 rounded-full ${
                    product.isFeatured
                      ? "bg-yellow-400 text-gray-900"
                      : "bg-gray-600 text-gray-300"
                  } transition-colors  cursor-pointer hover:bg-yellow-500`}
                >
                  <Star className="w-5 h-5" />
                </button>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <button
                  onClick={() => deleteProduct(product._id)}
                  className="text-red-400 hover:text-red-300 cursor-pointer"
                >
                  <Trash className="w-5 h-5" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </motion.div>
  );
};

export default ProductsList;
