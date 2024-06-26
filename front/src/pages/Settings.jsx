import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from 'react-router-dom';
import ChangeHomeQuote from '../components/Settings/ChangeHomeQuote';
import { Button, Confirmation, Modal } from '../components/UI/index';
import { ChangePasswordPreview } from '../components/index';
import { useLogout } from '../hooks/use-auth';
import useModal from '../hooks/use-modal';
import * as Styled from '../styles/Settings.styled';

const SettingsPage = () => {
  const { mutateAsync: logout } = useLogout();
  const navigate = useNavigate();
  document.title = `bbetter - Settings`;

  const { isShowing: changeIsShowing, toggle: toggleChange } = useModal();
  const { isShowing: quoteIsShowing, toggle: toggleQuote } = useModal();
  const { isShowing: deleteIsShowing, toggle: toggleDelete } = useModal();

  const handleLogout = async () => {
    await logout();
  };

  return (
    <Styled.Settings>
      <h1>Settings</h1>
      <Styled.SettingsMain>
        <Styled.SettingsActions>
          <Button onClick={toggleChange}>
            <FontAwesomeIcon icon='fa-solid fa-key' fixedWidth />
            Change Password
          </Button>
          <Button onClick={toggleQuote}>
            <FontAwesomeIcon icon='fa-solid fa-toggle-on' fixedWidth />
            Change Home Quote
          </Button>
          <Button onClick={toggleDelete}>
            <FontAwesomeIcon icon='fa-solid fa-right-from-bracket' fixedWidth />
            Log out
          </Button>
        </Styled.SettingsActions>
      </Styled.SettingsMain>
      <Modal isShowing={changeIsShowing} hide={toggleChange} className='task-modal' hasOverlay>
        <ChangePasswordPreview hide={toggleChange} />
      </Modal>
      <Modal isShowing={deleteIsShowing} hide={toggleDelete} className='task-modal' hasOverlay>
        <Confirmation hide={toggleDelete} onDelete={handleLogout} isLogout />
      </Modal>
      <Modal isShowing={quoteIsShowing} hide={toggleQuote} className='task-modal' hasOverlay>
        <ChangeHomeQuote hide={toggleQuote} />
      </Modal>
    </Styled.Settings>
  );
};

export default SettingsPage;
