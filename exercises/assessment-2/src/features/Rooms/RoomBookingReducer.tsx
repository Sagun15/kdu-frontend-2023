import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

export interface RoomSpecType {
  [key: string]: string | number | {};
  roomType: { type: string; rate: string };
  startDate: string;
  endDate: string;
  addOns: { type: string; rate: string }[];
  totalCost: number;
}

const initialState: RoomSpecType = {
  roomType: { type: "", rate: "" },
  startDate: "",
  endDate: "",
  addOns: [],
  totalCost: 0,
};

export const roomBookingAsync = createAsyncThunk(
  "roomBooking/fetchDetails",
  async (_, { getState }) => {
    const bookingDetails = (getState() as RootState).booking;
    let addOnRate = 0;
    const roomAmount = parseInt(bookingDetails.roomType.rate, 10);
    bookingDetails.addOns.map((addOn) => (addOnRate += parseInt(addOn.rate)));
    console.log("Room type: ", bookingDetails.roomType.type);
    console.log("Room rate: ", roomAmount);
    console.log("AddOns: ", bookingDetails.addOns);
    console.log("AddOn amount: ", addOnRate);
    const date1 = new Date(bookingDetails.startDate).getTime();
    const date2 = new Date(bookingDetails.endDate).getTime();
    const diffTime = Math.abs(date2 - date1);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    console.log(
      "Start date: " +
        bookingDetails.startDate +
        " End date: " +
        bookingDetails.endDate
    );
    console.log("No. of days: ", diffDays);
    const taxAmount = (roomAmount + addOnRate) * diffDays * 0.18;
    console.log(
      "Tax rate (" + roomAmount + " + " + addOnRate + ") * " + diffDays + " * 0.18 :",
      taxAmount
    );
    let totalAmount = roomAmount + addOnRate + taxAmount;
    console.log("Total amount: ", totalAmount);
  }
);

export const roomBookingSlice = createSlice({
  name: "rooms",
  initialState,
  reducers: {
    updateRoomState: (
      state,
      action: PayloadAction<{ key: string; value: string | string[] | {} }>
    ) => {
      state[action.payload.key] = action.payload.value;
    },
  },
});

export const roomBookingActions = roomBookingSlice.actions;
export default roomBookingSlice.reducer;
