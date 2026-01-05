import { Link } from 'react-router-dom';
import { useCart } from '../CartContext';

function Cart() {
  const { cart, updateQuantity, removeFromCart, getTotal } = useCart();

  return (
    <div>
      <h1>Cart</h1>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          {cart.map(item => (
            <div key={item.id}>
              <h2>{item.name}</h2>
              <p>Price: ${item.price}</p>
              <p>Quantity: 
                <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
                {item.quantity}
                <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
              </p>
              <button onClick={() => removeFromCart(item.id)}>Remove</button>
            </div>
          ))}
          <h2>Total: ${getTotal().toFixed(2)}</h2>
          <Link to="/checkout">Checkout</Link>
        </div>
      )}
    </div>
  );
}

export default Cart;