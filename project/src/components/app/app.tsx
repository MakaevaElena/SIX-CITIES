import { Route, Routes } from 'react-router-dom';

import HistoryRouter from '../../components/history-route/history-route';
import LoginScreenComponent from '../login-screen-component/login-screen-component';
import MainScreenComponent from '../main-screen-component/main-screen-component';
import NotFoundScreenComponent from '../not-found-screen-component/not-found-screen-component';
import FavoritesScreenComponent from '../favorites-screen-component/favorites-screen-component';
import PropertyScreenComponent from '../property-screen-component/property-screen-component';
import PrivateRoute from '../private-route/private-route';
import SpinnerComponent from '../common-components/spinner-component/spinner-component';

import { useAppSelector } from '../../hooks';
import browserHistory from '../../browser-history';
import { AppRoute, AuthorizationStatus } from '../../const';

const isCheckedAuth = (authorizationStatus: AuthorizationStatus): boolean =>
  authorizationStatus === AuthorizationStatus.Unknown;

function App(): JSX.Element {

  const authorizationStatus = useAppSelector(({ USER }) => USER.authorizationStatus);
  const isOffersLoaded = useAppSelector(({ DATA }) => DATA.isOffersLoaded);

  if (isCheckedAuth(authorizationStatus) || !isOffersLoaded) {
    return (
      <SpinnerComponent />
    );
  }

  return (
    <HistoryRouter history={browserHistory}>
      <Routes>
        <Route
          path={AppRoute.Main}
          element={<MainScreenComponent />}
        />
        <Route
          path={AppRoute.SignIn}
          element={<LoginScreenComponent />}
        />
        <Route
          path={AppRoute.Favorites}
          element={
            <PrivateRoute
              authorizationStatus={authorizationStatus}
            >
              <FavoritesScreenComponent />
            </PrivateRoute>
          }
        />
        <Route
          path={AppRoute.Room}
          element={<PropertyScreenComponent />}
        />
        <Route
          path="*"
          element={<NotFoundScreenComponent />}
        />

      </Routes>
    </HistoryRouter>
  );
}

export default App;
