import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { useCart } from "../context/CartContext";

export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/products/${id}`)
      .then((res) => setProduct(res.data))
      .catch((err) => console.error(err));
  }, [id]);

  if (!product) return <p className="text-center mt-10 text-lg">Loading...</p>;

  return (
    <div className="max-w-5xl mx-auto p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Product Image */}
        <div className="flex flex-col gap-4">
          <img
            src={product.image}
            alt={product.product_name}
            className="w-full h-96 object-cover rounded-lg shadow"
          />
        </div>

        {/* Product Info */}
        <div className="flex flex-col justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">{product.product_name}</h1>
            <p className="text-gray-500 mb-4">{product.brand}</p>

            <div className="flex items-center gap-3 mb-4">
              <span className="text-purple-600 font-bold text-2xl">
                ₹{product.discounted_price}
              </span>
              {product.discounted_price < product.retail_price && (
                <span className="line-through text-gray-500">
                  ₹{product.retail_price}
                </span>
              )}
            </div>

            {/* Quantity Selector */}
            <div className="flex items-center gap-3 mb-6">
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
              >
                -
              </button>
              <span className="font-semibold">{quantity}</span>
              <button
                onClick={() => setQuantity((q) => q + 1)}
                className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
              >
                +
              </button>
            </div>
          </div>

          {/* Add to Cart Button */}
          <Link to="/cart">
            <button
              onClick={() => addToCart(product, quantity)}
              className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition"
            >
              Add to Cart
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
