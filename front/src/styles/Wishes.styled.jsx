import { Form } from 'formik';
import styled from 'styled-components';
import * as variables from '../app/shared/colorVariables';
import { BHabitActions, BHabitHeader } from './BHabits.styled';
import { Button, HomePadding } from './UI.styled';

export const WishContent = styled(HomePadding)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 3rem;
`;

export const WishActions = styled(BHabitActions)``;
export const WishHeader = styled(BHabitHeader)``;

export const Input = styled.input`
  height: 20px;
  width: 20px;
  background-color: ${variables.WHITE};
  accent-color: ${variables.DISABLED_BUTTON};
  margin-left: auto;
`;

export const WishItem = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 1rem;
  overflow: hidden;
  width: 100%;

  background-color: ${variables.BACKGROUND};
  border-radius: 10px;
  padding: 2rem 1rem;

  .number {
    background-color: white;
    border-radius: 80px;
    width: 25px;
    line-height: 25px;
    text-align: center;
  }

  .content {
    display: inline-block;
    overflow-wrap: break-word;
    word-break: break-all;
    overflow: hidden;
    text-overflow: ellipsis;
    max-height: 5ch;
    width: 100%;
    font-size: 18px;
  }

  &.checked {
    background-color: ${variables.GREEN};
    text-decoration: line-through;
  }

  &:first-child {
    grid-column: 1/10;
    grid-row: 1/3;
    .content {
      font-size: 24px;
    }
  }

  &:nth-child(2) {
    grid-column: 10/19;
    grid-row: 1/2;
    .content {
      font-size: 22px;
    }
  }

  &:nth-child(3) {
    grid-column: 10/19;
    grid-row: 2/3;
    .content {
      font-size: 22px;
    }
  }

  &:nth-of-type(n + 4) {
    grid-column: 2/18;
  }
`;

export const WishList = styled.div`
  display: grid;
  grid-template-rows: repeat(auto-fit, 10rem);
  gap: 3rem;
  height: 100%;
  font-size: 20px;
  width: 100%;
  max-width: 90rem;
  margin: 0 auto;
`;

export const AddWish = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  background-color: white;
  margin: 2rem;
  padding: 2rem;
  border-radius: 10px;
  h1 {
    font-size: 24px;
    color: ${variables.DISABLED_BUTTON};
    font-weight: 500;
  }
  box-shadow: ${variables.BOX_SHADOW};
`;

export const AddWishForm = styled(Form)`
  display: flex;
  flex-direction: column;
  font-size: 18px;
  input {
    padding: 0.5rem;
    width: 100%;
    border-radius: 10px;
    outline: none;
    font-size: 18px;
    max-width: 35rem;
  }

  .error {
    color: red;
    font-size: 16px;
    text-align: right;
    font-weight: 500;
  }

  ${Button} {
    margin-top: 1rem;
    background-color: ${variables.GREEN};
    color: ${variables.WHITE};
    border-radius: 10px;
    font-weight: 500;
    padding: 0.5rem;
    font-size: 18px;

    &:hover {
      background-color: ${variables.GREEN_HOVER};
    }
    &:disabled {
      background-color: ${variables.DISABLED_BUTTON};
    }
  }
`;
