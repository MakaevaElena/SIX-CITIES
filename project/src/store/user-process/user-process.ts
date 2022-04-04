import { createSlice } from '@reduxjs/toolkit';

import { AuthorizationStatus, NameSpace } from '../../const';

const initialState = {
  authorizationStatus: AuthorizationStatus.Unknown,
  login: '',
  avatarUrl: '',
};

const userProcess = createSlice({
  name: NameSpace.user,
  initialState,
  reducers: {
    requireAuthorization: (state, action) => {
      state.authorizationStatus = action.payload;
    },
    getLogin: (state, action) => {
      state.login = action.payload;
    },
    getUserAvatar: (state, action) => {
      state.avatarUrl = action.payload;
    },
  },
});

const { requireAuthorization, getLogin, getUserAvatar } = userProcess.actions;

export { userProcess, requireAuthorization, getLogin, getUserAvatar };
