import { Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext/AuthContext';
import propTypes from 'prop-types';

const ProtectedRoute = ({ children, requiredRole }) => {
  const { user } = useContext(AuthContext);

  if (!user) {
    return <Navigate to="/" />;
  }

  if (requiredRole && user.role !== requiredRole) {
    return <Navigate to="/" />;
  }

  return children;

};

ProtectedRoute.propTypes = {
  children: propTypes.element.isRequired,
  requiredRole: propTypes.string,
};

export default ProtectedRoute;