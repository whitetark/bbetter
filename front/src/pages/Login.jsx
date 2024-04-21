import React from 'react';
import { useNavigate } from 'react-router-dom';
import PathConstants from '../app/shared/pathConstants';
import LoginForm from '../components/Auth/LoginForm';
import Background from '../components/UI/Background';
import Button from '../components/UI/Button';
import Divider from '../components/UI/Divider';
import Logo from '../components/UI/Logo';
import * as Styled from '../styles/Login.styled';

const LoginPage = () => {
  const navigate = useNavigate();
  document.title = `bbetter - Login`;
  return (
    <Styled.Login>
      <Background />
      <Styled.LoginContent>
        <Logo />
        <span>Welcome to bbettr</span>
        <LoginForm />
        <Divider />
        <p>
          New bbettr?{' '}
          <Button onClick={() => navigate(PathConstants.REGISTER)}>Create Account</Button>
        </p>
      </Styled.LoginContent>
    </Styled.Login>
  );
};

export default LoginPage;
