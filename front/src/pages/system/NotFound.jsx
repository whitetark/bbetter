import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();
  const clickHandler = () => {
    navigate('/');
  };

  return (
    <div>
      <span>404. Not Found</span>
      <button onClick={clickHandler}>Go Back</button>
    </div>
  );
};

export default NotFound;
