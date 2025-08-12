import React, { useContext } from "react";
import { ProductContext } from "../context/ProductContext";

const ProductSection = ({ title }) => {
  const { products } = useContext(ProductContext);

  // Limit to 4 products for a "featured" look
  const featuredProducts = products.slice(0, 4);

  return (
    <section className="p-6">
      <h2 className="text-2xl font-bold mb-4">{title}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {featuredProducts.map((product) => (
          <div
            key={product.id}
            className="border rounded-lg p-4 shadow hover:shadow-lg transition"
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-48 object-cover rounded"
            />
            <h3 className="mt-2 font-semibold">{product.name}</h3>
            <p className="text-gray-500">₹{product.price}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProductSection;
