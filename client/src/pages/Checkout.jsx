import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Checkout() {
  const { cart, clearCart } = useCart();
  const { token } = useAuth();
  const navigate = useNavigate();

  const handlePlaceOrder = async () => {
    const res = await fetch("http://localhost:5000/api/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({ items: cart })
    });

    const data = await res.json();
    if (res.ok) {
      alert("Order placed!");
      clearCart();
      navigate("/success");
    } else {
      alert(data.msg);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Checkout</h2>
      <ul className="space-y-2">
        {cart.map((item, idx) => (
          <li key={idx} className="flex justify-between">
            <span>{item.name} x {item.quantity}</span>
            <span>₹{item.price * item.quantity}</span>
          </li>
        ))}
      </ul>
      <button
        onClick={handlePlaceOrder}
        className="mt-6 bg-green-600 text-white px-4 py-2 rounded"
      >
        Place Order
      </button>
    </div>
  );
}
