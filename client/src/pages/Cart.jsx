import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext"; // ✅ import useAuth
import { Link } from "react-router-dom";
import { useState } from "react";

export default function Cart() {
  const { cart, removeFromCart, clearCart } = useCart();
  const { token } = useAuth(); // ✅ get token from AuthContext
  const [message, setMessage] = useState("");

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handlePlaceOrder = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // ✅ include token
        },
        body: JSON.stringify({ items: cart }),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage("✅ Order placed successfully!");
        clearCart();
      } else {
        setMessage(`❌ ${data.msg}`);
      }
    } catch (err) {
      console.error(err);
      setMessage("❌ Something went wrong.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">Your Cart 🛒</h1>

      {message && (
        <p className="bg-yellow-100 border border-yellow-400 p-2 rounded mb-4">{message}</p>
      )}

      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <ul className="space-y-4">
            {cart.map(item => (
              <li key={item.id} className="flex items-center justify-between bg-white shadow p-4 rounded">
                <div>
                  <h2 className="font-semibold">{item.name}</h2>
                  <p>Qty: {item.quantity}</p>
                  <p>₹ {item.price} x {item.quantity}</p>
                </div>
                <button
                  onClick={handlePlaceOrder}
                  className="bg-orange-500 text-white px-4 py-2 mt-4 rounded"
                >
                  Place Order
                </button>

                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-red-500 hover:underline"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>

          <div className="mt-6">
            <h2 className="text-xl font-bold">Total: ₹ {total}</h2>
            <button
              onClick={clearCart}
              className="bg-red-500 text-white px-4 py-2 mt-2 rounded hover:bg-red-600"
            >
              Clear Cart
            </button>
            {cart.length > 0 && (
    <button
    onClick={handlePlaceOrder}
    className="bg-green-600 text-white px-6 py-3 rounded mt-4 hover:bg-green-700"
    >
    ✅ Place Order
  </button>
)}

          </div>
        </>
      )}
    </div>
  );
}
