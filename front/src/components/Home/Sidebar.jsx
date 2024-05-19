import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { NavLink } from 'react-router-dom';
import PathConstants from '../../app/shared/pathConstants';
import * as Styled from '../../styles/App.styled';
import Logo from '../UI/Logo';

const Sidebar = () => {
  return (
    <Styled.Sidebar>
      <NavLink to={PathConstants.HOME}>
        <Logo />
      </NavLink>
      <Styled.Tabs>
        <NavLink to={PathConstants.TASK}>
          <FontAwesomeIcon icon='fa-solid fa-list-check' fixedWidth />
          <span>Task List</span>
        </NavLink>
        <NavLink to={PathConstants.WISH_LIST}>
          <FontAwesomeIcon icon='fa-solid fa-drum' fixedWidth />
          <span>Wish List</span>
        </NavLink>
        <NavLink to={PathConstants.GHABITS}>
          <FontAwesomeIcon icon='fa-regular fa-face-grin-beam' fixedWidth />
          <span>Good Habits</span>
        </NavLink>
        <NavLink to={PathConstants.BHABITS}>
          <FontAwesomeIcon icon='fa-regular fa-face-frown-open' fixedWidth />
          <span>Bad Habits</span>
        </NavLink>
      </Styled.Tabs>
      <Styled.Actions>
        <NavLink to={PathConstants.HOME} end>
          <FontAwesomeIcon icon='fa-solid fa-house' fixedWidth />
          <span>Home</span>
        </NavLink>
        <NavLink to={PathConstants.REFLECTIONS}>
          <FontAwesomeIcon icon='fa-solid fa-check-to-slot' fixedWidth />
          <span>Reflections</span>
        </NavLink>
        <NavLink to={PathConstants.QUOTE}>
          <FontAwesomeIcon icon='fa-solid fa-pencil' fixedWidth />
          <span>Quotes</span>
        </NavLink>
        <NavLink to={PathConstants.SETTINGS}>
          <FontAwesomeIcon icon='fa-solid fa-gear' fixedWidth />
          <span>Settings</span>
        </NavLink>
      </Styled.Actions>
    </Styled.Sidebar>
  );
};

export default Sidebar;
