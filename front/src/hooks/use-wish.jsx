import { useMutation, useQuery, useQueryClient } from 'react-query';
import { WishService } from '../app/services/api';
import { useAuthContext } from '../app/store/auth-context';

export const useRefetchWishes = () => {
  const { userData } = useAuthContext();
  const requestBody = {
    AccountId: userData.accountId,
  };

  const { data, error, isLoading } = useQuery(
    ['getWishes', requestBody],
    () => WishService.getByAccount(requestBody),
    {
      onError: (error) => {
        console.log('Get Wishes error: ' + error.message);
      },
      staleTime: 30000,
    },
  );

  let wishes;
  if (!data) {
    wishes = [];
  } else {
    wishes = data.data;
  }
  return { wishes, error, isLoading };
};

export const useAddWish = () => {
  const queryClient = useQueryClient();
  return useMutation('addWish', (payload) => WishService.create(payload), {
    onSuccess: () => {
      queryClient.invalidateQueries('getWishes');
    },
    onError: (error) => {
      console.log('Wish add error:' + error);
    },
  });
};

export const useEditWish = () => {
  const queryClient = useQueryClient();
  return useMutation('editWish', (payload) => WishService.update(payload), {
    onSuccess: () => {
      queryClient.invalidateQueries('getWishes');
    },
    onError: (error) => {
      console.log('Wish update error:' + error);
    },
  });
};

export const useDeleteWish = () => {
  const queryClient = useQueryClient();
  return useMutation('deleteWish', (payload) => WishService.deleteById(payload), {
    onSuccess: () => {
      queryClient.invalidateQueries('getWishes');
    },
    onError: (error) => {
      console.log('Wish delete error:' + error);
    },
  });
};
