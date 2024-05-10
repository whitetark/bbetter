import { Form } from 'formik';
import styled from 'styled-components';
import * as variables from '../app/shared/colorVariables';
import { Button, HomePadding } from './UI.styled';
import { AddWishButton } from './Wishes.styled';

export const Settings = styled(HomePadding)``;
export const SettingsMain = styled.div`
  display: flex;
  flex-direction: column;
`;
export const SettingsActions = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 18px;
  font-weight: 500;
  max-width: 25rem;

  ${Button} {
    display: flex;
    flex-direction: row;
    gap: 1rem;
    align-items: center;
    padding: 1rem;
    border-radius: 10px;

    &:hover {
      background-color: ${variables.TAB_HOVER};
    }
  }
`;

export const ChangePreview = styled.div`
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-width: 30rem;

  h2 {
    font-size: 24px;
    font-weight: 500;
    color: ${variables.DISABLED_BUTTON};
  }
`;
export const ChangeMain = styled.div``;

export const ChangePasswordForm = styled(Form)`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  input {
    padding: 0.5rem;
    width: 100%;
    border-radius: 10px;
    outline: none;
    font-size: 20px;
    max-width: 35rem;
    border: 1px solid ${variables.DIVIDER};
  }
`;
export const ChangePasswordButton = styled(AddWishButton)`
  font-size: 18px;
`;

export const ChangePasswordSuccess = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 22px;
  font-style: italic;
  gap: 1rem;
`;
