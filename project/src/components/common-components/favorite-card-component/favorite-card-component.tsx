import { Link } from 'react-router-dom';

import FavoriteButtonComponent from '../favorite-button-component/favorite-button-component';

import { toggleFavoriteAction, loadOffersAction } from '../../../store/api-actions/api-actions';
import { getRatingWidth, capitalizeFirstLetter } from '../../../utils';
import { useAppDispatch } from '../../../hooks';

import { AppRoute } from '../../../const';
import { FavoriteType } from '../../../types/favorite-type';

type FavoriteCardProps = {
  favoriteOffer: FavoriteType,
}

function FavoriteCardComponent({ favoriteOffer }: FavoriteCardProps): JSX.Element {

  const dispatch = useAppDispatch();

  const handleFavoriteClick = () => {
    dispatch(toggleFavoriteAction({
      id: favoriteOffer.id,
      flag: 0,
    }));

    dispatch(loadOffersAction());
  };

  return (
    <article className="favorites__card place-card">
      {favoriteOffer.isPremium && (
        <div className="place-card__mark">
          <span>Premium</span>
        </div>)}
      <div className="favorites__image-wrapper place-card__image-wrapper">
        <Link to={`${AppRoute.Offer}${favoriteOffer.id}`}>
          <img className="place-card__image" src={favoriteOffer.previewImage} width="150" height="110" alt="Place" />
        </Link>
      </div>
      <div className="favorites__card-info place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{favoriteOffer.price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <FavoriteButtonComponent
            isFavorite={favoriteOffer.isFavorite}
            handleFavoriteButtonClick={handleFavoriteClick}
            isSmall
          />
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{ width: `${getRatingWidth(favoriteOffer.rating)}%` }}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={`${AppRoute.Offer}${favoriteOffer.id}`}>{favoriteOffer.title}</Link>
        </h2>
        <p className="place-card__type">{capitalizeFirstLetter(favoriteOffer.type)}</p>
      </div>
    </article>
  );
}

export default FavoriteCardComponent;
