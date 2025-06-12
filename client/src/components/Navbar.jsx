import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { ShoppingCart } from "lucide-react";

export default function Navbar() {
  const { cart } = useCart();
  const { user, logout } = useAuth();
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <nav className="bg-white shadow-md px-6 py-4 flex justify-between items-center sticky top-0 z-50">
      <Link to="/home" className="text-2xl font-bold text-orange-500">Foodie</Link>

      <div className="flex gap-6 items-center">
        <Link to="/home" className="hover:text-orange-600 font-medium">Home</Link>
        <Link to="/orders" className="hover:text-orange-600 font-medium">My Orders</Link>


        <Link to="/cart" className="relative hover:text-orange-600 font-medium">
          <ShoppingCart className="inline-block w-6 h-6" />
          {totalItems > 0 && (
            <span className="absolute -top-2 -right-3 bg-orange-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {totalItems}
            </span>
          )}
        </Link>

        {user ? (
          <div className="flex items-center gap-3">
            <span className="font-medium text-gray-700">👋 {user.name}</span>
            <button onClick={logout} className="text-red-500 hover:underline">Logout</button>
          </div>
        ) : (
          <div className="flex gap-4">
            <Link to="/login" className="hover:text-orange-500 font-medium">Login</Link>
            <Link to="/register" className="hover:text-orange-500 font-medium">Register</Link>
            
          </div>
        )}
      </div>
    </nav>
  );
}
