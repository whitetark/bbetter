import React from 'react';
import * as Styled from '../../styles/UI.styled';
import Button from './Button';

const Confirmation = ({ onClick, hide, onDelete, isLogout }) => {
  return (
    <Styled.Confirmation onClick={onClick}>
      <p>Are you sure?</p>
      <div>
        <Button onClick={hide}>Close</Button>
        <Button className='delete' onClick={onDelete}>
          {isLogout ? 'Logout' : 'Delete'}
        </Button>
      </div>
    </Styled.Confirmation>
  );
};

export default Confirmation;
