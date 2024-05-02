import { useNavigate } from 'react-router-dom';
import PathConstants from '../app/shared/pathConstants';
import { Background, Button, Divider, Logo } from '../components/UI/index';
import { RegisterForm } from '../components/index';
import * as Styled from '../styles/Login.styled';

const RegisterPage = () => {
  const navigate = useNavigate();
  document.title = `bbetter - Register`;
  return (
    <Styled.Login>
      <Background />
      <Styled.LoginContent>
        <Logo />
        <span>Welcome to bbettr</span>
        <RegisterForm />
        <Divider />
        <p>
          Already a bbettr?{' '}
          <Button onClick={() => navigate(PathConstants.LOGIN)}>Sign in your Account</Button>
        </p>
      </Styled.LoginContent>
    </Styled.Login>
  );
};

export default RegisterPage;
