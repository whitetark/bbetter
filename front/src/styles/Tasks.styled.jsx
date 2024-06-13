import { Form } from 'formik';
import styled from 'styled-components';
import * as variables from '../app/shared/colorVariables';
import { BHabitActions } from './BHabits.styled';
import { HomePadding } from './UI.styled';
import { AddWishButton } from './Wishes.styled';

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
  width: 100%;
  gap: 1rem;
`;

export const TableCell = styled.div`
  display: flex;
  flex-direction: column;
  padding: 2rem;
  border-radius: 10px;
  width: 100%;
  gap: 0.5rem;
  height: 100%;
  background-color: ${variables.DIVIDER};

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
    min-height: 10rem;
    height: 100%;
    > div {
      background-color: ${variables.DIVIDER};
      border-radius: 10px;
      padding: 0.4rem;
      color: ${variables.DISABLED_BUTTON};
    }
  }

  &.do {
    background-color: ${variables.DO_CELL};
  }
  &.decide {
    background-color: ${variables.DECIDE_CELL};
  }
  &.delegate {
    background-color: ${variables.DELEGATE_CELL};
  }
  &.delete {
    background-color: ${variables.DELETE_CELL};
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

export const TaskHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;
export const TaskActions = styled(BHabitActions)``;

export const TaskEmpty = styled.div`
  display: grid;
  place-items: center;
  font-size: 36px;
  font-weight: 500;
  color: ${variables.DIVIDER};
`;

export const AddTask = styled.div`
  padding: 2rem;
`;
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

  p {
    color: ${variables.DISABLED_BUTTON};
    font-weight: 500;
    font-size: 18px;
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

export const EditTask = styled.div`
  padding: 2rem;
`;

export const TaskMain = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  max-width: 100rem;
  width: 100%;
  margin: 0 auto;
`;
export const TaskStats = styled.div`
  display: grid;
  grid-template-columns: 4fr 2fr;
  gap: 2rem;
`;
export const TaskDeadlineListBlock = styled.div``;
export const TaskDeadlineList = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${variables.DIVIDER};
  border-radius: 10px;
  padding: 2rem;
  gap: 0.5rem;
`;
export const TaskDeadlineItem = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem;
  color: ${variables.DISABLED_BUTTON};
  background-color: ${variables.WHITE};
  border-radius: 10px;
  border: 4px solid ${variables.DELETE_CELL};

  &.important.urgent {
    border-color: ${variables.DO_CELL};
  }

  &.important {
    border-color: ${variables.DECIDE_CELL};
  }

  &.urgent {
    border-color: ${variables.DELEGATE_CELL};
  }

  &.completed {
    border-color: ${variables.COMPLETED_CELL} !important;
  }

  .content {
    font-size: 18px;
  }

  .deadline {
    background-color: ${variables.DIVIDER};
    border-radius: 80px;
    padding: 0.5rem;
    color: ${variables.DISABLED_BUTTON};
  }
`;
export const TaskStatsBlock = styled.div``;
export const TaskStatsInfo = styled.div`
  background-color: ${variables.DIVIDER};
  border-radius: 10px;
  padding: 2rem;
  display: grid;
  grid-template-columns: 2rem 1fr;
  gap: 1.5rem;
  align-items: center;

  .divider {
    border-left: 0 !important;
    margin: 0 !important;
    border-top: 1px solid #bdbdbd;
  }
`;

export const TaskStatsProgress = styled.div`
  color: ${variables.DISABLED_BUTTON};
  font-size: 20px;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  font-weight: 400;

  span {
    font-weight: 600;
  }
`;
export const TaskStatsProgressHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export const TaskStatsInfoHeaders = styled.div`
  display: flex;
  flex-direction: row;
  writing-mode: vertical-lr;
  transform: rotate(180deg);
  color: #bdbdbd;
  font-weight: 500;
`;

export const TaskStatsOverallData = styled.div`
  color: ${variables.DISABLED_BUTTON};
  font-weight: 500;
  display: flex;
  flex-direction: column;
  font-weight: 400;
  font-size: 18px;

  span {
    font-weight: 500;
  }
`;
