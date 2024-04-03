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
`;
