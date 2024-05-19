import { CircularProgress } from '@mui/material';
import React from 'react';
import * as variables from '../../app/shared/colorVariables';
import * as Styled from '../../styles/UI.styled';

const Loading = () => {
  return (
    <Styled.Loading>
      <CircularProgress size={60} sx={{ color: variables.GREEN }} />
    </Styled.Loading>
  );
};

export default Loading;
