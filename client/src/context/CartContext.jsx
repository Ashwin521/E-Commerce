import React, { createContext, useContext, useState, useMemo } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addToCart = (product, qty = 1) => {
    setCart((prev) => {
      const existing = prev.find((item) => item._id === product._id);
      if (existing) {
        return prev.map((item) =>
          item._id === product._id
            ? { ...item, quantity: item.quantity + qty }
            : item
        );
      }
      return [...prev, { ...product, quantity: qty }];
    });
  };

  const removeFromCart = (id) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item._id === id ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const totalPrice = useMemo(
    () =>
      cart.reduce(
        (sum, item) => sum + item.discounted_price * item.quantity,
        0
      ),
    [cart]
  );

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, totalPrice }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);

// import React, { createContext, useContext, useState, useMemo } from "react";
// import axios from "axios";

// const CartContext = createContext();

// export const CartProvider = ({ children }) => {
//   const [cart, setCart] = useState([]);

//   const addToCart = async (product, qty = 1) => {
//     setCart((prev) => {
//       const existing = prev.find((item) => item._id === product._id);
//       if (existing) {
//         return prev.map((item) =>
//           item._id === product._id
//             ? { ...item, quantity: item.quantity + qty }
//             : item
//         );
//       }
//       return [...prev, { ...product, quantity: qty }];
//     });

//     try {
//       await axios.post("/api/cart", {
//         productId: product._id,
//         quantity: qty,
//         userId: null, // Replace with actual user ID if you have auth
//       });
//     } catch (error) {
//       console.error("Error saving cart to server:", error);
//     }
//   };

//   const removeFromCart = (id) => {
//     setCart((prev) =>
//       prev
//         .map((item) =>
//           item._id === id ? { ...item, quantity: item.quantity - 1 } : item
//         )
//         .filter((item) => item.quantity > 0)
//     );
//   };

//   const totalPrice = useMemo(
//     () =>
//       cart.reduce(
//         (sum, item) => sum + item.discounted_price * item.quantity,
//         0
//       ),
//     [cart]
//   );

//   return (
//     <CartContext.Provider
//       value={{ cart, addToCart, removeFromCart, totalPrice }}
//     >
//       {children}
//     </CartContext.Provider>
//   );
// };

// export const useCart = () => useContext(CartContext);
