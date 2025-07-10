import React, { useState, useContext } from "react";
import { HobbiesContext } from "../Contexts/HobbiesContext";

const HobbiesProvider = () => {
  const { hobbies, addHobby, removeHobby } = useContext(HobbiesContext);
  const [input, setInput] = useState("");

  const handleAdd = () => {
    if (input.trim()) {
      addHobby(input.trim());
      setInput("");
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-xl shadow-lg mt-8 text-center">
      <h2 className="text-2xl font-bold mb-4 text-purple-700">My Hobbies</h2>

      <div className="flex gap-2 justify-center mb-4">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter a hobby"
          className="border px-4 py-2 rounded-lg shadow w-full"
        />
        <button
          onClick={handleAdd}
          className="bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-600"
        >
          Add
        </button>
      </div>

      <ul className="space-y-2">
        {hobbies.map((hobby, idx) => (
          <li key={idx} className="flex justify-between items-center px-4 py-2 bg-purple-100 rounded-lg">
            <span>{hobby}</span>
            <button
              onClick={() => removeHobby(hobby)}
              className="text-red-500 hover:text-red-700 font-semibold"
            >
              ✕
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HobbiesProvider;
