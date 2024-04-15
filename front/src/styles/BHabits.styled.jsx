import styled from 'styled-components';
import * as variables from '../app/shared/colorVariables';
import { HomePadding } from './UI.styled';

export const BHabitContent = styled(HomePadding)`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  h1 {
  }
`;

export const BHabitHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const BHabitActions = styled.div`
  display: flex;
  flex-direction: row;
  gap: 2rem;
  font-size: 24px;
  justify-self: flex-end;
`;
export const BHabitList = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  max-width: 90rem;
  width: 100%;
  height: 100%;
  margin: 0 auto;
`;

export const BHabitItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  background-color: ${variables.BACKGROUND};
  padding: 1rem 2rem;
  border-radius: 10px;
  justify-content: space-between;

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
