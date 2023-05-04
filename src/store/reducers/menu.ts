import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

// types
import { MenuProps } from 'src/types/menu';

// initial state
const initialState: MenuProps = {
  openItem: ['dashboard'],
  openComponent: 'buttons',
  selectedID: null,
  drawerOpen: true,
  componentDrawerOpen: true,
  menuDashboard: {},
  error: null
};

// ==============================|| SLICE - MENU ||============================== //

const menu = createSlice({
  name: 'menu',
  initialState,
  reducers: {
    activeItem(state, action) {
      state.openItem = action.payload.openItem;
    },

    activeID(state, action) {
      state.selectedID = action.payload;
    },

    activeComponent(state, action) {
      state.openComponent = action.payload.openComponent;
    },

    openDrawer(state, action) {
      state.drawerOpen = action.payload.drawerOpen;
    },

    openComponentDrawer(state, action) {
      state.componentDrawerOpen = action.payload.componentDrawerOpen;
    },

    getMenuSuccess(state, action) {
      state.menuDashboard = action.payload;
    },

    hasError(state, action) {
      state.error = action.payload;
    }
  }
});

export default menu.reducer;

export const { activeItem, activeComponent, openDrawer, openComponentDrawer, activeID } = menu.actions;
