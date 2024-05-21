import styled from 'styled-components';
import * as variables from '../app/shared/colorVariables';
import { BHabitItemActions, BHabitItemHeader } from './BHabits.styled';
import { TaskListHeader, TaskListHeaderBlock } from './TaskList.styled';
import { TaskActions } from './Tasks.styled';
import { Button, HomePadding } from './UI.styled';
import { AddWishButton, AddWishForm } from './Wishes.styled';

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

export const GHabitItemPart = styled.div`
  display: flex;
  padding: 1rem 2rem;

  .number {
    background-color: ${variables.TAB_HOVER};
    color: ${variables.DISABLED_BUTTON};
    border-radius: 80px;
    width: 25px;
    line-height: 25px;
    text-align: center;
  }
`;
export const GHabitItem = styled.div`
  display: grid;
  grid-template-columns: 8fr 6fr 1fr;
  width: 100%;
  background-color: ${variables.BACKGROUND};
  border-radius: 10px;
  transition: all 0.2s ease-out;

  &.checked {
    background-color: ${variables.GREEN};
    text-decoration: line-through;
  }

  &:hover {
    filter: brightness(0.8);
    cursor: pointer;
  }
`;

export const Checklist = styled.div`
  display: flex;
  flex-direction: row;
  gap: 3rem;
  justify-self: flex-end;
  align-self: center;
  padding: 1rem 2rem 1rem 0;
`;

export const GHabitHeader = styled(TaskListHeader)`
  flex-direction: column;
`;
export const GHabitHeaderBlock = styled(TaskListHeaderBlock)`
  justify-content: space-between;
`;

export const GHabitTableHeader = styled.div`
  display: grid;
  grid-template-columns: 8fr 6fr 1fr;
  .weeks-list {
    display: flex;
    flex-direction: row;
    gap: 2rem;
    justify-content: space-between;
    justify-self: flex-end;
    text-transform: uppercase;
    font-weight: 500;
    padding: 1rem 2rem;
    color: ${variables.DISABLED_BUTTON};
  }
`;
export const GHabitItemActions = styled(BHabitItemActions)``;

export const Input = styled.input`
  height: 20px;
  width: 20px;
  background-color: ${variables.WHITE};
  accent-color: ${variables.DISABLED_BUTTON};
  margin-left: auto;

  &:hover {
    cursor: pointer;
  }
`;

export const AddGHabit = styled.div`
  padding: 2rem;
`;
export const AddGHabitForm = styled(AddWishForm)`
  input[type='text'] {
    padding: 0.5rem;
    width: 100%;
    border-radius: 10px;
    outline: none;
    font-size: 20px;
    max-width: 35rem;
    border: 1px solid ${variables.DIVIDER};
  }
`;
export const AddGHabitButton = styled(AddWishButton)``;

export const GHabitView = styled.div`
  background-color: ${variables.WHITE};
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-width: 37rem;
  width: 100%;
  padding: 2rem;
`;
export const GHabitViewHeader = styled(BHabitItemHeader)`
  align-items: center;
  justify-content: space-between;
`;
export const GHabitViewActions = styled.div`
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
export const GHabitViewMain = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;

  > .content {
    overflow-wrap: break-word;
    word-break: break-all;
    font-size: 18px;
  }
`;

export const Calendar = styled.div`
  .css-23p0if-MuiButtonBase-root-MuiPickersDay-root.Mui-selected,
  .css-1wy8uaa-MuiButtonBase-root-MuiPickersDay-root.Mui-selected,
  .css-innj4t-MuiPickersYear-yearButton.Mui-selected {
    background-color: #00990f !important;
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
      background-color: ${variables.GREEN};
    }
    &.remove {
      background-color: red;
    }

    &:hover {
      filter: brightness(0.8);
    }
  }
`;

export const GHabitMain = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;
export const GHabitItems = styled.div`
  display: grid;
  grid-template-columns: 4fr 2fr;
  gap: 2rem;
`;
export const GHabitInfo = styled.div`
  margin-top: auto;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 2rem;
`;
export const FutureItem = styled.div`
  background-color: ${variables.DIVIDER};
  border-radius: 10px;
  padding: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 25px;
  color: ${variables.DISABLED_BUTTON};
  font-weight: 500;
`;
