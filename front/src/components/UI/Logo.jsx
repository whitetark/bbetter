import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MIDDLE_WIDTH } from '../../app/shared/colorVariables';
import logo from '../../assets/logo.png';
import logoSmall from '../../assets/logosmall.png';
import * as Styled from '../../styles/UI.styled';

const Logo = () => {
  const navigate = useNavigate();
  return (
    <Styled.Logo onClick={() => navigate('/home')}>
      <picture>
        <source srcSet={logoSmall} media={`(max-width: ${MIDDLE_WIDTH})`} />
        <img src={logo} alt='' />
      </picture>
    </Styled.Logo>
  );
};

export default Logo;
