import { createContext, useEffect, useState } from "react";
import axios from "axios";
import propTypes from "prop-types";
// Creamos el contexto

export const AuthContext = createContext();

// Proveedor del contexto

export const AuthProvider = ({ children }) => {
    const [isAuthenticated,  setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const checkUserSession = async () => {
            try {
                const token = localStorage.getItem('token');
                if (token){
                    const response = await axios.get('http://localhost:3000/profile', {
                        headers : {Autorization : `Bearer ${token}`}
                });
                setUser(response.data);
                }
            } catch (error) {
                console.error('Error al cargar el perfil:', error);
            } finally {
                setLoading(false);
            }
        };
    
        checkUserSession();
      }, []);
    
      const login = async ({ email, password }) => {
        try {
            const response = await axios.post('http://localhost:3000/login', {
                email,
                password,
            });
            setUser(response.data);
            localStorage.setItem('token', response.data.token);
        } catch (error) {
            throw new Error('Error al iniciar sesión');
        }
        setIsAuthenticated(true);
        }
    
    const logout = () => {
            setIsAuthenticated(false);
            setUser(null);
            localStorage.removeItem('token');
        };


    return (
        <AuthContext.Provider value={{ isAuthenticated, user, loading, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

AuthProvider.propTypes = {
    children: propTypes.node.isRequired,
};