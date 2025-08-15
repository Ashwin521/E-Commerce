// import React, { useEffect, useState } from "react";
// import axios from "axios";

// export default function AdminDashboard() {
//   const [cartItems, setCartItems] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     axios
//       .get("/api/cart")
//       .then((res) => {
//         console.log("Cart data from server:", res.data);
//         setCartItems(Array.isArray(res.data) ? res.data : []);
//         setLoading(false);
//       })
//       .catch((err) => {
//         console.error("Error fetching cart data:", err);
//         setError("Failed to load cart items.");
//         setLoading(false);
//       });
//   }, []);

//   if (loading) return <p>Loading cart items...</p>;
//   if (error) return <p style={{ color: "red" }}>{error}</p>;

//   return (
//     <div>
//       <h2>All Cart Items</h2>
//       <table border="1" cellPadding="10">
//         <thead>
//           <tr>
//             <th>Product</th>
//             <th>Quantity</th>
//             <th>User</th>
//           </tr>
//         </thead>
//         <tbody>
//           {cartItems.length === 0 ? (
//             <tr>
//               <td colSpan="3">No cart items found</td>
//             </tr>
//           ) : (
//             cartItems.map((item) => (
//               <tr key={item._id}>
//                 <td>{item?.productId?.product_name || "Unknown Product"}</td>
//                 <td>{item?.quantity ?? 0}</td>
//                 <td>{item?.userId || "Guest"}</td>
//               </tr>
//             ))
//           )}
//         </tbody>
//       </table>
//     </div>
//   );
// }
