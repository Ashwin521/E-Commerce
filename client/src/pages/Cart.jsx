// import { useCart } from "../context/CartContext";
// import { motion, AnimatePresence } from "framer-motion";

// export default function Cart() {
//   const { cart, addToCart, removeFromCart, totalPrice } = useCart();

//   if (cart.length === 0) {
//     return (
//       <p className="text-center text-gray-500 mt-10 text-lg">
//         Your cart is empty.
//       </p>
//     );
//   }

//   return (
//     <div className="cart-page max-w-4xl mx-auto p-4">
//       <AnimatePresence>
//         {cart.map((item) => (
//           <motion.div
//             key={item._id}
//             layout
//             initial={{ opacity: 0, x: -50 }}
//             animate={{ opacity: 1, x: 0 }}
//             exit={{ opacity: 0, x: 50, scale: 0.8 }}
//             transition={{ duration: 0.3 }}
//             className="cart-item flex items-center justify-between bg-white rounded-md shadow-md p-4 mb-4"
//           >
//             <img
//               src={item.image}
//               alt={item.name}
//               width={80}
//               className="rounded"
//             />
//             <div className="flex-1 px-4">
//               <h3 className="font-semibold text-lg">{item.name}</h3>
//               <p className="text-gray-600">
//                 Unit Price: ${item.discounted_price}
//               </p>
//             </div>

//             <div className="flex items-center space-x-3">
//               <button
//                 onClick={() => removeFromCart(item._id)}
//                 className="w-8 h-8 bg-red-500 hover:bg-red-600 text-white rounded flex items-center justify-center font-bold transition"
//                 aria-label={`Remove one ${item.name}`}
//               >
//                 −
//               </button>

//               {/* Animate quantity changes */}
//               <motion.span
//                 key={item.quantity} // re-animate when quantity changes
//                 initial={{ scale: 0.8, opacity: 0 }}
//                 animate={{ scale: 1, opacity: 1 }}
//                 exit={{ scale: 0.8, opacity: 0 }}
//                 className="text-xl font-semibold w-6 text-center"
//               >
//                 {item.quantity}
//               </motion.span>

//               <button
//                 onClick={() => addToCart(item)}
//                 className="w-8 h-8 bg-green-500 hover:bg-green-600 text-white rounded flex items-center justify-center font-bold transition"
//                 aria-label={`Add one more ${item.name}`}
//               >
//                 +
//               </button>
//             </div>

//             <p className="ml-6 font-semibold">
//               ${(item.discounted_price * item.quantity).toFixed(2)}
//             </p>
//           </motion.div>
//         ))}
//       </AnimatePresence>

//       <h2 className="text-right text-2xl font-bold mt-6">
//         Grand Total: ${totalPrice.toFixed(2)}
//       </h2>
//     </div>
//   );
// }
import React from "react";
import { useCart } from "../context/CartContext";
import { PayPalButtons } from "@paypal/react-paypal-js";

export default function Cart() {
  const { cart, totalPrice, removeFromCart } = useCart();

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Your Cart</h1>

      {cart.length === 0 ? (
        <p className="text-gray-600">Your cart is empty</p>
      ) : (
        <>
          {cart.map((item) => (
            <div
              key={item._id}
              className="border border-gray-300 p-4 mb-4 rounded-lg shadow-sm flex justify-between items-center"
            >
              <div>
                <h3 className="text-lg font-semibold">{item.title}</h3>
                <p className="text-gray-700">Price: ₹{item.discounted_price}</p>
                <p className="text-gray-500">Quantity: {item.quantity}</p>
              </div>
              <button
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md transition"
                onClick={() => removeFromCart(item._id)}
              >
                Remove
              </button>
            </div>
          ))}

          <div className="bg-gray-100 p-4 rounded-lg shadow-md mt-6">
            <h2 className="text-xl font-bold">Total: ₹{totalPrice}</h2>
          </div>

          <div className="mt-6">
            {/* PayPal Payment Button */}
            <PayPalButtons
              style={{ layout: "vertical" }}
              createOrder={(data, actions) => {
                return actions.order.create({
                  purchase_units: [
                    {
                      amount: {
                        value: totalPrice.toString(),
                      },
                    },
                  ],
                });
              }}
              onApprove={(data, actions) => {
                return actions.order.capture().then((details) => {
                  alert(
                    `Transaction completed by ${details.payer.name.given_name}`
                  );
                });
              }}
              onError={(err) => {
                console.error("PayPal Checkout Error", err);
                alert("Payment could not be completed. Please try again.");
              }}
            />
          </div>
        </>
      )}
    </div>
  );
}
