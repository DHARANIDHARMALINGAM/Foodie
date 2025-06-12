import { Link } from 'react-router-dom';

export default function RestaurantCard({ restaurant }) {
  return (
    <Link to={`/restaurant/${restaurant.id}`}>
      <div className="bg-white shadow-lg rounded-xl overflow-hidden hover:scale-105 transition-transform duration-200">
        <img src={restaurant.image} alt={restaurant.name} className="w-full h-48 object-cover" />
        <div className="p-4">
          <h2 className="text-xl font-semibold">{restaurant.name}</h2>
          <p className="text-gray-500">{restaurant.cuisine}</p>
          <p className="mt-1 text-yellow-500 font-semibold">⭐ {restaurant.rating}</p>
        </div>
      </div>
    </Link>
  );
}
