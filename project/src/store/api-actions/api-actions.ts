import { createAsyncThunk } from '@reduxjs/toolkit';

import { api, store } from '../index';
import { loadOffers, loadFavorites, loadOffersNearby, loadReviews, loadCurrentOffer } from '../offers-data/offers-data';
import { requireAuthorization } from '../user-process/user-process';
import { redirectToRoute } from '../action';
import { saveToken, dropToken } from '../../services/token';
import { errorHandle } from '../../services/error-handle';

import { APIRoute, AuthorizationStatus, AppRoute } from '../../const';
import { AuthData } from '../../types/auth-data';
import { UserData } from '../../types/user-data';
import { OfferType, FavoriteFlagType } from '../../types/offer-type';
import { ReviewType, ReviewWithIdType } from '../../types/review-type';

export const loadOffersAction = createAsyncThunk(
  'data/loadOffers',
  async () => {
    try {
      const { data } = await api.get<OfferType[]>(APIRoute.Offers);
      store.dispatch(loadOffers(data));
    } catch (error) {
      errorHandle(error);
    }
  },
);

export const loadCurrentOfferAction = createAsyncThunk(
  'data/loadCurrentOffer',
  async (id: number) => {
    try {
      const { data } = await api.get<OfferType>(`${APIRoute.Offers}/${id}`);
      store.dispatch(loadCurrentOffer(data));
    } catch (error) {
      errorHandle(error);
    }
  },
);

export const loadFavoriteAction = createAsyncThunk(
  'data/favorite',
  async () => {
    try {
      const { data } = await api.get<OfferType[]>(APIRoute.Favorite);
      store.dispatch(loadFavorites(data));
    } catch (error) {
      errorHandle(error);
    }
  },
);

export const toggleFavoriteAction = createAsyncThunk(
  'data/toggleFavorite',
  async ({ id, flag }: FavoriteFlagType) => {
    try {
      await api.post<OfferType[]>(`${APIRoute.Favorite}/${id}/${flag}`);
      store.dispatch(loadFavoriteAction());
    } catch (error) {
      errorHandle(error);
    }
  },
);

export const checkAuthAction = createAsyncThunk(
  'user/checkAuth',
  async () => {
    try {
      await api.get(APIRoute.Login);
      store.dispatch(requireAuthorization(AuthorizationStatus.Auth));
    } catch (error) {
      errorHandle(error);
      store.dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
    }
  },
);

export const loginAction = createAsyncThunk(
  'user/login',
  async ({ login: email, password }: AuthData) => {
    try {
      const { data: { token } } = await api.post<UserData>(APIRoute.Login, { email, password });
      saveToken(token);
      store.dispatch(requireAuthorization(AuthorizationStatus.Auth));
      store.dispatch(redirectToRoute(AppRoute.Main));
    } catch (error) {
      errorHandle(error);
      store.dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
    }
  },
);

export const logoutAction = createAsyncThunk(
  'user/logout',
  async () => {
    try {
      await api.delete(APIRoute.Logout);
      dropToken();
      store.dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
    } catch (error) {
      errorHandle(error);
    }
  },
);

export const loadOfferNearbyAction = createAsyncThunk(
  'data/loadOffersNearby',
  async (id: number) => {
    try {
      const { data } = await api.get<OfferType[]>(`${APIRoute.Offers}/${id}/nearby`);
      store.dispatch(loadOffersNearby(data));
    } catch (error) {
      errorHandle(error);
    }
  },
);

export const loadReviewsAction = createAsyncThunk(
  'data/loadReviews',
  async (id: number) => {
    try {
      const { data } = await api.get<ReviewType[]>(`${APIRoute.Reviews}/${id}`);
      store.dispatch(loadReviews(data));
    } catch (error) {
      errorHandle(error);
    }
  },
);

export const postReviewAction = createAsyncThunk(
  'user/postReview',
  async ({ comment, rating, id }: ReviewWithIdType) => {
    try {
      const { data } = await api.post<ReviewType[]>(`${APIRoute.Reviews}/${id}`, { comment, rating });
      store.dispatch(loadReviews(data));
    } catch (error) {
      errorHandle(error);
    }
  },
);

