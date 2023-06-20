import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Auth } from "aws-amplify";

export interface BookingDetails {
  userBookingDetails: any;
  isLoading: boolean;
}

const initialState: BookingDetails = {
  userBookingDetails: [],
  isLoading: true,
};

export const getBookingDetails = createAsyncThunk(
  "booking/details",
  async (arg, thunkApi) => {
    const currentUser = await Auth.currentUserInfo().then((auth) => auth.attributes.sub);
    
    const responseFromAPI = await axios.get(
        "https://qho9qdsiu4.execute-api.ap-south-1.amazonaws.com/default/sagun-miniproject-lambda-db?user_id="+currentUser
    );
    console.log("Current User: ",currentUser)
    console.log("Response: ", responseFromAPI)
    return responseFromAPI.data.Items;
  }
);

const BookingDetailsSlice = createSlice({
  name: "bookingDetails",
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getBookingDetails.fulfilled, (state, action) => {
      state.userBookingDetails = action.payload;
      state.isLoading = false;
    });
  },
});

export const BookingDetailsAction = BookingDetailsSlice.actions;
export default BookingDetailsSlice.reducer;