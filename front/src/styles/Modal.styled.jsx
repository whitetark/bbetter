import { styled } from 'styled-components';

export const Overlay = styled.div`
  content: '';
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: black;
  opacity: 0.5;
`;
export const Children = styled.div`
  max-width: 120rem;
  margin: 0 auto;
  display: grid;
  position: fixed;
  z-index: 102;

  &.add-modal {
    place-self: flex-end;
  }
`;

export const Modal = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  overflow-y: hidden;
  height: 100vh;
  width: 100%;
  z-index: 101;
  display: grid;
`;
