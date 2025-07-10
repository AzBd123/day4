import React, { useState, useEffect } from 'react';
import { ThemeContext } from './ThemeContext';

const themes = {
  light: {
    background: 'bg-gradient-to-br from-blue-100 via-purple-200 to-pink-300',
    text: 'text-pink-700',
    card: 'bg-white text-pink-700 border-pink-300',
    button: 'bg-gradient-to-r from-pink-400 to-yellow-300 text-white',
    placeholder: 'placeholder-pink-400',
    border: 'border-pink-300',
    ring: 'focus:ring-2 focus:ring-pink-300',
    navbar: 'bg-gradient-to-br from-blue-100 via-purple-200 to-pink-300',
  },
  dark: {
    background: 'bg-gradient-to-br from-gray-900 via-purple-900 to-blue-900',
    navbar: 'bg-[#101010]',
    text: 'text-white',
    card: 'bg-black/50 backdrop-blur-md border-blue-900 text-white shadow-lg',
    button: 'bg-white text-black',
    placeholder: 'placeholder-purple-400',
    border: 'border-purple-800',
    ring: 'focus:ring-2 focus:ring-blue-900',
  },
};

export const ThemeProvider = ({ children }) => {
  const [isdark, setIsdark] = useState(null);

  useEffect(() => {
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme === 'dark') {
      setIsdark(true);
    } else {
      setIsdark(false);
    }
  }, []);

  useEffect(() => {
    if (isdark !== null) {
      localStorage.setItem('theme', isdark ? 'dark' : 'light');
    }
  }, [isdark]);

  const currtheme = isdark ? themes.dark : themes.light;
  const toggleTheme = () => setIsdark(prev => !prev);

  if (isdark === null) return null;

  return (
    <ThemeContext.Provider value={{ theme: currtheme, isdark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
