import React, { useState } from 'react';
import { useDeleteBHabit } from '../../hooks/use-bhabits';
import useModal from '../../hooks/use-modal';
import * as Styled from '../../styles/BHabits.styled';
import Confirmation from '../UI/Confirmation';
import Modal from '../UI/Modal';
import BHabitClock from './BHabitClock';
import BHabitEdit from './BHabitEdit';
import BHabitProgress from './BHabitProgress';
import BHabitView from './BHabitView';

const BHabitItem = ({ data }) => {
  const [number, setNumber] = useState(29.1);
  const [timeDiff, setTimeDiff] = useState(0);
  const [limit, setLimit] = useState('1d');

  const { isShowing: editIsShowing, toggle: toggleEdit } = useModal();
  const { isShowing: deleteIsShowing, toggle: toggleDelete } = useModal();
  const { isShowing: viewIsShowing, toggle: toggleView } = useModal();
  const { mutateAsync: deleteAsync } = useDeleteBHabit();

  const viewProps = {
    editIsShowing,
    toggleEdit,
    deleteIsShowing,
    toggleDelete,
  };

  const requestBody = {
    Id: data.bHabitId,
  };

  const handleDelete = () => {
    deleteAsync(requestBody).then(toggleDelete());
  };

  return (
    <>
      <Styled.BHabitItem onClick={toggleView}>
        <Styled.BHabitItemHeader>
          <div className='title'>{data.content}</div>
        </Styled.BHabitItemHeader>
        <div className='item-content'>
          <div className='time-content'>
            <div className='time'>Abstinence Time</div>
            <span>
              <BHabitClock
                issueDate={data.issueDate}
                timeDiff={timeDiff}
                setTimeDiff={setTimeDiff}
              />
            </span>
          </div>
          <div className='perc'>{number}%</div>
        </div>
        <BHabitProgress
          number={number}
          timeDiff={timeDiff}
          setNumber={setNumber}
          limit={limit}
          setLimit={setLimit}
        />
      </Styled.BHabitItem>
      <Modal isShowing={viewIsShowing} hide={toggleView} className='task-modal' hasOverlay>
        <BHabitView data={data} {...viewProps} number={number} limit={limit} timerDiff={timeDiff} />
      </Modal>
      <Modal isShowing={editIsShowing} hide={toggleEdit} className='add-modal'>
        <BHabitEdit data={data} hide={toggleEdit} />
      </Modal>
      <Modal isShowing={deleteIsShowing} hide={toggleDelete} className='add-modal'>
        <Confirmation hide={toggleDelete} onDelete={handleDelete} />
      </Modal>
    </>
  );
};

export default BHabitItem;
