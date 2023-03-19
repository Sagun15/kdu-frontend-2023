import { Button, Stack, Typography, useMediaQuery } from "@mui/material";
import { Box } from "@mui/system";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { RootState } from "../../app/store";
import { useState } from "react";
import "./RoomType.scss";
import { roomBookingActions } from "../../features/Rooms/RoomBookingReducer";

export const RoomType = () => {
  const isSmallerScreen = useMediaQuery("(max-width:600px)");
  const roomSelector = useAppSelector((state: RootState) => state.room.data);
  const [roomType, setRoomType] = useState("");
  const dispatch = useAppDispatch();

  const roomHandler = (type: string, rate: string) => {
    dispatch(
      roomBookingActions.updateRoomState({
        key: "roomType",
        value: { type, rate },
      })
    );
    dispatch(
      roomBookingActions.updateRoomState({
        key: "addOns",
        value: [],
      })
    );
    setRoomType(type);
  };

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
        Select Room Type
      </Typography>
      <Stack
        direction="row"
        spacing={isSmallerScreen ? 0 : 2}
        flexWrap={isSmallerScreen ? "wrap" : "nowrap"}
      >
        {roomSelector.map((room) => (
          <Button
            variant="outlined"
            style={{
              borderColor: "#f08a5d",
              color: "#f08a5d",
              borderRadius: 0,
              marginBottom: isSmallerScreen ? 4 : 0,
              width: isSmallerScreen ? '100%' : 'initial'
            }}
            className={roomType === room.name ? "selected" : ""}
            onClick={() => roomHandler(room.name, room.costPerNight)}
            key={room.name}
          >
            {room.name}
          </Button>
        ))}
      </Stack>
    </Box>
  );
};
