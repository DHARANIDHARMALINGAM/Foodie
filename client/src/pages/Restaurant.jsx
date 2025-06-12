import { useParams } from "react-router-dom";
import menuItems from "../data/menuItems";
import restaurants from "../data/restaurants";
import MenuItemCard from "../components/MenuItemCard";
import { useCart } from "../context/CartContext";

export default function Restaurant() {
  const { id } = useParams();
  const restaurant = restaurants.find(r => r.id === id);
  const menu = menuItems[id] || [];


const { addToCart } = useCart();
const handleAddToCart = (item) => {
    addToCart(item);
    console.log("Added to cart:", item);
    }

  if (!restaurant) return <p className="p-4">Restaurant not found</p>;

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="mb-6">
        <img
          src={restaurant.image}
          alt={restaurant.name}
          className="w-full h-64 object-cover rounded-xl shadow"
        />
        <h1 className="text-3xl font-bold mt-4">{restaurant.name}</h1>
        <p className="text-gray-600">{restaurant.cuisine}</p>
        <p className="text-yellow-500 mt-1">⭐ {restaurant.rating}</p>
      </div>

      <h2 className="text-2xl font-semibold mb-4">Menu</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {menu.map(item => (
          <MenuItemCard key={item.id} item={item} onAdd={handleAddToCart} />
        ))}
      </div>
    </div>
  );
}
