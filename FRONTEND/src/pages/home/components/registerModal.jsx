import { useState } from 'react';
import {useAlert} from '../../../context/AlertContext';
import Modal from '../../../components/modal.jsx';
import propTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { set } from 'date-fns';


const RegisterModal = ({ isOpen, closeModal, openLogin }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [role, setRole] = useState('');
    const [subject, setSubject] = useState('');
    const [identification, setIdentification] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();


    const handleRegister = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setError('Las contraseñas no coinciden');
            return;
        }

        try {
            const response = await axios.post('http://localhost:3000/register', { email, password, name, role, identification, subject });
            setSuccess("Usuario registrado correctamente", "success");
            setError('');
            setTimeout(() => {
                closeModal();
                setSuccess('');
                openLogin(true);
            }, 2000);
        } catch (error) {
            if (error.response.status === 409) {
                setError("Al parecer ya estás registrado");
            } else {
                setError('Ha ocurrido un error');
            }
        }
    };

    return (
      <>
        <Modal isOpen={isOpen} closeModal={closeModal}>
          <div className="form_area animate-fade-up animate-duration-500 max-w-screen-md mx-auto p-6 bg-white rounded-lg shadow-lg">
            <p className="title text-center text-2xl font-bold mb-6">
              REGÍSTRATE
            </p>
            <form onSubmit={handleRegister}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-1">
                <div className="form_group">
                  <label
                    className="sub_title block text-sm font-medium text-gray-700"
                    htmlFor="Name"
                  >
                    Nombre
                  </label>
                  <input
                    placeholder="Nombre Completo"
                    className="form_style w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-rosado"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    type="text"
                    name="name"
                    id="name"
                  />
                </div>
                <div className="form_group">
                  <label
                    className="sub_title block text-sm font-medium text-gray-700"
                    htmlFor="role"
                  >
                    Rol
                  </label>
                  <select
                    required
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="form_style w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-rosado"
                    id="role"
                  >
                    <option value="">Selecciona tu rol</option>
                    <option value="Estudiante">Estudiante</option>
                    <option value="Tutor">Tutor</option>
                  </select>
                </div>
              </div>
              {role === "Tutor" && (
                <div className="form_group md:col-span-2">
                  <label
                    className="sub_title block text-sm font-medium text-gray-700"
                    htmlFor="subject"
                  >
                    Materia
                  </label>
                  <select
                    required
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="form_style w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-rosado"
                    id="subject"
                  >
                    <option value="">Selecciona una materia</option>
                    <option value="Arte">Arte</option>
                    <option value="Biología">Biología</option>
                    <option value="Ciencias Naturales">
                      Ciencias Naturales
                    </option>
                    <option value="Ciencias Sociales">Ciencias Sociales</option>
                    <option value="Comunicación Oral y Escrita">
                      Comunicación Oral y Escrita
                    </option>
                    <option value="Educación Cívica">Educación Cívica</option>
                    <option value="Ética y Valores">Ética y Valores</option>
                    <option value="Emprendimiento o Economía">
                      Emprendimiento o Economía
                    </option>
                    <option value="Filosofía">Filosofía</option>
                    <option value="Física">Física</option>
                    <option value="Geografía">Geografía</option>
                    <option value="Historia">Historia</option>
                    <option value="Inglés">Inglés</option>
                    <option value="Lengua y Literatura">
                      Lengua y Literatura
                    </option>
                    <option value="Matemáticas">Matemáticas</option>
                    <option value="Música">Música</option>
                    <option value="Química">Química</option>
                    <option value="Religión">Religión</option>
                    <option value="Tecnología">Tecnología</option>
                  </select>
                </div>
              )}
              <div className="form_group">
                <label
                  className="sub_title block text-sm font-medium text-gray-700"
                  htmlFor="email"
                >
                  Correo Electrónico
                </label>
                <input
                  placeholder="Ingresa tu correo"
                  className="form_style w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-rosado"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  name="email"
                  id="email"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-1">
                <div className="form_group">
                  <label
                    className="sub_title block text-sm font-medium text-gray-700"
                    htmlFor="password"
                  >
                    Contraseña
                  </label>
                  <input
                    placeholder="Ingresa tu contraseña"
                    className="form_style w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-rosado"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                    name="password"
                    id="password"
                  />
                </div>
                <div className="form_group">
                  <label
                    className="sub_title block text-sm font-medium text-gray-700"
                    htmlFor="ConfirmPassword"
                  >
                    Confirma tu contraseña
                  </label>
                  <input
                    placeholder="Confirma tu contraseña"
                    className="form_style w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-rosado"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    type="password"
                    name="confirmPassword"
                    id="confirmPassword"
                  />
                </div>
              </div>
                {success && (
                  <div className="ml-[10px] mt-2">
                    <div
                      role="alert"
                      className="bg-green-100 dark:bg-green-900 border-l-4 border-green-500 dark:border-green-700 text-green-900 dark:text-green-100 p-2 rounded-lg flex items-center transition duration-300 ease-in-out hover:bg-green-200 dark:hover:bg-green-800 transform hover:scale-105"
                    >
                      <svg
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        fill="none"
                        className="h-5 w-5 flex-shrink-0 mr-2 text-green-600"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M13 16h-1v-4h1m0-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                          strokeWidth="2"
                          strokeLinejoin="round"
                          strokeLinecap="round"
                        ></path>
                      </svg>
                      <p className="text-xs font-semibold">{success}</p>
                    </div>
                  </div>
                )}
                {error && (
                  <>
                    <div className="ml-[10px] w-full mt-4">
                      <div
                        role="alert"
                        className="bg-red-100 w-full dark:bg-red-900 border-l-4 border-red-500 dark:border-red-700 text-red-900 dark:text-red-100 p-2 rounded-lg flex items-center transition duration-300 ease-in-out hover:bg-red-200 dark:hover:bg-red-800 transform hover:scale-105"
                      >
                        <svg
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          fill="none"
                          className="h-5 w-5 flex-shrink-0 mr-2 text-red-600"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M13 16h-1v-4h1m0-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                            strokeWidth="2"
                            strokeLinejoin="round"
                            strokeLinecap="round"
                          ></path>
                        </svg>
                        <p className="text-xs font-semibold">{error}</p>
                      </div>
                    </div>
                  </>
                )}
              <div className="md:col-span-2">
                <button
                  type="submit"
                  className="buttonHero w-full my-5 m-0 bg-rosado hover:text-rosado hover:border-rosado"
                >
                  Registrarse
                </button>
                <p className="text-center mt-3">
                  ¿Ya tienes cuenta?{" "}
                  <a
                    className="cursor-pointer text-rosado font-semibold hover:underline"
                    onClick={() => {
                      closeModal();
                      openLogin();
                    }}
                  >
                    Inicia Sesión
                  </a>
                </p>
              </div>
            </form>
          </div>
        </Modal>
      </>
    );
};

export default RegisterModal;

RegisterModal.propTypes = {
    isOpen: propTypes.bool.isRequired,
    closeModal: propTypes.func.isRequired,
    openLogin: propTypes.func.isRequired,
};