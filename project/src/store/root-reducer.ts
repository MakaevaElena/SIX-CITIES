import { combineReducers } from '@reduxjs/toolkit';
import { NameSpace } from '../const';
import { offersData } from '../store/offers-data/offers-data';
import { offersProcess } from './offers-process/offers-process';
import { userProcess } from './user-process/user-process';

export const rootReducer = combineReducers({
  [NameSpace.data]: offersData.reducer,
  [NameSpace.offers]: offersProcess.reducer,
  [NameSpace.user]: userProcess.reducer,
});
