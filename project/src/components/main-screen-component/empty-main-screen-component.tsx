import HeaderComponent from '../common-components/header-component/header-component';
import CityListComponent from '../common-components/city-list-component/city-list-component';

import { useAppSelector } from '../../hooks';

function EmptyMainScreenComponent(): JSX.Element {
  const city = useAppSelector(({ OFFERS }) => OFFERS.city);

  return (
    <div className="page page--gray page--main">
      <HeaderComponent />
      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <CityListComponent />
        </div>
        <div className="cities">

          <div className="cities__places-container cities__places-container--empty container">
            <section className="cities__no-places">
              <div className="cities__status-wrapper tabs__content">
                <b className="cities__status">No places to stay available</b>
                <p className="cities__status-description">We could not find any property available at the moment in {city}
                </p>
              </div>
            </section>
            <div className="cities__right-section"></div>
          </div>

        </div>
      </main>
    </div>
  );
}

export default EmptyMainScreenComponent;
