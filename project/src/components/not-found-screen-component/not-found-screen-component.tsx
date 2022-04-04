import { Link } from 'react-router-dom';

import HeaderComponent from '../common-components/header-component/header-component';

import { AppRoute } from '../../const';
import './not-found-screen-component.css';

function NotFoundScreenComponent(): JSX.Element {
  return (
    <div className="page page--gray page--main">
      <HeaderComponent />
      <main className="page__main">
        <div className="not-found-wrapper">
          <span className="not-found-status">404</span>
          <h1>Page not found</h1>
          <Link to={AppRoute.Main}>Back to main page</Link>
        </div>
      </main >
    </div >
  );
}

export default NotFoundScreenComponent;
