import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Modal } from '../components/UI/index';
import { GHabitAdd, GHabitItem } from '../components/index';
import useModal from '../hooks/use-modal';
import * as Styled from '../styles/GHabits.styled';

const GHabitsPage = () => {
  document.title = `bbetter - Good Habits`;
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
          <div></div>
        </Styled.GHabitTableHeader>
        {[...Array(1)].map((_, index) => (
          <GHabitItem key={index} />
        ))}
      </Styled.GHabitList>
      <Modal isShowing={modalIsShowing} hide={toggleModal} className='add-modal' hasOverlay>
        <GHabitAdd />
      </Modal>
    </Styled.GHabitContent>
  );
};

export default GHabitsPage;
