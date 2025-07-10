import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';
import Addtocart from './addtocart';
import Display from './display';
import ShowPrice from './reciepient';
import { ProfileContext } from '../Context/Profilecontext';
import { ThemeContext } from '../../Contexts/ThemeContext';

const Mainstore = ({
  showcart,
  setShowcart,
  reciept,
  setReciept,
  cart,
  setCart,
  searchitem,
  setSearchitem,
  showDropdown,
  setShowDropdown,
  selectedType,
  setSelectedType,
  allTypes,
  filteredGrocery
}) => {
  const { setuser, setisAuthentication, isAuthentication } = useContext(ProfileContext);
  const { theme, isdark } = useContext(ThemeContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthentication) {
      navigate("/day3/login");
    }
  }, [isAuthentication, navigate]);

  if (!isAuthentication) return null;

  const handleLogout = () => {
    localStorage.removeItem("user");
    setCart([]);
    setShowcart(false);
    setReciept(false);
    setuser(null);
    setisAuthentication(false);
    navigate("/");
  };

  return (
    <>
      <div className={`${theme.card} px-10 py-6 flex items-center justify-between sticky top-0 z-20`}>
        <h2 className={`text-4xl font-extrabold ${theme.text} flex items-center gap-2`}>
          🛒 Rana Grocery Store
        </h2>

        <div className="relative w-full max-w-md mx-10" id="search-bar-container">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3">
            <FaSearch className="text-purple-400 text-xl" />
          </span>
          <input
            className={`w-full pl-10 pr-4 py-2 rounded-xl shadow-md focus:outline-none ${theme.ring} ${theme.card} ${theme.placeholder}`}
            type="search"
            placeholder="Search for products..."
            value={searchitem}
            onChange={(e) => setSearchitem(e.target.value)}
            onFocus={() => setShowDropdown(true)}
          />
          {showDropdown && searchitem && (
            <ul className={`absolute left-0 mt-2 w-full ${theme.card} ${theme.text} border rounded-xl shadow-xl z-30 max-h-60 overflow-y-auto`}>
              {filteredGrocery.length > 0 ? (
                filteredGrocery.map(item => {
                  const name = item.name;
                  const search = searchitem.toLowerCase();
                  const idx = name.toLowerCase().indexOf(search);
                  let before = name, match = '', after = '';
                  if (search && idx !== -1) {
                    before = name.slice(0, idx);
                    match = name.slice(idx, idx + search.length);
                    after = name.slice(idx + search.length);
                  }
                  return (
                    <li key={item.name} className="px-4 py-2 border-b hover:bg-purple-100 cursor-pointer">
                      <span className="font-semibold text-purple-700">
                        {before}
                        {match && <span className="bg-yellow-300 text-black rounded px-1">{match}</span>}
                        {after}
                      </span> - <span className="text-gray-500">Rs. {item.price}</span>
                    </li>
                  );
                })
              ) : (
                <li className="px-4 py-2 text-purple-400">No items found</li>
              )}
            </ul>
          )}
        </div>

        <button
          className="mt-2 ml-5 px-4 py-2 bg-purple-600 text-white rounded-xl shadow-lg hover:bg-purple-700"
          onClick={handleLogout}
        >
          Logout
        </button>

        <Addtocart setCart={setCart} cart={cart} setShowcart={setShowcart} showcart={showcart} />

        <button
          className={`ml-6 px-6 py-2 rounded-xl shadow-lg transition-all ${isdark ? 'bg-white text-black hover:bg-black hover:text-white' : 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'}`}
          onClick={() => setReciept(true)}
        >
          Proceed to Receipt
        </button>
      </div>

      {/* Category Filter */}
      <div className="max-w-7xl mx-auto flex flex-wrap gap-3 justify-center mt-8 mb-2">
        <button
          className={`px-4 py-2 rounded-full font-semibold shadow transition-all border-2 ${
            selectedType === 'All'
              ? 'bg-purple-500 text-white border-purple-500'
              : 'bg-white/80 text-purple-700 border-purple-300 hover:bg-purple-100'
          }`}
          onClick={() => setSelectedType('All')}
        >
          All
        </button>
        {allTypes.map(type => (
          <button
            key={type}
            className={`px-4 py-2 rounded-full font-semibold shadow transition-all border-2 ${
              selectedType === type
                ? 'bg-purple-500 text-white border-purple-500'
                : 'bg-white/80 text-purple-700 border-purple-300 hover:bg-purple-100'
            }`}
            onClick={() => setSelectedType(type)}
          >
            {type}
          </button>
        ))}
      </div>

      {/* Display Products */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 p-8 mt-8">
        {filteredGrocery.map(item => (
          <Display key={item.id} {...item} setCart={setCart} item={item} isdark={isdark} />
        ))}
      </div>

      {/* Receipt Modal */}
      {reciept && (
        <div className="fixed inset-0 bg-black/40 z-40 flex items-center justify-center">
          <ShowPrice setReciept={setReciept} cart={cart} />
        </div>
      )}
    </>
  );
};

export default Mainstore;
