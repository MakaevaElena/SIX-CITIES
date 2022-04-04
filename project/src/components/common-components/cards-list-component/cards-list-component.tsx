import { useCallback } from 'react';

import PlaceCardComponent from '../place-card-component/place-card-component';

import { OfferType } from '../../../types/offer-type';

type CardsListType = {
  offers: OfferType[];
  onPlaceCardHover: (id: number | null) => void,
}

function CardsListComponent({ offers, onPlaceCardHover }: CardsListType): JSX.Element {

  const handleCardActive = useCallback((valueId: number | null) => {
    onPlaceCardHover(valueId);
  }, [onPlaceCardHover]);

  return (
    <div className="cities__places-list places__list tabs__content">
      {
        offers.map((offer) => (
          <PlaceCardComponent
            offer={offer}
            key={offer.id}
            getOfferId={handleCardActive}
          />))
      }
    </div>
  );
}

export default CardsListComponent;
