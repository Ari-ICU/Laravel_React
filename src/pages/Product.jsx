import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { useProduct } from "../context/ProductContext";
import { Link } from "react-router-dom";
import ButtonCart from "../components/ButtonCart";
import ButtonWishlist from "../components/ButtonWishlist";

const Product = () => {
  const { fetchProducts, products } = useProduct();

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl text-black font-bold mb-4">Products</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 justify-center ">
        {products.map((product, index) => (
          <motion.div
            key={product.id}
            className="p-6 max-w-sm rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition duration-300 space-y-4"
            initial={{ opacity: 0.4, y: -30, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0)" }}
            transition={{ delay: index * 0.2 }}
          >
            <Link to={`/product/${product.id}`}>
              <img
                src={product.image}
                alt={`Product: ${product.title}`}
                className="w-full h-40 object-cover rounded-md"
              />
            </Link>
            <Link to={`/product/${product.id}`}>
              <h2 className="text-xl font-semibold text-gray-300 hover:underline">
                {product.title}
              </h2>
            </Link>
            <p className="text-gray-500 truncate">{product.description}</p>
            <div className="flex justify-between items-center">
              <p className="text-lg font-bold text-green-600">
                ${product.price.toFixed(2)}
              </p>
              <p className="text-sm text-gray-500">
                Category: {product.category}
              </p>
            </div>
            <p className="text-yellow-500">
              Rating: {product.rating?.rate} ★ ({product.rating?.count} reviews)
            </p>
            <div className="flex justify-between items-center">
              <ButtonWishlist product={product} />
              <ButtonCart product={product} />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Product;
