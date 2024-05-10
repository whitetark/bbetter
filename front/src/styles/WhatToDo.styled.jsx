import styled from 'styled-components';
import * as variables from '../app/shared/colorVariables';

export const WhatToDo = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  margin: 2rem;
`;

export const WhatToDoBlock = styled.div`
  display: flex;
  flex-direction: column;
  background-color: white;
  border-radius: 10px;
  padding: 1.5rem;
  gap: 0.5rem;
  max-width: 25rem;
  width: 100%;
  h1 {
    color: ${variables.GREEN};
    font-size: 24px;
    font-weight: 600;
  }
`;

export const WhatToDoItem = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${variables.TAB_HOVER};
  padding: 0.5rem;
  border-radius: 10px;
  .content {
    align-self: flex-start;
  }

  .type {
    align-self: flex-end;
    font-size: 14px;
    color: ${variables.DISABLED_BUTTON};
    font-weight: 500;
  }
`;
