import FavoriteLocationCardsComponent from '../favorite-location-cards-component/favorite-location-cards-components';

import { FavoriteType } from '../../../types/favorite-type';

type FavoriteListProps = {
  favorites: FavoriteType[];
}

const mapOffersToCity = (arr: FavoriteType[]) =>
  arr.reduce<{ [key: string]: FavoriteType[] }>((acc, offer) => {
    if (!acc[offer.city.name]) {
      acc[offer.city.name] = [];
    }

    acc[offer.city.name].push(offer);
    return acc;
  }, {});

function FavoriteListComponent({ favorites }: FavoriteListProps): JSX.Element {
  const favoriteOffersByCities = mapOffersToCity(favorites);

  return (
    <section className="favorites">
      <h1 className="favorites__title">Saved listing</h1>
      <ul className="favorites__list">

        {Object.keys(favoriteOffersByCities).map((city) => (
          <FavoriteLocationCardsComponent
            key={city}
            city={city}
            locationOffers={favoriteOffersByCities[city]}
          />
        ))}
      </ul>
    </section>
  );
}

export default FavoriteListComponent;
