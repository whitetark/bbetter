import { useMutation, useQuery, useQueryClient } from 'react-query';
import { TaskService } from '../app/services/api';
import { useAuthContext } from '../app/store/auth-context';

export const useRefetchTasks = () => {
  const { userData } = useAuthContext();
  const requestBody = {
    AccountId: userData.accountId,
  };
  const { data, error, isLoading } = useQuery(
    ['getTasks', requestBody],
    () => TaskService.getByAccount(requestBody),
    {
      onError: (error) => {
        console.log('Get Tasks error: ' + error.message);
      },
      staleTime: 1000 * 60 * 15,
    },
  );

  let tasks;
  if (!data) {
    tasks = [];
  } else {
    tasks = data.data;
  }

  return { tasks, error, isLoading };
};

export const useAddTask = () => {
  const queryClient = useQueryClient();

  return useMutation('addTask', (payload) => TaskService.create(payload), {
    onSuccess: () => {
      queryClient.invalidateQueries('getTasks');
    },
    onError: (error) => {
      console.log('Task add error:' + error);
    },
  });
};

export const useEditTask = () => {
  const queryClient = useQueryClient();

  return useMutation('editTask', (payload) => TaskService.update(payload), {
    onSuccess: () => {
      queryClient.invalidateQueries('getTasks');
    },
    onError: (error) => {
      console.log('Task update error:' + error);
    },
  });
};

export const useDeleteTask = () => {
  const queryClient = useQueryClient();

  return useMutation('deleteTask', (payload) => TaskService.deleteById(payload), {
    onSuccess: () => {
      queryClient.invalidateQueries('getTasks');
    },
    onError: (error) => {
      console.log('Task delete error:' + error);
    },
  });
};
