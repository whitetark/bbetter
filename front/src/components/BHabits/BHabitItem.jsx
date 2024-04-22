import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ProgressBar from '@ramonak/react-progress-bar';
import React, { useState } from 'react';
import * as variables from '../../app/shared/colorVariables';
import useModal from '../../hooks/use-modal';
import * as Styled from '../../styles/BHabits.styled';
import Button from '../UI/Button';
import Confirmation from '../UI/Confirmation';
import Modal from '../UI/Modal';
import BHabitEdit from './BHabitEdit';

const BHabitItem = ({ isEdit }) => {
  const [number, setNumber] = useState(29.1);
  const { isShowing: editIsShowing, toggle: toggleEdit } = useModal();
  const { isShowing: deleteIsShowing, toggle: toggleDelete } = useModal();

  return (
    <>
      <Styled.BHabitItem>
        <Styled.BHabitItemHeader>
          <div className='title'>Smoking</div>
          {isEdit && (
            <Styled.BHabitItemActions>
              <Button onClick={toggleEdit}>
                <FontAwesomeIcon icon='fa-solid fa-pencil' fixedWidth />
              </Button>
              <Button onClick={toggleDelete}>
                <FontAwesomeIcon icon='fa-solid fa-trash-can' fixedWidth />
              </Button>
            </Styled.BHabitItemActions>
          )}
        </Styled.BHabitItemHeader>
        <div className='item-content'>
          <div className='time-content'>
            <div className='time'>Abstinence Time</div>
            <span>1d 22h 36m 53s</span>
          </div>
          <div className='perc'>{number}%</div>
        </div>
        <div className='progress-content'>
          <span>1 week</span>
          <ProgressBar
            completed={number}
            maxCompleted={100}
            bgColor={variables.GREEN}
            baseBgColor={variables.WHITE}
            isLabelVisible={false}
            animateOnRender={true}
          />
        </div>
      </Styled.BHabitItem>
      <Modal isShowing={editIsShowing} hide={toggleEdit} className='add-modal' hasOverlay>
        <BHabitEdit />
      </Modal>
      <Modal isShowing={deleteIsShowing} hide={toggleDelete} className='add-modal' hasOverlay>
        <Confirmation hide={toggleDelete} />
      </Modal>
    </>
  );
};

export default BHabitItem;
