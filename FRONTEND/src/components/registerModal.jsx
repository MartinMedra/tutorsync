import { useState } from 'react';
import Modal from './modal';
import propTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import LoginModal from "./loginModal";
import axios from 'axios';


const RegisterModal = ({ isOpen, closeModal }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [role, setRole] = useState('');
    const [identification, setIdentification] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [isLoginOpen, setIsLoginOpen] = useState(false);
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setError('Las contraseñas no coinciden');
            return;
        }

        try {
            const response = await axios.post('http://localhost:3000/register', { email, password, name, role, identification });
            setSuccess("Usuario registrado correctamente");
            setError('');
            setTimeout(() => {
                closeModal();
                setIsLoginOpen(true);
            }, 2000);
        } catch (error) {
            if (error.response.status === 409) {
                setError('El correo ya está en uso');
            } else {
                setError('Ha ocurrido un error');
            }
        }
    };

    return (
        <>
            <Modal isOpen={isOpen} closeModal={closeModal}>
                <div className="form_area">
                    <p className="title">REGISTRATE</p>
                    <form onSubmit={handleRegister}>
                        <div className="form_group">
                            <label className="sub_title" htmlFor="Name">Nombre</label>
                            <input placeholder="Nombre Completo" className="form_style" required value={name} onChange={(e)=> setName(e.target.value)}  type="name" name="name" id="name" />
                        </div>
                        <div className="form_group">
                            <label className="sub_title" htmlFor="role">Rol</label>
                            <select required value={role} onChange={(e) => setRole(e.target.value)} className="form_style" type="role" id="role" placeholder="¿Que rol cumples?">
                                <option value=" ">Selecciona tu rol</option>
                                <option value="Estudiante">Estudiante</option>
                                <option value="Tutor">Tutor</option>
                            </select>
                        </div>
                        <div className="form_group">
                            <label className="sub_title" htmlFor="email">Correo Electrónico</label>
                            <input placeholder="Ingresa tu correo" className="form_style" required value={email} onChange={(e)=> setEmail(e.target.value)} type="email" name="email" id="email"/>
                        </div>
                        <div className="form_group">
                            <label className="sub_title" htmlFor="password">Contraseña</label>
                            <input placeholder="Ingresa tu contraseña" className="form_style" required value={password} onChange={(e)=> setPassword(e.target.value)} type="password" name="password" id="password"/>
                        </div>
                        <div className="form_group">
                            <label className="sub_title" htmlFor="ConfirmPassword">Confirma tu contraseña</label>
                            <input placeholder="Ingresa tu contraseña de nuevo" className="form_style" required value={confirmPassword} onChange={(e)=> setConfirmPassword(e.target.value)} type="password" name="confirmPassword" id="confirmPassword"/>
                        </div>
                        <div>
                            <button type="submit" className="buttonHero w-full my-5 m-0 bg-rosado hover:text-rosado hover:border-rosado">Entrar</button>
                            <p>¿No tienes cuenta? <a className="cursor-pointer text-black font-semibold hover:text-rosado transform transition-all" onClick={() => { closeModal(); setIsRegisterOpen(true); }}>Registrate aquí!</a></p><a className="link" href="">
                            </a>
                        </div>
                    </form>
                </div>
                {/* <div className="containerLogin">
                <div className="heading">Registrate</div>
                <form action className="form" onSubmit={handleRegister}>
                <input required value={name} onChange={(e)=> setName(e.target.value)} className="input" type="name" name="name" id="name" placeholder="Nombre" />
                <select required value={role} onChange={(e)=> setRole(e.target.value)} className="input" type="role" id="role" placeholder="Que rol cumples">
                        <option value=" ">Selecciona tu rol</option>
                        <option value="Estudiante">Estudiante</option>
                        <option value="Tutor">Tutor</option>
                </select>
                    <input required value={email} onChange={(e)=> setEmail(e.target.value)} className="input" type="email" name="email" id="email" placeholder="Correo Electrónico" />
                    <input required value={password} onChange={(e)=> setPassword(e.target.value)} className="input" type="password" name="password" id="password" placeholder="Contraseña" />
                    <input required value={confirmPassword} onChange={(e)=> setConfirmPassword(e.target.value)} className="input" type="password" name="confirmPassword" id="confirmPassword" placeholder="Confirmar Contraseña" />
                    <input className="login-button" type="submit" value="Registrarse" />
                </form>
                <span className="agreement"><a>Learn user licence agreement</a></span>
            </div>  */}
            </Modal>
            {/* <LoginModal isOpen={isLoginOpen} closeModal={() => setIsLoginOpen(false)} /> */}
        </>
    );
};

export default RegisterModal;

RegisterModal.propTypes = {
    isOpen: propTypes.bool.isRequired,
    closeModal: propTypes.func.isRequired,
};