import React, { useState, useContext, useRef, useEffect } from 'react';
import Modal from './Modal';
import { ThemeContext } from '../Contexts/ThemeContext';
import { Sun, Moon } from 'lucide-react';
import { RiNavigationFill } from "react-icons/ri";
import { MdRoomPreferences } from "react-icons/md";
const Navbar = () => {
  const [showModal, setShowModal] = useState(false);
  const [showPref, setShowPref] = useState(false);
  const { theme, toggleTheme, isdark } = useContext(ThemeContext);
  const [showTooltip, setShowTooltip] = useState(false);

  const prefRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (prefRef.current && !prefRef.current.contains(e.target)) {
        setShowPref(false);
      }
    };

    if (showPref) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showPref]);

  return (
    <>
      <nav className={`fixed top-0 left-0 w-full  flex justify-between items-center z-50 `}>
        <button
          onClick={() => setShowModal(true)}
          className={`px-4 py-1 rounded ${theme.button}`}
        >
          <RiNavigationFill />
        </button>
        <button
          onClick={() => setShowPref(true)}
          className={`px-4 py-1 rounded ${theme.button}`}
        >
        <MdRoomPreferences />
        </button>
      </nav>

      {/* Navigation Modal */}
      <Modal show={showModal} onClose={() => setShowModal(false)} setShowModal={setShowModal} />

      {/* Preferences Modal */}
      {showPref && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/30">
          <div ref={prefRef} className={`rounded-lg p-6 w-[300px] text-center space-y-4 ${theme.card}`}>
            <h2 className={`text-xl font-bold ${theme.text}`}>Preferences</h2>

            {/* Toggle Switch */}
            <div className="relative w-20 mx-auto">
              <div className="w-16 h-8 bg-gray-700 rounded-full flex items-center px-2 shadow-inner relative">
                <Sun strokeWidth={1.25} className="w-5 h-5 text-yellow-400" />
                <Moon strokeWidth={1.25} className="w-5 h-5 text-blue-300 ml-auto" />
                <span
                  className={`absolute top-1 left-1 w-6 h-6 bg-white cursor-pointer rounded-full shadow-md transition-transform duration-300 border border-gray-400 ${
                    isdark ? 'translate-x-8' : 'translate-x-0'
                  }`}
                  onClick={toggleTheme}
                  onMouseEnter={() => setShowTooltip(true)}
                  onMouseLeave={() => setShowTooltip(false)}
                />
              </div>
              {showTooltip && (
                <span className="absolute top-0 right-24 text-xs px-3 py-1 rounded shadow-lg z-50 bg-black text-white">
                  {isdark ? 'Dark Mode' : 'Light Mode'}
                </span>
              )}
            </div>

            <button
              onClick={() => setShowPref(false)}
              className="mt-4 text-sm text-red-600 underline"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
