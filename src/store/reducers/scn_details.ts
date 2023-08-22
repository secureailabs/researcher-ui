import { createSlice } from '@reduxjs/toolkit';
import { BasicObjectInfo, UserInfo_Out, UserRole } from 'src/client';

// types
export type SCNProps = {
  baseUrl: string | null;
};

// initial state
const initialState: SCNProps = {
  baseUrl: null
};

// ==============================|| SLICE - USER AUTH ||============================== //

const scn_details = createSlice({
  name: 'scn_details',
  initialState,
  reducers: {
    updateSCNDetails(state, action) {
      state.baseUrl = action.payload.baseUrl;
    }
  }
});

export default scn_details.reducer;

export const { updateSCNDetails } = scn_details.actions;
