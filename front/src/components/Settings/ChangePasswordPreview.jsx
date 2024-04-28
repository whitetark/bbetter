import React, { useState } from 'react';

import { useAuthContext } from '../../app/store/auth-context';
import * as Styled from '../../styles/Settings.styled';
import ChangePassword from './ChangePassword';
import ConfirmPassword from './ConfirmPassword';

const ChangePasswordPreview = ({ onClick }) => {
  const { userData } = useAuthContext();

  const [isConfirmed, setIsConfirmed] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const isSuccessContent = <div>You succesfully changed password!</div>;
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
