import React, { useContext } from 'react';
import { ThemeContext } from '../../Contexts/ThemeContext';

function Display({ name, type, price, quantity, setCart, item }) {
  const { isdark } = useContext(ThemeContext);

  return (
    <div
      className={`p-6 rounded-2xl shadow-lg border transition-all duration-200 flex flex-col items-center hover:shadow-2xl hover:-translate-y-1
        ${isdark 
          ? 'bg-gradient-to-br from-[#1f1c2c] via-[#2c274e] to-[#1a1a2e] border-purple-800'
          : 'bg-white/90 border-gray-100'
        }`}
    >
      <p className={`mb-4 flex items-center text-2xl font-bold ${isdark ? 'text-white' : 'text-gray-800'}`}>
        {name}
      </p>
      <p className={`mb-2 flex items-center text-base font-semibold ${isdark ? 'text-purple-400' : 'text-purple-500'}`}>
        Type:
        <span className={`ml-2 ${isdark ? 'text-purple-300' : 'text-purple-400'}`}>{type}</span>
      </p>
      <p className={`mb-2 flex items-center text-base font-semibold ${isdark ? 'text-pink-400' : 'text-pink-500'}`}>
        Price:
        <span className={`ml-2 ${isdark ? 'text-pink-300' : 'text-pink-400'}`}>Rs. {price}</span>
      </p>
      <p className={`mb-4 flex items-center text-base font-semibold ${isdark ? 'text-blue-400' : 'text-blue-500'}`}>
        Quantity:
        <span className={`ml-2 ${isdark ? 'text-blue-300' : 'text-blue-400'}`}>{quantity}</span>
      </p>

      <button
        className={`px-4 py-2 rounded-xl shadow font-semibold text-base transition-all
          ${isdark 
            ? 'bg-white text-black hover:bg-black hover:text-white'
            : 'bg-gradient-to-r from-green-400 to-blue-400 text-white hover:from-green-500 hover:to-blue-500'
          }`}
        onClick={() =>
          setCart(prev => {
            const found = prev.find(i => i.name === item.name);
            if (found) {
              return prev.map(i =>
                i.name === item.name ? { ...i, quantity: i.quantity + 1 } : i
              );
            } else {
              return [...prev, { ...item, quantity: 1 }];
            }
          })
        }
      >
        Add To Cart
      </button>
    </div>
  );
}

export default Display;
