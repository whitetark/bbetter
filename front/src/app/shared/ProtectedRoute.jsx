import { Navigate } from 'react-router-dom';
import { useAuthContext } from '../store/auth-context';

const ProtectedRoute = ({ user, children }) => {
  const { userData } = useAuthContext();

  if (!userData) {
    return <Navigate to='/' replace />;
  }

  return children;
};

export default ProtectedRoute;
