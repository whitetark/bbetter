import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Confirmation, Modal } from '../components/UI/index';
import { ChangePasswordPreview } from '../components/index';
import { useLogout } from '../hooks/use-auth';
import useModal from '../hooks/use-modal';
import * as Styled from '../styles/Settings.styled';

const SettingsPage = () => {
  const { mutateAsync: logout } = useLogout();
  document.title = `bbetter - Settings`;

  const { isShowing: changeIsShowing, toggle: toggleChange } = useModal();
  const { isShowing: deleteIsShowing, toggle: toggleDelete } = useModal();

  const handleLogout = () => {
    async () => await logout();
  };

  return (
    <Styled.Settings>
      <h1>Settings</h1>
      <Styled.SettingsMain>
        <Styled.SettingsActions>
          <Button onClick={toggleChange}>
            <FontAwesomeIcon icon='fa-solid fa-key' />
            Change Password
          </Button>
          <Button onClick={toggleDelete}>
            <FontAwesomeIcon icon='fa-solid fa-right-from-bracket' />
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
    </Styled.Settings>
  );
};

export default SettingsPage;
