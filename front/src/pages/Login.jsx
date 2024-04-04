import React from 'react';
import LoginForm from '../components/LoginPage/LoginForm';
import Background from '../components/UI/Background';
import Divider from '../components/UI/Divider';
import * as Styled from '../styles/Login.styled';

const LoginPage = () => {
  return (
    <Styled.Login>
      <Background />
      <Styled.LoginContent>
        Logo
        <span>Welcome to bbettr</span>
        <LoginForm />
        <Divider />
        <p>
          New bbettr? <button>Create Account</button>
        </p>
      </Styled.LoginContent>
    </Styled.Login>
  );
};

export default LoginPage;
