import React from 'react';
import * as Styled from '../../styles/TaskList.styled';

const EditTask = ({ onClick }) => {
  return <Styled.TaskModal onClick={onClick}>Task Modal</Styled.TaskModal>;
};

export default EditTask;
