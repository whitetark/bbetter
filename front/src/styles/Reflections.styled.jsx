import { Form } from 'formik';
import styled from 'styled-components';
import * as variables from '../app/shared/colorVariables';
import { AddWishButton } from './Wishes.styled';

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
