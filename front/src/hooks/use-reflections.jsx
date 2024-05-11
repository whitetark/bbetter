import { useMutation, useQuery, useQueryClient } from 'react-query';
import { ReflectService } from '../app/services/api';
import { useAuthContext } from '../app/store/auth-context';

export const useRefetchReflections = () => {
  const { userData } = useAuthContext();
  const requestBody = {
    AccountId: userData.accountId,
  };
  const { data, error, isLoading } = useQuery(
    ['getReflects', requestBody],
    () => ReflectService.getByAccount(requestBody),
    {
      onError: (error) => {
        console.log('Get Reflections error: ' + error.message);
      },
      staleTime: 30000,
    },
  );

  let reflects;
  if (!data) {
    reflects = [];
  } else {
    reflects = data.data;
  }

  return { reflects, error, isLoading };
};

export const useAddReflection = () => {
  const queryClient = useQueryClient();

  return useMutation('addReflect', (payload) => ReflectService.create(payload), {
    onSuccess: () => {
      queryClient.invalidateQueries('getReflects');
    },
    onError: (error) => {
      console.log('Reflection add error:' + error);
    },
  });
};

export const useEditReflection = () => {
  const queryClient = useQueryClient();

  return useMutation('editReflect', (payload) => ReflectService.update(payload), {
    onSuccess: () => {
      queryClient.invalidateQueries('getReflects');
    },
    onError: (error) => {
      console.log('Reflection update error:' + error);
    },
  });
};

export const useDeleteReflection = () => {
  const queryClient = useQueryClient();

  return useMutation('deleteReflect', (payload) => ReflectService.deleteById(payload), {
    onSuccess: () => {
      queryClient.invalidateQueries('getReflects');
    },
    onError: (error) => {
      console.log('Reflect delete error:' + error);
    },
  });
};
