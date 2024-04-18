import { Form } from 'formik';
import styled from 'styled-components';
import * as variables from '../app/shared/colorVariables';
import { BHabitActions, BHabitHeader } from './BHabits.styled';
import { HomePadding } from './UI.styled';
import { AddWish, AddWishButton } from './Wishes.styled';

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

export const AddTask = styled(AddWish)``;
export const AddTaskForm = styled(Form)`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  input[type='text'] {
    padding: 0.5rem;
    width: 100%;
    border-radius: 10px;
    outline: none;
    font-size: 20px;
    max-width: 35rem;
    border: 1px solid ${variables.DIVIDER};
  }

  .checkbox {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    font-weight: 500;
    font-size: 18px;
    color: ${variables.DISABLED_BUTTON};

    input {
      width: 2rem;
      border: 1px solid ${variables.DIVIDER};
    }
  }

  .form-control {
    display: flex;
    flex-direction: column;
    label {
      font-size: 18px;
      font-weight: 500;
      color: ${variables.DISABLED_BUTTON};
    }

    .datePicker {
      .react-datepicker__day,
      .react-datepicker__day-name,
      .react-datepicker__time-name {
        width: 3rem;
      }

      .react-datepicker__day {
        font-size: 16px;
      }
    }
  }
`;

export const AddTaskButton = styled(AddWishButton)``;
