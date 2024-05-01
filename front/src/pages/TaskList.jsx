import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { TaskService } from '../app/services/api';
import PathConstants from '../app/shared/pathConstants';
import { useAuthContext } from '../app/store/auth-context';
import TaskAdd from '../components/Tasks/TaskAdd';
import TaskItem from '../components/Tasks/TaskItem';
import Button from '../components/UI/Button';
import Modal from '../components/UI/Modal';
import useEdit from '../hooks/use-edit';
import useModal from '../hooks/use-modal';
import * as Styled from '../styles/TaskList.styled';

const TaskListPage = () => {
  document.title = `bbetter - All Tasks`;
  const [tasks, setTasks] = useState([]);
  const { isShowing: addIsShowing, toggle: toggleAdd } = useModal();
  const { isEditMode: isEdit, toggle: toggleEdit } = useEdit();
  const { userData } = useAuthContext();
  const navigate = useNavigate();

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

  const handleGoBack = () => {
    navigate(PathConstants.TASK);
  };

  const sortedTasks = tasks.sort((a, b) => {
    if (a.IsUrgent && b.IsImportant && !(b.IsUrgent && a.IsImportant)) return -1;
    if (b.IsUrgent && a.IsImportant && !(a.IsUrgent && b.IsImportant)) return 1;
    if (a.IsUrgent && !a.IsImportant && !(b.IsUrgent && !b.IsImportant)) return -1;
    if (!a.IsUrgent && a.IsImportant && !(b.IsUrgent && b.IsImportant)) return 1;

    if (a.IsCompleted && !b.IsCompleted) return 1;
    if (!a.IsCompleted && b.IsCompleted) return -1;

    return 0;
  });

  return (
    <Styled.TaskList>
      <Styled.TaskListHeader>
        <Button onClick={handleGoBack}>
          <FontAwesomeIcon icon='fa-solid fa-arrow-left' fixedWidth />
        </Button>
        <Styled.TaskListActions>
          <Button onClick={toggleEdit} className={isEdit && 'active'}>
            <FontAwesomeIcon icon='fa-solid fa-pencil' fixedWidth />
          </Button>
          <Button onClick={toggleAdd}>
            <FontAwesomeIcon icon='fa-solid fa-plus' fixedWidth />
          </Button>
        </Styled.TaskListActions>
      </Styled.TaskListHeader>
      <Styled.TaskListMain>
        <Styled.TaskHeader>
          <div>Content</div>
          <div>Urgent?</div>
          <div>Important?</div>
          <div className='deadline'>Deadline</div>
        </Styled.TaskHeader>
        {sortedTasks.length > 0 &&
          sortedTasks.map((task, index) => <TaskItem key={index} isEdit={isEdit} data={task} />)}
      </Styled.TaskListMain>
      <Modal isShowing={addIsShowing} hide={toggleAdd} className='add-modal' hasOverlay>
        <TaskAdd />
      </Modal>
    </Styled.TaskList>
  );
};

export default TaskListPage;
