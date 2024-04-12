import React from 'react';
import Button from '../components/UI/Button';
import * as Styled from '../styles/Tasks.styled';

const TasksPage = () => {
  return (
    <Styled.TaskContent>
      <h1>Task List</h1>
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
      <Styled.TaskActions>
        <Button>Show Task List</Button>
        <Button className='active'>Add New Task</Button>
      </Styled.TaskActions>
    </Styled.TaskContent>
  );
};

export default TasksPage;
