import styled from 'styled-components';
import * as variables from '../app/shared/colorVariables';
import { BHabitHeader } from './BHabits.styled';
import { TaskActions } from './Tasks.styled';
import { HomePadding } from './UI.styled';

export const GHabitContent = styled(HomePadding)`
  display: flex;
  flex-direction: column;
`;
export const GHabitList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
  max-width: 90rem;
  margin: 0 auto;
`;
export const GHabitActions = styled(TaskActions)``;
export const GHabitItem = styled.div`
  display: grid;
  grid-template-columns: 1fr 4fr 4fr;
  width: 100%;
  background-color: ${variables.BACKGROUND};
  padding: 1rem 2rem;
  border-radius: 10px;

  .number {
    background-color: white;
    border-radius: 80px;
    width: 25px;
    line-height: 25px;
    text-align: center;
  }

  &.checked {
    background-color: ${variables.GREEN};
    text-decoration: line-through;
  }
`;

export const GHabitHeader = styled(BHabitHeader)``;

export const GHabitTableHeader = styled.div`
  display: grid;
  grid-template-columns: 1fr 4fr 4fr;
  padding: 1rem 2rem;

  .weeks-list {
    display: flex;
    flex-direction: row;
    gap: 2rem;
    justify-content: space-between;
    justify-self: flex-end;
    text-transform: uppercase;
    font-weight: 500;
    color: ${variables.DISABLED_BUTTON};
  }
`;

export const Input = styled.input`
  height: 20px;
  width: 20px;
  background-color: ${variables.WHITE};
  accent-color: ${variables.DISABLED_BUTTON};
  margin-left: auto;
`;

export const Checklist = styled.div`
  display: flex;
  flex-direction: row;
  gap: 3rem;
  justify-self: flex-end;
`;
