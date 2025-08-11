import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/products/${id}`);
        setProduct(res.data);
      } catch (err) {
        console.error("Error fetching product:", err);
        setError("Failed to load product. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const getImages = () => {
    try {
      if (!product?.image) return [];
      // If image is already an array
      if (Array.isArray(product.image)) return product.image;
      // If image is a JSON string
      if (typeof product.image === "string") {
        return JSON.parse(product.image);
      }
      return [];
    } catch (err) {
      console.error("Error parsing images:", err);
      return [];
    }
  };

  const getKeySpecs = () => {
    if (!product?.product_specifications) return [];
    try {
      const parsed = JSON.parse(product.product_specifications);
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
        "Weight",
        "Dimensions",
      ];

      return specsArray.filter(
        (spec) =>
          importantKeys.includes(spec.key) ||
          (spec.value && spec.value.length < 50)
      );
    } catch (err) {
      console.error("Error parsing specifications:", err);
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

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-3xl mx-auto p-6 text-center">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="max-w-3xl mx-auto p-6 text-center">
        <p className="text-xl">Product not found</p>
      </div>
    );
  }

  const images = getImages();
  const keySpecs = getKeySpecs();
  const hasDiscount =
    product.discounted_price &&
    product.discounted_price !== product.retail_price;

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-6">
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="md:flex">
          {/* Image Gallery */}
          <div className="md:w-1/2 p-4">
            <div className="h-96 bg-gray-100 rounded-lg flex items-center justify-center mb-4">
              {images.length > 0 ? (
                <img
                  src={images[0]}
                  alt={product.product_name}
                  className="max-h-full max-w-full object-contain"
                />
              ) : (
                <div className="text-gray-400">No image available</div>
              )}
            </div>
            {images.length > 1 && (
              <div className="grid grid-cols-4 gap-2">
                {images.slice(0, 4).map((img, index) => (
                  <div
                    key={index}
                    className="h-20 bg-gray-100 rounded flex items-center justify-center"
                  >
                    <img
                      src={img}
                      alt={`${product.product_name} ${index + 1}`}
                      className="max-h-full max-w-full object-contain"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Product Details */}
          <div className="md:w-1/2 p-4 md:p-6">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
              {product.product_name}
            </h1>

            <div className="mb-4">
              {hasDiscount ? (
                <div className="flex items-center gap-3">
                  <span className="text-2xl font-bold text-green-600">
                    {formatPrice(product.discounted_price)}
                  </span>
                  <span className="text-lg text-gray-500 line-through">
                    {formatPrice(product.retail_price)}
                  </span>
                  {product.retail_price > 0 && (
                    <span className="text-sm bg-green-100 text-green-800 px-2 py-1 rounded">
                      {Math.round(
                        (1 - product.discounted_price / product.retail_price) *
                          100
                      )}
                      % OFF
                    </span>
                  )}
                </div>
              ) : (
                <span className="text-2xl font-bold text-gray-800">
                  {formatPrice(product.retail_price)}
                </span>
              )}
            </div>

            <div className="mb-6">
              <h3 className="text-sm font-semibold text-gray-500 mb-1">
                Category
              </h3>
              <p className="text-gray-700">
                {Array.isArray(product.product_category_tree)
                  ? product.product_category_tree.join(" > ")
                  : product.product_category_tree || "N/A"}
              </p>
            </div>

            {keySpecs.length > 0 && (
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-3">Product Details</h3>
                <ul className="space-y-2">
                  {keySpecs.map((spec, index) => (
                    <li key={index} className="flex">
                      <span className="font-medium text-gray-700 w-1/3">
                        {spec.key || "Feature"}:
                      </span>
                      <span className="text-gray-600 flex-1">{spec.value}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {product.description && (
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-2">Description</h3>
                <p className="text-gray-600 whitespace-pre-line">
                  {product.description}
                </p>
              </div>
            )}

            <div className="flex gap-3 mt-8">
              <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-md font-medium transition-colors">
                Add to Cart
              </button>
              <button className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 py-3 px-6 rounded-md font-medium transition-colors">
                Buy Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
