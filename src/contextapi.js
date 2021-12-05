import React, { useContext } from "react";

const UserContext = React.createContext();
export const UserProvider = ({ children }) => {
  const [user, setUser] = React.useState("");
  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  return useContext(UserContext);
};
