import { styled } from 'styled-components';
import * as variables from '../app/shared/colorVariables';
import { Button } from './UI.styled';

export const HomeHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

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
  flex-direction: column;
  gap: 4rem;
`;

export const HomeActions = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  ${Button} {
    background-color: ${variables.GREEN_HOVER};
    color: ${variables.WHITE};
    font-size: 42px;
    padding: 3rem 4rem;
    border-radius: 10px;
    box-shadow: ${variables.BOX_SHADOW};
    font-weight: 500;

    &:hover {
      background-color: ${variables.GREEN};
    }

    &:disabled {
      background-color: ${variables.DISABLED_BUTTON};
    }
  }
`;

export const HomeContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;
  height: 100%;
  z-index: 2;
  padding: 3rem;
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
