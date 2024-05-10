import React, { useState } from 'react';

import * as Styled from '../../styles/Settings.styled';
import ChangePassword from './ChangePassword';
import ConfirmPassword from './ConfirmPassword';

const ChangePasswordPreview = ({ onClick, hide }) => {
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const isSuccessContent = (
    <Styled.ChangePasswordSuccess>
      <p>You succesfully changed password! 🥰</p>
      <Styled.ChangePasswordButton onClick={hide}>Close</Styled.ChangePasswordButton>
    </Styled.ChangePasswordSuccess>
  );
  const isNotSuccessContent = isConfirmed ? (
    <ChangePassword setIsSuccess={setIsSuccess} />
  ) : (
    <ConfirmPassword setIsConfirmed={setIsConfirmed} />
  );

  return (
    <Styled.ChangePreview onClick={onClick}>
      <h2>Change Password</h2>
      <Styled.ChangeMain>{isSuccess ? isSuccessContent : isNotSuccessContent}</Styled.ChangeMain>
    </Styled.ChangePreview>
  );
};

export default ChangePasswordPreview;
