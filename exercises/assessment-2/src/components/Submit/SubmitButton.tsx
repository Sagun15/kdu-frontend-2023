import { Button } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { RootState } from "../../app/store";
import { roomBookingAsync } from "../../features/Rooms/RoomBookingReducer";
import "./SubmitButton.scss";

export const SubmitButton = () => {
  const dispatch = useAppDispatch();
  const logBooking = () => {
    dispatch(roomBookingAsync())
  }

  const bookingSelector = useAppSelector((state: RootState) => state.booking);
  const isDisabled = (bookingSelector.roomType.type === "" || bookingSelector.startDate === "" || bookingSelector.endDate === "") || (new Date(bookingSelector.startDate) >= new Date(bookingSelector.endDate));
  return (
    <Button
      variant="outlined"
      style={{
        color: '#fff',
        borderRadius: 0,
        marginLeft: "10%",
      }}
      className={isDisabled ? 'disabled' : 'notDisabled'}
      disabled={isDisabled}
      onClick={logBooking}
    >
      Submit
    </Button>
  );
};
