import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const userContext = createContext({});

export function UserContextProvider({ children }) {

  const [user, setUser] = useState(null);
  const [ready, setReady] = useState(false); 

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!user && token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      axios.get("/profile").then(({ data }) => {
        setUser(data);
        setReady(true);
        //console.log("ready canvi") 
      });
    }
  }, []);

  return (
    <userContext.Provider value={{ user, setUser, ready }}>
      {children}
    </userContext.Provider>
  );
}
