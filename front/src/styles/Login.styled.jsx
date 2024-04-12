import { TextField } from '@material-ui/core';
import styled from 'styled-components';
import * as variables from '../app/shared/colorVariables';
import { Button, Container, Logo } from './UI.styled';

export const Login = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
  overflow: hidden;
  border-radius: 10px;
`;

export const LoginContent = styled(Container)`
  background-color: white;
  z-index: 1;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
  width: 55rem;
  height: 100%;
  border-radius: 10px;
  padding: 0 10rem;
  font-weight: 500;

  > ${Logo} {
    margin: 8rem 0;
  }

  > span {
    color: ${variables.DISABLED_BUTTON};
    font-size: 18px;
    margin: 8rem 0;
  }

  > p {
    margin: 2rem 0;
    color: ${variables.DISABLED_BUTTON};
    > ${Button} {
      font-size: 16px;
      color: ${variables.GREEN};
      border-bottom: 1px solid ${variables.GREEN};

      &:hover {
        color: ${variables.GREEN_HOVER};
        border-color: ${variables.GREEN_HOVER};
      }
    }
  }
`;

export const LoginForm = styled.div`
  width: 100%;
  form {
    display: flex;
    flex-direction: column;
  }

  ${Button} {
    font-size: 24px;
    background-color: ${variables.GREEN};
    color: ${variables.WHITE};
    padding: 1.5rem;
    margin: 2rem 0;
    border-radius: 80px;

    &:hover {
      background-color: ${variables.GREEN_HOVER};
    }

    &:disabled {
      background-color: ${variables.DISABLED_BUTTON};
    }
  }
`;

const fontSize = '16px';

export const Field = styled(TextField)`
  font-size: ${fontSize};
  label {
    font-size: ${fontSize};
  }

  input {
    font-size: ${fontSize};
  }

  p {
    font-size: 12px;
  }
`;
