import { useEffect, useState } from "react";
import { ProfileContext } from "./Profilecontext"; 

export const ProfileProvider = ({ children }) => {
  const [user, setuser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const [isAuthentication, setisAuthentication] = useState(() => {
    return !!localStorage.getItem("user");
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  return (
    <ProfileContext.Provider value={{ user, setuser, isAuthentication, setisAuthentication }}>
      {children}
    </ProfileContext.Provider>
  );
};
