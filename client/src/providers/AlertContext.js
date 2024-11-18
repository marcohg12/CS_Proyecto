import React, { createContext, useContext, useState } from 'react';

const AlertContext = createContext();

export function useAlert(){
    return useContext(AlertContext);
}

export function AlertProvider({ children }){

  const [alert, setAlert] = useState(null);
  
  const showAlert = (message, type) => {
    setAlert({ message, type });
    setTimeout(() => setAlert(null), 10000);
  };
  
  return (
    <AlertContext.Provider value={{ alert, showAlert }}>
        {children}
    </AlertContext.Provider>
  );

}
