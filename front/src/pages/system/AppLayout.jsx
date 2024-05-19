import { Outlet, useLocation } from 'react-router-dom';
import PathConstants from '../../app/shared/pathConstants';
import { Sidebar } from '../../components/index';
import * as Styled from '../../styles/App.styled';

const AppLayout = () => {
  const location = useLocation();
  let condition = location.pathname === PathConstants.QUOTE || location.pathname === '/home';
  const classes = condition ? '' : 'divider';
  return (
    <Styled.App>
      <Sidebar />
      <div className={classes}></div>
      <Outlet />
    </Styled.App>
  );
};

export default AppLayout;
