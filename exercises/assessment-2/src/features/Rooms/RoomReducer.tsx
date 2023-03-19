import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export interface RoomType {
    id: number;
    name: string;
    costPerNight: string;
    currency: string;
    addOns: { name: string; cost: string; currency: string; }[];
}

export interface RoomState {
  data: RoomType[];
  loading: boolean;
}

const initialState: RoomState = {
  data: [],
  loading: false,
};

export const roomsAsync = createAsyncThunk("rooms/fetchRoom", async () => {
  const response = await axios.get(
    "https://ky9jasp2p5.execute-api.us-east-1.amazonaws.com/dev/rooms-details",
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return response.data.body.roomTypes;
});

export const roomSlice = createSlice({
  name: "rooms",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(roomsAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(roomsAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(roomsAsync.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const roomActions = roomSlice.actions;
export default roomSlice.reducer;
