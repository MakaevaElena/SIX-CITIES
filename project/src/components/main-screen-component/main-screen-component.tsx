import { useState } from 'react';

import CityListComponent from '../common-components/city-list-component/city-list-component';
import CardsListComponent from '../common-components/cards-list-component/cards-list-component';
import EmptyMainScreenComponent from './empty-main-screen-component';
import HeaderComponent from '../common-components/header-component/header-component';
import MapComponent from '../common-components/map-component/map-component';
import SortingComponent from '../common-components/sorting-component/sorting-component';

import { useAppSelector } from '../../hooks';
import { getCityOffers, sortOffers } from '../../utils';

function MainScreenComponent(): JSX.Element {
  const [selectedOfferId, setSelectedOffer] = useState<number | null>(null);

  const offers = useAppSelector(({ DATA }) => DATA.offers);
  const currentCity = useAppSelector(({ OFFERS }) => OFFERS.city);
  const currentSortType = useAppSelector(({ OFFERS }) => OFFERS.sortType);
  const filteredOffers = getCityOffers(currentCity, offers);
  const sortedOffers = sortOffers(filteredOffers, currentSortType);
  const getActiveOfferId = (id: number | null) => setSelectedOffer(id);

  return (
    <>
      {filteredOffers.length > 0 && (
        <div className="page page--gray page--main">
          <HeaderComponent />
          <main className="page__main page__main--index">
            <h1 className="visually-hidden">Cities</h1>
            <div className="tabs">
              <CityListComponent />
            </div>
            <div className="cities">
              <div className="cities__places-container container">
                <section className="cities__places places">
                  <h2 className="visually-hidden">Places</h2>
                  <b className="places__found">{sortedOffers.length} places to stay in {currentCity}</b>
                  <SortingComponent />
                  <CardsListComponent offers={sortedOffers} onPlaceCardHover={getActiveOfferId} />
                </section>
                <div className="cities__right-section">
                  <section className="cities__map map">
                    <MapComponent currentCity={filteredOffers[0].city} offers={filteredOffers} selectedOffer={selectedOfferId} />
                  </section>
                </div>
              </div>
            </div>
          </main>
        </div>
      )}
      {
        !filteredOffers && <EmptyMainScreenComponent />
      }
    </>
  );
}

export default MainScreenComponent;
