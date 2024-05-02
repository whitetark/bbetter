import React from 'react';
import { Outlet } from 'react-router-dom';
import { TaskContextProvider } from '../../app/store/task-context';

const TaskLayout = () => {
  return (
    <TaskContextProvider>
      <Outlet />
    </TaskContextProvider>
  );
};

export default TaskLayout;
