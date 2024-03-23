import React from 'react';

import * as Styled from '../styles/NotFound.styled';

const MaintenancePage = () => {
  return (
    <Styled.NotFound>
      <h1>Sorry!</h1>
      <span>Server isnt working right now!</span>
      <span>Please, comeback later :)</span>
    </Styled.NotFound>
  );
};

export default MaintenancePage;
