import { Box, Typography } from "@mui/material";
import { useEffect } from "react";
import "./App.scss";
import { useAppDispatch } from "./app/hooks";
import { Addons } from "./components/Addons/Addons";
import { DateSelector } from "./components/DatePicker/DatePicker";
import { RoomType } from "./components/RoomType/RoomType";
import { SubmitButton } from "./components/Submit/SubmitButton";
import { roomsAsync } from "./features/Rooms/RoomReducer";

function App() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(roomsAsync());
  }, [dispatch]);

  return (
    <Box>
      <Typography variant="h3" textAlign='center' gutterBottom mt={2}>Hotel Booking</Typography>
      <RoomType />
      <DateSelector />
      <Addons />
      <SubmitButton />
    </Box>
  );
}

export default App;
