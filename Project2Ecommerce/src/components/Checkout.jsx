import { useState } from 'react';
import { useCart } from '../CartContext';

function Checkout() {
  const { cart, getTotal } = useCart();
  const [form, setForm] = useState({ name: '', email: '', address: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    // Mock submission
  };

  return (
    <div>
      <h1>Checkout</h1>
      <h2>Total: ${getTotal().toFixed(2)}</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
        />
        <textarea
          placeholder="Address"
          value={form.address}
          onChange={(e) => setForm({ ...form, address: e.target.value })}
          required
        />
        <button type="submit">Submit Order</button>
      </form>
      {submitted && <p>Order submitted!</p>}
    </div>
  );
}

export default Checkout;