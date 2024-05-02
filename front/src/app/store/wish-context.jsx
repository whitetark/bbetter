import { createContext, useContext, useState } from 'react';
import { useMutation, useQuery } from 'react-query';
import { WishService } from '../services/api';
import { useAuthContext } from './auth-context';

const WishContext = createContext();

export const WishContextProvider = ({ children }) => {
  const [wishes, setWishes] = useState([]);
  const { userData } = useAuthContext();
  const requestBody = {
    AccountId: userData.accountId,
  };

  const { refetch: refetchWishes } = useQuery(
    ['getWishes', requestBody],
    () => WishService.getByAccount(requestBody),
    {
      onError: (error) => {
        console.log('Get Wishes error: ' + error.message);
      },
      onSuccess: (data) => {
        setWishes(data.data);
      },
    },
  );

  const addWish = useMutation('addWish', (payload) => WishService.create(payload), {
    onSuccess: () => {
      refetchWishes();
    },
    onError: (error) => {
      console.log('Wish add error:' + error);
    },
  });

  const editWish = useMutation('editWish', (payload) => WishService.update(payload), {
    onSuccess: () => {
      refetchWishes();
    },
    onError: (error) => {
      console.log('Wish update error:' + error);
    },
  });

  const deleteWish = useMutation('deleteWish', (payload) => WishService.deleteById(payload), {
    onSuccess: () => {
      refetchWishes();
    },
    onError: (error) => {
      console.log('Wish delete error:' + error);
    },
  });

  return (
    <WishContext.Provider
      value={{ wishes, setWishes, refetchWishes, addWish, editWish, deleteWish }}>
      {children}
    </WishContext.Provider>
  );
};

export const useWishContext = () => {
  const context = useContext(WishContext);
  if (context === undefined) {
    throw new Error('useWishContext must be used within a ThemeContextProvider');
  }
  return context;
};
export default WishContext;
