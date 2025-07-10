import React, { useContext, useState } from 'react';
import { ThemeContext } from '../Contexts/ThemeContext';
import { HobbiesContext } from '../Contexts/HobbiesContext';
import ranaImage from '../assets/rana.jpeg';

const Home = () => {
  const { theme } = useContext(ThemeContext);
  const { name, setName, role, setRole, hobbies, addHobby, removeHobby } = useContext(HobbiesContext);

  const [editing, setEditing] = useState(false);
  const [tempName, setTempName] = useState(name);
  const [tempRole, setTempRole] = useState(role);
  const [inputHobby, setInputHobby] = useState("");

  const handleSave = () => {
    setName(tempName);
    setRole(tempRole);
    setEditing(false);
  };

  const handleAddHobby = () => {
    if (inputHobby.trim()) {
      addHobby(inputHobby.trim());
      setInputHobby("");
    }
  };

  return (
    <div className={`flex justify-center items-center h-screen w-screen ${theme.background}`}>
      <div className={`rounded-lg p-4 w-[350px] space-y-3 text-center shadow-xl ${theme.card}`}>
        
        {/* Image */}
        <div className="flex justify-center">
          <img
            src={ranaImage}
            className="w-28 h-28 rounded-full object-cover shadow-lg border-4 border-purple-500"
            alt="Profile"
          />
        </div>

        {/* Name & Role */}
        {editing ? (
          <div className="space-y-2">
            <input
              className="w-full p-2 rounded border focus:outline-none focus:ring text-sm"
              value={tempName}
              onChange={(e) => setTempName(e.target.value)}
              placeholder="Enter Name"
            />
            <input
              className="w-full p-2 rounded border focus:outline-none focus:ring text-sm"
              value={tempRole}
              onChange={(e) => setTempRole(e.target.value)}
              placeholder="Enter Role"
            />
            <div className="flex gap-2 justify-center">
              <button
                onClick={handleSave}
                className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 text-sm"
              >
                Save
              </button>
              <button
                onClick={() => setEditing(false)}
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-sm"
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <>
            <h1 className={`text-xl font-bold ${theme.text}`}>{name}</h1>
            <p className={`text-sm text-gray-500`}>{role}</p>
            <button
              onClick={() => {
                setTempName(name);
                setTempRole(role);
                setEditing(true);
              }}
              className="text-blue-600 text-xs underline hover:text-blue-800"
            >
              /edit
            </button>
          </>
        )}

        {/* Hobbies */}
        <div className="text-left">
          <h3 className={`text-base font-semibold mb-1 ${theme.text}`}>Hobbies:</h3>
          
          {/* Add Hobby */}
          <div className="flex gap-2 mb-2">
            <input
              value={inputHobby}
              onChange={(e) => setInputHobby(e.target.value)}
              placeholder="New hobby"
              className="flex-1 px-2 py-1 rounded border text-sm"
            />
            <button
              onClick={handleAddHobby}
              className="bg-purple-500 text-white px-2 rounded hover:bg-purple-600 text-sm"
            >
              Add
            </button>
          </div>

          {/* List */}
          <div className="flex flex-wrap gap-2">
            {hobbies.map((hobby, idx) => (
              <span
                key={idx}
                className="flex items-center gap-1 bg-purple-200 text-purple-800 rounded-full px-3 py-1 text-xs"
              >
                {hobby}
                <button onClick={() => removeHobby(hobby)} className="text-red-500 hover:text-red-700">
                  ✕
                </button>
              </span>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default Home;
