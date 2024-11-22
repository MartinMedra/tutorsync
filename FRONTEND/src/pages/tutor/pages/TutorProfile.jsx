import { useState, useEffect } from "react";
import axios from "axios";

const TutorProfile = () => {
  const [profile, setProfile] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);

  // Fetch perfil al cargar la página
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get("http://localhost:3000/profile", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        setProfile(response.data);
        setFormData(response.data);
      } catch (error) {
        console.error("Error al obtener el perfil:", error);
      }
    };
    fetchProfile();
  }, []);

  // Manejo de cambios en el formulario
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Actualizar perfil
  const handleUpdate = async () => {
    const updateData = { ...formData };
  
    // Eliminar campos de contraseñas si no se proporcionan
    if (!formData.password) {
      delete updateData.password;
    }
    if (!formData.confirmPassword) {
      delete updateData.confirmPassword;
    }
  
    try {
      setLoading(true);
      await axios.put("http://localhost:3000/updateprofile", updateData, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setProfile(updateData); // Actualizar el perfil en el estado
      setIsEditing(false);
      alert("Perfil actualizado correctamente.");
    } catch (error) {
      console.error("Error al actualizar el perfil:", error);
      alert("Error al actualizar el perfil. Por favor, inténtalo de nuevo.");
    } finally {
      setLoading(false);
    }
  };


  if (!profile) {
    return <p>Cargando perfil...</p>;
  }

  return (
    <div className="max-w-4xl mx-auto p-8 text-gray-500 rounded-lg shadow-lg">
      <h1 className="text-3xl font-semibold mb-6 text-center">Mi Perfil</h1>
      <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-light mb-1">Nombre</label>
          <input
            type="text"
            name="name"
            value={formData.name || ""}
            onChange={handleChange}
            disabled={!isEditing}
            className={`w-full px-6 py-3 text-black border  rounded-full appearance-none placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm ${
              isEditing
                ? "bg-white border-green-400"
                : "bg-gray-200 border-white cursor-not-allowed"
            }`}
          />
        </div>
        <div>
          <label className="block text-sm font-light mb-1">Correo</label>
          <input
            type="email"
            name="email"
            value={formData.email || ""}
            onChange={handleChange}
            disabled={!isEditing}
            className={`w-full px-6 py-3 text-black border  rounded-full appearance-none placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm ${
              isEditing
                ? "bg-white border-green-400"
                : "bg-gray-200 border-white cursor-not-allowed"
            }`}
          />
        </div>
        <div>
          <label className="block text-sm font-light mb-1">Materia</label>
          <input
            type="text"
            name="subject"
            value={formData.subject || ""}
            onChange={handleChange}
            disabled={!isEditing}
            className={`w-full px-6 py-3 text-black border  rounded-full appearance-none placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm ${
              isEditing
                ? "bg-white border-green-400"
                : "bg-gray-200 border-white cursor-not-allowed"
            }`}
          />
        </div>
        <div>
          <label className="block text-sm font-light mb-1">Contraseña</label>
          <input
            type="password"
            name="password"
            onChange={handleChange}
            placeholder="Nueva contraseña"
            disabled={!isEditing}
            className={`w-full px-6 py-3 text-black border  rounded-full appearance-none placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm ${
              isEditing
                ? "bg-white border-green-400"
                : "bg-gray-200 border-white cursor-not-allowed"
            }`}
          />
        </div>
        <div>
          <label className="block text-sm font-light mb-1">
            Confirmar Contraseña
          </label>
          <input
            type="password"
            name="confirmPassword"
            onChange={handleChange}
            placeholder="Confirmar contraseña"
            disabled={!isEditing}
            className={`w-full px-6 py-3 text-black border  rounded-full appearance-none placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm ${
              isEditing
                ? "bg-white border-green-400"
                : "bg-gray-200 border-white cursor-not-allowed"
            }`}
          />
        </div>
      </form>
      <div className="flex justify-center mt-6">
        {isEditing ? (
          <button
          onClick={handleUpdate}
          disabled={loading}
          className="relative flex items-center px-6 py-3 overflow-hidden font-medium transition-all bg-indigo-500 rounded-md group"
        >
          <span className="absolute top-0 right-0 inline-block w-4 h-4 transition-all duration-500 ease-in-out bg-indigo-700 rounded group-hover:-mr-4 group-hover:-mt-4">
            <span className="absolute top-0 right-0 w-5 h-5 rotate-45 translate-x-1/2 -translate-y-1/2 bg-white"></span>
          </span>
          <span className="absolute bottom-0 rotate-180 left-0 inline-block w-4 h-4 transition-all duration-500 ease-in-out bg-indigo-700 rounded group-hover:-ml-4 group-hover:-mb-4">
            <span className="absolute top-0 right-0 w-5 h-5 rotate-45 translate-x-1/2 -translate-y-1/2 bg-white"></span>
          </span>
          <span className="absolute bottom-0 left-0 w-full h-full transition-all duration-500 ease-in-out delay-200 -translate-x-full bg-indigo-600 rounded-md group-hover:translate-x-0"></span>
          <span className="relative w-full text-left text-white transition-colors duration-200 ease-in-out group-hover:text-white">
          {loading ? "Guardando..." : "Guardar"}
          </span>
        </button>
          
        ) : (
          /* From Uiverse.io by Itskrish01 */
          <button
            onClick={() => setIsEditing(true)}
            className="relative flex items-center px-6 py-3 overflow-hidden font-medium transition-all bg-indigo-500 rounded-md group"
          >
            <span className="absolute top-0 right-0 inline-block w-4 h-4 transition-all duration-500 ease-in-out bg-indigo-700 rounded group-hover:-mr-4 group-hover:-mt-4">
              <span className="absolute top-0 right-0 w-5 h-5 rotate-45 translate-x-1/2 -translate-y-1/2 bg-white"></span>
            </span>
            <span className="absolute bottom-0 rotate-180 left-0 inline-block w-4 h-4 transition-all duration-500 ease-in-out bg-indigo-700 rounded group-hover:-ml-4 group-hover:-mb-4">
              <span className="absolute top-0 right-0 w-5 h-5 rotate-45 translate-x-1/2 -translate-y-1/2 bg-white"></span>
            </span>
            <span className="absolute bottom-0 left-0 w-full h-full transition-all duration-500 ease-in-out delay-200 -translate-x-full bg-indigo-600 rounded-md group-hover:translate-x-0"></span>
            <span className="relative w-full text-left text-white transition-colors duration-200 ease-in-out group-hover:text-white">
              Editar
            </span>
          </button>
        )}
      </div>
    </div>
  );
};

export default TutorProfile;
