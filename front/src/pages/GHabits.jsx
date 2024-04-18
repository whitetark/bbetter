import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import AddGHabit from '../components/GHabits/AddGHabit';
import GHabitItem from '../components/GHabits/GHabitItem';
import Button from '../components/UI/Button';
import Modal from '../components/UI/Modal';
import useModal from '../hooks/use-modal';
import * as Styled from '../styles/GHabits.styled';

const GHabitsPage = () => {
  const { isShowing: modalIsShowing, toggle: toggleModal } = useModal();
  return (
    <Styled.GHabitContent>
      <Styled.GHabitHeader>
        <h1>Good Habits</h1>
        <Styled.GHabitActions>
          <Button onClick={toggleModal}>
            <FontAwesomeIcon icon='fa-solid fa-plus' fixedWidth />
          </Button>
        </Styled.GHabitActions>
      </Styled.GHabitHeader>
      <Styled.GHabitList>
        <Styled.GHabitTableHeader>
          <div></div>
          <div></div>
          <div className='weeks-list'>
            <div>Mon</div>
            <div>Tue</div>
            <div>Wed</div>
            <div>Thu</div>
            <div>Fri</div>
            <div>Sat</div>
            <div>Sun</div>
          </div>
        </Styled.GHabitTableHeader>
        <GHabitItem />
        <GHabitItem />
        <GHabitItem />
        <GHabitItem />
        <GHabitItem />
      </Styled.GHabitList>
      <Modal isShowing={modalIsShowing} hide={toggleModal} className='add-modal' hasOverlay>
        <AddGHabit />
      </Modal>
    </Styled.GHabitContent>
  );
};

export default GHabitsPage;
