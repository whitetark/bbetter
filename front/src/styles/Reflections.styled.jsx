import { Form } from 'formik';
import styled from 'styled-components';
import * as variables from '../app/shared/colorVariables';

export const ReflectionAdd = styled.div``;
export const AddReflectForm = styled(Form)``;

export const InputRoot = styled.div`
  font-family: 'IBM Plex Sans', sans-serif;
  font-weight: 400;
  color: ${variables.GREEN};
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
`;
export const Input = styled.div`
  font-size: 0.875rem;
  font-family: inherit;
  font-weight: 400;
  line-height: 1.375;
  color: ${variables.DIVIDER};
  background: white;
  border: 1px solid black;
  box-shadow: ${variables.BOX_SHADOW};
  border-radius: 8px;
  margin: 0 8px;
  padding: 10px 12px;
  outline: 0;
  min-width: 0;
  width: 4rem;
  text-align: center;

  &:hover {
    border-color: ${variables.GREEN_HOVER};
  }

  &:focus {
    border-color: ${variables.GREEN_HOVER};
    box-shadow: 0 0 0 3px ${variables.GREEN};
  }

  &:focus-visible {
    outline: 0;
  }
`;
export const Button = styled.div`
  font-family: 'IBM Plex Sans', sans-serif;
  font-size: 0.875rem;
  box-sizing: border-box;
  line-height: 1.5;
  border: 1px solid;
  border-radius: 999px;
  border-color: ${variables.DECIDE_CELL};
  background: ${variables.DELEGATE_CELL};
  color: ${variables.DIVIDER};
  width: 32px;
  height: 32px;
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 120ms;

  &:hover {
    cursor: pointer;
    background: ${variables.GREEN};
    border-color: ${variables.GREEN};
    color: ${variables.DIVIDER};
  }

  &:focus-visible {
    outline: 0;
  }

  &.increment {
    order: 1;
  }
`;
