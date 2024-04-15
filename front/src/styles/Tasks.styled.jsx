import styled from 'styled-components';
import * as variables from '../app/shared/colorVariables';
import { BHabitActions, BHabitHeader } from './BHabits.styled';
import { HomePadding } from './UI.styled';

export const TaskContent = styled(HomePadding)`
  display: flex;
  flex-direction: column;
  gap: 3rem;
`;

export const TaskTable = styled.div`
  display: grid;
  grid-template-rows: 1fr 4fr 4fr;
  grid-template-columns: 1fr 4fr 4fr;
  place-items: center;
  max-width: 90rem;
  width: 100%;
  gap: 1rem;
  margin: 0 auto;
`;

export const TableCell = styled.div`
  display: flex;
  flex-direction: column;
  padding: 2rem;
  border-radius: 10px;
  width: 100%;
  gap: 0.5rem;

  h3 {
    font-weight: 500;
  }

  .item-list {
    display: flex;
    flex-direction: column;
    background-color: ${variables.WHITE};
    padding: 0.4rem;
    border-radius: 10px;
    gap: 0.5rem;

    > div {
      background-color: ${variables.DIVIDER};
      border-radius: 10px;
      padding: 0.4rem;
      color: ${variables.DISABLED_BUTTON};
    }
  }
`;

export const TableText = styled.div`
  color: ${variables.DIVIDER};
  font-weight: 500;
  align-self: flex-end;

  &.vertical-text {
    align-self: center;
    justify-self: flex-end;
    writing-mode: vertical-lr;
    transform: rotate(180deg);
  }
`;

export const DeleteCell = styled(TableCell)`
  background-color: ${variables.DELETE_CELL};
`;
export const DecideCell = styled(TableCell)`
  background-color: ${variables.DECIDE_CELL};
`;
export const DoCell = styled(TableCell)`
  background-color: ${variables.DO_CELL};
`;
export const DelegateCell = styled(TableCell)`
  background-color: ${variables.DELEGATE_CELL};
`;

export const TaskHeader = styled(BHabitHeader)``;
export const TaskActions = styled(BHabitActions)``;
