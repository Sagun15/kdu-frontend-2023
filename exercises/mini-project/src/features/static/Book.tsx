import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

export interface BookState {
  cleaningType: { type: string; rate: number }[];
  frequencyType: { type: string; rate: number }[];
  roomType: {image: string; type: string;}[];
  extras: { type: string; url: string; rate: number }[];
  timings: string[];
}

const initialState: BookState = {
  cleaningType: [],
  frequencyType: [],
  roomType: [],
  extras: [],
  timings: [],
};

export const fetchBookRequisites = createAsyncThunk(
  "book/requisites",
  async (req, thunkApi) => {
    const { data } = await axios.get(
      "https://efllotk0si.execute-api.ap-south-1.amazonaws.com/default/sagun-miniproject-static-lambda"
    );
    console.log(data);
    const cleaningType = data.cleaning_type;

    const frequencyType = data.cleaning_frequency;

    const roomType = data.room_type;

    const extras = data.extras;

    const timings = data.time_slots;

    return { cleaningType, frequencyType, roomType, extras, timings };
  }
);

export const bookSlice = createSlice({
  name: "book",
  initialState,
  reducers: {
    setBookState: (state) => {
      state.cleaningType = [];
      state.frequencyType = [];
      state.roomType = [];
      state.extras = [];
      state.timings = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      fetchBookRequisites.fulfilled,
      (state, action: PayloadAction<BookState>) => {
        state.cleaningType = action.payload.cleaningType;
        state.frequencyType = action.payload.frequencyType;
        state.roomType = action.payload.roomType;
        state.extras = action.payload.extras;
        state.timings = action.payload.timings;
      }
    );
  },
});

export const bookActions = bookSlice.actions;

export default bookSlice.reducer;
