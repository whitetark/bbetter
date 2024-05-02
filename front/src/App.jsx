import { library } from '@fortawesome/fontawesome-svg-core';
import { faFaceFrownOpen, faFaceGrinBeam } from '@fortawesome/free-regular-svg-icons';
import {
  faArrowLeft,
  faDrum,
  faGear,
  faHouse,
  faList,
  faListCheck,
  faPenToSquare,
  faPencil,
  faPlus,
  faQuoteLeft,
  faTrashCan,
} from '@fortawesome/free-solid-svg-icons';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import ProtectedRoute from './app/shared/ProtectedRoute';
import PathConstants from './app/shared/pathConstants';
import { useAuthContext } from './app/store/auth-context';
import { QuoteContextProvider } from './app/store/quote-context';
import {
  AppLayout,
  BHabitsPage,
  BasePage,
  GHabitsPage,
  HomePage,
  LoginPage,
  NotFound,
  QuotesPage,
  RegisterPage,
  RootLayout,
  SettingsPage,
  TaskLayout,
  TaskListPage,
  TasksPage,
  WishLayout,
  WishListPage,
  WishesPage,
} from './pages/index';

library.add(
  faHouse,
  faListCheck,
  faFaceGrinBeam,
  faFaceFrownOpen,
  faPencil,
  faGear,
  faDrum,
  faQuoteLeft,
  faPenToSquare,
  faPlus,
  faList,
  faArrowLeft,
  faTrashCan,
);

function App() {
  const { userData } = useAuthContext();

  // if (!serverIsOn) {
  //   return <MaintenancePage />;
  // }

  return (
    <BrowserRouter basename='/'>
      <Routes>
        <Route path='/' element={<RootLayout />}>
          <Route index element={<BasePage />} />
          <Route
            path={PathConstants.LOGIN}
            element={!userData ? <LoginPage /> : <Navigate replace to={PathConstants.BASE} />}
          />
          <Route
            path={PathConstants.REGISTER}
            element={!userData ? <RegisterPage /> : <Navigate replace to={PathConstants.BASE} />}
          />
          <Route
            path={PathConstants.HOME}
            element={
              <ProtectedRoute>
                <AppLayout />
              </ProtectedRoute>
            }>
            <Route index element={<HomePage />} />
            <Route path={PathConstants.TASK} element={<TaskLayout />}>
              <Route index element={<TasksPage />} />
              <Route path={PathConstants.TASK_LIST} element={<TaskListPage />} />
            </Route>
            <Route path={PathConstants.WISH} element={<WishLayout />}>
              <Route index element={<WishesPage />} />
              <Route path={PathConstants.WISH_LIST} element={<WishListPage />} />
            </Route>
            <Route path={PathConstants.GHABITS} element={<GHabitsPage />} />
            <Route path={PathConstants.BHABITS} element={<BHabitsPage />} />
            <Route path={PathConstants.SETTINGS} element={<SettingsPage />} />
            <Route
              path={PathConstants.QUOTE}
              element={
                <QuoteContextProvider>
                  <QuotesPage />
                </QuoteContextProvider>
              }
            />
          </Route>
          <Route path='*' element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
