import { styled } from 'styled-components';
import * as variables from './Variables.js';

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
  display: flex;
  flex-direction: column;
  position: fixed;
  z-index: 102;

  &.login-modal {
    padding: 0 1rem;
    top: 7rem;
    width: 100%;
  }

  &.pub-modal {
    height: 100%;
    justify-content: center;
    align-items: center;
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

  display: flex;
  justify-content: center;
  align-items: center;
`;

const padding = '1rem';

export const ModalWrapper = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${variables.WHITE_COLOR};
  border-radius: 10px;
  overflow: hidden;
  max-width: 29.2rem;
  width: 100%;
  align-self: flex-end;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
`;

export const ModalHeader = styled.div`
  background-color: ${variables.BLUE_COLOR};
  color: ${variables.WHITE_COLOR};
  padding: ${padding};
  text-align: center;
  font-weight: 500;
  h2 {
    font-size: 2.4rem;
  }
`;
export const ModalMain = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem ${padding} ${padding};
  form {
    display: flex;
    flex-direction: column;
    align-items: center;
    input {
      border: 1px solid ${variables.GRAY_COLOR};
      border-radius: 10px;
      padding: 1rem;
      font-size: 1.4rem;
      width: 100%;
      max-width: 27.1rem;
      outline: none;
      &::placeholder {
        color: ${variables.GRAY_COLOR};
        font-weight: 500;
        width: 100%;
      }

      &.error {
        border-color: red;
        border-width: 1.5px;
      }

      &:not(:first-child) {
        margin-top: 1rem;
      }
    }
    div {
      align-self: flex-start;
      padding-left: 1rem;
      padding-top: 0.5rem;
    }
  }
`;

export const ModalInfo = styled.div`
  text-align: center;
  color: ${variables.BLACK_COLOR};
  font-weight: 500;
  font-size: 1.4rem;
  margin-top: 1rem;
  button {
    color: ${variables.BLUE_COLOR};
    transition: color 0.2s ease-out;
    &:hover {
      color: ${variables.BLUE_HOVER_COLOR};
    }
  }
`;

export const Success = styled.div`
  text-align: center;
  font-size: 1.8rem;
  color: ${variables.TEXT_COLOR};
  font-weight: 500;
`;
