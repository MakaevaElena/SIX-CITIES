import { OfferType } from './types/offer-type';

export enum AppRoute {
  Main = '/',
  SignIn = '/login',
  Favorites = '/favorites',
  Room = '/offer/:id',
  Offer = '/offer/',
}

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}

export enum APIRoute {
  Offers = '/hotels',
  Favorite = '/favorite',
  Reviews = '/comments',
  Login = '/login',
  Logout = '/logout'
}

export enum HTTP_CODE {
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  NOT_FOUND = 404,
}

export enum RatingName {
  'Terribly',
  'Badly',
  'Not bad',
  'Good',
  'Perfect',
}

export enum NameSpace {
  data = 'DATA',
  offers = 'OFFERS',
  user = 'USER',
}

export const Messages = {
  AUTH_FAIL: 'Please enter valid email and password',
  AUTH_INFO: 'Don\'t forget to sign in',
  FAVORITE_NO_AUTH: 'You are not logged in',
  REVIEW_POST_ERROR: 'Review sending failed',
  OFFER_LOADING_ERROR: 'Offers loading failed',
};

export const MAX_RATING = 5;
export const RATING_VALUES = [5, 4, 3, 2, 1];
export const PERSENT = 100;
export const CITIES = ['Paris', 'Cologne', 'Brussels', 'Amsterdam', 'Hamburg', 'Dusseldorf'];

export const DEFAULT_OFFER_ID = -1;
export const DEFAULT_OFFER: OfferType = {
  'city': {
    'name': 'Dusseldorf',
    'location': {
      'latitude': 0,
      'longitude': 0,
      'zoom': 0,
    },
  },
  'previewImage': '',
  'images': [],
  'title': '',
  'isFavorite': false,
  'isPremium': false,
  'rating': 0,
  'type': 'house',
  'bedrooms': 0,
  'maxAdults': 0,
  'price': 0,
  'goods': [],
  'host': {
    'id': 0,
    'name': '',
    'isPro': false,
    'avatarUrl': '',
  },
  'description': '',
  'location': {
    'latitude': 0,
    'longitude': 0,
    'zoom': 0,
  },
  'id': DEFAULT_OFFER_ID,
};
