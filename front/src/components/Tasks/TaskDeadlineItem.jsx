import dayjs from 'dayjs';
import React from 'react';
import * as Styled from '../../styles/Tasks.styled';

const TaskDeadlineItem = ({ task, index }) => {
  const classname = `${task.isUrgent ? 'urgent ' : ''}${task.isImportant ? 'important' : ''} ${
    task.isCompleted ? 'completed' : ''
  }`;

  return (
    <Styled.TaskDeadlineItem className={classname.trim()}>
      <div className='content'>
        {index + 1}. {task.content}
      </div>
      <div className='deadline'>{dayjs(task.deadline).format('DD/MM/YYYY')}</div>
    </Styled.TaskDeadlineItem>
  );
};

export default TaskDeadlineItem;
