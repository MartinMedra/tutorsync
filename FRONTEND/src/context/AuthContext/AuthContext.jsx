//AuthContext.jsx

import { createContext, useEffect, useState } from "react";
import axios from "axios";
import propTypes from "prop-types";

// Creamos el contexto
export const AuthContext = createContext();

// Proveedor del contexto
export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true); // Inicializar en `true`

    useEffect(() => {
        const checkUserSession = async () => {
            try {
                const token = localStorage.getItem("token");
                if (token) {
                    const response = await axios.get("http://localhost:3000/profile", {
                        headers: { Authorization: `Bearer ${token}` },
                    });
                    setUser(response.data);
                    setIsAuthenticated(true);
                }
            } catch (error) {
                console.error("Error al cargar el perfil:", error);
                setIsAuthenticated(false);
            } finally {
                setLoading(false); // Cambiar el estado de carga aquí
            }
        };
        checkUserSession();
    }, []);

    const login = async ({ email, password }) => {
        try {
            const response = await axios.post("http://localhost:3000/login", { email, password });
            localStorage.setItem("token", response.data.token);
            
            // Después de iniciar sesión, obtener los datos del perfil del usuario
            const profileResponse = await axios.get("http://localhost:3000/profile", {
                headers: { Authorization: `Bearer ${response.data.token}` },
            });
            setUser(profileResponse.data);
            setIsAuthenticated(true);
        } catch (error) {
            throw new Error("Error al iniciar sesión");
        }
    };
    

    const logout = () => {
        setIsAuthenticated(false);
        setUser(null);
        localStorage.removeItem("token");
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, user, loading, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

AuthProvider.propTypes = {
    children: propTypes.node.isRequired,
};
