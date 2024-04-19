import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import PathConstants from '../app/shared/pathConstants';
import AddTask from '../components/Tasks/AddTask';
import Button from '../components/UI/Button';
import Modal from '../components/UI/Modal';
import useModal from '../hooks/use-modal';
import * as Styled from '../styles/Tasks.styled';

const TaskListPage = () => {
  const { isShowing: addIsShowing, toggle: toggleAdd } = useModal();
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
          <Button onClick={toggleAdd}>
            <FontAwesomeIcon icon='fa-solid fa-plus' fixedWidth />
          </Button>
        </Styled.TaskListActions>
      </Styled.TaskListHeader>
      <Styled.TaskListMain>
        <div></div>
      </Styled.TaskListMain>
      <Modal isShowing={addIsShowing} hide={toggleAdd} className='add-modal' hasOverlay>
        <AddTask />
      </Modal>
    </Styled.TaskList>
  );
};

export default TaskListPage;
