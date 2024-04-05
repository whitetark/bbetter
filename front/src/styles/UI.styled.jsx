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
  background-color: white;
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
