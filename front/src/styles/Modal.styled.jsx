import { styled } from 'styled-components';
import * as variables from '../app/shared/colorVariables';

export const Overlay = styled.div`
  content: '';
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: black;
  opacity: 0.5;
`;
export const Children = styled.div`
  max-width: 120rem;
  margin: 0 auto;
  display: grid;
  position: fixed;
  z-index: 102;

  &.add-modal {
    place-self: flex-end;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    background-color: white;
    margin: 2rem;
    border-radius: 10px;
    max-width: 30rem;

    h1 {
      font-size: 24px;
      color: ${variables.DISABLED_BUTTON};
      font-weight: 500;
    }
    box-shadow: ${variables.BOX_SHADOW};
  }

  &.task-modal {
    border-radius: 10px;
    background-color: white;
    place-self: center;

    h1 {
      font-size: 24px;
      color: ${variables.DISABLED_BUTTON};
      font-weight: 500;
    }
  }
`;

export const Modal = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  overflow-y: hidden;
  height: 100vh;
  width: 100%;
  z-index: 101;
  display: grid;
`;
