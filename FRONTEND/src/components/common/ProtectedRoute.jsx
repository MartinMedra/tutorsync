import { Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext/AuthContext';
import propTypes from 'prop-types';

const ProtectedRoute = ({ children}) => {
  const { user } = useContext(AuthContext);

  return user ? children : <Navigate to="/" />;

};

ProtectedRoute.propTypes = {
  children: propTypes.element.isRequired,
};

export default ProtectedRoute;