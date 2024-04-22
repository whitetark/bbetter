import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import BHabitAdd from '../components/BHabits/BHabitAdd';
import BHabitItem from '../components/BHabits/BHabitItem';
import Button from '../components/UI/Button';
import Modal from '../components/UI/Modal';
import useEdit from '../hooks/use-edit';
import useModal from '../hooks/use-modal';
import * as Styled from '../styles/BHabits.styled';

const BHabitsPage = () => {
  document.title = `bbetter - Bad Habits`;
  const { isShowing: modalIsShowing, toggle: toggleModal } = useModal();
  const { isEditMode: isEdit, toggle: toggleEdit } = useEdit();
  return (
    <Styled.BHabitContent>
      <Styled.BHabitHeader>
        <h1>Bad Habits</h1>
        <Styled.BHabitActions>
          <Button onClick={toggleEdit} className={isEdit && 'active'}>
            <FontAwesomeIcon icon='fa-solid fa-pencil' fixedWidth />
          </Button>
          <Button onClick={toggleModal}>
            <FontAwesomeIcon icon='fa-solid fa-plus' fixedWidth />
          </Button>
        </Styled.BHabitActions>
      </Styled.BHabitHeader>
      <Styled.BHabitList>
        {[...Array(8)].map((_, index) => (
          <BHabitItem key={index} isEdit={isEdit} />
        ))}
      </Styled.BHabitList>
      <Modal isShowing={modalIsShowing} hide={toggleModal} className='add-modal' hasOverlay>
        <BHabitAdd />
      </Modal>
    </Styled.BHabitContent>
  );
};

export default BHabitsPage;
