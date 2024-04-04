import { TextField } from '@material-ui/core';
import styled from 'styled-components';
import { Container } from './UI.styled';

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
  align-items: center;
  height: 100%;
  border-radius: 10px;
  padding: 10rem;
`;

export const LoginForm = styled.div`
  width: 100%;
  form {
    display: flex;
    flex-direction: column;
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
