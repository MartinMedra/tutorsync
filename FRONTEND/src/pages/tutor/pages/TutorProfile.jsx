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
      [e.target.name]: e.target.value
    });
  };

  // Actualizar perfil
  const handleUpdate = async () => {
    if (formData.password && formData.password !== formData.confirmPassword) {
      alert("Las contraseñas no coinciden.");
      return;
    }
    try {
      setLoading(true);
      await axios.put("http://localhost:3000/updateprofile", formData, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setProfile(formData);
      setIsEditing(false);
      alert("Perfil actualizado correctamente.");
    } catch (error) {
      console.error("Error al actualizar el perfil:", error);
      alert("Error al actualizar el perfil. Por favor, inténtalo de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  // Eliminar perfil
  const handleDelete = async () => {
    if (window.confirm("¿Estás seguro de que deseas eliminar tu perfil?")) {
      try {
        await axios.delete("http://localhost:3000/deleteprofile", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        alert("Perfil eliminado correctamente.");
        window.location.href = "/login";
      } catch (error) {
        console.error("Error al eliminar el perfil:", error);
      }
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
              isEditing ? "bg-white border-green-400" : "bg-gray-200 border-white cursor-not-allowed"
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
              isEditing ? "bg-white border-green-400" : "bg-gray-200 border-white cursor-not-allowed"
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
              isEditing ? "bg-white border-green-400" : "bg-gray-200 border-white cursor-not-allowed"
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
              isEditing ? "bg-white border-green-400" : "bg-gray-200 border-white cursor-not-allowed"
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
              isEditing ? "bg-white border-green-400" : "bg-gray-200 border-white cursor-not-allowed"
            }`}
          />
        </div>
      </form>
      <div className="flex justify-between mt-6">
        {isEditing ? (
          <button
            onClick={handleUpdate}
            className="px-6 py-2 bg-green-500 hover:bg-green-600 rounded"
            disabled={loading}
          >
            {loading ? "Guardando..." : "Guardar"}
          </button>
        ) : (
          <button
            onClick={() => setIsEditing(true)}
            className="px-6 py-2 bg-blue-500 hover:bg-blue-600 rounded"
          >
            Editar
          </button>
        )}
        <button
          onClick={handleDelete}
          className="px-6 py-2 bg-red-500 hover:bg-red-600 rounded"
        >
          Eliminar perfil
        </button>
      </div>
    </div>
  );
};

export default TutorProfile;
