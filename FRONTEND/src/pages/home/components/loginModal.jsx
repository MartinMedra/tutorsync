// LoginModal.js
import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from '../../../components/modal.jsx';
import propTypes from 'prop-types';
import { AuthContext } from '../../../context/AuthContext/AuthContext.jsx';
import RegisterModal from './registerModal';

const LoginModal = ({ isOpen, closeModal }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login, loading } = useContext(AuthContext);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
        await login({ email, password });
        setError('');
        // Esperar a que loading esté en false
        if (!loading) {
            navigate('/estudiante');
        }
    } catch (error) {
        setError("Verifica tus credenciales");
    }
};

  return (
    <>
      <Modal isOpen={isOpen} closeModal={closeModal}>
        {/* <div className="containerLogin"> */}
        <div className="form_area">
          <p className="title">INICIA SESIÓN</p>
          <form onSubmit={handleLogin}>
            <div className="form_group">
              <label className="sub_title" htmlFor="email">Correo Electrónico</label>
              <input placeholder="Ingresa tu correo" className="form_style" required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                name="email"
                id="email" />
            </div>
            <div className="form_group">
              <label className="sub_title" htmlFor="password">Contraseña</label>
              <input placeholder="Ingresa tu contraseña" className="form_style" required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                name="password"
                id="password" />
                {error && <span className="text-rosado mt-4 ">{error}</span>}
            </div>
            <div>
              <button className="buttonHero w-full my-5 m-0 bg-rosado hover:text-rosado hover:border-rosado">Entrar</button>
              <p>¿No tienes cuenta? <a className="cursor-pointer text-black font-semibold hover:text-rosado transform transition-all" onClick={() => {closeModal(); setIsRegisterOpen(true);}}>Registrate aquí!</a></p><a className="link" href="">
              </a>
            </div>
          </form>
        </div>
      </Modal>
      <RegisterModal isOpen={isRegisterOpen} closeModal={() => setIsRegisterOpen(false)} />
    </>
  );
};

LoginModal.propTypes = {
  isOpen: propTypes.bool.isRequired,
  closeModal: propTypes.func.isRequired,
};

export default LoginModal;
