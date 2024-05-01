import { Navigate } from 'react-router-dom';
import { useAuthContext } from '../store/auth-context';
import PathConstants from './pathConstants';

const ProtectedRoute = ({ user, children }) => {
  const { userData } = useAuthContext();

  if (!userData) {
    return <Navigate to={PathConstants.LOGIN} replace />;
  }

  return children;
};

export default ProtectedRoute;
