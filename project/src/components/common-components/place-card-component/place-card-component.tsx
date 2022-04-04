import { Link } from 'react-router-dom';
import { useState } from 'react';

import FavoriteButtonComponent from '../favorite-button-component/favorite-button-component';

import { useAppDispatch, useAppSelector } from '../../../hooks';
import { redirectToRoute } from '../../../store/action';
import { toggleFavoriteAction, loadOffersAction, loadFavoriteAction } from '../../../store/api-actions/api-actions';
import { getRatingWidth, capitalizeFirstLetter } from '../../../utils';

import { AppRoute, AuthorizationStatus } from '../../../const';
import { OfferType } from '../../../types/offer-type';

type PlaceCardProps = {
  offer: OfferType;
  getOfferId: (id: number | null) => void;
}

function PlaceCardComponent({ offer, getOfferId }: PlaceCardProps): JSX.Element {
  const authorizationStatus = useAppSelector(({ USER }) => USER.authorizationStatus);
  const [isOfferFavorite, setToggleFavorite] = useState(offer.isFavorite);
  const dispatch = useAppDispatch();
  const postFavoriteFlag = offer.isFavorite ? 0 : 1;

  const handleFavoriteClick = () => {

    if (authorizationStatus !== AuthorizationStatus.Auth) {
      dispatch(redirectToRoute(AppRoute.SignIn));
    }
    dispatch(toggleFavoriteAction({
      id: offer.id,
      flag: postFavoriteFlag,
    }));

    setToggleFavorite(!isOfferFavorite);

    dispatch(loadOffersAction());
    dispatch(loadFavoriteAction());
  };

  return (
    <article
      className="cities__place-card place-card"
      onMouseOver={() => getOfferId(offer.id)}
    >
      {offer.isPremium &&
        <div className="place-card__mark">
          <span>Premium</span>
        </div>}
      <div className="cities__image-wrapper place-card__image-wrapper">
        <Link to={`${AppRoute.Offer}${offer.id}`}>
          <img
            className="place-card__image"
            src={offer.previewImage}
            width="260"
            height="200"
            alt="Place"
          />
        </Link>
      </div>
      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{offer.price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <FavoriteButtonComponent
            isFavorite={offer.isFavorite}
            handleFavoriteButtonClick={handleFavoriteClick}
            isSmall
          />
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{ width: `${getRatingWidth(offer.rating)}%` }}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={`${AppRoute.Offer}${offer.id}`}>{offer.title}</Link>
        </h2>
        <p className="place-card__type">{capitalizeFirstLetter(offer.type)}</p>
      </div>
    </article >
  );
}

export default PlaceCardComponent;
