import React from 'react';
import * as Styled from '../../styles/UI.styled';

const Button = (props) => {
  return (
    <Styled.Button
      type={props.type || 'button'}
      className={`${props.className}`}
      onClick={props.onClick}
      disabled={props.disabled}>
      {props.children}
    </Styled.Button>
  );
};

export default Button;
