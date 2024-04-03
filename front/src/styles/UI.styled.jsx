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
  gap: 1rem;

  &:before {
    border-top: 1px solid ${variables.DIVIDER};
  }
`;
