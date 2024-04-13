import styled from 'styled-components';
import * as variables from '../app/shared/colorVariables';
import { TaskActions } from './Tasks.styled';
import { HomePadding } from './UI.styled';

export const BHabitContent = styled(HomePadding)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;

  h1 {
    align-self: flex-start;
    justify-self: flex-start;
  }
`;

export const BHabitActions = styled(TaskActions)`
  flex-direction: column;
  margin-top: 0;
  justify-self: flex-end;
`;
export const BHabitMain = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  max-width: 90rem;
  width: 100%;
`;
export const BHabitList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

export const BHabitItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  background-color: ${variables.BACKGROUND};
  padding: 1rem 2rem;
  border-radius: 10px;

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
`;
