import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import bookReducer from '../features/static/Book';
import bookingReducer from "../features/booking/Booking";
import bookingDetailsReducer from "../features/booking/BookingDetails";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    book: bookReducer,
    bookingStatus: bookingReducer,
    bookingDetails: bookingDetailsReducer
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
