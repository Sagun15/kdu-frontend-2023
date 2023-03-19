import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import RoomReducer from '../features/Rooms/RoomReducer';
import RoomBookingReducer from '../features/Rooms/RoomBookingReducer';

export const store = configureStore({
  reducer: {
    room: RoomReducer,
    booking: RoomBookingReducer
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
