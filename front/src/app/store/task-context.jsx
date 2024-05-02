import { createContext, useContext, useState } from 'react';
import { useMutation, useQuery } from 'react-query';
import { TaskService } from '../services/api';
import { useAuthContext } from './auth-context';

const TaskContext = createContext();

export const TaskContextProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const { userData } = useAuthContext();
  const requestBody = {
    AccountId: userData.accountId,
  };

  const { refetch: refetchTasks } = useQuery(
    ['getTasks', requestBody],
    () => TaskService.getByAccount(requestBody),
    {
      onError: (error) => {
        console.log('Get Tasks error: ' + error.message);
      },
      onSuccess: (data) => {
        setTasks(data.data);
      },
    },
  );

  const addTask = useMutation('addTask', (payload) => TaskService.create(payload), {
    onSuccess: () => {
      refetchTasks();
    },
    onError: (error) => {
      console.log('Task add error:' + error);
    },
  });

  const editTask = useMutation('editTask', (payload) => TaskService.update(payload), {
    onSuccess: () => {
      refetchTasks();
    },
    onError: (error) => {
      console.log('Task update error:' + error);
    },
  });

  const deleteTask = useMutation('deleteTask', (payload) => TaskService.deleteById(payload), {
    onSuccess: () => {
      refetchTasks();
    },
    onError: (error) => {
      console.log('Task delete error:' + error);
    },
  });

  return (
    <TaskContext.Provider value={{ tasks, setTasks, refetchTasks, addTask, editTask, deleteTask }}>
      {children}
    </TaskContext.Provider>
  );
};

export const useTaskContext = () => {
  const context = useContext(TaskContext);
  if (context === undefined) {
    throw new Error('useTaskContext must be used within a ThemeContextProvider');
  }
  return context;
};
export default TaskContext;
