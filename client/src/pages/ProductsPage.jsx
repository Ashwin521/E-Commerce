// import { useEffect, useState } from "react";
// import { useCart } from "../context/CartContext";
// import { Link } from "react-router-dom";

// export default function ProductsPage() {
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const { addToCart, removeFromCart, cart } = useCart();

//   useEffect(() => {
//     fetch("http://localhost:5000/api/products")
//       .then((res) => {
//         if (!res.ok) throw new Error("Failed to fetch products");
//         return res.json();
//       })
//       .then((data) => {
//         setProducts(data);
//         setLoading(false);
//       })
//       .catch((err) => {
//         console.error("Error loading products:", err);
//         setLoading(false);
//       });
//   }, []);

//   const getQty = (id) => cart.find((item) => item._id === id)?.quantity || 0;

//   if (loading)
//     return <p className="text-center text-lg mt-10">Loading products...</p>;
//   if (products.length === 0)
//     return <p className="text-center text-lg mt-10">No products found.</p>;

//   return (
//     <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
//       {products.map((product) => {
//         const qty = getQty(product._id);
//         const total = (product.discounted_price * qty).toFixed(2);

//         return (
//           <div
//             key={product._id}
//             className="bg-white shadow-lg rounded-xl overflow-hidden flex flex-col border hover:shadow-2xl transition"
//           >
//             <img
//               src={product.image}
//               alt={product.product_name}
//               className="w-full h-56 object-cover"
//             />
//             <div className="p-4 flex flex-col justify-between flex-grow">
//               <h3 className="text-lg font-semibold truncate">
//                 {product.product_name}
//               </h3>
//               <p className="text-purple-600 font-bold mt-1">
//                 ₹{product.discounted_price}
//               </p>
//               {qty > 0 && (
//                 <p className="text-sm text-gray-500">Total: ₹{total}</p>
//               )}

//               <div className="mt-4 flex justify-between items-center">
//                 <Link
//                   to={`/products/${product._id}`}
//                   className="text-sm text-purple-500 hover:underline"
//                 >
//                   View Details
//                 </Link>

//                 {qty > 0 ? (
//                   <div className="flex items-center gap-2">
//                     <button
//                       onClick={() => removeFromCart(product._id)}
//                       className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
//                     >
//                       -
//                     </button>
//                     <span>{qty}</span>
//                     <button
//                       onClick={() => addToCart(product)}
//                       className="px-2 py-1 bg-purple-500 text-white rounded hover:bg-purple-600"
//                     >
//                       +
//                     </button>
//                   </div>
//                 ) : (
//                   <button
//                     onClick={() => addToCart(product)}
//                     className="px-4 py-1 bg-purple-500 text-white rounded hover:bg-purple-600 text-sm"
//                   >
//                     Add to Cart
//                   </button>
//                 )}
//               </div>
//             </div>
//           </div>
//         );
//       })}
//     </div>
//   );
// }

import { useEffect, useState } from "react";
import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1); // current page
  const [totalPages, setTotalPages] = useState(1); // from backend if available
  const { addToCart, removeFromCart, cart } = useCart();

  const fetchProducts = (pageNum) => {
    setLoading(true);
    fetch(`${import.meta.env.VITE_API_URL}/api/products?page=${pageNum}`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch products");
        return res.json();
      })
      .then((data) => {
        setProducts(data.products); // assuming backend sends { products, totalPages }
        setTotalPages(data.totalPages || 1);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error loading products:", err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchProducts(page);
  }, [page]);

  const getQty = (id) => cart.find((item) => item._id === id)?.quantity || 0;

  if (loading)
    return <p className="text-center text-lg mt-10">Loading products...</p>;
  if (products.length === 0)
    return <p className="text-center text-lg mt-10">No products found.</p>;

  return (
    <div>
      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
        {products.map((product) => {
          const qty = getQty(product._id);
          const total = (product.discounted_price * qty).toFixed(2);

          return (
            <div
              key={product._id}
              className="bg-white shadow-lg rounded-xl overflow-hidden flex flex-col border hover:shadow-2xl transition"
            >
              <img
                src={product.image}
                alt={product.product_name}
                className="w-full h-56 object-cover"
              />
              <div className="p-4 flex flex-col justify-between flex-grow">
                <h3 className="text-lg font-semibold truncate">
                  {product.product_name}
                </h3>
                <p className="text-purple-600 font-bold mt-1">
                  ₹{product.discounted_price}
                </p>
                {qty > 0 && (
                  <p className="text-sm text-gray-500">Total: ₹{total}</p>
                )}

                <div className="mt-4 flex justify-between items-center">
                  <Link
                    to={`/products/${product._id}`}
                    className="text-sm text-purple-500 hover:underline"
                  >
                    View Details
                  </Link>

                  {qty > 0 ? (
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => removeFromCart(product._id)}
                        className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                      >
                        -
                      </button>
                      <span>{qty}</span>
                      <button
                        onClick={() => addToCart(product)}
                        className="px-2 py-1 bg-purple-500 text-white rounded hover:bg-purple-600"
                      >
                        +
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => addToCart(product)}
                      className="px-4 py-1 bg-purple-500 text-white rounded hover:bg-purple-600 text-sm"
                    >
                      Add to Cart
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center gap-4 my-6">
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
          className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
        >
          Prev
        </button>
        <span className="self-center">
          Page {page} of {totalPages}
        </span>
        <button
          onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={page === totalPages}
          className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}
