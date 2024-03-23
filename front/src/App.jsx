import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useAuthContext } from './app/store/auth-context';
import MaintenancePage from './pages/Maintenance';
import RootLayout from './pages/Root';

function App() {
  const { serverIsOn } = useAuthContext();

  if (!serverIsOn) {
    return <MaintenancePage />;
  }

  return (
    <BrowserRouter basename='/'>
      <Routes>
        <Route path='/' element={<RootLayout />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
