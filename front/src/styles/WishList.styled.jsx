import styled from 'styled-components';
import * as variables from '../app/shared/colorVariables';
import { TaskListActions, TaskListHeader, TaskListHeaderBlock } from './TaskList.styled';
import { HomePadding } from './UI.styled';
import { Input as OtherInput } from './Wishes.styled';

export const WishList = styled(HomePadding)`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;
export const WishListHeader = styled(TaskListHeader)`
  flex-direction: column;
  gap: 1rem;
`;
export const WishListHeaderBlock = styled(TaskListHeaderBlock)``;

export const WishListActions = styled(TaskListActions)``;
export const WishListMain = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const WishListItem = styled.div`
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
export const WishListItemActions = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1rem;
  font-size: 16px;
  color: ${variables.DISABLED_BUTTON};
  transition: all 0.2s ease-out;
  &:hover {
    color: black;
  }
`;
export const Input = styled(OtherInput)``;
