import styled from 'styled-components';
import * as variables from '../app/shared/colorVariables';
import { TaskActions } from './Tasks.styled';
import { HomePadding } from './UI.styled';

export const WishContent = styled(HomePadding)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  gap: 3rem;
`;

export const WishActions = styled(TaskActions)``;

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
`;

export const WishList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3rem;
  height: 100%;
  font-size: 20px;
  width: 100%;
  max-width: 90rem;
`;
