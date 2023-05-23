import { createSlice } from '@reduxjs/toolkit';

// types
export type AccessProps = {
  accessToken: string;
  refreshToken: string;
  tokenType: string;
};

// initial state
const initialState: AccessProps = {
  accessToken: '',
  refreshToken: '',
  tokenType: ''
};

// ==============================|| SLICE - USER AUTH ||============================== //

const auth = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    activeAccessToken(state, action) {
      state.accessToken = action.payload.accessToken;
    },

    activeRefreshToken(state, action) {
      state.refreshToken = action.payload.refreshToken;

    },

    tokenType(state, action) {
      state.tokenType = action.payload.tokenType;

    }
  }
});

export default auth.reducer;

export const { activeAccessToken, activeRefreshToken, tokenType } = auth.actions;
