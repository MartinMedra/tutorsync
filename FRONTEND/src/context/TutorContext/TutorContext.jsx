import { createContext, useState, useEffect } from "react";
import axios from "axios";
import propTypes from "prop-types";

export const TutorContext = createContext();

export const TutorProvider = ({ children }) => {
  const [tutors, setTutors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTutors = async () => {
      try {
        const response = await axios.get('http://localhost:3000/tutores');
        setTutors(response.data);
      } catch (error) {
        setError('Error al obtener los tutores.');
      } finally {
        setLoading(false);
      }
    };

    fetchTutors();
  }, []);

  return (
    <TutorContext.Provider value={{ tutors, loading, error }}>
      {children}
    </TutorContext.Provider>
  );
};

TutorProvider.propTypes = {
  children: propTypes.node.isRequired,
};
