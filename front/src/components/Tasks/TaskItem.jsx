import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import dayjs from 'dayjs';
import React from 'react';
import { useTaskContext } from '../../app/store/task-context';
import useModal from '../../hooks/use-modal';
import * as Styled from '../../styles/TaskList.styled';
import Button from '../UI/Button';
import Confirmation from '../UI/Confirmation';
import Modal from '../UI/Modal';
import TaskEdit from './TaskEdit';

const TaskItem = ({ isEdit, data }) => {
  const isUrgent = data.isUrgent;
  const isImportant = data.isImportant;

  const { isShowing: editIsShowing, toggle: toggleEdit } = useModal();
  const { isShowing: deleteIsShowing, toggle: toggleDelete } = useModal();
  const { deleteTask, editTask } = useTaskContext();

  const handleUrgent = (event) => {
    const task = {
      ...data,
      isUrgent: event.target.checked,
    };

    editTask.mutateAsync(task);
  };

  const handleImportant = (event) => {
    const task = {
      ...data,
      isImportant: event.target.checked,
    };

    editTask.mutateAsync(task);
  };

  const classname = `${isUrgent ? 'urgent ' : ''}${isImportant ? 'important' : ''}`;

  const handleDelete = (requestBody) => {
    deleteTask.mutateAsync(requestBody).then(toggleDelete());
  };

  const requestBody = {
    Id: data.taskId,
  };

  return (
    <>
      <Styled.TaskItem className={classname.trim()}>
        <div className='content'>{data.content}</div>
        <div>
          <input type='checkbox' checked={isUrgent} onChange={handleUrgent} />
        </div>
        <div>
          <input type='checkbox' checked={isImportant} onChange={handleImportant} />
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
      <Modal isShowing={editIsShowing} hide={toggleEdit} className='add-modal' hasOverlay>
        <TaskEdit data={data} hide={toggleEdit} />
      </Modal>
      <Modal isShowing={deleteIsShowing} hide={toggleDelete} className='add-modal' hasOverlay>
        <Confirmation hide={toggleDelete} onDelete={() => handleDelete(requestBody)} />
      </Modal>
    </>
  );
};

export default TaskItem;
