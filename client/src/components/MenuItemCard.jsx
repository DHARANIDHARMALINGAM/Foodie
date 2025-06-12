export default function MenuItemCard({ item, onAdd }) {
  return (
    <div className="bg-white rounded-xl shadow hover:shadow-lg overflow-hidden transition">
      <img src={item.image} alt={item.name} className="h-40 w-full object-cover" />
      <div className="p-4 flex flex-col justify-between h-32">
        <h3 className="text-lg font-bold">{item.name}</h3>
        <div className="flex justify-between items-center mt-2">
          <span className="text-orange-500 font-semibold">₹ {item.price}</span>
          <button
            onClick={() => onAdd(item)}
            className="bg-orange-500 text-white px-3 py-1 rounded hover:bg-orange-600 text-sm"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
