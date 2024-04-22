import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import useModal from '../../hooks/use-modal';
import * as Styled from '../../styles/TaskList.styled';
import Button from '../UI/Button';
import Confirmation from '../UI/Confirmation';
import Modal from '../UI/Modal';
import TaskEdit from './TaskEdit';

const TaskItem = ({ isEdit }) => {
  const [taskAttributes, setTaskAttributes] = useState({
    isUrgent: false,
    isImportant: true,
  });
  const { isShowing: editIsShowing, toggle: toggleEdit } = useModal();
  const { isShowing: deleteIsShowing, toggle: toggleDelete } = useModal();

  const handleCheckboxChange = (attribute) => {
    setTaskAttributes((prevState) => ({
      ...prevState,
      [attribute]: !prevState[attribute],
    }));
  };

  const { isUrgent, isImportant } = taskAttributes;

  const classname = `${isUrgent ? 'urgent ' : ''}${isImportant ? 'important' : ''}`;

  return (
    <>
      <Styled.TaskItem className={classname.trim()}>
        <div className='content'>Content</div>
        <div>
          <input
            type='checkbox'
            checked={isUrgent}
            onChange={() => handleCheckboxChange('isUrgent')}
          />
        </div>
        <div>
          <input
            type='checkbox'
            checked={isImportant}
            onChange={() => handleCheckboxChange('isImportant')}
          />
        </div>
        <div className='deadline'>21 September 2024</div>
        <Styled.TaskItemActions>
          {isEdit && (
            <>
              <Button onClick={toggleEdit}>
                <FontAwesomeIcon icon='fa-solid fa-pencil' fixedWidth />
              </Button>
              <Button onClick={toggleDelete}>
                <FontAwesomeIcon icon='fa-solid fa-trash-can' fixedWidth />
              </Button>
            </>
          )}
        </Styled.TaskItemActions>
      </Styled.TaskItem>
      <Modal isShowing={editIsShowing} hide={toggleEdit} className='task-modal' hasOverlay>
        <TaskEdit />
      </Modal>
      <Modal isShowing={deleteIsShowing} hide={toggleDelete} className='task-modal' hasOverlay>
        <Confirmation hide={toggleDelete} />
      </Modal>
    </>
  );
};

export default TaskItem;
