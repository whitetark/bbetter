import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import AddTask from '../components/Tasks/AddTask';
import Button from '../components/UI/Button';
import Modal from '../components/UI/Modal';
import useModal from '../hooks/use-modal';
import * as Styled from '../styles/Tasks.styled';

const TasksPage = () => {
  const { isShowing: modalIsShowing, toggle: toggleModal } = useModal();

  return (
    <Styled.TaskContent>
      <Styled.TaskHeader>
        <h1>Task List</h1>
        <Styled.TaskActions>
          <Button>
            <FontAwesomeIcon icon='fa-solid fa-list' fixedWidth />
          </Button>
          <Button onClick={toggleModal}>
            <FontAwesomeIcon icon='fa-solid fa-plus' fixedWidth />
          </Button>
        </Styled.TaskActions>
      </Styled.TaskHeader>
      <Styled.TaskTable>
        <div></div>
        <Styled.TableText>Urgent</Styled.TableText>
        <Styled.TableText>Non urgent</Styled.TableText>
        <Styled.TableText className='text vertical-text'>Important</Styled.TableText>
        <Styled.DoCell>
          <h3>Do</h3>
          <div className='item-list'>
            <div>item</div>
            <div>item</div>
            <div>item</div>
            <div>item</div>
          </div>
        </Styled.DoCell>
        <Styled.DecideCell>
          <h3>Decide</h3>
          <div className='item-list'>
            <div>item</div>
            <div>item</div>
            <div>item</div>
            <div>item</div>
          </div>
        </Styled.DecideCell>
        <Styled.TableText className='text vertical-text'>Not important</Styled.TableText>
        <Styled.DelegateCell>
          <h3>Delegate</h3>
          <div className='item-list'>
            <div>item</div>
            <div>item</div>
            <div>item</div>
            <div>item</div>
          </div>
        </Styled.DelegateCell>
        <Styled.DeleteCell>
          <h3>Delete</h3>
          <div className='item-list'>
            <div>item</div>
            <div>item</div>
            <div>item</div>
            <div>item</div>
          </div>
        </Styled.DeleteCell>
      </Styled.TaskTable>
      <Modal isShowing={modalIsShowing} hide={toggleModal} className='add-modal' hasOverlay>
        <AddTask />
      </Modal>
    </Styled.TaskContent>
  );
};

export default TasksPage;
