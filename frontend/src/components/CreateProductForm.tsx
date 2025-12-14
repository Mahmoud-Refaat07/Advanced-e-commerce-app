import { useState } from "react";
import { motion } from "framer-motion";
import { PlusCircle, Upload, Loader } from "lucide-react";
import Input from "./Input";
import { useProductStore } from "../store/useProductStore";

const categories = [
  "jean",
  "t-shirt",
  "shoes",
  "glasses",
  "jacket",
  "suit",
  "bag",
];

const CreateProductForm = () => {
  const [newProduct, setNewProduct] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    image: "",
  });

  const { loading, createProduct } = useProductStore();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createProduct(newProduct);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setNewProduct({ ...newProduct, image: reader.result as string });
      };

      reader.readAsDataURL(file); // base64 format
    }
  };
  return (
    <motion.div
      className="bg-gray-800 shadow-lg rounded-lg p-8 mb-8 max-w-xl mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <h2 className="text-2xl font-semibold mb-6 text-emerald-300">
        Create New Product
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Input
            label="Product Name"
            id="name"
            type="text"
            value={newProduct.name}
            onChange={(e) =>
              setNewProduct({ ...newProduct, name: e.target.value })
            }
          />
        </div>
        <div>
          <label htmlFor="description" className="block text-sm text-gray-300">
            Description
          </label>
          <textarea
            id="description"
            value={newProduct.description}
            onChange={(e) =>
              setNewProduct({ ...newProduct, description: e.target.value })
            }
            rows={3}
            className=" block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm
            py-2 px-3 text-white focus:outline-none focus:ring-1 focus:ring-emerald-500
            focus:border-emerald-500"
            required
          />
        </div>
        <div>
          <Input
            label="Price"
            id="price"
            type="number"
            value={newProduct.price}
            onChange={(e) =>
              setNewProduct({ ...newProduct, price: e.target.value })
            }
          />
        </div>
        <div>
          <label htmlFor="description" className="block text-sm text-gray-300">
            Category
          </label>
          <select
            id="category"
            name="category"
            value={newProduct.category}
            onChange={(e) =>
              setNewProduct({ ...newProduct, category: e.target.value })
            }
            className=" block w-full bg-gray-700 border border-gray-600 rounded-md
             shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-1 focus:ring-emerald-500
             focus:border-emerald-500"
            required
          >
            <option>Selected a category</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
        <div className="mt-3 flex items-center">
          <input
            type="file"
            id="image"
            className="sr-only"
            accept="image/*"
            onChange={handleImageChange}
          />
          <label
            htmlFor="image"
            className="cursor-pointer bg-gray-700 py-2 px-3 border  border-gray-600 rounded-md shadow-sm text-sm
            leading-4 font-medium text-gray-300 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
          >
            <Upload className="h-5 w-5 inline-block mr-2" />
            Upload Image
          </label>
          {newProduct.image && (
            <span className="ml-3 text-sm text-gray-400">Image uplodaded</span>
          )}
        </div>
        <button
          className=" w-full flex justify-center py-2 px-4 border border-transparent 
							rounded-md shadow-sm text-sm font-medium text-white bg-emerald-600
							 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2
							  focus:ring-emerald-500 transition duration-150 ease-in-out disabled:opacity-50 "
          disabled={loading}
        >
          {loading ? (
            <>
              <Loader className="mr-3 h-5 w-5 animate-spin" />
              Loading...
            </>
          ) : (
            <>
              <PlusCircle className="mr-3 h-5 w-5 " />
              Create Product
            </>
          )}
        </button>
      </form>
    </motion.div>
  );
};

export default CreateProductForm;
