import { Form } from 'formik';
import styled from 'styled-components';
import * as variables from '../app/shared/colorVariables';
import { Button, HomePadding } from './UI.styled';
import { AddWishButton } from './Wishes.styled';

export const ReflectionsContent = styled(HomePadding)``;
export const ReflectionsMain = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  max-width: 90rem;
  margin: 0 auto;
`;

export const ReflectionButtonBlock = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
`;

export const ReflectionAddBlock = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${variables.TAB_HOVER};
  border-radius: 10px;
  width: 100%;
  padding: 2rem;
`;

export const ReflectionAddButton = styled.div`
  background-color: ${variables.WHITE};
  padding: 1.5rem 4rem;
  border-radius: 80px;
  font-size: 24px;
  font-weight: 500;
  text-align: center;
  transition: all 0.2s ease-out;

  &:hover {
    background-color: ${variables.DIVIDER};
    cursor: pointer;
  }
`;

export const ReflectionItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  justify-content: space-between;
`;
export const ReflectionActions = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1rem;

  ${Button} {
    transition: all 0.2s ease-out;
    &:hover {
      color: ${variables.DISABLED_BUTTON};
    }
  }
`;
export const ReflectionHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  font-size: 20px;
`;
export const ReflectionMain = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;
export const ReflectionMainEmotion = styled.div`
  display: flex;
  flex-direction: row;
  font-size: 36px;
  gap: 2rem;
  justify-content: center;

  > div {
    display: flex;
    flex-direction: row;
    gap: 1rem;
    align-items: center;
  }
`;
export const ReflectionMainBlock = styled.div`
  p {
    font-size: 24px;
    font-weight: 500;
    color: ${variables.DISABLED_BUTTON};
  }

  > div {
    font-size: 18px;
  }
`;
export const ReflectionDate = styled.div`
  font-weight: 700;
  color: ${variables.DISABLED_BUTTON};
`;

export const Calendar = styled.div`
  .css-1wy8uaa-MuiButtonBase-root-MuiPickersDay-root {
    border-radius: 0;
    transition: background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
    margin: 0;
  }

  .css-23p0if-MuiButtonBase-root-MuiPickersDay-root:not(.Mui-selected) {
    border: none;
  }
  .css-1wy8uaa-MuiButtonBase-root-MuiPickersDay-root.Mui-selected,
  .selected {
    color: ${variables.WHITE};
    background-color: ${variables.GREEN_HOVER} !important;

    &:hover,
    &:focus {
      background-color: ${variables.GREEN_HOVER} !important;
    }
  }

  .css-23p0if-MuiButtonBase-root-MuiPickersDay-root {
    margin: 0;
    border-radius: 0;
  }

  .hovered {
    background-color: ${variables.GREEN};

    &:hover,
    &:focus {
      background-color: ${variables.GREEN};
    }
  }

  .monday {
    border-top-left-radius: 50%;
    border-bottom-left-radius: 50%;
  }

  .sunday {
    border-top-right-radius: 50%;
    border-bottom-right-radius: 50%;
  }
`;

export const ReflectionAdd = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 2rem;

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
export const AddReflectForm = styled(Form)`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const ReflectRating = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  p {
    font-size: 20px;
    font-weight: 500;
    color: ${variables.DIVIDER};
  }

  .baseNumberInput-root {
    font-family: 'IBM Plex Sans', sans-serif;
    font-weight: 400;
    color: ${variables.GREEN};
    display: flex;
    flex-flow: row nowrap;
    justify-content: center;
    align-items: center;
    gap: 1rem;
  }

  .baseNumberInput-input {
    font-size: 24px;
    font-family: inherit;
    font-weight: 500;
    background: white;
    border: 1px solid ${variables.DIVIDER};
    border-radius: 8px;
    outline: 0;
    width: 6rem !important;
    text-align: center;
    transition: all 0.2s ease-in-out;

    &:hover {
      cursor: default;
    }
  }

  .baseNumberInput-button {
    font-family: 'IBM Plex Sans', sans-serif;
    font-size: 24px;
    box-sizing: border-box;
    border-radius: 999px;
    background: ${variables.GREEN};
    color: ${variables.WHITE};
    height: 40px;
    width: 40px;
    display: flex;
    flex-flow: row nowrap;
    justify-content: center;
    align-items: center;
    transition-property: all;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    transition-duration: 120ms;

    &:hover {
      cursor: pointer;
      background: ${variables.GREEN_HOVER};
    }

    &:focus-visible {
      outline: 0;
    }

    &.increment {
      order: 1;
    }

    &:disabled {
      background-color: ${variables.DISABLED_BUTTON};
      cursor: default;
    }
  }
`;

export const ReflectButton = styled(AddWishButton)``;
