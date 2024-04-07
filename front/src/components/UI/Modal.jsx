import React from 'react';
import { createPortal } from 'react-dom';

import * as Styled from '../../styles/Modal.styled';

const Modal = ({ children, isShowing, hide, className, hasOverlay }) => {
  const renderChildren = () => {
    return React.cloneElement(children, {
      onClick: clickHandler,
    });
  };
  const clickHandler = (e) => {
    e.stopPropagation();
  };

  return isShowing
    ? createPortal(
        <Styled.Modal onClick={hide}>
          {hasOverlay ? <Styled.Overlay color={'black'} onClick={hide} /> : undefined}
          <Styled.Children className={className || undefined}> {renderChildren()}</Styled.Children>
        </Styled.Modal>,
        document.getElementById('modal_root'),
      )
    : null;
};

export default Modal;
