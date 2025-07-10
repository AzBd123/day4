import { useState, useEffect } from "react";
import { HobbiesContext } from "./HobbiesContext";

const Hobbies = ({ children }) => {
  const [hobbies, setHobbies] = useState([
    "Playing Football",
    "Watching Anime",
    "Watching Cricket"
  ]);
  const [name, setName] = useState("Rana Huzaifa Farooq");
  const [role, setRole] = useState("Computer Scientist");

  useEffect(() => {
    const storedName = localStorage.getItem("userName");
    const storedRole = localStorage.getItem("userRole");
    const storedHobbies = JSON.parse(localStorage.getItem("userHobbies"));

    if (storedName) setName(storedName);
    if (storedRole) setRole(storedRole);
    if (storedHobbies) setHobbies(storedHobbies);
  }, []);

  useEffect(() => {
    localStorage.setItem("userName", name);
    localStorage.setItem("userRole", role);
    localStorage.setItem("userHobbies", JSON.stringify(hobbies));
  }, [name, role, hobbies]);

  const addHobby = (hobby) => {
    if (!hobbies.includes(hobby)) {
      setHobbies((prev) => [...prev, hobby]);
    }
  };

  const removeHobby = (hobby) => {
    setHobbies((prev) => prev.filter((h) => h !== hobby));
  };

  return (
    <HobbiesContext.Provider value={{ hobbies, addHobby, removeHobby, name, setName, role, setRole }}>
      {children}
    </HobbiesContext.Provider>
  );
};

export default Hobbies;
