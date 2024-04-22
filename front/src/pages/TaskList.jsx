import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import PathConstants from '../app/shared/pathConstants';
import TaskAdd from '../components/Tasks/TaskAdd';
import TaskItem from '../components/Tasks/TaskItem';
import Button from '../components/UI/Button';
import Modal from '../components/UI/Modal';
import useEdit from '../hooks/use-edit';
import useModal from '../hooks/use-modal';
import * as Styled from '../styles/TaskList.styled';

const TaskListPage = () => {
  document.title = `bbetter - All Tasks`;
  const { isShowing: addIsShowing, toggle: toggleAdd } = useModal();
  const { isEditMode: isEdit, toggle: toggleEdit } = useEdit();
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(PathConstants.TASK);
  };
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
        <TaskItem isEdit={isEdit} />
      </Styled.TaskListMain>
      <Modal isShowing={addIsShowing} hide={toggleAdd} className='add-modal' hasOverlay>
        <TaskAdd />
      </Modal>
    </Styled.TaskList>
  );
};

export default TaskListPage;
