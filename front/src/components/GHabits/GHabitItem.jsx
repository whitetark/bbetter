import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import useModal from '../../hooks/use-modal';
import * as Styled from '../../styles/GHabits.styled';
import Button from '../UI/Button';
import Confirmation from '../UI/Confirmation';
import Modal from '../UI/Modal';
import Checklist from './Checklist';
import EditGHabit from './EditGHabit';

const GHabitItem = ({ isEdit }) => {
  const [isChecked, setIsChecked] = useState(false);

  const { isShowing: editIsShowing, toggle: toggleEdit } = useModal();
  const { isShowing: deleteIsShowing, toggle: toggleDelete } = useModal();

  const handleCheckList = (value) => {
    setIsChecked(value);
  };

  return (
    <>
      <Styled.GHabitItem className={isChecked ? 'checked' : ''}>
        <div className='number'>1</div>
        <div>content</div>
        <Checklist onChange={handleCheckList} />
        <Styled.GHabitItemActions>
          {isEdit && (
            <>
              <Button onClick={toggleEdit}>
                <FontAwesomeIcon icon='fa-solid fa-pencil' fixedWidth />
              </Button>
              <Button onClick={toggleDelete}>
                <FontAwesomeIcon icon='fa-solid fa-trash-can' fixedWidth />
              </Button>
            </>
          )}
        </Styled.GHabitItemActions>
      </Styled.GHabitItem>
      <Modal isShowing={editIsShowing} hide={toggleEdit} className='task-modal' hasOverlay>
        <EditGHabit />
      </Modal>
      <Modal isShowing={deleteIsShowing} hide={toggleDelete} className='task-modal' hasOverlay>
        <Confirmation hide={toggleDelete} />
      </Modal>
    </>
  );
};

export default GHabitItem;
