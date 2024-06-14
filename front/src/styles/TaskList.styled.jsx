import styled from 'styled-components';
import * as variables from '../app/shared/colorVariables';
import { BHabitActions, BHabitHeader, BHabitItemActions } from './BHabits.styled';
import { HomePadding } from './UI.styled';

export const TaskList = styled(HomePadding)``;
export const TaskListHeader = styled(BHabitHeader)`
  flex-direction: column;
  justify-content: flex-start;
  font-size: 24px;
  gap: 1rem;
  color: ${variables.DISABLED_BUTTON};
`;
export const TaskListHeaderBlock = styled.div`
  display: flex;
  flex-direction: row;
`;

export const TaskListActions = styled(BHabitActions)`
  margin-left: auto;
`;
export const TaskListMain = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  max-width: 90rem;
  margin: 0 auto;
  gap: 2rem;
`;
export const TaskHeader = styled.div`
  display: grid;
  grid-template-columns: 1fr 4fr 1fr 1fr 2fr 1fr;
  text-align: center;
  font-weight: 500;
  color: ${variables.DISABLED_BUTTON};

  @media only screen and (max-width: ${variables.MOBILE_WIDTH}) {
    display: none;
  }
`;
export const TaskItem = styled.div`
  display: grid;
  grid-template-columns: 1fr 4fr 1fr 1fr 2fr 1fr;
  grid-template-areas: 'completed content urgent important deadline actions';
  align-items: center;
  background-color: ${variables.DELETE_CELL};
  color: ${variables.WHITE};
  border-radius: 10px;
  padding: 1rem;
  font-weight: 500;
  transition: all 0.2s ease-out;

  > :not(.content) {
    text-align: center;
    justify-content: center;
  }

  &.important.urgent {
    background-color: ${variables.DO_CELL};
    color: black;
  }

  &.important {
    background-color: ${variables.DECIDE_CELL};
    color: black;
  }

  &.urgent {
    background-color: ${variables.DELEGATE_CELL};
    color: black;
  }

  &.completed {
    background-color: ${variables.COMPLETED_CELL} !important;
    color: ${variables.WHITE} !important;
  }

  input {
    transform: scale(1.5);
    outline: none;
  }
  .hide {
    display: none;
  }

  .deadline {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0.5rem;

    &.overdue {
      background-color: #7c0000;
      border-radius: 10px;
      color: white;
    }
  }

  @media only screen and (max-width: ${variables.MOBILE_WIDTH}) {
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-areas:
      'content content actions'
      'completed urgent important'
      '. . deadline';
    gap: 1rem;

    .content {
      font-size: 24px;
    }

    .details {
      display: flex;
      flex-direction: row;
      gap: 1rem;
    }

    .hide {
      display: block;
    }
  }
`;
export const TaskItemActions = styled(BHabitItemActions)``;
