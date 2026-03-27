import { Navigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import Loader from './Loader';

const ProtectedRoute = ({ children }) => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return <Loader />;
  }

  return user ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;