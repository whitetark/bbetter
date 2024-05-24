import { Alert, Snackbar } from '@mui/material';
import { useEffect, useState } from 'react';
import { getRandomBHabitPhrase, getRandomGHabitPhrase } from '../../app/shared/phases';

const Notification = ({ open, onClose, severity, type }) => {
  const [message, setMessage] = useState('What is this snackbar for? O.O');

  let temp;

  switch (type) {
    case 'ghabitAdd':
      temp = getRandomGHabitPhrase();
      break;

    case 'bhabitAdd':
      temp = getRandomBHabitPhrase();
      break;

    default:
      temp = 'What is this snackbar for? O.O';
      break;
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      setMessage(temp);
    }, 3500);

    return () => clearTimeout(timer);
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
