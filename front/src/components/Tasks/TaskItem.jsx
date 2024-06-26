import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';
import useModal from '../../hooks/use-modal';
import { useDeleteTask, useEditTask } from '../../hooks/use-task';
import * as Styled from '../../styles/TaskList.styled';
import Button from '../UI/Button';
import Confirmation from '../UI/Confirmation';
import Modal from '../UI/Modal';
import TaskEdit from './TaskEdit';

const TaskItem = ({ isEdit, data }) => {
  const [isCompleted, setIsCompleted] = useState(data.isCompleted);
  const [isUrgent, setIsUrgent] = useState(data.isUrgent);
  const [isImportant, setIsImportant] = useState(data.isImportant);
  const [initialRender1, setInitialRender1] = useState(false);
  const [initialRender2, setInitialRender2] = useState(false);

  const { isShowing: editIsShowing, toggle: toggleEdit } = useModal();
  const { isShowing: deleteIsShowing, toggle: toggleDelete } = useModal();
  const { mutateAsync: deleteAsync } = useDeleteTask();
  const { mutateAsync: editAsync } = useEditTask();

  useEffect(() => {
    if (!initialRender1) {
      setInitialRender1(true);
      return;
    }

    const timer = setTimeout(() => {
      const task = {
        ...data,
        isUrgent: isUrgent,
        isImportant: isImportant,
      };

      if (data.isUrgent == isUrgent && data.isImportant == isImportant) {
        return;
      }

      editAsync(task);
    }, 1000);

    return () => clearTimeout(timer);
  }, [isUrgent, isImportant]);

  useEffect(() => {
    if (!initialRender2) {
      setInitialRender2(true);
      return;
    }

    const timer = setTimeout(() => {
      const task = {
        ...data,
        isCompleted: isCompleted,
        completeDate: dayjs(new Date()).format(),
      };

      if (data.isCompleted == isCompleted) {
        return;
      }

      editAsync(task);
    }, 1000);

    return () => clearTimeout(timer);
  }, [isCompleted]);

  const classname = `${isUrgent ? 'urgent ' : ''}${isImportant ? 'important' : ''} ${
    isCompleted ? 'completed' : ''
  }`;

  const handleDelete = (requestBody) => {
    deleteAsync(requestBody).then(toggleDelete());
  };

  const requestBody = {
    Id: data.taskId,
  };

  return (
    <>
      <Styled.TaskItem className={classname.trim()}>
        <div style={{ gridArea: 'completed' }} className='details'>
          <span className='hide'>Completed?</span>
          <input
            type='checkbox'
            checked={isCompleted}
            onChange={() => setIsCompleted(!isCompleted)}
          />
        </div>
        <div className='content' style={{ gridArea: 'content' }}>
          {data.content}
        </div>
        <div style={{ gridArea: 'urgent' }} className='details'>
          <span className='hide'>Urgent?</span>
          <input type='checkbox' checked={isUrgent} onChange={() => setIsUrgent(!isUrgent)} />
        </div>
        <div style={{ gridArea: 'important' }} className='details'>
          <span className='hide'>Important?</span>
          <input
            type='checkbox'
            checked={isImportant}
            onChange={() => setIsImportant(!isImportant)}
          />
        </div>
        <div
          className={
            dayjs(data.deadline) < dayjs() && !isCompleted ? 'deadline overdue' : 'deadline'
          }
          style={{ gridArea: 'deadline' }}>
          <div>{dayjs(data.deadline).format('DD/MM/YYYY')}</div>
        </div>
        <Styled.TaskItemActions style={{ gridArea: 'actions' }}>
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
