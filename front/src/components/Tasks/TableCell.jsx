import React from 'react';
import * as Styled from '../../styles/Tasks.styled';

const TableCell = ({ array, type }) => {
  return (
    <Styled.TableCell className={array.length > 0 && `${type.toLowerCase()}`}>
      <h3>{type}</h3>
      <div className='item-list'>
        {array.slice(0, 4).map((task) => {
          return <div key={task.taskId}>{task.content}</div>;
        })}
      </div>
    </Styled.TableCell>
  );
};

export default TableCell;
