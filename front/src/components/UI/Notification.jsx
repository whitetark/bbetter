import { Alert, Snackbar } from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import { getRandomBHabitPhrase, getRandomGHabitPhrase } from '../../app/shared/phases';

const Notification = ({ open, onClose, severity, type }) => {
  const [message, setMessage] = useState('Thats a Step!');
  const initialMessage = useRef(null);

  if (!initialMessage.current) {
    switch (type) {
      case 'ghabitAdd':
        initialMessage.current = getRandomGHabitPhrase();
        break;

      case 'bhabitAdd':
        initialMessage.current = getRandomBHabitPhrase();
        break;

      default:
        initialMessage.current = 'What is this snackbar for? O.O';
        break;
    }
  }

  useEffect(() => {
    if (open) {
      setMessage(initialMessage.current);
    }
  }, [open]);

  return (
    <>
      <Snackbar open={open} autoHideDuration={3000} onClose={onClose}>
        <Alert onClose={onClose} severity={severity} sx={{ width: '100%', fontSize: 20 }}>
          {message}
        </Alert>
      </Snackbar>
    </>
  );
};
export default Notification;
