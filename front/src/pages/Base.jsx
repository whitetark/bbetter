import { Navigate } from 'react-router-dom';
import { useAuthContext } from '../app/store/auth-context';

const BasePage = () => {
  const { userData } = useAuthContext();

  if (!userData) {
    return <Navigate to='/login' replace />;
  }

  return <Navigate to='/home' replace />;
};

export default BasePage;
