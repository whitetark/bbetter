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

  let tasks, stats, closestTasks;
  if (!data) {
    tasks = [];
    stats = [];
  } else {
    tasks = data.data.tasks;
    stats = data.data.stats;
    closestTasks = data.data.closestTasks;
  }

  tasks = tasks.sort((taskA, taskB) => {
    if (taskA.isCompleted !== taskB.isCompleted) {
      return taskA.isCompleted ? 1 : -1;
    }
    if (taskA.isImportant === taskB.isImportant) {
      return taskA.isUrgent === taskB.isUrgent ? 0 : taskA.isUrgent ? -1 : 1;
    }
    return taskA.isImportant ? -1 : 1;
  });

  return { tasks, stats, closestTasks, error, isLoading };
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
