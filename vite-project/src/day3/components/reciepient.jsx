import { IoBagCheckOutline } from "react-icons/io5";

function ShowPrice({ setReciept, cart }) {
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
 
  return (
    <div className="bg-white text-black p-8 rounded-lg shadow-lg max-w-md mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-4 flex items-center justify-center">Receipt <IoBagCheckOutline className="ml-2 text-green-600 h-7 w-7" /></h2>
      <ul className="mb-4">
        {cart.map((item, idx) => (
          <li
            key={item.name}
            className={`flex justify-between py-2${idx !== 0 ? ' border-t' : ''}`}
          >
            <span>{item.name}</span>
            <span>Rs. {item.price} x {item.quantity}</span>
            <span>= Rs. {item.price * item.quantity}</span>
          </li>
        ))}
      </ul>
      <div className="text-xl font-semibold flex justify-between border-t pt-4">
        <span>Total:</span>
        <span>Rs. {total}</span>
      </div>
      <div className="flex justify-center mt-6">
        <button className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800" onClick={() => setReciept(false)}>
          Close
        </button>
      </div>
    </div>
  );
}
export default ShowPrice;