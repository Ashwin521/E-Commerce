import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const ProductsPage = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/products")
      .then((res) => setProducts(res.data))
      .catch((err) => console.error("Error fetching products:", err));
  }, []);

  const getFirstImage = (imgData) => {
    try {
      if (!imgData) return null;
      // If it's already an array
      if (Array.isArray(imgData)) return imgData[0];
      // If it's a JSON string of array
      if (typeof imgData === "string" && imgData.startsWith("[")) {
        const parsed = JSON.parse(imgData);
        return parsed[0];
      }
      return imgData; // fallback
    } catch {
      return null;
    }
  };

  const getKeySpecs = (specsString) => {
    if (!specsString) return [];
    try {
      const parsed = JSON.parse(specsString);
      const specsArray = parsed.product_specification || [];

      // Filter for important specifications
      const importantKeys = [
        "Brand",
        "Type",
        "Material",
        "Color",
        "Size",
        "Style",
        "Warranty",
        "Seating Capacity",
        "Care Instructions",
      ];

      return specsArray
        .filter(
          (spec) =>
            importantKeys.includes(spec.key) ||
            (spec.value && spec.value.length < 50)
        )
        .slice(0, 5); // Limit to 5 specs
    } catch {
      return [];
    }
  };

  const formatPrice = (price) => {
    if (!price) return "₹0";
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    })
      .format(price)
      .replace("₹", "₹ ");
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Our Products</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => {
          const imageUrl = getFirstImage(product.image);
          const keySpecs = getKeySpecs(product.product_specifications);

          return (
            <div
              key={product._id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              <Link to={`/products/${product._id}`}>
                {imageUrl && (
                  <div className="h-48 bg-gray-100 flex items-center justify-center">
                    <img
                      src={imageUrl}
                      alt={product.product_name}
                      className="max-h-full max-w-full object-contain"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src =
                          "https://via.placeholder.com/300x200?text=No+Image";
                      }}
                    />
                  </div>
                )}
              </Link>

              <div className="p-4">
                <Link
                  to={`/products/${product._id}`}
                  className="hover:text-blue-600"
                >
                  <h3 className="font-semibold text-lg mb-2 line-clamp-2 h-14">
                    {product.product_name}
                  </h3>
                </Link>

                <div className="mb-3">
                  {product.discounted_price &&
                  product.discounted_price !== product.retail_price ? (
                    <div className="flex items-center gap-2">
                      <span className="text-green-600 font-bold text-xl">
                        {formatPrice(product.discounted_price)}
                      </span>
                      <span className="text-gray-500 line-through text-sm">
                        {formatPrice(product.retail_price)}
                      </span>
                    </div>
                  ) : (
                    <span className="text-gray-800 font-bold text-xl">
                      {formatPrice(product.retail_price)}
                    </span>
                  )}
                </div>

                {keySpecs.length > 0 && (
                  <div className="border-t pt-3">
                    <h4 className="font-medium text-gray-700 mb-2">
                      Key Features:
                    </h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      {keySpecs.map((spec, index) => (
                        <li key={index} className="flex">
                          <span className="font-medium text-gray-800 mr-1">
                            {spec.key ? `${spec.key}:` : ""}
                          </span>
                          <span className="line-clamp-1">{spec.value}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                <Link to={`/products/${product._id}`}>
                  <button className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md transition-colors">
                    View Details
                  </button>
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProductsPage;
