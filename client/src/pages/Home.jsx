import React, { useEffect, useState } from "react";
import axios from "axios";

const Home = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/featured") // ✅ Now fetching featured products
      .then((res) => setProducts(res.data))
      .catch((err) => console.error("Error fetching featured products:", err));
  }, []);

  return (
    <div className="bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-purple-600 to-pink-500 text-white py-16">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Welcome to EcomShop
          </h1>
          <p className="text-lg mb-6">
            Discover the latest trends at unbeatable prices.
          </p>
          <a
            href="#featured"
            className="bg-white text-purple-700 px-6 py-3 rounded-lg font-semibold shadow hover:bg-gray-200"
          >
            Shop Now
          </a>
        </div>
      </section>

      {/* Featured Products */}
      <section id="featured" className="py-12 max-w-7xl mx-auto px-6">
        <h2 className="text-2xl font-bold mb-8">Featured Products</h2>
        {products.length === 0 ? (
          <p className="text-gray-500">No featured products available.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {products.map((p) => {
              let images = [];
              try {
                images = JSON.parse(p.image); // Convert string to array safely
              } catch (error) {
                console.error("Error parsing image JSON", error);
              }

              return (
                <div
                  key={p._id}
                  className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition"
                >
                  {images.length > 0 && (
                    <img
                      src={images[0]}
                      alt={p.product_name}
                      className="w-full h-48 object-cover rounded-lg mb-4"
                    />
                  )}
                  <h3 className="font-semibold line-clamp-1">
                    {p.product_name}
                  </h3>
                  <p className="text-gray-500 line-clamp-2 text-sm">
                    {p.brand}
                  </p>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-purple-600 font-bold">
                      ₹{p.discounted_price}
                    </span>
                    {p.discounted_price < p.retail_price && (
                      <span className="text-gray-500 line-through text-sm">
                        ₹{p.retail_price}
                      </span>
                    )}
                  </div>
                  <a
                    href={`/product/${p._id}`}
                    className="mt-3 w-full inline-block text-center bg-purple-600 text-white py-2 rounded hover:bg-purple-700"
                  >
                    View Details
                  </a>
                </div>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
};

export default Home;
