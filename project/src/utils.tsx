import { MAX_RATING, PERSENT } from './const';
import { OfferType } from './types/offer-type';

export const getRatingWidth = (rating: number): number => Math.round(rating) / MAX_RATING * PERSENT;

export const capitalizeFirstLetter = (word: string): string => word[0].toUpperCase() + word.slice(1);

export const getCityOffers = (city: string, offers: OfferType[]) => offers.filter((offer) => offer.city.name === city);

export const SortingType = {
  POPULAR: 'Popular',
  PRICE_TO_HIGH: 'Price: low to high',
  PRICE_TO_LOW: 'Price: high to low',
  TOP: 'Top rated first',
};

export const sortOffers = (offers: OfferType[], sortType: string) => {
  switch (sortType) {
    case SortingType.PRICE_TO_HIGH:
      return offers.sort((a, b) => a.price - b.price);
      break;
    case SortingType.PRICE_TO_LOW:
      return offers.sort((a, b) => b.price - a.price);
      break;
    case SortingType.TOP:
      return offers.sort((a, b) => b.rating - a.rating);
      break;
    default:
      return offers;
  }
};
