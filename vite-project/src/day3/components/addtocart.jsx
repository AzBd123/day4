
import { FaCartArrowDown } from "react-icons/fa";
import React, { useEffect, useRef } from 'react';


function Addtocart({ cart, setCart, setShowcart, showcart }) {
  const cartRef = useRef(null);
  useEffect(() => {
    const handleClick = (e) => {
      if (cartRef.current && !cartRef.current.contains(e.target)) {
        setShowcart(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [setShowcart]);

  return (
    <div className='relative' id="cart-container" ref={cartRef}>
      <button className='flex items-center px-4 py-2 ml-30 border rounded-lg shadow-lg bg-white' id="cart-button"
        onClick={() => setShowcart((prev) => !prev)}>
        <FaCartArrowDown className='text-black h-6 w-6' />
      </button>
      <span className="absolute top-0 right-0 bg-red-500 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">
        {cart.reduce((sum, item) => sum + item.quantity, 0)}
      </span>
      {showcart && (
        <ul className="absolute right-0 mt-2 w-56 bg-white text-black border rounded-lg shadow-lg z-10">
          {cart.length > 0 ? (
            cart.map((item) => (
              <li
                key={item.name}
                className="px-4 py-2 border-b hover:bg-gray-100 flex justify-between items-center"
              >
                <span>{item.name} - Pr: {item.price} - Qty: {item.quantity}</span>
                <div className="flex items-center">
                  <button
                    className="ml-2 px-2 py-1 bg-gray-300 text-black rounded hover:bg-gray-400"
                    onClick={() => setCart(prev => prev.map(i => i.name === item.name ? { ...i, quantity: i.quantity + 1 } : i))}
                  >
                    +
                  </button>
                  <button
                    className="ml-2 px-2 py-1 bg-gray-300 text-black rounded hover:bg-gray-400"
                    onClick={() => {
                      if (item.quantity === 1) {
                        setCart(prev => prev.filter(i => i.name !== item.name));
                      } else {
                        setCart(prev => prev.map(i => i.name === item.name ? { ...i, quantity: i.quantity - 1 } : i));
                      }
                    }}
                  >
                    -
                  </button>
                  <button
                    className="ml-2 px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                    onClick={() => setCart(prev => prev.filter(i => i.name !== item.name))}
                  >
                    Remove
                  </button>
                </div>
              </li>
            ))
          ) : (
            <li className="px-4 py-2 text-gray-500">Cart is empty</li>
          )}
        </ul>
      )}
    </div>
  );
}
export default Addtocart;