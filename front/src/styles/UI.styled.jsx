import styled from 'styled-components';
import * as variables from '../app/shared/colorVariables';

export const Container = styled.div`
  max-width: 120rem;
  margin: 0 auto;
`;

export const BackgroundWrapper = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 0;
`;

export const BackgroundItem = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background-image: url(${(props) => props.image});
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  filter: blur(4px) brightness(60%);
`;

export const Divider = styled.div`
  color: ${variables.DIVIDER};
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 1rem;
  font-size: 20px;
  font-weight: 700;
  width: 100%;
  hr {
    background-color: ${variables.DIVIDER};
    height: 1px;
    border: 0;
    width: 100%;
    font-weight: 300;
    display: inline-block;
  }
`;

export const Button = styled.button`
  color: ${variables.WHITE_COLOR};
  text-align: center;

  transition: background-color 0.2s ease-out;

  &:disabled {
    cursor: default;
  }
`;

export const Logo = styled.div`
  img {
    width: 18rem;
  }
`;

export const HomePadding = styled.div`
  height: 100%;
  z-index: 2;
  padding: 3rem;

  h1 {
    font-size: 28px;
    font-weight: 500;
    color: ${variables.DISABLED_BUTTON};
    align-self: flex-start;
  }
`;

export const TextError = styled.div`
  color: red;
  font-size: 16px;
  text-align: right;
  font-weight: 500;
  text-transform: capitalize;
`;

export const Confirmation = styled.div`
  background-color: ${variables.WHITE};
  display: flex;
  flex-direction: column;
  gap: 2rem;
  border-radius: 10px;
  padding: 2rem;

  p {
    font-size: 28px;
  }

  div {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    gap: 2rem;
    font-size: 20px;

    ${Button} {
      background-color: ${variables.DIVIDER};
      padding: 1rem;
      border-radius: 10px;

      &.delete {
        color: ${variables.WHITE};
        background-color: red;
      }
    }
  }
`;
