import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";

export default function FeaturedProducts({ products }) {
  const { addToCart, removeFromCart, cart } = useCart();

  const getQty = (id) => cart.find((item) => item._id === id)?.quantity || 0;

  return (
    <div className="featured-products">
      {products.map((product) => (
        <div key={product._id} className="product-card">
          <img src={product.image} alt={product.name} />
          <h3>{product.name}</h3>
          <p>${product.discounted_price}</p>

          <div className="actions">
            <Link to={`/products/${product._id}`}>View Details</Link>
            {getQty(product._id) > 0 ? (
              <div>
                <button onClick={() => removeFromCart(product._id)}>-</button>
                <span>{getQty(product._id)}</span>
                <button onClick={() => addToCart(product)}>+</button>
              </div>
            ) : (
              <button onClick={() => addToCart(product)}>Add to Cart</button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
