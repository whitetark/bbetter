import styled from 'styled-components';
import * as variables from '../app/shared/colorVariables';
import { Container } from './UI.styled';

export const App = styled(Container)`
  display: grid;
  grid-template-columns: minmax(12rem, 36rem) 3px 1fr;
  background-color: ${variables.WHITE};
  max-width: 180rem;
  border-radius: 10px;
  width: 100%;
  box-shadow: ${variables.BOX_SHADOW};
  overflow: hidden;

  .divider {
    content: '';
    margin: 4rem 0;
    border-left: 2px solid ${variables.DIVIDER};
  }
`;

export const Tabs = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 26px;
  gap: 0.5rem;
`;

export const Actions = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 18px;
  gap: 0.2rem;
`;

export const Sidebar = styled.div`
  padding: 4rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  ${Tabs}, ${Actions} {
    a {
      text-decoration: none;
      color: black;
      font-weight: 500;
      display: flex;
      flex-direction: row;
      align-items: center;
      gap: 1rem;
      padding: 1rem;
      border-radius: 10px;

      &:hover {
        background-color: ${variables.TAB_HOVER};
      }

      &.active {
        background-color: ${variables.TAB_HOVER};
      }
    }
  }
`;
