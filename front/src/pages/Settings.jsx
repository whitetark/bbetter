import React from 'react';
import ChangePasswordPreview from '../components/Settings/ChangePasswordPreview';
import Button from '../components/UI/Button';
import Modal from '../components/UI/Modal';
import { useLogout } from '../hooks/use-auth';
import useModal from '../hooks/use-modal';

const SettingsPage = () => {
  const { mutateAsync: logout } = useLogout();
  document.title = `bbetter - Settings`;

  const { isShowing: modalIsShowing, toggle: toggleModal } = useModal();
  return (
    <>
      <div>
        <div>
          <Button onClick={async () => await logout()}>Log out</Button>
        </div>
        <div>
          <Button onClick={toggleModal}>Change Password</Button>
        </div>
      </div>
      <Modal isShowing={modalIsShowing} hide={toggleModal} className='task-modal' hasOverlay>
        <ChangePasswordPreview />
      </Modal>
    </>
  );
};

export default SettingsPage;
