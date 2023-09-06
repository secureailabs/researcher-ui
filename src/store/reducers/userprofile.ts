import { createSlice } from '@reduxjs/toolkit';
import { BasicObjectInfo, UserInfo_Out, UserRole } from 'src/client';

// types
export type UserProfileProps = {
  name: string | null;
  email: string | null;
  job_title: string | null;
  roles: Array<UserRole> | null;
  avatar?: string | null;
  id: string | null;
  organization: BasicObjectInfo | null;
  freemium?: boolean | null;
};

// initial state
const initialState: UserProfileProps = {
  name: null,
  email: null,
  job_title: null,
  roles: null,
  avatar: null,
  id: null,
  organization: null,
  freemium: null
};

// ==============================|| SLICE - USER AUTH ||============================== //

const userprofile = createSlice({
  name: 'userprofile',
  initialState,
  reducers: {
    updateUserProfile(state, action) {
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.job_title = action.payload.job_title;
      state.roles = action.payload.roles;
      state.avatar = action.payload.avatar;
      state.id = action.payload.id;
      state.organization = action.payload.organization;
      state.freemium = action.payload.freemium;
    }
  }
});

export default userprofile.reducer;

export const { updateUserProfile } = userprofile.actions;
