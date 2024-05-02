import { Outlet } from 'react-router-dom';
import * as Styled from '../../styles/Root.styled';

const RootLayout = () => {
  return (
    <Styled.Root>
      <Outlet />
    </Styled.Root>
  );
};

export default RootLayout;
