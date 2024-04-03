import React from 'react';

import BackgroundImg from '../../assets/background.jpg';
import * as Styled from '../../styles/UI.styled';

const Background = () => {
  return (
    <Styled.BackgroundWrapper>
      <Styled.BackgroundItem image={BackgroundImg} />
    </Styled.BackgroundWrapper>
  );
};

export default Background;
