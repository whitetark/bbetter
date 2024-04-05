import React from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/logo.png';
import * as Styled from '../../styles/UI.styled';

const Logo = () => {
  const navigate = useNavigate();
  return (
    <Styled.Logo onClick={() => navigate('/home')}>
      <img src={logo} alt='' />
    </Styled.Logo>
  );
};

export default Logo;
