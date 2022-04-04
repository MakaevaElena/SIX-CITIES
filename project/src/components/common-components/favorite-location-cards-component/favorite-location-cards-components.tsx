import { Link } from 'react-router-dom';

import FavoriteCardComponent from '../favorite-card-component/favorite-card-component';

import { AppRoute } from '../../../const';
import { FavoriteType } from '../../../types/favorite-type';

type FavoriteLocationProps = {
  locationOffers: FavoriteType[],
  city: string;
}

function FavoriteLocationCardsComponent({ locationOffers, city }: FavoriteLocationProps): JSX.Element {
  return (
    <li className="favorites__locations-items">
      <div className="favorites__locations locations locations--current">
        <div className="locations__item">
          <Link className="locations__item-link" to={AppRoute.Main}>
            <span>{city}</span>
          </Link>
        </div>
      </div>
      <div className="favorites__places">
        {locationOffers.map((offer) => {
          const key = `${offer.id}`;
          return <FavoriteCardComponent key={key} favoriteOffer={offer} />;
        })}
      </div>
    </li>
  );
}

export default FavoriteLocationCardsComponent;
