import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faFaceFrownOpen,
  faFaceGrinBeam,
  faFaceSmile,
  faStar,
} from '@fortawesome/free-regular-svg-icons';
import {
  faArrowLeft,
  faArrowRight,
  faBars,
  faCheckToSlot,
  faDrum,
  faDumbbell,
  faFire,
  faGear,
  faHouse,
  faKey,
  faList,
  faListCheck,
  faMedal,
  faPenToSquare,
  faPencil,
  faPersonDigging,
  faPlus,
  faQuoteLeft,
  faRightFromBracket,
  faStar as faStarSolid,
  faToggleOn,
  faTrashCan,
} from '@fortawesome/free-solid-svg-icons';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ProtectedRoute from './app/shared/ProtectedRoute';
import PathConstants from './app/shared/pathConstants';
import {
  AppLayout,
  BHabitsPage,
  BasePage,
  GHabitsPage,
  HomePage,
  LoginPage,
  NotFound,
  QuotesPage,
  ReflectionsPage,
  RegisterPage,
  RootLayout,
  SettingsPage,
  TaskListPage,
  TasksPage,
  WishListPage,
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
  faRightFromBracket,
  faKey,
  faStar,
  faStarSolid,
  faFaceSmile,
  faPersonDigging,
  faCheckToSlot,
  faToggleOn,
  faArrowLeft,
  faArrowRight,
  faMedal,
  faDumbbell,
  faFire,
  faBars,
);

function App() {
  return (
    <BrowserRouter basename='/'>
      <Routes>
        <Route path='/' element={<RootLayout />}>
          <Route index element={<BasePage />} />
          <Route path={PathConstants.LOGIN} element={<LoginPage />} />
          <Route path={PathConstants.REGISTER} element={<RegisterPage />} />
          <Route
            path={PathConstants.HOME}
            element={
              <ProtectedRoute>
                <AppLayout />
              </ProtectedRoute>
            }>
            <Route index element={<HomePage />} />
            <Route path={PathConstants.TASK}>
              <Route index element={<TasksPage />} />
              <Route path={PathConstants.TASK_LIST} element={<TaskListPage />} />
            </Route>
            <Route path={PathConstants.WISH_LIST} element={<WishListPage />} />
            <Route path={PathConstants.GHABITS} element={<GHabitsPage />} />
            <Route path={PathConstants.BHABITS} element={<BHabitsPage />} />
            <Route path={PathConstants.SETTINGS} element={<SettingsPage />} />
            <Route path={PathConstants.REFLECTIONS} element={<ReflectionsPage />} />
            <Route path={PathConstants.QUOTE} element={<QuotesPage />} />
          </Route>
          <Route path='*' element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
