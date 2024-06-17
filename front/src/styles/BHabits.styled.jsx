import styled from 'styled-components';
import * as variables from '../app/shared/colorVariables';
import { Button, HomePadding, Pagination } from './UI.styled';
import { AddWishButton, AddWishForm, WishActions, WishHeader } from './Wishes.styled';

export const BHabitContent = styled(HomePadding)`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  h1 {
  }
`;

export const BHabitHeader = styled(WishHeader)`
  flex-direction: column;
  gap: 1rem;
`;
export const BHabitHeaderBlock = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;
export const BHabitActions = styled(WishActions)``;
export const BHabitList = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  width: 100%;
  align-self: center;

  @media only screen and (max-width: ${variables.EXTRA_MOBILE_WIDTH}) {
    grid-template-columns: 1fr;
  }
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
    gap: 2rem;

    .perc {
      font-size: 36px;
      font-weight: 500;
      margin-left: auto;
    }
  }

  .time-content {
    .time {
      color: ${variables.DISABLED_BUTTON};
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
      color: ${variables.DISABLED_BUTTON};
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

  ${Button} {
    transition: all 0.2s ease-out;
    &:hover {
      color: black;
    }
  }
`;

export const AddBHabit = styled.div`
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;
export const AddBHabitForm = styled(AddWishForm)`
  gap: 1rem;

  p {
    color: ${variables.DISABLED_BUTTON};
    font-weight: 500;
  }

  .css-o9k5xi-MuiInputBase-root-MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline,
  .css-1bn53lx.Mui-focused .MuiOutlinedInput-notchedOutline {
    border-color: inherit;
    border-width: 1px;
  }

  input[type='text'] {
    padding: 0.5rem;
    width: 100%;
    border-radius: 10px;
    outline: none;
    font-size: 20px;
    max-width: 35rem;
    border: 1px solid ${variables.DIVIDER};
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

      .react-datepicker__input-time-container {
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
export const BHabitViewStats = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  font-size: 18px;
  padding: 2rem 0;
  color: ${variables.DIVIDER};

  > div {
    display: flex;
    flex-direction: column;
  }

  span {
    background-color: ${variables.GREEN};
    color: ${variables.WHITE};
    border-radius: 20px;
    padding: 0.5rem;
    text-align: center;
    font-weight: 400;
  }
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

export const BHabitMain = styled.div`
  display: grid;
  grid-template-columns: 4fr 10px 1fr;
  max-width: 120rem;
  width: 100%;
  height: 100%;
  margin: 0 auto;
  gap: 2rem;

  .divider {
    border-color: ${variables.TAB_HOVER};
  }

  @media only screen and (max-width: ${variables.MOBILE_WIDTH}) {
    display: flex;
    flex-direction: column;
  }
`;
export const BHabitStats = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  align-self: center;
`;
export const BHabitInfoItem = styled.div``;
export const FutureItem = styled.div`
  background-color: ${variables.DIVIDER};
  border-radius: 10px;
  padding: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 28px;
  color: ${variables.DISABLED_BUTTON};
  font-weight: 500;
  display: flex;
  flex-direction: column;
  gap: 1rem;

  &.row {
    flex-direction: row;
    align-items: flex-start;
    gap: 2rem;
  }

  &.stats {
    h1 {
    }
  }

  .content {
    font-size: 16px;
  }
  .author {
    font-size: 18px;
    align-self: flex-end;
    color: ${variables.DISABLED_BUTTON};
  }

  svg {
    font-size: 64px;
  }
`;

export const BHabitMainIdea = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  ${Pagination} {
    align-self: flex-end;
  }
`;
