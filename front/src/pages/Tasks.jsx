import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { TaskService } from '../app/services/api';
import PathConstants from '../app/shared/pathConstants';
import { useAuthContext } from '../app/store/auth-context';
import TaskAdd from '../components/Tasks/TaskAdd';
import Button from '../components/UI/Button';
import Modal from '../components/UI/Modal';
import useModal from '../hooks/use-modal';
import * as Styled from '../styles/Tasks.styled';

const TasksPage = () => {
  document.title = `bbetter - Tasks`;
  const [tasks, setTasks] = useState([]);
  const { isShowing: addIsShowing, toggle: toggleAdd } = useModal();
  const { userData } = useAuthContext();
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(PathConstants.TASK_LIST);
  };

  const requestBody = {
    AccountId: userData.accountId,
  };

  const { isFetching: isLoading, refetch: refetchTasks } = useQuery(
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

  // Filter out completed tasks
  const incompleteTasks = tasks.filter((task) => !task.isCompleted);

  // Categorize tasks based on urgency and importance
  const urgentImportantTasks = incompleteTasks.filter((task) => task.isUrgent && task.isImportant);
  const importantNotUrgentTasks = incompleteTasks.filter(
    (task) => !task.isUrgent && task.isImportant,
  );
  const urgentNotImportantTasks = incompleteTasks.filter(
    (task) => task.isUrgent && !task.isImportant,
  );
  const notUrgentNotImportantTasks = incompleteTasks.filter(
    (task) => !task.isUrgent && !task.isImportant,
  );

  return (
    <Styled.TaskContent>
      <Styled.TaskHeader>
        <h1>Task List</h1>
        <Styled.TaskActions>
          <Button onClick={handleClick}>
            <FontAwesomeIcon icon='fa-solid fa-list' fixedWidth />
          </Button>
          <Button onClick={toggleAdd}>
            <FontAwesomeIcon icon='fa-solid fa-plus' fixedWidth />
          </Button>
        </Styled.TaskActions>
      </Styled.TaskHeader>
      {tasks.length > 0 && (
        <Styled.TaskTable>
          <div></div>
          <Styled.TableText>Urgent</Styled.TableText>
          <Styled.TableText>Non urgent</Styled.TableText>
          <Styled.TableText className='text vertical-text'>Important</Styled.TableText>
          <Styled.TableCell className={urgentImportantTasks.length > 0 && 'do'}>
            <h3>Do</h3>
            <div className='item-list'>
              {urgentImportantTasks.map((task, index) => {
                return <div key={index}>{task.content}</div>;
              })}
            </div>
          </Styled.TableCell>
          <Styled.TableCell className={importantNotUrgentTasks.length > 0 && 'decide'}>
            <h3>Decide</h3>
            <div className='item-list'>
              {importantNotUrgentTasks.map((task, index) => {
                return <div key={index}>{task.content}</div>;
              })}
            </div>
          </Styled.TableCell>
          <Styled.TableText className='text vertical-text'>Not important</Styled.TableText>
          <Styled.TableCell className={urgentNotImportantTasks.length > 0 && 'delegate'}>
            <h3>Delegate</h3>
            <div className='item-list'>
              {urgentNotImportantTasks.map((task, index) => {
                return <div key={index}>{task.content}</div>;
              })}
            </div>
          </Styled.TableCell>
          <Styled.TableCell className={notUrgentNotImportantTasks.length > 0 && 'delete'}>
            <h3>Delete</h3>
            <div className='item-list'>
              {notUrgentNotImportantTasks.map((task, index) => {
                return <div key={index}>{task.content}</div>;
              })}
            </div>
          </Styled.TableCell>
        </Styled.TaskTable>
      )}
      <Modal isShowing={addIsShowing} hide={toggleAdd} className='add-modal' hasOverlay>
        <TaskAdd />
      </Modal>
    </Styled.TaskContent>
  );
};

export default TasksPage;
