import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import AddBHabit from '../components/BHabits/AddBHabit';
import BHabitItem from '../components/BHabits/BHabitItem';
import Button from '../components/UI/Button';
import Modal from '../components/UI/Modal';
import useModal from '../hooks/use-modal';
import * as Styled from '../styles/BHabits.styled';

const BHabitsPage = () => {
  const { isShowing: modalIsShowing, toggle: toggleModal } = useModal();
  return (
    <Styled.BHabitContent>
      <Styled.BHabitHeader>
        <h1>Bad Habits</h1>
        <Styled.BHabitActions>
          <Button onClick={toggleModal}>
            <FontAwesomeIcon icon='fa-solid fa-plus' fixedWidth />
          </Button>
        </Styled.BHabitActions>
      </Styled.BHabitHeader>
      <Styled.BHabitList>
        <BHabitItem />
        <BHabitItem />
        <BHabitItem />
        <BHabitItem />
        <BHabitItem />
        <BHabitItem />
        <BHabitItem />
        <BHabitItem />
      </Styled.BHabitList>
      <Modal isShowing={modalIsShowing} hide={toggleModal} className='add-modal' hasOverlay>
        <AddBHabit />
      </Modal>
    </Styled.BHabitContent>
  );
};

export default BHabitsPage;
