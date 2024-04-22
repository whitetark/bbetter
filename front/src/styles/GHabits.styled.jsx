import styled from 'styled-components';
import * as variables from '../app/shared/colorVariables';
import { BHabitHeader, BHabitItemActions, BHabitItemHeader } from './BHabits.styled';
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
    background-color: white;
    border-radius: 80px;
    width: 25px;
    line-height: 25px;
    text-align: center;
  }
`;
export const GHabitItem = styled.div`
  display: grid;
  grid-template-columns: 1fr 8fr 6fr;
  width: 100%;
  background-color: ${variables.BACKGROUND};
  border-radius: 10px;
  transition: all 0.2s ease-out;

  &.checked {
    background-color: ${variables.GREEN};
    text-decoration: line-through;
  }

  &:has(${GHabitItemPart}:hover) {
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

export const GHabitHeader = styled(BHabitHeader)``;

export const GHabitTableHeader = styled.div`
  display: grid;
  grid-template-columns: 1fr 8fr 6fr;
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
`;

export const AddGHabit = styled.div``;
export const AddGHabitForm = styled(AddWishForm)``;
export const AddGHabitButton = styled(AddWishButton)``;

export const GHabitView = styled.div`
  background-color: ${variables.WHITE};
  border-radius: 10px;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-width: 37rem;
  width: 100%;
`;
export const GHabitViewHeader = styled(BHabitItemHeader)`
  align-items: center;
  justify-content: flex-end;
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

export const Calendar = styled.div``;

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
