import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";

export default function Orders() {
  const { token } = useAuth();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/orders", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();
        if (res.ok) setOrders(data);
        else console.error("Error fetching orders:", data);
      } catch (error) {
        console.error("Fetch failed:", error);
      }
    };

    fetchOrders();
  }, [token]);

  const updateStatus = async (order) => {
    const nextStatusMap = {
      "Preparing": "Out for Delivery",
      "Out for Delivery": "Delivered",
      "Delivered": "Delivered",
    };

    try {
      const res = await fetch(`http://localhost:5000/api/orders/${order._id}/status`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status: nextStatusMap[order.status] }),
      });

      const data = await res.json();
      if (data.success) {
        setOrders(orders.map(o => o._id === order._id ? data.order : o));
      } else {
        console.error("Failed to update status:", data.message);
      }
    } catch (error) {
      console.error("Status update error:", error);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">📋 Your Orders</h1>

      {orders.length === 0 ? (
        <p>No orders yet.</p>
      ) : (
        orders.map((order, idx) => (
          <div key={idx} className="bg-white p-4 rounded shadow mb-4">
            <h2 className="font-semibold">Order #{idx + 1}</h2>
            <ul className="list-disc ml-6">
              {order.items.map((item, i) => (
                <li key={i}>
                  {item.name} × {item.quantity} – ₹{item.price}
                </li>
              ))}
            </ul>

            <p className="mt-2">
              <strong>Status:</strong>
              <span
                className={`ml-2 px-2 py-1 rounded text-white text-sm ${
                  order.status === "Preparing"
                    ? "bg-yellow-500"
                    : order.status === "Out for Delivery"
                    ? "bg-blue-500"
                    : "bg-green-500"
                }`}
              >
                {order.status}
              </span>
            </p>

            <button
              onClick={() => updateStatus(order)}
              className="mt-2 text-sm underline text-blue-600"
            >
              Simulate Next Status
            </button>
          </div>
        ))
      )}
    </div>
  );
}
