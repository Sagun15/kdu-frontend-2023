import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Auth } from "aws-amplify";
import axios from "axios";
import { RootState } from "../../app/store";

export interface BookingInfo {
  [key: string]: string | string[] | number | boolean;
  userId: string;
  cleaningType: string;
  frequencyType: string;
  numberOfBedrooms: number;
  numberOfWashrooms: number;
  extras: string[];
  additionalReq: string;
  numberOfHours: number;
  date: string;
  startTime: string;
  creditCardNumber: number;
  expiryDate: string;
  cvv: number;
  cardHolderName: string;
  emailAddress: string;
  phoneNumber: number;
  address: string;
  zipCode: string;
  day: string;
  netAmount: number;
  dataPosted: boolean;
}

const initialState: BookingInfo = {
  userId: "",
  cleaningType: "",
  frequencyType: "",
  numberOfBedrooms: 0,
  numberOfWashrooms: 0,
  extras: [],
  additionalReq: "",
  numberOfHours: 0,
  date: "",
  startTime: "",
  creditCardNumber: 0,
  expiryDate: "",
  cvv: 0,
  cardHolderName: "",
  emailAddress: "",
  phoneNumber: 0,
  address: "",
  zipCode: "",
  day: "",
  netAmount: 0,
  dataPosted: false
};

export const executeBookingAsync = createAsyncThunk(
  "booking/execute",
  async (req, thunkApi) => {
    const res = await Auth.currentUserInfo().then(info => thunkApi.dispatch(bookingSliceActions.updateUserSubId(info.attributes.sub)));
    const state = thunkApi.getState() as RootState;
    const reqBody = {
      userId: state.bookingStatus.userId,
      cleaning_type: state.bookingStatus.cleaningType,
      cleaning_frequency: state.bookingStatus.frequencyType,
      time_slot: state.bookingStatus.numberOfHours,
      booking_amt: state.bookingStatus.netAmount,
      extras: state.bookingStatus.extras,
      start_time: state.bookingStatus.startTime,
      date: state.bookingStatus.date,
    };
    const reponse = await axios.post(
      "https://qho9qdsiu4.execute-api.ap-south-1.amazonaws.com/default/sagun-miniproject-lambda-db",
      reqBody
    );
    thunkApi.dispatch(bookingSliceActions.setDataPosted(false));
  }
);

export const BookingSlice = createSlice({
  name: "bookingState",
  initialState,
  reducers: {
    updateStateWithAmt: (
      state,
      action: PayloadAction<{
        key: string;
        value: string | string[] | number;
        amount: number;
      }>
    ) => {
      state[action.payload.key] = action.payload.value;
      state.netAmount += action.payload.amount;
      console.log(
        action.payload.key,
        state[action.payload.key],
        action.payload.amount
      );
    },
    updateState: (
      state,
      action: PayloadAction<{ key: string; value: string | string[] | number }>
    ) => {
      state[action.payload.key] = action.payload.value;
      console.log(action.payload.key, state[action.payload.key]);
    },
    updateNetAmount: (state, action) => {
      state.netAmount = state.netAmount + action.payload.amount;
    },
    updateUserSubId: (state, action) => {
      console.log("Updated user sub id")
      state.userId = action.payload;
      console.log(action.payload);
    },
    setDataPosted: (state, action) => {
      state.dataPosted = action.payload;
    },
    initState: (state) => {
      state.userId = "";
      state.cleaningType = "";
      state.frequencyType= "";
      state.numberOfBedrooms= 0;
      state.numberOfWashrooms= 0;
      state.extras= [];
      state.additionalReq= "";
      state.numberOfHours= 0;
      state.date= "";
      state.startTime= "";
      state.creditCardNumber= 0;
      state.expiryDate= "";
      state.cvv= 0;
      state.cardHolderName= "";
      state.emailAddress= "";
      state.phoneNumber= 0;
      state.address= "";
      state.zipCode= "";
      state.day= "";
      state.netAmount= 0;
      state.dataPosted = false;
    }
  },
});

export const bookingSliceActions = BookingSlice.actions;
export default BookingSlice.reducer;
