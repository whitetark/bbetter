import React from 'react';
import { useNavigate } from 'react-router-dom';

import * as Styled from '../styles/NotFound.styled';

const NotFound = () => {
  const navigate = useNavigate();
  const clickHandler = () => {
    navigate('/');
  };

  return (
    <Styled.NotFound>
      <span>404. Not Found</span>
      <button onClick={clickHandler}>Go Back</button>
    </Styled.NotFound>
  );
};

export default NotFound;
