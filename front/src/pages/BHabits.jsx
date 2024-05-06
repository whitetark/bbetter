import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Modal } from '../components/UI/index';
import { BHabitAdd, BHabitItem } from '../components/index';
import { useRefetchBHabits } from '../hooks/use-bhabits';
import useModal from '../hooks/use-modal';
import * as Styled from '../styles/BHabits.styled';

const BHabitsPage = () => {
  document.title = `bbetter - Bad Habits`;
  const { isShowing: modalIsShowing, toggle: toggleModal } = useModal();
  const { bhabits, error, isLoading } = useRefetchBHabits();

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
        {bhabits.map((bhabit) => (
          <BHabitItem key={bhabit.bHabitId} data={bhabit} />
        ))}
      </Styled.BHabitList>
      <Modal isShowing={modalIsShowing} hide={toggleModal} className='add-modal' hasOverlay>
        <BHabitAdd hide={toggleModal} />
      </Modal>
    </Styled.BHabitContent>
  );
};

export default BHabitsPage;
