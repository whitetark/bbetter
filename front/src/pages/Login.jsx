import { useNavigate } from 'react-router-dom';
import PathConstants from '../app/shared/pathConstants';
import { Background, Button, Divider, Logo } from '../components/UI/index';
import { LoginForm } from '../components/index';
import * as Styled from '../styles/Login.styled';

const LoginPage = () => {
  const navigate = useNavigate();
  document.title = `bbetter - Login`;
  return (
    <Styled.Login>
      <Background />
      <Styled.LoginContent>
        <Logo />
        <span>Welcome to bbettr</span>
        <LoginForm />
        <Divider />
        <p>
          New bbettr?{' '}
          <Button onClick={() => navigate(PathConstants.REGISTER)}>Create Account</Button>
        </p>
      </Styled.LoginContent>
    </Styled.Login>
  );
};

export default LoginPage;
