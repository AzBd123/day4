import React, { useEffect, useState, useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './Components/Navbar';
import Home from './Components/Home';
import Day1 from './Day1/Day1';
import Day2 from './Day2/Day2';
import Day3 from './day3/Day3';
import Signup from './day3/components/Signup';
import Login from './day3/components/Login';
import Mainstore from './day3/components/Mainstore';
import { ProfileProvider } from './day3/Context/ProfileProvide';
import { ProfileContext } from './day3/Context/Profilecontext'; 
import Grocery from './day3/components/Products';
import  Hobbies  from './Contexts/Hobbies';

const AppRoutes = () => {
  const [showcart, setShowcart] = useState(false);
  const [reciept, setReciept] = useState(false);
  const [cart, setCart] = useState([]);
  const [searchitem, setSearchitem] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedType, setSelectedType] = useState('All');

  const { isAuthentication } = useContext(ProfileContext); 

  const allTypes = Array.from(
  new Set(Grocery.flatMap(item => (Array.isArray(item.type) ? item.type : [item.type])))
  );

  const filteredGrocery = Grocery.filter((item) => {
  const matchesType =
    selectedType === 'All' ||
    (Array.isArray(item.type) ? item.type.includes(selectedType) : item.type === selectedType);
  const matchesSearch = item.name.toLowerCase().includes(searchitem.toLowerCase());
    return matchesType && matchesSearch;
  });

  useEffect(() => {
    const handleClick = (e) => {
      if (!e.target.closest('#search-bar-container')) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/day1" element={<Day1 />} />
      <Route path="/day2" element={<Day2 />} />
      <Route path="/day3" element={<Day3 />} />
      <Route path="/day3/signup" element={<Signup />} />
      <Route path="/day3/login" element={<Login />} />
      <Route
        path="/day3/shop"
        element={
          isAuthentication ? (
            <Mainstore
              showcart={showcart}
              setShowcart={setShowcart}
              reciept={reciept}
              setReciept={setReciept}
              cart={cart}
              setCart={setCart}
              searchitem={searchitem}
              setSearchitem={setSearchitem}
              showDropdown={showDropdown}
              setShowDropdown={setShowDropdown}
              selectedType={selectedType}
              setSelectedType={setSelectedType}
              allTypes={allTypes}
              filteredGrocery={filteredGrocery}
            />
          ) : (
            <Navigate to="/day3/login" />
          )
        }
      />
    </Routes>
  );
};

const App = () => {
  return (
      <ProfileProvider>
      <Hobbies>
        <Navbar />
        <AppRoutes />
      </Hobbies>
    </ProfileProvider>
  );
};

export default App;
