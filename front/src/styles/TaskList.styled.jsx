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
`;
export const TaskItem = styled.div`
  display: grid;
  grid-template-columns: 1fr 4fr 1fr 1fr 2fr 1fr;
  background-color: ${variables.DIVIDER};
  border-radius: 10px;
  padding: 1rem;
  font-weight: 500;
  transition: all 0.2s ease-out;

  > :not(.content) {
    text-align: center;
  }

  &.important.urgent {
    background-color: ${variables.DO_CELL};
  }

  &.important {
    background-color: ${variables.DECIDE_CELL};
  }

  &.urgent {
    background-color: ${variables.DELEGATE_CELL};
  }

  &.completed {
    background-color: ${variables.DISABLED_BUTTON} !important;
  }

  input {
    transform: scale(1.5);
    outline: none;
  }
`;
export const TaskItemActions = styled(BHabitItemActions)``;
