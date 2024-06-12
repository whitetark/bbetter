import { styled } from 'styled-components';
import * as variables from '../app/shared/colorVariables';
import { Button, HomePadding } from './UI.styled';

export const HomeHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  gap: 2rem;

  > div {
    background-color: ${variables.WHITE};
    box-shadow: ${variables.BOX_SHADOW};
  }
`;

export const HomeStats = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${variables.WHITE};
  text-align: center;
  padding: 18rem;
  font-size: 48px;
  color: ${variables.DISABLED_BUTTON};
  font-weight: 500;
  border-radius: 10px;
  box-shadow: ${variables.BOX_SHADOW};
`;

export const MiniProfile = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  border-radius: 80px;
  gap: 1.5rem;
  font-size: 28px;
  font-weight: 500;
  padding: 1rem 2rem 1rem 1rem;
`;

export const HomeMain = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 4rem;
`;

export const HomeActions = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  background-color: ${variables.WHITE};
  border-radius: 10px;
  padding: 2rem;

  p {
    color: ${variables.DIVIDER};
    font-weight: 500;
    font-size: 14px;
    text-align: end;
  }

  ${Button} {
    background-color: ${variables.GREEN};
    color: ${variables.WHITE};
    padding: 1rem 1.5rem;
    font-size: 24px;
    border-radius: 10px;
    box-shadow: ${variables.BOX_SHADOW};
    font-weight: 500;

    &:hover {
      background-color: ${variables.GREEN_HOVER};
    }

    &:disabled {
      background-color: ${variables.DISABLED_BUTTON};
    }
  }
`;

export const HomeActionsBlock = styled.div`
  display: flex;
  align-items: flex-end;
`;

export const HomeInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

export const HomeContent = styled(HomePadding)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;
  gap: 2rem;
`;

export const Home = styled.div`
  position: relative;
  overflow: hidden;
`;

export const Quote = styled.div`
  display: flex;
  flex-direction: row;
  padding: 1rem 3rem;
  border-radius: 80px;
  gap: 1rem;
  max-width: 50rem;
  svg {
    align-self: center;
    font-size: 36px;
  }
`;

export const QuoteData = styled.div`
  display: flex;
  flex-direction: column;
  align-self: flex-end;
  gap: 0.5rem;
  font-weight: 500;
  width: 100%;
  .wisdom {
    font-size: 20px;
    align-self: flex-start;
    font-style: italic;
  }

  .author {
    color: ${variables.DISABLED_BUTTON};
    align-self: flex-end;
    margin-right: 1rem;
  }
`;

export const UserPhoto = styled.div`
  border-radius: 120px;
  overflow: hidden;
  width: 6rem;
`;

export const WeeklyStats = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  justify-content: space-between;
  background-color: ${variables.WHITE};
  border-radius: 10px;
  padding: 2rem;
`;
export const StatsMain = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;
export const StatsBlock = styled.div`
  h1 {
    font-size: 20px;
    font-weight: 500;
  }

  p {
    font-size: 18px;
    color: ${variables.DISABLED_BUTTON};
    font-weight: 200;

    span {
      font-weight: 500;
    }
  }
`;
export const Productivity = styled.div`
  display: grid;
  align-content: center;
  gap: 1rem;

  > span {
    font-size: 14px;
    color: ${variables.DIVIDER};
    font-weight: 600;
    text-align: center;
  }

  .MuiCircularProgress-root
    .MuiCircularProgress-determinate
    .MuiCircularProgress-colorPrimary
    .css-1rn30mb-MuiCircularProgress-root {
    width: 100px !important;
    height: 100px !important;
  }

  .css-1sn4lm3-MuiTypography-root {
    font-size: 32px;
    font-weight: 500;
  }
`;

export const RecentReflection = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${variables.WHITE};
  border-radius: 10px;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;

  > p {
    display: grid;
    place-items: center;
    font-size: 20px;
    place-self: center;
    height: 100%;
    color: ${variables.DIVIDER};
    font-weight: 500;
  }
`;

export const NewWish = styled.div`
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;
export const NewWishHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  gap: 2rem;

  ${Button} {
    font-size: 24px;
    color: ${variables.DISABLED_BUTTON};
  }
`;
export const NewWishMain = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 20px;
  gap: 2rem;

  .type {
    background-color: ${variables.GREEN};
    padding: 0.5rem;
    color: ${variables.WHITE};
    border-radius: 10px;
  }
`;

export const NewWishInfo = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 4rem;
  font-size: 16px;
`;

export const StatsHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  select {
    padding: 0.5rem;
    border-radius: 10px;
    outline: none;
    font-size: 20px;
    border: 1px solid ${variables.DIVIDER};
  }
`;
