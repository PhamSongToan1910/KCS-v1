import { createSlice } from "@reduxjs/toolkit";
import * as roomPrivateService from '../../services/RoomPrivateService';

const RoomPrivateSlice = createSlice({
  name: "roomPrivate",
  initialState: {
    getRoomByUser: {
      data: [],
      loading: false,
      error: null,
      searchData: [],
    }
  },
  reducers: {
    getRoomByUserStart: (state) => {
      state.getRoomByUser.loading = true;
    },
    getRoomByUserSuccess: (state, action) => {
      state.getRoomByUser.loading = false;
      state.getRoomByUser.data = action.payload;
      state.getRoomByUser.error = false
    },
    getRoomByUserError: (state) => {
      state.getRoomByUser.loading = false;
      state.getRoomByUser.error = true;
    }
  },
});

export const {
  getRoomByUserError,
  getRoomByUserSuccess,
  getRoomByUserStart
} = RoomPrivateSlice.actions;

export default RoomPrivateSlice.reducer;