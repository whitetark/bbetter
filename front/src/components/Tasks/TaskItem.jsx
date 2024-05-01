import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import dayjs from 'dayjs';
import React, { useState } from 'react';
import { useMutation } from 'react-query';
import { TaskService } from '../../app/services/api';
import useModal from '../../hooks/use-modal';
import * as Styled from '../../styles/TaskList.styled';
import Button from '../UI/Button';
import Confirmation from '../UI/Confirmation';
import Modal from '../UI/Modal';
import TaskEdit from './TaskEdit';

const TaskItem = ({ isEdit, data }) => {
  const [taskAttributes, setTaskAttributes] = useState({
    isUrgent: data.isUrgent,
    isImportant: data.isImportant,
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

  const mutation = useMutation('deleteTask', (payload) => TaskService.deleteById(payload), {
    onSuccess: () => {},
    onError: (error) => {
      console.log('Task delete error:' + error);
    },
  });

  const requestBody = {
    Id: data.taskId,
  };

  return (
    <>
      <Styled.TaskItem className={classname.trim()}>
        <div className='content'>{data.content}</div>
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
        <div className='deadline'>{dayjs(data.deadline).format('DD/MM/YYYY')}</div>
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
        <TaskEdit data={data} />
      </Modal>
      <Modal isShowing={deleteIsShowing} hide={toggleDelete} className='task-modal' hasOverlay>
        <Confirmation hide={toggleDelete} onDelete={() => mutation.mutateAsync(requestBody)} />
      </Modal>
    </>
  );
};

export default TaskItem;
