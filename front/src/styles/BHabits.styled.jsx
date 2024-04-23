import styled from 'styled-components';
import * as variables from '../app/shared/colorVariables';
import { Button, HomePadding } from './UI.styled';
import { AddWishButton, AddWishForm, WishActions, WishHeader } from './Wishes.styled';

export const BHabitContent = styled(HomePadding)`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  h1 {
  }
`;

export const BHabitHeader = styled(WishHeader)``;
export const BHabitActions = styled(WishActions)``;
export const BHabitList = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr 1fr;
  gap: 2rem;
  max-width: 90rem;
  width: 100%;
  height: 100%;
  margin: 0 auto;
`;

export const BHabitItemHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;
export const BHabitItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  background-color: ${variables.BACKGROUND};
  padding: 1rem 2rem;
  border-radius: 10px;
  justify-content: space-between;
  transition: all 0.2s ease-out;

  .title {
    font-weight: 700;
  }

  .item-content {
    display: flex;
    flex-direction: row;

    .perc {
      font-size: 40px;
      font-weight: 500;
      margin-left: auto;
    }
  }

  .time-content {
    .time {
      color: ${variables.DELETE_CELL};
      font-weight: 500;
    }
    span {
      font-weight: 700;
    }
  }

  .progress-content {
    display: flex;
    flex-direction: column;
    span {
      margin-left: auto;
      color: ${variables.DELETE_CELL};
      font-weight: 500;
    }

    .bar {
      width: 100%;
      background-color: ${variables.WHITE};
      border-radius: 80px;
    }

    .completed {
    }
  }

  &:hover {
    filter: brightness(0.8);
    cursor: pointer;
  }
`;

export const BHabitItemActions = styled(BHabitActions)`
  font-size: 16px;
  gap: 1rem;
  color: ${variables.DISABLED_BUTTON};
  transition: all 0.2s ease-out;
  &:hover {
    color: black;
  }
`;

export const AddBHabit = styled.div``;
export const AddBHabitForm = styled(AddWishForm)`
  gap: 1rem;
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
export const AddBHabitButton = styled(AddWishButton)``;

export const BHabitView = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 2rem;

  .item-content {
    flex-direction: row-reverse;
    justify-content: space-between;
    align-items: center;

    .perc {
      margin-left: 0;
      font-size: 48px;
    }
  }
`;
export const BHabitViewHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  .title {
    font-size: 24px;
    font-weight: 500;
    color: ${variables.DISABLED_BUTTON};
  }
`;
export const BHabitViewActions = styled.div`
  color: ${variables.DISABLED_BUTTON};
  display: flex;
  flex-direction: row;
  font-size: 20px;
  gap: 1rem;
  transition: all 0.2s ease-out;

  &:hover {
    color: black;
  }
`;
export const BHabitViewMain = styled.div``;
export const BHabitViewItem = styled(BHabitItem)`
  background-color: initial;
  pointer-events: none;
`;

export const Calendar = styled.div`
  .css-23p0if-MuiButtonBase-root-MuiPickersDay-root.Mui-selected,
  .css-1wy8uaa-MuiButtonBase-root-MuiPickersDay-root.Mui-selected,
  .css-innj4t-MuiPickersYear-yearButton.Mui-selected {
    background-color: #993000 !important;
  }
`;

export const CalendarActions = styled.div`
  display: flex;
  flex-direction: row;
  font-size: 24px;
  width: 100%;
  justify-content: flex-end;
  gap: 2rem;

  ${Button} {
    border-radius: 80px;
    padding: 1rem 2rem;
    color: white;
    transition: all 0.2s ease-out;

    &.add {
      background-color: red;
    }
    &.remove {
      background-color: ${variables.GREEN};
    }

    &:hover {
      filter: brightness(0.8);
    }
  }
`;
