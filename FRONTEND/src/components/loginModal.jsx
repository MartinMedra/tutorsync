// LoginModal.js
import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from './modal';
import propTypes from 'prop-types';
import { AuthContext } from '../context/AuthContext/AuthContext.jsx';

const LoginModal = ({ isOpen, closeModal }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await login({ email, password });
      setError('');
      navigate('/estudiante');
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <Modal isOpen={isOpen} closeModal={closeModal}>
      <div className="containerLogin">
        <div className="heading">Inicia Sesión</div>
        <form onSubmit={handleLogin} className="form">
          <input
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input"
            type="email"
            name="email"
            id="email"
            placeholder="E-mail"
          />
          <input
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input"
            type="password"
            name="password"
            id="password"
            placeholder="Password"
          />
          {error && <span className="text-red-500 text-xs italic mb-4">{error}</span>}
          <span className="forgot-password"><a href="#">Forgot Password ?</a></span>
          <input className="login-button" type="submit" value="Sign In" />
        </form>
        <div className="social-account-container">
          <span className="title">Or Sign in with</span>
          <div className="social-accounts">
            {/* Social buttons */}
          </div>
        </div>
        <span className="agreement"><a href="#">Learn user licence agreement</a></span>
      </div>
    </Modal>
  );
};

LoginModal.propTypes = {
  isOpen: propTypes.bool.isRequired,
  closeModal: propTypes.func.isRequired,
};

export default LoginModal;
