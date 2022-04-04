import { createSlice } from '@reduxjs/toolkit';

import { SortingType } from '../../utils';
import { CITIES, NameSpace } from '../../const';

const initialState = {
  city: CITIES[0],
  offerId: 0,
  sortType: SortingType.POPULAR,
};

const offersProcess = createSlice({
  name: NameSpace.offers,
  initialState,
  reducers: {
    setCity: (state, action) => {
      state.city = action.payload;
    },
    getOfferId: (state, action) => {
      state.offerId = action.payload;
    },
    setSortType: (state, action) => {
      state.sortType = action.payload;
    },
  },
});

const { setCity, getOfferId, setSortType } = offersProcess.actions;

export { offersProcess, setCity, getOfferId, setSortType };
