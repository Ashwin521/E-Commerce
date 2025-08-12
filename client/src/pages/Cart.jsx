import { useCart } from "../context/CartContext";

export default function Cart() {
  const { cart, addToCart, removeFromCart, totalPrice } = useCart();

  if (cart.length === 0) {
    return <p>Your cart is empty.</p>;
  }

  return (
    <div className="cart-page">
      {cart.map((item) => (
        <div key={item._id} className="cart-item">
          <img src={item.image} alt={item.name} width={80} />
          <h3>{item.name}</h3>
          <p>Unit Price: ${item.discounted_price}</p>

          <div>
            <button onClick={() => removeFromCart(item._id)}>-</button>
            <span>{item.quantity}</span>
            <button onClick={() => addToCart(item)}>+</button>
          </div>

          <p>
            Item Total: ${(item.discounted_price * item.quantity).toFixed(2)}
          </p>
        </div>
      ))}

      <h2>Grand Total: ${totalPrice.toFixed(2)}</h2>
    </div>
  );
}
