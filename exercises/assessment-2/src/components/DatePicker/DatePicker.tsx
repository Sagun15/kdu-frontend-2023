import { Stack, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import "./DatePicker.scss";
import { roomBookingActions } from "../../features/Rooms/RoomBookingReducer";
import { RootState } from "../../app/store";
import { useEffect, useState } from "react";

export const DateSelector = () => {
  const dispatch = useAppDispatch();
  const [endDate, setEndDate] = useState(new Date().toISOString());
  const bookingSelector = useAppSelector((state: RootState) => state.booking);
  const updateState = (key: string, value: string) => {
    dispatch(roomBookingActions.updateRoomState({ key, value }));
  };

  useEffect(() => {
    if(new Date(bookingSelector.startDate) >= new Date(endDate)) {
      setEndDate("")
    }
  }, [bookingSelector.startDate, endDate])

  return (
    <Box width="80%" margin="auto" marginBottom={4}>
      <Typography
        variant="h6"
        p={2}
        width="100%"
        boxSizing="border-box"
        bgcolor="#f08a5d"
        color="#eee"
        gutterBottom
      >
        Select Date
      </Typography>
      <Stack direction="row" spacing={2}>
        <input
          type="date"
          min={new Date().toISOString()}
          className="date__picker"
          onChange={(e) => updateState("startDate", e.target.value)}
        />
        <input
          type="date"
          value={endDate}
          min={bookingSelector.startDate.toString().substring(0,10)}
          className="date__picker"
          disabled={bookingSelector.startDate === ""}
          onChange={(e) => {updateState("endDate", e.target.value); setEndDate(e.target.value)}}
        />
      </Stack>
    </Box>
  );
};
