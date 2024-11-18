// components/Header.js
import { useState, useEffect } from 'react';
import axios from 'axios';

function Header() {

  const [user, setUser] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('No estás autenticado.');
        return;
      }
      try {
        const response = await axios.get('http://localhost:3000/profile', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setUser(response.data);
        // console.log(response.data);
      } catch (error) {
        setError('Error al cargar el perfil.');
      }
    };
  
    fetchProfile();
  }, []);


  return (
    <header className="flex flex-col md:flex-row items-center justify-between p-4 md:p-8">
    <div className="text-center md:text-left">
      <h2 className="text-2xl font-semibold">Hola, {user.name}!</h2>
      <p className="text-gray-600">Aquí puedes administrar tus tutorías y citas.</p>
    </div>
  </header>
  );
}

export default Header;
