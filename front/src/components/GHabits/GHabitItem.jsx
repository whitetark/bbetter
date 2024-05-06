import React, { useState } from 'react';
import { useDeleteGHabit } from '../../hooks/use-ghabits';
import useModal from '../../hooks/use-modal';
import * as Styled from '../../styles/GHabits.styled';
import Confirmation from '../UI/Confirmation';
import Modal from '../UI/Modal';
import Checklist from './Checklist';
import GHabitEdit from './GHabitEdit';
import GHabitView from './GHabitView';

const GHabitItem = ({ data }) => {
  const [isChecked, setIsChecked] = useState(false);

  const { isShowing: viewIsShowing, toggle: toggleView } = useModal();
  const { isShowing: editIsShowing, toggle: toggleEdit } = useModal();
  const { isShowing: deleteIsShowing, toggle: toggleDelete } = useModal();
  const { mutateAsync } = useDeleteGHabit();

  const handleCheckList = (value) => {
    setIsChecked(value);
  };

  const viewProps = {
    editIsShowing,
    toggleEdit,
    deleteIsShowing,
    toggleDelete,
  };

  const requestBody = {
    Id: data.gHabitId,
  };

  const handleDelete = () => {
    mutateAsync(requestBody).then(toggleDelete());
  };

  return (
    <>
      <Styled.GHabitItem className={isChecked ? 'checked' : ''} onClick={toggleView}>
        <Styled.GHabitItemPart>
          <span className='number'>1</span>
        </Styled.GHabitItemPart>
        <Styled.GHabitItemPart>
          <p>{data.content}</p>
        </Styled.GHabitItemPart>
        <Checklist onChange={handleCheckList} className='checklist' />
      </Styled.GHabitItem>
      <Modal isShowing={viewIsShowing} hide={toggleView} className='task-modal' hasOverlay>
        <GHabitView data={data} {...viewProps} />
      </Modal>
      <Modal isShowing={editIsShowing} hide={toggleEdit} className='add-modal'>
        <GHabitEdit data={data} hide={toggleEdit} />
      </Modal>
      <Modal isShowing={deleteIsShowing} hide={toggleDelete} className='add-modal'>
        <Confirmation hide={toggleDelete} onDelete={handleDelete} />
      </Modal>
    </>
  );
};

export default GHabitItem;
