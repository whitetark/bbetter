import styled from 'styled-components';
import * as variables from '../app/shared/colorVariables';
import { Button, Container } from './UI.styled';

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

  @media only screen and (max-width: ${variables.MIDDLE_WIDTH}) {
    grid-template-columns: 13rem 3px 1fr;
  }

  @media only screen and (max-width: ${variables.MOBILE_WIDTH}) {
    display: flex;
    flex-direction: column;
  }

  @media only screen and (max-width: ${variables.MOBILE_WIDTH}) {
    .divider {
      border-top: 2px solid ${variables.DIVIDER};
      margin: 0 4rem;
    }
  }
`;

export const Tabs = styled.div`
  display: flex;
  flex-direction: column;
  align-self: center;
  font-size: 26px;
  gap: 0.5rem;

  @media only screen and (max-width: ${variables.MIDDLE_WIDTH}) {
    span {
      display: none;
    }
  }

  @media only screen and (max-width: ${variables.MOBILE_WIDTH}) {
    display: grid;
    grid-template-columns: 1fr 1fr;
    align-self: initial;
    span {
      display: block;
    }
  }

  @media only screen and (max-width: ${variables.EXTRA_MOBILE_WIDTH}) {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;

    a {
      display: flex;
      justify-content: center;
    }

    span {
      display: none;
    }
  }
`;

export const Actions = styled.div`
  display: flex;
  flex-direction: column;
  align-self: flex-end;
  font-size: 18px;
  gap: 0.2rem;

  @media only screen and (max-width: ${variables.MIDDLE_WIDTH}) {
    align-self: initial;
    span {
      display: none;
    }
  }

  @media only screen and (max-width: ${variables.MOBILE_WIDTH}) {
    display: grid;
    grid-template-columns: 1fr 1fr;

    a {
      text-align: center;
    }

    span {
      display: block;
    }
  }

  @media only screen and (max-width: ${variables.EXTRA_MOBILE_WIDTH}) {
    grid-template-columns: 1fr;
    span {
      display: block;
    }
  }
`;

export const Sidebar = styled.div`
  padding: 4rem;
  gap: 1rem;
  display: grid;
  grid-template-rows: 6rem 1fr;

  .divider {
    display: none;
  }

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

  @media only screen and (max-width: ${variables.MOBILE_WIDTH}) {
    padding-bottom: 0;

    .divider {
      display: block;
      border-top: 2px solid ${variables.DIVIDER};
      border-left: 0;
      margin: 0;
    }
  }
`;

export const SidebarHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  font-size: 32px;
  transition: 0.2ms ease-out;

  ${Button} {
    display: none;
    color: ${variables.DISABLED_BUTTON};
  }

  @media only screen and (max-width: ${variables.MOBILE_WIDTH}) {
    ${Button} {
      display: block;

      &.open {
        color: black;
      }
    }
  }
`;

export const TabsBlock = styled.div`
  display: grid;
  grid-template-rows: 4fr 2fr;
  gap: 2rem;

  @media only screen and (max-width: ${variables.MOBILE_WIDTH}) {
    display: flex;
    flex-direction: column;
    height: 0px;
    overflow: hidden;
    transition: height 0.4s ease;
    -webkit-transition: all 0.3s ease;
    transition: all 0.3s ease;

    &.open {
      height: 29rem;
    }
  }

  @media only screen and (max-width: ${variables.EXTRA_MOBILE_WIDTH}) {
    &.open {
      height: 32rem;
    }
  }
`;
