import { useState, useEffect } from 'react';
import axios from 'axios';

const TutorProfile = () => {
    const [profile, setProfile] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({});
    const [loading, setLoading] = useState(false);

    // Fetch perfil al cargar la página
    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await axios.get('http://localhost:3000/profile', {
                    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
                });
                setProfile(response.data);
                setFormData(response.data);
            } catch (error) {
                console.error('Error al obtener el perfil:', error);
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
        try {
            setLoading(true);
            await axios.put('http://localhost:3000/updateprofile', formData, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
            });
            setProfile(formData);
            setIsEditing(false);
            alert('Perfil actualizado correctamente.');
        } catch (error) {
            console.error('Error al actualizar el perfil:', error);
        } finally {
            setLoading(false);
        }
    };

    // Eliminar perfil
    const handleDelete = async () => {
        if (window.confirm('¿Estás seguro de que deseas eliminar tu perfil?')) {
            try {
                await axios.delete('http://localhost:3000/deleteprofile', {
                    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
                });
                alert('Perfil eliminado correctamente.');
                // Redirigir al usuario a la página de inicio de sesión u otra página
                window.location.href = '/login';
            } catch (error) {
                console.error('Error al eliminar el perfil:', error);
            }
        }
    };

    if (!profile) {
        return <p>Cargando perfil...</p>;
    }

    return (
        <div className="max-w-4xl mx-auto p-6 bg-gray-800 text-white rounded-lg shadow-lg">
            <h1 className="text-2xl font-bold mb-4">Perfil</h1>

            {/* Formulario */}
            <form className="space-y-4">
                <div>
                    <label className="block text-sm font-medium">Nombre</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name || ''}
                        onChange={handleChange}
                        disabled={!isEditing}
                        className={`w-full p-2 rounded ${
                            isEditing ? 'bg-gray-700' : 'bg-gray-600 cursor-not-allowed'
                        }`}
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium">Correo</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email || ''}
                        onChange={handleChange}
                        disabled={!isEditing}
                        className={`w-full p-2 rounded ${
                            isEditing ? 'bg-gray-700' : 'bg-gray-600 cursor-not-allowed'
                        }`}
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium">Identificación</label>
                    <input
                        type="text"
                        name="identification"
                        value={formData.identification || ''}
                        onChange={handleChange}
                        disabled={!isEditing}
                        className={`w-full p-2 rounded ${
                            isEditing ? 'bg-gray-700' : 'bg-gray-600 cursor-not-allowed'
                        }`}
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium">Rol</label>
                    <input
                        type="text"
                        name="role"
                        value={formData.role || ''}
                        disabled
                        className="w-full p-2 rounded bg-gray-600 cursor-not-allowed"
                    />
                </div>
            </form>

            {/* Botones */}
            <div className="flex justify-between mt-6">
                {isEditing ? (
                    <button
                        onClick={handleUpdate}
                        className="px-4 py-2 bg-green-500 hover:bg-green-600 rounded"
                        disabled={loading}
                    >
                        {loading ? 'Guardando...' : 'Guardar'}
                    </button>
                ) : (
                    <button
                        onClick={() => setIsEditing(true)}
                        className="px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded"
                    >
                        Editar
                    </button>
                )}
                <button
                    onClick={handleDelete}
                    className="px-4 py-2 bg-red-500 hover:bg-red-600 rounded"
                >
                    Eliminar perfil
                </button>
            </div>
        </div>
    );
};

export default TutorProfile;
