import React, { useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { ProfileContext } from './Context/Profilecontext';
import { ThemeContext } from '../Contexts/ThemeContext';

const Day3 = () => {
  const { setuser, setisAuthentication } = useContext(ProfileContext);
  const { theme, isdark } = useContext(ThemeContext);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      setuser(storedUser);
      setisAuthentication(true);
    }
  }, [setuser, setisAuthentication]);

  return (
    <div className={`min-h-screen flex items-center justify-center px-6 ${theme.background}`}>
      <div className={`shadow-xl rounded-2xl p-10 max-w-2xl w-full text-center ${theme.card}`}>
        <h2 className={`text-4xl sm:text-5xl font-extrabold font-serif mb-6 ${theme.text}`}>
          Welcome To Rana Grocery Store
        </h2>

        <div className="flex flex-wrap gap-4 justify-center mt-6">
          <Link to="/day3/signup">
            <button
              className={`px-6 py-2 rounded-lg shadow transition duration-300 ${theme.button} ${
                isdark ? 'hover:bg-purple-500' : 'hover:brightness-80'
              }`}
            >
              Sign Up
            </button>
          </Link>
          <Link to="/day3/login">
            <button
              className={`px-6 py-2 rounded-lg shadow transition duration-300 ${theme.button} ${
                isdark ? 'hover:bg-purple-500' : 'hover:brightness-80'
              }`}
            >
              Log In
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Day3;
