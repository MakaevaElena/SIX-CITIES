import { configureStore } from '@reduxjs/toolkit';

import { rootReducer } from './root-reducer';
import { createAPI } from '../services/api';
import { redirect } from './middleware/redirect';

const api = createAPI();

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    thunk: {
      extraArgument: api,
    },
  }).concat(redirect),
});

export { store, api };
