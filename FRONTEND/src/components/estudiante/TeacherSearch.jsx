import  { useState, useContext } from 'react';
import Fuse from 'fuse.js';
import { TutorContext } from '../../context/TutorContext/TutorContext';

function TeacherSearch() {
  const { tutors, loading, error } = useContext(TutorContext); // Acceder al contexto de tutor
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);

  // Configuración de Fuse.js
  const fuse = new Fuse(tutors, {
    keys: ['name'], // Campo de búsqueda dentro de cada tutor
    includeScore: true, // Incluye la puntuación de coincidencia en los resultados
  });

  const handleSearch = (e) => {
    const term = e.target.value;
    setSearchTerm(term);

    if (term) {
      // Realiza la búsqueda en tiempo real
      const searchResults = fuse.search(term).slice(0, 2);
      setResults(searchResults.map(result => result.item));
    } else {
      setResults(tutors); // Resetea los resultados si no hay búsqueda
    }
  };

  if (loading) return <p>Cargando tutores...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-lg font-semibold mb-4 text-gray-700">Buscar Profesores</h2>
      <input
        type="text"
        className='w-full p-2 border rounded-md mb-4'
        value={searchTerm}
        onChange={handleSearch}
        placeholder="Busca aquí..."
      />
      <ul>
        {results.map((item) => (
          <li className='flex justify-between items-center' key={item.id}>
            <div>
              <p className="font-medium text-gray-700">Profesor: {item.name}</p>
              <p className="text-gray-500">Materia: {item.subject || 'No especificada'}</p>
            </div>
            <button className="text-blue-500 font-semibold hover:text-blue-700">Agendar</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TeacherSearch;
