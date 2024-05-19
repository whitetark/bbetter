import { useMutation, useQueryClient } from 'react-query';
import { ReflectService } from '../app/services/api';

export const useAddReflection = () => {
  const queryClient = useQueryClient();

  return useMutation('addReflect', (payload) => ReflectService.create(payload), {
    onSuccess: () => {
      queryClient.invalidateQueries('getReflectsByMonth');
      queryClient.invalidateQueries('checkReflection');
      queryClient.invalidateQueries('getRecentReflection');
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
      queryClient.invalidateQueries('getReflectsByMonth');
      queryClient.invalidateQueries('getRecentReflection');
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
      queryClient.invalidateQueries('getReflectsByMonth');
      queryClient.invalidateQueries('checkReflection');
      queryClient.invalidateQueries('getRecentReflection');
    },
    onError: (error) => {
      console.log('Reflect delete error:' + error);
    },
  });
};
