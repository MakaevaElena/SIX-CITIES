import { useParams } from 'react-router';
import { useState, useEffect } from 'react';

import FavoriteButtonComponent from '../common-components/favorite-button-component/favorite-button-component';
import ReviewListComponent from '../common-components/reviews-list-component/review-list-component';
import ReviewFormComponent from '../common-components/review-form-component/review-form-component';
import HeaderComponent from '../common-components/header-component/header-component';
import NotFoundScreenComponent from '../not-found-screen-component/not-found-screen-component';
import PlaceCardComponent from '../common-components/place-card-component/place-card-component';
import SpinnerComponent from '../common-components/spinner-component/spinner-component';
import MapComponent from '../common-components/map-component/map-component';

import { loadOfferNearbyAction, loadReviewsAction, loadCurrentOfferAction } from '../../store/api-actions/api-actions';
import { toggleFavoriteAction } from '../../store/api-actions/api-actions';
import { redirectToRoute } from '../../store/action';
import { useAppSelector, useAppDispatch } from '../../hooks';
import { getRatingWidth } from '../../utils';

import { AppRoute, AuthorizationStatus, DEFAULT_OFFER_ID } from '../../const';
import { OfferType } from '../../types/offer-type';

function PropertyScreenComponent(): JSX.Element | null {

  const dispatch = useAppDispatch();
  const { id } = useParams<{ id: string }>();
  const currentId = Number(id);

  const authorizationStatus = useAppSelector(({ USER }) => USER.authorizationStatus);
  const currentOffer = useAppSelector(({ DATA }) => DATA.currentOffer);
  const isCurrentOfferLoaded = useAppSelector(({ DATA }) => DATA.isCurrentOfferLoaded);
  const reviews = useAppSelector(({ DATA }) => DATA.reviews);
  const offersNearby = useAppSelector(({ DATA }) => DATA.offersNearby);
  const isAuth = authorizationStatus === AuthorizationStatus.Auth;

  const [activeCardId, setActiveCardId] = useState<number | null>(null);
  const handleCardActive = (valueId: number | null) => setActiveCardId(activeCardId);

  const [isOfferFavorite, setToggleFavorite] = useState(currentOffer.isFavorite);
  const postFavoriteFlag = currentOffer.isFavorite ? 0 : 1;

  useEffect(() => {
    dispatch(loadCurrentOfferAction(currentId));
    dispatch(loadOfferNearbyAction(currentId));
    dispatch(loadReviewsAction(currentId));
  }, [id, dispatch, isOfferFavorite]);

  const handleFavoriteClick = () => {
    if (authorizationStatus !== AuthorizationStatus.Auth) {
      dispatch(redirectToRoute(AppRoute.SignIn));
    }
    dispatch(toggleFavoriteAction({
      id: currentOffer.id,
      flag: postFavoriteFlag,
    }));

    setToggleFavorite(!isOfferFavorite);
  };

  if (isCurrentOfferLoaded === false) {
    return (
      <SpinnerComponent />
    );
  }

  if (currentOffer.id === DEFAULT_OFFER_ID) {
    return <NotFoundScreenComponent />;
  }

  return (
    <>
      {currentOffer !== null && (
        <div className="page">
          <HeaderComponent />
          <main className="page__main page__main--property">
            <section className="property">
              <div className="property__gallery-container container">
                <div className="property__gallery">

                  {currentOffer.images.map((src) => (
                    <div className="property__image-wrapper" key={src}>
                      <img className="property__image" src={src} alt="Shows an incredible place" />
                    </div>
                  ))}

                </div>
              </div>
              <div className="property__container container">
                <div className="property__wrapper">

                  {currentOffer.isPremium && (
                    <div className="property__mark">
                      <span>Premium</span>
                    </div>
                  )}

                  <div className="property__name-wrapper">
                    <h1 className="property__name">
                      Beautiful &amp; luxurious studio at great location
                    </h1>
                    <FavoriteButtonComponent
                      isFavorite={currentOffer.isFavorite}
                      handleFavoriteButtonClick={handleFavoriteClick}
                      isSmall={false}
                    />
                  </div>
                  <div className="property__rating rating">
                    <div className="property__stars rating__stars">
                      <span style={{ width: `${getRatingWidth(currentOffer.rating)}%` }} ></span>
                      <span className="visually-hidden">Rating</span>
                    </div>
                    <span className="property__rating-value rating__value">{ }</span>
                  </div>
                  <ul className="property__features">
                    <li className="property__feature property__feature--entire">
                      {currentOffer.type}
                    </li>
                    <li className="property__feature property__feature--bedrooms">
                      {currentOffer.bedrooms}
                    </li>
                    <li className="property__feature property__feature--adults">
                      {currentOffer.maxAdults}
                    </li>
                  </ul>
                  <div className="property__price">
                    <b className="property__price-value">&euro;{currentOffer.price}</b>
                    <span className="property__price-text">&nbsp;night</span>
                  </div>
                  <div className="property__inside">
                    <h2 className="property__inside-title">What&apos;s inside</h2>
                    <ul className="property__inside-list">

                      {currentOffer.goods.map((itemName) => (
                        <li className="property__inside-item" key={itemName}>
                          {itemName}
                        </li>
                      ))}

                    </ul>
                  </div>
                  <div className="property__host">
                    <h2 className="property__host-title">Meet the host</h2>
                    <div className="property__host-user user">
                      <div className="property__avatar-wrapper property__avatar-wrapper--pro user__avatar-wrapper">
                        <img
                          className="property__avatar user__avatar"
                          src={currentOffer.host.avatarUrl}
                          width="74"
                          height="74"
                          alt="Host avatar"
                        />
                      </div>
                      <span className="property__user-name">
                        {currentOffer.host.name}
                      </span>
                      {currentOffer.host.isPro &&
                        <span className="property__user-status">
                          Pro
                        </span>}
                    </div>
                    {currentOffer.description}
                  </div>
                  <section className="property__reviews reviews">
                    <ReviewListComponent reviews={reviews} />
                    {isAuth && <ReviewFormComponent currentOffer={currentOffer} currentId={id} />}
                  </section>
                </div>
                <section className="property__map map">
                  <MapComponent currentCity={currentOffer.city} offers={[...offersNearby, currentOffer]} selectedOffer={null} />
                </section>
              </div>
            </section>
            <div className="container">
              <section className="near-places places">
                <h2 className="near-places__title">Other places in the neighbourhood</h2>
                <div className="near-places__list places__list">

                  {offersNearby.map((nearOffer: OfferType) => (
                    <PlaceCardComponent
                      key={`nearOffer-${nearOffer.id}`}
                      offer={nearOffer}
                      getOfferId={handleCardActive}
                    />
                  ))}

                </div>
              </section>
            </div>
          </main>
        </div >
      )}
      {
        currentOffer === null && (
          <NotFoundScreenComponent />
        )
      }
    </>
  );
}

export default PropertyScreenComponent;
