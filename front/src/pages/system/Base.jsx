import { Navigate } from 'react-router-dom';
import PathConstants from '../../app/shared/pathConstants';
import { useAuthContext } from '../../app/store/auth-context';

const BasePage = () => {
  const { userData } = useAuthContext();
  if (userData) {
    return <Navigate to={PathConstants.HOME} replace />;
  } else {
    return <Navigate to={PathConstants.LOGIN} replace />;
  }
};

export default BasePage;
