"use client";
import { createContext, useContext, useState } from "react";

const HandleContext = createContext();

export function HandleProvider({ children }) {
  const [selectedHandle, setSelectedHandle] = useState(null);

  return (
    <HandleContext.Provider value={{ selectedHandle, setSelectedHandle }}>
      {children}
    </HandleContext.Provider>
  );
}

export function useHandle() {
  const context = useContext(HandleContext);
  if (!context) {
    throw new Error("useHandle must be used within a HandleProvider");
  }
  return context;
}
