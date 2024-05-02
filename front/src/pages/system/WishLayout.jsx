import { Outlet } from 'react-router-dom';
import { WishContextProvider } from '../../app/store/wish-context';

const WishLayout = () => {
  return (
    <WishContextProvider>
      <Outlet />
    </WishContextProvider>
  );
};

export default WishLayout;
