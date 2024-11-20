import { createContext, useContext, useState } from "react";
import propTypes from "prop-types";
const AlertContext = createContext();

export const AlertProvider = ({ children }) => {
  const [alert, setAlert] = useState({ message: "", type: "", isVisible: false });

  const showAlert = (message, type) => {
    setAlert({ message, type, isVisible: true });

    // Ocultar alerta después de 3 segundos
    setTimeout(() => {
      setAlert({ message: "", type: "", isVisible: false });
    }, 5000);
  };

  return (
    <AlertContext.Provider value={{ alert, showAlert }}>
      {children}
    </AlertContext.Provider>
  );
};

AlertProvider.propTypes = {
  children: propTypes.func.isRequired,
};

export const useAlert = () => useContext(AlertContext);
